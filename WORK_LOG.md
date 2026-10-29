# NURA Work Log

- 2026-10-29: Owner requested final hero cleanup. Removed standalone location strip and its CSS, moved approved London/Dubai copy into existing Nura introduction. Selected photo, concise overlay H1/tagline/free-consultation CTA and independent calculator preserved. Browser visual review remains pending.

- 2026-10-29: Owner approved concise hero: retained service H1, Designed around you, and Request a free consultation. Removed hero eyebrow/trust repetition, moved London/Dubai description immediately below hero and restored mobile image overlay with gradient. Preview review required; browser visual checks unavailable.

- 2026-10-29: Owner-selected golden kitchen homepage photograph prepared on an isolated preview branch rebased onto 426a419, retaining current homepage SEO and accessibility changes. Optimized WebP variants at 480/640/1080px, aligned preload/social/licensing, full-width uncropped mobile image with copy below. No production release authorized. Desktop/mobile visual review remains pending; no browser tool in this session.

- 2026-10-29: Accessibility request addresses the two owner-reported audit issues. Scoped Journal label color avoids inherited alpha; social footer icons now use empty alt with existing aria-label and visible link text preserved. Added source contrast and accessible-name regression tests.

- 2026-10-29: User reported oversized/crowded service-led hero. Root cause: legacy slogan CSS retained 7.3vw desktop / 16vw mobile heading sizing with sub-1 line-height. Scoped hero-service CSS reduces scale, sets balanced wrapping and line-height above 1, and separates unchanged supporting text into block spans. Existing SEO/schema files unchanged.

- 2026-10-29: Homepage SEO request traced through app/route.ts and existing overlays. Four regression tests reproduced metadata, heading and schema issues; implementation adds shared metadata and retains existing journeys. Updated the planning-links test loader for the new dependency without weakening its assertions. Pull-request review and live/browser validation remain separate. See docs/evidence/homepage-seo-2026-10-29.md.
- Verification for the homepage SEO branch: 136 tests, production build/TypeScript, 205 route SEO checks and all build:verified runtime/licensing/journey checks passed locally. Built homepage metadata/schema inspected. Browser and production checks remain pending.

- 2026-10-29: Owner authorised local homepage calculator teaser immediately after hero and before services. Scoped transform and existing homepage planning stylesheet used; gold CTA to calculator, no imagery changes. TypeScript and desktop/mobile visual checks passed; no overflow, section order and destination verified. Not committed/pushed/deployed.

- 2026-10-29: Owner authorised publication of calculator UX iteration, country flags and editorial links. Pre-publication132tests/fullbuild/205SEO routes passed on final source; dedicated regression tests preserve editable/empty briefs and unrelated-page opening. Hero image unchanged. Production action and exact release evidence recorded privately in ../kitchen-calculator-run/ux-release-result.json. Paused article queues unchanged.

- 2026-10-29: Owner authorised local calculator UX upgrades except imagery. Three steps, mobile budget bar, explicit brief-only layout, retained selections and editable consultation summary implemented; guide/FAQ moved before research.132tests/fullbuild/205SEO routes/licensing passed. Browser desktop/mobile and no-submit form flow verified, deliberate empty edits retained. Hero asset unchanged. No commit, push or new deployment. Evidence ../kitchen-calculator-run/ux-upgrade-report.json.

- 2026-10-29: Owner authorised calculator production release. Removed local route guard/draft label, added environment-aware robots, representative social image, sitemap and footer discovery. Six estimator tests and independent source review passed; pricing remains a disclosed benchmark model with unit scaling, gross VAT uncertainty range and a7400planning floor. Owner-confirmed migrated4.9/44rating provenance recorded privately. Exact release evidence in ../kitchen-calculator-run/. Earlier local-only notes are historical.

- 2026-10-29: Bespoke cabinet tier now scales by unit count from disclosed assumed12unit reference. All displayed ranges use standard20percent gross VAT uncertainty envelope, covering unconfirmed source net/gross interpretations instead of asserting tax confirmation. Five focused tests and build passed; browser8/16unit cabinet ranges8000-20000 and16000-40000 verified. Local only; calibration/source tax confirmation pending. Evidence ../kitchen-calculator-run/scaling-vat-review.json.

- 2026-10-29: Owner requested click-only estimator. Replaced quote-entry UI with selectable size, layout, cabinet tier, worktop, appliance, fitting and trade allowances; preserved linked global research. UK component ranges and model assumptions explicit. Four focused tests, TypeScript and full build passed; desktop interaction inspected. Local-only prototype; unreconciled VAT and uncalibrated scaling remain release blockers. Evidence ../kitchen-calculator-run/click-model-review.json. No push/deployment.

- 2026-10-29: Local calculator: verified 1250.50 + 249.50 = 1500.00 and 500 allowance difference; invalid/mixed VAT suppress comparison; confirmed reset clears figures. Fixed invalid-budget export and reset focus after independent review. Scoped floating CTA suppression over worksheet. Private report ../kitchen-calculator-run/implementation-report.json.

- 2026-10-29: Prepared authorised Chelsea public release from fresh remote7781acd, retaining that commit. Added route to exact SEO checker paths, corrected mobile min-content wrapping and hid floating tab while Chelsea consultation area is visible. Reviewed1440desktop/390mobile hero, visit photo and FAQ; full119test build/204SEO routes passed. Vercel remains npm run build; local verification remains build:verified. No Article date or RSS entry added for this service-area landing. Release action evidence retained outside Git.

- 2026-10-29: Applied owner-authorised Chelsea rewrite v2. OmniRoute draft request failed502; primary Codex drafted and separate Codex reviewed exact pageSHA7f7a01ecf561f981a64bb2174c4eea03fbd3f97c3553c7afeb807b941ec72fef. New desktop copy/visit block inspected before final contain crop; full build119tests/203routes passed. Supported browser reload then denied on internal data:error target after server restart, stopped dependent browser work. HTTP200, oneH1, canonical, noindex, OG/Twitter alignment and ten internal links verified. Final mobile visual remains pending, no push.

- 2026-10-29: Implemented local-only Chelsea draft with documented Elm Park Road references, service links, practical brief/process/FAQ and consultation anchor. Corrected Two homes to Two projects after independent source review. Final build119tests/203routes passed, production-mode route404, development route200, oneH1, correct canonical, noindex and ten internal link targets200. No publication; private evidence ../chelsea-local-run/.

- 2026-10-27: New oven comparison candidate, actual cooking scenario and model-specific planning checks.

- 2026-10-27: New changing-paper noticeboard tip, useful ordinary scenario, no installation or organisation guarantee.

- 2026-10-26: New fridge-freezer split guide separates actual chilled/frozen compartment data, mixed household storage needs and integrated front compatibility. Documented Bosch example only, no appliance recommendation or performance promise. Existing source preserved.

- 2026-10-26: New shelf-bracket appearance tip considers the support outline alongside retained furniture, with complete-proposal differences and supplier suitability kept explicit. Existing content preserved.

- 2026-10-26: New UK dishwasher integration guide separates closed-front appearance, documented control information and exact furniture-front compatibility. Generic concepts and hypothetical brief, no appliance performance or supply promise. Existing source preserved.

- 2026-10-26: New round-table cloth shape tip compares round hems and square corner positions beside retained chairs, with actual product dimensions and conditional kitchen discussion. Existing content preserved.

- 2026-10-26: New Shaker versus slab guide distinguishes framed appearance from construction and opening, then compares actual shallow-drawer, cupboard and tall-front proposals. Product-specific PWS counterexamples only, no Nura range or visual-performance promise. Existing source preserved.

- 2026-10-26: Newdiningmirror tip focussesdesiredreflection andordinarymeal use. No universalheight/light orNura mirrorserviceclaim. Existingcontentpreserved.

- 2026-10-26: New quartz-joint article connects proposed location with visible pattern transition and a hypothetical consumerbrief. Scopedmanufacturerfacts, no universaljointdimension or invisiblepromise. Previouscontentpreserved.

- 2026-10-26: B2B item13 targets a bounded MD021 refresh rather than a duplicate joinery-design-changes URL. Revision D example separates receipt from an actual review response and instruction, preserving the earlier issue and existing tender link. First publication2025-08-13 is historical date-only and remains unchanged; actual refresh READY modification correction and all full gates remain mandatory. No new image or Nura service claim.

- 2026-10-26: New curtain-heading decor tip compares narrow pencil gathers and double-pinch groups beside kitchen-dining cabinetry. Supplier-supported definitions, a hypothetical preference and exact-reference record, with one original generic paired concept. No Nura curtain supply or fitting claim. Previous content preserved.

- 2026-10-26: New dining bench versus chairs guide compares two actual-furniture proposals for one household, including taking a place and one diner leaving while another stays. Named manufacturer matching-pair example only; generic simplified visual is not a fit, capacity or access test. Existing source preserved.

- 2026-10-26: New bread-bin styling tip separates the body profile from the entire above-top composition, with model-specific canister provision and hypothetical clear-top preference. Original generic paired concept is not a product/fit/load test. Existing source preserved.

- 2026-10-26: New manual wall-door guide compares the complete opening, retrieval, return and closing task for the actual user and fitting, distinct from powered storage or appliance operation. Product-specific movement and variable-stop limits, no universal clearance or hardware service promise. Existing articles preserved.

- 2026-10-26: New decor tip distinguishes desired visible object detail from colour when choosing clear or particular reeded cabinet glass. Product-specific primary example and pane-purpose record, not a physical sample trial or universal concealment promise. Existing styling advice and other content preserved.

- 2026-10-26: New fridge attachment guide separates fixed and sliding systems, changing an existing appliance mechanism and specifying a replacement. Model/front/housing record and original generic cabinet concept do not establish compatibility or an installation service. Existing content preserved.

- 2026-10-26: New practical decor tip compares actual table top and visible base with cabinetry and retained chairs, preserving physical-fit questions for the supplier. Original furniture concept is not a measured product or Nura project. Existing content preserved.

- 2026-10-26: New oven-height guide separates appliance size from mounting position, labels the height endpoint above finished floor and connects model, door, users and landing surface. No universal mounting height or installation promise. Existing content preserved.

- 2026-10-26: New wallpaper tip separates motif scale from placement at window/cabinet boundaries, with a preferred crop record and manufacturer sample/match limits. Original pattern visual is not a measured product or hanging specification. Existing content preserved.

- 2026-10-26: New sink-mounting comparison distinguishes the visible junction from exact sink/worktop approval, with product-qualified primary sources and a practical drawing record. Original paired visual is not a documented project or installation specification. Existing content preserved.

- 2026-10-26: New glass-cabinet styling tip considers closed-door frame and shelf relationships with actual contents, then separately checks access. Original concept image is not a documented project or tested specification. Existing articles preserved.

- 2026-10-26: Tap-reach article separates horizontal projection, outlet height and movement, using primary manufacturer evidence and a coordinated sink brief. Original concept figure is not to scale and does not claim water-flow or installation testing.

- 2026-10-25: Wall-tile finish tip compares specific reflected light, surface relief and product-specific care. Original credited concept asset and private research evidence retained; no measured experiment or built project claimed.

- 2026-10-25: Sink-drainer article prepared around occupied, cleared and stored arrangements, with one original comparison image and a three-option HTML table. Actual Google evidence, first-three media limitations and rejected delegated claims retained privately. Full QC/release and monitoring evidence remain separate.

- 2026-10-25: Utensil-holder practical tip prepared around filled tool outline, removal space and nearby drawer choices. One original credited image and actual Google evidence retained privately; release and monitoring checks remain separate.

- 2026-10-25: Filler-panel article prepared with location-purpose-access notes and one original credited image. First-three competitor media limitations and rejected delegated dimensions retained privately. Final release and monitoring evidence remain separate.

- 2026-10-25: Plate-display practical tip prepared around daily access, a removal-view sketch and cabinet brief. One original credited asset, actual Google comparisons and rejected delegated claims retained privately; release and monitoring evidence remain separate.

- 2026-10-25: Kitchen-plinth height guide prepared around finished-floor datum, separate supports/board and system-specific appliance requirements. Two original credited assets, primary evidence and rejected draft/PDCA retained privately; exact-source release and monitoring required.

- 2026-10-25: Placemat-colour tip prepared with a controlled exposed-border comparison, one original credited asset and retained research/PDCA history. Preview, exact-source release and monitoring evidence recorded privately.

- 2026-10-25: Splashback-height research used actual Google GB/English observations and a fourth-source replacement for unloaded third-result media. Rejected unsupported delegated draft claims; retained original useful wall-brief method.

- 2026-10-25: resumed the same dining-chair candidate after owner-confirmed browser access restoration. Verified successful navigation to missing competitors, retained prior denied/duplicate captures, and rejected unsupported delegated sample-stock and visibility claims. Added a practical comparison worksheet and topic-specific kitchen brief. Preview identified floating contact obstruction on mobile; reused the existing inline article mode for this route only. Full release results are recorded separately in private chair-run evidence.

- 2026-10-24: executed seven source-fingerprinted contact-panel PDCA cycles and combined browser checks. OmniRoute suggestions were reviewed; rejected claims of universal48px standards, assumed close controls, unnecessary telemetry/flags and unperformed cross-browser tests. Checked320x568,390x844,1440x900; phone URI, keyboard modal open/Escape/focus return, footer hiding, input-focus suppression and dishwasher inline exception. Consent-settings click on local preview did not open the consent panel, so consent interaction remains unverified separately from its preserved CSS rule. No enquiry or call submitted. Final release evidence remains in task outputs.

- 2026-10-24: refined floating actions into one compact ivory panel with dark consultation button and secondary Fulham call row. Preserved telephone, dialog, consent/footer hiding and inline exceptions. Mobile/desktop and exact-source release evidence are in the task report; no conversion claim.

- 2026-10-24 owner refinement: moved the Fulham call option beneath the floating consultation control. Restored paired controls on the three project stories; homepage retains its existing dedicated contact flow. Article-specific inline controls remain inline. Both actions hide beside visible footer/contact content and while consent is open. Full release and responsive checks apply.

- 2026-10-24: owner requested "Call our Fulham showroom" in the existing shared call CTA. Changed this label only, preserving the verified number, link and styles; existing full release gates apply.

## 2026-10-24: direct showroom contact
- Refreshed clean checkout to current main a6f7929, preserving intervening Journal publications. Checked live Nura London phone and deVOL contact page. OmniRoute's first response was incomplete; a bounded retry completed. Used explicit showroom identity and number, accessible focus styling and a wrapping 44px-minimum call link.
- No actual call or enquiry is submitted during validation. Existing primary CTA and content remain intact; full release checks follow for the final source.

## 2026-10-24: owner queue, London kitchen budget
- Resumed the same cost candidate after the owner reported Trusted configuration corrected. Normal scoped implementation succeeded; no agent security-setting changes, timer reset or duplicate candidate.
- Retained actual Google/Images and five-source research, rejected unsupported delegated claims, and implemented the evidence-bounded private draft. Full quality and exact-source release evidence stays in the workspace cost-run reports.

## 2026-10-24: owner-confirmed project mapping
- Owner confirmed Elm Park Road 78 and Westover Road 44. Added the documented Elm furniture-order requirement for flat-packed tall units due to site restrictions, without inventing the restriction or claiming an installation outcome. Preserved public materials, dates, imagery and all other records.
- Tansley release c969776 passed exact-source verification; Vercel production READY and canonical alias confirmed. Westover joinery brief remains unverified separately from its kitchen. Historical worktop-order discrepancy is not a basis for changing the final public specification.

## 2026-10-24: evidence-led project brief follow-up
- Searched local sources, Drive and scoped Dropbox project/marketing folders. Read the original early Tansley request and accompanying plan after metadata checks; extracted functional requirements only. A generic maintenance template was rejected because its job name did not establish a Tansley-specific brief.
- Added an explicitly initial-brief section to the existing Tansley record. Preserved titles, dates, assets and all other project records. Source checks separate original requests from completed fittings; private contact/financial information stays excluded.
- Elm Park includes multiple possible project identities and differing worktop specifications. Westover kitchen documents do not yet establish the joinery brief. Asked the owner for the minimum identity mapping while continuing the independently supported Tansley work. Exact-source release gates and live checks remain required.

## 2026-10-24: project stories inspired by international benchmarks
- Started with the three featured homepage projects. Reviewed canonical source and the separate kitchen/joinery Westover records. OmniRoute drafting returned HTTP502; Codex wrote and checked the copy against existing summaries/specifications.
- Added structured context, material decisions and relevant future-project inputs without attributing an undocumented brief, constraint or outcome to the original homeowner. Kept historical identities, images and dates; two focused preservation/identity tests added.
- CUA preview found a failed CRLF-sensitive script edit leaving the floating trigger active; applied an explicit three-route correction and verified its absence. Desktop/mobile story and CTA checks and full release gates follow; task output retains actual outcomes.

## 2026-10-24: pendant finish editorial
- Read actual Google first organic and matching-intent result, five relevant pages and all content sources for overlap. Rejected delegated unsupported finish claims and false owner attribution; wrote a bounded practical tip.
- Desktop and mobile preview inspected hero, both instructional illustrations, complete table and CTA. Full initial build passed 103 tests, 140 routes and image licensing; final release evidence stays source-bound in the workspace.

## 2026-10-24: approved homepage improvements
- Plan: address duplicate portfolio actions, late services/project evidence, competing consultation paths and weak showroom navigation from the recorded homepage audit.
- Do: scoped HTML presentation transform, early services/project cards, factual project summaries, showroom links and early-stage enquiry copy. No snapshot, assets, submissions, credentials or production settings replaced.
- Check: three focused regression checks pass; CUA desktop1440/mobile390 preview found and resolved floating-button text overlap by using contextual homepage consultation links. Turbopack could not resolve the external dependency junction; existing webpack dev/build path used instead.
- Act: retain the clearer route and measure real consultation/qualified-lead behaviour after release. Full final-source and exact-SHA/live gates remain required; final workspace output contains actual release results.

## 2026-10-23: Journal hero link overlap

- Reproduced the feature link extending below the fixed-height hero at 1920x900, overlapping the next navigation section. Category destinations themselves remain the existing Journal filter routes.
- Replaced the fixed hero height with a preferred minimum height and natural content growth, preserving mobile overrides and all link destinations. Live boundary and click checks follow deployment.

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



## 2026-10-23: publish the reviewed guarantee proposal

- User authorised publication of the local guarantee presentation. Added the homepage trust line, two service blocks, FAQ, shared footer link and public /guarantee proposal. Proposed coverage is visibly identified; final installation, labour, dates, transfer and market terms are not invented. The proposal remains noindex and outside the sitemap. Existing articles and authors are preserved.
- Release validation and live deployment identity are recorded by this task after the commit. No claim that unresolved terms are final.


## 2026-10-23: owner-confirmed cabinetry guarantee

- Owner confirmed a definite 10-year cabinetry guarantee included in the customer contract. Replaced proposal language on /guarantee, homepage and service blocks; added clear coverage and real email/phone support. Costs and local installation responsibilities are recorded in project contracts without invented free services or turnaround promises.
- Prepared locally; existing noindex and sitemap status retained. No publication performed for this request. Validation is reported by the current task.


## 2026-10-23: first hourly Journal article

- User authorised immediate production publication of one new English Journal article as a sample for the hourly schedule. Added `/post/test-kitchen-colour-at-home`, a focused physical sample comparison routine, with existing licensed imagery and material/consultation links. Existing article records and publication history preserved.
- Prepared from clean main d310bda28a4c29497fb39d2a0122db8c0baefcb0. Final build, exact deployment identity and live desktop/mobile verification are recorded separately by the current task; preparation alone does not prove publication.


## 2026-10-23: colour article audit improvements

- Added a reusable three-sample observation table, the documented Ancona palette and its existing owned project image, plus a contextual bespoke-kitchen guide link to `/post/test-kitchen-colour-at-home`. Title, meta description, author, public path and first-publication date remain unchanged.
- Ancona is explicitly a finished-palette illustration, not evidence of a sample testing process. No verified same-sample daylight/evening photography was found. Those genuine process photographs remain pending; third-party needs-review sample images were not reused. Exact release and live verification evidence is saved by the current task outside the source checkout.


## 2026-10-23: approved Nura colour concept images

- User authorised publishing both generated NURA-watermarked illustrations in the colour-testing article. Material palette follows the palette section; daylight/evening comparison follows the lighting section. Captions identify AI-generated illustrative content without claiming actual sample testing or a real project.
- Optimised WebP assets retain the full 3:2 image, watermark and disclosure through a scoped concept-image class. Existing photographs, title, metadata, authorship and publication date remain intact. Release and live checks are recorded outside the source checkout.


## 2026-10-23: owner-requested illustration credit

- Removed the public AI-generated wording from the two colour-article image captions and alt text at the owner's request. Retained the concept-illustration qualification and limitations on project/testing evidence. Added visible Nura Interiors credit and a bounded licensing-page section covering the two illustrations. Existing ImageObject creator, credit, copyright and permission links already identify Nura Interiors.
- Generated provenance remains in the task records. Source images and watermarks are unchanged. Exact release and live checks are recorded outside this checkout.


## 2026-10-23: handle sample article

- Prepared /post/before-you-order-kitchen-handles-try-the-grip with practical comfort/fit/care checks, three original NURA concept images, contextual links, manufacturer reference and documented Ancona palette. No numerical fitting rules or invented project/testing evidence.
- Actual Google search displayed Fulham, London based on the account places; personalised results recorded privately. Existing Blum/HiGold article concerns hinges/runners and mechanisms, while this tip concerns external handles. Owner-selected hero is an independent design informed by broad composition principles of the first organic Google Images result, not a copied/re-watermarked image.
- QC, preview, exact-SHA and live release evidence is recorded outside this source checkout.


## 2026-10-23: handle article metadata refresh

- Owner-approved SEO title with 3 Pro Checks and matching description. Existing H1, URL, first-publication date and hero preserved. Shared renderer supplies OG/Twitter. Future Google competitor-title research rule added to canonical AGENTS.
- Release and live validation evidence recorded separately by this task.


## 2026-10-23: colour article title refresh

- Owner requested matching number/Pro title treatment for the colour article. H1, SEO title and shared OG/Twitter use four actual checks already in the article: finish, palette, lighting and approval record. Description aligned; path, dates, images, authorship and body preserved. Includes previously owner-approved workflow documentation changes.
- Release/live evidence recorded outside checkout by this task.

- Superseding clarification: rejected the formulaic Pro draft before publication. Actual Google query test kitchen colours at home, unpersonalised UK/Fulham IP, first organic Howdens Kitchen Colour Ideas; other visible patterns include Dulux numbered schemes and Tailored Kitchens how-to framing. New title focuses on how-to plus four real sample checks, not broad colour inspiration or a mandatory Pro claim.


## 2026-10-23: six-week kitchen title correction

- Owner requested title refinement at /post/bespoke-kitchen-ready-in-six-weeks. Traced public source through nura-50 loader to Markdown; synchronised manifest title/metadata. Actual Google query bespoke kitchen lead time, UK/Fulham IP, not personalised: first organic Higham how-long question, inspected page. New title uses conditional6-week question and five existing checklist sections; description avoids guaranteed delivery. Body, dates, authorship, images and URL preserved. Release evidence outside checkout.


## 2026-10-23: drawer organisation article

- Prepared /post/kitchen-drawer-organisation-before-you-buy with5 practical pre-purchase checks, record table,3 original NURA concept illustrations and owner-assigned Joanne H byline. No human review claimed. Source-backed manufacturer context; no project/product-test or universal sizing claim.
- Google actual UK/Fulham IP results, first organic IKEA category and5 manufacturer/retailer pages researched. Existing small-kitchen/hardware/plinth topics are broader or different. Omni draft rejected for visual-only measurement and invalid paper durability inference; corrected in PDCA.
- Research, QC, preview and exact-SHA live release evidence recorded outside checkout.


## 2026-10-23: drawer illustration wording

- Owner asked to remove public AI-production wording. Replaced it in drawer article body, captions and alt with descriptive illustration language and Nura credit. Technical illustration limits and private provenance retained. Initial855515c deployment was READY but final verification/reporting was interrupted; final revised release evidence recorded by current task.


## 2026-10-23: drawer Article datetime warnings

- Official Google liveURL report szjyCD49Ygv-Bcn-uSZSbQ found9valid items and4optional date/timezone warnings. Added actual initial publication READY2026-10-23T22:05:24.067Z and latest content deployment READY2026-10-23T22:09:14.182Z to the existing record. Original calendar dates, title, images and byline preserved. No invented midnight timestamp; this schema-only correction is logged separately.
- Owner requires official live RichResults test after every future publication and corrective revalidation. Final release/external retest evidence recorded by current task.


## 2026-10-23: drawer Discover preview

- Owner authorised current-article Discover gap fixes. Added representative1536x864 preview with full drawer details and original marks preserved; original hero remains unchanged. Explicit per-article large preview opt-in respects production/preproduction indexing policy. OG dimensions now use optional real asset dimensions with legacy defaults; opted-in Article image matches social preview.
- First-publication date, prose, byline and existing images preserved. Current official rules checked; no claim of actual GSC indexing/Discover selection or measured fieldCWV. Exact release and official retest evidence outside source checkout.


## Drawer Discover performance correction

- Actual Google mobile PageSpeed report aqo059j4pu found author avatar 800x800 PNG1093KiB displayed40x40. Created80x80 WebP thumbnail from the same portrait and preserved original source; no person/content/date changes. Initial lab performance74,LCP5.3s,CLS0; field data unavailable. Search Console indexing request hit daily quota; retry tomorrow.


## Scheduled Journal: kitchen shelf styling

- New practical decor tip uses owner rotation Nura Interiors. Actual Google UK search footer Fulham London and first Pinterest board reviewed; original value is a four-step daily-use/access trial, not a gallery or fixed spacing rule. Three original NURA-watermarked1536x864 illustrations with private provenance and representative Discover preview. OmniRoute draft arbitrary20cm claim rejected in PDCA and replaced; no invented project/testing.
- First full check caught missing explicit article journey, fixed with existing valid guide/service/consultation mapping.81tests/124routes/images passed afterward. Final mobile/desktop and source/deployment/external Google evidence are persisted in workspace register. Real index/CWV/analytics remain pending.
## 2026-10-24: Google News footer link

- Owner authorised Google News icon and Nura on Google News link beside existing footer social links. Uses the exact supplied domain-search URL, new tab with noopener noreferrer, decorative original Google News icon sourced from https://www.gstatic.com/gnews/logo/google_news_192.png. No endorsement claim. Social row wraps on narrow screens.
- Validation and exact-source release evidence are recorded in the footer task workspace.

- Shelf publication date reconciled to actual first production READY 2026-10-23T23:07:26.832Z (dpl_BXFBjd9HVTicHQ2uBSZ8DiP222VP, source3a8cec4), replacing provisional drafting timestamp. Same calendar date, author/prose unchanged; corrective validation is logged separately.

## 2026-10-24: owner-assigned article byline
Owner requested Joanne H for every article. Implemented shared local/CMS/preview article normalization and regression coverage for all loaded articles, immutability, date preservation and unrelated content. Publication and live checks are recorded in the current task workspace.


## Scheduled Journal bin layout guide,2026-10-24
- New original five-check planning article, Joanne H owner-assigned byline, no personalexperienceclaim. Actual Google firstRedditresult read; anecdotal comments not reused as evidence. Failed OmniRoute fabrication rejected and redflag-reviewed via claude-smart; Codex rewrite uses practical checks and product-specific source.3original NURA-watermarked images and Discoverlargepreview. Separate research/PDCA/provenance and release evidence in workspace register. First-publication timestamp reconciled to first READY when available.

- Bin article publication date reconciled to actual first production READY 2026-10-24T00:08:07.395Z (dpl_7EowAzoESzDZRRun4gpqgqanQx6M, source389dd75), replacing provisional drafting timestamp. Same calendar date, author/prose unchanged; corrective validation is logged separately.


## Scheduled worktop tray styling tip,2026-10-24
- Joanne H owner-assigned byline; four practical checks with paperfootprint, everydaycontents and removal. Actual first Google IvyGrey curatedshop page read; original addedvalue tests usable prep footprint instead of selling decor. OmniRoute bounded draft validated/edited for unsupported CTA promise and guaranteedcleaning benefit.3original watermarked illustrations with private provenance;largepreview and fullreleaseQA required. Actual first READY timestamp will replace provisional source timestamp when known.

- Tray article first production READY 2026-10-24T01:04:44.504Z, deployment dpl_Cwdgu53yD8RUj5cGtC3ZvzgSfnpH, source66e86d3. Reconcile provisional date to this real publication event; prose, author and assets unchanged.


## Corner storage planning article,2026-10-24
- Original five-check guide with Joanne H byline,3original illustrations, product-version source and practical retrieval record. Actual Google first shopping category read. OmniRoute draft rejected for invented service/hardware and unsafe contradictory motion advice; bounded stronger-route review used, Codex rewrite removes unsupported claims. Private research/PDCA in workspace register. Full source/QC/preview/release verification required.

- Corner article first production READY 2026-10-24T02:12:46.482Z, dpl_AA5Ftk5e1cVyHrgmYBwdY6ddDwPZ source5f25146. Publication timestamp reconciled to actual event; author/prose/assets unchanged, full corrected source gates repeated.


## Kitchen wall art frame-size tip,2026-10-24
- Original practical frame-outline comparison, Joanne H,3original illustrations and CCI paper-care source. Actual first Google EastEndPrints category read before drafting. Delegated draft invalid dimensions/clearance acceptance and offers rejected; Codex rewrite validated. Full checks and private PDCA/source evidence in workspace register.

- Wallart tip first production READY 2026-10-24T03:11:19.245Z, dpl_GoqvYCsXoumq46Ja5vfSj5JqWJ5r source12cb824. Publication timestamp reconciled to actual event; author/prose/assets/layout unchanged. Full corrected source gates repeated.


## Single versus double sink planning article,2026-10-24
- Original own-cookware/routine/drying/model-fit comparison, Joanne H,3original illustrative assets, FrankeUK primarysource. Actual firstGoogle Sinks.co.uk guide read. Delegated fabricateddepth/waste/hygiene/personalexperienceclaims rejected; Codex rewrite validated. PrivatePDCA/research and fullreleaseevidence in workspace register.

- Sink comparison first production READY 2026-10-24T04:16:24.347Z, dpl_BhfrWmBknWUDUFdQQpx7T8CoY8VD source1b103c2. Publication timestamp reconciled to actual event; author/prose/assets/layout unchanged. Full corrected source gates repeated.

## 2026-10-24: Journal chronological order
Added non-mutating date ordering and regression coverage for ISO/calendar dates, ties and invalid dates. Owner authorised production release. Current task records build and live desktop/mobile/filtered-list evidence.


## Kitchen tea towel display tip,2026-10-24
- Original purpose/fold/position guide, Joanne H assigned byline, three original watermarked illustrations. Actual first Google Pinterest board read; original added value is a bounded visual comparison and fitting-requirement record. Delegated unsupported fixing/damage/clearance/ownership claims rejected and rewritten. Private PDCA/research retained. Full source and release validation required.

- Tea towel tip first production READY 2026-10-24T05:18:58.667Z, dpl_21Qa91oT3tbvsbyfRHnF2n9Pg2k6 source115b90f. Publication timestamp reconciled to actual event; author/prose/assets/layout unchanged. Full corrected source gates repeated.

## 2026-10-24: shared editorial execution
- Consolidated per-article asset/check/timing/evidence/READY-record helpers into `journal:workflow`; no public prose, routes, historical dates or release-guard logic changed. Added CUA-only viewport/image-readiness helper and negative regression coverage for stale QC, bad canonical/robots/author, conflicting writers, changed assets, wrong deployment identity and premature screenshots.
- Validated shared route checks against the existing live tea-towel page; image assets were reused. Bounded delegated design suggestions were reviewed; invented author limits/manual review gates were rejected. Full verification and pilot receipts live in task workspace. Production runtime date-store integration and three-article timing comparison remain explicit follow-ups.


## Worktop edge profile article,2026-10-24
- Original front/top sample-view and product-specific brief, Joanne H assigned byline, three original illustrative assets. Actual Google first Gemini guide read; primary EGGER/Caesarstone evidence. Delegated invented constructions/dimensions rejected; Codex rewrite. New title-editor skill used, no forced number/Checks/Before. Shared workflow checks and exact-SHA gates required.

Worktop edge guide first production READY 2026-10-24T06:25:19.125Z (dcc35ae). Required source timestamp correction preserves that first publication; no substantive content change.

Wood-tone decor tip: retained furniture and cabinet palette comparison, actual Google related/PAA intent research, subject-specific consultation preparation. Original illustrations and full release gates required.

Wood tone tip first actual production READY 2026-10-24T07:32:11.230Z; date-only source correction retains this event. Actual Google long-tail/related/PAA research precedes final title selection.

Handleless kitchen article: J-pull, recessed rail and mechanical push opening distinctions, household brief and exact appliance compatibility questions. Three original illustrations; scoped image/CTA rendering; all exact-source release gates retained.

Handleless article owner-requested repair: compared live tea-towel guide. Added concrete open/reach/close record, balanced choice table, worked preference-to-plan example, care and complete-quote/retrofit questions; selected directly relevant next reading. Preserved first-publication date, title, Joanne H and approved artwork. Full affected QA and exact-SHA release required.

Windowsill decor tip: actual Google first organic/related/PAA and image reference inspected; compare silhouettes from sink/doorway, retain view/access and connect to kitchen palette. Assigned Joanne H; three original illustrations and exact-source/full release gates required.

Larder planning article: actual Google purchase/configuration intent, restock inventory and whole-room trade-offs. Unsupported delegated draft rejected; original illustrations and full exact-source gates required.

## 2026-10-24: local Journal RSS and metadata
- Added production Article large-image metadata defaults, shared social/schema image selection without guessed dimensions, XML-safe RSS 2.0 and feed autodiscovery, including the independent homepage handler. Preserved public paths, titles, authors, dates, article prose and assets.
- Updated image assertions to validate ImageObject URLs and expanded the shared editorial fingerprint to include its new metadata helper. Existing release guards remain intact. Delegated proposals were reviewed and corrected for nested content fields, Unicode handling and stable ordering before use.
- Added focused negative tests plus built-server RSS checks in the existing full verifier. Production activation, Search Console submission and official Google validation remain outside this local implementation task; see backlog.
- Final local validation: all 100 application tests and `npm run build:verified` passed; SEO checked 135 routes with zero errors and image licensing checked 86 pages. RSS contains all 82 public article URLs and parses as XML. RSS/sitemap runtime traces each include all 50 Markdown sources. Only measured Fulham social-image dimensions changed in editorial JSON; content, authors and dates otherwise exactly match task-entry HEAD. Browser review covered Larder and Porcelain at desktop/mobile sizes. Source is uncommitted and no push/deployment was performed.
- Owner subsequently authorised publication. Integrate the newer production bar-stool tip before release, preserve its real dates/assets, rerun the full pre-push verifier and post-push exact-SHA release guards, then record fresh authoritative Vercel and live/browser evidence in the task workspace.


Kitchen bar stool colour tip,2026-10-24: original seat/frame/island/dining-view comparison, Joanne H assigned byline,three original credited illustrations. Actual Google intent and first-result research retained. New article alone places the existing enquiry control in reading flow to prevent copy overlap. Full exact-source gates and live evidence are recorded in the task workspace.

Dishwasher placement article,2026-10-24: household plate-route brief, open-door and storage trade-offs, Joanne H assigned byline, three original credited illustrations. Model-specific installer confirmation; no universal dimensions or invented test. Full exact-source gates and actual production verification required.

2026-10-24: Added kitchen splashback grout colour candidate after actual Google first-result/Images and five-page research. Rejected delegated unverified dimensions/observations and rewrote bounded prose. Desktop/mobile table, assets and CTA reviewed; source-bound QC 90.

2026-10-24: Resumed completion-based cadence after the remaining gap. Actual Google first retail result, five competitor pages and primary Cosentino technical guide reviewed. Rejected unsupported delegated recommendations, refined two illustrations and mobile table header, retained original evidence. Full exact-source gates required before and after release.

2026-10-24: Prepared fridge placement article with actual Google/Images research, five source reviews, title diversity and all-source overlap scan. Rejected unsupported delegated installation claims. Reused Journal workflow assets/timers/checks; preserved project-story work and existing public routes.

2026-10-24: Rug colour tip researched from actual first Google organic retail page, six relevant sources and all-source overlap. Rejected unsupported size/cleaning/service claims in delegated draft. Preserved interrupted run timers and owner article queue.


Fruit bowl decor tip,2026-10-24: original empty/usual-serving/near-empty palette record,3original illustrations and Joanne H assigned byline. Actual Google first-result/images and five-source overlap research retained privately. Exact-source QC, full release and live mobile/desktop/official Google validation required; GSC, field CWV and analytics receipt remain pending.


2026-10-24: Small kitchen ideas owner queue item2 prepared as9bounded choice/consequence ideas and2priority shortlist, distinct from existing full bespoke brief. Original illustrations with corrected NURA watermark, assigned Joanne H and exact owner metadata. Full source/release/live/official validation required; GSC, Discover, field CWV and analytics receipt remain pending.


Canister decor tip,2026-10-24: distinct lid-finish/body-colour comparison and own-lid landing rehearsal,3original credited illustrations, Joanne H assigned byline. Actual Google first-result/images,6relevant sources and all-source overlap retained privately. Unsupported delegated care/cost/service/lid-swapping claims rejected. Full source/release/live/official checks required; GSC,Discover,fieldCWV and analytics receipt remain pending.


2026-10-24 fitting-costs owner queue3: seven onsite scope packages, named responsibility/readiness sheet and cabinet-complete versus usable-kitchen distinction. Five actual competitor pages, original finish/handover illustrations and Joanne H assigned byline. Dated UK2026benchmark explicitly notLondon/Nura/2027forecast. Rejected delegated standard-inclusion, curing, timing andservice claims. Fresh3fe0855 direct showroom CTA preserved. Full source/release/live/official gates required; GSC/Discover,fieldCWV andanalyticsreceipt pending.


2026-10-24 kitchen-table centrepiece tip: place settings, seated view and a planned stay-or-move decision, connected to retained dining furniture and cabinetry. Five actual source pages, visible Google first retail result and first Images reference reviewed, three original inspected illustrations, assigned Joanne H byline. Existing fruit-bowl and worktop-tray coverage kept distinct. Full build, responsive preview, source-bound QC and exact-SHA release remain required. GSC/Discover, field CWV and analytics receipt remain pending.


2026-10-24 owner queue4: update existing worktop selection article, preserving URL and 2023 first-publication date. Five-material care/appearance comparison and same-plan fitted quote scope, no2027forecast or universal best ranking. Three original inspected illustrations. Existing porcelain/edge/project pages remain distinct. Full checks and exact-SHA release required; GSC/Discover,fieldCWV and analytics receipt pending.


2026-10-24 owner queue5: new kitchen island dimensions guide, five distinct finished-footprint and occupied-use measurements. Original three inspected terracotta/oak illustrations; existing seating/appliance routes remain separate. Byline Joanne H. No universal clearance approval or invented project. Full preview/build/exact-SHA gates required, followed by actual READY date correction, official Rich Results and lab/field distinction. GSC, Discover and confirmed analytics receipt remain pending.


2026-10-24 kitchen clock tip: actual seated/preparation views and face/frame choice connected to retained dining furniture and cabinetry. Paperproportion is not actualproductlegibility or mountingapproval. Fiveactualrelevantproviderguides, GooglefirstNewgate/ImagesSchoolhouse and current12titles inspected. Three originalinspectedillustrations, JoanneHbyline, no inventedstock/video/service. Full build/responsive/exactSHAreleaseandactualREADYdatecorrectionrequired; GSC/Discover,fieldCWV/INP and analyticsreceiptpending.


2026-10-24 ownerqueue6: new general seven-stage kitchenrenovationtimeline with three household periods and evidence/responsibility record;2027planningyear not futureleadtimeforecast. Narrow supply-programme/firstfix pages retained and linked. Threeoriginalnavy/walnut illustrations,JoanneHbyline. Fullbuild/preview/exactSHA/READYdatecorrection required;GSC/Discover,fieldCWV/analyticsreceiptpending.


2026-10-25 kitchenblindcolourtip: loweredpanelversusraisedvisiblearea,actualsamplelimits andcabinet/retainedfurniturepalette.3originalterracotta/walnutillustrations,JoanneHbyline;nosupplierperformanceorNURAblindserviceclaims. Fullbuild/preview/exactSHA/actualREADYdatesrequired;GSC/Discover,fieldCWVandanalyticsreceiptpending.


2026-10-25 drawers versus cupboards: new object-based cabinet allocation comparison, distinct from drawer inserts and corner mechanisms. Three original burgundy/ash illustrations; Joanne H byline. No universal ratio, dimensions, cost or accessibility promise. Full build, preview, exact-SHA and first READY date correction required; GSC/Discover, field CWV and analytics receipt remain pending.


2026-10-25 tablecloth colour decor tip: choose with retained chairs, cabinetry and plates when a full cloth hides the tabletop; compare runner exposure. Three original illustrations, Joanne H byline, no Nura linen service promise. Full preview/build/exact-SHA/first READY correction required; actual GSC/Discover, field CWV and analytics receipt pending.


2026-10-25 appliance garage: model-specific storage/operating permissions, handling movements, door positions and separately allocated worktop. Dualit toaster storage limitation and Blum pocket construction attributed; no universal clearance, electrical specification or Nura mechanism stock claim. Three original illustrations, Joanne H. Full build/preview/exact-SHA/actual first READY correction required; GSC/Discover, field CWV and analytics receipt pending.


2026-10-25 cookbook display decor tip: separate closed collection from current open-book reading position, covers versus spines and actual remaining counter. Icon book-care guidance attributed, no measured stand/installation or Nura bookstand stock claims. Three original plum/oak illustrations; Joanne H. Full build/preview/exact-SHA/first READY correction required; GSC/Discover, field CWV and analytics receipt pending.


2026-10-25 Peninsula versus island short article: attached-end route versus connected worktop, cabinet junction and dining-facing finish. Hypothetical household trip and3rowcomparison, no universal clearances, structural or trend claims. Three original terracotta/chestnut illustrations; Joanne H. Full build/preview/exact-SHA/first READY correction required; GSC/Discover, field CWV and analytics receipt pending.


2026-10-25 splashback tile direction decor tip: separate orientation from bond, compare the whole wall boundaries with colour held steady. Three original blue/walnut illustrations and Joanne H byline. No universal proportion, installation cost, cleaning or tile stock claims. Full preview/build and exact-SHA release gates required, with first READY date correction. Production evidence and actual completion are tracked in the workspace register; GSC/Discover, field CWV and analytics receipt remain pending.


## 2026-10-25: homepage internal linking
- Added a bounded contextual route from the homepage to three established planning guides and the fitted wardrobe service; clarified the existing London showroom link with Fulham wording. No automatic recent-post feed, new images, tracking changes or article date changes.
- The helper extends the existing journey pipeline without modifying the preserved homepage JSON. Delegated HTML/CSS proposals were inspected; unsupported expertise/value claims and incorrect CSS variable usage were rejected. Scoped styling, keyboard focus, preservation/duplicate checks and a built-server destination verifier accompany the change. Final source/deployment/browser results are retained in task release evidence.
- Local validation: 110 tests passed, production compilation/typecheck passed, and the built-server verifier passed all 158 SEO routes, licensing and all four contextual destinations. The stylesheet assertion was corrected to verify the actual inline performance pipeline. Desktop 1440x900 and mobile 390x844 were visually inspected with no horizontal overflow; keyboard focus and guide/worktop navigation were exercised. Browser screenshot scaling was diagnosed with documented CDP controls and all temporary metric overrides were cleared. Release identity and live results remain separately recorded evidence.

2026-10-25: Owner-authorised kitchen designer article rewrite preserves the original route and2023publication timestamp. Three practical decision areas,4original NURA images and aligned metadata. Updated the image-count check to source/render agreement under the owner variable-image policy; full release and live evidence remain required.

2026-10-25: Authorised sustainability article rewrite preserves its existing route and2024first-publication timestamp. Five practical keep/repair/replace decisions, CMA/FSC/BIID primary references,3purposeful original NURA images and aligned metadata. Preview, full build and exact-SHA live verification remain required; evidence is retained in the workspace sustainability report.

2026-10-25: Authorised /inspiration/lighting optimisation fixes truncated metadata, adds a room-led planning brief and groups the56existing gallery assets by setting/form. All original asset URLs and source publication fields preserved. Descriptive alt/captions follow visual inspection; unsupported REGOLO caption removed from mismatched image. No product stock,photometry or Nura project attribution invented. ExactSHA full build and live evidence retained outside Git.


2026-10-25 cabinets-to-ceiling article: distinguish usable upper storage, closed finishing band and deliberate gap; specific inventory/retrieval and drawing/specification record. Two original ochre/ash concept images selected from explanatory needs after first-three actual Google research, no fixed image quota. Joanne H byline; no universal dimensions, installation guarantees or invented projects. Full QC/build/exact-SHA and actual first READY correction required. GSC/Discover, field metrics and analytics receipt remain pending.


2026-10-25 B2B joinery quote comparison: owner-authorised new article uses an unpriced hypothetical library/wardrobe scope table, four distinct status labels and written clarification steps. Two original NURA-watermarked images, Joanne H byline, project-specific responsibilities. Scoped complete hero/mobile comparison cards and existing inline CTA preserve readability. Existing articles and dates retained; full exact-SHA release/live checks and actual first READY date correction required. Private research, PDCA and monitoring evidence: workspace work/joinery-quotes-run and canonical article register.


2026-10-25 B2B tender package: stable item references, separate document issue register and furniture schedule, worked J03 window-seat finish addendum, and project-specific approval responsibilities. One original NURA-watermarked hero supported by Google Images/top-three content research; accessible HTML cross-check table. Joanne H byline. Exact-source QC, full build, responsive preview, exact-SHA release/live checks and actual first READY timestamp correction required. Private evidence: workspace work/tender-run. GSC/Discover, field performance and analytics remain monitored unknowns.


2026-10-25 B2B value engineering candidate: unpriced hypothetical dining cabinet, retained requirements, alternatives and actual net-price/approval record. Original NURA-watermarked framed/slab comparison hero and accessible HTML table. No blanket material savings, dimensions, invented project or human signoff. Exact-source QC, full build, responsive preview, exact-SHA release/live checks and genuine first READY date correction required. Private workspace evidence: work/value-engineering-run. GSC/Discover, field metrics and analytics receipt remain monitoring follow-ups.


2026-10-25 B2B kitchen drawing review refresh: existing URL and first publication2025-08-13 retained. K07 hypothetical appliance-change example separates appearance, technical review and instruction. Removed unsupported tolerance/signoff/service claims; replaced target images with one original NURA-watermarked drawing/material concept. Shared CLI now reads actual batch parser and fingerprints MD/manifest/loader; optional measured hero metadata added for this Markdown article, older source fields unchanged. Full source-bound QC/build/exact-SHA and live/Rich Results checks required; historical time of day unknown, field/index/Discover/analytics pending. Private evidence work/shop-drawings-run.


2026-10-25 B2B joinery schedule candidate: creates item-led residential scope, differentiates type/instance/count and shared finishes from item-specific internals. Hypothetical J01/J02, no dimensions or universal standards. One original hero and accessible three-column field record, Joanne H. Full QC/PDCA/build/exact-SHA/live/Rich Results required; source-bound private evidence work/schedule-run. Genuine first READY date correction and unknown GSC/field/analytics tracking retained.


2026-10-25 B2B coordination refresh: existing kitchen-trades URL and2026-09-15 first date retained. Project-specific decision/input/record table and hypothetical dishwasher change separate coordination, technical review and instruction. One original credited concept image, no default legal role or savings claims. Full QC/build/responsive/exact-SHA/live and official Rich Results checks required; actual index/Discover/field/analytics evidence remains pending. Private evidence work/coordination-run.


2026-10-25 B2B joinery samples and mock-ups: purpose-specific reference comparison, hypothetical J04/S12 acceptance boundary and explicit remaining decisions. Two original credited concept assets, actual Google research and independent review retained privately in work/samples-run. No physical test, default technical approval, free prototype or documented project claim. Full QC/PDCA/build/exact-SHA/live/Rich Results and genuine first READY timestamp correction required; field/index/Discover/analytics remain pending.


2026-10-26 B2B whole-home joinery supplier guide: compares the same hypothetical kitchen, hall and dressing-room scope under one defined proposal or named separate packages. K-F1/H-F2 example records related timber character without a matching guarantee or technical signoff. One original credited hero, actual Google research and independent reviews kept privately in work/supplier-run. No supplier-count savings, faster completion, contract, all-trade or real-project claims. Full fixed QC/PDCA/build/exact-SHA/live/Rich Results and real first READY date correction required. Field/index/Discover/analytics monitoring remains pending.


2026-10-26 B2B joinery snagging and handover guide: hypothetical J08 hall cabinet separates an unresolved interior finish selection, missing care record and reviewed close-out. One original credited context/detail asset, actual Google evidence and independent reviews retained in workspace work/snag-run. No inspection-service, universal tolerance, legal completion or real-project claim. Full fixed QC, PDCA, build, responsive preview, exact-SHA release/live/Rich Results and genuine first READY date correction required; field/index/Discover/analytics remain pending.


2026-10-26 B2B developer joinery refresh: existing URL and2026-09-30 first date retained. Hypothetical apartment01/02/03 map separates repeated types, mirrored variants and changed room configurations, with sample applicability and specific proposed production scope. Unsupported programme/legal/default responsibility claims removed. One original credited opposite-handing concept replaces two third-party workshop images; private research and independent evidence in work/developer-run. Full fixed QC/PDCA/build/responsive/exact-SHA/live/official validation required; historical time of day unknown, index/field/Discover/analytics pending.


2026-10-26 B2B joinery site-survey guide: hypothetical A06 alcove separates observed conditions, proposed finish references and inaccessible areas, with a three-row status record. One original credited alcove/junction concept, actual Google research and independent evidence retained privately in work/survey-run. No survey-service, tolerance, qualification, actual project or approval guarantee. Full QC/build/responsive/exact-SHA/live/official checks and genuine first READY correction required; field/index/Discover/analytics remain pending.


2026-10-26 B2B joinery delivery-access guide: original hypothetical W04 decision separates installed size, packaged arrival form and unresolved landing turn, with component-to-route table and explicit handover. One original credited room concept, actual Google research and independent evidence retained privately in work/delivery-run. No measured fit, lifting method, delivery-service or approval guarantee. Full QC/build/responsive/exact-SHA/live/official checks and first READY timestamp correction required; field/index/Discover/analytics remain pending.


2026-10-26 B2B service-access guide: hypothetical J12 distinguishes furniture movement, task-specific service access and eventual equipment withdrawal/reinstatement. One original credited room concept with distinct backing opening, accessible three-row decision table, actual Google/Selo research and independent review. No measured technical adequacy, universal size, safety certification or real-project claim. Private evidence service-access-run. Full QC, responsive build/exact-SHA/live/official gates and actual READY timestamp correction required; indexing, field CWV and analytics monitoring remain open.


2026-10-27 B2B stone/joinery junction guide: hypothetical J18 end-panel change distinguishes carcass, front and finished-panel references, stone edge/return intent and separate support/templating responses. One original credited room concept, actual Google ambiguity/expansion and independent evidence in workspace work/stone-interface-run. No dimensions, structural prescription, measured fit or real-project claim. Full QC/responsive/build/exact-SHA/live/official gates and actual first READY correction required. Root Vercel remains npm run build, local build:verified unchanged. Owner routine editorial skip-ci policy added to canonical AGENTS; this required immediate publication uses a real cloud build. Field/index/Discover/analytics monitoring remains pending.


2026-10-27 B2B wall-mounted joinery guide: hypothetical W21 relocation ties actual wall records and concealed-provision coverage to revised cabinet position. One original credited room concept, actual Google leading content/media research and independent source reviews in workspace wall-mounted-run. Rejected draft dimensions, role defaults and unsupported service promises. No universal fixing selection, sizes, loads, measured installation or structural design service claim. Preserve full QC/PDCA/responsive/build/exact-SHA/live/official gates and actual first READY timestamp correction. Index/Discover/field CWV/analytics monitoring remain open.
2026-10-28: Local Journal prototype port from owner HTML. Existing shared header/footer retained with route-scoped shell colours; live content loader, image licensing and collection schema retained. Client search/category/load-more and complete server-rendered story directory. Independent read-only review corrected joinery classification. Final build:verified passed 115 tests, 201 routes, licensing/discovery checks. CUA desktop/mobile inspected, search/filter/load-more tested. Preview http://127.0.0.1:3011/journal. No commit, push or deployment.
2026-10-28: Owner authorised Journal audit fixes. Collapsible Journal contact, shared search/filter URL helper, pagination/reset focus, overlapping topic memberships with five reviewed examples, explicit feature/picks, mobile controls/shared fonts, archive before CTA and active nav implemented. Final build:verified117 tests/201 routes passed. Browser checks and independent reviews recorded in ../journal-upgrade-verification.md. Local only, no commit or publication.
2026-10-28: Owner explicitly approved recovery of upstream workflow commit0a207a3 after its production build failed with missing source. Forward recovery commit6e65570 restores exact preceding READY production source daa9abc, preserving prior performance and security changes. Journal UI changes reapplied without conflict. Preparing full pre-push source-bound validation and production release; no production success claimed yet.
2026-10-28: Original generated Journal kitchen/material hero and shared fixed glass header implemented locally. Header CSS serves React layout and HTML homepage; responsive image keeps full artwork and watermark. Final build:verified117 tests/201 routes/licensing passed. Desktop/mobile and representative header scroll checks recorded in ../journal-hero-header-verification.md. Uncommitted, no push or deployment.
2026-10-29: Owner approved publication of final Journal generated hero and shared fixed header. Final design preserves transparent original header colours over the first hero, switches to neutral glass/dark text after the hero crosses the header, and reverses on return. Journal mobile image starts at top0 and retains full watermark. Local full validation117 tests/201 routes/licensing and browser transition checks passed before release preparation. Existing automation pause preserved.
2026-10-29: Universal compact consultation tab implemented locally, including homepage and formerly inline article/lighting controls. Visible text Talk to NURA uses uppercase brand. Existing page forms and footer/contact visibility suppression retained. Full build:verified117 tests/201 routes passed; CUA homepage modal/Escape/focus, mobile width390 and shared tab on Journal/article/service/London checked without submitting an enquiry. No commit, push or deployment.
2026-10-29: Local shared contact tab now gold on dark CSS backgrounds and green on light backgrounds, sampled beneath its viewport position with one animation-frame update per scroll frame. Source does not analyse photograph pixels. Preserves uppercase NURA, collapsed state, privacy spacing and homepage request-section hiding. Full build:verified117 tests/201 routes passed; browser verified gold Journal hero and green card section. No commit, push or deployment.
2026-10-29: Owner authorised production publication of universal collapsed Talk to NURA tab, homepage request-section hiding and background-adaptive gold/green styling. Preparing exact-source release; existing article pause remains.
2026-10-29: Homepage calculator promotion finalised with existing image, responsive layout and gold destination link; icon removed on owner request. Existing consent logic preserved, privacy control panel compacted and separated from floating actions. Full pre-push build:verified passed: 132 tests, 205 SEO routes, licensing clear. Publication authorised; pending exact source release.
2026-10-29: Services overview implementation passed typecheck, local responsive review and full verified build before production reconciliation. Fresh Vercel observation found production 69445988 on golden-kitchen branch; merged its exact source to preserve live homepage. Repeating full gates for combined source before push.
2026-10-29: Process content transcribed from owner attachment, SEO notes kept outside prose, section separators normalised and internal links made relative. Process enquiry and FAQ reuse floating-tab suppression. Full pre-push verification passed; exact-SHA release and deployment evidence recorded separately in workspace kitchen-calculator-run.
