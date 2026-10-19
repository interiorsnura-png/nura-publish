import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('published homepage preserves the approved Work editorial composition',async()=>{
 const served=JSON.parse(await readFile(new URL('../lib/published-home.json',import.meta.url),'utf8'));
 assert.match(served.html,/section id="work" class="work section-pad reveal"/);
 assert.match(served.html,/class="work-editorial"/);
 assert.match(served.html,/href="\/projects"/);
 for(const href of ['/kitchens/elm-park-road','/kitchens/tansley-farm','/kitchens/westover-road'])assert.match(served.html,new RegExp(`href="${href.replaceAll('/','\\/')}"`));
 assert.match(served.html,/class="featured-study"/);
 assert.doesNotMatch(served.html,/work-editorial[\\s\\S]*—/);
});

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
 const workSection=/  <section id="work"[\s\S]*?<\/section>\n\n/;
 assert.equal(served.html.replace(workSection,'').replaceAll('\r\n','\n'),expected.replace(workSection,'').replaceAll('\r\n','\n'));
});
test('published homepage interaction script stays identical and Work CSS remains scoped',async()=>{
 const script=await readFile(new URL('../public/nura-home.js',import.meta.url));
 const sourceScript=await readFile(new URL('../migration/source/nura-home.js',import.meta.url));
 assert.deepEqual(script,sourceScript);
 const css=(await readFile(new URL('../public/nura-home.css',import.meta.url))).toString();
 assert.match(css,/\.work-editorial\{/);
 assert.match(css,/\.work-portfolio-preview\{/);
});
test('existing public project identities are retained independently from Wix cases',async()=>{const cases=JSON.parse(await readFile(new URL('../lib/published-projects.json',import.meta.url),'utf8'));assert.deepEqual(cases.map(x=>x.content.title),['Hampstead House','Park View','Clay House']);assert.equal(cases.length,3);assert.ok(cases.every(x=>x.source.collection==='live-vercel'));});
