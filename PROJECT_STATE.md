# NURA Project State

- Repository: interiorsnura-png/nura-publish
- Production branch: main
- Content source: migration/content-backup.json, combined by lib/content.ts in local/backup mode
- Target route: /post/what-are-some-of-the-biggest-problems-faced-for-customers-working-with-kitchen-designers
- Rendering path: app/[...slug]/page.tsx -> components/ArticleView.tsx -> components/RichArticle.tsx
- Analytics: public/nura-analytics.js, consent-gated gtag/dataLayer events
- Verification and deployment status: production content confirmed on 2026-10-07; live article, metadata, CTA, headings, and Vercel response verified. The exact Vercel deployment-to-commit mapping remains unverified.

## Portfolio integration, 2026-10-07
The Wix /portfolio page embeds https://nura-catalogue-2026.nura-interio-7002.chatgpt.site/. The /projects route now offers the same complete interactive catalogue on demand alongside the existing project collection. The viewer remains externally hosted; this is an integration, not a native asset/source-code migration. Existing /portfolio -> /projects redirect is retained. No catalogue request occurs before activation.
Local validation: 27 tests, typecheck, production build and image-license verifier passed. Browser checks at 1440x1000 and 390x844 passed for open/close, catalogue content, no horizontal overflow and legacy redirect. Production verification follows publication.

