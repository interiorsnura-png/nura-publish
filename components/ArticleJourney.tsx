import type {Entry} from '../lib/content';
import {getArticleJourney} from '../lib/article-journeys';

export default function ArticleJourney({path,entries}:{path:string;entries:Entry[]}){
 const journey=getArticleJourney(path,entries);
 if(!journey)return null;
 return <section className="article-journey" aria-labelledby="article-journey-title">
  <p className="eyebrow">From idea to next step</p>
  <h2 id="article-journey-title">Take the next step</h2>
  <ol>
   {journey.proof?<li><span>{journey.proofLabel}</span><a href={journey.proof.path}>{journey.proof.content.title} <span aria-hidden="true">↗</span></a></li>:null}
   {journey.service?<li><span>Explore the service</span><a href={journey.service.path}>{journey.service.content.title} <span aria-hidden="true">↗</span></a></li>:null}
   <li><span>Start a conversation</span><a href={journey.enquiry.href}>{journey.enquiry.label} <span aria-hidden="true">↗</span></a></li>
  </ol>
 </section>;
}
