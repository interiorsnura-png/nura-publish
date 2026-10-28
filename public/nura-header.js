(() => {
 if(window.nuraHeaderScrollReady)return;
 window.nuraHeaderScrollReady=true;
 let frame=0;
 const update=()=>{
  frame=0;
  const header=document.querySelector('body>.site-header');
  if(!header)return;
  const hero=document.querySelector('main .hero,main .journal-hero');
  const pastHero=!hero||hero.getBoundingClientRect().bottom<=header.getBoundingClientRect().bottom;
  header.classList.toggle('is-past-hero',pastHero);
 };
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 addEventListener('pageshow',schedule);
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
 update();
})();
