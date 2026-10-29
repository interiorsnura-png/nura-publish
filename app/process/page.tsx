import type {Metadata} from 'next';
import {Fragment} from 'react';
import {Hero} from '../../components/Editorial';
import JsonLd from '../../components/JsonLd';
import copy from '../../lib/process-page.json';
import styles from './process.module.css';

const title='Kitchen & Joinery Design Process | NURA Interiors';
const description='Explore NURA Interiors’ six-stage kitchen and joinery process, from consultation and design to technical coordination, manufacture, installation and aftercare.';
const url='https://www.nura-interiors.com/process';
const image='https://www.nura-interiors.com/assets/selected/nura-process-workshop.webp';
export const metadata:Metadata={title:{absolute:title},description,alternates:{canonical:url},openGraph:{title,description,url,type:'website',images:[image]},twitter:{card:'summary_large_image',title,description,images:[image]}};

function Inline({text}:{text:string}){return <>{text.split(/(\*\*\[[^\]]+\]\([^)]+\)\*\*|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).map((part,index)=>{
 const link=part.match(/^(?:\*\*)?\[([^\]]+)\]\(([^)]+)\)(?:\*\*)?$/);
 if(link)return <a key={index} href={link[2]} className={part.startsWith('**')?styles.cta:undefined}>{link[1]}</a>;
 if(part.startsWith('**'))return <strong key={index}>{part.slice(2,-2)}</strong>;
 return <Fragment key={index}>{part}</Fragment>;
 })}</>;}
function Block({text}:{text:string}){
 if(text.startsWith('- '))return <ul>{text.split(/\r?\n/).map(item=><li key={item}><Inline text={item.slice(2)}/></li>)}</ul>;
 return <p><Inline text={text}/></p>;
}
export default function ProcessPage(){return <main id="main" className={styles.page}>
 <JsonLd data={{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://www.nura-interiors.com/'},{'@type':'ListItem',position:2,name:copy.title,item:url}]}}/>
 <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <span aria-current="page">Our process</span></nav>
 <Hero title={copy.title} kicker="NURA / Our process" asset={{filename:'/assets/selected/nura-process-workshop.webp',alt:'Joinery workshop with timber materials, machinery and production benches'}} summary={copy.tagline} cta={{href:'#process-stage-1',label:'Explore the six stages ↓'}}/>
 <section className={'section-pad '+styles.intro}><div><p className="eyebrow">From your brief to handover</p><h2>Every home is different.</h2><nav aria-label="Process stages"><ol>{copy.sections.slice(0,6).map((section,index)=><li key={section.title}><a href={'#process-stage-'+(index+1)}>{section.title.replace(/^\d+ : /,'')}</a></li>)}</ol></nav></div><div>{copy.intro.map(text=><Block key={text} text={text}/>)}</div></section>
 {copy.sections.map((section,index)=>section.title==='Questions Before You Begin'?<section className={'section-pad nura-faq '+styles.faq} key={section.title}><h2>{section.title}</h2>{section.blocks.reduce<{question:string;answers:string[]}[]>((items,block)=>{if(block.startsWith('### '))items.push({question:block.slice(4),answers:[]});else items[items.length-1]?.answers.push(block);return items;},[]).map(item=><details key={item.question}><summary>{item.question}</summary>{item.answers.map(text=><Block key={text} text={text}/>)}</details>)}</section>:<section id={index<6?'process-stage-'+(index+1):'process-enquiry'} className={'section-pad '+(index<6?styles.stage:styles.contact)} key={section.title}><div><p className="eyebrow">{index<6?'Stage '+(index+1):'Your next step'}</p><h2>{section.title.replace(/^\d+ : /,'')}</h2></div><div>{section.blocks.map(text=><Block key={text} text={text}/>)}</div></section>)}
</main>;}
