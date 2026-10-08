# NURA Work Log

## 2026-10-07: release local projects ordering
- Integrated only the project ordering module, listing usage and featured-image treatment from Desktop/nura-publish into the current production checkout.
- Preserved the previously released catalogue preview and all unrelated local work. No local branch switch or reset was performed.
- 28 tests, production build, 67 page checks and image-license verification passed. Direct ordering-module execution confirmed Tansley Farm, Elm Park Road and Westover Road as the first cards.

## 2026-10-07

- Started the approved update for the kitchen designer problems article.
- Verified the repository remote, branch, source record, rendering path, production route, and existing consent-gated analytics implementation.
- Commit b76e7d8 is on origin/main. Production HTML now confirms the revised title, metadata, CTA, headings, responsibility section, and Vercel response.
- The prior production-stale-content blocker is closed. Interactive mobile and desktop checks, GA4 DebugView delivery, and exact Vercel deployment-to-commit mapping remain separately unverified.

## 2026-10-07: recover Wix interactive portfolio
- Read the live Wix features model and identified the HtmlComponent catalogue source.
- Added an on-demand viewer and full-screen fallback on /projects; preserved all existing project cards and category filters.
- Worked in a clean independent clone at remote main 48330fd, preserving the older dirty checkout.
- Local checks passed: 27 tests, typecheck, build, 66 rendered pages, 618 photo instances, 403 unique photos, zero missing licenses. Desktop/mobile browser checks passed; catalogue unloaded until requested.
- External catalogue hosting remains a dependency. Release verified through the Vercel GitHub status for commit 9792ccb and the live /projects page. Live browser checks passed at both tested viewport sizes. Release evidence saved outside the repository in outputs/portfolio-transfer/live-checks.json. This verification-only documentation delta remains local to avoid a redundant deployment.

## 2026-10-07: native catalogue migration
- Owner requested full migration after iframe integration.
- Imported the published HTML, compiled runtime, local fonts, 106 images and 14 video files. Kept original catalogue interactions and film gallery; removed iframe and original-host dependency.
- /projects/catalogue is a local static rewrite, discoverable through /projects and sitemap. Existing portfolio redirect remains unchanged.
- Added image-license schema and media inventory integrity test. Browser interaction and zero-foreign-request checks passed locally. 28 tests and verified build passed across 67 pages.
- Previous local release-evidence documentation delta is included in this release. Current release status to be checked after push.

- Native release c58809d verified on production through its Vercel GitHub status, HTTP 200, live desktop/mobile browser checks, local video HTTP 206 and sitemap inclusion. No iframe, foreign requests, failed resources, console exceptions or horizontal overflow were observed. Verification-only documentation remains local to avoid a redundant deployment.

## 2026-10-07: projects catalogue preview
- Added an editorial Portfolio 2026 preview above the /projects filters and cards, linking to the complete native catalogue and its films section.
- Preserved the existing Kitchen and Joinery filters and all project records.
- Local desktop and mobile checks confirmed correct content order, loaded imagery, working filters and catalogue link, no iframe, no console errors and no horizontal overflow.
- Verified build passed: 28 tests, 67 SEO-checked pages, 724 photo instances, 508 unique photos and zero missing image licenses.

## 2026-10-08: London showroom hours
- Owner confirmed Monday-Friday 09:30-18:00, Saturday 10:00-16:00 and Sunday by prior appointment.
- Updated shared footer, homepage, London studio details and Saturday schema, visit FAQ, published editorial and native catalogue. Dubai hours preserved.
- Typecheck, 28 tests, production build and build verifier passed. Commit a7459f7 pushed to main. Live in-app browser verification confirms the new hours on /london and /. Vercel commit status is still pending for deployment 2aUCTCc1BwZ7TFjm4yftzMzwEPKu; final status remains to be confirmed.

## 2026-10-08: advertising attribution integration
- Preserved allowlisted campaign parameters in GA4 page locations, without arbitrary query strings.
- Added separate opt-in for advertising measurement; legacy analytics-only choices do not grant ad consent. Ad personalisation remains denied. Updated privacy copy and responsive consent controls.
- Capture click IDs only after advertising consent; remove them on withdrawal and preserve the original landing page. Server validates consent before recording IDs in email/CRM details.
- Added Saturday hours to homepage London schema.
- 29 tests passed, including campaign sanitisation, consent transitions and server click-ID suppression. Live release verification pending.
- CRM qualified-lead feedback requires the actual qualification stage and authorised Google Ads API configuration. A genuine ad-origin conversion test remains pending; no synthetic ad click or sale is generated.

## 2026-10-08: Clarity performance remediation
- Used the Clarity export for 2026-10-06 through 2026-10-08 as baseline evidence: score 46.67, LCP 1.964s, INP 816ms and CLS 0.6975.
- Added a stable height contract to shared `.inner-photo` wrappers, removed automatic project-card image priority, cached article TOC links and skipped unchanged marker DOM writes, and deferred gtag/Clarity script insertion after consent using idle scheduling with a timeout fallback.
- Verification passed: 29 tests, TypeScript typecheck and production build. No commit, push or deployment performed. Browser trace and a later Clarity export are still required to validate field improvement.

## 2026-10-09: wardrobe service page implementation
- Implemented the approved Mission 02 direction locally in `components/WardrobeLanding.tsx`: tightened the introductory copy, added distinct plans and showroom appointment CTAs pointing to the existing enquiry anchor, and added the two approved visible FAQs for awkward spaces and dressing rooms.
- Preserved metadata, H1, URL, Service schema, existing reviews, enquiry form, analytics and consent logic. Added structural regression assertions to `tests/seo-content.test.mjs`; no FAQ schema or unsupported claims were introduced.
- 30 tests, typecheck, production build and whitespace checks passed. No commit, push or deployment performed. Browser visual/interaction preview remains pending.
