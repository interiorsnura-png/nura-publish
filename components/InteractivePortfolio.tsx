import styles from './InteractivePortfolio.module.css';

export default function InteractivePortfolio(){
 return <section className={'section-pad '+styles.section} aria-labelledby="interactive-portfolio-title">
  <div className={styles.heading}>
   <div><p className="eyebrow">NURA / Portfolio 2026</p><h2 id="interactive-portfolio-title">Explore our <em>interactive portfolio.</em></h2><p>Browse kitchens, bespoke joinery and commercial interiors, with detailed photography and project films.</p></div>
   <div className={styles.actions}>
    <a className="button" href="/projects/catalogue">Open interactive portfolio <span aria-hidden="true">↗</span></a>
    <a href="/projects/catalogue#films">Watch project films <span aria-hidden="true">↗</span></a>
   </div>
  </div>
 </section>;
}
