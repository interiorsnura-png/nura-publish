import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('published homepage HTML stays byte-for-byte identical',async()=>{const snapshot=await readFile(new URL('../migration/source/live-home.html',import.meta.url),'utf8');const served=JSON.parse(await readFile(new URL('../lib/published-home.json',import.meta.url),'utf8'));assert.equal(served.html,snapshot);});
test('published homepage stylesheet and interaction script stay identical',async()=>{for(const file of ['nura-home.css','nura-home.js'])assert.deepEqual(await readFile(new URL('../public/'+file,import.meta.url)),await readFile(new URL('../migration/source/'+file,import.meta.url)));});
test('existing public project identities are retained independently from Wix cases',async()=>{const cases=JSON.parse(await readFile(new URL('../lib/published-projects.json',import.meta.url),'utf8'));assert.deepEqual(cases.map(x=>x.content.title),['Hampstead House','Park View','Clay House']);assert.equal(cases.length,3);assert.ok(cases.every(x=>x.source.collection==='live-vercel'));});
