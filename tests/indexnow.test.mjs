import test from 'node:test';
import assert from 'node:assert/strict';
import {contentFingerprint,changedPages} from '../lib/indexnow-snapshot.mjs';
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
