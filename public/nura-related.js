/* Local dataLayer events; reporting requires an analytics integration. */
(()=>{
 const cards=[...document.querySelectorAll('.article-related-card')];
 if(!cards.length)return;
 const record=(event,card)=>{
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({event,source_path:location.pathname,target_path:new URL(card.href,location.origin).pathname,position:cards.indexOf(card)+1});
 };
 cards.forEach(card=>card.addEventListener('click',()=>record('related_article_click',card)));
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting&&entry.intersectionRatio>=.5){record('related_article_impression',entry.target);observer.unobserve(entry.target);}
  }),{threshold:.5});
  cards.forEach(card=>observer.observe(card));
 }
})();
