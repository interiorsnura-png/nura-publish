import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {contentFingerprint,changedPages} from '../lib/indexnow-snapshot.mjs';

const config=JSON.parse(await readFile(new URL('../indexnow.json',import.meta.url),'utf8'));
const origin=`https://${config.host}`;
const seed=process.argv.includes('--baseline');
const statePath=seed?'scripts/indexnow-baseline.json':'.indexnow/state.json';
const reportPath='.indexnow/report.json';
await mkdir('.indexnow',{recursive:true});
const response=await fetch(origin+'/sitemap.xml',{signal:AbortSignal.timeout(30000)});
if(!response.ok)throw Error(`Production sitemap returned HTTP ${response.status}`);
const urls=[...new Set([...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1].replaceAll('&amp;','&')))];
if(!urls.length||urls.length>10000)throw Error('Invalid production sitemap size');
for(const url of urls)if(new URL(url).origin!==origin)throw Error('Sitemap includes another host');
let previous={};
if(!seed){
 try{previous=JSON.parse(await readFile(statePath,'utf8'));}
 catch(error){if(error.code!=='ENOENT')throw error;previous=JSON.parse(await readFile(new URL('./indexnow-baseline.json',import.meta.url),'utf8'));}
}
const current={};let cursor=0;
await Promise.all(Array.from({length:3},async()=>{
 while(cursor<urls.length){
  const url=urls[cursor++];let failure;
  for(let attempt=0;attempt<3;attempt++){
   try{
    const page=await fetch(url,{signal:AbortSignal.timeout(20000),redirect:'manual'});
    if(!page.ok)throw Error(`Page ${url} returned HTTP ${page.status}`);
    current[url]=contentFingerprint(await page.text());failure=null;break;
   }catch(error){failure=error;if(attempt<2)await new Promise(resolve=>setTimeout(resolve,1000*(attempt+1)));}
  }
  if(failure)throw failure;
 }
}));
const changed=changedPages(previous,current);
const removed=[];
if(!seed)for(const url of Object.keys(previous).filter(url=>!current[url])){
 const page=await fetch(url,{signal:AbortSignal.timeout(20000),redirect:'manual'});
 if([404,410].includes(page.status))removed.push(url);
 else if(page.status>=500)throw Error(`Could not confirm removed page ${url}`);
 await page.body?.cancel();
}
const submit=[...changed,...removed];
let receipt='Baseline saved; no submission';
if(!seed&&submit.length){
 const result=spawnSync(process.execPath,['scripts/indexnow.mjs',...submit],{encoding:'utf8'});
 if(result.status!==0)throw Error(result.stderr||result.error?.message||'IndexNow submission failed');
 receipt=result.stdout.trim();
}else if(!seed)receipt='No changed pages; no submission';
// Save the baseline only after Bing accepts a submission or there is nothing to send.
const ordered=Object.fromEntries(Object.entries(current).sort(([a],[b])=>a.localeCompare(b)));
await writeFile(statePath,JSON.stringify(ordered,null,2)+'\n');
const report={checkedAt:new Date().toISOString(),pages:urls.length,changed:seed?[]:changed,removed,submitted:seed?0:submit.length,receipt};
await writeFile(reportPath,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
