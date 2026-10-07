import fs from 'node:fs/promises';
import * as cheerio from 'cheerio';
const base=process.env.SEO_BASE_URL||'http://localhost:3126';
const entries=(await Promise.all(['migration/content-backup.json','lib/published-projects.json','lib/published-editorial.json','lib/published-pages.json'].map(p=>fs.readFile(new URL('../'+p,import.meta.url),'utf8').then(JSON.parse)))).flat();
const paths=[...new Set(['/','/projects','/projects/catalogue','/services','/journal','/inspiration',...entries.map(e=>e.path)])];
const failures=[],unique=new Set();let instances=0;
const normalise=src=>{let u=new URL(src,'https://www.nura-interiors.com');if(u.pathname==='/_next/image')u=new URL(u.searchParams.get('url'),'https://www.nura-interiors.com');return u.href;};
const walk=(x,out)=>{if(!x||typeof x!=='object')return;if(x['@type']==='ImageObject')out.push(x);for(const v of Object.values(x))if(Array.isArray(v))v.forEach(y=>walk(y,out));else if(v&&typeof v==='object')walk(v,out);};
for(let i=0;i<paths.length;i+=6)await Promise.all(paths.slice(i,i+6).map(async path=>{
 const r=await fetch(base+path),$=cheerio.load(await r.text()),schemas=[];
 $('script[type="application/ld+json"]').each((_,s)=>walk(JSON.parse($(s).text()),schemas));
 $('img').each((_,img)=>{const src=$(img).attr('src');if(!src)return;const url=normalise(src);if(/\.(svg|ico)(\?|$)/i.test(url)||/favicon|wordmark|logo/i.test(url))return;
 instances++;unique.add(url);const schema=schemas.find(s=>s.contentUrl&&normalise(s.contentUrl)===url);
 if(!schema||!schema.license||!schema.acquireLicensePage||!schema.creditText||!schema.creator?.name||!schema.copyrightNotice)failures.push({path,image:url});
 });
}));
console.log(JSON.stringify({pages:paths.length,photoInstances:instances,uniquePhotos:unique.size,missingLicense:failures},null,2));if(failures.length)process.exitCode=1;
