import JsonLd from './JsonLd';
import {absoluteImage,siteUrl} from '../lib/seo';
import type {Asset} from '../lib/content';
export default function ImageLicense({asset,name}:{asset:Asset;name?:string}){
 const url=absoluteImage(asset.filename);
 return <JsonLd data={{'@context':'https://schema.org','@type':'ImageObject','@id':url+'#image',contentUrl:url,...(asset.alt||name?{name:asset.alt||name}:{}),...(asset.caption?{caption:asset.caption}:{}),license:siteUrl+'/assets/image-license.html',acquireLicensePage:siteUrl+'/assets/image-license.html',creditText:'Nura Interiors',creator:{'@type':'Organization',name:'Nura Interiors'},copyrightNotice:'© Nura Interiors. All rights reserved.'}}/>;
}
