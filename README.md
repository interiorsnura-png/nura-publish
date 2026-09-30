# Nura publish package

This folder is a standalone static site. Upload its contents to the root of a static host.

- Entry page: `index.html`
- Case studies: `projects-hampstead-house.html`, `projects-park-view.html`, `projects-clay-house.html`
- Error page: `404.html`
- SEO files: `robots.txt`, `sitemap.xml`
- Assets: `assets/`

## Enquiry service

Vercel runs api/enquiry.js. vercel.json rewrites /_functions/enquiry to /api/enquiry so the existing form URL continues to work.

Set these server-side Production environment variables before enabling email delivery:

- RESEND_API_KEY: a Resend sending key (never commit it).
- ENQUIRY_FROM: an email address on a verified Resend domain, for example Nura <studio@nura-interiors.com>.
- ENQUIRY_TO: optional; defaults to studio@nura-interiors.com.

Redeploy after changing environment variables. Without the key and verified sender, the endpoint returns 503 and the form keeps the visitor's input. Success is shown only after Resend accepts the email; inbox delivery must be verified separately.

The handler validates fields, rejects foreign browser origins, uses plain-text email, sets Reply-To to the visitor, and suppresses identical provider requests within a five-minute bucket. Configure Vercel Firewall rate limiting for /_functions/enquiry and /api/enquiry to limit automated spam.
