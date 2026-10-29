import {Hero} from './Editorial';
import styles from './ServicesLanding.module.css';

const services=[
 {title:'Bespoke Kitchens',body:'A kitchen that brings cooking, storage and gathering together. Explore layouts, cabinetry, materials and finishes developed as one cohesive design.',href:'/services/bespoke-kitchens',label:'Explore Bespoke Kitchens'},
 {title:'Architectural Joinery',body:'Cabinetry integrated with the architecture of your home. Discover bespoke solutions that connect rooms, create useful storage and bring consistency to your interiors.',href:'/services/architectural-joinery',label:'Explore Architectural Joinery'},
 {title:'Wardrobes & Dressing Rooms',body:'From fitted wardrobes to dedicated dressing rooms, discover storage organised around your clothing, accessories and everyday routine.',href:'/services/wardrobes-dressing-rooms',label:'Explore Wardrobes & Dressing Rooms'},
 {title:'Living Spaces',body:'Libraries, media walls and fitted furniture that balance display, storage and everyday use, with proportions and finishes suited to your room.',href:'/services/living-spaces',label:'Explore Living Spaces'}
];

export default function ServicesLanding(){return <div className={styles.page}>
 <Hero title="Bespoke Kitchens & Architectural Joinery" kicker="NURA / Services" asset={{filename:'/assets/selected/nura-cta-joinery.jpg',alt:'Gold-toned kitchen sink and tap set into a pale veined stone worktop'}} summary="Bespoke kitchens, fitted wardrobes and architectural joinery, developed around your home, your routines and the way you want to live." cta={{href:'/consultation',label:'Discuss Your Project →'}}/>
 <section className={'section-pad '+styles.services} aria-label="Our services">{services.map((service,index)=><article key={service.href} className={styles.service}><span className={styles.number}>0{index+1}</span><h2>{service.title}</h2><p>{service.body}</p><a href={service.href}>{service.label} <span aria-hidden="true">→</span></a></article>)}</section>
 <section className={'section-pad '+styles.details}><div><p className="eyebrow">The wider room</p><h2>Interior Design</h2></div><div><p>Bring the wider room into focus through layout, material and finish selections that complement your kitchen and joinery.</p><p>Discuss the scope of interior design support available for your project.</p></div></section>
 <section className={'section-pad '+styles.process}><h2>From Design to Installation</h2><p>We help bring the agreed design details together through design development, technical coordination, manufacture and installation, with responsibilities and scope confirmed in your project agreement.</p></section>
 <section className={'section-pad '+styles.details}><div><p className="eyebrow">Individual homes</p><h2>Explore Our Work</h2></div><div><p>See how our approach comes together in individual homes, from kitchen cabinetry to architectural joinery.</p><a href="/projects">View Our Projects <span aria-hidden="true">→</span></a></div></section>
 <section id="services-enquiry" className={'section-pad '+styles.contact}><h2>Discuss Your Project</h2><div><p>Visit our Fulham showroom or contact our London or Dubai studio to discuss your requirements.</p><p>Tell us your project location, the rooms you’re considering and any plans you already have.</p><a className="button" href="/consultation">Discuss Your Project <span aria-hidden="true">→</span></a></div></section>
</div>;}
