import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import {load} from 'cheerio';

function compile(file,imports={}){
 const source=fs.readFileSync(new URL('../'+file,import.meta.url),'utf8');
 const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const module={exports:{}};
 new Function('exports','require',js)(module.exports,name=>{assert.ok(name in imports,name);return imports[name];});
 return module.exports;
}
const discovery=compile('lib/article-discovery.ts');
const {renderJournalRss}=compile('lib/journal-rss.ts',{'./article-discovery':discovery});
const {newestJournalFirst}=compile('lib/journal-order.ts');
const site='https://www.nura-interiors.com';
const resolve=filename=>filename?new URL(filename,site).href:undefined;
const now=new Date('2026-10-24T12:00:00Z');
const entry=(slug,date='2026-10-24T10:49:41.833Z',extra={})=>({path:'/post/'+slug,content:{component:'article',title:slug,published_date:date,...extra}});
const feed=entries=>renderJournalRss(entries,site,resolve,now);

test('all production articles allow large previews while preview remains noindex',()=>{
 assert.deepEqual(discovery.articleRobots(true),{index:true,follow:true,'max-image-preview':'large'});
 assert.deepEqual(discovery.articleRobots(false),{index:false,follow:false});
});
test('social and schema image agree and never invent source dimensions',()=>{
 const content={hero:{filename:'/hero.jpg',width:800,height:600},social_image:{filename:'/share.webp',width:1536,height:864,alt:'Kitchen'}};
 assert.deepEqual(discovery.articleSchemaImage(content,resolve),{'@type':'ImageObject',url:site+'/share.webp',width:1536,height:864,caption:'Kitchen'});
 assert.deepEqual(discovery.selectArticleImage({hero:{filename:'/old.jpg',width:-1,height:Infinity}},resolve),{url:site+'/old.jpg'});
 assert.equal(discovery.articleSchemaImage({},resolve),undefined);
});
test('RSS filters drafts, future/invalid dates, non-articles and noncanonical paths without mutating input',()=>{
 const entries=[entry('old','2025-01-01'),entry('new'),entry('draft',undefined,{source_publish_status:'draft'}),entry('future','2027-01-01'),entry('bad','invalid'),entry('old','2025-01-01'),entry('project',undefined,{component:'project'}),{...entry('review'),path:'/review/private'},entry('../private'),entry('query?draft=1'),entry('hidden',undefined,{source_publish_status:'unpublished'})];
 const before=JSON.stringify(entries),$=load(feed(entries),{xmlMode:true});
 assert.deepEqual($('item > link').map((_,el)=>$(el).text()).get(),[site+'/post/new',site+'/post/old']);
 assert.equal($('language').text(),'en-GB');
 assert.equal($('atom\\:link').attr('href'),site+'/rss.xml');
 assert.equal($('guid').first().attr('isPermaLink'),'true');
 assert.equal(JSON.stringify(entries),before);
});
test('only the authorised pending article is in RSS without an invented date',()=>{
 const pending={path:'/post/single-or-double-kitchen-oven',content:{component:'article',title:'Oven',publication_event_pending:true}};
 const invalid={...pending,content:{...pending.content,published_date:'2026-10-24T10:49:41.833Z'}};
 const other={...pending,path:'/post/other'};
 assert.equal(load(feed([invalid]),{xmlMode:true})('item').length,0);
 assert.equal(load(feed([other]),{xmlMode:true})('item').length,0);
 const $=load(feed([pending,invalid,other,entry('dated')]),{xmlMode:true});
 assert.deepEqual($('item > link').map((_,el)=>$(el).text()).get(),[site+pending.path,site+'/post/dated']);
 assert.equal($('item').first().find('pubDate').length,0);
 assert.ok($('item').last().find('pubDate').text());
});
test('the authorised pending article is ordered first without changing dated order',()=>{
 const pending={path:'/post/single-or-double-kitchen-oven',content:{component:'article',title:'Oven',publication_event_pending:true}};
 const sorted=newestJournalFirst([entry('old','2025-01-01'),pending,entry('new','2026-01-01')]);
 assert.deepEqual(sorted.map(x=>x.path),[pending.path,'/post/new','/post/old']);
});
test('RSS escapes hostile text/attributes, removes invalid XML characters and preserves emoji',()=>{
 const title='A & B <item> "quoted" \'words\' ]]> 🏡\u0001\ud800';
 const $=load(feed([entry('safe',undefined,{title,seo_description:'<script>bad()</script> & text',hero:{filename:'/image.webp?a=1&b=2',width:1536,height:864}})]),{xmlMode:true});
 assert.equal($('item').length,1);assert.equal($('script').length,0);
 assert.equal($('item > title').text(),title.replace(/[\u0001\ud800]/g,''));
 assert.equal($('item > description').text(),'<script>bad()</script> & text');
 const image=$('media\\:content');assert.equal(image.attr('url'),site+'/image.webp?a=1&b=2');
 assert.equal(image.attr('type'),'image/webp');assert.equal(image.attr('width'),'1536');
});
test('live migrated articles retain their historical unknown source status without disappearing from RSS',()=>{
 const $=load(feed([entry('legacy','2023-02-22',{source_publish_status:'unknown'}),entry('private','2023-02-22',{source_publish_status:'draft'})]),{xmlMode:true});
 assert.deepEqual($('item > link').map((_,el)=>$(el).text()).get(),[site+'/post/legacy']);
});
test('dates preserve original publication and build date reflects actual changes, not request time',()=>{
 const $=load(feed([entry('old','2025-01-01',{modified_date:'2026-10-23'}),entry('new',undefined,{modified_date:'2029-01-01'})]),{xmlMode:true});
 assert.equal($('lastBuildDate').text(),'Sat, 24 Oct 2026 10:49:41 GMT');
 assert.equal($('item').last().find('pubDate').text(),'Wed, 01 Jan 2025 00:00:00 GMT');
 assert.equal(load(feed([]),{xmlMode:true})('lastBuildDate').length,0);
 const dates=[entry('b'),entry('a')];
 assert.deepEqual(load(feed(dates),{xmlMode:true})('item > title').map((_,el)=>load(el).text()).get(),['b','a']);
});
test('optional malformed/unsafe images cannot inject markup or break the feed',()=>{
 for(const filename of ['javascript:alert(1)','not an absolute url']){
  const $=load(renderJournalRss([entry('safe',undefined,{hero:{filename}})],site,x=>x,now),{xmlMode:true});
  assert.equal($('item').length,1);assert.equal($('media\\:content').length,0);
 }
 const $=load(feed([entry('safe',undefined,{hero:{filename:'/old.jpg'}})]),{xmlMode:true});
 assert.equal($('media\\:content').attr('width'),undefined);assert.equal($('media\\:content').attr('type'),'image/jpeg');
});
test('RSS route blocks staging and draft-mode before reading content and serves production RSS',async()=>{
 const previous=process.env.SITE_ENV;let reads=0,draft=false;
 const {GET}=compile('app/rss.xml/route.ts',{
  'next/headers':{draftMode:async()=>({isEnabled:draft})},
  '../../lib/content':{getEntries:async()=>{reads++;return [entry('safe')];}},
  '../../lib/seo':{absoluteImage:resolve,siteUrl:site},
  '../../lib/journal-rss':{renderJournalRss},
 });
 try{
  process.env.SITE_ENV='staging';let r=await GET();assert.equal(r.status,404);assert.equal(reads,0);
  process.env.SITE_ENV='production';draft=true;r=await GET();assert.equal(r.status,404);assert.equal(reads,0);assert.equal(r.headers.get('cache-control'),'no-store');
  draft=false;r=await GET();assert.equal(r.status,200);assert.equal(reads,1);assert.match(r.headers.get('content-type'),/^application\/rss\+xml/);assert.match(await r.text(),/<rss version="2.0"/);
 }finally{if(previous===undefined)delete process.env.SITE_ENV;else process.env.SITE_ENV=previous;}
});
