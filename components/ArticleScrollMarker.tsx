'use client';

import {useEffect} from 'react';

export default function ArticleScrollMarker(){
 useEffect(()=>{
  const article=document.querySelector('.article-reading-with-sidebar');
  if(!article)return;
  const headings=Array.from(article.querySelectorAll<HTMLElement>('.article-content h2[id]'));
  const lists=Array.from(article.querySelectorAll<HTMLOListElement>('.article-toc ol,.article-toc-mobile ol'));
  if(!headings.length)return;
  let frame=0;
  let activeId=headings[0].id;
  const linksByList=lists.map(list=>({list,links:Array.from(list.querySelectorAll<HTMLAnchorElement>('a')),active:null as HTMLAnchorElement|null,marker:''}));
  const update=()=>{
   frame=0;
   const threshold=Math.min(180,window.innerHeight*.25);
   let active=headings[0];
   for(const heading of headings){if(heading.getBoundingClientRect().top<=threshold)active=heading;else break;}
   const activeChanged=active.id!==activeId;
   activeId=active.id;
   for(const item of linksByList){
    const link=item.links.find(a=>a.hash==='#'+active.id)||null;
    if(activeChanged||link!==item.active){
     for(const a of item.links){if(a===link)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}
     item.active=link;
    }
    if(!link||!item.list.getClientRects().length)continue;
    const box=link.getBoundingClientRect(),parent=item.list.getBoundingClientRect(),marker=`${box.top-parent.top}px|${box.height}px`;
    if(marker===item.marker)continue;
    item.marker=marker;
    item.list.style.setProperty('--marker-y',`${box.top-parent.top}px`);
    item.list.style.setProperty('--marker-height',`${box.height}px`);
    item.list.dataset.marker='ready';
   }
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  const details=article.querySelector('details');
  details?.addEventListener('toggle',schedule);
  const observer=new ResizeObserver(schedule);
  observer.observe(article);
  update();
  return ()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);details?.removeEventListener('toggle',schedule);observer.disconnect();if(frame)cancelAnimationFrame(frame);for(const list of lists){delete list.dataset.marker;list.querySelectorAll('[aria-current]').forEach(a=>a.removeAttribute('aria-current'));}};
 },[]);
 return null;
}
