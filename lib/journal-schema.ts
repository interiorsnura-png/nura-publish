import type {Asset,Entry} from './content';
import {absoluteImage,listingMetadata,organization,siteUrl} from './seo';

export function journalCollectionSchema(entries:Entry[],category:string|undefined,hero?:Asset){
 const url=siteUrl+'/journal'+(category&&category!=='all'?'?category='+encodeURIComponent(category):'');
 const image=absoluteImage(hero?.filename);
 return {'@context':'https://schema.org','@graph':[
  {'@type':'CollectionPage','@id':url+'#webpage',url,name:listingMetadata['/journal'].title,description:listingMetadata['/journal'].description,inLanguage:'en-GB',publisher:{'@id':organization['@id']},breadcrumb:{'@id':siteUrl+'/journal#breadcrumb'},mainEntity:{'@id':url+'#articles'},...(image?{primaryImageOfPage:{'@id':image+'#image'}}:{})},
  {'@type':'ItemList','@id':url+'#articles',name:'Journal articles',numberOfItems:entries.length,itemListElement:entries.map((entry,index)=>({'@type':'ListItem',position:index+1,name:entry.content.title,url:siteUrl+entry.path}))}
 ]};
}
export function uniqueJournalImages(entries:Entry[]):{asset:Asset;name:string}[]{
 const images=new Map<string,{asset:Asset;name:string}>();
 for(const entry of entries){const asset=entry.content.hero;const url=absoluteImage(asset?.filename);if(asset&&url&&!images.has(url))images.set(url,{asset,name:entry.content.title});}
 return [...images.values()];
}
