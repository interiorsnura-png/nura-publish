import test from 'node:test';
import assert from 'node:assert/strict';
import sync from '../lib/hubspot-enquiry.cjs';
const fields={name:'Test Person',email:'TEST@example.com',message:'Tender brief',buyerRole:'QS / Estimator',drawingsLink:'https://example.com/pack'};
test('CRM retries and concurrent conflicts reuse records, preserve sales updates and repair associations',async()=>{
 const previous={fetch:global.fetch,token:process.env.HUBSPOT_ACCESS_TOKEN,owner:process.env.HUBSPOT_ENQUIRY_OWNER_ID};
 process.env.HUBSPOT_ACCESS_TOKEN='test-only';process.env.HUBSPOT_ENQUIRY_OWNER_ID='123';
 let exists=false;const calls=[];
 global.fetch=async(url,options)=>{calls.push({url,options});let status=200,data={};
 if(url.includes('/contacts/')&&options.method==='GET')data={id:'contact'};
 else if(url.includes('/deals/')&&options.method==='GET'){status=exists?200:404;data=exists?{id:'deal'}:{};}
 else if(url.endsWith('/deals')&&options.method==='POST'){exists=true;status=409;}
 return {status,ok:status<300,json:async()=>data};};
 try{
 assert.deepEqual(await sync(fields,'lead-reference'),{status:'synced'});
 assert.deepEqual(await sync(fields,'lead-reference'),{status:'synced'});
 const creates=calls.filter(c=>c.url.endsWith('/deals')&&c.options.method==='POST');assert.equal(creates.length,1);
 const props=JSON.parse(creates[0].options.body).properties;assert.equal(props.hubspot_owner_id,'123');assert.equal(props.dealstage,'appointmentscheduled');assert.match(props.description,/QS \/ Estimator/);assert.match(props.description,/Tender brief/);
 assert.equal(calls.filter(c=>c.options.method==='PATCH').length,0);
 assert.equal(calls.filter(c=>c.url.includes('/associations/default/contacts/')).length,2);
 global.fetch=async()=>({status:403,ok:false,json:async()=>({})});await assert.rejects(sync(fields,'lead-reference'),/CRM request failed/);
 }finally{global.fetch=previous.fetch;for(const [key,value] of [['HUBSPOT_ACCESS_TOKEN',previous.token],['HUBSPOT_ENQUIRY_OWNER_ID',previous.owner]])if(value===undefined)delete process.env[key];else process.env[key]=value;}
});
