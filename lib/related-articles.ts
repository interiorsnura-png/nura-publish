import type {Entry} from './content';

const topics:Record<string,{category:string;description:string;tags:string[]}>={
 'plywood-vs-mfc-kitchen-carcasses':{category:'Materials',description:'Compare cabinet boards, edge protection and written specifications before choosing a kitchen.',tags:['materials','kitchens','cabinetry']},
 'planning-a-galley-kitchen-in-london':{category:'Planning',description:'Plan a galley kitchen around circulation, storage, light and everyday use.',tags:['planning','kitchens','layout']},
 'how-to-compare-bespoke-kitchen-quotes-in-london':{category:'Planning',description:'Compare scope, materials, allowances and installation responsibilities.',tags:['planning','kitchens','quotes']},
 'choosing-a-kitchen-showroom-in-fulham':{category:'Showroom planning',description:'Check cabinetry, hardware and material samples before your Fulham showroom visit.',tags:['planning','kitchens','showroom']},
 'bespoke-joinery-london':{category:'Joinery planning',description:'Prepare the brief, materials and technical details for fitted furniture.',tags:['planning','interiors']},
 'bespoke-vs-made-to-measure-kitchens':{category:'Kitchen planning',description:'Compare dimensions, scope and installation responsibilities.',tags:['planning','kitchens']},
 'bespoke-kitchens':{category:'Kitchen planning',description:'Plan layout, materials, scope and installation.',tags:['planning','kitchens']},
 'one-tonne-porcelain-kitchen-island':{category:'Case study',description:'Design and delivery lessons from the Amersham Road island.',tags:['materials','kitchens','worktops']},
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
 'whole-home-joinery-supplier':['comparing-bespoke-joinery-quotes','joinery-samples-mock-ups'],
 'kitchen-table-centrepiece':['mixing-wood-tones-kitchen','kitchen-fruit-bowl-styling'],
 'kitchen-fitting-costs-london':['how-to-compare-bespoke-kitchen-quotes-in-london','new-kitchen-costs-london'],
 'kitchen-canister-styling':['mixing-wood-tones-kitchen','kitchen-worktop-styling-tray-checks'],
 'small-kitchen-design-ideas':['bespoke-kitchens-small-spaces','planning-a-galley-kitchen-in-london'],
 'kitchen-fruit-bowl-styling':['mixing-wood-tones-kitchen','matching-kitchen-finishes-to-fabrics-stone-wallpaper'],
 'new-kitchen-costs-london':['bespoke-kitchen-costs-quotation','how-to-compare-bespoke-kitchen-quotes-in-london'],
 'kitchen-rug-colours':['test-kitchen-colour-at-home','mixing-wood-tones-kitchen'],
 'kitchen-fridge-placement':['planning-a-galley-kitchen-in-london','kitchen-larder-cupboard'],
 'kitchen-pendant-light-finish':['finding-a-balance-with-decorative-lighting','test-kitchen-colour-at-home'],
 'kitchen-island-seating-layout':['kitchen-bar-stool-colours','kitchen-design-for-hosting'],
 'kitchen-splashback-grout-colour':['test-kitchen-colour-at-home','how-to-choose-the-right-worktop-for-your-kitchen'],
 'dishwasher-placement':['kitchen-bin-layout-checks','single-vs-double-kitchen-sink'],
 'kitchen-bar-stool-colours':['mixing-wood-tones-kitchen','test-kitchen-colour-at-home'],
 'kitchen-larder-cupboard':['kitchen-drawer-organisation-before-you-buy','kitchen-corner-storage-checks'],
 'kitchen-windowsill-styling':['kitchen-shelf-styling-daily-use','test-kitchen-colour-at-home'],
 'handleless-kitchen-doors':['before-you-order-kitchen-handles-try-the-grip','bespoke-kitchens'],
 'plywood-vs-mfc-kitchen-carcasses':['solid-wood-or-veneer','choosing-a-kitchen-showroom-in-fulham'],
 'planning-a-galley-kitchen-in-london':['bespoke-kitchens','how-to-compare-bespoke-kitchen-quotes-in-london'],
 'how-to-compare-bespoke-kitchen-quotes-in-london':['bespoke-kitchens','choosing-a-kitchen-showroom-in-fulham'],
 'choosing-a-kitchen-showroom-in-fulham':['bespoke-kitchens','solid-wood-or-veneer'],
 'bespoke-joinery-london':['solid-wood-or-veneer','exploring-the-advantages-of-pocket-doors'],
 'bespoke-vs-made-to-measure-kitchens':['bespoke-kitchens','our-design-process'],
 'bespoke-kitchens':['choosing-a-kitchen-showroom-in-fulham','one-tonne-porcelain-kitchen-island'],
 'one-tonne-porcelain-kitchen-island':['the-power-of-porcelain','bespoke-kitchens'],
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
const inferredTags=(entry:Entry)=>{
 const text=(entry.content.title+' '+(entry.content.seo_description||'')).toLowerCase();
 const tags:string[]=[];
 const rules:[string,string[]][]=[
  ['material|veneer|lacquer|plywood|mfc|porcelain|oak|walnut|ash|finish|stain|colour',['materials']],
  ['kitchen|cabinet|carcass|worktop|sink|plinth|hinge|hardware|storage|island',['kitchens']],
  ['planning|quote|cost|programme|timeline|consult|brief|builder|first fix|lead time|payment',['planning']],
  ['joinery|wardrobe|fitted|developer|architect|design team',['joinery']],
  ['shipping|freight|overseas|international|dubai|spain|barbados|humid',['international']]
 ];
 for(const [pattern,values] of rules)if(new RegExp(pattern).test(text))tags.push(...values);
 return [...new Set(tags)];
};
export function articleRecommendationDetails(entry:Entry){
 const known=topics[slug(entry.path)];
 if(known)return known;
 const tags=inferredTags(entry);
 return {category:tags.includes('international')?'International':tags.includes('joinery')?'Joinery planning':tags.includes('materials')?'Materials':tags.includes('planning')?'Planning':'Kitchen planning',description:entry.content.summary||entry.content.seo_description||'Explore more ideas from the Nura studio.',tags};
}
export function getRelatedArticles(current:Entry,entries:Entry[]):Entry[]{
 const candidates=entries.filter(e=>e.content.component==='article'&&e.path!==current.path&&!['draft','unpublished'].includes(e.content.source_publish_status||''));
 const selected=(selections[slug(current.path)]||[]).flatMap(id=>{const entry=candidates.find(e=>slug(e.path)===id);return entry?[entry]:[];});
 const tags=articleRecommendationDetails(current).tags;
 const remaining=candidates.filter(e=>!selected.some(s=>s.path===e.path)).map(e=>({entry:e,score:articleRecommendationDetails(e).tags.filter(t=>tags.includes(t)).length})).filter(e=>e.score>0).sort((a,b)=>b.score-a.score||a.entry.path.localeCompare(b.entry.path));
 const offset=slug(current.path).split('').reduce((sum,char)=>sum+char.charCodeAt(0),0);
 const rotated=remaining.length?remaining.map((_,index)=>remaining[(index+offset)%remaining.length]):[];
 const related=[...selected,...rotated.map(e=>e.entry)].filter((e,i,all)=>all.findIndex(x=>x.path===e.path)===i);
 if(related.length<2&&current.source?.collection==='nura-50-draft'){
  for(const candidate of candidates){
   if(candidate.path!==current.path&&!related.some((entry:Entry)=>entry.path===candidate.path))related.push(candidate);
   if(related.length===2)break;
  }
 }
 return related.slice(0,2);
}
