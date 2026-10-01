import type {Entry} from './content';

const topics:Record<string,{category:string;description:string;tags:string[]}>={
 'transform-your-space-with-custom-interior-services-london':{category:'Interior design',description:'Explore a considered approach to custom interiors in London.',tags:['planning','interiors']},
 'the-power-of-porcelain':{category:'Materials',description:'Explore the benefits, care and considerations of porcelain surfaces.',tags:['materials','kitchens','worktops']},
 'kitchen-design-trends-in-2023':{category:'Design archive',description:'Revisit the kitchen ideas and influences discussed in our 2023 journal.',tags:['kitchens','style']},
 'finding-a-balance-with-decorative-lighting':{category:'Lighting',description:'Consider how decorative lighting shapes the atmosphere of a room.',tags:['interiors','style','lighting']},
 'the-urban-renovation':{category:'Renovation',description:'Explore ideas for rethinking an urban home.',tags:['interiors','planning','renovation']},
 'our-design-process':{category:'Design process',description:'Discover the thinking behind a considered design process.',tags:['planning','process']},
 'exploring-the-advantages-of-pocket-doors':{category:'Space planning',description:'Explore how pocket doors can help make space work harder.',tags:['interiors','planning','joinery']},
 'exploring-white-variations-in-kitchen-design':{category:'Kitchen design',description:'Explore how white tones work with surfaces and cabinetry.',tags:['kitchens','style','materials']},
 'a-paradigm-shift-towards-sustainable-design-and-conscious-living':{category:'Conscious design',description:'Consider the choices behind a more conscious approach to interiors.',tags:['sustainability','materials','interiors']},
 'solid-wood-or-veneer':{category:'Materials',description:'Explore solid wood and veneer for your cabinetry and joinery.',tags:['materials','joinery','sustainability']},
 'what-are-some-of-the-biggest-problems-faced-for-customers-working-with-kitchen-designers':{category:'Project planning',description:'Consider common challenges when working with a kitchen designer.',tags:['kitchens','planning','process']},
 'using-artificial-intelligence-in-the-design-process':{category:'Design process',description:'Explore the role of artificial intelligence in the design process.',tags:['process','planning','technology']},
 'how-to-choose-the-right-worktop-for-your-kitchen':{category:'Materials',description:'Compare materials before choosing your kitchen worktop.',tags:['materials','kitchens','worktops']},
};
const selections:Record<string,string[]>={
 'transform-your-space-with-custom-interior-services-london':['our-design-process','the-urban-renovation'],
 'the-power-of-porcelain':['how-to-choose-the-right-worktop-for-your-kitchen','exploring-white-variations-in-kitchen-design'],
 'kitchen-design-trends-in-2023':['exploring-white-variations-in-kitchen-design','how-to-choose-the-right-worktop-for-your-kitchen'],
 'finding-a-balance-with-decorative-lighting':['exploring-white-variations-in-kitchen-design','the-urban-renovation'],
 'the-urban-renovation':['exploring-the-advantages-of-pocket-doors','our-design-process'],
 'our-design-process':['what-are-some-of-the-biggest-problems-faced-for-customers-working-with-kitchen-designers','using-artificial-intelligence-in-the-design-process'],
 'exploring-the-advantages-of-pocket-doors':['solid-wood-or-veneer','the-urban-renovation'],
 'exploring-white-variations-in-kitchen-design':['the-power-of-porcelain','finding-a-balance-with-decorative-lighting'],
 'a-paradigm-shift-towards-sustainable-design-and-conscious-living':['solid-wood-or-veneer','the-power-of-porcelain'],
 'solid-wood-or-veneer':['a-paradigm-shift-towards-sustainable-design-and-conscious-living','how-to-choose-the-right-worktop-for-your-kitchen'],
 'what-are-some-of-the-biggest-problems-faced-for-customers-working-with-kitchen-designers':['our-design-process','how-to-choose-the-right-worktop-for-your-kitchen'],
 'using-artificial-intelligence-in-the-design-process':['our-design-process','transform-your-space-with-custom-interior-services-london'],
 'how-to-choose-the-right-worktop-for-your-kitchen':['the-power-of-porcelain','solid-wood-or-veneer'],
};
const slug=(path:string)=>path.split('/').pop()||'';
export function articleReadingMinutes(entry:Entry){
 const flatten=(nodes:NonNullable<Entry['content']['body_nodes']>):string=>nodes.map(n=>n.text||flatten(n.children||[])).join(' ');
 const body=entry.content.body_nodes?.length?flatten(entry.content.body_nodes):entry.content.body||entry.content.summary||'';
 return Math.max(1,Math.ceil(body.split(/\s+/).filter(Boolean).length/200));
}
export function articleRecommendationDetails(entry:Entry){
 return topics[slug(entry.path)]||{category:entry.content.category||'From the journal',description:entry.content.summary||entry.content.seo_description||'Explore more ideas from the Nura studio.',tags:[]};
}
export function getRelatedArticles(current:Entry,entries:Entry[]):Entry[]{
 const candidates=entries.filter(e=>e.content.component==='article'&&e.path!==current.path&&!['draft','unpublished'].includes(e.content.source_publish_status||''));
 const selected=(selections[slug(current.path)]||[]).flatMap(id=>{const entry=candidates.find(e=>slug(e.path)===id);return entry?[entry]:[];});
 const tags=articleRecommendationDetails(current).tags;
 const remaining=candidates.filter(e=>!selected.some(s=>s.path===e.path)).map(e=>({entry:e,score:articleRecommendationDetails(e).tags.filter(t=>tags.includes(t)).length})).filter(e=>e.score>0).sort((a,b)=>b.score-a.score||a.entry.path.localeCompare(b.entry.path));
 return [...selected,...remaining.map(e=>e.entry)].filter((e,i,all)=>all.findIndex(x=>x.path===e.path)===i).slice(0,2);
}
