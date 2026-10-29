import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
import {load} from 'cheerio';

const root=new URL('../',import.meta.url), nativeRequire=createRequire(import.meta.url);
function loadTs(relative){
 const file=new URL(relative,root),mod={exports:{}};
 const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
 const require=id=>id.startsWith('.')?id.endsWith('.json')?JSON.parse(fs.readFileSync(new URL(id,file),'utf8')):loadTs(new URL(id+'.ts',file).pathname.replace(root.pathname,'')):nativeRequire(id);
 new Function('module','exports','require',compiled)(mod,mod.exports,require);
 return mod.exports;
}
const original=JSON.parse(fs.readFileSync(new URL('lib/published-home.json',root),'utf8')).html;
const {improveHomeSeo}=loadTs('lib/home-seo.ts');
const {homeSchema}=loadTs('lib/home-schema.ts');
const $=load(improveHomeSeo(original)), before=load(original);

test('homepage search, social and schema descriptions consistently identify services and cities',()=>{
 const title='Bespoke Kitchens & Joinery in London & Dubai | Nura Interiors';
 assert.equal($('title').text(),title);
 assert.equal($('meta[property="og:title"]').attr('content'),title);
 assert.equal($('meta[name="twitter:title"]').attr('content'),title);
 const description=$('meta[name="description"]').attr('content');
 assert.match(description,/bespoke kitchens and architectural joinery/i);
 assert.match(description,/Fulham/);assert.match(description,/Dubai/);
 assert.equal($('meta[property="og:description"]').attr('content'),description);
 assert.equal($('meta[name="twitter:description"]').attr('content'),description);
 const page=homeSchema['@graph'].find(n=>n['@type']==='WebPage');
 assert.equal(page.name,title);assert.equal(page.description,description);
 assert.equal($('link[rel="canonical"]').attr('href'),'https://www.nura-interiors.com/');
 assert.match($('meta[name="robots"]').attr('content'),/index, follow, max-image-preview:large/);
});

test('one visible service-led H1 retains hero imagery and enquiry form',()=>{
 assert.equal($('h1').length,1);
 assert.match($('h1').text(),/Bespoke kitchens.*and joinery/);
 assert.match($('.hero-lede').text(),/London showroom in Fulham/);
 assert.match($('.hero-lede').text(),/Dubai studio/);
 assert.equal($('.hero-image').toString(),before('.hero-image').toString());
 // The pre-existing overlay adds a budget option and privacy link; preserve submission fields.
 const fields=page=>page('#contact form input, #contact form select, #contact form textarea').map((_,el)=>({tag:el.tagName,name:page(el).attr('name'),type:page(el).attr('type'),required:page(el).attr('required')})).get();
 assert.deepEqual(fields($),fields(before));
 assert.equal($('#contact form').attr('action'),before('#contact form').attr('action'));
 assert.equal($('#contact form').attr('method'),before('#contact form').attr('method'));
 for(const path of ['/services/bespoke-kitchens','/services/architectural-joinery'])assert.ok($(`a[href="${path}"]`).length);
});

test('studio schema images resolve to actual public assets and do not invent Dubai postcodes',()=>{
 const studios=homeSchema['@graph'].filter(n=>n['@type']==='ProfessionalService'&&n['@id'].includes('#showroom'));
 assert.equal(studios.length,2);
 for(const studio of studios){
  const image=new URL(studio.image);
  assert.equal(image.origin,'https://www.nura-interiors.com');
  assert.ok(fs.existsSync(new URL('public'+image.pathname,root)),studio.image);
 }
 assert.equal(studios.find(s=>s.address.addressLocality==='London').address.postalCode,'SW6 6TA');
 assert.equal(studios.find(s=>s.address.addressLocality==='Dubai').address.postalCode,undefined);
});

test('selected testimonials are not represented as a business aggregate rating',()=>{
 const business=homeSchema['@graph'].find(n=>n['@id']==='https://www.nura-interiors.com/#organization');
 assert.equal(business.aggregateRating,undefined);
 assert.equal(homeSchema['@graph'].filter(n=>n['@type']==='Quotation').length,3);
 // Preserve visible testimonials; the existing overlay adds an accessible role to stars.
 assert.equal($('.nura-reviews').text(),before('.nura-reviews').text());
 assert.deepEqual($('.nura-reviews a').map((_,el)=>$(el).attr('href')).get(),before('.nura-reviews a').map((_,el)=>before(el).attr('href')).get());
});


test('service hero separates the slogan and scopes responsive typography without changing SEO copy',()=>{
 assert.equal($('.hero.hero-service').length,1);
 assert.equal($('#hero-title').html(),'Bespoke kitchens<br><em>and joinery.</em>');
 assert.equal($('.hero-slogan').text(),'A room can change a life.');
 assert.equal($('.hero-description').text(),'Discover kitchens and architectural joinery designed around you, from our London showroom in Fulham and Dubai studio.');
 assert.equal($('.hero-lede').text(),'A room can change a life. Discover kitchens and architectural joinery designed around you, from our London showroom in Fulham and Dubai studio.');
 assert.equal($('link[href="/nura-home-hero.css"]').length,1);
 const css=fs.readFileSync(new URL('public/nura-home-hero.css',root),'utf8');
 assert.match(css,/font-size: clamp\(2\.75rem, 5\.1vw, 4\.75rem\)/);
 assert.match(css,/font-size: clamp\(2\.2rem, 8\.7vw, 3\.5rem\)/);
 assert.match(css,/max-width: 16ch/);
 assert.match(css,/line-height: 1\.08/);
 assert.match(css,/text-wrap: balance/);
 assert.match(css,/@media \(max-width: 800px\)/);
 assert.match(css,/\.hero\.hero-service \.hero-slogan/);
});
