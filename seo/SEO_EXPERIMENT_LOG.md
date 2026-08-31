# SEO EXPERIMENT LOG — RK Pyrénées Construction

Every meaningful SEO change, with the Search Console evidence that motivated it and the
baseline it must be measured against. Nothing here claims a result until GSC confirms it.

Property: `https://xn--rkpyrnesconstruction-f2bb.com/`
Repo: `TouatiCoder/khalid-site`

---

## BASELINE — 2026-08-28

Search Console has data from **2026-08-22 only** (6 days). Anything longer is DATA
UNAVAILABLE; period-over-period comparison is not yet possible.

**Totals, 22–27 Aug 2026**

| Metric | Value |
|---|---|
| Impressions | 173 |
| Clicks | 5 |
| CTR | 2.9 % |
| Avg. position | ~11 |

Impressions by day: 20 / 17 / 39 / 29 / 27 / 41 — rising.

**Pages with any impressions (1–27 Aug)**

| Page | Impr. | Clicks | Pos. |
|---|---|---|---|
| `/` | 128 | 4 | 10.1 |
| `/contact` | 5 | 0 | 7.4 |
| `/projets` (legacy, no route) | 3 | 0 | 2.0 |
| `/services` | 2 | 0 | 2.0 |
| `/guides/renovation-maison-ancienne-etapes/` | 1 | 0 | 35.0 |
| `/guides/renovation-maison-ancienne-etapes` | 1 | 0 | 67.0 |
| `/services/extension/` | 1 | 0 | 9.0 |
| `/services/extension` | 1 | 0 | 65.0 |
| `/a-propos` | 1 | 0 | 7.0 |

The homepage takes **74 % of impressions** and every commercial query. No service page
ranks for any commercial term.

**Indexation (URL Inspection, 2026-08-28)**

| URL | State |
|---|---|
| `/services/maconnerie` | Submitted and indexed |
| `/services/extension` | Submitted and indexed |
| `/services/construction` | Discovered – currently not indexed |
| `/services/renovation` | Discovered – currently not indexed |
| `/services/terrassement` | Discovered – currently not indexed |
| `/services/dallage` | Discovered – currently not indexed |
| `/services/amenagement-exterieur` | Discovered – currently not indexed |
| `/zones-intervention` | Discovered – currently not indexed |
| `/realisations` | Discovered – currently not indexed |

**CORRECTED 2026-08-28 (later same day).** This section first concluded the un-indexed
pages were "not a technical fault" and blamed site age and authority. That was wrong, and it
was wrong because the conclusion was drawn from the repository alone without ever issuing an
HTTP request to production. Live testing found a real canonical conflict — see EXP-004. The
prerender pipeline is indeed sound (26 routes, real HTML, `Allow: /`, single metadata
source), but every URL it declares 301s on the live server, which is a technical fault and a
well-known cause of exactly this coverage state. Site age is a contributing factor, not the
cause.

**Analytics**

GA4 was **not configured at all** until 2026-08-28 (see EXP-001). All traffic before that
date is DATA UNAVAILABLE beyond what GSC reports for Google organic.

---

## EXP-001 — Enable GA4

- **DATE** 2026-08-28
- **URL** site-wide
- **QUERY / CLUSTER** n/a (measurement infrastructure)
- **PROBLEM** `VITE_GA4_MEASUREMENT_ID` was never set, so `initAnalytics()` returned early
  and no tag was ever loaded. No behavioural or conversion data existed. The eight
  `ConversionEvent` types in `src/lib/analytics.ts` were dead code in production.
- **CHANGE** Set `VITE_GA4_MEASUREMENT_ID=G-N61F984PYV` in `.env.production` (commit
  `7d33280`). No code change required — `env.ts` / `analytics.ts` / `main.tsx` were already
  wired. Deliberately **not** pasting the raw gtag snippet into `index.html`: that would
  load gtag twice and double-count pageviews.
- **REASON** PHASE 25. Without conversion data, keyword prioritisation optimises clicks
  instead of quote requests.
- **EXPECTED IMPACT** No ranking effect. Unlocks landing-page, source and conversion
  reporting from first deploy.
- **BASELINE** No analytics data of any kind.
- **RESULT** Pending redeploy — Vite injects env vars at build time, so the commit alone
  changes nothing on the live site.
- **DECISION** After deploy, mark `quote_submit` as a Key Event in GA4 and link the GA4
  property to the GSC property.

---

## EXP-002 — 301 legacy `/projets` → `/realisations`

- **DATE** 2026-08-28
- **URL** `/projets`
- **QUERY / CLUSTER** legacy project URLs
- **PROBLEM** GSC reports `/projets` with 3 impressions at **average position 2.0**, but
  `App.tsx` defines no such route — it resolves to the SPA 404. A URL ranking in position 2
  points at a dead page.
- **CHANGE** Declared a 301 (`/projets` and `/projets/*` → `/realisations`) in **both**
  `vercel.json` and `netlify.toml`, since both host configs are present in the repo and the
  live host is unconfirmed (commits `ef4d147`, `0b8f7f1`).
- **REASON** PHASE 9. `/realisations` is the canonical equivalent: it exists in
  `staticRoutes()`, the sitemap and the nav. Legacy → strongest canonical URL.
- **EXPECTED IMPACT** Recovers whatever equity `/projets` holds; removes a soft-404 for a
  ranking URL.
- **BASELINE** `/projets`: 3 impressions, 0 clicks, position 2.0 (1–27 Aug).
- **RESULT** Pending deploy. **Verify with a real HTTP request that it returns 301, not
  200** (PHASE 24) — the SPA fallback can otherwise mask it.
- **DECISION** Open. If the live host turns out to be neither Vercel nor Netlify, this
  redirect will not apply and must be re-implemented at the actual edge.

---

## EXP-003 — `/services/construction` takes the gros-œuvre cluster

- **DATE** 2026-08-28
- **URL** `/services/construction`
- **QUERY / CLUSTER** gros œuvre Toulouse

| Query | Impr. | Pos. | Ranking URL |
|---|---|---|---|
| entreprise gros oeuvre toulouse | 23 | 15.9 | `/` |
| gros oeuvre toulouse | 17 | 18.1 | `/` |
| entreprise batiment gros oeuvre toulouse | 3 | 14.0 | `/` |
| gros oeuvre | 1 | 4.0 | `/` |

- **PROBLEM** The cluster's 44 impressions all land on the homepage, whose title and H1 lead
  on "construction et rénovation" — a weak intent match, consistent with position 15–18.
  `/services/construction` describes exactly this work (fondations, élévation, béton armé)
  but led on "construction neuve" and never carried the query term.
- **CHANGE** In `src/data/services.ts`, `construction` entry (commit `9220130`):
  - **BEFORE** title `Entreprise de construction à Toulouse` · H1 `Construction à Toulouse — gros œuvre et structures`
  - **AFTER** title `Entreprise de gros œuvre à Toulouse` · H1 `Entreprise de gros œuvre et construction neuve à Toulouse`
  - Intro expanded with the structural terminology the cluster expects (murs de soubassement,
    parpaing/brique, dalles, structure porteuse) and the Midi-Pyrénées service area.
  - Tagline now carries "Gros œuvre, fondations et structures béton armé" — this string sits
    **inside** the homepage `ServicesGrid` card link, so the internal anchor to this page
    carries the term as well.
- **REASON** PHASE 5. Prefer an existing page over a new one; the intent is already the
  page's subject. Every claim was already present in `includes` — nothing invented.
- **EXPECTED IMPACT** Two mechanisms: a better-matched page for Google to promote once
  indexed, and a descriptive internal anchor that raises crawl priority for a URL currently
  stuck at "Discovered – not indexed".
- **BASELINE** Cluster: 44 impressions, 0 clicks, positions 14.0–18.1, all on `/`.
- **RESULT** Pending. Re-measure ~14 and ~28 days after deploy. Success = the cluster's
  ranking URL moves to `/services/construction`, or position on `/` improves below 10.
- **DECISION** Open. If `/services/construction` is still not indexed 14 days after deploy,
  the constraint is authority, not on-page — escalate to Google Business Profile, local
  citations and real project content rather than further on-page edits.

---

## OPEN QUESTIONS FOR THE CLIENT (do not resolve by inference)

1. **Démolition** — `démolition maison toulouse` (5 impr, pos 14.4) and `demolition maison`
   (2 impr, pos 8.5) already surface the homepage, but démolition is not one of the seven
   confirmed services. Does RK actually perform demolition work? No page may be created
   until this is confirmed.
2. **Live host** — both `vercel.json` and `netlify.toml` are committed. Which one is live?
   Determines whether EXP-002 and the `trailingSlash: false` / `cleanUrls: true` policy are
   actually enforced in production.
3. **Portet-sur-Garonne** — `rénovation de maison à portet sur garonne` (6 impr, pos 15.7).
   Confirmed activity in that commune? Without confirmation, no commune page (PHASE 13).


---

## EXP-004 — One canonical URL format + Hostinger redirects

- **DATE** 2026-08-28
- **URL** site-wide
- **QUERY / CLUSTER** n/a (indexability)
- **PROBLEM** Three defects, all found only by testing production over HTTP:

  1. **Canonical conflict.** `GET /services/construction` → `301` → `/services/construction/`;
     that page returns 200 and declares `canonical = /services/construction` — the URL that
     301s. The sitemap (25 of 26 URLs), every canonical tag, the JSON-LD `url`/breadcrumb
     items and all 28 homepage internal links used the non-slashed form. URL Inspection
     confirmed the damage: `/services/extension` **and** `/services/extension/` are both
     "Submitted and indexed", and for the slashed one Google reports
     `googleCanonical = /services/extension/` against `userCanonical = /services/extension`.
     Google is overriding the declared canonical.
  2. **`/projets` → 404** in production while GSC lists it "Submitted and indexed"
     (last crawl 2026-07-10, position 2.0).
  3. **`https://www.<domain>/` → 200**, no redirect. Two hostnames, one site. GSC lists the
     www sitemap as the referring URL for `/projets`.

  Also established: production is **Hostinger** (`platform: hostinger`, `server: hcdn`,
  `panel: hpanel`). `vercel.json` and `netlify.toml` have never had any effect, which means
  EXP-002's redirect was inert from the moment it was committed.

- **CHANGE** (commits `2ad0186`…`399eb89`, 20 files)
  - **BEFORE** → mixed: sitemap/canonical/JSON-LD/links non-slashed, server slashed.
  - **AFTER** → one rule in `src/seo/canonicalPath.ts` (trailing slash; `/` unchanged),
    applied at every emitter: `SEO.tsx` (canonical + og:url), `scripts/prerender.ts`,
    `scripts/generate-seo-files.ts` (sitemap `<loc>`), `schema.ts` (breadcrumb / Service /
    Article urls), `Breadcrumb.tsx`, and all internal `<Link>` targets across 12 components
    and pages. `entry-server.tsx` re-exports the helper so the node build scripts share the
    same rule rather than reimplementing it.
  - **WHY the slash and not the bare path** — Apache's `DirectorySlash` is what produces the
    301, because each prerendered route is a real directory. Removing the slash instead would
    mean `DirectorySlash Off` plus hand-written rewrites for every clean URL. Following the
    server is the smaller, safer change, and the slashed form is what already returns 200.
  - `public/.htaccess` (new) carries the www→non-www 301 and `/projets` → `/realisations/`
    301 at the layer that actually executes, plus `ErrorDocument 404 /404.html`.
  - `absoluteUrl()` deliberately untouched: it serves image/asset URLs, which must not gain a
    trailing slash.
- **REASON** PHASE 8. Browser URL = canonical = sitemap = internal link = prerendered route.
- **EXPECTED IMPACT** Removes the contradiction Google is currently resolving against us.
  Expect the duplicate `/services/extension` pair to consolidate and the "Discovered – not
  indexed" pages to become eligible. Not a ranking change in itself.
- **BASELINE** 7 of 9 priority URLs not indexed; 1 duplicate pair indexed; `/projets` 404.
- **RESULT** **Nothing is fixed in production yet.** These are repository changes only.
  Hostinger deploys are manual, so live behaviour is unchanged until `dist/` is rebuilt and
  uploaded. Re-verify then with real HTTP requests, not by reading the repo — the mistake
  corrected in the baseline section above came from exactly that shortcut.
- **DECISION** Open. Post-deploy checklist: `/services/<slug>` returns 301 → slashed;
  slashed returns 200 with matching canonical; sitemap `<loc>` values all slashed;
  `/projets` returns 301 → `/realisations/` in one hop; `www` 301s to non-www preserving
  path; GA4 tag present in the served HTML.

### Unverified in EXP-004

`npm install`, `npm run build`, `npm run lint`, `npm audit` and `npm run seo:audit` were
**not run**. The repository is private and reachable here only through the GitHub API, with
no checkout to run node against. 20 files changed across the SEO pipeline — **build locally
before deploying.**

### Correction to EXP-002

`vercel.json` and `netlify.toml` do not apply to this host. The `/projets` redirect now lives
in `public/.htaccess`. Both host config files should be deleted so they stop implying a
deployment target that does not exist; left in place for now to avoid mixing an unrelated
deletion into this fix.

**Resolved.** Deleted in `a9c5c69`/`0be056c` along with the stray 0-byte `git` file, then
accidentally re-added (all three files) by an unrelated commit (`4b663e3`, message "p") that
reverted the deletion without explanation. Re-deleted in the autonomous finalization pass
(2026-08-30). `public/.htaccess` remains the only host config in the repo.

---

## EXP-005 — Per-service FAQ (visible + FAQPage schema)

- **DATE** 2026-08-31
- **URL** all 7 `/services/<slug>/` pages
- **QUERY / CLUSTER** all P1 clusters (`KEYWORD_CLUSTERING.md`) — GEO/answer-oriented intent
  specifically (PHASE 10 of the brief)
- **PROBLEM** `GENERAL_FAQ` (7 questions) and its `FAQPage` schema exist only on the homepage
  (`src/pages/Home.tsx` / `homeMeta()`). Every `/services/<slug>/` page — the pages meant to
  own each commercial cluster per `EXP-003`/`EXP-004` — carries no FAQ content and no
  `FAQPage` schema at all. `COMPETITOR_ANALYSIS.md` §3–4 independently flagged "FAQ construite
  sur les vraies objections clients — absent chez RK" as a real, evidenced gap against Bâti
  HALLI (8 questions) with no fabricated data involved. No fresh GSC session was available this
  cycle (checked again via ToolSearch — still no connector) to re-derive a numeric baseline, so
  this experiment is driven by the existing competitor-gap evidence and the already-logged
  gros-œuvre cluster problem (`EXP-003`), not by new query data.
- **CHANGE** Added an optional `faq?: FAQItem[]` field to the `Service` type
  (`src/types/index.ts`) and 3 service-specific questions to each of the 7 services in
  `src/data/services.ts` — 21 total, zero overlap with each other or with `GENERAL_FAQ`.
  Wired into `serviceDetailMeta()` (`src/seo/pageMeta.ts`) as an additional `FAQPage` schema
  entry, and into `ServiceDetail.tsx` as a visible `<FAQSection>` (reusing the same component
  and `Accordion` already used on the homepage — no new UI pattern introduced). Every question
  and answer is grounded only in facts already present in that service's own `intro`/`includes`/
  `process` — nothing new was invented (no prices, no certifications, no service scope not
  already listed). Two picks worth naming: `construction`'s first question directly defines
  "gros œuvre" in the page's own words (the exact term `EXP-003` is targeting), and
  `amenagement-exterieur`'s first question ("Faites-vous aussi l'aménagement de jardins et
  espaces verts ?" → No) directly implements `KEYWORD_CLUSTERING.md` cluster 7's own
  differentiation note ("RK doit rester positionné sur la structure/maçonnerie extérieure, pas
  se présenter comme paysagiste").
- **REASON** PHASE 9/10/12 of this cycle's brief — strengthen existing pages before creating
  new ones, and make each service page directly answer the questions its own cluster implies,
  in a form both users and AI/answer engines can extract (structured `FAQPage` + visible
  question text in the prerendered HTML, verified in `dist/services/*/index.html`).
- **EXPECTED IMPACT** No ranking claim — this cycle's own rule (PHASE 15: "Do not claim success
  until GSC confirms it"). Two honest mechanisms only: (1) more genuine, differentiated on-page
  content depth on pages `EXP-004` only just made indexable, and (2) `FAQPage` structured data
  eligible for rich results / AI-answer extraction on a term-by-term basis matching each page's
  actual cluster.
- **BASELINE** Pre-change: 0 of 7 service pages carried any FAQ content or `FAQPage` schema;
  only the homepage did. Cluster-level query baseline is the one already logged in `EXP-003`
  (gros œuvre: 44 impressions, 0 clicks, positions 14.0–18.1, all on `/`) — unchanged since no
  fresher GSC data was available this cycle.
- **RESULT** Pending. Verified only what's verifiable pre-deploy: `npm run build` (26/26
  routes), `oxlint` (0 errors), `npm audit` (0 vulnerabilities), `npm run seo:audit` (26/26, no
  issues), and a direct JSON-LD parse of all 7 built pages (7/7 valid `FAQPage`, 21/21 unique
  questions, no duplicates). Not yet deployed to Hostinger as of this commit — re-verify live
  after upload (`HOSTINGER_DEPLOYMENT_MANIFEST.md`), then re-measure GSC no earlier than
  `EXP-003`'s own 14/28-day window once a Search Console connection exists in-session.
- **DECISION** Open. Do not add a second FAQ round to any of these 7 pages without new evidence
  (a fresh GSC pull, or a specific competitor gap not already covered here) — avoid content
  bloat for its own sake.

---

## DEPLOYMENT VERIFICATION — 2026-08-31

Not a change — closing the "pending deploy" / "not yet deployed" status every entry above was
left in, by testing production directly (the same discipline the baseline correction and
EXP-004 both insisted on: verify with a real HTTP request, never by reading the repo). Someone
uploaded `dist/` to Hostinger between EXP-005's commit and this check; deploy mechanism and
timing are unconfirmed (no CI, no access to hPanel from here — see `DEPLOYMENT.md`).

| Item | Expected (per EXP-00x) | Live result | Verified via |
|---|---|---|---|
| `www` → non-www | 301, path preserved | `301` → `https://xn--rkpyrnesconstruction-f2bb.com/` | `curl -I` |
| `/services/construction` → slashed | `301` → `/services/construction/` | Confirmed | `curl -I` |
| `/services/construction/` canonical | matches its own URL, no conflict | `<link rel="canonical" href=".../services/construction/">` | `curl` |
| `/projets` legacy redirect | `301` → `/realisations/` | Confirmed, one hop | `curl -I` |
| Previously "Discovered – not indexed" pages (`construction`, `renovation`, `terrassement`, `dallage`, `amenagement-exterieur`, `zones-intervention`, `realisations`) | return 200 at canonical URL | All 200 | `curl -o /dev/null -w %{http_code}` |
| EXP-003 title/H1 (`/services/construction/`) | "gros œuvre" wording live | `<title>Entreprise de gros œuvre à Toulouse...</title>`, H1 matches | `curl` |
| EXP-005 FAQPage schema | present on service pages | `FAQPage` found in `/services/construction/` source | `curl` |
| `google-site-verification` meta | present, matches `.env.production` | Present, value matches | `curl` |
| GA4 (`G-N61F984PYV`) | tag fires client-side | `gtag.js` network request fires, `window.gtag` defined, `dataLayer` populated | Playwright (real browser — a plain `curl` of the static HTML will never show this; `initAnalytics()` injects it from JS by design, see `EXP-001`) |
| Sitemap | 26 URLs | 26 `<loc>` entries | `curl` |

**What this does NOT establish:** actual Google indexation status (only a live URL Inspection
in GSC confirms that — a 200 response means the page is crawlable, not that it's indexed), and
no ranking or traffic change — no fresher GSC session was available this cycle than the one
EXP-003/EXP-005 already cite (still checked again via ToolSearch; still no connector). Re-run
URL Inspection on the 7 previously-unindexed URLs and re-pull the gros-œuvre cluster no earlier
than the 14-day windows EXP-003/EXP-004 already set, once a Search Console connection exists
in-session or the client shares an export.

**Open questions carried forward, unchanged, still not resolved by inference:** démolition
service scope, Portet-sur-Garonne commune activity — see the "OPEN QUESTIONS FOR THE CLIENT"
section above. Live host is now resolved (Hostinger, confirmed both by EXP-004's response
headers and this verification pass).
