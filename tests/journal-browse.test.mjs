import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const compiled=ts.transpileModule(fs.readFileSync(new URL('../lib/journal-browse.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const taxonomy=JSON.parse(fs.readFileSync(new URL('../lib/journal-taxonomy.json',import.meta.url),'utf8'));
const api={};new Function('exports','require',compiled)(api,()=>({default:taxonomy}));
test('every mapped article has exactly one primary and appliance integration is not a material category',()=>{
 assert.equal(Object.keys(taxonomy).length,153);
 const counts={};for(const [path,item] of Object.entries(taxonomy)){assert.ok(path.startsWith('/post/')||path.startsWith('/guides/'));assert.ok(api.journalCategoryContent[item.primary]);counts[item.primary]=(counts[item.primary]||0)+1;}
 assert.deepEqual(counts,{planning:41,materials:25,styling:29,layout:39,stories:1,joinery:18});
 assert.equal(taxonomy['/post/fully-or-semi-integrated-dishwasher'].primary,'layout');
 assert.equal(taxonomy['/post/shaker-vs-slab-kitchen-doors'].primary,'materials');
 const item={title:'Dishwasher',description:'Appliance choice',category:'Layout & Storage',topics:['materials','kitchens'],primaryCategory:'layout'};
 assert.equal(api.matchesJournal(item,'materials',''),false);assert.equal(api.matchesJournal(item,'layout',''),true);assert.equal(api.matchesJournal(item,'kitchens',''),true);
});
test('archive page URLs preserve filters and layout is a real topic',()=>{
 assert.equal(api.journalPageURL('layout','drawer',3),'/journal?category=layout&q=drawer&page=3');
 assert.equal(api.journalPageNumber('2'),2);assert.equal(api.journalPageNumber('-1'),1);assert.equal(api.journalPageNumber('oops'),1);
 assert.ok(api.journalTopics('Where to put the dishwasher','Kitchen planning',[]).includes('layout'));
 assert.equal(api.validJournalCategory('layout'),'layout');
});
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
