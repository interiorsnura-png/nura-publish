// Apply reviewed enhancements without rewriting the preserved migration source.
export function improveHomeSeo(html:string){
 return html
  .replace('We design spaces that feel inevitable: considered from the first line, resolved down to the last hinge.',
   'A room can change a life when it is designed around the people who use it. Our bespoke kitchens and joinery are considered from the first line, resolved down to the last hinge.')
  .replace('</head>','<link rel="apple-touch-icon" sizes="192x192" href="/favicon.png"/><style>.proof-row .nura-display-number{font:31px var(--serif);font-weight:400}.outcome-grid .nura-display-number{font-size:10px;letter-spacing:.15em}.nura-link-label{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}@media(max-width:800px){.proof-row .nura-display-number{font-size:27px}}</style></head>')
  .replace(/<strong>(0[123]|∞)<\/strong>/g,'<span class="nura-display-number">$1</span>')
  .replace('src="/assets/linkedin.svg" alt=""','src="/assets/linkedin.svg" alt="LinkedIn"')
  .replace('src="/assets/instagram.svg" alt=""','src="/assets/instagram.svg" alt="Instagram"')
  .replace(/(<a[^>]+href="\/services\/bespoke-kitchens"[^>]*>)↗(<\/a>)/g,'$1<span class="nura-link-label">Explore bespoke kitchens</span>↗$2')
  .replace(/(<a[^>]+href="\/services\/architectural-joinery"[^>]*>)↗(<\/a>)/g,'$1<span class="nura-link-label">Explore architectural joinery</span>↗$2')
  .replace(/(<a[^>]+href="\/services\/living-spaces"[^>]*>)↗(<\/a>)/g,'$1<span class="nura-link-label">Explore bespoke living spaces</span>↗$2');
}
