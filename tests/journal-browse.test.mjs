import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const compiled=ts.transpileModule(fs.readFileSync(new URL('../lib/journal-browse.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const api={};new Function('exports',compiled)(api);
test('topic URLs preserve committed search across filters and encode reserved characters',()=>{
 const url=new URL(api.journalURL('materials','oak & colour / finish',24),'https://example.test');
 assert.equal(url.searchParams.get('q'),'oak & colour / finish');assert.equal(url.searchParams.get('category'),'materials');assert.equal(url.searchParams.get('page'),'2');
 assert.equal(api.journalURL('all','  '),'/journal');assert.equal(api.validJournalCategory('invalid'),'all');
});
test('international and joinery planning remain discoverable in overlapping topics',()=>{
 assert.deepEqual(api.journalTopics('Stone junction','Joinery planning',['planning'],'/post/joinery-stone-interface'),['joinery','planning','materials']);
 const topics=api.journalTopics('Planning bespoke joinery for overseas projects','International',['planning','joinery']);
 for(const topic of ['international','joinery','planning'])assert.ok(topics.includes(topic));
 const item={title:'Planning bespoke joinery for overseas projects',description:'Specify a finish',category:'International',topics};
 for(const category of topics)assert.ok(api.matchesJournal(item,category,'JOINERY'));
 assert.equal(api.matchesJournal(item,'materials','joinery'),false);assert.equal(api.matchesJournal(item,'all','not-present'),false);
});
