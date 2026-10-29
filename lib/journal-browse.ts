import taxonomy from './journal-taxonomy.json';
export const journalFilters=[['all','All Articles'],['planning','Planning & Costs'],['layout','Layout & Storage'],['materials','Materials & Finishes'],['joinery','Architectural Joinery'],['stories','Project Stories']];
export const journalCategoryContent:Record<string,{title:string;description:string}>={
 planning:{title:'Kitchen Planning & Costs',description:'Plan your kitchen budget, compare quotations and understand scope, appointments and project programmes.'},
 layout:{title:'Kitchen Layout & Storage Ideas',description:'Explore kitchen layouts, island dimensions, appliance positions and storage choices for everyday use.'},
 materials:{title:'Kitchen Materials & Finishes',description:'Compare worktops, cabinetry materials, colours, veneers and finishes for your kitchen and joinery.'},
 joinery:{title:'Bespoke Joinery Guides',description:'Explore fitted wardrobes, media walls and the technical decisions behind architectural joinery.'},
 stories:{title:'NURA Project Stories',description:'Explore documented design and delivery decisions from NURA kitchen and joinery projects.'},
 styling:{title:'Kitchen Styling & Décor Ideas',description:'Explore practical ideas for kitchen shelves, table settings, accessories and decorative details.'}
};
export function journalTaxonomy(path:string){return (taxonomy as Record<string,{primary:string;tags:string[]}>)[path];}
export const validJournalCategory=(value?:string)=>[...journalFilters.map(([id])=>id),'styling','kitchens','international'].includes(value||'')?value!:'all';
export const journalPageNumber=(value?:string)=>/^\d+$/.test(value||'')?Math.max(1,Math.min(10000,Number(value))):1;
export function journalPageURL(category:string,query:string,page=1){return journalURL(category,query,page*12);}
export const normaliseJournal=(value:string)=>value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function journalURL(category:string,query:string,limit=12){const p=new URLSearchParams();if(category!=='all')p.set('category',category);if(query.trim())p.set('q',query.trim());if(limit>12)p.set('page',String(Math.ceil(limit/12)));return '/journal'+(p.size?'?'+p.toString():'');}
export const journalFeatures:Record<string,string>={all:'/guides/bespoke-kitchens',kitchens:'/guides/bespoke-kitchens',joinery:'/guides/bespoke-joinery-london',planning:'/guides/bespoke-vs-made-to-measure-kitchens',materials:'/post/solid-wood-or-veneer',stories:'/post/one-tonne-porcelain-kitchen-island'};
// Reviewed memberships supplement the archive's existing metadata inference.
const reviewedTopics:Record<string,string[]>={
 '/guides/bespoke-kitchens':['kitchens','materials','planning'],
 '/guides/bespoke-joinery-london':['joinery','planning'],
 '/post/solid-wood-or-veneer':['kitchens','materials','joinery'],
 '/post/planning-a-kitchen-across-london-and-dubai':['kitchens','planning','international'],
 '/post/joinery-stone-interface':['joinery','planning','materials']
};
export function journalTopics(title:string,category:string,tags:string[],path?:string){
 if(path&&reviewedTopics[path])return [...reviewedTopics[path],...(/layout|storage|wardrobe|island|drawer|dishwasher/.test(normaliseJournal(title))?['layout']:[])];
 const text=normaliseJournal(title+' '+category+' '+tags.join(' ')),topics=new Set<string>();
 if(/kitchen|cooking|oven|worktop|sink|fridge|dishwasher/.test(text))topics.add('kitchens');
 if(/material|veneer|lacquer|plywood|mfc|porcelain|colour|finish|oak|walnut|hardware|hinge|quartz/.test(text))topics.add('materials');
 if(/planning|quote|cost|finance|consult|timeline|programme|lead time|layout/.test(text))topics.add('planning');
 if(/layout|storage|wardrobe|island|drawer|dishwasher|corner|pantry|shelv|clearance/.test(text))topics.add('layout');
 if(/joinery|cabinetry|fitted furniture|developer|builder|plumber|electrician|fitter/.test(text))topics.add('joinery');
 if(/dubai|international|shipping|freight|humid|overseas|barbados|spain/.test(text))topics.add('international');
 if(category==='Case study')topics.add('stories');
 return [...(topics.size?topics:new Set(['kitchens']))];
}
export function matchesJournal(item:{title:string;description:string;category:string;topics:string[];primaryCategory?:string},category:string,query:string){return (category==='all'||(item.primaryCategory&&journalCategoryContent[category]?item.primaryCategory===category:item.topics.includes(category)))&&(!query.trim()||normaliseJournal(item.title+' '+item.description+' '+item.category+' '+item.topics.join(' ')).includes(normaliseJournal(query.trim())));}
