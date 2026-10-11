# NURA Backlog

- [x] Confirm the Tansley Farm preservation release deployment commit and the corrected homepage card and project metadata on production: `5a189d4`, deployment `dpl_3FUCWUbDTci4QuRvwvFiQs85nzwB`, READY and live HTTP/browser checks passed.

- [x] Verify the journal journey release on Production: Vercel confirmed `5a8e90e` and subsequent `5a189d4`; live porcelain article proof/service/consultation links passed at desktop and mobile sizes.

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

- [ ] Verify London landing content release on Production; real submission and GA4 receipt are not covered by this UI check.

- [ ] Review local journal prototype at http://127.0.0.1:3011/journal before any production release.

- [ ] Validate journal structured data with an external validator before production release; local JSON, graph references, archive correspondence and image deduplication checks passed.


- [x] Implement and locally verify Fulham showroom checklist, ArticleJourney, Article/Breadcrumb schemas and London booking selection.
- [ ] Release Fulham showroom article to main and verify exact Vercel source SHA and live route.

User authorised commit and push to main on 2026-10-11; release verification follows the push.
