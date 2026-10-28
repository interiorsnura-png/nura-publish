import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as cheerio from 'cheerio';
const entries=JSON.parse(await readFile(new URL('../migration/content-backup.json',import.meta.url)));
const redirects=JSON.parse(await readFile(new URL('../migration/redirects-approved.json',import.meta.url)));
const html=JSON.parse(await readFile(new URL('../lib/published-home.json',import.meta.url))).html;
test('homepage featured project names link to their actual source cases',()=>{
 const $=cheerio.load(html);
 for(const [name,path] of [['Elm Park Road','/kitchens/elm-park-road'],['Tansley Farm','/kitchens/tansley-farm'],['Westover Road','/kitchens/westover-road']]){
  const card=$('a.project-card').filter((_,a)=>$(a).text().includes(name));
  assert.equal(card.length,1);assert.equal(card.attr('href'),path);
  assert.equal(entries.find(e=>e.path===(redirects.find(r=>r.source===path)?.destination||path))?.content.title,name);
 }
});
test('every content page has a useful description rather than an empty placeholder',()=>{
 for(const e of entries){assert.ok(e.content.seo_description?.trim().length>20,e.path);assert.notEqual(e.content.seo_description,'-',e.path);}
});
test('authorised kitchen designer rewrite retains historical identity and delivers its three-area promise',()=>{
 const e=entries.find(x=>x.path==='/post/what-are-some-of-the-biggest-problems-faced-for-customers-working-with-kitchen-designers');
 assert.equal(e.content.title,'Problems with Your Kitchen Designer? What to Do Next');
 assert.equal(e.content.seo_title,'Problems with Kitchen Designers? 3 Areas to Clarify | NURA');
 assert.equal(e.content.published_date,'2023-04-26T13:44:44.116Z');
 const nodes=e.content.body_nodes,headings=nodes.filter(n=>n.type==='heading').map(n=>n.children?.[0]?.text);
 for(const heading of ['1. The plans: turn preferences into decisions','2. The quotation: compare scope before comparing totals','3. Responsibilities: give each outstanding action an owner'])assert.ok(headings.includes(heading));
 assert.equal(nodes.filter(n=>n.type==='image').length,3);assert.ok(nodes.some(n=>n.type==='table'));assert.ok(e.content.hero.filename.includes('designer-collaboration-hero'));
 assert.ok(nodes.some(n=>n.children?.some(t=>t.link==='/consultation')));
});

test('original article structure and publication dates survive migration',()=>{
 const posts=entries.filter(e=>e.content.component==='article'&&e.content.source_publish_status!=='draft');assert.equal(posts.length,13);
 for(const p of posts){assert.ok(p.content.body_nodes?.length,p.path);assert.ok(!Number.isNaN(Date.parse(p.content.published_date)),p.path);}
 assert.ok(posts.some(p=>p.content.body_nodes.some(n=>n.type==='heading')));
});
test('wardrobe landing preserves approved SEO and lead-generation structure',async()=>{
 const source=await readFile(new URL('../components/WardrobeLanding.tsx',import.meta.url),'utf8');
 assert.match(source,/export const wardrobeTitle='Bespoke Fitted Wardrobes in London \| Nura Interiors'/);
 assert.match(source,/title="Bespoke fitted wardrobes in London\."/);
 assert.match(source,/href="\/joinery\/westover-road"/);
 assert.match(source,/formLocation="wardrobes"/);
 assert.match(source,/id="wardrobe-enquiry"/);
 assert.equal((source.match(/<details>/g)||[]).length,6);
 assert.match(source,/Can fitted wardrobes work in rooms with alcoves, slopes or awkward corners\?/);
 assert.match(source,/Do you design dressing rooms as well as fitted wardrobes\?/);
 assert.match(source,/Arrange a Fulham showroom visit/);
 assert.match(source,/Send your plans and brief/);
 assert.doesNotMatch(source,/'@type':'FAQPage'/);
});
