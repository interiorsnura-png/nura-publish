# NURA Project State

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
