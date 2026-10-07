'use client';

import {useState} from 'react';
import styles from './InteractivePortfolio.module.css';

const catalogueUrl='https://nura-catalogue-2026.nura-interio-7002.chatgpt.site/';

export default function InteractivePortfolio(){
 const [open,setOpen]=useState(false);
 return <section className={'section-pad '+styles.section} aria-labelledby="interactive-portfolio-title">
  <div className={styles.heading}>
   <div><p className="eyebrow">NURA / Portfolio 2026</p><h2 id="interactive-portfolio-title">Explore our <em>interactive portfolio.</em></h2><p>Browse kitchens, bespoke joinery and commercial interiors, with detailed photography and project films.</p></div>
   <div className={styles.actions}>
    <button type="button" className="button" aria-expanded={open} aria-controls="interactive-portfolio-viewer" onClick={()=>setOpen(!open)}>{open?'Close portfolio':'Open interactive portfolio'} <span aria-hidden="true">{open?'−':'↗'}</span></button>
    <a href={catalogueUrl} target="_blank" rel="noopener noreferrer">Open full-screen portfolio <span className={styles.srOnly}>(opens in a new tab)</span><span aria-hidden="true">↗</span></a>
   </div>
  </div>
  {open?<div id="interactive-portfolio-viewer" className={styles.viewer}><iframe src={catalogueUrl} title="NURA interactive portfolio 2026: kitchens, joinery and commercial interiors" allow="fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/><p>If the viewer does not load, <a href={catalogueUrl} target="_blank" rel="noopener noreferrer">open the portfolio in a new tab</a>.</p></div>:<div id="interactive-portfolio-viewer" hidden/>}
 </section>;
}
