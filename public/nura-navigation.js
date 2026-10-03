// Enhance the preserved homepage navigation without changing its source script.
(() => {
 const nav=document.querySelector('.site-nav'),button=document.querySelector('.menu-toggle');
 if(!nav||!button)return;
 const desktop=window.matchMedia('(min-width:801px)');
 const sync=()=>{nav.inert=!desktop.matches&&!nav.classList.contains('is-open');};sync();
 new MutationObserver(() => {sync();if(!desktop.matches&&nav.classList.contains('is-open')&&document.activeElement===button)nav.querySelector('a')?.focus();}).observe(nav,{attributes:true,attributeFilter:['class']});
 document.addEventListener('keydown',event=>{
  if(event.key!=='Tab'||desktop.matches||!nav.classList.contains('is-open'))return;
  const items=[button,...nav.querySelectorAll('a[href]')],current=items.indexOf(document.activeElement);
  event.preventDefault();items[(current+(event.shiftKey?-1:1)+items.length)%items.length].focus();
 });
 desktop.addEventListener('change',()=>{
  const focusWasInMenu=nav.contains(document.activeElement)||document.activeElement===button;
  nav.classList.remove('is-open');document.body.classList.remove('menu-open');button.setAttribute('aria-expanded','false');
  const label=button.querySelector('span');if(label)label.textContent='Menu';sync();
  if(focusWasInMenu)(desktop.matches?nav.querySelector('a'):button)?.focus();
 });
 document.querySelector('.nura-skip-link')?.addEventListener('click',()=>document.getElementById('top')?.focus());
})();
