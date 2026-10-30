import type {Asset} from './content';
import {absoluteImage,siteUrl,organization} from './seo';
import facts from './journal-image-facts.json';
// Measured asset facts are bundled with source, avoiding runtime filesystem dependencies.
export function journalImageSchema(asset:Asset,name:string){
 const url=absoluteImage(asset.filename)!,pathname=new URL(url).pathname;
 const measured=(facts as Record<string,{width:number;height:number;encodingFormat:string;contentSize:string}>)[pathname];
 if(!measured)throw new Error('Measure new Journal image before publication: '+pathname);
 return {'@type':'ImageObject','@id':url+'#image',url,contentUrl:url,name:asset.alt||name,...(asset.caption?{caption:asset.caption}:{}),...measured,license:siteUrl+'/assets/image-license.html',acquireLicensePage:siteUrl+'/assets/image-license.html',creditText:'Nura Interiors',creator:{'@type':'Organization','@id':organization['@id'],name:'Nura Interiors'},copyrightNotice:'© Nura Interiors. All rights reserved.'};
}
