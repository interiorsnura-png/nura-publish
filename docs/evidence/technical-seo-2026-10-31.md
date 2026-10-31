# Technical SEO fixes, 2026-10-31

## Scope and cause

Base inspected: main at 8af746381f6046a475237e0a822815a8cfa5fca5, initially clean.
The catch-all route already parsed Journal pagination for canonical URLs but did not vary its title or description. The calculator's WebApplication omitted offers. The Journal film mapping omitted uploadDate.

- Journal pages above 1 now use the requested page-specific title and description across search, Open Graph and Twitter. Existing first-page and category metadata, input normalization and canonical filters are preserved.
- Calculator WebApplication emits an Offer with string price "0" and priceCurrency "GBP". This describes access to the calculator, not a kitchen quotation.
- All three Journal films emit uploadDate from their shared video records.

## Film date provenance

The ISO 8601 date 2026-10-07 is the recorded native-site publication date. PROJECT_STATE.md's "Native portfolio, 2026-10-07" section and WORK_LOG.md record the production release of c58809dc3d2244c90e13824ebea47492d1b48e49, local film playback and HTTP 206 video responses. migration/portfolio/asset-manifest.json records the imported film assets, paths and checksums on that date. Full Git history confirms all three files were introduced by that commit.

Original Wix upload dates and exact times are not documented. Date-only precision is intentional; no midnight or example March timestamp was invented. Historical deployment lookup no longer returns that deployment, so this evidence relies on the retained release records, not a newly verified historical READY timestamp.

## Verification

- Focused regressions reproduced all three defects before implementation, then all four technical-seo tests passed.
- npm run build:verified passed: 146 tests, production webpack build, TypeScript, runtime trace inventory, 205-route SEO check with no errors, image-license inventory (155 pages, 709 unique photographs, no missing licenses), Fulham/quote journeys, Journal RSS/discovery and homepage planning-link checks.
- Additional requests to the actual local production server, with Googlebot user agent, verified HTTP 200 and emitted HTML for /journal, ?page=1, ?page=2, ?page=3, ?page=oops, ?page=0 and ?category=layout&page=2. Search/social metadata and canonical URLs matched. Parsed rendered JSON-LD confirmed all three video dates and the calculator's free GBP Offer.
- No visible page content or layout was changed. No production merge, manual Vercel deployment or production verification performed. Preview runtime/browser verification and official Google Rich Results validation are not claimed.

## Separate follow-up

npm ci reported two existing dependency vulnerabilities. npm audit --omit=dev reports critical advisories against pinned Next.js 16.3.8. Dependencies and lockfile are unchanged; investigate separately. After review/merge, verify the exact production source and affected URLs, then use the official Google Rich Results Test. Local schema parsing does not establish rich-result eligibility, indexing or ranking gains.
