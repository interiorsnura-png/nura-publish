import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../lib/enquiry-handler.cjs';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
const id='12345678-1234-4234-8234-123456789abc';
const fields={name:'Verification',email:'test@example.com',message:'Test',lead_id:id,landing_page:'/london',enquiry_page:'/consultation',utm_source:'google',utm_campaign:'verification'};
async function request(body){let status=200,result;await handler({method:'POST',headers:{origin:'https://www.nura-interiors.com','content-type':'application/json'},body},{setHeader(){},status(n){status=n;return this;},json(v){result=v;return this;}});return {status,result};}
test('retries use stable provider key, email source and shared lead reference; failures are not success',async()=>{
 const prior={fetch:global.fetch,key:process.env.RESEND_API_KEY,from:process.env.ENQUIRY_FROM},sent=[];
 process.env.RESEND_API_KEY='test-only';process.env.ENQUIRY_FROM='test@example.com';
 try{
  global.fetch=async(url,options)=>{sent.push(options);return {ok:true,json:async()=>({id:'provider-test-id'})};};
  const a=await request(fields);await request(fields);
  assert.deepEqual(a,{status:200,result:{ok:true,lead_id:id}});
  assert.equal(sent[0].headers['Idempotency-Key'],sent[1].headers['Idempotency-Key']);
  const mail=JSON.parse(sent[0].body);assert.match(mail.text,/lead_id: 12345678/);assert.match(mail.text,/landing_page: \/london/);assert.match(mail.text,/utm_source: google/);
  await request({...fields,message:'Different brief'});assert.notEqual(sent[2].headers['Idempotency-Key'],sent[0].headers['Idempotency-Key']);
  const n=sent.length;assert.equal((await request({...fields,lead_id:'invalid'})).status,400);assert.equal(sent.length,n);
  global.fetch=async()=>({ok:false,json:async()=>({})});assert.equal((await request(fields)).status,502);
  global.fetch=async()=>{throw Error('timeout');};assert.equal((await request(fields)).status,502);
 }finally{global.fetch=prior.fetch;for(const [k,v] of [['RESEND_API_KEY',prior.key],['ENQUIRY_FROM',prior.from]])if(v===undefined)delete process.env[k];else process.env[k]=v;}
});
test('client retains accepted entry source across pages, stable retry payload and one success event',()=>{
 const storage=new Map(),events=[],listeners={},window={addEventListener(n,f){listeners[n]=f;},dispatchEvent(e){events.push(e);}},location={origin:'https://www.nura-interiors.com',pathname:'/london',search:'?utm_source=google&utm_campaign=verification&email=private'},consent={value:'declined',time:Date.now()};
 const context={window,location,document:{referrer:'https://example.com/?private=secret'},localStorage:{getItem(){return JSON.stringify(consent);}},sessionStorage:{getItem(k){return storage.get(k)||null;},setItem(k,v){storage.set(k,v);},removeItem(k){storage.delete(k);}},URL,URLSearchParams,crypto:{randomUUID},Date,CustomEvent:class {constructor(type,{detail}){this.type=type;this.detail=detail;}}};
 vm.runInNewContext(readFileSync(new URL('../public/nura-enquiry.js',import.meta.url),'utf8'),context);
 assert.equal(storage.size,0);consent.value='accepted';listeners['nura:analytics-consent']();assert.equal(storage.size,1);
 location.pathname='/consultation';location.search='';const form={};
 const a=window.nuraEnquiry.prepare(form,{name:'Test',message:'Brief'}),b=window.nuraEnquiry.prepare(form,{name:'Test',message:'Brief'});
 assert.equal(a,b);assert.equal(a.landing_page,'/london');assert.equal(a.enquiry_page,'/consultation');assert.equal(a.utm_source,'google');assert.equal(a.referrer_host,'example.com');assert.ok(!JSON.stringify(storage).includes('private'));
 window.nuraEnquiry.complete(form,{lead_id:'wrong'},{form_location:'consultation'});assert.equal(events.length,0);
 window.nuraEnquiry.complete(form,{lead_id:a.lead_id},{form_location:'consultation'});window.nuraEnquiry.complete(form,{lead_id:a.lead_id},{});assert.equal(events.length,1);assert.equal(events[0].detail.lead_id,a.lead_id);
 assert.notEqual(window.nuraEnquiry.prepare(form,{name:'Test',message:'New brief'}).lead_id,a.lead_id);
 consent.value='declined';window.nuraEnquiry.prepare({},{});assert.equal(storage.size,0);
});
