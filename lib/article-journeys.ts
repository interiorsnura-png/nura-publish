import type {Entry} from './content';

/** Editorial-to-enquiry paths. Every destination must be an existing published route. */
export const articleJourneyTargets:Record<string,{proof:string;proofLabel:string;service:string;enquiry?:{href:string;label:string}}>={
  '/post/choosing-a-kitchen-showroom-in-fulham':{proof:'/kitchens/elm-park-road',proofLabel:'See a kitchen in a Chelsea home',service:'/services/bespoke-kitchens',enquiry:{href:'/london#london-enquiry-showroom',label:'Arrange your Fulham showroom visit'}},
  '/post/transform-your-space-with-custom-interior-services-london':{proof:'/kitchens/westover-road',proofLabel:'See a finished Nura interior',service:'/services/living-spaces'},
  '/post/the-power-of-porcelain':{proof:'/kitchens/amersham-road',proofLabel:'See porcelain in a completed kitchen',service:'/services/bespoke-kitchens'},
  '/post/kitchen-design-trends-in-2023':{proof:'/kitchens/tansley-farm',proofLabel:'See a completed kitchen',service:'/services/bespoke-kitchens'},
  '/post/finding-a-balance-with-decorative-lighting':{proof:'/inspiration/lighting',proofLabel:'Explore lighting inspiration',service:'/services/living-spaces'},
  '/post/the-urban-renovation':{proof:'/kitchens/elm-park-road',proofLabel:'See a London kitchen project',service:'/services/bespoke-kitchens'},
  '/post/our-design-process':{proof:'/process',proofLabel:'Explore the Nura design process',service:'/services/living-spaces'},
  '/post/exploring-the-advantages-of-pocket-doors':{proof:'/joinery/westover-road',proofLabel:'See architectural joinery in practice',service:'/services/architectural-joinery'},
  '/post/exploring-white-variations-in-kitchen-design':{proof:'/kitchens/ancona',proofLabel:'See a completed kitchen palette',service:'/services/bespoke-kitchens'},
  '/post/a-paradigm-shift-towards-sustainable-design-and-conscious-living':{proof:'/sustainability',proofLabel:'Read Nura’s sustainability approach',service:'/services/living-spaces'},
  '/post/solid-wood-or-veneer':{proof:'/joinery/westover-road',proofLabel:'See architectural joinery in practice',service:'/services/architectural-joinery'},
  '/post/what-are-some-of-the-biggest-problems-faced-for-customers-working-with-kitchen-designers':{proof:'/kitchens/amersham-road',proofLabel:'See a completed kitchen project',service:'/services/bespoke-kitchens'},
  '/post/using-artificial-intelligence-in-the-design-process':{proof:'/process',proofLabel:'Explore how Nura works',service:'/services/living-spaces'},
  '/post/how-to-choose-the-right-worktop-for-your-kitchen':{proof:'/kitchens/amersham-road',proofLabel:'See a porcelain worktop project',service:'/services/bespoke-kitchens'},
  '/guides/bespoke-kitchens':{proof:'/kitchens/tansley-farm',proofLabel:'See a completed bespoke kitchen',service:'/services/bespoke-kitchens'},
  '/post/one-tonne-porcelain-kitchen-island':{proof:'/kitchens/amersham-road',proofLabel:'Explore the Amersham Road kitchen',service:'/services/bespoke-kitchens'},
  '/guides/bespoke-joinery-london':{proof:'/joinery/westover-road',proofLabel:'See architectural joinery in practice',service:'/services/architectural-joinery'},
  '/guides/bespoke-vs-made-to-measure-kitchens':{proof:'/kitchens/tansley-farm',proofLabel:'See a bespoke kitchen project',service:'/services/bespoke-kitchens'},
};

export function getArticleJourney(path:string,entries:Entry[]){
  const targets=articleJourneyTargets[path];
  if(!targets)return null;
  const find=(target:string)=>entries.find(entry=>entry.path===target)||null;
  return {proof:find(targets.proof),proofLabel:targets.proofLabel,service:find(targets.service),enquiry:targets.enquiry||{href:'/consultation',label:'Discuss your project with Nura'}};
}
