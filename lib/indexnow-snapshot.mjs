import {createHash} from 'node:crypto';
import {load} from 'cheerio';

const stable=value=>Array.isArray(value)?value.map(stable):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,stable(value[key])])):value;

export function faviconLocations(html,origin){
 const $=load(html);const urls=[];
 $('link[rel]').each((_,el)=>{
  if(!/^(icon|shortcut icon|apple-touch-icon)$/i.test($(el).attr('rel')||''))return;
  const href=$(el).attr('href');if(!href)return;
  const url=new URL(href,origin);
  if(url.origin!==new URL(origin).origin||url.username||url.password)throw Error('Favicon must use the production host');
  url.search='';url.hash='';urls.push(url.href);
 });
 return [...new Set(urls)].sort();
}

export async function brandFingerprint(html,origin,fetchImpl=fetch){
 const assets=[];
 for(const url of faviconLocations(html,origin)){
  const response=await fetchImpl(url,{redirect:'manual',signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw Error(`Production favicon returned HTTP ${response.status}`);
  const data=Buffer.from(await response.arrayBuffer());
  if(!data.length)throw Error('Production favicon is empty');
  assets.push({url,hash:createHash('sha256').update(data).digest('hex')});
 }
 return createHash('sha256').update(JSON.stringify(assets)).digest('hex');
}

export function contentFingerprint(html,{brand='',origin='https://www.nura-interiors.com'}={}){
 const $=load(html);
 const schemas=$('script[type="application/ld+json"]').map((_,el)=>stable(JSON.parse($(el).html()||'null'))).get();
 const icons=faviconLocations(html,origin);
 $('script,style,noscript').remove();
 const main=$('main, #main').first();
 if(!main.length)throw Error('Page main content is missing');
 const normalize=value=>value.replace(/\s+/g,' ').trim();
 const content={
  title:normalize($('title').text()),
  description:$('meta[name="description"]').attr('content')||'',
  canonical:$('link[rel="canonical"]').attr('href')||'',
  robots:$('meta[name="robots"]').attr('content')||'',
  schemas,icons,...(brand?{brand}:{}),
  text:normalize(main.text()),
  links:main.find('a[href]').map((_,el)=>$(el).attr('href')).get(),
  images:main.find('img').map((_,el)=>({src:$(el).attr('src'),alt:$(el).attr('alt')})).get()
 };
 return createHash('sha256').update(JSON.stringify(content)).digest('hex');
}

export function changedPages(previous,current){
 return Object.keys(current).filter(url=>previous[url]!==current[url]);
}
