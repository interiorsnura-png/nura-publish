import {readFileSync} from 'node:fs';
import {join} from 'node:path';

// Homepage is an HTML route. Inline its small local styles in their existing
// cascade order, removing serial stylesheet requests without a flash of layout.
export function improveHomePerformance(html:string){
 html=html.replace('<head>','<head><link rel="preload" as="image" href="/assets/selected/3e30b0a15f5f-640.webp" imagesrcset="/assets/selected/3e30b0a15f5f-640.webp 640w, /assets/selected/3e30b0a15f5f-1280.webp 1280w, /assets/selected/3e30b0a15f5f-1600.webp 1600w" imagesizes="100vw" fetchpriority="high"/>');
 const analytics=readFileSync(join(process.cwd(),'public','nura-analytics.js'),'utf8');
 const consentContent=analytics.match(/banner\.innerHTML='([^']+)';/)?.[1];
 if(!consentContent)throw new Error('Consent markup missing');
 html=html.replace('</head>','<link rel="preload" href="/assets/fonts/dm-web-3.woff2" as="font" type="font/woff2" crossorigin/><link rel="preload" href="/assets/fonts/dm-web-5.woff2" as="font" type="font/woff2" crossorigin/><style>@media(max-width:800px){.hero-enter,.hero-enter .eyebrow,.hero-enter h1,.hero-enter .hero-lede,.hero-enter .button{animation:none!important}.hero-aurora{display:none}}</style></head>');
 html=html.replace(/(<body\b[^>]*>)/,`$1<section class="nura-consent" data-nura-consent aria-label="Analytics preferences">${consentContent}</section><script>(()=>{const b=document.querySelector('[data-nura-consent]');let saved=null;try{const v=JSON.parse(localStorage.getItem('nura-analytics-consent-v2'));if(v&&Date.now()-v.time<180*86400000)saved=v.value}catch{}if(saved||location.hostname!=='www.nura-interiors.com')b.hidden=true;else document.body.classList.add('nura-consent-open')})()</script>`);
 html=html.replace(/<script src="\/nura-analytics.js" defer><\/script>/,()=>{
  return `<script data-nura-consent-bootstrap>${analytics.replace(/<\/script/gi,'<\\/script')}</script>`;
 });
 return html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g,tag=>{
  const href=tag.match(/href="([^"]+)"/)?.[1];
  if(!href || !/^\/?nura-[a-z-]+\.css$/.test(href))return tag;
  const css=readFileSync(join(process.cwd(),'public',href.replace(/^\//,'')),'utf8');
  return `<style data-nura-style="${href}">${css.replace(/<\/style/gi,'<\\/style')}</style>`;
 }).replace('</head>',`<style>:root{--sans:'DM Sans','Nura Sans Fallback',Arial,sans-serif;--serif:'DM Serif Display','Nura Serif Fallback',Georgia,serif}</style></head>`);
}
