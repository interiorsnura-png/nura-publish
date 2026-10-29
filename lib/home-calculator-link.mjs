const block=`<section id="home-kitchen-budget" aria-labelledby="home-kitchen-budget-title">
 <div class="budget-intro"><p class="budget-kicker">Start with a clearer budget</p><h2 id="home-kitchen-budget-title">What could your<br><em>kitchen</em> cost?</h2><p>Explore a planning range based on your kitchen size and specification.</p><small>UK market benchmarks, not a NURA quotation.</small></div>
 <img class="budget-photo" src="/kitchen-budget-hero.webp" alt="Woman reviewing kitchen costs beside plans and material samples" width="1672" height="941" loading="lazy" decoding="async"/>
 <a href="/bespoke-kitchen-cost-calculator">Calculate My Kitchen Budget <span aria-hidden="true">→</span></a>
</section>`;
export function addHomeCalculatorLink(html){
 if(html.includes('id="home-kitchen-budget"'))return html;
 const anchor='<section id="services"';
 if(html.split(anchor).length!==2)throw Error('Homepage services anchor missing or repeated');
 return html.replace(anchor,block+'\n'+anchor);
}
