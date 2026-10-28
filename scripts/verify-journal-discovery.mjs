import assert from 'node:assert/strict';
import {load} from 'cheerio';
import sharp from 'sharp';
import fs from 'node:fs/promises';

const base=process.env.SEO_BASE_URL||'http://127.0.0.1:3011';
const origin='https://www.nura-interiors.com';
const production=process.env.SEO_EXPECT_INDEX!=='false';
const response=await fetch(base+'/rss.xml');
if(!production){
 assert.equal(response.status,404);assert.match(response.headers.get('cache-control'),/no-store/);
 console.log('Preview RSS remains unavailable.');
}else{
 assert.equal(response.status,200);assert.match(response.headers.get('content-type'),/^application\/rss\+xml/);
 const rss=load(await response.text(),{xmlMode:true});
 assert.equal(rss('rss').attr('version'),'2.0');assert.equal(rss('channel > language').text(),'en-GB');
 assert.equal(rss('atom\\:link').attr('href'),origin+'/rss.xml');
 const items=rss('item').toArray();assert.ok(items.length>0);
 const links=items.map(item=>rss(item).find('link').text());assert.equal(new Set(links).size,links.length);
 const sitemap=load(await(await fetch(base+'/sitemap.xml')).text(),{xmlMode:true});
 const publicPaths=sitemap('loc').map((_,e)=>sitemap(e).text()).get().filter(url=>url.startsWith(origin+'/post/'));
 assert.deepEqual([...links].sort(),[...publicPaths].sort(),'Feed and public article sitemap agree');
 let previous=Infinity;
 const pendingPaths=new Set(JSON.parse(await fs.readFile(new URL('../lib/published-editorial.json',import.meta.url))).filter(e=>['/post/single-or-double-kitchen-oven','/post/dining-bench-cushions'].includes(e.path)&&e.content?.publication_event_pending===true&&e.content.published_date===undefined&&e.content.modified_date===undefined).map(e=>origin+e.path));
 for(const item of items){const link=rss(item).find('link').text(),raw=rss(item).find('pubDate').text();if(pendingPaths.has(link)){assert.equal(rss(item).find('pubDate').length,0);continue;}const date=Date.parse(raw);assert.ok(Number.isFinite(date)&&date<=Date.now());assert.ok(date<=previous);previous=date;}
 for(const path of ['/','/journal','/post/the-power-of-porcelain','/post/kitchen-larder-cupboard']){
  const r=await fetch(base+path);assert.equal(r.status,200);const $=load(await r.text());
  assert.equal($('link[rel=alternate][type="application/rss+xml"]').attr('href'),origin+'/rss.xml',path+' RSS discovery');
  if(!path.startsWith('/post/'))continue;
  assert.match($('meta[name=robots]').attr('content'),/max-image-preview:large/);
  assert.doesNotMatch($('meta[name=robots]').attr('content'),/noindex/);
  const article=$('script[type="application/ld+json"]').toArray().map(e=>JSON.parse($(e).text())).find(s=>s['@type']==='Article');
  assert.equal(article.image['@type'],'ImageObject');
  assert.equal(article.image.url,$('meta[property="og:image"]').attr('content'));
  assert.equal(article.author.name,'Joanne H');assert.equal(article.author.url,'https://www.linkedin.com/in/joanne-h/');
  const item=items.find(item=>rss(item).find('link').text()===origin+path);assert.ok(item);
  assert.equal(Date.parse(rss(item).find('pubDate').text()),Math.floor(Date.parse(article.datePublished)/1000)*1000);
  const media=rss(item).find('media\\:content');assert.equal(media.attr('url'),article.image.url);
  const imageResponse=await fetch(base+new URL(article.image.url).pathname);assert.equal(imageResponse.status,200);
  const size=await sharp(Buffer.from(await imageResponse.arrayBuffer())).metadata();
  for(const key of ['width','height']){
   if(article.image[key]!==undefined)assert.equal(article.image[key],size[key],path+' schema '+key);
   if(media.attr(key)!==undefined)assert.equal(Number(media.attr(key)),size[key],path+' RSS '+key);
  }
  if(path.endsWith('kitchen-larder-cupboard'))assert.equal(article.datePublished,'2026-10-24T10:49:41.833Z');
 }
 console.log('RSS: '+items.length+' published articles, XML/channel/ordering/sitemap parity; homepage, Journal, legacy/new article discovery, dates and real image sizes passed.');
}
