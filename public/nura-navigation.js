// Clear mobile scroll locking when the viewport returns to desktop.
(() => {
 const nav=document.querySelector('.nura-main-nav');
 const button=document.querySelector('.menu-toggle');
 if(!nav||!button)return;
 const desktop=window.matchMedia('(min-width:801px)');
 desktop.addEventListener('change',()=>{
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  button.setAttribute('aria-expanded','false');
  const label=button.querySelector('span');if(label)label.textContent='Menu';
 });
})();
