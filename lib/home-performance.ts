import {readFileSync} from 'node:fs';
import {join} from 'node:path';

// Homepage is an HTML route. Inline its small local styles in their existing
// cascade order, removing serial stylesheet requests without a flash of layout.
export function improveHomePerformance(html:string){
 return html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g,tag=>{
  const href=tag.match(/href="([^"]+)"/)?.[1];
  if(!href || !/^\/?nura-[a-z-]+\.css$/.test(href))return tag;
  const css=readFileSync(join(process.cwd(),'public',href.replace(/^\//,'')),'utf8');
  return `<style data-nura-style="${href}">${css.replace(/<\/style/gi,'<\\/style')}</style>`;
 });
}
