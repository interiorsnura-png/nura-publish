const {createHash} = require('node:crypto');
module.exports = async function syncEnquiry(fields, leadId) {
 const token=process.env.HUBSPOT_ACCESS_TOKEN;
 if(!token)return {status:'disabled'};
 const owner=process.env.HUBSPOT_ENQUIRY_OWNER_ID;
 if(!owner||!/^\d+$/.test(owner))throw Error('CRM owner is not configured');
 const key=createHash('sha256').update(leadId+JSON.stringify(fields)).digest('hex');
 async function api(path,method='GET',body){
  const response=await fetch('https://api.hubapi.com'+path,{method,headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(6000)});
  const data=await response.json().catch(()=>({}));
  if(!response.ok&&![404,409].includes(response.status))throw Error('CRM request failed');
  return {status:response.status,data};
 }
 const email=fields.email.toLowerCase(),contactPath='/crm/v3/objects/contacts/'+encodeURIComponent(email)+'?idProperty=email';
 let contact=await api(contactPath);
 if(contact.status===404){
  const names=fields.name.split(/\s+/);
  contact=await api('/crm/v3/objects/contacts','POST',{properties:{email,firstname:names.shift(),lastname:names.join(' ')}});
  if(contact.status===409)contact=await api(contactPath);
 }
 if(!contact.data.id)throw Error('CRM contact not confirmed');
 const dealPath='/crm/v3/objects/deals/'+key+'?idProperty=nura_enquiry_key';
 let deal=await api(dealPath);
 if(deal.status===404){
  const description='Website enquiry. Unqualified until reviewed.\nlead_id: '+leadId+'\n\n'+Object.entries(fields).filter(([,value])=>value).map(([name,value])=>name+': '+value).join('\n\n');
  deal=await api('/crm/v3/objects/deals','POST',{properties:{nura_enquiry_key:key,dealname:'Website enquiry | '+fields.name+(fields.projectType?' | '+fields.projectType:''),description,pipeline:'default',dealstage:'appointmentscheduled',hubspot_owner_id:owner,hs_next_step:'Review project fit, scope, budget and timing. Confirm drawings and tender access before quoting.'}});
  if(deal.status===409)deal=await api(dealPath);
 }
 if(!deal.data.id)throw Error('CRM project not confirmed');
 // A unique property arbitrates concurrent requests. Existing stages and notes are preserved.
 const association=await api('/crm/v4/objects/deals/'+deal.data.id+'/associations/default/contacts/'+contact.data.id,'PUT');
 if(association.status<200||association.status>=300)throw Error('CRM association not confirmed');
 return {status:'synced'};
};

