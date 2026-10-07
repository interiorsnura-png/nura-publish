import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as cheerio from 'cheerio';
const entries=JSON.parse(await readFile(new URL('../migration/content-backup.json',import.meta.url)));
const redirects=JSON.parse(await readFile(new URL('../migration/redirects-approved.json',import.meta.url)));
const html=JSON.parse(await readFile(new URL('../lib/published-home.json',import.meta.url))).html;
test('homepage featured project names link to their actual source cases',()=>{
 const $=cheerio.load(html);
 for(const [name,path] of [['Elm Park Road','/kitchens/elm-park-road'],['Tansley Farm','/kitchens/tansley-farm'],['Westover Road','/jointery/westover-road']]){
  const card=$('a.project-card').filter((_,a)=>$(a).text().includes(name));
  assert.equal(card.length,1);assert.equal(card.attr('href'),path);
  assert.equal(entries.find(e=>e.path===(redirects.find(r=>r.source===path)?.destination||path))?.content.title,name);
 }
});
test('every content page has a useful description rather than an empty placeholder',()=>{
 for(const e of entries){assert.ok(e.content.seo_description?.trim().length>20,e.path);assert.notEqual(e.content.seo_description,'-',e.path);}
});
test('target kitchen designer article keeps approved structure and CTA marker',()=>{
 const slug='/post/what-are-some-of-the-biggest-problems-faced-for-customers-working-with-kitchen-designers';const e=entries.find(x=>x.path===slug);assert.ok(e);assert.equal(e.content.title,'Common Problems When Working With a Kitchen Designer');assert.equal(e.content.seo_description,'Discover four common problems when working with a kitchen designer, from unclear costs and communication gaps to limited options and delays, and how to avoid them.');const nodes=e.content.body_nodes;assert.equal(nodes.filter(n=>n.type==='cta'&&n.cta==='article-early-consultation').length,1);assert.deepEqual(nodes.filter(n=>n.type==='heading').map(n=>[n.level,n.children?.[0]?.text]),[[2,'Communication gaps during the design process'],[3,'How to create a clearer design brief'],[2,'Understanding the full cost of a bespoke kitchen'],[3,'How to protect your budget'],[2,'When the proposed design does not match your expectations'],[3,'How to compare options and test feasibility'],[2,'Managing lead times and project delays'],[3,'How to keep design, manufacture and installation aligned'],[2,'Confirming scope, changes and responsibilities before work begins']]);
});
test('original article structure and publication dates survive migration',()=>{
 const posts=entries.filter(e=>e.content.component==='article');assert.equal(posts.length,13);
 for(const p of posts){assert.ok(p.content.body_nodes?.length,p.path);assert.ok(!Number.isNaN(Date.parse(p.content.published_date)),p.path);}
 assert.ok(posts.some(p=>p.content.body_nodes.some(n=>n.type==='heading')));
});
