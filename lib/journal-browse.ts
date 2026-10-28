export const journalFilters=[['all','All stories'],['kitchens','Kitchens'],['materials','Materials'],['planning','Planning'],['joinery','Joinery'],['international','International'],['stories','Project stories']];
export const validJournalCategory=(value?:string)=>journalFilters.some(([id])=>id===value)?value!:'all';
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
 if(path&&reviewedTopics[path])return [...reviewedTopics[path]];
 const text=normaliseJournal(title+' '+category+' '+tags.join(' ')),topics=new Set<string>();
 if(/kitchen|cooking|oven|worktop|sink|fridge|dishwasher/.test(text))topics.add('kitchens');
 if(/material|veneer|lacquer|plywood|mfc|porcelain|colour|finish|oak|walnut|hardware|hinge|quartz/.test(text))topics.add('materials');
 if(/planning|quote|cost|finance|consult|timeline|programme|lead time|layout/.test(text))topics.add('planning');
 if(/joinery|cabinetry|fitted furniture|developer|builder|plumber|electrician|fitter/.test(text))topics.add('joinery');
 if(/dubai|international|shipping|freight|humid|overseas|barbados|spain/.test(text))topics.add('international');
 if(category==='Case study')topics.add('stories');
 return [...(topics.size?topics:new Set(['kitchens']))];
}
export function matchesJournal(item:{title:string;description:string;category:string;topics:string[]},category:string,query:string){return (category==='all'||item.topics.includes(category))&&(!query.trim()||normaliseJournal(item.title+' '+item.description+' '+item.category).includes(normaliseJournal(query.trim())));}
