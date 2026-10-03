// Evidence-bounded copy. These are enquiry prompts, not delivery or response SLAs.
export const homeFaqItems = [
 {question:'What kind of projects does NURA take on?',answer:'Share the type of project, location and joinery scope you have in mind. We can discuss whether it is a suitable fit and what information is needed to take it forward.'},
 {question:'How much does bespoke joinery cost?',answer:'Cost depends on quantities, materials, finishes, hardware, detailing and installation requirements. Share your drawings or project brief so we can discuss the basis for pricing, including assumptions and exclusions.'},
 {question:'What happens after I enquire?',answer:'We start by understanding your project, its stage and the scope required. Drawings, specifications or a tender package help us assess suitability and discuss the next step.'},
 {question:'Can you work with my architect or interior designer?',answer:'We can discuss the joinery package with your project team. The scope of our involvement, responsibilities and required information should be agreed for the particular appointment.'},
 {question:'How long does a project take?',answer:'Timing depends on design information, approvals, materials, procurement and site readiness. The programme and its dependencies need to be agreed for the specific scope before delivery commitments are made.'},
 {question:'Can I send drawings or a tender package?',answer:'Yes. Email your current drawings, specifications or item schedule to studio@nura-interiors.com, as attachments or a sharing link. Include the project location, stage and tender deadline, and identify drawing revisions and any information still outstanding.'},
 {question:'Where does NURA work?',answer:'Share your project location alongside the scope required. We can discuss suitability and the delivery arrangements that would need to be agreed for that location.'}
];
const escapeHtml=(value:string)=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const homeFaqHtml=`<section id="faq" class="nura-faq section-pad" aria-labelledby="faq-title">
 <div class="nura-faq-layout">
  <div class="nura-faq-intro"><p class="section-mark">Before we begin</p><h2 id="faq-title">Questions worth<br><em>asking early.</em></h2><p class="nura-faq-lede">A few practical answers before you share your project.</p><a class="nura-faq-guide" href="/guides/bespoke-joinery-london">Explore the joinery guide <span aria-hidden="true">↗</span></a><p class="nura-faq-aside">Your brief. Your questions.<br>A clearer next step.</p></div>
  <div class="nura-faq-right"><div class="nura-faq-list">${homeFaqItems.map((item,index)=>`<details class="nura-faq-item"${index===2?' open':''}><summary><span class="nura-faq-number" aria-hidden="true">${String(index+1).padStart(2,'0')}</span><span class="nura-faq-question">${escapeHtml(item.question)}</span><span class="nura-faq-toggle" aria-hidden="true"></span></summary><div class="nura-faq-answer"><p>${escapeHtml(item.answer)}</p></div></details>`).join('')}</div>
   <div class="nura-faq-next"><p class="nura-faq-kicker">Your next step</p><h3>Have a project in mind?</h3><p>Send your drawings, tender package or project brief.</p><div class="nura-faq-actions"><a class="nura-faq-primary" href="mailto:studio@nura-interiors.com?subject=Joinery%20drawings%20or%20tender%20package">Send Drawings / Tender Pack <span aria-hidden="true">↗</span></a><a class="nura-faq-secondary" href="/consultation">Request a Consultation <span aria-hidden="true">↗</span></a></div><p class="nura-faq-hint">Send attachments or a sharing link by email. Include your location, project stage and tender deadline.</p></div>
  </div>
 </div>
</section>`;
