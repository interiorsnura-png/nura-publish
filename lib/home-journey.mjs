// Scoped presentation changes; the historical migration snapshot remains intact.
export function improveHomeJourney(html) {
 const section = id => html.match(new RegExp(`<section id="${id}"[\\s\\S]*?</section>`))?.[0];
 const approach=section('approach'), work=section('work'), services=section('services');
 if(!approach || !work || !services)throw new Error('Homepage journey sections missing');
 let revisedWork=work.replace(/<a class="text-link" href="\/projects">See all projects[\s\S]*?<\/a>/,'');
 const editorial=revisedWork.match(/<div class="work-editorial">[\s\S]*?(?=<div class="project-grid">)/)?.[0];
 if(!editorial)throw new Error('Homepage portfolio missing');
 revisedWork=revisedWork.replace(editorial,'').replace('<a class="text-link work-link"',editorial+'<a class="text-link work-link"');
 const notes=[
  ['Elm Park Road','An open-plan kitchen connected to the living space.'],
  ['Tansley Farm','Calacatta Hermitage stone continues across worktops, splashbacks and island.'],
  ['Westover Road','White washed oak veneer, recessed lighting and Calacatta Cremo marble.']
 ];
 for(const [name,note] of notes)revisedWork=revisedWork.replace(new RegExp(`(<b>${name}</b><small>[^<]*</small>)`),`$1<span class="project-decision">${note}</span>`);
 // This card depicts the joinery, whose documented specification supports its caption.
 revisedWork=revisedWork.replace('href="/kitchens/westover-road"','href="/joinery/westover-road"');
 const revisedServices=services.replace('</section>','<a class="text-link home-service-enquiry" href="#contact">Discuss your space with Nura <span aria-hidden="true">↗</span></a></section>');
 html=html.replace(work,'').replace(services,'').replace(approach,revisedServices+revisedWork+approach);
 if(!html.includes(revisedServices))throw new Error('Homepage services lost');
 html=html.replace(/<section class="proof-section\b[\s\S]*?<\/section>/,'')
  .replace(/<section class="styles\b[\s\S]*?<\/section>/,'');
 for(const city of ['London','Dubai']){
  const query=`mailto:studio@nura-interiors.com?subject=${city}%20studio%20enquiry`;
  html=html.replace(`<a href="${query}"><strong>${city}</strong><span>Residential studio · Email us ↗</span></a>`,
   `<div class="studio-actions"><a href="/${city.toLowerCase()}"><strong>${city}</strong><span>${city==='London'?'Showroom details &amp; directions':'Explore the Dubai studio'} ↗</span></a><a class="studio-email" href="${query}">Email the ${city} studio ↗</a></div>`);
 }
 html=html.replace('Tell us about your home, your location and what matters to you. We’ll reply with a considered next step.',
  'Tell us what you are planning, where it is and what matters in daily use. Share the materials you want to keep or the layout you want to rethink. We’ll reply with a considered next step.');
 html=html.replace('</head>','<link rel="stylesheet" href="/nura-home-journey.css"/></head>');
 html=html.replaceAll('href="/consultation"','href="#contact"');
 return html;
}
