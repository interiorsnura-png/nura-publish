# NURA Project State

- Repository: interiorsnura-png/nura-publish
- Production branch: main
- Content source: migration/content-backup.json, combined by lib/content.ts in local/backup mode
- Target route: /post/what-are-some-of-the-biggest-problems-faced-for-customers-working-with-kitchen-designers
- Rendering path: app/[...slug]/page.tsx -> components/ArticleView.tsx -> components/RichArticle.tsx
- Analytics: public/nura-analytics.js, consent-gated gtag/dataLayer events
- Verification and deployment status: production content confirmed on 2026-10-07; live article, metadata, CTA, headings, and Vercel response verified. The exact Vercel deployment-to-commit mapping remains unverified.
