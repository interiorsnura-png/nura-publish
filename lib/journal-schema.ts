import type {Asset,Entry} from './content';
import {absoluteImage,listingMetadata,organization,siteUrl} from './seo';
import {journalPageURL,journalCategoryContent} from './journal-browse';

export function journalCollectionSchema(entries:Entry[],category:string|undefined,hero?:Asset,page=1,query=''){
 const url=siteUrl+journalPageURL(category||'all',query,page);
 const image=absoluteImage(hero?.filename);
 const copy=journalCategoryContent[category||''];
 return {'@context':'https://schema.org','@graph':[
  {'@type':'CollectionPage','@id':url+'#webpage',url,name:copy?.title||listingMetadata['/journal'].title,description:copy?.description||listingMetadata['/journal'].description,inLanguage:'en-GB',publisher:{'@id':organization['@id']},breadcrumb:{'@id':siteUrl+'/journal#breadcrumb'},mainEntity:{'@id':url+'#articles'},...(image?{primaryImageOfPage:{'@id':image+'#image'}}:{})},
  {'@type':'ItemList','@id':url+'#articles',name:'Journal articles',numberOfItems:entries.length,itemListElement:entries.map((entry,index)=>({'@type':'ListItem',position:index+1,name:entry.content.title,url:siteUrl+entry.path}))}
 ]};
}
export function uniqueJournalImages(entries:Entry[]):{asset:Asset;name:string}[]{
 const images=new Map<string,{asset:Asset;name:string}>();
 for(const entry of entries){const asset=entry.content.hero;const url=absoluteImage(asset?.filename);if(asset&&url&&!images.has(url))images.set(url,{asset,name:entry.content.title});}
 return [...images.values()];
}
