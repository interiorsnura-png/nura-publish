import {readFileSync} from 'node:fs';
import {join} from 'node:path';

// Homepage is an HTML route. Inline its small local styles in their existing
// cascade order, removing serial stylesheet requests without a flash of layout.
export function improveHomePerformance(html:string){
 html=html.replace(/<script src="\/nura-analytics.js" defer><\/script>/,()=>{
  const script=readFileSync(join(process.cwd(),'public','nura-analytics.js'),'utf8');
  return `<script data-nura-consent-bootstrap>${script.replace(/<\/script/gi,'<\\/script')}</script>`;
 });
 return html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g,tag=>{
  const href=tag.match(/href="([^"]+)"/)?.[1];
  if(!href || !/^\/?nura-[a-z-]+\.css$/.test(href))return tag;
  const css=readFileSync(join(process.cwd(),'public',href.replace(/^\//,'')),'utf8');
  return `<style data-nura-style="${href}">${css.replace(/<\/style/gi,'<\\/style')}</style>`;
 });
}
