import type {MetadataRoute} from 'next';
import {getEntries} from '../lib/content';
import {homeModified} from '../lib/content-dates';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 if(process.env.SITE_ENV!=='production')return [];
 const site=process.env.NEXT_PUBLIC_SITE_URL;if(!site)throw Error('Canonical site URL missing');
 const entries=await getEntries();
 const paths=[...new Set(['/','/projects','/services','/journal','/inspiration',...entries.map(x=>x.path)])];
 return paths.map(path=>{
  const content=entries.find(x=>x.path===path)?.content;
  const modified=path==='/'?homeModified:content?.modified_date||content?.published_date;
  return {url:site.replace(/\/$/,'')+path,...(modified&&Number.isFinite(Date.parse(modified))?{lastModified:modified}:{})};
 });
}
