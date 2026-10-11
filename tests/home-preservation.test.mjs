import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('published homepage HTML matches the source except for approved project and social icon corrections',async()=>{
 const snapshot=await readFile(new URL('../migration/source/live-home.html',import.meta.url),'utf8');
 const served=JSON.parse(await readFile(new URL('../lib/published-home.json',import.meta.url),'utf8'));
 const corrections=[
  ['src="/assets/linkedin.svg" alt=""','src="/assets/linkedin.svg" alt="LinkedIn"'],
  ['src="/assets/instagram.svg" alt=""','src="/assets/instagram.svg" alt="Instagram"'],
  ['alt="Tansley Farm kitchen detail with white cabinetry, brass trim and tactile control dials"','alt="Tansley Farm kitchen detail"'],
  ['<b>Tansley Farm</b><small>London · Bespoke kitchen</small>','<b>Tansley Farm</b><small>Cotswold District · Bespoke kitchen</small>'],
 ];
 let expected=snapshot.replaceAll('\r\n','\n');
 for(const [original,corrected] of corrections){
  assert.equal(expected.split(original).length-1,1,`expected one historical occurrence of ${original}`);
  expected=expected.replace(original,corrected);
 }
 assert.equal(served.html.replaceAll('\r\n','\n'),expected);
});
test('published homepage stylesheet and interaction script stay identical',async()=>{for(const file of ['nura-home.css','nura-home.js'])assert.deepEqual(await readFile(new URL('../public/'+file,import.meta.url)),await readFile(new URL('../migration/source/'+file,import.meta.url)));});
test('existing public project identities are retained independently from Wix cases',async()=>{const cases=JSON.parse(await readFile(new URL('../lib/published-projects.json',import.meta.url),'utf8'));assert.deepEqual(cases.map(x=>x.content.title),['Hampstead House','Park View','Clay House']);assert.equal(cases.length,3);assert.ok(cases.every(x=>x.source.collection==='live-vercel'));});
