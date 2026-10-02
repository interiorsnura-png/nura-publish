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
test('original article structure and publication dates survive migration',()=>{
 const posts=entries.filter(e=>e.content.component==='article');assert.equal(posts.length,13);
 for(const p of posts){assert.ok(p.content.body_nodes?.length,p.path);assert.ok(!Number.isNaN(Date.parse(p.content.published_date)),p.path);}
 assert.ok(posts.some(p=>p.content.body_nodes.some(n=>n.type==='heading')));
});
