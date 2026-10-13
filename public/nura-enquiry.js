(() => {
 if(window.nuraEnquiry)return;
 const attempts=new WeakMap(),key='nura-enquiry-attribution-v1';
 let entry=null;
 const consent=()=>{try{const c=JSON.parse(localStorage.getItem('nura-analytics-consent-v2'));return ['accepted','accepted_ads'].includes(c?.value)&&Date.now()-c.time<180*86400000;}catch{return false;}};
 const clean=value=>/^[a-zA-Z0-9 _./:+-]{1,200}$/.test(value||'')?value:'';
 function attribution(){
  const params=new URLSearchParams(location.search),current={landing_page:location.pathname,referrer_host:''};
  for(const k of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'])current[k]=clean(params.get(k));
  let adsAllowed=false;try{const c=JSON.parse(localStorage.getItem('nura-analytics-consent-v2'));adsAllowed=c?.value==='accepted_ads'&&Date.now()-c.time<180*86400000;}catch{}
  current.ad_user_data=adsAllowed?'granted':'denied';
  if(adsAllowed)for(const k of ['gclid','gbraid','wbraid'])current[k]=clean(params.get(k));
  if(entry&&!adsAllowed){const {gclid,gbraid,wbraid,...safe}=entry;entry={...safe,ad_user_data:'denied'};}
  if(adsAllowed&&entry&&!entry.gclid&&!entry.gbraid&&!entry.wbraid)entry={...entry,ad_user_data:'granted',gclid:current.gclid||'',gbraid:current.gbraid||'',wbraid:current.wbraid||''};
  try{const ref=new URL(document.referrer);if(ref.origin!==location.origin)current.referrer_host=ref.hostname;}catch{}
  entry=entry||current;
  try{
   if(!consent()){sessionStorage.removeItem(key);return current;}
   const saved=JSON.parse(sessionStorage.getItem(key));
   if(saved&&Date.now()-saved.time<86400000){if(adsAllowed&&!saved.fields.gclid&&!saved.fields.gbraid&&!saved.fields.wbraid){sessionStorage.setItem(key,JSON.stringify({time:saved.time,fields:{...saved.fields,ad_user_data:'granted',gclid:current.gclid||'',gbraid:current.gbraid||'',wbraid:current.wbraid||''}}));return {...saved.fields,ad_user_data:'granted',gclid:current.gclid||'',gbraid:current.gbraid||'',wbraid:current.wbraid||''};}if(!adsAllowed){const {gclid,gbraid,wbraid,...safe}=saved.fields;return {...safe,ad_user_data:'denied'};}return saved.fields;}
   sessionStorage.setItem(key,JSON.stringify({time:Date.now(),fields:entry}));return entry;
  }catch{}
  return current;
 }
 attribution();
 window.addEventListener('nura:analytics-consent',attribution);
 window.nuraEnquiry={
  prepare(form,fields){
   const fingerprint=JSON.stringify(fields),prior=attempts.get(form);
   if(prior?.fingerprint===fingerprint&&Date.now()-prior.time<23*3600000)return prior.payload;
   const payload={...fields,...attribution(),enquiry_page:location.pathname,lead_id:crypto.randomUUID()};
   attempts.set(form,{fingerprint,payload,time:Date.now(),completed:false});return payload;
  },
  complete(form,result,detail){
   const attempt=attempts.get(form);
   if(!attempt||attempt.completed||result.lead_id!==attempt.payload.lead_id)return;
   attempt.completed=true;
   (() => {
     const rawBudget = String(attempt?.payload?.budget ?? '').toLowerCase().replace(/£|\s/g, '').replace(/–/g, '-');
     const budgetMap = { under25k: 'under_25k', '25k-50k': '25k_50k', '50k-100k': '50k_100k', '100k+': '100k_plus' };
     const budgetBand = Object.hasOwn(budgetMap, rawBudget) ? budgetMap[rawBudget] : 'unknown';
     const tierMap = { under_25k: 'low', '25k_50k': 'medium', '50k_100k': 'high', '100k_plus': 'highest' };
     const leadValueTier = tierMap[budgetBand] || 'unknown';
     const roleRaw = String(attempt?.payload?.buyerRole ?? '').trim().toLowerCase();
     const professionalRoles = ['architect', 'interior designer', 'qs / estimator', 'main contractor', 'developer'];
     const leadAudience = roleRaw === 'homeowner' ? 'homeowner' : professionalRoles.includes(roleRaw) ? 'professional' : 'unspecified';
     window.dispatchEvent(new CustomEvent('nura:enquiry-success', {
       detail: {
         lead_id: result?.lead_id,
         form_location: detail?.form_location,
         enquiry_type: detail?.enquiry_type,
         budget_band: budgetBand,
         lead_value_tier: leadValueTier,
         lead_audience: leadAudience
       }
     }));
   })();
  }
 };
})();
