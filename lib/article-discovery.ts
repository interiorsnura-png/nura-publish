import type {Content} from './content';

export function articleRobots(production:boolean){
 return production?{index:true,follow:true,'max-image-preview':'large' as const}:{index:false,follow:false};
}

// Dimensions are optional: an unknown source size must never become an invented one.
export function selectArticleImage(content:Content,resolve:(filename?:string)=>string|undefined){
 const asset=content.social_image||content.hero;
 const url=resolve(asset?.filename);
 if(!asset||!url)return undefined;
 return {url,
  ...(Number.isInteger(asset.width)&&asset.width!>0?{width:asset.width}:{}),
  ...(Number.isInteger(asset.height)&&asset.height!>0?{height:asset.height}:{}),
  ...(asset.alt?{alt:asset.alt}:{})};
}

export function articleSchemaImage(content:Content,resolve:(filename?:string)=>string|undefined){
 const image=selectArticleImage(content,resolve);
 if(!image)return undefined;
 const {alt,...dimensionsAndUrl}=image;
 return {'@type':'ImageObject',...dimensionsAndUrl,...(alt?{caption:alt}:{})};
}
