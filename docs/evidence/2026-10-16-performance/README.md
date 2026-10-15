# Performance release evidence, 16 October 2026

Source release: 8fda09abe4746ce8c5d0d90a42dc857c7585dd94.
Production deployment: dpl_CRQTbJT7djyq63iAKaWp1KbEsFht, READY with www.nura-interiors.com assigned.

## Results

- Previous remote PageSpeed mobile94 is not the same environment as these local CLI runs.
- Local mobile baseline86; first candidate91; final preload candidate93 and92 on repeat, LCP3.2s.
- Global CSS inlining experiment89: rejected and absent from released configuration.
- Desktop100 was measured before the final responsive hero preload adjustment.
- Live mobile CLI after publication95: FCP1.7s, LCP2.5s, TBT0ms, CLS0.
- Live hero AVIF34167 bytes; old four standalone CSS references absent; high-priority responsive preload present.
- Mobile browser390x844: no horizontal overflow, hero loaded, no broken images and no observed console warning/error.
- 51 automated tests, production build and route/content/schema/image-license checks passed.

## Scope and limits

These are individual Lighthouse lab runs, not field INP or a guarantee of100. Analytics remain enabled. No real enquiry form was submitted. Diagnostic API-key-like patterns in the exported reports are redacted; original local reports are preserved. Localhost URLs are retained to distinguish test environments.

Journey files document the preceding CTA release98b82a0. Screenshots support observations and do not replace reports or deployment identity.
