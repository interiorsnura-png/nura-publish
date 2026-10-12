# NURA search publication notifications

After a successful Vercel Production deployment, `.github/workflows/indexnow.yml` runs two independent jobs. Preview deployments do not send requests. Each job checks out the deployment SHA, not an unrelated later main commit.

## Bing

IndexNow sends new or changed canonical pages and confirmed 404/410 removals. Fingerprints cover page text, links, images, SEO metadata and JSON-LD. Build-only script payloads and icon query hashes are ignored. A real favicon-byte change notifies the homepage so the branding update is discoverable. Fingerprint expansion causes one full inventory notification when migrating the existing cache.

A 200/202 receipt proves API acceptance, not crawling, ranking or index inclusion. The job summary shows the checked/submitted count and actual acceptance status, including explicit `NO_CHANGED_URLS` when no API request is needed. Full reports are stored in the `indexnow-submission-report` workflow artifact. The baseline is saved only after acceptance or when nothing changed.

## Google

The Search Console Sitemaps API receives the current Production sitemap after each successful deployment. It is not the Google Indexing API and cannot submit an ordinary article as an individual indexing request. The Indexing API is restricted to eligible JobPosting/BroadcastEvent pages. No artificial schema is added to bypass that restriction.

The Google report is explicit: `NOT_CONFIGURED`, `CONFIGURED`, `FAILED` or `SUBMITTED`. `SUBMITTED` means the sitemap API accepted the request; indexing remains `UNVERIFIED`. Reports are stored in `google-sitemap-notification-report`.

### One-time external connection

1. The owner enables two-step verification on `interiors.nura@gmail.com`. Google Cloud currently blocks access without it. The agent must not enter or change authentication credentials on the owner's behalf.
2. Select or create the intended Google Cloud project and enable the Search Console API (`searchconsole.googleapis.com`).
3. Create a dedicated service account for sitemap notifications. Add it as a Full user of the exact Search Console property `https://www.nura-interiors.com/`.
4. Configure Workload Identity Federation for GitHub's OIDC issuer, restricted to `interiorsnura-png/nura-publish` and `refs/heads/main`. Bind only that identity to the dedicated account with the required Workload Identity User role. Confirm new access with the owner before applying it.
5. Store the provider resource name as GitHub repository variable `GOOGLE_WIF_PROVIDER` and the service-account email as `GOOGLE_SEARCH_SERVICE_ACCOUNT`. These are identifiers, not private keys.
6. Run the workflow manually once and confirm Google HTTP 200/204 and Bing HTTP 200/202. Then inspect the report artifacts. Do not report Google as connected until a real receipt exists.

The workflow uses short-lived 600-second OAuth tokens with the `webmasters` scope. It creates no service-account private key or credentials file, and it never prints the token. No billing/trial subscription is needed for the workflow configuration itself.

Sources: https://developers.google.com/webmaster-tools/v1/sitemaps/submit, https://developers.google.com/search/apis/indexing-api/v3/using-api, https://github.com/google-github-actions/auth, https://www.indexnow.org/documentation
