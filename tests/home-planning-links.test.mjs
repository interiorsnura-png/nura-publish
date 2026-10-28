import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import {load} from 'cheerio';
import {improveHomeJourney} from '../lib/home-journey.mjs';
import {improveHomePlanningLinks} from '../lib/home-planning-links.mjs';
function compile(file,imports={}){
 const source=fs.readFileSync(new URL('../lib/'+file,import.meta.url),'utf8');
 const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const result={};new Function('exports','require',js)(result,name=>{assert.ok(name in imports,name);return imports[name];});return result;
}
const {improveHomeSeo}=compile('home-seo.ts',{'./footer':compile('footer.ts'),'./home-faq':compile('home-faq.ts')});
const original=JSON.parse(fs.readFileSync(new URL('../lib/published-home.json',import.meta.url),'utf8')).html;
const before=improveHomeJourney(improveHomeSeo(original));
const result=improveHomePlanningLinks(before),$=load(result),previous=load(before);
test('contextual guides and wardrobe destination render as descriptive crawlable links in the real homepage pipeline',()=>{
 assert.equal($('#home-planning').length,1);assert.equal($('#home-planning h2').text(),'Planning yourkitchen?');
 assert.deepEqual($('#home-planning h3 a').map((_,el)=>$(el).attr('href')).get(),['/guides/bespoke-kitchens','/post/how-to-compare-bespoke-kitchen-quotes-in-london','/post/how-to-choose-the-right-worktop-for-your-kitchen']);
 assert.equal($('#home-planning a a').length,0);assert.equal($('#home-planning a[rel=nofollow]').length,0);
 assert.equal($('#home-planning').next('section').attr('id'),'faq');
 assert.equal($('#services .home-joinery-link').attr('href'),'/services/wardrobes-dressing-rooms');
 assert.equal($('#services .home-joinery-link').text(),'Bespoke fitted wardrobes');
 assert.match($('.studio-actions a[href="/london"]').text(),/Visit our Fulham kitchen showroom/);
 assert.equal($('link[href="/nura-home-planning.css"]').length,1);
});
test('adding contextual links preserves the hero, projects, FAQ, contact form, footer and canonical',()=>{
 for(const selector of ['.hero','#work','#faq','#contact form','footer'])assert.equal($(selector).html(),previous(selector).html(),selector);
 assert.equal($('h1').text(),previous('h1').text());
 assert.equal($('link[rel=canonical]').attr('href'),previous('link[rel=canonical]').attr('href'));
 assert.equal($('script').length,previous('script').length);
 assert.equal(improveHomePlanningLinks(result),result,'Rerunning cannot duplicate links or sections');
});
test('changed source anchors fail explicitly instead of silently shipping incomplete links',()=>{
 assert.throws(()=>improveHomePlanningLinks(before.replace('id="faq"','id="missing-faq"')),/missing or repeated/);
 assert.throws(()=>improveHomePlanningLinks(before.replace('Wardrobes, libraries','Storage, libraries')),/missing or repeated/);
});
