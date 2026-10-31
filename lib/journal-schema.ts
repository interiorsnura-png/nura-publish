import {journalVideos} from './journal-videos';
import type {Asset,Entry} from './content';
import {absoluteImage,listingMetadata,organization,siteUrl} from './seo';
import {journalPageURL,journalCategoryContent,journalFilters} from './journal-browse';
export const journalFeaturedPaths=['/post/one-tonne-porcelain-kitchen-island','/guides/bespoke-kitchens','/post/solid-wood-or-veneer'];
export function journalCollectionSchema(entries:Entry[],category:string|undefined,hero?:Asset,page=1,query='',featured:Entry[]=[],images:unknown[]=[],groups:{id:string;title:string;entries:Entry[]}[]=[]){
 const url=siteUrl+journalPageURL(category||'all',query,page),base=siteUrl+'/journal';
 const image=absoluteImage(hero?.filename),copy=journalCategoryContent[category||''];
 const ref=(id:string)=>({'@id':id});
 const terms=[...journalFilters.filter(([id])=>id!=='all'),['styling','Styling & Details']];
 const list=(id:string,name:string,items:Entry[])=>({'@type':'ItemList','@id':id,url,name,numberOfItems:items.length,itemListOrder:'https://schema.org/ItemListOrderAscending',itemListElement:items.map((entry,index)=>({'@type':'ListItem',position:index+1,name:entry.path===journalFeaturedPaths[0]&&id.endsWith('#featured')?'A One-Tonne Porcelain Kitchen Island':entry.content.title,url:siteUrl+entry.path,item:{'@type':'WebPage','@id':siteUrl+entry.path+'#webpage',url:siteUrl+entry.path,name:entry.content.title}}))});
 return {'@context':'https://schema.org','@graph':[
  {'@type':'WebSite','@id':siteUrl+'/#website',url:siteUrl+'/',name:'NURA Interiors',inLanguage:'en-GB',publisher:ref(organization['@id'])},
  {'@type':'Blog','@id':base+'#blog',url:base,name:'The NURA Journal',description:listingMetadata['/journal'].description,inLanguage:'en-GB',isAccessibleForFree:true,publisher:ref(organization['@id']),isPartOf:ref(siteUrl+'/#website'),about:terms.map(([id])=>ref(base+'#topic-'+id))},
  {'@type':'CollectionPage','@id':url+'#webpage',url,name:copy?.title||listingMetadata['/journal'].title,description:copy?.description||listingMetadata['/journal'].description,inLanguage:'en-GB',isAccessibleForFree:true,isPartOf:ref(siteUrl+'/#website'),about:ref(base+'#blog'),publisher:ref(organization['@id']),breadcrumb:ref(base+'#breadcrumb'),mainEntity:ref(url+'#articles'),hasPart:[...entries,...featured].filter((entry,index,all)=>all.findIndex(e=>e.path===entry.path)===index).map(entry=>ref(siteUrl+entry.path+'#webpage')),...(image?{primaryImageOfPage:ref(image+'#image')}:{}),potentialAction:{'@type':'SearchAction',target:{'@type':'EntryPoint',urlTemplate:base+'?q={search_term_string}'},'query-input':'required name=search_term_string'}},
  list(url+'#articles','Journal articles on this page',entries),
  ...(featured.length?[list(url+'#featured','Selected for your project',featured)]:[]),
  ...groups.filter(g=>g.entries.length).map(g=>list(url+'#category-'+g.id,g.title,g.entries)),
  {'@type':'DefinedTermSet','@id':base+'#topics',name:'NURA Journal topics',url:base,hasDefinedTerm:terms.map(([id])=>ref(base+'#topic-'+id))},
  ...terms.map(([id,name])=>({'@type':'DefinedTerm','@id':base+'#topic-'+id,name,termCode:id,url:siteUrl+journalPageURL(id,''),description:journalCategoryContent[id]?.description,inDefinedTermSet:ref(base+'#topics')})),
  ...(featured.length?journalVideos.map(video=>({'@type':'VideoObject','@id':siteUrl+video.src+'#video',name:video.title,contentUrl:siteUrl+video.src,thumbnailUrl:siteUrl+video.poster,duration:video.duration,uploadDate:video.uploadDate,width:video.width,height:video.height,publisher:ref(organization['@id']),isPartOf:ref(url+'#webpage')})):[]),
  ...images
 ]};
}
export function uniqueJournalImages(entries:Entry[]):{asset:Asset;name:string}[]{
 const images=new Map<string,{asset:Asset;name:string}>();
 for(const entry of entries){const asset=entry.content.hero;const url=absoluteImage(asset?.filename);if(asset&&url&&!images.has(url))images.set(url,{asset,name:entry.content.title});}
 return [...images.values()];
}
