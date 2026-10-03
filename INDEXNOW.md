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

Add --dry-run to inspect URLs without sending them. HTTP 200 confirms receipt, not indexing. HTTP 202 confirms receipt with key verification pending. This is an on-demand submission command; it does not run automatically on deployments.
