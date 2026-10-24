(() => {
 const footerMode=matchMedia("(max-width:560px)");
 const setFooterMode=()=>document.querySelectorAll(".nura-footer-disclosure").forEach(el=>{el.open=!footerMode.matches});
 setFooterMode();footerMode.addEventListener("change",setFooterMode);
 // Homepage retains its dedicated in-page enquiry flow.
 if(location.pathname==='/')return;
 if(document.querySelector('.nura-lead'))return;
 const holder=document.createElement('div');holder.className='nura-lead';
 holder.innerHTML=`<div class="nura-lead-actions" role="group" aria-label="Talk to Nura"><button class="nura-lead-trigger" type="button" aria-haspopup="dialog" aria-controls="nura-lead-dialog"><span>Request consultation</span><span aria-hidden="true">↗</span></button><a class="nura-lead-call" href="tel:+442071236949"><span class="nura-call-label">Call Fulham showroom</span><span class="nura-call-number">020 7123 6949</span></a></div><dialog id="nura-lead-dialog" class="nura-lead-dialog" aria-labelledby="nura-lead-title" aria-describedby="nura-lead-description"><button class="nura-lead-close" type="button" aria-label="Close enquiry form">×</button><p class="nura-lead-kicker">NURA / YOUR NEXT CHAPTER</p><h2 id="nura-lead-title">Your free design consultation.</h2><p id="nura-lead-description" class="nura-lead-intro">Tell us about your space. Let’s explore what’s possible. Your initial conversation with our studio is free.</p><form class="nura-lead-form"><label>Your name<input name="name" autocomplete="name" maxlength="150" required></label><label>Email address<input name="email" type="email" autocomplete="email" maxlength="254" required></label><label>What are you planning?<textarea name="message" rows="3" maxlength="9500" placeholder="A kitchen, fitted furniture or a whole-home project…" required></textarea></label><label class="nura-lead-trap" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label><p class="nura-lead-note">We’ll use these details to respond to your project enquiry. <a href="/privacy-policy">Privacy policy</a></p><button class="nura-lead-submit" type="submit">Request my consultation <span aria-hidden="true">↗</span></button><p class="nura-lead-status" role="status" aria-live="polite"></p></form><a class="nura-lead-email" href="mailto:studio@nura-interiors.com">Prefer email? studio@nura-interiors.com</a><a class="nura-lead-email" href="tel:+442071236949">London showroom: 020 7123 6949</a><a class="nura-lead-email" href="https://wa.me/971506691090" target="_blank" rel="noopener noreferrer">WhatsApp Dubai: +971 50 669 1090</a></dialog>`;
 document.body.append(holder);
 // Keep the existing enquiry control in this article's reading flow, clear of its table and copy.
 if(['/post/kitchen-bar-stool-colours','/post/dishwasher-placement','/post/kitchen-splashback-grout-colour','/post/kitchen-island-seating-layout','/post/kitchen-pendant-light-finish','/post/kitchen-fridge-placement','/post/kitchen-rug-colours','/post/new-kitchen-costs-london','/post/kitchen-fruit-bowl-styling','/post/small-kitchen-design-ideas','/post/kitchen-canister-styling','/post/kitchen-fitting-costs-london','/post/kitchen-table-centrepiece','/post/how-to-choose-the-right-worktop-for-your-kitchen','/post/kitchen-island-dimensions'].includes(location.pathname.replace(/\/$/,''))){
  const articleHeader=document.querySelector('.article-reading>header');
  if(articleHeader){holder.classList.add("nura-lead-inline");articleHeader.append(holder);}
 }
 const trigger=holder.querySelector('.nura-lead-trigger');
 const wardrobePage=location.pathname.replace(/\/$/,'')==='/services/wardrobes-dressing-rooms';
 const contact=wardrobePage?document.getElementById('wardrobe-enquiry'):location.pathname==='/london'?document.getElementById('london-enquiry-showroom'):location.pathname==='/consultation'?document.getElementById('consultation-enquiry'):location.pathname==='/'?document.getElementById('contact'):null;
 if(wardrobePage){trigger.querySelector('span').textContent='Discuss your wardrobe project';trigger.removeAttribute('aria-haspopup');trigger.removeAttribute('aria-controls');}
 const inlineActions=[contact,document.querySelector('.nura-footer'),document.querySelector('.nura-faq'),location.pathname==='/london'?document.querySelector('.london-welcome'):null].filter(Boolean);
 // IntersectionObserver already supplies visibility without a synchronous layout read.
 const visible=new Set();
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);}
  const privacy=document.querySelector('.nura-privacy-control'),footer=document.querySelector('.nura-footer');
  if(privacy&&footer)privacy.hidden=visible.has(footer);
  trigger.hidden=visible.size>0;
  holder.querySelector(".nura-lead-call").hidden=trigger.hidden;
  holder.querySelector(".nura-lead-actions").hidden=trigger.hidden;
 });inlineActions.forEach(el=>observer.observe(el));
 const dialog=holder.querySelector('dialog'),form=holder.querySelector('form'),submit=holder.querySelector('.nura-lead-submit'),status=holder.querySelector('.nura-lead-status');
 let returnFocus=null;
 const openDialog=()=>{returnFocus=document.activeElement;dialog.showModal();};
 dialog.addEventListener('close',()=>{if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
 holder.querySelector('.nura-lead-trigger').addEventListener('click',()=>{if((wardrobePage||location.pathname==='/london')&&contact){contact.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});contact.focus({preventScroll:true});}else openDialog();});
 document.addEventListener('click',e=>{if(e.target.closest('[data-nura-enquiry]')){e.preventDefault();openDialog();}});
 holder.querySelector('.nura-lead-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 let sending=false;
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(sending||!form.reportValidity())return;
  sending=true;submit.disabled=true;status.textContent='Sending your enquiry…';
  let fields=Object.fromEntries(new FormData(form));
  fields.message+='\n\nEnquiry page: '+location.origin+location.pathname;
  fields=window.nuraEnquiry.prepare(form,fields);
  try{const response=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(fields),signal:AbortSignal.timeout(60000)});const data=await response.json();if(!response.ok||!data.ok)throw new Error('Enquiry not accepted');window.nuraEnquiry.complete(form,data,{form_location:'floating',enquiry_type:'consultation'});status.textContent='Thank you. Your enquiry has been sent to the Nura studio.';form.reset();}
  catch{status.textContent='Your enquiry could not be sent. Please try again or email studio@nura-interiors.com.';}
  finally{sending=false;submit.disabled=false;}
 });
})();
