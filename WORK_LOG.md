# NURA Work Log

## 2026-10-23: legacy Journal update

- Identified exactly 20 existing Journal article/guide records outside the recently corrected 50. Baseline live requests returned HTTP 200 for all 20.
- Routed editorial drafts through OmniRoute, rejected unsupported suggestions, and applied bounded edits to the authoritative records only. Updated descriptions and nine paragraphs; removed 13 repeated or missing-source images.
- Author assignments, original publication dates, H1 titles and existing link destinations remain unchanged. Two regression checks cover all 20 records. Production evidence is separate from local test success.

## 2026-10-12: automatic search notification improvements

- 2026-10-13 follow-up: verified HTTP 200 acceptance for the homepage and an automatic 70-URL run. Detected that no IndexNow state cache existed, so repeated runs fell back to the old repository baseline. Replaced cache persistence with workflow artifacts and added restore/provenance/state-validation tests; 49 project tests and workflow YAML parsing passed. Two consecutive live runs will verify deduplication.
- Verified the existing IndexNow workflow runs on successful Production deployments, but its old fingerprint omitted JSON-LD and favicon changes. Extended it to cover those changes without treating build-only icon query strings as new content.
- Added the official Google sitemap PUT endpoint, live sitemap validation, bounded transient retries, short-lived OIDC workflow integration and explicit configuration/failure receipts. No Google Indexing API call is made for ordinary NURA articles.
- Google Cloud for `interiors.nura@gmail.com` displays an MFA access block. Owner action and subsequent external service-account/WIF permission setup are required. No credential or access change was made.
- Seven focused tests passed, including actual-byte favicon changes, schema changes, stable build hashes, denied Google permissions, invalid sitemap rejection and transient retry behaviour.
- Release-wide validation passed: 46 tests, TypeScript/build, 70 route checks, 510 unique licensed photos, workflow YAML parsing and diff checks. The configuration smoke check reports no Google request made.

## 2026-10-12: transparent gold favicon release

- Integrated only the reviewed favicon assets and required metadata/runtime changes into the latest main checkout. Preserved the catalogue social-image release and all unrelated work.
- The approved artwork originated in Nano Banana 2/Canva and was refined with imagegen for glint, transparency and stronger gold contrast. PNG alpha and 16/32/48 px ICO were checked locally.
- User authorised publication. Release validation and Production evidence will follow.
- `npm run build:verified` passed: 41 tests, TypeScript/build, 70 route checks, 745 photo instances, 510 unique photos and zero missing licenses. Diff whitespace checks passed.

## 2026-10-11: Tansley Farm preservation release preparation
- The older local checkout was behind current production. Created an isolated release checkout at `origin/main` and integrated only the five Tansley record fields, two homepage text corrections, and preservation test.
- The historical source remains unchanged; the test applies exactly two scoped expected corrections and compares every remaining HTML byte after newline normalization.
- Verified 32 tests and production build, 67 page checks and no missing photo licenses. Commit `5a189d41aea19796dbb82c34a77376431a52cad0` was pushed to main; Vercel confirms Production READY at `dpl_3FUCWUbDTci4QuRvwvFiQs85nzwB`, with the custom domains assigned.
- Live homepage and project HTTP checks passed for corrections, copy and SEO. Desktop/mobile browser checks confirmed image loading, no overflow, working article destinations and consultation form rendering. No browser errors or matching runtime error/fatal records were observed. Screenshots are stored outside the repository at `C:/Users/Asus/Documents/Codex/2026-10-11/context-md/outputs/nura-live-tansley-desktop.jpg` and `nura-live-tansley-mobile.jpg`. Post-release documentation is retained locally to avoid another documentation-only deployment.

## 2026-10-11: journal journeys prepared for release
- Reapplied the approved journal pathways to the latest `origin/main` while retaining the newer article early CTA and other intervening changes.
- Added a route-checked pathway for all 17 articles: related reading, relevant proof or supporting page, matching service, and consultation.
- Replaced the generic article footer CTA with the pathway and aligned the desktop sidebar service link with the article topic.
- Local evidence: 32 tests passed, typecheck passed, production build passed with a temporary two-worker configuration, and all 17 article routes plus 13 distinct linked routes returned HTTP 200 in the built server.
- Production deployment and live verification remain pending at the time of this entry.

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

## London landing content and enquiry, 2026-10-09
Primary CTA now invites a Fulham showroom visit. London enquiry exposes four main fields and collapses optional project details; hash links select showroom or consultation intent. Added existing Google review excerpts, project context and explicit follow-up explanation. Local mobile 390x844 CTA switching, details expansion, empty required-field validity and overflow checks passed. Production release authorized by user; pending live verification. No real enquiry submitted.

## 2026-10-11: local journal design prototype
- Local /journal now uses JournalLanding and a scoped CSS module: Amersham story hero, three reader entry paths, asymmetric studio edit, three existing guides, material edit, all 17 articles with query filters, and showroom/consultation links.
- Local preview runs at http://127.0.0.1:3011/journal in nura-release. TypeScript and 32 existing tests passed. Browser checks at 1440x900 and 390x844 found no horizontal overflow; visible images loaded and the Materials filter returned five articles. No browser errors were observed in the inspected logs.
- No commit, push or production deployment for this prototype. Next step: user review of the local design. Desktop/mobile screenshots are in ../outputs/nura-journal-local-desktop.jpg and nura-journal-local-mobile.jpg. Next dev also generated its standard AGENTS block and development type paths.

## 2026-10-11: local journal structured data
- Added CollectionPage and ItemList linked to the existing breadcrumb and publisher. The archive list uses the actual visible article order and count for each filter, with stable absolute URLs and query-specific identifiers.
- Journal images now emit their license schema once per unique image URL. Deduplication is request-local; shared Photo keeps schema enabled by default for other pages.
- Typecheck and rendered-output assertions passed for all, materials, planning, joinery, stories, design and invalid-filter fallback. Full archive: 17 items and 16 unique image definitions; Materials: 5 items and 7 unique image definitions. Sample Article schema and image licensing preserved.
- This remains local and uncommitted; no push/deployment or external Google validation performed.

## 2026-10-11: journal release preparation
- User authorized committing the journal design and structured-data changes to main and verifying Vercel publication.
- Base matches origin/main at 5a189d4. Verified 32 tests and the production build with two temporary local workers after a 13-worker memory failure; next.config.mjs restored. Build verification passed for 67 pages, 730 photo instances, 508 unique photographs and zero missing image licenses.
- Prepared changes are the dedicated journal landing, scoped styles, collection/list schema, journal image deduplication and breadcrumb identifiers. Deployment status will be recorded after push and authoritative Vercel inspection.

## 2026-10-11: Fulham showroom checklist, local implementation verified
- Added /post/choosing-a-kitchen-showroom-in-fulham to published-editorial.json with the requested title, cabinet construction, hinges/runners, physical material samples, first-meeting documents and written scope checklists. Existing editorial records preserved.
- New article appears in journal archive and Planning filter (18 total articles). Related reading links to bespoke kitchen planning and wood/veneer; the kitchen guide now recommends the new checklist.
- Hero, body, sidebar and ArticleJourney conversion links go directly to /london#london-enquiry-showroom. Browser click confirmed the London form selects Fulham showroom visit automatically. Existing article journeys retain consultation destinations.
- Article/Breadcrumb schemas, canonical, description, Open Graph, journal ItemLists, sitemap and licensed showroom hero image verified on the local production build. Nura Interiors uses Organization author schema and /about author links; Joanne H attribution retained for her existing articles.
- 35 automated tests, TypeScript and production build passed. Build verifier checked 68 pages, 734 photo instances and 508 unique images with no missing licenses. Dedicated verify-fulham.mjs is now part of build verification. Local desktop1440x900 and mobile390x844: loaded hero, no horizontal overflow; inspected browser errors empty.
- Screenshots: ../outputs/nura-fulham-article-desktop.jpg, nura-fulham-article-mobile.jpg and nura-fulham-booking-journey.jpg. Local preview http://127.0.0.1:3011/post/choosing-a-kitchen-showroom-in-fulham; production server kept running.
- Local implementation only: no commit, push or deployment. No booking enquiry submitted. Build used two temporary local workers; next.config.mjs restored. Live publication and live SEO verification remain pending.

User authorised commit and push to main on 2026-10-11; release verification follows the push.

## 2026-10-11: Fulham editorial and SEO audit corrections verified locally
- Replaced the slow opening with a direct inspection checklist summary; added a five-point Key takeaways callout, a five-row comparison table, licensed cabinetry detail photography and a clearly qualified official Blum reference. The other 17 editorial records remain unchanged.
- Added a specific studio author bio and Alex J, Execution and installation lead, as reviewer. User explicitly confirmed review and approval of this article. Visible review attribution matches reviewedBy/lastReviewed on the Article's WebPage entity.
- Added explicit author URL and a 1200x630 social card generated reproducibly from existing showroom photography; OG/Twitter image alt and OG dimensions verified. Original first-publication calendar date preserved; full published timestamp 2026-10-11T05:40:22Z comes from the verified first Production deployment. Modified timestamp 2026-10-11T05:55:29Z records this edit.
- 36 automated tests and TypeScript/build passed. Build verification: 68 pages, 735 Photo instances, 508 unique images, no missing licenses. Fulham rendered metadata, reviewer, checklists, table, actual PNG dimensions, journal filters, sitemap and all London conversion destinations passed.
- Google Rich Results Test on the locally rendered schema code: 8 valid items; Article and Breadcrumb valid without warnings after timestamp correction. An intermediate duplicate Organization URL warning was resolved by using the same canonical brand URL for the shared organization identity. Final result: all 8 items valid without reported warnings, https://search.google.com/test/rich-results/result?id=68fuVU5Mn0j9pHX-EbWHqw. Code test does not prove Google crawling or live deployment.
- Browser: desktop1440x900 and mobile390x844 have no horizontal page overflow; callout, table and reviewer visible; browser error log empty. Screenshots ../outputs/nura-fulham-revised-desktop.jpg, nura-fulham-revised-mobile.jpg, nura-fulham-rich-results.jpg.
- Local preview runs on port3011. No commit, push or production deployment in this correction task. Build used temporary two workers; original config restored. Next step: commit/push this correction release and verify exact Production source and live page.

## 2026-10-16: article journey hierarchy release
Applied only the two reviewed UI files on current main, preserving newer analytics and content. 51 tests, typecheck and build passed. No real form submitted.

Production verification passed for 98b82a0 on 2026-10-16: exact Vercel source/READY/domain verified, live mobile/desktop layout and CTA destination inspected. Screenshot ../../outputs/journey-live-mobile.png. No form sent.

## 2026-10-20: projects heading spacing correction

- Confirmed the `/projects` route uses `listingTitles['/projects'] = 'Our work.'` and found the shared Hero JSX had omitted the text node space before the final emphasized word. Replaced only that renderer expression, preserving the title, two-line layout and unrelated headings.
- `npm run build:verified` passed with 70 pages, 741 photo instances, 506 unique photos and zero missing licenses. The owned local preview rendered `/projects` at 1440x900 and 390x844 with accessible H1 `Our work.`, no overflow and no console messages. Origin refresh failed because `github.com` DNS was unavailable. No commit, push, PR or production action yet.

## 2026-10-20: local release guard correction
- Added dependency-free release status, strict post-merge check, verification receipt, and deployment identity validator. No merge, push, deploy, production, credential, or permission action was performed. The current dirty worktree and untracked permission smoke proof remain intentionally unreleasable.
- Final independent validation on 2026-10-20: npm test passed 65 tests with 0 failures, including 13 release guard tests. A disposable real Git checkout exercised the actual Windows npm build runner, success receipt, follow-up check and receipt invalidation after a source edit. Its build was a fixture, not the application production build. Direct release:status identified the actual worktree and SHA ec48b54e1b53477b756a0bf388e4b5fc9c84cc6b; check at that SHA exited 1 for uncommitted/untracked source. git diff --check passed. Full application build, remote/main release validation and live production checks remain pending. No commit, push or deployment.
- PR preparation: installed worktree-local dependencies from the lockfile after the existing verifier could not resolve its hardcoded local Next binary. Full build:verified then passed at the initial PR candidate, with 70 routes checked and no missing image licenses. Review also found that fixed port3137 could accept another process. The verifier now resolves Next from the installed package, starts its own loopback server on port0, waits for that child's Ready/address output and checks its liveness throughout route validation. Cleanup only targets the owned child. Three focused tests passed, including an occupied port with an unrelated healthy server. Final amended candidate gets full verification separately; production remains unchanged.

## 2026-10-16: measured performance work
Local production build on3157 measured with real Lighthouse13.5 mobile and desktop. Reports ../../outputs/fulham-performance-*.json. Mobile86 to91 under same local configuration. No tools disabled, no images removed or reduced in dimensions. Full51 tests, build, image-license and article validators passed. No real enquiry sent. Global CSS and AVIF changes need live/provider performance confirmation before claiming a Production improvement.

Second performance pass: tested and rejected global CSS inlining based on worse measured performance and larger document. Adopted explicit high-priority responsive image preload, as implemented by the installed Next image component. Local Lighthouse report ../../outputs/fulham-performance-preload.json:93 vs91 previous iteration, LCP3.2s. Separate repeat report saved. No tracking removed; no push or deployment.

User authorised production release of the reviewed performance changes on 2026-10-16. Final mobile repeat92 and93, LCP3.2s; desktop100 was measured before the final hero preload adjustment. No live score claim until measured.

Release complete: exact Vercel SHA/READY/alias verified for8fda09a. Live Lighthouse95, report ../../outputs/fulham-performance-live.json. Mobile browser and image/header checks passed. No real form submitted. No claim of100 mobile or field INP verification.

## 2026-10-21: local plywood/MFC article

- Added the approved journal article at `/post/plywood-vs-mfc-kitchen-carcasses`, topic metadata, two related-reading choices, proof/service/consultation journey and focused tests. Kept the £40,000 hook, marking it illustrative rather than a verified quote. Removed unsupported performance, price-saving and delivery assertions from the supplied draft.
- `npm run build:verified` completed successfully: 70 tests, TypeScript/build, 71 route checks, 745 photo instances, 506 unique photos and zero missing licenses. The focused test run, typecheck and `git diff --check` passed. Read-only code review found no concrete issue.
- On this worktree's local build at `http://localhost:4176`, the article rendered its title, canonical, metadata, schemas, hero, links and related cards. The mobile 375x812 article and Materials journal filter had no horizontal overflow; Materials showed six stories including the new card. Hero loaded on a settled browser check. Local Speed Insights script requests yielded 404/MIME console errors, not an observed article rendering failure.
- An initial port 4175 inspection returned 404 because its owned process runs from the original checkout. No commit, push, production deployment, live check, external rich-results validation or enquiry submission was performed at this point.

User requested remaining evidence pushed. Archived reports, logs and screenshots under docs/evidence/2026-10-16-performance. Redacted diagnostic credential-like patterns from repository copies; original local files preserved. Documentation push may trigger Vercel; application code unchanged.
# 2026-10-23: NURA batch audit corrections

- Implemented runtime sitemap tracing, deterministic batch overlays, dated Article checks for every article, exact sitemap URL membership and Planning category checks.
- Preserved author assignments and legacy first-publication evidence; removed obsolete review attribution from replacement copy. Removed duplicated hero imagery and generic rights captions without changing image rights approval.
- Six focused regressions passed. Full local verification runs 76 tests, 120 route checks and the packaged sitemap trace check. Release and live checks are reported separately; local success is not production evidence.

