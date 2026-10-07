import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

const source=readFileSync(new URL('../public/nura-analytics.js',import.meta.url),'utf8');
function browser(saved=null){
 const nodes=[],scripts=[],listeners={},writes=[],clickHandlers=[];
 const element=()=>({hidden:false,dataset:{},setAttribute(){},addEventListener(n,f){this[n]=f;}});
 const window={dispatchEvent(e){listeners[e.type]?.(e);},addEventListener(n,f){listeners[n]=f;}};
 const document={querySelectorAll(){return [];},referrer:'https://example.com/?private=secret',cookie:'_ga=test',createElement:element,head:{append(n){scripts.push(n);}},body:{classList:{add(){},remove(){}},append(...n){nodes.push(...n);}},addEventListener(n,f){if(n==='click')clickHandlers.push(f);}};
 vm.runInNewContext(source,{window,document,location:{hostname:'www.nura-interiors.com',origin:'https://www.nura-interiors.com',pathname:'/london',search:'?email=secret'},localStorage:{getItem(){return saved;},setItem(k,v){writes.push(v);}},CustomEvent:class {constructor(type){this.type=type;}},Date});
 return {window,nodes,scripts,writes,click(target){for(const f of clickHandlers)f({target});},choose(value){nodes[0].click({target:{closest(){return {dataset:{choice:value}};}}});},lead(detail){listeners['nura:enquiry-success']({detail});}};
}
test('analytics remains offline until explicit acceptance and stops tracking on withdrawal',()=>{
 const b=browser(); b.lead({}); assert.equal(b.scripts.length,0); assert.equal(b.window.dataLayer,undefined);
 b.choose('declined'); assert.equal(b.scripts.length,0);
 b.choose('accepted'); assert.equal(b.scripts.length,2);
 b.lead({lead_id:'12345678-1234-4234-8234-123456789abc',form_location:'london',enquiry_type:'showroom',email:'secret@example.com',message:'private'});
 const event=Array.from(b.window.dataLayer.at(-1)); assert.equal(event[1],'generate_lead');
 assert.deepEqual(JSON.parse(JSON.stringify(event[2])),{lead_id:'12345678-1234-4234-8234-123456789abc',form_location:'london',enquiry_type:'showroom',page_location:'https://www.nura-interiors.com/london'});
 b.choose('declined'); assert.equal(Array.from(b.window.clarity.q.at(-1))[0],'consent'); assert.equal(Array.from(b.window.clarity.q.at(-1))[1],false); const count=b.window.dataLayer.length; b.lead({}); assert.equal(b.window.dataLayer.length,count);
 assert.equal(b.window['ga-disable-G-5ZNSJY31TD'],true);
 b.choose('accepted'); assert.equal(b.scripts.length,2);
});
test('article CTA tracking is consent-gated and emits the expected event',()=>{
 const b=browser();const link={dataset:{cta:'article-early-consultation',ctaLocation:'article-intro'},href:'https://www.nura-interiors.com/consultation',closest(selector){return selector.includes('data-cta')?this:null;}};
 b.click(link);assert.equal(b.window.dataLayer,undefined);b.choose('accepted');b.click(link);const event=Array.from(b.window.dataLayer.at(-1));assert.equal(event[1],'article_cta_click');assert.deepEqual(JSON.parse(JSON.stringify(event[2])),{cta_name:'early_consultation',cta_location:'article-intro',destination:'/consultation',page_path:'/london',page_location:'https://www.nura-interiors.com/london'});
});
test('saved consent expires without being renewed by visits',()=>{
 const recent=browser(JSON.stringify({value:'accepted',time:Date.now()-86400000})); assert.equal(recent.scripts.length,2); assert.equal(recent.writes.length,0);
 const expired=browser(JSON.stringify({value:'accepted',time:Date.now()-181*86400000})); assert.equal(expired.scripts.length,0); assert.equal(expired.nodes[0].hidden,false);
});
test('same successful lead is counted once and consultation location is preserved',()=>{
 const b=browser();b.choose('accepted');
 const detail={lead_id:'12345678-1234-4234-8234-123456789abc',form_location:'consultation'};
 b.lead(detail);const count=b.window.dataLayer.length;b.lead(detail);assert.equal(b.window.dataLayer.length,count);
 assert.equal(Array.from(b.window.dataLayer.at(-1))[2].form_location,'consultation');
});
