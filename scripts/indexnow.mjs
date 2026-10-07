import {readFile} from 'node:fs/promises';

// IndexNow requires this verification key to be publicly served on the site.
const config=JSON.parse(await readFile(new URL('../indexnow.json',import.meta.url),'utf8'));
const origin=`https://${config.host}`;
const args=process.argv.slice(2);
const all=args.includes('--all');
const dryRun=args.includes('--dry-run');
let urls=args.filter(x=>!x.startsWith('--'));
if(args.some(x=>x.startsWith('--')&&!['--all','--dry-run'].includes(x)))throw Error('Unknown option');
if(all&&urls.length)throw Error('Use --all or explicit changed URLs, not both');
if(all){
 const response=await fetch(origin+'/sitemap.xml',{signal:AbortSignal.timeout(20000)});
 if(!response.ok)throw Error(`Sitemap returned HTTP ${response.status}`);
 urls=[...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1].replaceAll('&amp;','&'));
}
if(!urls.length)throw Error('Specify changed URLs, or --all for the initial site submission');
const urlList=[...new Set(urls.map(value=>{
 const url=new URL(value,origin);
 if(url.origin!==origin||url.username||url.password||url.search||url.hash)throw Error('Only canonical Nura URLs without query strings or fragments can be submitted');
 return url.href;
}))];
if(urlList.length>10000)throw Error('IndexNow accepts up to 10,000 URLs per submission');
if(dryRun){console.log(JSON.stringify({host:config.host,count:urlList.length,urlList},null,2));process.exit(0);}
const keyResponse=await fetch(config.keyLocation,{signal:AbortSignal.timeout(20000)});
if(!keyResponse.ok||(await keyResponse.text()).trim()!==config.key)throw Error('Verification file is not yet available on the production site');
const response=await fetch('https://www.bing.com/indexnow',{
 method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},
 body:JSON.stringify({...config,urlList}),signal:AbortSignal.timeout(30000)
});
if(![200,202].includes(response.status))throw Error(`IndexNow rejected submission: HTTP ${response.status}. ${(await response.text()).slice(0,300)}`);
console.log(JSON.stringify({submittedAt:new Date().toISOString(),host:config.host,count:urlList.length,status:response.status,result:response.status===200?'Received by Bing':'Received; key verification pending'},null,2));
