(() => {
 const id='G-5ZNSJY31TD', key='nura-analytics-consent-v2';
 if(window.__nuraAnalyticsInstalled||location.hostname!=='www.nura-interiors.com')return;
 window.__nuraAnalyticsInstalled=true;
 let accepted=false,loaded=false;
 const measuredLeads=new Set();
 let advertising=false;
 function pageLocation(){const url=new URL(location.origin+location.pathname),params=new URLSearchParams(location.search||'');for(const k of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term',...(advertising?['gclid','gbraid','wbraid']:[])]){const value=params.get(k);if(value&&/^[a-zA-Z0-9 _./:+-]{1,200}$/.test(value))url.searchParams.set(k,value);}return url.href;}
 function adsConsent(){return {ad_storage:advertising?'granted':'denied',ad_user_data:advertising?'granted':'denied',ad_personalization:'denied'};}
 function read(){try{const v=JSON.parse(localStorage.getItem(key));return v&&Date.now()-v.time<180*86400000?v.value:null}catch{return null}}
 function track(name,params={}){if(!accepted)return;window.gtag('event',name,{...params,page_location:pageLocation()});}
 let idleStart=0;
 function scheduleIdle(callback){if(idleStart)return;const run=()=>{idleStart=0;callback();};if('requestIdleCallback' in window)idleStart=window.requestIdleCallback(run,{timeout:2000});else if(typeof setTimeout==='function')idleStart=setTimeout(run,2000);else run();}
 function start(){if(loaded)return;loaded=true;window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};
 window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
 window.gtag('consent','update',{analytics_storage:'granted',...adsConsent()});window.gtag('js',new Date());
 window.gtag('config',id,{page_location:pageLocation(),page_referrer:document.referrer?document.referrer.split('?')[0].split('#')[0]:'',allow_google_signals:false,allow_ad_personalization_signals:false});
 scheduleIdle(()=>{if(!accepted)return;startClarity();const tag=document.createElement('script');tag.async=true;tag.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.append(tag);});}
 function startClarity(){
 if(window.__nuraClarityLoaded){window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'granted'});return;}
 window.__nuraClarityLoaded=true;
 window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};
 document.querySelectorAll('form').forEach(form=>form.setAttribute('data-clarity-mask','true'));
 window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'granted'});
 const script=document.createElement('script');script.async=true;script.src='https://www.clarity.ms/tag/ys3qfmnu6r?ref=bwt';document.head.append(script);
 }
 window.addEventListener('nura:analytics-consent',()=>{if(!accepted&&window.__nuraClarityLoaded){window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'denied'});window.clarity('consent',false);}});
 const existingBanner=document.querySelector?.('[data-nura-consent]');const banner=existingBanner||document.createElement('section');banner.className='nura-consent';banner.setAttribute('aria-label','Analytics preferences');if(!existingBanner)banner.innerHTML='<p>With your permission, Google Analytics and Microsoft Clarity help us understand visits, clicks and scrolling, including session replays. You can accept analytics only, also allow ad measurement, or decline. Ad measurement helps connect advertising clicks to enquiries. <a href="/privacy-policy">Privacy policy</a></p><div><button type="button" data-choice="accepted">Accept analytics</button><button type="button" data-choice="accepted_ads">Accept analytics and ad measurement</button><button type="button" data-choice="declined">Decline analytics</button></div>';
 if(existingBanner){const copy=existingBanner.querySelector('p');if(copy)copy.textContent='With your permission, analytics helps us understand visits. You can accept analytics only, also allow ad measurement to connect advertising clicks to enquiries, or decline.';}
 if(existingBanner&&!existingBanner.querySelector('[data-choice="accepted_ads"]')){const adButton=document.createElement('button');adButton.type='button';adButton.dataset.choice='accepted_ads';adButton.textContent='Accept analytics and ad measurement';existingBanner.querySelector('div').append(adButton);}
 const control=document.createElement('button');control.type='button';control.className='nura-privacy-control';control.textContent='Privacy settings';
 function show(){banner.hidden=false;document.body.classList.add('nura-consent-open');}
 function hide(){banner.hidden=true;document.body.classList.remove('nura-consent-open');}
 document.addEventListener('click',e=>{if(e.target.closest('[data-nura-privacy]')){show();banner.querySelector('button').focus();}});
 function choose(value){accepted=value==='accepted'||value==='accepted_ads';advertising=value==='accepted_ads';try{localStorage.setItem(key,JSON.stringify({value,time:Date.now()}))}catch{}if(accepted)start();else if(loaded){window['ga-disable-'+id]=true;window.gtag('consent','update',{analytics_storage:'denied',...adsConsent()});document.cookie.split(';').forEach(c=>{const n=c.trim().split('=')[0];if(n.startsWith('_ga'))for(const domain of ['', '; domain=.nura-interiors.com','; domain=www.nura-interiors.com'])document.cookie=n+'=; max-age=0; path=/'+domain;});}if(accepted){window['ga-disable-'+id]=false;if(loaded){window.gtag('consent','update',{analytics_storage:'granted',...adsConsent()});window.gtag('config',id,{send_page_view:false,page_location:pageLocation()});}}hide();window.dispatchEvent(new CustomEvent("nura:analytics-consent"));}
 banner.addEventListener('click',e=>{const b=e.target.closest('[data-choice]');if(b)choose(b.dataset.choice)});control.addEventListener('click',()=>{show();banner.querySelector('button').focus();});if(!existingBanner)document.body.append(banner);document.body.append(control);
 const saved=read();if(saved){accepted=saved==='accepted'||saved==='accepted_ads';advertising=saved==='accepted_ads';if(accepted)start();hide();}else show();
 window.addEventListener('nura:enquiry-success',e=>{const lead=e.detail?.lead_id;if(!accepted||typeof lead!=='string'||!/^[0-9a-f-]{36}$/i.test(lead)||measuredLeads.has(lead))return;measuredLeads.add(lead);const loc=['home','london','consultation','wardrobes','floating'].includes(e.detail?.form_location)?e.detail.form_location:'other';track('generate_lead',{lead_id:lead,form_location:loc,enquiry_type:e.detail?.enquiry_type==='showroom'?'showroom':'consultation'});});
 document.addEventListener('click',e=>{const early=e.target.closest('[data-cta="article-early-consultation"]');if(early){track('article_cta_click',{cta_name:'early_consultation',cta_location:early.dataset.ctaLocation||'article-intro',destination:'/consultation',page_path:location.pathname});return;}const a=e.target.closest('a[href]');if(!a)return;let method=null;if(a.href.startsWith('tel:'))method='telephone';else if(a.href.startsWith('mailto:'))method='email';else if(a.href.startsWith('https://wa.me/'))method='whatsapp';if(method)track('contact_click',{contact_method:method});});
})();
