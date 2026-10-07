import 'server-only';
import {draftMode} from 'next/headers';
import {cache} from 'react';
import archive from '../migration/content-backup.json';
import publishedProjects from './published-projects.json';
import publishedEditorial from './published-editorial.json';
import publishedPages from './published-pages.json';
import type {ArticleNode} from '../components/RichArticle';
export type Asset={filename:string;alt?:string;caption?:string};
export type Content={component:string;title:string;location?:string;category?:string;summary?:string;body?:string;specifications?:string;hero?:Asset;gallery?:Asset[];seo_title?:string;seo_description?:string;published_date?:string;modified_date?:string;body_nodes?:ArticleNode[];author_name?:string;image_rights_status?:string;source_publish_status?:string;source_rank?:number;};
export type Entry={path:string;content:Content;source?:{collection:string;id:string}};
function apiBase(){const region=process.env.STORYBLOK_REGION||'eu';const hosts:Record<string,string>={eu:'api.storyblok.com',us:'api-us.storyblok.com',ap:'api-ap.storyblok.com',ca:'api-ca.storyblok.com'};if(!hosts[region])throw Error('Invalid Storyblok region');return 'https://'+hosts[region]+'/v2/cdn/stories';}
export const getEntries=cache(async ():Promise<Entry[]> => {
  if(!process.env.CONTENT_SOURCE || process.env.CONTENT_SOURCE==='local' || process.env.CONTENT_SOURCE==='backup'){
    return [...archive,...publishedProjects,...publishedEditorial,...publishedPages] as Entry[];
  }
  const preview=(await draftMode()).isEnabled;
  const token=preview?process.env.STORYBLOK_PREVIEW_TOKEN:process.env.STORYBLOK_TOKEN;
  if(!token)throw Error('Storyblok token not configured');
  const entries:Entry[]=[];
  for(let page=1;page<=100;page++){
    const url=new URL(apiBase());url.search=new URLSearchParams({token,version:preview?'draft':'published',per_page:'100',page:String(page)}).toString();
    const response=await fetch(url,{...(preview?{cache:'no-store' as const}:{next:{revalidate:60}}),signal:AbortSignal.timeout(15000)});
    if(!response.ok)throw Error('CMS request failed ('+response.status+')');
    const result=await response.json();if(!Array.isArray(result.stories))throw Error('Invalid CMS response');
    for(const story of result.stories){if(story.is_folder)continue;entries.push({path:story.full_slug==='home'?'/':'/'+story.full_slug.replace(/\/$/,''),content:story.content});}
    if(result.stories.length<100)return [...entries,...([...publishedProjects,...publishedEditorial,...publishedPages] as Entry[]).filter(p=>!entries.some(e=>e.path===p.path))];
  }
  throw Error('CMS pagination exceeded safety limit');
});
export async function getEntry(path:string){return (await getEntries()).find(x=>x.path===path);}
