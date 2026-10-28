import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {load} from 'cheerio';
import {validateDeploymentIdentity} from './release-guard.mjs';
import vm from 'node:vm';
import fsSync from 'node:fs';
import {createRequire} from 'node:module';

export const POLICY={author:'Joanne H',profile:'https://www.linkedin.com/in/joanne-h/',origin:'https://www.nura-interiors.com',width:1536,height:864,weights:{research:20,content:30,onPage:20,imageryUxTechnical:20,publicationMonitoring:10}};
const hash=value=>createHash('sha256').update(value).digest('hex');
const json=async file=>JSON.parse(await fs.readFile(file,'utf8'));
const assert=(condition,message)=>{if(!condition)throw Error(message);};
export function articlePath(value){assert(/^\/post\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value||''),'Expected an exact /post/slug path');return value;}
export function inside(root,file){const full=path.resolve(root,file),relative=path.relative(root,full);assert(relative&&!relative.startsWith('..')&&!path.isAbsolute(relative),'Path must remain inside workspace');return full;}
export async function atomicUpdate(file,update){
 const lock=file+'.lock',handle=await fs.open(lock,'wx');let temp;
 try{const before=await fs.readFile(file,'utf8'),value=await update(JSON.parse(before));assert(await fs.readFile(file,'utf8')===before,'Concurrent writer changed record');temp=file+'.'+process.pid+'.tmp';await fs.writeFile(temp,JSON.stringify(value,null,2)+'\n',{flag:'wx'});await fs.rename(temp,file);temp=null;return value;}finally{if(temp)await fs.unlink(temp).catch(()=>{});await handle.close();await fs.unlink(lock);}
}
export async function findArticle(root,route,{allowMissing=false}={}){
 articlePath(route);const collections=await Promise.all(['lib/published-editorial.json','migration/content-backup.json'].map(file=>json(path.join(root,file)))),matches=collections.flat().filter(x=>x.path===route);
 assert(matches.length<=1,'Expected one authoritative article record across editorial and archive');
 if(!matches.length){
  const loader=path.join(root,'lib/nura-50-drafts.ts');let exists=true;try{await fs.access(loader);}catch(e){if(e.code==='ENOENT')exists=false;else throw e;}
  if(exists){
   // Reuse the trusted site's actual parser. Only the server-only marker is inert in this read-only CLI context.
   const require=createRequire(path.join(root,'package.json')),ts=require('typescript'),source=await fs.readFile(loader,'utf8'),code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
   const module={exports:{}},context=vm.createContext({module,exports:module.exports,require:name=>{if(name==='server-only')return {};if(name==='fs'||name==='node:fs')return fsSync;if(name==='path'||name==='node:path')return path;throw Error('Unsupported batch-loader dependency: '+name);},process:{cwd:()=>root,env:{NODE_ENV:'production'}}});
   new vm.Script(code,{filename:loader}).runInContext(context,{timeout:3000});
   const entries=new vm.Script('module.exports.getNura50PublicEntries()',{filename:loader+' CLI read'}).runInContext(context,{timeout:3000});
   matches.push(...entries.filter(x=>x.path===route).map(x=>({...x,content:{...x.content,author_name:POLICY.author,author_bio:undefined}})));
  }
 }
 if(allowMissing&&!matches.length)return undefined;
 assert(matches.length===1,'Expected one authoritative article record across supported sources');assert(matches[0].content?.component==='article','Expected an article');return matches[0];
}
export async function optimiseAssets(root,manifest){
 assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.slug||''),'Invalid asset slug');assert(manifest.assets?.length>0,'At least one original image required');assert(new Set(manifest.assets.map(x=>x.name)).size===manifest.assets.length,'Duplicate asset names');
 const {default:sharp}=await import('sharp'),planned=[];
 for(const asset of manifest.assets){assert(/^[a-z]+$/.test(asset.name)&&asset.prompt&&asset.alt&&asset.credit==='Nura Interiors'&&asset.provenance&&asset.rights==='owned','Missing original image provenance/credit/prompt/alt');const target=inside(root,'public/assets/editorial/nura-'+manifest.slug+'-'+asset.name+'.webp');await fs.access(asset.original);await fs.access(target).then(()=>{throw Error('Asset already exists; reuse unchanged asset or use a new versioned name');},e=>{if(e.code!=='ENOENT')throw e;});planned.push({asset,target});}
 return boundedMap(planned,async({asset,target})=>{const bytes=await sharp(asset.original).resize(POLICY.width,POLICY.height,{fit:'contain',background:'#eee9df'}).webp({quality:85}).toBuffer();await fs.writeFile(target,bytes,{flag:'wx'});return {...asset,target,width:POLICY.width,height:POLICY.height,bytes:bytes.length,sha256:hash(bytes),visualReview:'pending; inspect original and final asset, watermark and crop via CUA/view_image'};},3);
}
export async function fingerprint(root,entry){
 const files=['lib/content.ts','components/RichArticle.tsx','app/inner.css','lib/article-journeys.ts'];
 if(entry.source?.collection==='nura-50-draft'){
  const batch='lib/drafts/nura-50',articles=(await fs.readdir(path.join(root,batch,'articles'))).filter(x=>x.endsWith('.md')).sort(),index=Number(entry.source.id)-1;
  assert(Number.isInteger(index)&&articles[index],'Invalid batch source identity');files.push('lib/nura-50-drafts.ts',batch+'/manifest.json',batch+'/articles/'+articles[index]);
 }
 for(const f of ['app/[...slug]/page.tsx','app/layout.tsx','lib/seo.ts','lib/journal-schema.ts','lib/article-discovery.ts','package.json','package-lock.json']){try{await fs.access(path.join(root,f));files.push(f);}catch(e){if(e.code!=='ENOENT')throw e;}}
 const walk=n=>{if(!n||typeof n!=='object')return;for(const [k,v]of Object.entries(n)){if((k==='filename'||k==='src')&&typeof v==='string'&&v.startsWith('/assets/'))files.push('public'+v);else if(typeof v==='object')Array.isArray(v)?v.forEach(walk):walk(v);}};walk(entry.content);
 const digests=[];for(const file of [...new Set(files)].sort()){const full=inside(root,file);digests.push({file,sha256:hash(await fs.readFile(full))});}
 return {fingerprint:hash(JSON.stringify({entry,files:digests})),files:digests};
}
export function inspectHtml(html,entry,headers={}){
 const $=load(html),c=entry.content,canonical=POLICY.origin+entry.path,failures=[];
 const check=(ok,label)=>{if(!ok)failures.push(label);};
 check(c.publication_event_pending!==true||(['/post/single-or-double-kitchen-oven','/post/dining-bench-cushions'].includes(entry.path)&&c.published_date===undefined&&c.modified_date===undefined),'Pending marker is scoped and undated');
 check($('h1').length===1,'Exactly one H1');check($('h1').text().replace(/\s+/g,' ').trim()===c.title,'H1 matches source');
 check($('title').text().startsWith(c.seo_title),'SEO title matches source');check($('meta[name=description]').attr('content')===c.seo_description,'Description matches source');
 check($('link[rel=canonical]').attr('href')===canonical,'Self canonical');
 const directives=[$('meta[name=robots]').attr('content'),$('meta[name=googlebot]').attr('content'),headers['x-robots-tag']].filter(Boolean);
 check(directives.some(x=>/max-image-preview:large/i.test(x)),'Large image preview');check(!/noindex|nofollow|none|max-image-preview:(?:none|standard)/i.test(directives.join(',')),'Conflicting robots directives');
 const og=$('meta[property="og:image"]').attr('content');check(og===POLICY.origin+(c.social_image||c.hero).filename,'Representative OG image');check($('meta[name="twitter:image"]').attr('content')===og,'Twitter image matches');
 for(const [key,value]of [['og:title',c.seo_title],['og:description',c.seo_description]])check($(`meta[property="${key}"]`).attr('content')===value,key+' matches');
 for(const [key,value]of [['twitter:title',c.seo_title],['twitter:description',c.seo_description]])check($(`meta[name="${key}"]`).attr('content')===value,key+' matches');
 let graph=[];try{graph=$('script[type="application/ld+json"]').toArray().flatMap(e=>{const v=JSON.parse($(e).text());return v['@graph']||[v];});}catch{failures.push('Invalid JSON-LD');}
 const a=graph.find(x=>x['@type']==='Article');check((typeof a?.image==='string'?a.image:a?.image?.url)===og,'Article image matches');check(a?.author?.name===POLICY.author&&a?.author?.url===POLICY.profile,'Article author');if(['/post/single-or-double-kitchen-oven','/post/dining-bench-cushions'].includes(entry.path)&&c.publication_event_pending===true){check(c.published_date===undefined&&c.modified_date===undefined&&a?.datePublished===undefined&&a?.dateModified===undefined&&!$('time[datetime]').length&&!$('meta[property="article:published_time"],meta[property="article:modified_time"]').length,'Pending publication has no invented dates');}else check(Boolean(c.published_date)&&Number.isFinite(Date.parse(c.published_date))&&a?.datePublished===c.published_date,'Publication timestamp');check(graph.some(x=>x['@type']==='BreadcrumbList'),'Breadcrumb schema');
 check($('.article-byline a').toArray().some(x=>$(x).text()===POLICY.author&&$(x).attr('href')===POLICY.profile),'Visible byline');
 check(!/AI-generated|AI generation|\u2014/i.test($('.article-content').text()),'Public editorial wording');
 const nodes=[];const visit=n=>{if(n?.type==='image')nodes.push(n);n?.children?.forEach(visit);};c.body_nodes?.forEach(visit);
 const images=[c.hero,...nodes.map(x=>({filename:x.src,alt:x.alt}))];check(images.every(x=>x?.filename)&&new Set(images.map(x=>x.filename)).size===images.length,'Distinct editorial images in source');check($('.article-content img').length===nodes.length,'Rendered editorial image count matches source');check(c.image_rights_status==='owned','Owned image rights declaration; private provenance still required');
 for(const im of nodes)check($('.article-content img').toArray().some(x=>$(x).attr('alt')===im.alt),'Descriptive image alt matches source');
 const links=[...new Set($('.article-content a,.article-journey a').toArray().map(x=>$(x).attr('href')).filter(x=>/^\/(?!\/)/.test(x||'')))];
 return {pass:!failures.length,failures,canonical,robots:directives,og,author:a?.author,datePublished:a?.datePublished,images,links,schemaScope:'Local parsing and consistency only; official Google validation remains separate'};
}
export function assess(input,currentFingerprint){
 assert(input.fingerprint===currentFingerprint,'Stale QC source fingerprint');let score=0;
 for(const [name,max]of Object.entries(POLICY.weights)){const item=input.categories?.[name];assert(item&&Number.isFinite(item.score)&&item.score>=0&&item.score<=max,'Invalid category '+name);assert(item.evidence?.length,'Missing evidence '+name);assert(item.score!==max||!item.unknowns?.length,'Unknown checks cannot receive full credit: '+name);score+=item.score;}
 return {score,thresholdMet:score>=90,releaseEligible:score>=90&&!input.blockers?.length,blockers:input.blockers||[],approvalScope:'Arithmetic and source consistency only. Does not replace evidence review, full build, exact-SHA release guards or browser checks.'};
}
export function browserPlan(base,entry){return {route:new URL(entry.path,base).href,viewports:[{width:1440,height:900},{width:390,height:844}],views:['hero/byline','each editorial image and caption','complete table above floating CTA','final CTA'],readiness:'Use CUA documented locators to await target content. After each resize/anchor navigation read current state; inspect visible images complete && naturalWidth > 0 and viewport geometry before capturing. Do not use blind sleeps, or interpret lazy images outside the viewport as failures.',checks:['All relevant images loaded; important content and watermarks intact','documentElement.scrollWidth <= innerWidth','Table fits available width and all rows can be read','Floating CTA does not make content inaccessible','Desktop and mobile screenshots visually inspected'],evidenceStatus:'pending; this plan is not browser evidence'};}
export async function boundedMap(items,fn,limit=4){let next=0;const results=[];await Promise.all(Array.from({length:Math.min(limit,items.length)},async()=>{for(;;){const i=next++;if(i>=items.length)return;results[i]=await fn(items[i]);}}));return results;}
async function request(url){const r=await fetch(url,{signal:AbortSignal.timeout(20000),redirect:'follow'});return r;}
export async function checkRoute(root,base,entry){
 const startedAt=new Date().toISOString();
 const origin=new URL(base).origin;assert(origin===POLICY.origin||/^http:\/\/(?:127\.0\.0\.1|localhost):\d+$/.test(origin),'Only canonical production or local preview supported');
 const r=await request(origin+entry.path),html=await r.text(),result=inspectHtml(html,entry,{'x-robots-tag':r.headers.get('x-robots-tag')});if(r.status!==200)result.failures.push('HTTP '+r.status);
 const {default:sharp}=await import('sharp');result.imageChecks=await boundedMap(result.images,async im=>{assert(im.filename.startsWith('/assets/')&&!im.filename.includes('..'),'Expected local owned image');const x=await request(origin+im.filename),bytes=Buffer.from(await x.arrayBuffer()),m=await sharp(bytes).metadata();return {url:POLICY.origin+im.filename,status:x.status,width:m.width,height:m.height,pixels:m.width*m.height,ratio:m.width/m.height,bytes:bytes.length,pass:x.status===200&&m.width>=1200&&m.width*m.height>300000};});
 if(result.imageChecks.some(x=>!x.pass))result.failures.push('Image response or dimensions');
 result.linkChecks=await boundedMap(result.links,async href=>{const url=new URL(href,origin);assert(url.origin===origin,'Cross-origin internal link');return {href,status:(await request(url.href)).status};});if(result.linkChecks.some(x=>x.status!==200))result.failures.push('Internal links');
 const [sitemap,journal]=await Promise.all([request(origin+'/sitemap.xml'),request(origin+'/journal')]);
 const sx=load(await sitemap.text(),{xmlMode:true}),locations=sx('loc').toArray().map(x=>sx(x).text());result.sitemap=locations.includes(POLICY.origin+entry.path);result.journalListed=(await journal.text()).includes(entry.path);
 if(!result.sitemap||sitemap.status!==200)result.failures.push('Exact sitemap URL');if(!result.journalListed||journal.status!==200)result.failures.push('Journal listing');
 return {...result,pass:!result.failures.length,base:origin,startedAt,checkedAt:new Date().toISOString(),durationMs:Date.now()-Date.parse(startedAt),source:await fingerprint(root,entry),officialGoogle:'pending separate official URL test',indexStatus:'unverified',fieldPerformance:'unverified',analyticsReceipt:'unverified'};
}
export async function recordReady(file,entry,record,expectedSha,{firstPublication=false}={}){
 assert(validateDeploymentIdentity(record,{expectedSha,expectedDomain:new URL(POLICY.origin).hostname}).valid,'Invalid production deployment identity');
 assert(record.project?.id==='prj_Mw9o1sbIBkVvemRwsrE7pQQY6Md9','Wrong Vercel project');assert(Number.isFinite(record.ready)&&record.ready>record.buildingAt,'Invalid actual READY timestamp');
 const event={canonical:POLICY.origin+entry.path,sha:expectedSha,deploymentId:record.id,readyAt:new Date(record.ready).toISOString(),deploymentBuildMs:record.ready-record.buildingAt,scope:'Supplied authoritative-record assertion; obtain fresh connector/domain/browser checks separately',liveVerified:false};
 await fs.writeFile(file,'{}',{flag:'wx'}).catch(e=>{if(e.code!=='EEXIST')throw e;});
 await atomicUpdate(file,ledger=>{ledger.events??=[];if(!ledger.events.some(x=>x.deploymentId===event.deploymentId&&x.canonical===event.canonical))ledger.events.push(event);ledger.firstPublication??={};if(firstPublication){assert(!ledger.firstPublication[event.canonical]||ledger.firstPublication[event.canonical].deploymentId===event.deploymentId,'First publication already recorded; preserve its history');ledger.firstPublication[event.canonical]??=event;}return ledger;});return event;
}
async function main(){
 const startedAt=new Date().toISOString();
 const [command,...argv]=process.argv.slice(2),options={};for(let i=0;i<argv.length;i+=2){assert(argv[i]?.startsWith('--')&&argv[i+1],'Expected --key value');options[argv[i].slice(2)]=argv[i+1];}
 const root=path.resolve(fileURLToPath(new URL('..',import.meta.url))),workspace=path.resolve(root,'..'),out=inside(workspace,options.out||'journal-workflow');await fs.mkdir(out,{recursive:true});
 for(const option of ['run','register','ledger'])if(options[option])options[option]=inside(workspace,options[option]);
 if(command==='assets'){const manifest=await json(options.input),assets=await optimiseAssets(root,manifest),report=inside(out,manifest.slug+'-assets-'+Date.now()+'.json');await fs.writeFile(report,JSON.stringify({createdAt:new Date().toISOString(),assets},null,2),{flag:'wx'});console.log(JSON.stringify({report}));return;}
 let entry,source;if(['begin','phase','summary'].includes(command)){articlePath(options.path);entry=await findArticle(root,options.path,{allowMissing:true})||{path:options.path};source=entry.content?await fingerprint(root,entry):null;}else{entry=await findArticle(root,options.path);source=await fingerprint(root,entry);}
 const routeId=entry.path.split('/').at(-1),save=async(name,data)=>{const file=inside(out,routeId+'-'+name+'.json');await fs.writeFile(file,JSON.stringify(data,null,2)+'\n',{flag:'wx'});return file;};
 if(command==='begin'){
  const run={runId:routeId+'-'+Date.now(),startedAt,root,route:entry.path,source,gitSha:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),events:[],unknowns:['Research/editorial assessment','Visual QA','Official Google test','Index/Discover','Field CWV','Analytics receipt']};
  const file=await save('run-'+Date.now(),run);console.log(JSON.stringify({runFile:file,browser:browserPlan(options.base||POLICY.origin,entry)},null,2));
 }else if(command==='check'){const result=await checkRoute(root,options.base||POLICY.origin,entry),file=await save('checks-'+Date.now(),result);console.log(JSON.stringify({report:file,pass:result.pass,failures:result.failures}));if(!result.pass)process.exitCode=1;
 }else if(command==='plan'){console.log(JSON.stringify({source,browser:browserPlan(options.base||POLICY.origin,entry)},null,2));
 }else if(command==='assess'){const assessment=assess(await json(options.input),source.fingerprint);console.log(JSON.stringify(assessment,null,2));if(!assessment.releaseEligible)process.exitCode=1;
 }else if(command==='record'){
  const report=await json(options.input);assert(report.source?.fingerprint===source.fingerprint,'Stale report');
  await atomicUpdate(options.run,run=>{assert(run.route===entry.path,'Wrong run');run.events.push({phase:options.phase||'checks',recordedAt:new Date().toISOString(),elapsedMs:Date.now()-Date.parse(run.startedAt),sourceFingerprint:source.fingerprint,report:path.resolve(options.input),reportSha256:hash(JSON.stringify(report)),pass:report.pass===true});return run;});
  if(options.register){await atomicUpdate(options.register,register=>{const matches=register.articles.filter(x=>x.canonicalUrl===POLICY.origin+entry.path);assert(matches.length===1,'Expected one stable register article');const a=matches[0];a.automationEvidence??=[];a.automationEvidence.push({recordedAt:new Date().toISOString(),sourceFingerprint:source.fingerprint,report:path.resolve(options.input),pass:report.pass===true,scope:'Machine checks only; lifecycle approval unchanged'});return register;});}console.log('Evidence recorded; lifecycle and QC approval unchanged');
 }else if(command==='phase'){assert(/^[a-z][a-z0-9-]*$/.test(options.name||'')&&['start','end'].includes(options.state),'Expected phase --name research --state start|end');await atomicUpdate(options.run,run=>{assert(run.route===entry.path,'Wrong run');run.phases??={};const phase=run.phases[options.name];if(options.state==='start'){assert(!phase,'Phase already started; preserve timing and use a new attempt name');run.phases[options.name]={startedAt};}else{assert(phase&&!phase.completedAt,'Phase missing start or already ended');phase.completedAt=startedAt;phase.durationMs=Date.parse(startedAt)-Date.parse(phase.startedAt);}run.events.push({phase:options.name,state:options.state,recordedAt:startedAt,sourceFingerprint:source?.fingerprint||null});return run;});console.log('Phase timing recorded');
 }else if(command==='summary'){const run=await json(options.run);assert(run.route===entry.path,'Wrong run');console.log(JSON.stringify({...run,elapsedMs:Date.now()-Date.parse(run.startedAt),sourceUnchanged:run.source&&source?run.source.fingerprint===source.fingerprint:null,releaseApproved:false,scope:'Run timing/evidence summary only; actual lifecycle and approvals remain in the article register'},null,2));
 }else if(command==='ready'){const event=await recordReady(options.ledger,entry,await json(options.input),options.sha,{firstPublication:options.first==='true'});console.log(JSON.stringify(event,null,2));
 }else throw Error('Commands: begin, phase, plan, assets, check, assess, record, summary, ready. Required --path /post/slug except assets; outputs under workspace work. No command pushes, deploys or awards editorial scores.');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main().catch(e=>{console.error(e.message);process.exitCode=1;});
