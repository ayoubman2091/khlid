# DEPLOYMENT — RK Pyrénées Construction

Everything the project needs from the client before/at launch, in one place. Every item below
is currently either a placeholder or absent on purpose — see CURRENT_SITE_AUDIT.md and the
audit-fix report for why each one isn't guessed at.

## Build

```
npm install
npm run build     # generates images, typechecks, builds the SSR bundle, writes
                   # robots.txt/sitemap.xml, builds the client bundle, then prerenders
                   # every route to real per-route HTML in dist/
npm run preview    # serve dist/ locally to sanity-check the prerendered output
```

`dist/` is the deploy artifact. `netlify.toml` and `vercel.json` are both included —
delete whichever doesn't apply to the actual host.

## Environment variables

All optional. Copy `.env.example` to `.env.local` and fill in only what's actually confirmed
— never invent a value to fill a gap. Set the same variables in the hosting platform's build
environment (Netlify/Vercel project settings) for production builds.

### 1. `VITE_SITE_URL` — final production domain
Drives canonical URLs, sitemap.xml, robots.txt, Open Graph URLs, and every JSON-LD `url`/`@id`
field — all from this one place (`lib/env.ts` → `lib/constants.ts`'s `BUSINESS.siteUrl`). Until
set, the site uses the placeholder `https://www.rk-pyrenees-construction.fr` — **do not treat
that as final**.

### 2. Official registered legal name
`lib/constants.ts`'s `BUSINESS.legalName` currently uses **"RK PYRENNEES CONSTRUCTION"**
(double N, no accent) — sourced from the public French company registry (Pappers/RNE, SIREN
951 243 591), which is the only actual verified source found. This differs from the marketing
brand name "RK Pyrénées Construction" (unaffected, not in question). Confirm this is correct
before launch — it appears in the `Organization` schema's `legalName` and the footer copyright
line.

### 3. YouTube channel URL / video ownership
The 15 embedded videos' ownership is unverified — see CURRENT_SITE_AUDIT.md §5.2. The site
currently never claims them as "our channel" or "our projects." A `videoObjectSchema()` helper
exists in `seo/schema.ts`, ready to wire into `VideoSection`/`RealisationDetail`, but is
intentionally not connected to any page yet. Provide the real channel URL to activate it with
honest `name`/`description`/`uploadDate` instead of placeholders.

### 4. Business hours
`BUSINESS.hoursLabel` is `null` (Footer/Contact simply don't render an hours line while it's
unset, rather than publish an unconfirmed claim). Provide the real hours to fill this in.

### 5. Facebook URL
`BUSINESS.facebookUrl` is `null` for the same reason (Footer's social icon and
`Organization.sameAs` both stay absent until set). Provide the real, confirmed page URL.

### 6. `VITE_GA4_MEASUREMENT_ID`
GA4 measurement ID (e.g. `G-XXXXXXX`). `lib/analytics.ts`'s `initAnalytics()` only injects the
gtag.js script and starts sending events when this is set; until then `trackEvent()` calls are
silently no-ops (or `console.info` in dev). Tracked events: `phone_click`, `whatsapp_click`,
`email_click`, `maps_click`, `form_start`, `quote_submit`, `project_view`, `video_play`.

### 7. `VITE_GSC_VERIFICATION`
Google Search Console's HTML-tag verification value (just the `content=` value, not the whole
tag). Renders into a `google-site-verification` meta tag; the tag is omitted entirely from the
built HTML when this is unset (see `scripts/prerender.ts`) rather than shipping a literal
placeholder string.

### 8. `VITE_FORM_ENDPOINT`
POST endpoint for the quote form (`src/lib/formSubmit.ts`). Accepts a JSON body and expects a
2xx response — compatible with Formspree-style endpoints out of the box. Until set, the form
falls back to opening a pre-filled `mailto:` draft, exactly as before this refactor. A failed
request to a configured endpoint shows a real error state to the visitor — it never reports a
fake success.

### 9. Decennial insurance / certifications
Not currently displayed anywhere (no insurer, policy number, or certification is claimed). Add
only once the client provides verified details — see CURRENT_SITE_AUDIT.md / COMPETITOR_ANALYSIS.md
§4 for why competitors displaying this is a credibility gap worth closing *with real data*.

## Hosting

`netlify.toml` and `vercel.json` are both committed — pick one, delete the other. Both rely on
the prerendered per-route `dist/<route>/index.html` files (no SPA-fallback redirect needed for
known routes) and `dist/404.html` (both platforms serve this automatically, with a real HTTP
404 status, for any unmatched path).

## Regenerating images

Source photos live in `assets-source/images/original/` (NOT in `public/` — see audit item #10).
`npm run generate:images` (also runs automatically before `npm run build`) reads them, produces
responsive WebP tiers in `public/images/optimized/`, and writes `src/data/imageManifest.json`.
Add a new source photo to `assets-source/images/original/` and reference its filename stem
somewhere in `src/` before regenerating — unreferenced source files are skipped, not shipped.
