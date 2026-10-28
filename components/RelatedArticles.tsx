import type {Entry} from '../lib/content';
import {Photo} from './Editorial';
import {articleReadingMinutes,articleRecommendationDetails} from '../lib/related-articles';

export default function RelatedArticles({entries}:{entries:Entry[]}){
 if(!entries.length)return null;
 return <nav className="article-related" aria-labelledby="continue-reading-title">
  <div className="article-related-heading"><p className="eyebrow">From the Nura journal</p><h2 id="continue-reading-title">Continue reading</h2><p>More ideas to help shape your space.</p></div>
  <ul className="article-related-grid">{entries.map(entry=>{
   const details=articleRecommendationDetails(entry);
   return <li key={entry.path}><a className="article-related-card" href={entry.path}>
    <div className="article-related-image"><Photo asset={entry.content.hero?{...entry.content.hero,alt:''}:undefined} sizes="(max-width:600px) calc(100vw - 40px), 350px"/><span className="article-related-arrow" aria-hidden="true">↗</span></div>
    <div className="article-related-copy"><div className="article-related-meta"><span>{details.category}</span><span>{articleReadingMinutes(entry)} min read</span></div><h3>{entry.content.title}</h3><p>{details.description}</p></div>
   </a></li>;
  })}</ul>
  <a className="article-journal-link" href="/journal">Explore the journal <span aria-hidden="true">↗</span></a>
 </nav>;
}
