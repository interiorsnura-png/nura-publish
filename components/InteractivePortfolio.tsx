import styles from './InteractivePortfolio.module.css';
import Image from 'next/image';
import ImageLicense from './ImageLicense';

const preview={filename:'/assets/portfolio/p10-1.webp',alt:'Green stone worktop and timber drawer storage from the NURA portfolio'};

export default function InteractivePortfolio(){
 return <section className={'section-pad '+styles.section} aria-labelledby="interactive-portfolio-title">
  <ImageLicense asset={preview}/>
  <div className={styles.heading}>
   <a className={styles.preview} href="/projects/catalogue" aria-label="Preview the NURA portfolio">
    <div className={styles.cover} aria-hidden="true"><span className={styles.wordmark}>NURA</span><span className={styles.edition}>Portfolio<br/>2026</span><span className={styles.coverNote}>Kitchens · Joinery<br/>Commercial interiors</span></div>
    <Image className={styles.photo} src={preview.filename} alt={preview.alt} width={1471} height={1155} sizes="(max-width:800px) 50vw, 25vw"/>
    <span className={styles.previewLabel}>Inside the portfolio <span aria-hidden="true">↗</span></span>
   </a>
   <div className={styles.copy}><p className="eyebrow">NURA / Portfolio 2026</p><h2 id="interactive-portfolio-title">A closer look<br/>at <em>our work.</em></h2><p>Explore kitchens, bespoke joinery and commercial interiors through detailed photography, material studies and project films.</p>
   <div className={styles.actions}>
    <a className="button" href="/projects/catalogue">Explore the portfolio <span aria-hidden="true">↗</span></a>
    <a href="/projects/catalogue#films">Watch project films <span aria-hidden="true">↗</span></a>
   </div>
   </div>
  </div>
 </section>;
}
