import type {Content} from '../lib/content';
import {Hero,Photo} from './Editorial';
import RichArticle from './RichArticle';
import {lightingGroups} from '../lib/lighting-gallery';
import styles from './LightingInspiration.module.css';

export default function LightingInspiration({content}:{content:Content}){
 return <div className={styles.page}>
  <Hero title={content.title} kicker="Nura / Lighting inspiration" asset={content.hero} cta={{href:'#lighting-guide',label:'Start with the room ↘'}}/>
  <nav className={styles.navigation} aria-label="Lighting page sections"><a href="#lighting-guide">Planning your lighting</a>{lightingGroups.map(group=><a key={group.id} href={'#'+group.id}>{group.title}</a>)}</nav>
  <section id="lighting-guide" className={styles.guide} aria-label="Planning kitchen lighting"><div data-lighting-contact className={styles.contactSlot}/><RichArticle nodes={content.body_nodes||[]}/></section>
  <section className={styles.collection} aria-labelledby="lighting-collection-title"><div className={styles.collectionHeading}><p className="eyebrow">The lighting edit</p><h2 id="lighting-collection-title">Find the detail.<br/><em>See it in context.</em></h2><p>Explore the existing collection by setting and form. Save a few references and the questions you would like to discuss.</p></div>
   {lightingGroups.map(group=><section className={styles.group} id={group.id} key={group.id} aria-labelledby={group.id+'-title'}><div className={styles.groupHeading}><h3 id={group.id+'-title'}>{group.title}</h3><p>{group.description}</p></div><div className={styles.grid}>{group.positions.map(position=>{const asset=content.gallery?.[position-1];return asset?<figure id={'lighting-reference-'+position} key={asset.filename} className={styles.reference}><Photo asset={asset} sizes="(max-width:700px) 100vw, (max-width:1100px) 50vw, 33vw"/><figcaption><span className={styles.referenceNumber}>Reference {String(position).padStart(2,'0')}</span>{asset.caption||asset.alt}</figcaption></figure>:null;})}</div></section>)}
  </section>
  <section className={styles.cta} aria-labelledby="lighting-next-title"><p className="eyebrow">From reference to brief</p><h2 id="lighting-next-title">Bring your room<br/><em>into the conversation.</em></h2><p>A plan, ceiling heights and a few selected references can help explain how you want the kitchen and adjoining spaces to feel and function. Ask the studio about the scope suited to your project.</p><div><a className="button" href="/consultation">Discuss your project ↗</a><a className={styles.phone} href="tel:+442071236949">Call Fulham showroom: 020 7123 6949</a></div></section>
 </div>;
}
