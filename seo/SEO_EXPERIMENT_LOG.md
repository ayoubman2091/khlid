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

Investigated per PHASE 7 and **not** a technical fault: `scripts/prerender.ts` emits real
per-route HTML for all 26 routes from `staticRoutes()`, `robots.txt` is `Allow: /`, the
sitemap lists all 26 URLs, canonicals resolve from a single source (`getMetaForPath`), and
the two indexed pages confirm the pipeline works. The remaining cause is site age and
authority — the domain has ~1 week of history and no measurable backlinks. Treat as a
crawl-priority problem (internal links, authority, real project content), not a bug.

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
