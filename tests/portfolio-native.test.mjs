import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import * as cheerio from 'cheerio';

test('native portfolio retains its local media and licensed image inventory',()=>{
 const manifest=JSON.parse(fs.readFileSync(new URL('../migration/portfolio/asset-manifest.json',import.meta.url)));
 assert.equal(manifest.photos,106);
 assert.equal(manifest.films,14);
 for(const asset of manifest.assets){
  const bytes=fs.readFileSync(new URL('../public'+asset.path,import.meta.url));
  const normalized=asset.path.endsWith('.svg')
    ?Buffer.from(bytes.toString().replace(/\r\n/g,'\n'))
    :bytes;
  assert.equal(normalized.length,asset.bytes,asset.path);
  if(asset.sha256)assert.equal(createHash('sha256').update(normalized).digest('hex'),asset.sha256,asset.path);
 }
 const html=fs.readFileSync(new URL('../public/portfolio/index.html',import.meta.url),'utf8');
 const $=cheerio.load(html);
 assert.equal($('iframe').length,0);
 assert.equal($('link[rel=canonical]').attr('href'),'https://www.nura-interiors.com/projects/catalogue');
 assert.equal($('h1').length,1);
 assert.equal(html.includes('nura-catalogue-2026.nura-interio-7002.chatgpt.site'),false);
 const licensed=$('script[type="application/ld+json"]').toArray().flatMap(e=>JSON.parse($(e).text())['@graph']||[]);
 assert.equal(licensed.length,106);
 assert.ok(licensed.every(x=>x.license&&x.acquireLicensePage&&x.creator.name==='Nura Interiors'));
});
