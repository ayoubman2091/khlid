# Hostinger Deployment Manifest — RK Pyrénées Construction

Generated from a clean `npm install && npm run build` on commit `1804c6e` (2026-08-30).
Regenerate this list any time by rebuilding and re-running the `find`/`du` commands below —
don't hand-edit it stale.

## What ships

The **entire contents of `dist/`** replace the entire contents of `public_html/` on Hostinger.
Nothing outside `dist/` is uploaded; nothing in the current `public_html/` should be kept
except files Hostinger itself manages (if any exist outside this app's own output).

```
dist/
├── .htaccess                          ← REQUIRED: www→non-www, /projets redirect, 404 handler
├── 404.html                           ← noindex NotFound page, served via ErrorDocument 404
├── index.html                         ← homepage (canonical "/")
├── robots.txt
├── sitemap.xml                        ← 26 URLs, all trailing-slash except "/"
├── site.webmanifest
├── apple-touch-icon.png, favicon-16.png, favicon-32.png
├── google2a72fb4cb87474f0.html        ← GSC HTML-file verification
├── googlef3db07aad1ec1b88.html        ← GSC HTML-file verification (second property/method)
├── assets/                            ← hashed JS/CSS bundles (17 files, ~408 KB)
├── images/optimized/                  ← responsive WebP tiers (~6.7 MB, the bulk of the site)
├── logo/                              ← logo-{256,512,1024}.png, logo-transparent-1024.png
├── a-propos/index.html
├── contact/index.html
├── devis/index.html
├── zones-intervention/index.html
├── guides/index.html
│   └── comment-choisir-son-entreprise-de-renovation/, etapes-renovation-maison/,
│       renovation-maison-ancienne-etapes/, etapes-projet-construction/,
│       comment-choisir-entreprise-maconnerie-toulouse/,
│       comment-preparer-chantier-terrassement/,
│       comment-choisir-professionnel-dallage-exterieur/   (each: index.html)
├── realisations/index.html
│   └── dallage-terrasses-pierre-naturelle/, dalles-beton-terrasses/,
│       gros-oeuvre-construction-neuve/, renovation-bati-ancien/   (each: index.html)
└── services/index.html
    └── renovation/, construction/, maconnerie/, terrassement/, dallage/,
        extension/, amenagement-exterieur/   (each: index.html)
```

Total: 118 files, ~8.4 MB uncompressed. Every one of the 26 sitemap URLs corresponds to a real
`index.html` at that path — there is no server-side rendering step and no SPA fallback for
known routes.

## Upload checklist

1. **Back up** the current live `public_html/` before overwriting (Hostinger File Manager →
   compress, or download via FTP) in case a rollback is needed.
2. Upload the full contents of `dist/` into `public_html/`, replacing existing files. Using
   Hostinger's File Manager "upload" on a zip of `dist/`'s contents (not the `dist` folder
   itself — its *contents*) then extracting in place is the least error-prone path over FTP.
3. **Confirm `.htaccess` actually uploaded.** It's a dotfile — some FTP clients/File Manager
   views hide dotfiles by default and silently skip them. If it doesn't arrive, none of the
   www→non-www, `/projets` legacy, or 404-routing behavior activates, and this whole exercise
   doesn't change anything live.
4. Confirm `mod_rewrite` is enabled on the Hostinger plan (standard on hPanel/hcdn shared
   hosting — not something to change, just confirm the `.htaccess` rules actually apply rather
   than being silently ignored).
5. After upload, re-run the live checks in this report's Phase 12 section against production —
   don't declare success from the upload step alone.

## What is intentionally NOT uploaded

- `node_modules/`, `src/`, `scripts/`, `seo/`, everything at the repo root that isn't `dist/`
  or `public/` (the source for `dist/`) — none of it is server-side code; Hostinger here is
  static file hosting only.
- `dist-ssr/` — build-time-only SSR bundle used by `scripts/prerender.ts` to generate the
  static HTML in `dist/`; it never runs in production and must not be uploaded.
- `.env.production` — its values are already baked into `dist/`'s HTML/JS at build time; the
  file itself has no effect on a static host and isn't needed on the server.
