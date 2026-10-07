# NURA Project State

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
- Production verification pending the current release.
