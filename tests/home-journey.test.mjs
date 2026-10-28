import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {load} from 'cheerio';
import {improveHomeJourney} from '../lib/home-journey.mjs';
const original=JSON.parse(readFileSync(new URL('../lib/published-home.json',import.meta.url),'utf8')).html;
const result=improveHomeJourney(original), $=load(result), before=load(original);
test('homepage leads with services and real projects, preserves unique anchors and enquiry fields',()=>{
 assert.deepEqual($('main>section').slice(0,4).map((_,el)=>$(el).attr('id')||'hero').get(),['hero','services','work','approach']);
 for(const id of ['services','work','approach','process','contact'])assert.equal($('#'+id).length,1);
 assert.equal($('#contact form').html(),before('#contact form').html());
 assert.equal($('.hero').html(),before('.hero').html());
 assert.equal($('.proof-section,.styles').length,0);
 assert.ok($('#work .project-grid').index()<$('#work .work-editorial').index());
 assert.equal($('#work .work-actions a').length,1);
 assert.equal($('#work .work-actions a').attr('href'),'/projects');
 assert.equal($('#work .project-decision').length,3);
 assert.equal($('#work .project-card').last().attr('href'),'/joinery/westover-road');
});
test('showroom details retain secondary email and existing public routes',()=>{
 assert.deepEqual($('.studio-actions>a:first-child').map((_,el)=>$(el).attr('href')).get(),['/london','/dubai']);
 assert.equal($('.studio-email[href^="mailto:"]').length,2);
 assert.equal($('link[rel="canonical"]').attr('href'),'https://www.nura-interiors.com/');
 assert.equal($('.nura-reviews').html(),before('.nura-reviews').html());
});
test('missing homepage sections fail explicitly rather than silently producing partial content',()=>{
 assert.throws(()=>improveHomeJourney(original.replace('id="services"','id="gone"')),/sections missing/);
});
