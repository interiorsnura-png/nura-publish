# Shared Journal workflow

The CLI replaces per-article helper copies. It never pushes/deploys, invents research, assigns editorial scores, grants visual approval, or replaces exact-SHA gates. Existing content loaders already share visible/OG/Twitter/Article metadata and Joanne H attribution.

Run commands from the repository. Outputs stay in the parent workspace `work/`, outside Git. Input JSON remains private. Unique run/report filenames preserve earlier attempts; register writes use an exclusive lock and atomic replacement. A retained lock means another writer or an interrupted write: inspect its owner before recovery, never blindly remove it.

```powershell
npm run journal:workflow -- begin --path /post/kitchen-tea-towel-display
npm run journal:workflow -- plan --path /post/kitchen-tea-towel-display
npm run journal:workflow -- check --path /post/kitchen-tea-towel-display --base http://127.0.0.1:49900
npm run journal:workflow -- check --path /post/kitchen-tea-towel-display --base https://www.nura-interiors.com
```

Keep the returned run filename. `begin` also works before a source content record exists, so start it at research with the proposed route. Include earlier orientation time separately. `record --run journal-workflow/FILE.json --input ../journal-workflow/REPORT.json --phase preview --path /post/SLUG` appends timed evidence. Optional `--register nura-article-register.json` appends machine evidence to the single existing canonical record; it does not alter lifecycle approval or existing history. `summary --run journal-workflow/FILE.json --path /post/SLUG` reports elapsed time, unknowns and source changes.

Measure each actual phase with `phase --name research --state start --run journal-workflow/FILE.json --path /post/SLUG` and the corresponding `--state end`. Distinct retry names preserve failed attempts rather than resetting their timers. Overlapping phases are allowed; their durations must not be summed and described as wall-clock elapsed time. Machine route reports also contain actual request-check duration. Keep deployment build/wait timing separate from local work.

`assess --input ../qc.json --path /post/SLUG` takes `{fingerprint,categories,blockers}`. Required category keys and maxima: research20, content30, onPage20, imageryUxTechnical20, publicationMonitoring10. Each needs `score`, real `evidence` references and explicit `unknowns`. Unknown checks cannot receive full category credit. Arithmetic eligibility is not automated editorial approval: the executor must inspect evidence and complete every mandatory gate. A changed source fingerprint rejects stale scores.

## Images

Generate three original subject-specific images with the built-in image tool after actual Google Images reference research. Never substitute downloaded reference pictures. `assets --input ../assets.json` accepts:

```json
{"slug":"new-topic","assets":[{"name":"hero","original":"ABSOLUTE_ORIGINAL.png","prompt":"Full actual prompt","alt":"Actual subject description","credit":"Nura Interiors","rights":"owned","provenance":"Actual generated asset ID/path and reference-research record"}]}
```

Supply exactly three distinct named assets. Outputs are `public/assets/editorial/nura-SLUG-NAME.webp`,1536x864, WebP85 with contain resize. Existing files are never overwritten. Inspect the original and final composition, watermark and labels; generation rights declarations alone do not prove licence or quality. Reuse unchanged approved assets on retries.

## Browser checks

In the existing CUA session import `scripts/journal-browser-qa.mjs` and call `captureJournalView({tab,viewport,width,height,saveScreenshot})` using authorised bindings. Use1440x900 and390x844. Navigate/scroll to hero, each body image, whole table and CTA through CUA, then capture. The helper reads geometry and visible image load state. It returns pending before reflow/loading completes, or captured-needs-visual-review; it never claims a visual pass. Save screenshots privately and inspect them. Restore viewport afterwards. Never replace this with an unauthorised browser driver.

## Publication events and timing

`ready --input ../actual-deployment.json --ledger journal-publication-ledger.json --sha FULL_SHA --path /post/SLUG` validates the supplied record against existing identity rules and project ID. It records READY time/build duration with `liveVerified:false`; obtain fresh Vercel connector/source/domain/browser checks separately. Add `--first true` only when that record is proven to be the first publication. The first event is immutable. Historical source dates remain unchanged.

This ledger supports audit and future runtime integration. It does not eliminate the current public-date correction deployment: production cannot read workspace files. Until a real durable runtime/CMS adapter is configured and verified, retain timestamp correction and all required full gates. Never put a guessed future READY timestamp into the initial content.

## Efficient order

1. Inspect fresh source/production and resume the same candidate. Research first organic result/competitors and overlap, then freeze the useful angle.
2. Draft from a verified fact pack while three distinct images generate in parallel. Validate prose; preserve rejected drafts/PDCA.
3. Optimise images, implement once, run common checks and CUA visual review. Run the full final pre-push gate after real changes settle.
4. Record evidence-backed QC, commit/stamp exact SHA and push immediately. Run unchanged required exact-SHA post-push guards; verify actual READY/domain/live content.
5. Run official Rich Results and PSI independently in parallel; inspect each schema type. Keep GSC/Discover/field/analytics unknown until actual evidence. Do not retry a known daily quota failure.
6. Record first READY and any required date correction honestly. Persist final history and report success. Measure stages before claiming speed improvements;10-12minutes remains a pilot target, not a demonstrated result.
