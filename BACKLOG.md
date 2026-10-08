# NURA Backlog

- [x] Verify live article metadata, headings, CTA placement, and analytics script after merge.
- [ ] Verify consented `article_cta_click` delivery in GA4 DebugView; the live script and payload are present, but receipt in GA4 has not been independently observed.

- [ ] Complete interactive mobile and desktop checks for the live article.
- [ ] Verify consented `article_cta_click` receipt in GA4 DebugView.
- [ ] Verify the Vercel deployment details map to the intended source commit.

- [x] Migrate the full published interactive catalogue, images, fonts and video files onto NURA without an iframe. Original editable application source is not available in this account; compiled runtime and media are versioned locally.

- [ ] Confirm final Vercel status for a7459f7; production hours on /london and / are already verified.

- [ ] Activate qualified-lead CRM feedback after actual stage mapping and Google Ads API authorisation.
- [ ] Confirm a real ad-origin lead attribution after release.

- [ ] Run browser performance traces for `/`, `/projects`, `/projects/catalogue`, `/consultation`, `/london` and one article at 390x844 and 1440x1000; capture CLS sources, INP interactions, long tasks, console errors and failed requests.
- [ ] Export a later Clarity performance overview after the performance remediation and compare against the 2026-10-06 to 2026-10-08 baseline; do not treat local tests or traces as field-user proof.
- [ ] Run local browser preview checks for `/services/wardrobes-dressing-rooms` at desktop, tablet and mobile widths; verify FAQ interaction, CTA destinations, metadata, internal routes, console errors and horizontal overflow.
