import type {Entry} from './content';
import {selectArticleImage} from './article-discovery';

const xml=(value:string)=>value
 .replace(/[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/gu,'')
 .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
const mimeTypes:Record<string,string>={webp:'image/webp',jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',avif:'image/avif',gif:'image/gif'};

export function renderJournalRss(entries:Entry[],site:string,resolveImage:(filename?:string)=>string|undefined,now=new Date()):string{
 const origin=new URL(site).origin;
 if(!/^https?:$/.test(new URL(site).protocol))throw Error('RSS requires an HTTP site URL');
 const seen=new Set<string>();
 const articles=entries.filter(entry=>{
  const c=entry.content,published=Date.parse(c.published_date||'');
  // The public migration loader retains "unknown" as historical provenance for live legacy articles.
  if(c.component!=='article'||(c.source_publish_status!==undefined&&!['published','unknown'].includes(c.source_publish_status)))return false;
  if(!/^\/post\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.path)||!Number.isFinite(published)||published>now.getTime()||seen.has(entry.path))return false;
  seen.add(entry.path);return true;
 }).sort((a,b)=>Date.parse(b.content.published_date!)-Date.parse(a.content.published_date!));
 let latest=Number.NEGATIVE_INFINITY;
 const items=articles.map(({path,content:c})=>{
  const published=Date.parse(c.published_date!),modified=Date.parse(c.modified_date||'');
  latest=Math.max(latest,Number.isFinite(modified)&&modified>=published&&modified<=now.getTime()?modified:published);
  const url=origin+path;
  let media='';
  try{
   const image=selectArticleImage(c,resolveImage);
   if(image){
    const imageUrl=new URL(image.url);
    if(/^https?:$/.test(imageUrl.protocol)){
     const type=mimeTypes[imageUrl.pathname.split('.').pop()?.toLowerCase()||''];
     media=`<media:content url="${xml(imageUrl.href)}" medium="image"${type?` type="${type}"`:''}${image.width?` width="${image.width}"`:''}${image.height?` height="${image.height}"`:''}/>`;
    }
   }
  }catch{/* A malformed optional image must not break discovery of a valid article. */}
  return `<item><title>${xml(c.seo_title||c.title)}</title><link>${xml(url)}</link><guid isPermaLink="true">${xml(url)}</guid><description>${xml(c.seo_description||c.summary||'')}</description><pubDate>${new Date(published).toUTCString()}</pubDate>${media}</item>`;
 }).join('\n');
 return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<channel><title>Nura Interiors Journal</title><link>${xml(origin+'/journal')}</link>
<description>Kitchen design, materials and architectural joinery from the Nura Interiors Journal.</description><language>en-GB</language>
<atom:link href="${xml(origin+'/rss.xml')}" rel="self" type="application/rss+xml"/>
${Number.isFinite(latest)?`<lastBuildDate>${new Date(latest).toUTCString()}</lastBuildDate>`:''}
${items}</channel></rss>`;
}
