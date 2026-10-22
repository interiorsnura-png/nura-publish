import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import ts from 'typescript';
const root=fileURLToPath(new URL('../',import.meta.url));
const nativeRequire=createRequire(import.meta.url),modules=new Map();
function load(relative){
 const file=path.resolve(root,relative);
 if(modules.has(file))return modules.get(file).exports;
 const mod={exports:{}};modules.set(file,mod);
 const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText;
 const require=id=>{
  if(id==='server-only')return {};
  if(id==='react')return {cache:fn=>fn};
  if(id==='next/headers')return {draftMode:async()=>({isEnabled:false})};
  if(id.startsWith('.')){const target=path.resolve(path.dirname(file),id);return id.endsWith('.json')?JSON.parse(fs.readFileSync(target,'utf8')):load(target+'.ts');}
  return nativeRequire(id);
 };
 new Function('module','exports','require',compiled)(mod,mod.exports,require);
 return mod.exports;
}
const manifest=JSON.parse(fs.readFileSync(path.join(root,'lib/drafts/nura-50/manifest.json'),'utf8'));
const batch=load('lib/nura-50-drafts.ts').getNura50PublicEntries();
const {mergeBatchEntries,getEntries}=load('lib/content.ts');
const base=['migration/content-backup.json','lib/published-projects.json','lib/published-editorial.json','lib/published-pages.json'].flatMap(p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8')));
const before=JSON.stringify(base),effective=mergeBatchEntries(base,batch);
const walk=nodes=>nodes.flatMap(n=>[n,...walk(n.children||[])]);
test('all 50 approved batch bodies replace collisions at unique existing paths without mutating legacy data',()=>{
 assert.equal(batch.length,50);assert.equal(effective.length,new Set(effective.map(e=>e.path)).size);
 for(const record of manifest){const entry=effective.find(e=>e.path==='/post/'+record.slug);assert.equal(entry.content.title,record.title);assert.ok(walk(entry.content.body_nodes).filter(n=>n.type==='heading').length>=4);}
 assert.equal(JSON.stringify(base),before);
});
test('every existing public author is preserved, including plywood collision: 26 Joanne and 24 Nura',()=>{
 const counts={};for(const record of manifest){const e=effective.find(e=>e.path==='/post/'+record.slug);const old=base.find(x=>x.path===e.path);const expected=old?.content.author_name||(record.index<=25?'Joanne H':'Nura Interiors');assert.equal(e.content.author_name,expected,e.path);counts[expected]=(counts[expected]||0)+1;}
 assert.deepEqual(counts,{'Joanne H':26,'Nura Interiors':24});
});
test('first publication is evidenced per record and replacement text has no inherited technical endorsement',()=>{
 for(const b of batch){const e=effective.find(x=>x.path===b.path),old=base.find(x=>x.path===b.path);assert.equal(e.content.published_date,old?.content.published_date||'2026-10-23');assert.equal(e.content.modified_date,'2026-10-23');assert.equal(e.content.reviewer,undefined);assert.equal(e.content.pending_reviewer,undefined);}
});
test('hero is shown once and distinct second contextual image survives without administrative captions',()=>{
 for(const e of batch){const images=walk(e.content.body_nodes).filter(n=>n.type==='image');assert.equal(images.length,1,e.path);assert.notEqual(images[0].src,e.content.hero.filename);assert.equal(images[0].src,e.content.gallery[0].filename);assert.ok(images[0].alt);assert.equal(images[0].caption,undefined);assert.doesNotMatch(JSON.stringify(e.content.body_nodes),/Image supplied for commercial use/);}
});
test('unrelated duplicate paths retain deterministic first entry and do not mutate inputs',()=>{
 const a={path:'/legacy',content:{title:'first'}},b={path:'/legacy',content:{title:'second'}};
 assert.deepEqual(mergeBatchEntries([a,b],[]),[a]);
});
test('CMS fallback includes all batch bodies and media wall without issuing real network requests',async()=>{
 const source=process.env.CONTENT_SOURCE,token=process.env.STORYBLOK_TOKEN,originalFetch=globalThis.fetch;
 process.env.CONTENT_SOURCE='cms';process.env.STORYBLOK_TOKEN='test-only-placeholder';globalThis.fetch=async()=>({ok:true,json:async()=>({stories:[]})});
 try{const entries=await getEntries();for(const record of manifest)assert.equal(entries.find(e=>e.path==='/post/'+record.slug)?.content.title,record.title);assert.ok(entries.some(e=>e.path==='/post/bespoke-media-walls-london'));assert.equal(entries.length,new Set(entries.map(e=>e.path)).size);}
 finally{globalThis.fetch=originalFetch;if(source===undefined)delete process.env.CONTENT_SOURCE;else process.env.CONTENT_SOURCE=source;if(token===undefined)delete process.env.STORYBLOK_TOKEN;else process.env.STORYBLOK_TOKEN=token;}
});
