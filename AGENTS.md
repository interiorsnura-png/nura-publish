# NURA project instructions

## Keyword intent before title, owner instruction 2026-10-24

- After selecting a subject, inspect actual Google long-tail variants, related searches and People Also Ask before choosing its title. Distinguish observed suggestions from editor-proposed queries that were subsequently searched. Extract different supported user intents and decision stages, then select an original content-matched title. Record query/date/location limits and evidence; never infer search volume, keyword difficulty, transactional intent or customer proportions without evidence. Apply the existing title skill and diversity checks.

## Showroom-led editorial purpose, owner instruction 2026-10-24

- Evaluate every new article and practical tip by whether it prepares a better design conversation and gives a truthful, topic-specific reason to contact or visit Nura. Go beyond a generic checklist: explain how the reader's habits, aesthetic preferences, room constraints and adjacent kitchen decisions interact, using a useful hypothetical example or decision trade-off without inventing a real project or personal experience.
- Prioritise colour/materials, layout, storage and consequential purchase decisions as the Journal's editorial pillars. Keep decorative topics as supporting content, connected to the wider room, cabinetry, dining area or daily use. Preserve the authorised alternating content types; a decorative tip can still support a core design decision.
- End with an appropriate preparation task and CTA: colour/material references; photographs and an inventory for drawer storage; a kitchen plan for corner-layout discussion. Explain the decision those inputs can help clarify. These are conditional editorial directions, not proof of available showroom stock, mechanisms, demonstrations, appointment services or outcomes. Verify actual Nura capabilities before promising a specific comparison, demonstration or service; otherwise invite the reader to ask the studio what is available.
- Record the reader's decision, whole-kitchen connection, useful consultation inputs and supporting service evidence in the private content brief. Assess these within existing content/intent/CTA QC categories; do not add a sixth category, inflate scores, weaken release gates or claim improved sales/CTR without measured evidence.
- This instruction governs future work. It does not request bulk edits to published articles or an immediate production deployment.

## Shared Journal execution, owner-approved 2026-10-24

- Reuse `npm run journal:workflow -- <command>` instead of cloning per-article check, asset, timing or ledger scripts. See `scripts/JOURNAL_WORKFLOW.md`. Start `begin --path /post/SLUG` before research once the proposed route is known; a content record is not required for this command. Keep its run file through retries and separately include task-entry orientation time. Never reset the timer to improve reported duration.
- Use `check` for local and live metadata/author/robots/image/link/sitemap/Journal consistency. It is machine evidence only. Review actual research, claims, images, CUA desktop/mobile/table/CTA evidence and official Google Rich Results separately. `assess` calculates supplied evidence-backed category scores; it does not award scores or sign off editorial quality.
- Use `scripts/journal-browser-qa.mjs` through the existing authorised CUA tab to capture only after viewport reflow and visible images load. Visual inspection remains required. Parallelise independent drafting/image and post-release PSI/Rich Results work; do not run concurrent builds or register writers.
- Preserve all full pre-push and exact-SHA post-push release gates. The workspace READY ledger stores real deployment events, never a live-verification assertion. `--first true` is allowed only with verified first-publication evidence; later deployments never reset that event.
- Public dates still use the existing source until a durable runtime publication store is configured and tested. A workspace ledger is not a production runtime database. Do not silently skip the required timestamp correction or invent future READY times to avoid a deployment.

## Journal byline, owner instruction 2026-10-24

- All existing and future Journal articles use the owner-assigned Joanne H byline and https://www.linkedin.com/in/joanne-h/ profile. This supersedes prior byline rotation and preservation requirements for author names only. Preserve first-publication dates, content and reviewer records. Do not imply personal expertise, writing or human review without evidence. The shared content loader applies this policy after source merges; visible authorship and Article schema must agree.

## Journal hero selection, owner instruction 2026-10-23

- For each new article, search its primary keyword in Google Images and inspect the first non-sponsored result in visible order. Record the query, date, result/source URL and broad visual observations in private research evidence.
- Create an original hero inspired by general composition, materials and lighting, with NURA watermark and truthful concept labelling. Do not copy or merely re-watermark the source photograph, and do not present a generated interior as a built Nura project.
- Preserve an owner-selected hero. This rule applies to new articles, not a bulk replacement of existing published imagery.

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

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

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

## Owner metadata workflow, 2026-10-23

- For future articles, analyse actual first-page Google titles and descriptions for the primary keyword, recording query, date, visible organic URLs and geographic/personalisation limitations. Compare clarity, intent, benefit and curiosity; write original metadata rather than copying competitors. Prefer a truthful number, useful punctuation and Pro when appropriate to the actual content; never fabricate expertise or promise unsupported results. Align SEO, OG and Twitter metadata; do not claim highest CTR without real data.

## First Google result review, owner instruction 2026-10-23

- For EVERY new content item, search its primary keyword on Google and open/read the first non-sponsored organic result in the actual visible order before drafting. Record query, date, result URL, and location/personalisation limitations. Analyse its title, description, headings, coverage, useful examples, imagery and CTA, then identify a concrete original added value for NURA. Do not copy prose or invent expertise. If actual Google result ordering cannot be accessed, explicitly record that limitation rather than label generic search results as Google rank one.

## Independent editorial quality, owner instruction 2026-10-23

- Maintain NURA independent editorial standards regardless of competitor quality. The first Google result is research evidence, never the quality ceiling or a reason to reduce scope or accuracy. Seek to outperform it through clearer intent fulfilment, verified evidence, original practical value, relevant visuals, usability and useful next steps. Apply the full existing checklist and honest minimum90 QC gate even when all competitors are weak; improve or hold a candidate that fails. Do not inflate word counts, fabricate credentials or evidence, or promise to outrank every site. Search ranking and CTR outcomes require actual performance data.

## PDCA for candidates below90, owner instruction 2026-10-23

- Any candidate below90/100 must enter a documented PDCA improvement loop rather than be discarded or published. Plan: record evidence-backed category deficits, root causes, prioritised actions and measurable acceptance criteria. Do: apply bounded fixes while preserving truthful claims and source history. Check: repeat affected content/SEO/image/preview tests and honestly rescore against the unchanged category weights; rerun the mandatory full release gates for final changed source. Act: retain effective improvements and lessons, then repeat PDCA on remaining deficits. Persist each cycle number, timestamps, actual executor, candidate version/fingerprint, before/after scores, actions, test evidence and remaining blockers in the existing single-writer article register without replacing prior history. Map cycles to the existing lifecycle stages rather than creating duplicate articles or fabricated approvals. Keep the candidate unpublished until score>=90 and every independent release blocker is resolved; publish immediately after valid automated approval under existing exact-SHA gates. If access or external evidence prevents progress, save a concrete blocked state and next retry action, report only actionable blockers and resume the same candidate on a later run. Never inflate scores, weaken criteria, endlessly retry an unchanged failure or count missing monitoring evidence as passed.

## Title correction, owner clarification 2026-10-23

- Owner clarification: reverse-engineer actual Google search intent and competitor title patterns for each topic, then create an original content-matched title. Numbers and punctuation are allowed when useful; Pro is optional and must never be a mandatory template across articles. Preserve independent NURA quality standards.

## Fixed byline for new articles, owner instruction 2026-10-24

- Owner instruction 2026-10-24 supersedes all previous byline rotation: EVERY NEW article and practical tip must use Joanne H (https://www.linkedin.com/in/joanne-h/). Do not alternate authors or advance rotation. Synchronise the visible byline, author link and Article schema. Preserve historical published authorship unless separately requested. This is the owner-assigned byline, not evidence of personal writing, review, experience or signoff; never invent those claims.

## Public image wording, owner instruction 2026-10-23

- Latest owner instruction overrides earlier public AI-labelling wording: do not use AI-generated, AI generation, artificial-intelligence production labels or similar production-process language in public article prose, alt text or image captions. Use subject-specific descriptive captions with Nura Interiors credit. Where needed identify an image simply as an illustration, keeping truthful limitations on dimensions, actual project photography and measured experiments. Never invent a photographed project, measured test or human signoff. Retain real generation provenance privately. Do not alter embedded approved image artwork or existing watermarks merely to remove a caption phrase.

## Post-publication Google rich-results gate, owner instruction 2026-10-23

- After EVERY verified production article publication, run the official Google Rich Results Test in live URL smartphone mode, inspect each detected type and all critical/non-critical issues, persist the report URL and actual evidence. Fix actionable schema warnings within authorised scope, repeat affected QC/full exact-SHA release gates and verify the corrected live URL in the official tool again. Do not call local JSON parsing external validation. Use genuine timezone-qualified ISO8601 publication/modification timestamps from recorded events (such as authoritative production READY records); preserve first-publication date, do not invent historical times or reset dateModified merely because a validation report ran. Record correction time separately for schema-only repairs. No promise of indexing or rich-result display. Keep unresolved access/tool barriers explicit; no repeated unchanged deployments or bypasses.

## Discover readiness, owner instruction 2026-10-23

- Google Discover readiness is mandatory in addition to every existing NURA rule. Reference https://developers.google.com/search/docs/appearance/google-discover and https://support.google.com/websearch/answer/9982767; check current official guidance when it may have changed. Distinguish Google's eligibility requirements (actual Google indexing and policy compliance) from recommendations and NURA's own stronger pre-publication quality gates. No special Discover schema or tag grants eligibility, and a successful Rich Results Test does not prove indexing or Discover appearance.
- Research/Draft: assess the reader-interest value as well as search intent. Preserve primary-keyword/first-organic-result research but create original useful insights, a clear practical narrative or genuinely timely angle; no manufactured novelty, arbitrary word-count padding, sensationalism or unsupported benefit claims. Title, description and thumbnail must reveal the actual topic and match the article; truthful numbers/punctuation are optional and Pro is not a template. Support authorship/publisher/contact transparency with real supplied profiles and genuine provenance; never invent firsthand testing or human signoff. Disclose sponsorship where applicable. Preserve the owner's current public image-wording policy and truthful illustration/project distinctions.
- Imagery: retain the three relevant rights-cleared original illustrations and Google Images reference research. Also prepare or select an intentional landscape Discover/social preview at least1200px wide, over300000pixels, with16:9 as NURA's preferred standard based on Google's recommendation. Do not misrepresent16:9 as a universal Google eligibility requirement. Generate or carefully compose this asset so subject, useful details, small NURA watermark/credit and truthful embedded labels remain intact; no blind centre crop or watermark removal. Avoid generic logo thumbnails and text-heavy images. If a separate preview is used it must stay representative of the hero/article. Inspect its actual served dimensions, pixel count, bytes, HTTP200, mobile/desktop crop and accessibility. Set a suitable representative og:image and Article image using the existing content/rendering conventions; verify emitted image URL, width/height and ratio against the real asset, not hard-coded1200x630 assumptions.
- SEO QA/Preview: verify the final rendered robots directives allow max-image-preview:large and are not restricted by a conflicting googlebot meta tag or X-Robots-Tag. Retain HTTP200, crawlability, correct self-canonical, no unintended noindex/nofollow, sitemap, correct dates/byline/schema and link checks. Inspect mobile readability, table/CTA/image overlap and obstructive overlays. Inspect speed/CWV with valid available tools, explicitly separating synthetic labLCP/CLS from fieldINP/other real-user data. Unknown or unavailable measurements stay unverified; never grant full credit for them. A known broken rendering or representative-image/directive failure must be fixed before approval; apply existing exact-source QC and PDCA without weakening tests or altering category weights.
- Approved/Published: add an evidence-backed discoverReadiness object to each existing article-register record, with eligibility/indexStatus, policy assessment, content added value, preview image URL/dimensions/ratio/pixels/bytes, representative OG/Article consistency, effective robots directives, mobile/desktop evidence, performance evidence, unknowns and next actions. Use the same stable articleId and single atomic writer. Record the source fingerprint/SHA and stage history for affected checks. Do not invent an overall Discover score, add a sixth QC category or inflate the existing100-point score; allocate evidence within existing20/30/20/20/10 weights. Immediately publish after valid automatedQC>=90 and no independent blockers under all existing release gates. Google indexing cannot generally be confirmed before first publication, so do not fabricate it or make a new article wait for an impossible pre-publication index check.
- Monitoring: after verified live release, run the official Google Rich Results URL test and fix actionable schema issues under the existing policy. Check exact URL indexing and Discover manual actions in authorised Search Console when accessible; until then record index/eligibility as unverified, not passed. Check Discover impressions/clicks/CTR only from its real report when available and above Google's reporting threshold; absence of the report is not proof of ineligibility. Keep field metrics and analytics receipt pending where evidence is missing. Review after enough actual data and preserve older useful content. Treat Discover traffic as supplemental and volatile; neither hourly publishing, internalQC90 nor clean schema guarantees selection. Avoid repeated unchanged rewrites/deployments. The current fixed Joanne H byline policy, public wording, immediate publication, PDCA, licensing and exact-SHA requirements remain in force.
