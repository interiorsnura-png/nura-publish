import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
import {renderToStaticMarkup} from 'react-dom/server';
import React from 'react';
import * as cheerio from 'cheerio';
const nativeRequire=createRequire(import.meta.url);
const root=new URL('../',import.meta.url);
function load(relative){
 const file=new URL(relative,root),mod={exports:{}};
 const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
 const require=id=>id.startsWith('.')?id.endsWith('.json')?JSON.parse(fs.readFileSync(new URL(id,file),'utf8')):load(new URL(id+(id.includes('ArticleJourney')?'.tsx':'.ts'),file).pathname.replace(root.pathname,'')):nativeRequire(id);
 new Function('module','exports','require',compiled)(mod,mod.exports,require);return mod.exports;
}
const entries=['migration/content-backup.json','lib/published-editorial.json','lib/published-pages.json','lib/published-projects.json'].flatMap(file=>JSON.parse(fs.readFileSync(new URL(file,root),'utf8')));
const path='/post/how-to-compare-bespoke-kitchen-quotes-in-london';
const article=entries.find(e=>e.path===path);
const flatten=nodes=>nodes.map(n=>n.text||flatten(n.children||[])).join(' ');
const links=nodes=>nodes.flatMap(n=>[...(n.link?[n.link]:[]),...links(n.children||[])]);

test('Quote guide provides an itemised comparison and actionable exclusions without invented prices',()=>{
 const c=article.content,nodes=c.body_nodes;
 assert.equal(entries.filter(e=>e.path===path).length,1);
 assert.equal(c.title,'8 Things to Compare in a Bespoke Kitchen Quote: London Guide');
 assert.equal(c.category,'Planning');
 assert.ok(flatten(nodes).split(/\s+/).length>=850);
 assert.equal(nodes.find(n=>n.type==='callout').children[0].children.length,5);
 const table=nodes.find(n=>n.type==='table');assert.equal(table.children.find(n=>n.type==='tbody').children.length,8);
 assert.ok(nodes.some(n=>n.type==='heading'&&flatten(n.children)==='Check costs outside the kitchen contract'));
 assert.ok(nodes.some(n=>n.type==='heading'&&flatten(n.children)==='Ask these validation questions before committing'));
 assert.doesNotMatch(flatten(nodes),/[£$]\d|\u2014|guaranteed savings/i);
 for(const href of links(nodes))assert.ok(entries.some(e=>e.path===href),href);
 assert.equal(links(nodes).filter(href=>href==='/consultation').length,2);
 assert.ok(links(nodes).includes('/guides/bespoke-kitchens'));
 assert.ok(links(nodes).includes('/kitchens/elm-park-road'));
 assert.ok(fs.existsSync(new URL('public'+c.hero.filename,root)));
});
test('Human-confirmed technical review is recorded without changing authorship',()=>{
 assert.equal(article.content.author_name,'Joanne H');
 assert.deepEqual(article.content.reviewer,{name:'Alex J',role:'Execution and installation lead',reviewed_date:'2026-10-11'});
 assert.equal(article.content.pending_reviewer,undefined);
});
test('Quote guide journey connects the real London project and a direct consultation CTA',()=>{
 const api=load('lib/article-journeys.ts');const Component=load('components/ArticleJourney.tsx').default;
 const journey=api.getArticleJourney(path,entries);
 assert.equal(journey.proof.path,'/kitchens/elm-park-road');
 assert.equal(journey.hasCustomEnquiry,true);
 const $=cheerio.load(renderToStaticMarkup(React.createElement(Component,{path,entries})));
 assert.equal($('.article-journey li').last().find('a').attr('href'),'/consultation');
 assert.match($('.article-journey li').last().text(),/Discuss your kitchen project with Nura/);
 assert.equal(api.getArticleJourney('/post/the-power-of-porcelain',entries).hasCustomEnquiry,false);
});
test('Quote guide is classified as Planning and recommends the parent guide and showroom checklist',()=>{
 const api=load('lib/related-articles.ts');assert.ok(api.articleRecommendationDetails(article).tags.includes('planning'));
 assert.deepEqual(api.getRelatedArticles(article,entries).map(e=>e.path),['/guides/bespoke-kitchens','/post/choosing-a-kitchen-showroom-in-fulham']);
});
