# Homepage search clarity and structured data

## Scope and evidence

- Requested page: https://www.nura-interiors.com/ only. Source at task entry: ce60846644afe32dc07da0fd1abbf7f754913ac8 on main; clean worktree. No open pull requests were returned for this repository.
- The homepage is served by app/route.ts from lib/published-home.json with reviewed overlays. The migration snapshot is preserved; metadata and copy changes belong in lib/home-seo.ts, not the old root index.html.
- Public homepage read on 2026-10-29 confirmed bespoke kitchen and architectural joinery services, London and Dubai locations, Fulham showroom, project cards and three selected testimonials.
- Existing homepage schema used https://www.nura-interiors.com.webp as the studio image, a nonexistent host derived by appending an extension to the site origin. It also supplied a placeholder Dubai postal code and a 5/5 business aggregate calculated from three featured testimonials rather than an overall business rating.

## Search evidence and limits

Search-provider queries on 2026-10-29:

- bespoke kitchens joinery London Dubai Nura Interiors
- bespoke kitchens London fitted joinery showroom Fulham
- bespoke kitchens joinery Dubai design studio

Observed result titles included Nura's homepage and service pages, Schmidt's Fulham showroom, Roundhouse Fulham, Concept 5 and Bespoke Joinery's Dubai kitchen service. The results distinguish service exploration, project evaluation and showroom visits. These are editorial interpretations of the returned pages, not measured customer intent proportions.

Actual Google ordering, autocomplete, related searches, People Also Ask, location settings and personalised results were unavailable. These are editor-selected queries, not observed Google suggestions. No search volume, difficulty, rank, CTR or conversion uplift is claimed. This bounded technical/copy improvement does not replace Search Console keyword analysis.

References:

- https://developers.google.com/search/docs/appearance/title-link recommends descriptive, concise titles, a clear main heading and avoiding keyword stuffing.
- https://developers.google.com/search/docs/appearance/structured-data/local-business describes supported business information.
- https://developers.google.com/search/docs/appearance/structured-data/review-snippet limits LocalBusiness/Organization review snippets to reviews of other businesses, not self-serving business ratings.

## Changes

- Share homepage title/description constants between HTML, Open Graph, Twitter and WebPage schema.
- Title: Bespoke Kitchens & Joinery in London & Dubai | Nura Interiors.
- Replace the slogan-only H1 with a service-led H1; retain the existing slogan in supporting copy and identify the Fulham showroom and Dubai studio.
- Preserve hero assets, layout classes, forms, reviews, service links, canonical URL and environment-specific indexing policy.
- Correct studio schema images to the existing homepage hero, remove the invented Dubai postcode and remove the selected-review aggregate. Keep visible testimonials and Quotation nodes.
- Update the homepage content-revision date for the actual source revision, not a fabricated publication event.

## Verification and release boundaries

Four new regression tests reproduced the original issues before implementation. Test coverage checks metadata/schema alignment, one visible service H1, existing assets, enquiry field identity, service links and unchanged visible testimonials. The existing planning-links test loader now supplies the new metadata dependency; its assertions are unchanged.

Machine checks are separate from visual review. Desktop/mobile visual QA, official Google Rich Results testing, Search Console inspection, field Core Web Vitals and ranking outcomes are not verified in this environment. Changes are prepared for pull-request review, not a production merge or deployment. Preview indexing protection must remain in place.

Completed local machine checks: all 136 tests passed; production-mode Next.js build and TypeScript checks passed; all 205 route SEO checks returned no errors; image licensing audit found no missing licences across 155 pages and 1,056 image instances. Runtime trace, Fulham, quotation article, RSS/Journal and homepage planning-link checks also passed through build:verified. Direct inspection of the built homepage HTML confirmed the new title/H1, canonical, index/follow/large-preview directives and corrected 23-node JSON-LD graph. These are local results, not production or Google validation.

## Hero typography follow-up

User reported oversized and crowded hero typography in PR 7. The service-led H1 retained the migration CSS designed for the shorter slogan: 7.3vw desktop and 16vw mobile, with 0.9/0.91 line-height. Added a homepage-only hero-service scope and nura-home-hero.css, which is inlined by the existing performance pipeline. Desktop heading now uses clamp(2.75rem, 5.1vw, 4.75rem), mobile clamp(2.2rem, 8.7vw, 3.5rem), line-height 1.06/1.08 and 16ch width with balanced wrapping. Supporting slogan and description are separate blocks with quieter body styling and explicit gaps. Hero image, semantic H1 markup and text, metadata and schema are unchanged. CSS specificity overrides legacy mobile rules, including the 380px rule.

New source regression coverage checks the exact H1/supporting text, stylesheet inclusion, scoped scale, line-height, balanced wrapping and mobile breakpoint. Desktop/mobile screenshots and rendered geometry remain unverified because browser tooling is unavailable. Keep the PR draft until actual visual review.

Final follow-up machine checks: 137 tests passed; production-mode build and TypeScript passed; 205 route SEO checks, licensing, trace, RSS and all build:verified journey checks passed. Built homepage inspection confirmed exact H1, unchanged supporting text, scoped CSS inlined by the performance layer and retained metadata/schema. These checks do not establish visual correctness.
