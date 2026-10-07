# NURA project instructions

## Start from verified state

1. Read `PROJECT_STATE.md`, `WORK_LOG.md`, `BACKLOG.md`, this file, and relevant existing repository guidance before investigating or changing code.
2. Verify the repository path, remote, current branch, production branch, and working-tree changes once per task. Preserve existing changes and untracked files. Never use reset, clean, or broad overwrite operations.
3. Trace content from the route and loader to the authoritative source. A missing slug in one JSON file, or an incomplete indexing/search result, is not evidence that the content does not exist.
4. Use the exact requested URL. Do not guess a target article or page when the URL is unclear.

## Implementation discipline

- Keep changes limited to the approved target record and necessary files. Do not duplicate content records or replace whole JSON files.
- Reuse existing loaders, renderers, analytics, tests, and deployment conventions. Keep content changes and event-tracking changes separately reviewable.
- Preserve existing paths, publication dates, unrelated content, assets, and previous work unless a specific change is approved.
- Do not use the em dash character (U+2014) in user-facing copy, metadata, alt text, captions, schema, documentation, or reports.
- Do not invent data, claims, prices, timings, credentials, tracking results, deployment details, or test results.

## Verification and release evidence

- Diagnose failed commands and use an available, authorized alternative when one exists. Do not replace action with repeated readiness messages.
- Run relevant focused tests. Repeat successful checks only when code or inputs changed, or when a separate reason requires revalidation.
- Distinguish explicitly between code prepared, committed, pushed, deployment successful, and the result verified on production.
- A commit on `main` or an HTTP/Vercel response does not prove which commit produced a deployment. When deployment identity matters, verify the deployment details and source commit through an authoritative Vercel or CI record.
- Before republishing content that appears stale, fetch and inspect production again. Do not create a new deployment without evidence that one is needed.
- Presence of an event name or payload in JavaScript does not prove receipt in GA4. Consent-gated analytics must remain marked unverified until an actual GA4 DebugView or equivalent receipt is observed.
- If mobile, desktop, browser interaction, screenshot, GA4, or deployment checks cannot be run because tools or access are unavailable, keep them open in the backlog. Do not treat missing tools as success or silently remove the check.
- After a verified change is merged, fetch the exact production URL and validate the relevant rendered content, metadata, links, tracking wiring, and responsive behavior when tools are available.
- Pushing documentation to `main` can trigger an automatic deployment. Report that side effect and verify its deployment status when relevant.

## Documentation and reporting

- Keep `PROJECT_STATE.md`, `WORK_LOG.md`, and `BACKLOG.md` current. Close blockers only when new evidence supports closure; track unverified checks separately with the next action.
- Do not create parallel or contradictory instruction files. Update this canonical project instruction file when workflow rules change.
- Final reports must be short and state: what changed, what was actually verified, commit and deployment status, and what remains with the next step.
- Ask only when there is a consequential ambiguity or an action outside the granted authorization. Do not ask again for routine, previously approved reversible work.
