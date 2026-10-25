// Contextual routes are added after the existing homepage journey transform.
const planningHtml=`<section id="home-planning" class="home-planning section-pad" aria-labelledby="home-planning-title">
 <div class="section-mark">From the Nura Journal</div>
 <div class="home-planning-heading"><h2 id="home-planning-title">Planning your<br><em>kitchen?</em></h2><p>Start with the decisions that shape your brief, from the room layout to the materials and the scope of a quotation.</p></div>
 <ol class="home-planning-grid">
  <li><span class="home-planning-number" aria-hidden="true">01 / The brief</span><h3><a href="/guides/bespoke-kitchens">Plan your bespoke kitchen <span aria-hidden="true">↗</span></a></h3><p>Bring layout, cabinetry, materials and installation questions into one considered brief.</p></li>
  <li><span class="home-planning-number" aria-hidden="true">02 / The quotation</span><h3><a href="/post/how-to-compare-bespoke-kitchen-quotes-in-london">How to compare kitchen quotations <span aria-hidden="true">↗</span></a></h3><p>Compare specifications, installation responsibilities and exclusions before comparing the totals.</p></li>
  <li><span class="home-planning-number" aria-hidden="true">03 / The materials</span><h3><a href="/post/how-to-choose-the-right-worktop-for-your-kitchen">Compare kitchen worktop materials <span aria-hidden="true">↗</span></a></h3><p>Consider appearance, everyday care and fabrication details alongside your cabinetry.</p></li>
 </ol>
</section>`;

function replaceOnce(html,source,replacement){
 if(html.split(source).length!==2)throw Error('Homepage planning link anchor missing or repeated: '+source);
 return html.replace(source,replacement);
}
export function improveHomePlanningLinks(html){
 if(html.includes('id="home-planning"'))return html;
 html=replaceOnce(html,'<section id="faq"',planningHtml+'\n<section id="faq"');
 html=replaceOnce(html,'<p>Wardrobes, libraries, media walls and storage that belong to the architecture.</p>',
  '<p><a class="home-joinery-link" href="/services/wardrobes-dressing-rooms">Bespoke fitted wardrobes</a>, libraries, media walls and storage that belong to the architecture.</p>');
 html=replaceOnce(html,'<strong>London</strong><span>Showroom details &amp; directions ↗</span>',
  '<strong>London</strong><span>Visit our Fulham kitchen showroom ↗</span>');
 return replaceOnce(html,'</head>','<link rel="stylesheet" href="/nura-home-planning.css"/></head>');
}
