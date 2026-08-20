# SEO TRAFFIC MODEL — RK Pyrénées Construction

**Objective stated by the client:** work toward ~30,000 qualified organic visits/month
(~1,000/day) over time, through a portfolio of pages — not a promise, not a guarantee, and not
a number derived from any measured search volume (none is available — see below).

---

## 0. Why there is no volume-based projection

Every `search_volume`, `trend_score`, `keyword_difficulty` and `CPC` cell in
`seo/SEO_KEYWORD_MASTER.xlsx` is `N/A` — this project has never had access to Google Keyword
Planner, Ahrefs, SEMrush, or a working Google Trends session (it returned a 429 rate-limit — see
`KEYWORD_CLUSTERING.md`). **Any traffic number built on top of those N/A cells would itself be
invented.** So this document does not say "keyword X gets Y visits/month." It explains the
*mechanism* by which a portfolio of real, relevant pages could reach the stated objective, and
names the exact real-world inputs (Search Console data, ranking positions, CTR) that would let
this model become a genuine numeric forecast after launch — see §4.

---

## 1. The core idea: portfolio, not a single keyword

30,000 visits/month cannot come from ranking #1 for "maçon Toulouse" alone — even a dominant
local ranking on a single high-intent term realistically caps out at a few hundred visits/month
for a business this size and locality. Reaching the stated objective requires **many pages each
capturing a smaller, realistic share of traffic**, summed across:

- 7 service pages (`/services/*`) — commercial/local intent, the highest-value pages per the
  existing `business_value` scores in `SEO_KEYWORD_MASTER.xlsx`
- 4 realisation pages (`/realisations/*`, growing over time as more real projects are added) —
  long-tail local + Google Images traffic
- 7 informational guide pages (`/guides/*`, all non-pricing per the 2026-08-20 decision) —
  informational intent, feeds topical authority and internal linking into the service pages
- The homepage, `/a-propos`, `/zones-intervention`, `/contact`, `/devis` — brand and
  transactional intent
- Video (YouTube, once ownership is verified — see `DEPLOYMENT.md` #3) and Google Images (the
  site's real project photos) as additional discovery surfaces beyond classic web search

This is exactly why `KEYWORD_CLUSTERING.md`'s anti-cannibalization rule (one canonical URL per
cluster) and the site's internal linking (guides ↔ services ↔ realisations) matter more than any
single keyword: **the objective is reached by the site having enough genuinely useful, indexed,
well-linked pages that each contribute a modest, realistic slice of traffic — not by one page
carrying the whole target.**

---

## 2. What actually drives each scenario

Not volume (unknown) — these levers, which are the real, controllable inputs:

| Lever | What it means here |
|---|---|
| **Number of indexed, linked pages** | Currently 26 real routes (see `public/sitemap.xml`). Growing this — mainly via more `/realisations/*` entries as real projects are documented — is the single biggest lever available, since it doesn't depend on beating established competitors for existing head terms. |
| **Ranking position achieved** | CTR drops sharply past position ~3 in both organic results and the local pack. Bâti HALLI and Avenir Rénovations (see `COMPETITOR_ANALYSIS.md`) currently outrank a brand-new site on head terms — this closes over months, not weeks. |
| **Google Business Profile performance** | For local-pack terms ("maçon Toulouse", "entreprise rénovation Toulouse"), the GBP listing (reviews, photos, category, response rate) drives as much visibility as the web page itself — see `COMPETITOR_ANALYSIS.md` §1. This is not currently auditable from this environment (no GBP access). |
| **Content freshness / velocity** | Adding real realisations and guides over time (not a one-time launch) compounds indexed-page count and topical authority — see §10 of the objective list ("Topical authority"). |
| **Backlinks / domain authority** | Not measurable here (no Ahrefs/SEMrush/Majestic access) — genuinely unknown starting point. |

---

## 3. Three scenarios

These describe **what would need to be true**, not a promised outcome. No visit count below is
derived from a real volume — where a number appears, it is an illustrative arithmetic example
only (explicitly marked), to make the *shape* of the portfolio math concrete, not a forecast.

### Scenario A — Conservative
- Ranks appear mostly in positions 4–10 for local commercial terms; local pack presence is
  inconsistent.
- Guide pages capture modest informational traffic; realisation pages grow slowly (a handful of
  new real projects per year).
- Traffic is dominated by brand search + a small number of long-tail local queries.
- **Illustrative shape only:** if ~15–20 pages each average low double-digit daily visits, total
  daily traffic sits well under the 1,000/day objective. Reaching it under this scenario would
  take multiple years, if at all, without additional investment (backlinks, GBP optimization,
  paid support).

### Scenario B — Realistic
- Service pages reach positions 3–6 for their core local terms within 6–12 months post-launch,
  helped by the site's genuine advantages named in `COMPETITOR_ANALYSIS.md` §4 (real project
  photos/video most competitors lack, named realisation pages most competitors don't have).
- GBP is optimized in parallel (real reviews accumulate, photos added, category/hours correct).
- Guide pages start appearing in "People Also Ask" / featured snippets for a subset of their
  target questions.
- Realisation pages grow steadily as real projects are documented (this is the most controllable
  lever — it depends on the business doing the work and photographing it, not on outranking
  competitors).
- **Illustrative shape only:** a portfolio of 40–60 well-ranked, well-linked pages each
  contributing a realistic share, plus brand search, is the kind of composition that could
  approach the stated objective over 12–24 months. This is a shape, not a projection — see §4
  for how to turn it into a real number.

### Scenario C — Aggressive
- Strong local pack presence across most service clusters, competitive positions on the
  highest-value local terms (per the existing `business_value` scores), sustained realisation
  and guide publishing, active backlink acquisition, and strong GBP review velocity.
- Video content (once YouTube ownership is confirmed — `DEPLOYMENT.md` #3) contributes
  meaningfully via Google Video/Images surfaces, which `COMPETITOR_ANALYSIS.md` identifies as an
  advantage no local competitor is currently exploiting.
- This scenario assumes sustained effort and investment beyond the current site build (content
  velocity, possibly paid promotion, active review generation) — none of which is guaranteed or
  scheduled by this project.
- **No visit number is given for this scenario** — at this level of assumed investment, a
  meaningful estimate genuinely requires real Search Console/GBP data as a baseline, not
  extrapolation from zero.

---

## 4. How to replace this with a real model

Once the site is live with Search Console installed (`DEPLOYMENT.md` #7):

1. After 4–8 weeks, pull real impressions/clicks/average position per query from Search Console.
2. Update the `search_volume`/`trend_score` columns in `SEO_KEYWORD_MASTER.xlsx` from `N/A` to
   real observed values — see `seo/README.md`.
3. Re-run this model with actual CTR-by-position data (industry-standard CTR curves, or the
   site's own observed CTR once enough data exists) against the real impression volumes Search
   Console reports — that produces an actual traffic estimate, not an illustrative one.
4. Track the realisation-page count and guide-page count over time against total organic
   sessions to see which lever (page count vs. ranking position) is actually moving the number —
   this project cannot know that in advance without live data.

---

## 5. What this model deliberately does not do

- It does not promise or guarantee 30,000 visits/month, 1,000/day, or any other figure.
- It does not assign a visit count to any individual keyword.
- It does not treat the 8 core keywords (`CORE_8_KEYWORDS` sheet) as the whole strategy — they
  are the highest real `business_value` targets, not a traffic ceiling. The full
  `ALL_KEYWORDS` sheet (82 rows) plus the ongoing realisation/guide content is the actual
  portfolio this model describes.
