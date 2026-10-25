import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {articlePath,inside,atomicUpdate,fingerprint,assess,POLICY,recordReady,browserPlan,boundedMap,inspectHtml,optimiseAssets} from '../scripts/journal-workflow.mjs';
import {captureJournalView} from '../scripts/journal-browser-qa.mjs';

test('workspace isolation and route identity reject traversal and guessed routes',()=>{
 assert.throws(()=>articlePath('/post/a/../../secret'));assert.throws(()=>articlePath('/other/page'));
 assert.throws(()=>inside(process.cwd(),'../outside'));assert.equal(articlePath('/post/kitchen-test'),'/post/kitchen-test');
});
test('QC rejects stale source, unknown full credit and altered weights; never infers approval from machine checks',()=>{
 const categories=Object.fromEntries(Object.entries(POLICY.weights).map(([k,max])=>[k,{score:max-1,evidence:['actual-report'],unknowns:[]}])) ,input={fingerprint:'a',categories,blockers:[]};
 assert.equal(assess(input,'a').score,95);assert.throws(()=>assess(input,'b'),/Stale/);
 input.categories.research={score:20,evidence:['report'],unknowns:['not researched']};assert.throws(()=>assess(input,'a'),/Unknown/);
 input.categories.research.score=21;assert.throws(()=>assess(input,'a'),/Invalid/);
 input.categories.research={score:18,evidence:['report']};input.blockers=['Incorrect canonical'];assert.equal(assess(input,'a').releaseEligible,false);
});
test('atomic writer preserves previous history and refuses competing writer without deleting their lock',async()=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'nura-workflow-')),file=path.join(dir,'register.json');
 try{await fs.writeFile(file,JSON.stringify({history:[{stage:'Research'}]}));await atomicUpdate(file,r=>{r.history.push({stage:'Draft'});return r;});assert.equal(JSON.parse(await fs.readFile(file)).history.length,2);
 await fs.writeFile(file+'.lock','another writer');await assert.rejects(()=>atomicUpdate(file,r=>r),/EEXIST/);assert.equal(await fs.readFile(file+'.lock','utf8'),'another writer');
 }finally{await fs.rm(dir,{recursive:true,force:true});}
});
test('fingerprint invalidates evidence after relevant asset or renderer changes',async()=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'nura-fingerprint-'));
 try{for(const f of ['lib/content.ts','components/RichArticle.tsx','app/inner.css','lib/article-journeys.ts','public/assets/test.webp']){await fs.mkdir(path.dirname(path.join(dir,f)),{recursive:true});await fs.writeFile(path.join(dir,f),'original');}
 const entry={content:{hero:{filename:'/assets/test.webp'}}},a=await fingerprint(dir,entry);await fs.writeFile(path.join(dir,'public/assets/test.webp'),'changed');assert.notEqual((await fingerprint(dir,entry)).fingerprint,a.fingerprint);
 }finally{await fs.rm(dir,{recursive:true,force:true});}
});
test('publication ledger preserves real first event, deduplicates and never claims live verification',async()=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'nura-ready-')),file=path.join(dir,'ledger.json'),sha='a'.repeat(40),entry={path:'/post/test'};
 const d={id:'one',source:'git',target:'production',readyState:'READY',meta:{githubCommitSha:sha,githubCommitRef:'main'},alias:['www.nura-interiors.com'],project:{id:'prj_Mw9o1sbIBkVvemRwsrE7pQQY6Md9'},buildingAt:1000,ready:2000};
 try{await fs.writeFile(file,'{}');assert.equal((await recordReady(file,entry,d,sha)).liveVerified,false);assert.equal(Object.keys(JSON.parse(await fs.readFile(file)).firstPublication).length,0);await recordReady(file,entry,d,sha,{firstPublication:true});await recordReady(file,entry,{...d,id:'two',ready:3000},sha);const ledger=JSON.parse(await fs.readFile(file));assert.equal(ledger.events.length,2);assert.equal(ledger.firstPublication[POLICY.origin+entry.path].deploymentId,'one');await assert.rejects(()=>recordReady(file,entry,{...d,id:'two',ready:3000},sha,{firstPublication:true}),/already recorded/);await assert.rejects(()=>recordReady(file,entry,{...d,project:{id:'wrong'}},sha),/project/);await assert.rejects(()=>recordReady(file,entry,d,'b'.repeat(40)),/identity/);
 }finally{await fs.rm(dir,{recursive:true,force:true});}
});
test('browser plan keeps human visual evidence pending and requests loaded images, bounded workers retain order',async()=>{
 const plan=browserPlan(POLICY.origin,{path:'/post/test'});assert.match(plan.evidenceStatus,/pending/);assert.match(plan.readiness,/naturalWidth/);assert.equal(plan.viewports[1].width,390);
 let active=0,max=0;const result=await boundedMap([1,2,3,4,5],async n=>{active++;max=Math.max(max,active);await Promise.resolve();active--;return n*2;},2);assert.deepEqual(result,[2,4,6,8,10]);assert(max<=2);
});
test('route checks catch wrong canonical, restrictive headers, metadata drift and schema author mismatch',()=>{
 const entry={path:'/post/test',content:{title:'Test',seo_title:'Test',seo_description:'Useful test',published_date:'2026-10-24T05:00:00Z',image_rights_status:'owned',hero:{filename:'/assets/hero.webp'},body_nodes:[{type:'image',src:'/assets/a.webp',alt:'First'},{type:'image',src:'/assets/b.webp',alt:'Second'}]}};
 const image=POLICY.origin+'/assets/hero.webp',graph=[{'@type':'Article',image,author:{name:POLICY.author,url:POLICY.profile},datePublished:entry.content.published_date},{'@type':'BreadcrumbList'}];
 const html=`<title>Test</title><meta name="description" content="Useful test"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${POLICY.origin}/post/test"><meta property="og:image" content="${image}"><meta name="twitter:image" content="${image}"><meta property="og:title" content="Test"><meta property="og:description" content="Useful test"><meta name="twitter:title" content="Test"><meta name="twitter:description" content="Useful test"><h1>Test</h1><div class="article-byline"><a href="${POLICY.profile}">${POLICY.author}</a></div><div class="article-content"><img alt="First"><img alt="Second"></div><script type="application/ld+json">${JSON.stringify({'@graph':graph})}</script>`;
 assert.equal(inspectHtml(html,entry).pass,true);
 const objectImageHtml=html.replace('"image":"'+image+'"','"image":{"@type":"ImageObject","url":"'+image+'"}');
 assert.equal(inspectHtml(objectImageHtml,entry).pass,true);
 assert.equal(inspectHtml(objectImageHtml.replace('"url":"'+image+'"','"url":"'+POLICY.origin+'/wrong.webp"'),entry).pass,false);
 assert.equal(inspectHtml(html.replace('rel="canonical" href="'+POLICY.origin+'/post/test','rel="canonical" href="'+POLICY.origin+'/post/wrong'),entry).pass,false);
 assert.equal(inspectHtml(html,entry,{'x-robots-tag':'noindex'}).pass,false);
 assert.equal(inspectHtml(html.replace('content="Useful test"','content="Wrong"'),entry).pass,false);
 assert.equal(inspectHtml(html.replace('"name":"Joanne H"','"name":"Invented"'),entry).pass,false);
});
test('browser helper never captures unsettled viewport or unloaded visible assets, never grants visual pass',async()=>{
 let captured=0;const state={width:390,height:844,scrollWidth:390,visibleImages:[{complete:false,naturalWidth:0}]},args={width:390,height:844,viewport:{set:async()=>{}},tab:{getAXState:async()=>{},playwright:{evaluate:async()=>state},getScreenshot:async()=>{captured++;return Buffer.from('pixels');}},saveScreenshot:async()=>{}};
 assert.equal((await captureJournalView(args)).status,'pending');assert.equal(captured,0);state.visibleImages=[{complete:true,naturalWidth:1200}];const result=await captureJournalView(args);assert.equal(captured,1);assert.equal(result.visualReview,'pending');state.scrollWidth=500;assert.equal((await captureJournalView(args)).status,'failed');
});
test('asset preparation keeps originals, refuses overwrite and missing provenance, emits measured review-pending assets',async()=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'nura-assets-'));const {default:sharp}=await import('sharp');
 try{await fs.mkdir(path.join(dir,'public/assets/editorial'),{recursive:true});const original=path.join(dir,'fixture.png');await sharp({create:{width:16,height:24,channels:3,background:'#c4a581'}}).png().toFile(original);const before=await fs.readFile(original),assets=['hero','detail','position'].map(name=>({name,original,prompt:'Fixture prompt',alt:'Fixture',credit:'Nura Interiors',rights:'owned',provenance:'Test fixture'})),manifest={slug:'fixture',assets};
 const report=await optimiseAssets(dir,manifest);assert.equal(report.length,3);assert.equal(report[0].width,1536);assert.equal(report[0].height,864);assert.match(report[0].visualReview,/pending/);assert.deepEqual(await fs.readFile(original),before);await assert.rejects(()=>optimiseAssets(dir,manifest),/already exists/);await assert.rejects(()=>optimiseAssets(dir,{slug:'other',assets:assets.map(x=>({...x,provenance:''}))}),/provenance/);
 const four=await optimiseAssets(dir,{slug:'four',assets:[...assets,{...assets[0],name:'handover'}]});assert.equal(four.length,4);await assert.rejects(()=>optimiseAssets(dir,{slug:'duplicate',assets:[assets[0],assets[0]]}),/Duplicate/);await assert.rejects(()=>optimiseAssets(dir,{slug:'empty',assets:[]}),/At least one/);
 }finally{await fs.rm(dir,{recursive:true,force:true});}
});
