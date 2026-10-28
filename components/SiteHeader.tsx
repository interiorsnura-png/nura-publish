'use client';
import {useEffect,useRef,useState} from 'react';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
const links=[['Projects','/projects'],['Services','/services'],['Our process','/process'],['Journal','/journal'],['About','/about'],['Showrooms','/london'],['For professionals','/for-professionals']];
export default function SiteHeader(){
 const pathname=usePathname();
 const active=(url:string)=>pathname===url||(url==='/journal'&&pathname.startsWith('/post/'));
 const [open,setOpen]=useState(false);
 const toggle=useRef<HTMLButtonElement>(null),menu=useRef<HTMLElement>(null),desktopNav=useRef<HTMLElement>(null);
 useEffect(()=>{document.body.classList.toggle('menu-open',open);return()=>document.body.classList.remove('menu-open');},[open]);
 useEffect(()=>{
  const viewport=window.matchMedia('(min-width:801px)');
  const resize=()=>{const focused=menu.current?.contains(document.activeElement)||document.activeElement===toggle.current;setOpen(false);if(focused)(viewport.matches?desktopNav.current?.querySelector<HTMLAnchorElement>('a'):toggle.current)?.focus();};
  viewport.addEventListener('change',resize);return()=>viewport.removeEventListener('change',resize);
 },[]);
 useEffect(()=>{
  if(!open)return;
  menu.current?.querySelector<HTMLAnchorElement>('a')?.focus();
  const keydown=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){event.preventDefault();setOpen(false);toggle.current?.focus();}
   if(event.key==='Tab'){
    const items=[toggle.current,...(menu.current?.querySelectorAll<HTMLAnchorElement>('a[href]')||[])].filter((item):item is HTMLButtonElement|HTMLAnchorElement=>item!==null);
    const index=items.indexOf(document.activeElement as HTMLAnchorElement);
    event.preventDefault();items[(index+(event.shiftKey?-1:1)+items.length)%items.length]?.focus();
   }
  };
  document.addEventListener('keydown',keydown);return()=>document.removeEventListener('keydown',keydown);
 },[open]);
 return <header className="site-header inner-header"><a className="brand" href="/" aria-label="Nura home"><Image src="/assets/nura-wordmark.svg" alt="Nura" width={112} height={42} unoptimized/></a><nav ref={desktopNav} className="desktop-nav" aria-label="Main navigation">{links.map(([label,url])=><a key={url} href={url} aria-current={active(url)?'page':undefined}>{label}</a>)}</nav><button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-menu" onClick={()=>setOpen(value=>!value)}><span>{open?'Close':'Menu'}</span><i aria-hidden="true"/></button><nav ref={menu} id="site-menu" className={'site-nav'+(open?' is-open':'')} aria-label="Mobile navigation" inert={!open||undefined}>{links.map(([label,url])=><a key={url} href={url} aria-current={active(url)?'page':undefined} onClick={()=>setOpen(false)}>{label}</a>)}</nav></header>;
}
