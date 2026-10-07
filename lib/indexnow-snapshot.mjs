import {createHash} from 'node:crypto';
import {load} from 'cheerio';

export function contentFingerprint(html){
 const $=load(html);
 $('script,style,noscript').remove();
 const main=$('main, #main').first();
 if(!main.length)throw Error('Page main content is missing');
 const normalize=value=>value.replace(/\s+/g,' ').trim();
 const content={
  title:normalize($('title').text()),
  description:$('meta[name="description"]').attr('content')||'',
  canonical:$('link[rel="canonical"]').attr('href')||'',
  robots:$('meta[name="robots"]').attr('content')||'',
  text:normalize(main.text()),
  links:main.find('a[href]').map((_,el)=>$(el).attr('href')).get(),
  images:main.find('img').map((_,el)=>({src:$(el).attr('src'),alt:$(el).attr('alt')})).get()
 };
 return createHash('sha256').update(JSON.stringify(content)).digest('hex');
}

export function changedPages(previous,current){
 return Object.keys(current).filter(url=>previous[url]!==current[url]);
}
