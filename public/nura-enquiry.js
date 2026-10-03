(() => {
 if(window.nuraEnquiry)return;
 const attempts=new WeakMap(),key='nura-enquiry-attribution-v1';
 const consent=()=>{try{const c=JSON.parse(localStorage.getItem('nura-analytics-consent-v1'));return c?.value==='accepted'&&Date.now()-c.time<180*86400000;}catch{return false;}};
 const clean=value=>/^[a-zA-Z0-9 _./:+-]{1,200}$/.test(value||'')?value:'';
 function attribution(){
  const params=new URLSearchParams(location.search),current={landing_page:location.pathname,referrer_host:''};
  for(const k of ['utm_source','utm_medium','utm_campaign'])current[k]=clean(params.get(k));
  try{const ref=new URL(document.referrer);if(ref.origin!==location.origin)current.referrer_host=ref.hostname;}catch{}
  try{
   if(!consent()){sessionStorage.removeItem(key);return current;}
   const saved=JSON.parse(sessionStorage.getItem(key));
   if(saved&&Date.now()-saved.time<86400000)return saved.fields;
   sessionStorage.setItem(key,JSON.stringify({time:Date.now(),fields:current}));
  }catch{}
  return current;
 }
 attribution();
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
   window.dispatchEvent(new CustomEvent('nura:enquiry-success',{detail:{...detail,lead_id:result.lead_id}}));
  }
 };
})();
