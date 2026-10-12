import test from 'node:test';
import assert from 'node:assert/strict';
import {contentFingerprint,changedPages,brandFingerprint,faviconLocations} from '../lib/indexnow-snapshot.mjs';
const page=(title='Nura',content='A kitchen',script='1')=>`<html><head><title>${title}</title></head><body><main>${content}<script>${script}</script></main></body></html>`;
test('IndexNow ignores changing script payloads but notices content and SEO changes',()=>{
 assert.equal(contentFingerprint(page()),contentFingerprint(page('Nura','A kitchen','different build')));
 assert.notEqual(contentFingerprint(page()),contentFingerprint(page('New title')));
 assert.notEqual(contentFingerprint(page()),contentFingerprint(page('Nura','A new kitchen')));
 assert.notEqual(contentFingerprint(page()),contentFingerprint(page('Nura','A kitchen<a href="/new">More</a>')));
 assert.throws(()=>contentFingerprint('<html><body>Deployment error</body></html>'),/main content/);
});
test('IndexNow chooses only new or changed pages and treats removal separately',()=>{
 assert.deepEqual(changedPages({'/old':'a','/same':'b','/removed':'c'},{'/old':'new','/same':'b','/added':'d'}),['/old','/added']);
 assert.deepEqual(changedPages({'/same':'a'},{'/same':'a'}),[]);
});

test('IndexNow detects real favicon changes without treating build query hashes as content changes',async()=>{
 const iconPage=version=>`<html><head><title>Nura</title><link rel="icon" href="/icon.png?${version}"></head><main>A kitchen</main></html>`;
 assert.equal(contentFingerprint(iconPage('build-1')),contentFingerprint(iconPage('build-2')));
 const fetchIcon=bytes=>async()=>new Response(bytes,{status:200});
 const before=await brandFingerprint(iconPage('build-1'),'https://www.nura-interiors.com',fetchIcon('image-v1'));
 const after=await brandFingerprint(iconPage('build-2'),'https://www.nura-interiors.com',fetchIcon('image-v2'));
 assert.notEqual(contentFingerprint(iconPage('build-1'),{brand:before}),contentFingerprint(iconPage('build-2'),{brand:after}));
 assert.throws(()=>faviconLocations('<link rel="icon" href="https://other.test/a.png">','https://www.nura-interiors.com'),/production host/);
 await assert.rejects(()=>brandFingerprint(iconPage('one'),'https://www.nura-interiors.com',async()=>new Response(null,{status:404})),/404/);
});

test('IndexNow notices schema updates but ignores JSON property order',()=>{
 const withSchema=value=>page().replace('</head>',`<script type="application/ld+json">${JSON.stringify(value)}</script></head>`);
 assert.equal(contentFingerprint(withSchema({'@type':'Article',name:'One'})),contentFingerprint(withSchema({name:'One','@type':'Article'})));
 assert.notEqual(contentFingerprint(withSchema({'@type':'Article',name:'One'})),contentFingerprint(withSchema({'@type':'Article',name:'Two'})));
});
