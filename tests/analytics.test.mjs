import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

const source=readFileSync(new URL('../public/nura-analytics.js',import.meta.url),'utf8');
function browser(saved=null){
 const nodes=[],scripts=[],listeners={},writes=[];
 const element=()=>({hidden:false,dataset:{},setAttribute(){},addEventListener(n,f){this[n]=f;}});
 const window={addEventListener(n,f){listeners[n]=f;}};
 const document={referrer:'https://example.com/?private=secret',cookie:'_ga=test',createElement:element,head:{append(n){scripts.push(n);}},body:{classList:{add(){},remove(){}},append(...n){nodes.push(...n);}},addEventListener(){}};
 vm.runInNewContext(source,{window,document,location:{hostname:'www.nura-interiors.com',origin:'https://www.nura-interiors.com',pathname:'/london',search:'?email=secret'},localStorage:{getItem(){return saved;},setItem(k,v){writes.push(v);}},Date});
 return {window,nodes,scripts,writes,choose(value){nodes[0].click({target:{closest(){return {dataset:{choice:value}};}}});},lead(detail){listeners['nura:enquiry-success']({detail});}};
}
test('analytics remains offline until explicit acceptance and stops tracking on withdrawal',()=>{
 const b=browser(); b.lead({}); assert.equal(b.scripts.length,0); assert.equal(b.window.dataLayer,undefined);
 b.choose('declined'); assert.equal(b.scripts.length,0);
 b.choose('accepted'); assert.equal(b.scripts.length,1);
 b.lead({lead_id:'12345678-1234-4234-8234-123456789abc',form_location:'london',enquiry_type:'showroom',email:'secret@example.com',message:'private'});
 const event=Array.from(b.window.dataLayer.at(-1)); assert.equal(event[1],'generate_lead');
 assert.deepEqual(JSON.parse(JSON.stringify(event[2])),{lead_id:'12345678-1234-4234-8234-123456789abc',form_location:'london',enquiry_type:'showroom',page_location:'https://www.nura-interiors.com/london'});
 b.choose('declined'); const count=b.window.dataLayer.length; b.lead({}); assert.equal(b.window.dataLayer.length,count);
 assert.equal(b.window['ga-disable-G-5ZNSJY31TD'],true);
 b.choose('accepted'); assert.equal(b.scripts.length,1);
});
test('saved consent expires without being renewed by visits',()=>{
 const recent=browser(JSON.stringify({value:'accepted',time:Date.now()-86400000})); assert.equal(recent.scripts.length,1); assert.equal(recent.writes.length,0);
 const expired=browser(JSON.stringify({value:'accepted',time:Date.now()-181*86400000})); assert.equal(expired.scripts.length,0); assert.equal(expired.nodes[0].hidden,false);
});
test('same successful lead is counted once and consultation location is preserved',()=>{
 const b=browser();b.choose('accepted');
 const detail={lead_id:'12345678-1234-4234-8234-123456789abc',form_location:'consultation'};
 b.lead(detail);const count=b.window.dataLayer.length;b.lead(detail);assert.equal(b.window.dataLayer.length,count);
 assert.equal(Array.from(b.window.dataLayer.at(-1))[2].form_location,'consultation');
});
