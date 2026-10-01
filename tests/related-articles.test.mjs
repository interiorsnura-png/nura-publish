import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync(new URL('../lib/related-articles.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const api={};new Function('exports',code)(api);
const entries=JSON.parse(fs.readFileSync(new URL('../migration/content-backup.json',import.meta.url),'utf8'));
test('every article recommends two distinct existing articles without recommending itself',()=>{
 for(const current of entries.filter(e=>e.content.component==='article')){
  const related=api.getRelatedArticles(current,entries);
  assert.equal(related.length,2,current.path);
  assert.equal(new Set(related.map(e=>e.path)).size,2);
  assert.ok(related.every(e=>e.path!==current.path&&e.content.hero?.filename));
  assert.ok(related.every(e=>api.articleReadingMinutes(e)>0));
 }
});
test('porcelain leads to a worktop comparison and complementary kitchen colour article',()=>{
 const current=entries.find(e=>e.path==='/post/the-power-of-porcelain');
 assert.deepEqual(api.getRelatedArticles(current,entries).map(e=>e.path),['/post/how-to-choose-the-right-worktop-for-your-kitchen','/post/exploring-white-variations-in-kitchen-design']);
});
test('unpublished curated suggestions are excluded and unrelated content is not forced into empty slots',()=>{
 const current=entries.find(e=>e.path==='/post/the-power-of-porcelain');
 const draft={...entries.find(e=>e.path==='/post/how-to-choose-the-right-worktop-for-your-kitchen'),content:{component:'article',source_publish_status:'draft'}};
 assert.deepEqual(api.getRelatedArticles(current,[current,draft,{path:'/post/unrelated',content:{component:'article',title:'Unrelated'}}]),[]);
});
