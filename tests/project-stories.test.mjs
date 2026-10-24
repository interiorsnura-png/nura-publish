import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const entries=read('migration/content-backup.json'),preserved=read('tests/fixtures/project-story-preservation.json');
test('three existing project stories preserve identity, original dates, specification and every image',()=>{
 for(const baseline of preserved){
  const matching=entries.filter(x=>x.path===baseline.path);assert.equal(matching.length,1);
  const entry=matching[0];assert.deepEqual(entry.source,baseline.source);
  for(const [key,value] of Object.entries(baseline.content))assert.deepEqual(entry.content[key],value,baseline.path+' '+key);
  assert.equal(entry.content.body_nodes.filter(x=>x.type==='heading').length,3);
  const links=entry.content.body_nodes.flatMap(n=>n.children||[]).filter(n=>n.link).map(n=>n.link);
  assert.ok(links.includes('/consultation'));
  assert.ok(links.includes(baseline.path.startsWith('/joinery/')?'/services/architectural-joinery':'/services/bespoke-kitchens'));
  assert.doesNotMatch(JSON.stringify(entry.content.body_nodes),/\u2014|client wanted|client asked|award-winning|measured improvement|free plans/i);
 }
});
test('Westover joinery story remains separate from its existing kitchen project',()=>{
 const joinery=entries.find(x=>x.path==='/joinery/westover-road').content;
 const kitchen=entries.find(x=>x.path==='/kitchens/westover-road').content;
 assert.match(JSON.stringify(joinery.body_nodes),/Calacatta Cremo/);
 assert.doesNotMatch(JSON.stringify(joinery.body_nodes),/Verde Persia|smoked oak/i);
 assert.match(kitchen.specifications,/Verde Persia/);
 assert.equal(kitchen.body_nodes,undefined);
});
