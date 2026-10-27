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
const path='/post/choosing-a-kitchen-showroom-in-fulham';
const article=entries.find(e=>e.path===path);
const flatten=nodes=>nodes.map(n=>n.text||flatten(n.children||[])).join(' ');
const links=nodes=>nodes.flatMap(n=>[...(n.link?[n.link]:[]),...links(n.children||[])]);
test('Fulham article is unique, complete and uses real internal destinations',()=>{
 assert.equal(entries.filter(e=>e.path===path).length,1);
 assert.equal(article.content.title,'Choosing a Kitchen Showroom in Fulham: What to Check Before You Commit');
 assert.equal(article.content.published_date,'2026-10-11T05:40:22Z');
 assert.equal(article.content.author_name,'Nura Interiors');
 const nodes=article.content.body_nodes,text=flatten(nodes);
 assert.ok(text.split(/\s+/).length>=650);
 for(const heading of ['Check cabinet construction beyond the door finish','Try the hinges and drawer runners','Compare physical material samples','Bring useful documents to your first meeting'])assert.ok(nodes.some(n=>n.type==='heading'&&flatten(n.children)===heading));
 assert.ok(nodes.filter(n=>n.type==='ul').length>=4);
 assert.doesNotMatch(text,/\u2014/);
 const destinations=links(nodes);
 assert.equal(destinations.filter(href=>href==='/london#london-enquiry-showroom').length,2);
 assert.ok(!destinations.includes('/consultation'));
 for(const href of destinations.filter(href=>href.startsWith('/')))assert.ok(entries.some(e=>e.path===href.split('#')[0]),href);
 assert.ok(destinations.includes('https://www.blum.com/gb/en/products/runnersystems/movento/programme/'));
 assert.ok(fs.existsSync(new URL('public'+article.content.hero.filename,root)));
});
test('rendered Fulham journey books a showroom visit and existing journeys retain consultation',()=>{
 const journey=load('lib/article-journeys.ts');
 const Component=load('components/ArticleJourney.tsx').default;
 const $=cheerio.load(renderToStaticMarkup(React.createElement(Component,{path,entries})));
 const final=$('.article-journey li').last().find('a');
 assert.equal(final.attr('href'),'/london#london-enquiry-showroom');
 assert.match(final.text(),/Arrange your Fulham showroom visit/);
 assert.equal($('.article-journey a[href="/consultation"]').length,0);
 for(const old of entries.filter(e=>e.content.component==='article'&&e.path!==path))assert.equal(journey.getArticleJourney(old.path,entries).enquiry.href,'/consultation');
});
test('Fulham appears in planning recommendations and journal ItemList with canonical URL',()=>{
 const related=load('lib/related-articles.ts');
 assert.ok(related.articleRecommendationDetails(article).tags.includes('planning'));
 assert.deepEqual(related.getRelatedArticles(article,entries).map(e=>e.path),['/guides/bespoke-kitchens','/post/solid-wood-or-veneer']);
 const journal=load('lib/journal-schema.ts');
 const articles=entries.filter(e=>e.content.component==='article');
 const list=journal.journalCollectionSchema(articles,'all',article.content.hero)['@graph'].find(s=>s['@type']==='ItemList');
 assert.equal(list.numberOfItems,articles.length);
 assert.equal(list.itemListElement.filter(i=>i.url==='https://www.nura-interiors.com'+path).length,1);
});

test('Fulham editorial checks preserve attribution and provide practical inspection aids',()=>{
 const c=article.content;
 assert.deepEqual(c.reviewer,{name:'Alex J',role:'Execution and installation lead',reviewed_date:'2026-10-11'});
 assert.match(c.author_bio,/private homeowners and design teams/);
 assert.ok(flatten([c.body_nodes[0]]).split(/\s+/).length<=40);
 assert.equal(c.body_nodes.find(n=>n.type==='callout').children[0].children.length,5);
 const table=c.body_nodes.find(n=>n.type==='table');
 const images=c.body_nodes.filter(n=>n.type==='image').map(n=>n.src);
 assert.ok(images.includes('/assets/guides/nura-guide-timber-cabinetry.webp'));
 assert.ok(images.includes('/assets/editorial/fulham-showroom-checklist-infographic.webp'));
 const png=fs.readFileSync(new URL('public'+c.social_image.filename,root));
 assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
});
