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
  assert.equal(entry.content.body_nodes.filter(x=>x.type==='heading').length,entry.path==='/joinery/westover-road'?3:4);
  const links=entry.content.body_nodes.flatMap(n=>n.children||[]).filter(n=>n.link).map(n=>n.link);
  assert.ok(links.includes('/consultation'));
  assert.ok(links.includes(baseline.path.startsWith('/joinery/')?'/services/architectural-joinery':'/services/bespoke-kitchens'));
  assert.doesNotMatch(JSON.stringify(entry.content.body_nodes),/\u2014|client wanted|client asked|award-winning|measured improvement|free plans/i);
 }
});
test('Tansley identifies the initial brief without publishing contacts, costs or unconfirmed fittings',()=>{
 const c=entries.find(x=>x.path==='/kitchens/tansley-farm').content;
 assert.equal(c.body_nodes[0].children[0].text,'The starting brief');
 assert.match(c.body_nodes[1].children[0].text,/initial brief/);
 for(const phrase of ['washing up','storage and seating','pantry storage','tall appliances'])assert.ok(c.body_nodes[1].children[0].text.includes(phrase));
 assert.doesNotMatch(c.body,/£|@|two dishwashers|2x dishwashers|guaranteed|delivered on time/i);
});
test('Elm Park records the supply requirement without inventing the site restriction',()=>{
 const c=entries.find(x=>x.path==='/kitchens/elm-park-road').content;
 assert.match(c.body,/order specified flat-packed tall units because of site restrictions/);
 assert.doesNotMatch(c.body,/narrow stairs|lift restrictions|successfully installed|client asked/i);
});
test('Westover joinery story remains separate from its existing kitchen project',()=>{
 const joinery=entries.find(x=>x.path==='/joinery/westover-road').content;
 const kitchen=entries.find(x=>x.path==='/kitchens/westover-road').content;
 assert.match(JSON.stringify(joinery.body_nodes),/Calacatta Cremo/);
 assert.doesNotMatch(JSON.stringify(joinery.body_nodes),/Verde Persia|smoked oak/i);
 assert.match(kitchen.specifications,/Verde Persia/);
 assert.equal(kitchen.body_nodes,undefined);
});
