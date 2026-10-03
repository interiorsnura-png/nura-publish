(() => {
 const id='G-5ZNSJY31TD', key='nura-analytics-consent-v1';
 if(window.__nuraAnalyticsInstalled||location.hostname!=='www.nura-interiors.com')return;
 window.__nuraAnalyticsInstalled=true;
 let accepted=false,loaded=false;
 function read(){try{const v=JSON.parse(localStorage.getItem(key));return v&&Date.now()-v.time<180*86400000?v.value:null}catch{return null}}
 function track(name,params={}){if(!accepted)return;window.gtag('event',name,{...params,page_location:location.origin+location.pathname});}
 function start(){if(loaded)return;loaded=true;window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};
 window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
 window.gtag('consent','update',{analytics_storage:'granted'});window.gtag('js',new Date());
 window.gtag('config',id,{page_location:location.origin+location.pathname,page_referrer:document.referrer?document.referrer.split('?')[0].split('#')[0]:'',allow_google_signals:false,allow_ad_personalization_signals:false});
 const tag=document.createElement('script');tag.async=true;tag.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.append(tag);}
 const banner=document.createElement('section');banner.className='nura-consent';banner.setAttribute('aria-label','Analytics preferences');banner.innerHTML='<p>We use optional analytics to improve your experience. You can accept or decline. <a href="/privacy-policy">Privacy policy</a></p><div><button type="button" data-choice="accepted">Accept analytics</button><button type="button" data-choice="declined">Decline analytics</button></div>';
 const control=document.createElement('button');control.type='button';control.className='nura-privacy-control';control.textContent='Privacy settings';
 function show(){banner.hidden=false;document.body.classList.add('nura-consent-open');}
 function hide(){banner.hidden=true;document.body.classList.remove('nura-consent-open');}
 document.addEventListener('click',e=>{if(e.target.closest('[data-nura-privacy]')){show();banner.querySelector('button').focus();}});
 function choose(value){accepted=value==='accepted';try{localStorage.setItem(key,JSON.stringify({value,time:Date.now()}))}catch{}if(accepted)start();else if(loaded){window['ga-disable-'+id]=true;window.gtag('consent','update',{analytics_storage:'denied'});document.cookie.split(';').forEach(c=>{const n=c.trim().split('=')[0];if(n.startsWith('_ga'))for(const domain of ['', '; domain=.nura-interiors.com','; domain=www.nura-interiors.com'])document.cookie=n+'=; max-age=0; path=/'+domain;});}if(accepted){window['ga-disable-'+id]=false;if(loaded)window.gtag('consent','update',{analytics_storage:'granted'});}hide();}
 banner.addEventListener('click',e=>{const b=e.target.closest('[data-choice]');if(b)choose(b.dataset.choice)});control.addEventListener('click',()=>{show();banner.querySelector('button').focus();});document.body.append(banner,control);if(document.body.prepend)document.body.prepend(banner);
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>document.documentElement.style.setProperty('--nura-consent-height',banner.getBoundingClientRect().height+'px')).observe(banner);
 const saved=read();if(saved){accepted=saved==='accepted';if(accepted)start();hide();}else show();
 window.addEventListener('nura:enquiry-success',e=>{const loc=['home','london','floating'].includes(e.detail?.form_location)?e.detail.form_location:'other';track('generate_lead',{form_location:loc,enquiry_type:e.detail?.enquiry_type==='showroom'?'showroom':'consultation'});});
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;let method=null;if(a.href.startsWith('tel:'))method='telephone';else if(a.href.startsWith('mailto:'))method='email';else if(a.href.startsWith('https://wa.me/'))method='whatsapp';if(method)track('contact_click',{contact_method:method});});
})();
