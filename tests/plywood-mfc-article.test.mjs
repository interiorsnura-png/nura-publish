import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';

const root=new URL('../',import.meta.url);
const nativeRequire=createRequire(import.meta.url);
function load(relative){
 const file=new URL(relative,root),mod={exports:{}};
 const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 new Function('module','exports','require',compiled)(mod,mod.exports,nativeRequire);
 return mod.exports;
}
const entries=['migration/content-backup.json','lib/published-editorial.json','lib/published-pages.json','lib/published-projects.json'].flatMap(file=>JSON.parse(fs.readFileSync(new URL(file,root),'utf8')));
const path='/post/plywood-vs-mfc-kitchen-carcasses';
const article=entries.find(e=>e.path===path);
const flatten=nodes=>nodes.map(n=>n.text||flatten(n.children||[])).join(' ');
const links=nodes=>nodes.flatMap(n=>[...(n.link?[n.link]:[]),...links(n.children||[])]);

test('plywood and MFC article is unique, dated and makes its price illustrative',()=>{
 assert.equal(entries.filter(e=>e.path===path).length,1);
 const c=article.content,text=flatten(c.body_nodes);
 assert.equal(c.title,'Plywood vs MFC Kitchen Carcasses: The £40,000 Kitchen Question');
 assert.equal(c.published_date,'2026-10-21');
 assert.match(text,/illustrative purchase price/);
 assert.match(text,/not a verified Nura quote/);
 assert.doesNotMatch(text,/—|50% lower|zero deflection|next-day courier|within 2 working days/i);
 assert.ok(c.body_nodes.filter(n=>n.type==='heading').length>=4);
 assert.equal(c.reviewer,undefined);
 assert.ok(fs.existsSync(new URL('public'+c.hero.filename,root)));
});

test('article links, related reading and enquiry use existing destinations',()=>{
 for(const href of links(article.content.body_nodes).filter(href=>href.startsWith('/'))){
  assert.ok(entries.some(e=>e.path===href),href);
 }
 const related=load('lib/related-articles.ts');
 assert.deepEqual(related.getRelatedArticles(article,entries).map(e=>e.path),['/post/solid-wood-or-veneer','/post/choosing-a-kitchen-showroom-in-fulham']);
 const journey=load('lib/article-journeys.ts').getArticleJourney(path,entries);
 assert.equal(journey.proof.path,'/kitchens/elm-park-road');
 assert.equal(journey.service.path,'/services/bespoke-kitchens');
 assert.equal(journey.enquiry.href,'/consultation');
});
