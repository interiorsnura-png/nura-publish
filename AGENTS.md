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
- Release guards must record the actual worktree root and full SHA before changes. Never deploy a dirty CLI snapshot or treat a preview port as identity. After an authorized merge, use exact remote main SHA, run the bounded gate and build, then verify fresh authoritative Vercel source/SHA/READY/alias and exact live route at mobile and desktop sizes. Offline receipts are not live evidence; production activation remains pending until those checks pass.
- Run `npm run release:status` in the actual worktree before planning a release. After an authorized merge and a clean checkout at the exact current remote main SHA, run `npm run release:verify -- --expected-sha <40-character-SHA>`. It runs the existing build:verified and rechecks source/remote identity. Then `npm run release:check -- --expected-sha <same-SHA>` must pass with a matching local receipt less than 24 hours old. A failed preflight, build or changed source is not release ready. These commands never push or deploy and do not block arbitrary manual commands by themselves.
- `release:inspect -- --expected-sha <same-SHA> --deployment-json <file>` only checks an OFFLINE_ASSERTION against a supplied Vercel record and local HEAD. It always reports liveVerified:false. Obtain fresh authoritative deployment/alias and browser evidence separately; do not label offline assertions as live verification.
- Generate simple standalone shell commands without semicolon chains, expandable strings, embedded expressions, wrappers, or redirection. If an explicit security or permission denial occurs, stop dependent work and report the exact command and reason; ordinary command failures may be diagnosed within scope.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes â€” APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` â€” verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Shared Claude and Codex execution policy, 2026-10-23

- This section governs workflow coordination; all existing required release checks, security boundaries and verifier/Stop hooks remain mandatory. Explicit authorization in the current user request or session persists for its stated scope. Do not ask the user the same question again. Tool-enforced approval is independent and must be honored.
- Read this canonical AGENTS.md through CLAUDE.md. Resolve the actual checkout, origin, branch, full SHA and existing changes once at task start. Refresh identity if the checkout, branch or source changes. Preserve existing work, authors, public paths and first-publication dates.
- Use the configured local OmniRoute gateway for substantive execution when available, with credentials only in process environment variables. Never print or persist credentials. If Claude Code cannot start, report the runtime failure and use the existing gateway tool where supported; do not recursively delegate or silently claim success.
- Batch related edits. The PostToolUse hook records that verification is pending rather than rerunning all tests after each file edit. Run useful focused checks during editing, then the existing full verifier once for the final unchanged source. Stop still requires its successful full report and matching fingerprint/build ID. A read-only session with unchanged source needs no new build. Do not run concurrent builds or verifiers against the same checkout.
- Reuse a successful verification only while its actual checkout, source fingerprint, build ID and validity period still match. Existing release:status, release:verify, release:check and live verification requirements remain in force. Do not weaken tests, fabricate receipts or substitute a focused check for a required full gate.
- Publication requires user authorization for the current task. Use the existing Git-to-Vercel production workflow. Before a manual deployment, inspect deployments for the exact source SHA. Reuse a matching BUILDING/QUEUED/READY deployment; do not submit a second deployment for the same unchanged source unless a diagnosed failure requires retry. Do not deploy a dirty snapshot, force-push, change project/team or create a new project.
- Exact project-local command permissions do not authorize unrelated publication. The release hook may approve only the two configured exact release commands after checking NURA origin, clean source, project linkage, no active verifier and a fresh successful full verification. Other release commands and destructive operations retain normal approval. A denial is not permission to rewrite a command or use another tool to evade it.
- Verify READY, authoritative source SHA, production alias and the actual changed behavior at the requested live URL. Run required desktop/mobile checks; add interaction checks relevant to the change. HTTP 200 alone is insufficient. Diagnose ordinary failures without repeating an unchanged failing command indefinitely. Stop only for a genuine access barrier or decision outside authorization.
- Start a wall-clock timer at task entry. Report actual elapsed time and separately measured deployment wait, without artificial deadlines or unmeasured estimates. Keep progress meaningful and final reports short: change, verified result/link, source/deployment state, remaining blocker and measured duration.
- Configuration-only tasks do not authorize push or deployment. Keep machine-local configuration and backups out of publication commits.

## Verification scheduling and Windows fixtures, 2026-10-23

- During editing use `node .claude/dev-cycle/quick.mjs [tests/example.test.mjs ...]` for parallel typecheck, diff validation and optional relevant test files. It never creates a full-verification receipt or satisfies the release gate.
- Run the existing full verifier once after the final real change. It retains every harness, application, typecheck, build, SEO, image and desktop/mobile browser check. Repeated calls reuse only a complete successful full report for the identical checkout, fingerprint, runtime and BUILD_ID within 24 hours. Use `--force` when an external dependency or environment change requires a fresh run. Never promote quick/browser-only reports.
- Do not run `npm test` separately immediately before `build:verified`, which already runs it. Do not replace required gates with an environment skip flag. Existing exact-SHA release guards remain mandatory. Avoid redundant standalone typecheck when its required result is already covered by the selected gate.
- Harness fixtures use short OS temporary directories and `git init --template=`. Never copy a production .git directory or user template hooks into a fixture. Report harness, application and deployment failures separately. A harness failure means application/deployment remains unverified, not healthy.
- Wait for the existing deployment event/status to change with bounded backoff; after READY verify source SHA, alias, sitemap and affected routes. Do not rebuild local unchanged source just to wait for Vercel. Keep required live/browser checks.
