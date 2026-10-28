import 'server-only';
import {draftMode} from 'next/headers';
import {cache} from 'react';
import archive from '../migration/content-backup.json';
import publishedProjects from './published-projects.json';
import publishedEditorial from './published-editorial.json';
import publishedPages from './published-pages.json';
import publishedMediaWall from './published-media-wall.json';
import type {ArticleNode} from '../components/RichArticle';
import {loadMediaWallPreview,mediaWallPreviewPath} from './seo-media-wall-preview';
import {getNura50PublicEntries} from './nura-50-drafts';
export type Asset={filename:string;alt?:string;caption?:string;width?:number;height?:number};
export type Content={component:string;title:string;location?:string;category?:string;summary?:string;body?:string;specifications?:string;hero?:Asset;gallery?:Asset[];seo_title?:string;seo_description?:string;published_date?:string;modified_date?:string;publication_event_pending?:boolean;body_nodes?:ArticleNode[];author_name?:string;author_bio?:string;pending_reviewer?:{name:string;role:string};social_image?:Asset;large_image_preview?:boolean;reviewer?:{name:string;role:string;reviewed_date:string};image_rights_status?:string;source_publish_status?:string;source_rank?:number;};
export type Entry={path:string;content:Content;source?:{collection:string;id:string}};

// Owner-assigned Journal byline, applied after all source merges.
export function assignJournalAuthor(entries:Entry[]):Entry[]{
  return entries.map(entry=>entry.content.component==='article'?{
    ...entry,content:{...entry.content,author_name:'Joanne H',
      author_bio:entry.content.author_name==='Joanne H'?entry.content.author_bio:undefined}
  }:entry);
}

export function mergeBatchEntries(base:Entry[],batch:Entry[]):Entry[]{
  const map=new Map<string,Entry>();
  base.forEach(e=>{if(!map.has(e.path))map.set(e.path,e);});
  batch.forEach(b=>{
    const old=map.get(b.path);
    if(old){
      const nb=b.content, ob=old.content;
      const merged={...ob,
        title:nb.title||ob.title,
        body:nb.body||ob.body,
        seo_title:nb.seo_title||ob.seo_title,
        seo_description:nb.seo_description||ob.seo_description,
        hero:nb.hero||ob.hero,
        social_image:nb.social_image||nb.hero,
        body_nodes:nb.body_nodes||ob.body_nodes,
        author_name:ob.author_name||nb.author_name,
        author_bio:ob.author_bio||nb.author_bio,
        published_date:nb.published_date||ob.published_date,
        category:ob.category||nb.category,
        modified_date:nb.modified_date||ob.modified_date};
      delete merged.reviewer;delete merged.pending_reviewer;
      map.set(b.path,{...old,content:merged});
    }else map.set(b.path,b);
  });
  return Array.from(map.values());
}

function apiBase(){const region=process.env.STORYBLOK_REGION||'eu';const hosts:Record<string,string>={eu:'api.storyblok.com',us:'api-us.storyblok.com',ap:'api-ap.storyblok.com',ca:'api-ca.storyblok.com'};if(!hosts[region])throw Error('Invalid Storyblok region');return 'https://'+hosts[region]+'/v2/cdn/stories';}
export const getEntries=cache(async ():Promise<Entry[]> => {
  if(!process.env.CONTENT_SOURCE || process.env.CONTENT_SOURCE==='local' || process.env.CONTENT_SOURCE==='backup'){
    const base=mergeBatchEntries([...archive,...publishedProjects,...publishedEditorial,...publishedPages,publishedMediaWall] as Entry[],getNura50PublicEntries());
    if(process.env.SEO_MEDIA_WALL_PREVIEW==='true'&&!base.some(entry=>entry.path===mediaWallPreviewPath))return assignJournalAuthor([...base,await loadMediaWallPreview()]);
    return assignJournalAuthor(base);
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
    if(result.stories.length<100)return assignJournalAuthor(mergeBatchEntries([...entries,...([...publishedProjects,...publishedEditorial,...publishedPages,publishedMediaWall] as Entry[]).filter(p=>!entries.some(e=>e.path===p.path))],getNura50PublicEntries()));
  }
  throw Error('CMS pagination exceeded safety limit');
});
export async function getEntry(path:string){return (await getEntries()).find(x=>x.path===path);}
