import type {Entry} from './content';

/** Editorial-to-enquiry paths. Every destination must be an existing published route. */
export const articleJourneyTargets:Record<string,{proof:string;proofLabel:string;service:string;enquiry?:{href:string;label:string}}>={
  '/post/kitchen-tablecloth-colour':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a documented kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your kitchen and dining palette'}},
  '/post/kitchen-drawers-vs-cupboards':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a documented kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your cabinet-by-cabinet storage brief'}},
  '/post/kitchen-blind-colour':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a documented kitchen palette',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your kitchen palette and retained furniture'}},
  '/post/kitchen-renovation-timeline':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a documented kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your kitchen brief and target dates'}},
  '/post/kitchen-clock-placement':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a documented kitchen palette',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your dining furniture and kitchen finishes'}},
  '/post/kitchen-island-dimensions':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a documented London kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your island dimensions and room priorities'}},
  '/post/kitchen-table-centrepiece':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a documented London kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your dining furniture and kitchen palette'}},
  '/post/kitchen-fitting-costs-london':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a documented London kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your kitchen fitting scope and finish priorities'}},
  '/post/kitchen-canister-styling':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a documented kitchen palette',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your visible storage and kitchen finishes'}},
  '/post/small-kitchen-design-ideas':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a documented kitchen palette',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your two small-kitchen priorities'}},
  '/post/kitchen-fruit-bowl-styling':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a documented kitchen palette',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your retained objects and kitchen finishes'}},
  '/post/new-kitchen-costs-london':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a completed London kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your kitchen scope and budget'}},
  '/post/kitchen-rug-colours':{proof:'/kitchens/ancona',proofLabel:'Explore a completed Nura kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your kitchen palette and material brief'}},
  '/post/kitchen-fridge-placement':{proof:'/kitchens/ancona',proofLabel:'Explore a completed Nura kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your kitchen layout and appliance brief'}},
  '/post/kitchen-pendant-light-finish':{proof:'/kitchens/ancona',proofLabel:'Explore a completed Nura kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your kitchen materials and lighting brief'}},
  '/post/kitchen-island-seating-layout':{proof:'/kitchens/ancona',proofLabel:'Explore a completed Nura kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your island and seating layout'}},
  '/post/kitchen-splashback-grout-colour':{proof:'/kitchens/ancona',proofLabel:'Explore a completed Nura kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your splashback and kitchen palette'}},
  '/post/dishwasher-placement':{proof:'/kitchens/ancona',proofLabel:'Explore a completed Nura kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your kitchen clean-up layout'}},
  '/post/kitchen-bar-stool-colours':{proof:'/kitchens/ancona',proofLabel:'Explore a completed Nura kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss seating within your kitchen palette'}},
  '/post/kitchen-larder-cupboard':{proof:'/kitchens/ancona',proofLabel:'Explore a completed Nura kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your larder and kitchen storage'}},
  '/post/kitchen-windowsill-styling':{proof:'/kitchens/ancona',proofLabel:'Explore a completed Nura kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your window area and kitchen palette'}},
  '/post/handleless-kitchen-doors':{proof:'/kitchens/ancona',proofLabel:'Explore a completed Nura kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your kitchen opening systems'}},
  '/post/mixing-wood-tones-kitchen':{proof:'/kitchens/ancona',proofLabel:'Explore a completed Nura kitchen',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your existing furniture and kitchen palette'}},
  '/post/kitchen-worktop-edge-profiles':{proof:'/guides/bespoke-kitchens',proofLabel:'Plan the worktop within the complete kitchen',service:'/services/bespoke-kitchens'},
  '/post/kitchen-tea-towel-display':{proof:'/guides/bespoke-kitchens',proofLabel:'Plan the room around everyday use',service:'/services/bespoke-kitchens'},
  '/post/single-vs-double-kitchen-sink':{proof:'/guides/bespoke-kitchens',proofLabel:'Plan the complete kitchen brief',service:'/services/bespoke-kitchens'},
  '/post/kitchen-wall-art-frame-size':{proof:'/guides/bespoke-kitchens',proofLabel:'Plan the wider kitchen room',service:'/services/bespoke-kitchens'},
  '/post/kitchen-corner-storage-checks':{proof:'/guides/bespoke-kitchens',proofLabel:'Plan the wider kitchen layout',service:'/services/bespoke-kitchens'},
  '/post/kitchen-worktop-styling-tray-checks':{proof:'/guides/bespoke-kitchens',proofLabel:'Plan the wider kitchen brief',service:'/services/bespoke-kitchens'},
  '/post/kitchen-bin-layout-checks':{proof:'/guides/bespoke-kitchens',proofLabel:'Plan the wider kitchen brief',service:'/services/bespoke-kitchens'},
  '/post/kitchen-shelf-styling-daily-use':{proof:'/guides/bespoke-kitchens',proofLabel:'Plan the wider kitchen brief',service:'/services/bespoke-kitchens'},
  '/post/before-you-order-kitchen-handles-try-the-grip':{proof:'/kitchens/ancona',proofLabel:'Explore hardware within a completed kitchen palette',service:'/services/bespoke-kitchens'},
  '/post/kitchen-drawer-organisation-before-you-buy':{proof:'/guides/bespoke-kitchens',proofLabel:'Plan the wider kitchen brief',service:'/services/bespoke-kitchens'},
  '/post/test-kitchen-colour-at-home':{proof:'/kitchens/ancona',proofLabel:'Explore a completed kitchen palette',service:'/services/bespoke-kitchens'},
  '/post/plywood-vs-mfc-kitchen-carcasses':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a completed kitchen in Chelsea',service:'/services/bespoke-kitchens'},
  '/post/planning-a-galley-kitchen-in-london':{proof:'/kitchens/westover-road',proofLabel:'Explore the Westover Road project',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your galley kitchen with Nura'}},
  '/post/how-to-compare-bespoke-kitchen-quotes-in-london':{proof:'/kitchens/elm-park-road',proofLabel:'Explore a completed kitchen in Chelsea',service:'/services/bespoke-kitchens',enquiry:{href:'/consultation',label:'Discuss your kitchen project with Nura'}},
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
  const targets=articleJourneyTargets[path]||(
   path.startsWith('/post/')&&entries.some(entry=>entry.path===path)
    ? {proof:'/kitchens/amersham-road',proofLabel:'Explore a completed Nura kitchen',service:'/services/bespoke-kitchens'}
    : null
  );
  if(!targets)return null;
  const find=(target:string)=>entries.find(entry=>entry.path===target)||null;
  return {hasCustomEnquiry:Boolean(targets.enquiry),proof:find(targets.proof),proofLabel:targets.proofLabel,service:find(targets.service),enquiry:targets.enquiry||{href:'/consultation',label:'Discuss your project with Nura'}};
}
