import JsonLd from './JsonLd';
import ImageLicense from './ImageLicense';
import {journalCollectionSchema,uniqueJournalImages} from '../lib/journal-schema';
import type {Entry} from '../lib/content';
import {newestJournalFirst} from '../lib/journal-order';
import {articleRecommendationDetails as details,articleReadingMinutes as minutes} from '../lib/related-articles';
import JournalBrowser from './JournalBrowser';
import './JournalPrototype.css';
import {journalTopics,matchesJournal,validJournalCategory} from '../lib/journal-browse';
function topic(e:Entry){const d=details(e);const text=(e.content.title+' '+d.description+' '+d.tags.join(' ')).toLowerCase();if(d.category==='Case study')return 'stories';if(/joinery/i.test(d.category)||/joinery/i.test(e.content.title))return 'joinery';if(e.content.category?.toLowerCase()==='planning'||d.tags.includes('planning'))return 'planning';if(/dubai|international|shipping|freight|humid|overseas|barbados|spain/.test(text))return 'international';if(/material|veneer|lacquer|plywood|mfc|porcelain|colour|finish|oak|walnut|hardware|hinge/.test(text))return 'materials';if(/joinery|developer|builder|plumber|electrician|fitter/.test(text))return 'joinery';if(/quote|cost|finance|planning|consult|timeline|programme|lead time/.test(text))return 'planning';return 'kitchens';}
export default function JournalLanding({entries,category,query}:{entries:Entry[];category?:string;query?:string}){
 const articles=newestJournalFirst(entries.filter(e=>e.content.component==='article'&&!['draft','unpublished'].includes(e.content.source_publish_status||'')));
 const items=articles.map(e=>({path:e.path,title:e.content.title,description:details(e).description,category:details(e).category,topics:journalTopics(e.content.title,details(e).category,details(e).tags,e.path),minutes:minutes(e),hero:e.content.hero,isGuide:e.path.startsWith('/guides/')}));
 const selected=articles.filter((e,index)=>matchesJournal(items[index],validJournalCategory(category),query||''));
 return <><JsonLd data={journalCollectionSchema(selected,validJournalCategory(category),articles[0]?.content.hero)}/>{uniqueJournalImages(articles).map(({asset,name})=><ImageLicense key={asset.filename} asset={asset} name={name}/>)}<JournalBrowser items={items} initialCategory={category} initialQuery={query}/></>;
}
const normalise=(value:string)=>value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
