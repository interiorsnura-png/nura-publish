# NURA Project State

## 2026-10-23: batch publication corrections

- Prepared the sitemap runtime file trace fix and an artifact-level check for the manifest and all 50 article sources.
- The effective loader now resolves the two batch/legacy collisions once, preserves each public author's identity and evidenced historical first-publication date, and includes batch content in CMS fallback.
- Replaced computed staggered batch dates with the confirmed 2026-10-23 batch publication date. Replacement content has an actual update date and does not inherit an earlier technical endorsement.
- Removed duplicate inline heroes and administrative captions, corrected the charity description, and restored Planning filter coverage and exact sitemap URL validation.
- Local regression coverage includes preservation of the existing 26 Joanne H / 24 Nura Interiors mapping. Production activation, exact deployment identity and live browser verification must be checked after the release; task output records that evidence separately.

## Automatic search notifications, 2026-10-12

- Follow-up on 2026-10-13: the old deployment-event cache did not persist IndexNow snapshots, causing repeated 70-URL notifications. Replaced it with a state artifact restored from the previous successful main workflow. Restore failures stop execution; corrupted/foreign states are rejected. Two-run verification follows publication.
- Prepared from current main `fcf77f05b3ea839f6927c9ed095184b2985c6208`, preserving the verified gold favicon release.
- Bing fingerprints now include meaningful JSON-LD and a homepage favicon-content hash. Build script payloads and changing icon query hashes do not cause repeated submissions. Each successful Production event checks out its deployment SHA.
- Google Search Console Sitemaps API code/workflow is prepared with short-lived GitHub OIDC authentication. It submits the live sitemap, not individual ordinary URLs to the restricted Indexing API. No receipt means no success claim.
- Google connection is blocked by the account's Google Cloud MFA requirement. No service account, WIF trust, key or external permission has been created. Until the one-time connection is configured, the workflow reports `NOT_CONFIGURED` and makes no Google request.
- Release validation passed: 46 tests, TypeScript/build, 70 route checks, zero missing image licenses and workflow YAML parsing. Live workflow receipts remain pending until publication. The local Google configuration check accurately reports `NOT_CONFIGURED` with `requestMade:false`.

## Transparent gold favicon release, 2026-10-12

- Prepared on `codex/nura-favicon-release` from current Production/main `f76d59e054c30c5e7dbaf2d2aa88ea0ab354d2ec`.
- Replaces browser PNG, multi-size ICO and Apple icon with the user-approved rich gold N, transparent background and restrained glint. Removes the competing SVG route and runtime favicon animation. The homepage favicon URL is versioned for cache refresh.
- User explicitly authorised publication of this reviewed favicon. Production verification remains pending until deployment is READY and its exact source and live assets are checked.
- Release checkout validation passed: 41 tests, TypeScript in the production build, 70 route checks and 510 unique licensed photos with zero missing licenses. `git diff --check` passed.

## Tansley Farm preservation release, 2026-10-11
- Prepared from production source `5a8e90effbdffc37bb7c5c7d73069e1228881957`, preserving the newer portfolio, article CTA, showroom and analytics changes.
- Integrated only the existing Tansley Farm content corrections, homepage image alt and Cotswold District location, and the exact two-exception homepage preservation test. Historical migration HTML is unchanged.
- Local `npm run build:verified` passed: 32 tests, TypeScript, production build, 67 checked pages, 724 photo instances and 508 unique photos with zero missing licenses.
- Release commit `5a189d41aea19796dbb82c34a77376431a52cad0` is pushed to main. Vercel deployment `dpl_3FUCWUbDTci4QuRvwvFiQs85nzwB` is Production READY with `www.nura-interiors.com` assigned and the exact source SHA confirmed.
- Production HTTP checks confirmed the two homepage corrections and updated Tansley project text and SEO. Live browser checks at 1440x900 and 390x844 confirmed the corrected project, loaded imagery and no horizontal overflow. Article proof/service/consultation links worked at both sizes; the consultation form rendered after the new deployment with no console errors. No matching runtime error/fatal logs were found in the checked release window. Real form delivery and GA4 receipt remain unverified.

## Journal content journey, 2026-10-11
- The 17 current journal articles now connect related reading to a relevant project or supporting page, a matching service, and the existing `/consultation` route.
- The article sidebar points to its matching service. The new journey replaces the duplicated generic end-of-article CTA.
- Built from `origin/main` at `23212b3dae58c44f01f0b93358c1e3f987d30ae6` in a clean release worktree, preserving other local checkouts.
- Local verification passed: 32 tests, TypeScript, production build with two temporary build workers, and HTTP checks of all 17 articles and 13 distinct journey destinations. The build configuration was restored after the local build.
- Published as `5a8e90e` at Vercel deployment `dpl_ERjXAdaEvcBfqDsja8oxxcSgJv1D`, verified READY on 2026-10-11. Live desktop/mobile journey links and consultation rendering passed; preserved in the subsequent verified Tansley release `5a189d4`.

## Projects photography-first release, 2026-10-07
- Integrated the local redesign ordering into the current production source while retaining the native catalogue preview and assets.
- The first three /projects cards are Tansley Farm, Elm Park Road and Westover Road. Project records and category filters are preserved.
- Verified 28 tests, production build, 67 page checks and zero missing image licenses. Direct execution of the ordering module confirms the three intended paths.
- Deployment and live browser verification remain pending until this release is pushed.

- Repository: interiorsnura-png/nura-publish
- Production branch: main
- Content source: migration/content-backup.json, combined by lib/content.ts in local/backup mode
- Target route: /post/what-are-some-of-the-biggest-problems-faced-for-customers-working-with-kitchen-designers
- Rendering path: app/[...slug]/page.tsx -> components/ArticleView.tsx -> components/RichArticle.tsx
- Analytics: public/nura-analytics.js, consent-gated gtag/dataLayer events
- Verification and deployment status: production content confirmed on 2026-10-07; live article, metadata, CTA, headings, and Vercel response verified. The exact Vercel deployment-to-commit mapping remains unverified.

## Portfolio integration, 2026-10-07
The Wix /portfolio page embeds https://nura-catalogue-2026.nura-interio-7002.chatgpt.site/. The /projects route now offers the same complete interactive catalogue on demand alongside the existing project collection. Initial integration used the external viewer. Superseded by the native migration below. Existing /portfolio -> /projects redirect is retained. No catalogue request occurs before activation.
Local validation: 27 tests, typecheck, production build and image-license verifier passed. Browser checks at 1440x1000 and 390x844 passed for open/close, catalogue content, no horizontal overflow and legacy redirect. Production verified on 2026-10-07: Vercel reports deployment success for commit 9792ccb546ead1500d2712b7b5b07fc8aed72dfd at deployment 8p9NTrTXX8QV1zAAkTHcSskUSJ2A. Live desktop/mobile checks passed for open/close, complete catalogue content, zero pre-click requests, no horizontal overflow and /portfolio redirect.

## Native portfolio, 2026-10-07
- /projects/catalogue serves the published catalogue HTML and runtime directly from NURA, without an iframe.
- /projects links to the native catalogue; existing project collection and redirects are preserved.
- 106 images, 14 video files, fonts, styles and compiled interaction runtime are stored under public/assets/portfolio. Asset manifest records source URLs, sizes and hashes. This imports the published runtime, not unavailable original TypeScript source.
- The route has canonical metadata, breadcrumb schema, 106 licensed ImageObject entries, sitemap inclusion and the existing consent-gated analytics script.
- Local verification: 28 tests, successful production build, 67 SEO-checked pages, 723 photo instances, 508 unique photos, zero missing licenses. Browser tests at 1440x1000 and 390x844 verified native content, zoom/reset, locally served film playback, zero foreign requests, no overflow or browser errors.
- Production verified on 2026-10-07: Vercel deployment AaqcmtpZxBib3C4Pw7yBBpNkNoRg reports success for c58809d. /projects/catalogue returns 200; browser checks on desktop/mobile passed with no iframe, no outside requests, working section navigation, zoom/reset and local film playback. Video byte ranges return HTTP 206 and video/mp4. Sitemap contains the native route.

## Projects catalogue preview, 2026-10-07
- /projects presents a visual Portfolio 2026 preview immediately below the hero and above the existing category filters and project cards.
- The preview links to the complete native /projects/catalogue experience and provides a direct project-films link. Kitchen and Joinery filters remain unchanged.
- The preview uses a locally hosted portfolio photograph with image-license schema. It introduces no iframe or third-party catalogue request.
- Local verification: 28 tests, successful production build, 67 SEO-checked pages, 724 photo instances, 508 unique photos and zero missing licenses. Desktop and mobile browser checks passed for layout order, image loading, filters, catalogue navigation, console errors and horizontal overflow.

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
- Clarity export for 2026-10-06 through 2026-10-08 recorded score 46.67, LCP 1.964s, INP 816ms and CLS 0.6975. CrUX remains unavailable for this URL/domain; this export is the real-user baseline, not a field improvement claim.
- Hardened shared editorial image wrappers, removed competing project-card image priority, reduced article TOC scroll DOM work, and deferred post-consent third-party analytics script insertion until browser idle time.
- Local verification: 29 tests, typecheck and production build passed. Browser performance trace and a later Clarity export remain pending.

## 2026-10-09: wardrobe service page implementation
- Updated only `components/WardrobeLanding.tsx` and the focused content test. Preserved the target URL, H1, SEO title, canonical metadata, Service schema, enquiry form, analytics, consent logic, existing reviews and verified Westover Road link.
- Reworked the introduction around storage, circulation, proportions, material direction and the brief. Added distinct on-page CTAs for sending plans and arranging a Fulham showroom visit. Added the two approved visible FAQs for awkward spaces and dressing rooms. No FAQ schema, unsupported claim or new case study was added.
- Local verification passed: 30 tests, TypeScript typecheck and production build. Visual browser preview and interactive route checks remain pending because preview tooling was unavailable in this session.

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

## 2026-10-20: projects heading spacing correction

- Confirmed the authoritative `/projects` listing title is `Our work.` in `app/[...slug]/page.tsx`. The shared `Hero` renderer now preserves a real accessible text-space between preceding words and the final emphasized word without changing other heading content or the two-line design.
- Local `npm run build:verified` passed: 70 pages, 741 photo instances, 506 unique photos and zero missing licenses. Owned preview inspection of `/projects` at desktop 1440x900 and mobile 390x844 showed H1 `Our work.`, no horizontal overflow and no console messages. Commit, push, PR and production verification remain pending.

## 2026-10-16: approved article journey release
Prepared from origin/main 986bdcf, limited to ArticleJourney presentation and CSS. Heading Plan your next step, contextual proof/service links preserved, enquiry promoted to primary button. User authorised publication. 51 tests, typecheck and production build passed. Deployment/live checks pending.

Release verified: commit 98b82a0e5bca5440226a50da788114ccf00a722e, Production READY dpl_ABYAaQjYM1zWzLQ7orhecLC2NK5D, www.nura-interiors.com alias confirmed. Live 390x844 and 1440x900: updated heading/button, no horizontal overflow. Mobile CTA opens London showroom form with Fulham showroom visit selected. Console warning/error log empty. No form submitted. Final evidence notes local only to avoid a documentation-only deployment.

## 2026-10-16: performance optimisation, local only
Bundled four existing global CSS files, added high-priority eager hero image, preloaded three existing Latin font resources and enabled negotiated AVIF with WebP fallback. Original content, imagery, analytics and forms retained. Same-machine Lighthouse13.5 mobile baseline86: FCP2.6s/LCP3.6s/CLS0.021; final91: FCP1.2s/LCP3.4s/TBT10ms/CLS0.017. Hero transfer67944 to35945 bytes. This is not comparable to remote PSI94 and does not prove100. 51 tests/build/route-image verification passed. Browser390x844 no overflow, hero loaded, bundled styles present, console clean. No push/deployment.

## 2026-10-20: local release guard repair

- Repaired the local-only release guard for Windows CLI invocation, real Git/npm process launching, isolated filesystem fixtures, receipt validation, source-change/build-failure invalidation, and actual Vercel deployment record validation.
- Initial local validation passed 65 tests (13 release guard tests), zero failures. Receipts expire after 24 hours and must match worktree, SHA/tree, origin and fresh remote main. Real Git/build fixture passed; actual dirty checkout correctly fails release readiness. PR preparation includes the owned dynamic-port build verifier, with three additional focused tests passing. Initial candidate full build verified 70 routes. Final amended PR commit is verified separately; main integration and live production checks remain pending.
- Focused and full test totals and the exact release commands remain pending until the requested command sequence completes. No commit, push, deploy, external API, credential, permission, or application/content action was performed.
- A local receipt is process evidence only, not a security signature or production evidence. Exact remote main SHA, full build, fresh Vercel READY/source/alias checks, and live desktop/mobile checks remain pending. The guard cannot prevent arbitrary manual `vercel` commands.

## 2026-10-16: second performance pass
Retained high-priority responsive hero preload after local mobile score improved91 to93, LCP3.4 to3.2s, FCP1.2s, TBT0ms, CLS0.017. Global inlineCss experiment worsened score89 and HTML transfer19250 to46714 bytes, so removed it. No experimental inlineCss flag remains. 51 tests/build/route validation passed. Browser390x844 confirms high-priority preload, loaded hero, no overflow and empty error/warning log. Not published.

Performance release authorised on 2026-10-16; final source validations already passed, current origin/main98b82a0 unchanged. Await exact deployment identity and live checks.

Performance Production verified: 8fda09abe4746ce8c5d0d90a42dc857c7585dd94 at dpl_CRQTbJT7djyq63iAKaWp1KbEsFht READY with www.nura-interiors.com alias. Live HTTP200, high-priority hero, four old CSS requests absent, AVIF34167 bytes. Post-release Lighthouse mobile95/FCP1.7s/LCP2.5s/TBT0/CLS0; a new agent-run test, not the same PSI environment. Live browser390x844 no overflow, loaded hero, zero broken images, no console errors/warnings observed. Form not submitted. Final notes local only.

## 2026-10-21: plywood and MFC journal article, local only

- Prepared the approved `/post/plywood-vs-mfc-kitchen-carcasses` record with the £40,000 title, explicitly illustrative price, qualified material guidance, existing hero, sources, related reading and consultation journey. The local journal Materials filter includes the article.
- `npm run build:verified` passed: 70 tests, TypeScript/build, 71 route checks, 745 photo instances, 506 unique photos and zero missing licenses. Focused tests, typecheck and whitespace checks passed. A read-only code review found no concrete issues.
- The worktree's own built app on port 4176 rendered the article with the intended H1, description, canonical, Article/Breadcrumb schemas, hero and links; the mobile 375px view had no horizontal overflow. The Materials journal view showed six stories and the new card. The separate port 4175 preview points to the original checkout and returned 404 for this route, so it is not evidence about this worktree. Local preview console showed Speed Insights script 404/MIME errors; no production browser check or external schema validation was made.
- `published_date` is a locally assigned 2026-10-21 calendar date, not an observed first Production publication timestamp. No push, deployment or production verification was authorised.
