/** Published proposal. Final coverage and claim terms remain subject to confirmation. */
export const guaranteePublished = true;
export function guaranteeEnabled(flag = process.env.NURA_GUARANTEE_PREVIEW) { return guaranteePublished || previewEnabled(flag); }
export function previewEnabled(flag = process.env.NURA_GUARANTEE_PREVIEW) { return flag === '1'; }
/** @param {string} html @param {string|undefined} [flag] */
export function enhanceFooter(html, flag = guaranteeEnabled() ? '1' : '0') {
 if (!previewEnabled(flag) || html.includes('data-guarantee-footer')) return html;
 return html.replace(/(<nav\b[^>]*aria-label="About NURA"[^>]*>[\s\S]*?)(<\/nav>)/, '$1<a data-guarantee-footer href="/guarantee">Cabinetry guarantee</a>$2');
}
/** @param {string} html @param {string|undefined} [flag] */
export function enhanceHome(html, flag = guaranteeEnabled() ? '1' : '0') {
 if (!previewEnabled(flag)) return html;
 let out=enhanceFooter(html,flag);
 if(!out.includes('/nura-guarantee.css')) out=out.replace('</head>','<link rel="stylesheet" href="/nura-guarantee.css"/></head>');
 if(!out.includes('data-guarantee-hero')) out=out.replace(/(<a\b[^>]*class="button button-light"[^>]*>[\s\S]*?<\/a>)/,'$1<div class="ng-trust" data-guarantee-hero><span>10-Year Cabinetry Guarantee</span><small>Proposed coverage</small><a href="/guarantee">View coverage &amp; terms <span aria-hidden="true">↗</span></a></div>');
 if(!out.includes('data-guarantee-faq')) out=out.replace(/<\/div>(\s*<div class="nura-faq-next")/,'<details class="nura-faq-item" data-guarantee-faq><summary><span class="nura-faq-number" aria-hidden="true">08</span><span class="nura-faq-question">What does the 10-year cabinetry guarantee cover?</span><span class="nura-faq-toggle" aria-hidden="true"></span></summary><div class="nura-faq-answer"><p>Our proposed guarantee covers manufacturing and material defects in NURA-made cabinetry. Installation and third-party products have separate terms. <a href="/guarantee">View proposed coverage and terms</a>.</p></div></details></div>$1');
 return out;
}
