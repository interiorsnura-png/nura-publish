# NURA Project State

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
