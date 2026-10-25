import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import {findArticle} from '../scripts/journal-workflow.mjs';

const source=fs.readFileSync(new URL('../lib/article-journeys.ts',import.meta.url),'utf8');
const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const api={};new Function('exports',code)(api);
const archive=JSON.parse(fs.readFileSync(new URL('../migration/content-backup.json',import.meta.url),'utf8'));
const editorial=JSON.parse(fs.readFileSync(new URL('../lib/published-editorial.json',import.meta.url),'utf8'));
const pages=JSON.parse(fs.readFileSync(new URL('../lib/published-pages.json',import.meta.url),'utf8'));
const entries=[...archive,...editorial,...pages];

test('every declared published journal journey resolves its actual JSON or batch source and valid destinations',async()=>{
 const extra=await Promise.all(Object.keys(api.articleJourneyTargets).filter(route=>!entries.some(e=>e.path===route)).map(route=>findArticle(process.cwd(),route)));
 const current=[...entries,...extra],articles=current.filter(entry=>entry.content.component==='article');
 assert.equal(Object.keys(api.articleJourneyTargets).length,articles.length);
 for(const article of articles){
  const journey=api.getArticleJourney(article.path,current);
  assert.ok(journey,`missing journey for ${article.path}`);
  assert.ok(journey.proof,`missing proof destination for ${article.path}`);
  assert.ok(journey.service,`missing service destination for ${article.path}`);
  assert.notEqual(journey.proof.path,article.path);
  assert.ok(current.some(entry=>entry.path===journey.enquiry.href.split('#')[0]),`missing enquiry destination for ${article.path}`);
  if(article.path!=='/post/choosing-a-kitchen-showroom-in-fulham')assert.equal(journey.enquiry.href,'/consultation');
 }
});
