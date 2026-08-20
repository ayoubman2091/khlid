# Keyword database — how to update it

`SEO_KEYWORD_MASTER.csv` (mirrored in `SEO_KEYWORD_MASTER.xlsx`) is the keyword research
database referenced by `KEYWORD_CLUSTERING.md` and `SEO_ARCHITECTURE.md`. See those two files
for the methodology and clustering logic.

**Columns currently marked `N/A`** (`search_volume`, `trend_score`, `trend_direction`,
`keyword_difficulty`, `CPC`) are honestly empty because this project had no access to Google
Keyword Planner, Ahrefs, SEMrush, or Google Trends (which returned a 429 rate-limit — see
`KEYWORD_CLUSTERING.md`'s methodology section) at the time this was built. **Do not fill these
with estimates or guesses.**

## When real data becomes available

Once the site has Google Search Console installed (`VITE_GSC_VERIFICATION`, see
DEPLOYMENT.md #7) and has collected a few weeks of impressions/clicks, or once you have access
to Keyword Planner/Ahrefs/SEMrush:

1. Export the real metric (impressions, average position, search volume, CPC, difficulty) per
   keyword.
2. Update the matching row in `SEO_KEYWORD_MASTER.csv` — the `keyword` column is the join key.
3. Re-derive `business_value`/`priority` only if the real data meaningfully changes the
   qualitative estimate already documented in `KEYWORD_CLUSTERING.md`.
4. Leave `notes` intact and add a dated note when a column changes from `N/A` to a real value,
   so it stays clear which numbers are measured vs. still estimated.

No code depends on this file's structure changing — `src/data/services.ts` and
`src/data/guides.ts` reference `primaryKeywordCluster`/content independently, so updating the
CSV never requires touching the app.
