import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const read=relative=>JSON.parse(fs.readFileSync(new URL(relative,root),'utf8'));
const contract=read('tests/fixtures/legacy-20-contract.json');
const walk=nodes=>nodes.flatMap(n=>[n,...walk(n.children||[])]);
const records=contract.map(expected=>{
 const source=read(expected.source);return {expected,entry:Array.isArray(source)?source.find(e=>e.path===expected.path):source};
});
test('all 20 legacy updates preserve paths, titles, authors, first publication and original links',()=>{
 assert.equal(records.length,20);
 for(const {expected,entry} of records){
  assert.equal(entry.path,expected.path);const c=entry.content;
  assert.equal(c.title,expected.title);assert.equal(c.author_name??null,expected.author??null);assert.equal(c.published_date??null,expected.published??null);
  const links=walk(c.body_nodes||[]).filter(n=>n.link).map(n=>n.link);
  for(const href of expected.links)assert.ok(links.includes(href),expected.path+' lost '+href);
 }
});
test('all 20 legacy pages have useful current metadata and no repeated hero or empty image node',()=>{
 const descriptions=new Set();
 for(const {entry} of records){const c=entry.content;
  assert.equal(c.modified_date,'2026-10-23');assert.ok(c.seo_description.length>=80);assert.ok(c.seo_description.length<=220);assert.doesNotMatch(c.seo_description,/\u2014|before publication|needs-review/);
  assert.ok(!descriptions.has(c.seo_description));descriptions.add(c.seo_description);
  for(const n of walk(c.body_nodes||[]).filter(n=>n.type==='image')){assert.ok(n.src,entry.path);assert.notEqual(n.src,c.hero?.filename,entry.path);}
 }
});
