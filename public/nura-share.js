(() => {
 const path=location.pathname;
 if(path!=='/'&&!/^\/(post\/|kitchens\/|jointery\/|projects-)/.test(path))return;
 const canonical=document.querySelector('link[rel="canonical"]')?.href||location.origin+path;
 const title=document.querySelector('h1')?.textContent.replace(/\s+/g,' ').trim()||document.title;
 const holder=document.createElement('div');holder.className='nura-share';
 holder.innerHTML='<button type="button" class="nura-share-trigger" aria-expanded="false" aria-controls="nura-share-menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></svg> Share</button><div id="nura-share-menu" class="nura-share-options" hidden><button type="button" class="nura-copy">Copy link</button><a data-share="whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a><a data-share="linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a><a data-share="email">Email</a></div><span class="nura-share-status" role="status" aria-live="polite"></span>';
 const trigger=holder.querySelector('.nura-share-trigger'),menu=holder.querySelector('.nura-share-options'),status=holder.querySelector('.nura-share-status');
 holder.querySelector('[data-share="whatsapp"]').href='https://wa.me/?text='+encodeURIComponent(title+' '+canonical);
 holder.querySelector('[data-share="linkedin"]').href='https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(canonical);
 holder.querySelector('[data-share="email"]').href='mailto:?subject='+encodeURIComponent(title)+'&body='+encodeURIComponent(canonical);
 const close=()=>{menu.hidden=true;trigger.setAttribute('aria-expanded','false')};
 const toggle=()=>{menu.hidden=!menu.hidden;trigger.setAttribute('aria-expanded',String(!menu.hidden))};
 trigger.addEventListener('click',async()=>{
  status.textContent='';
  if(navigator.share){try{await navigator.share({title,url:canonical});return;}catch(e){if(e.name==='AbortError')return;}}
  toggle();
 });
 holder.querySelector('.nura-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(canonical);status.textContent='Link copied.';close();trigger.focus();}catch{status.textContent='Copy this link: '+canonical;}});
 holder.addEventListener('keydown',e=>{if(e.key==='Escape'){close();trigger.focus()}});
 document.addEventListener('click',e=>{if(!holder.contains(e.target))close()});
 const author=document.querySelector('.article-meta');
 if(author)author.after(holder);
 else if(path==='/')document.querySelector('.nura-footer-base')?.append(holder);
 else document.querySelector('main h1')?.parentElement.append(holder);
})();
