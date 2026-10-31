import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {load} from 'cheerio';

const root=new URL('../',import.meta.url),nativeRequire=createRequire(import.meta.url);
function loadTs(relative,overrides={}){
 const file=new URL(relative,root),mod={exports:{}};
 const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
 const require=id=>Object.hasOwn(overrides,id)?overrides[id]:id.startsWith('.')?id.endsWith('.json')?JSON.parse(fs.readFileSync(new URL(id,file),'utf8')):loadTs(new URL(id+(id.endsWith('JsonLd')?'.tsx':'.ts'),file).pathname.replace(root.pathname,'')):nativeRequire(id);
 new Function('module','exports','require',compiled)(mod,mod.exports,require);
 return mod.exports;
}
const seo=loadTs('lib/seo.ts'),browse=loadTs('lib/journal-browse.ts');
// Unrelated route components are not rendered when exercising generateMetadata.
const routeSource=fs.readFileSync(new URL('app/[...slug]/page.tsx',root),'utf8');
const routeStubs=Object.fromEntries([...routeSource.matchAll(/from ['"]([^'"]+)['"]/g)].map(([,id])=>[id,{}]));
const route=loadTs('app/[...slug]/page.tsx',{
 ...routeStubs,'../../lib/seo':seo,'../../lib/journal-browse':browse,
 '../../lib/content':{getEntries:async()=>[]}
});
const metadata=search=>route.generateMetadata({params:Promise.resolve({slug:['journal']}),searchParams:Promise.resolve(search)});

test('journal pagination updates search and social metadata while preserving canonical filters',async()=>{
 for(const page of ['2','3']){
  const result=await metadata({page});
  const title=`Kitchen & Joinery Design Journal - Page ${page} | Nura Interiors`;
  const description=`Explore page ${page} of the Nura design journal covering bespoke kitchens, joinery, and architectural details.`;
  assert.deepEqual(result.title,{absolute:title});assert.equal(result.description,description);
  for(const social of [result.openGraph,result.twitter]){assert.equal(social.title,title);assert.equal(social.description,description);}
  assert.equal(result.alternates.canonical,`/journal?page=${page}`);
 }
 const filtered=await metadata({category:'layout',q:'drawer',page:'2'});
 assert.equal(filtered.title.absolute,'Kitchen & Joinery Design Journal - Page 2 | Nura Interiors');
 assert.equal(filtered.alternates.canonical,'/journal?category=layout&q=drawer&page=2');
});

test('journal first page and invalid pagination retain existing base and category metadata',async()=>{
 for(const page of [undefined,'1','0','-1','oops','1.5']){
  const result=await metadata({page});
  assert.equal(result.title.absolute,seo.listingMetadata['/journal'].title);
  assert.equal(result.description,seo.listingMetadata['/journal'].description);
  assert.equal(result.alternates.canonical,'/journal');
 }
 const filtered=await metadata({category:'layout',page:'1'});
 assert.equal(filtered.title.absolute,browse.journalCategoryContent.layout.title+' | NURA Journal');
 assert.equal(filtered.description,browse.journalCategoryContent.layout.description);
});

test('all three journal VideoObjects include stable ISO dates from native publication evidence',()=>{
 const {journalCollectionSchema}=loadTs('lib/journal-schema.ts');
 const featured=[{path:'/post/example',content:{title:'Example'}}];
 const videos=journalCollectionSchema([],'all',undefined,1,'',featured)['@graph'].filter(node=>node['@type']==='VideoObject');
 assert.equal(videos.length,3);
 for(const video of videos){
  assert.equal(video.uploadDate,'2026-10-07');
  assert.ok(Number.isFinite(Date.parse(video.uploadDate)));
  assert.ok(video.contentUrl);assert.ok(video.thumbnailUrl);
 }
});

test('calculator emits a free GBP Offer on its WebApplication JSON-LD',()=>{
 const {default:Page}=loadTs('app/bespoke-kitchen-cost-calculator/page.tsx',{
  './KitchenCalculatorClient':()=>null,'./page.module.css':{}
 });
 const $=load(renderToStaticMarkup(React.createElement(Page)));
 const nodes=$('script[type="application/ld+json"]').map((_,el)=>JSON.parse($(el).text())).get();
 const app=nodes.find(node=>node['@type']==='WebApplication');
 assert.ok(app);assert.equal(app.isAccessibleForFree,true);
 assert.deepEqual(app.offers,{'@type':'Offer',price:'0',priceCurrency:'GBP'});
});
