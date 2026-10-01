(() => {
 if(document.querySelector('.nura-lead'))return;
 const holder=document.createElement('div');holder.className='nura-lead';
 holder.innerHTML=`<button class="nura-lead-trigger" type="button" aria-haspopup="dialog" aria-controls="nura-lead-dialog"><span>Request a free design consultation</span><span aria-hidden="true">↗</span></button><dialog id="nura-lead-dialog" class="nura-lead-dialog" aria-labelledby="nura-lead-title"><button class="nura-lead-close" type="button" aria-label="Close enquiry form">×</button><p class="nura-lead-kicker">NURA / YOUR NEXT CHAPTER</p><h2 id="nura-lead-title">Your free design consultation.</h2><p class="nura-lead-intro">Tell us about your space. Let’s explore what’s possible. Your initial conversation with our studio is free.</p><form class="nura-lead-form"><label>Your name<input name="name" autocomplete="name" maxlength="150" required></label><label>Email address<input name="email" type="email" autocomplete="email" maxlength="254" required></label><label>What are you planning?<textarea name="message" rows="3" maxlength="9500" placeholder="A kitchen, fitted furniture or a whole-home project…" required></textarea></label><label class="nura-lead-trap" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label><p class="nura-lead-note">We’ll use these details to respond to your project enquiry.</p><button class="nura-lead-submit" type="submit">Request my consultation <span aria-hidden="true">↗</span></button><p class="nura-lead-status" role="status" aria-live="polite"></p></form><a class="nura-lead-email" href="mailto:studio@nura-interiors.com">Prefer email? studio@nura-interiors.com</a><a class="nura-lead-email" href="tel:+442071236949">London showroom: 020 7123 6949</a><a class="nura-lead-email" href="https://wa.me/971506691090" target="_blank" rel="noopener noreferrer">WhatsApp Dubai: +971 50 669 1090</a></dialog>`;
 document.body.append(holder);
 const trigger=holder.querySelector('.nura-lead-trigger');
 if(location.pathname==='/'){
  const contact=document.getElementById('contact');
  if(contact){
   const sync=()=>{const box=contact.getBoundingClientRect();trigger.hidden=box.top<innerHeight&&box.bottom>0;};
   sync();
   const observer=new IntersectionObserver(entries=>{trigger.hidden=entries[0].isIntersecting;});
   observer.observe(contact);
  }
 }
 const dialog=holder.querySelector('dialog'),form=holder.querySelector('form'),submit=holder.querySelector('.nura-lead-submit'),status=holder.querySelector('.nura-lead-status');
 holder.querySelector('.nura-lead-trigger').addEventListener('click',()=>dialog.showModal());
 holder.querySelector('.nura-lead-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 let sending=false;
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(sending||!form.reportValidity())return;
  sending=true;submit.disabled=true;status.textContent='Sending your enquiry…';
  const fields=Object.fromEntries(new FormData(form));
  fields.message+='\n\nEnquiry page: '+location.origin+location.pathname;
  const params=new URLSearchParams(location.search);for(const key of ['utm_source','utm_medium','utm_campaign'])fields[key]=(params.get(key)||'').slice(0,200);
  try{const response=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(fields),signal:AbortSignal.timeout(18000)});const data=await response.json();if(!response.ok||!data.ok)throw new Error('Enquiry not accepted');status.textContent='Thank you. Your enquiry has been sent to the Nura studio.';form.reset();}
  catch{status.textContent='Your enquiry could not be sent. Please try again or email studio@nura-interiors.com.';}
  finally{sending=false;submit.disabled=false;}
 });
})();
