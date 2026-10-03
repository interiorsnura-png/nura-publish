# IndexNow

The verification file is served at the site root. Configuration is in indexnow.json. This key proves site ownership to IndexNow; it is intentionally publicly retrievable and is not a private account token.

After publishing a new or updated page, submit its canonical path:

```sh
npm run indexnow -- /services/architectural-joinery /consultation
```

Deleted page paths may also be submitted to notify search engines of removal. Submit only pages that actually changed. Requests verify that the key file is available in production before sending anything to Bing.

For the initial whole-site submission only:

```sh
npm run indexnow -- --all
```

Add --dry-run to inspect URLs without sending them. HTTP 200 confirms receipt, not indexing. HTTP 202 confirms receipt with key verification pending.

Automatic submission runs in GitHub Actions after Vercel reports a successful Production deployment. Preview, failed deployments and GitHub Pages are excluded. The workflow compares public page content, SEO metadata, links and images against the last successful snapshot. Only new or changed pages and confirmed 404/410 removals are sent. Pages unchanged by a deployment are skipped. The initial snapshot is seeded from the live site already submitted during setup. Later snapshots use the Actions cache; if the cache expires, comparison falls back to that initial snapshot.

Failed page fetches or rejected IndexNow submissions fail the workflow and leave its prior snapshot intact. Reports are saved as workflow artifacts. Run the Nura automatic IndexNow workflow manually to retry a failed run or notify changes published without a deployment.
