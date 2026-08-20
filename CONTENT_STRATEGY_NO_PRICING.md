# CONTENT STRATEGY — NO CUSTOMER-FACING PRICING

**Decision date:** 2026-08-20 (client instruction).
**Status:** Final — implemented across the site.

## The decision

RK Pyrénées Construction does not want any pricing information displayed anywhere on the
customer-facing website: no price tables, no €/m² figures, no estimated budgets, no pages built
solely to target "prix" keywords for SEO.

## What existed before this decision

Four guide pages previously published pricing content, all sourced from third-party publications
(Effy, Hellowatt, Architecteo, La Maison Des Travaux — see the `KEYWORD_CLUSTERING.md`
methodology and the removed `sourceNote` fields), never presented as RK's own rates:

- `/guides/prix-renovation-maison` — cited real €/m² ranges (700 €/m² average, 160–4 000 €/m²
  by renovation type)
- `/guides/prix-construction-maison`
- `/guides/prix-maconnerie`
- `/guides/prix-terrassement`

## What changed

All four were **removed** (not just edited — the URLs no longer exist; they are gone from
`src/data/guides.ts`, the sitemap, and the prerendered build). The `LocalBusiness` JSON-LD's
`priceRange: '€€'` field (an unconfirmed placeholder) was also removed — see `src/seo/schema.ts`.

They were replaced with **six non-pricing guides** covering the same services from a
process/choice angle instead of a cost angle:

| Removed | Replaced by |
|---|---|
| `/guides/prix-renovation-maison` | `/guides/etapes-renovation-maison` |
| *(new — no prior equivalent)* | `/guides/renovation-maison-ancienne-etapes` |
| `/guides/prix-construction-maison` | `/guides/etapes-projet-construction` |
| `/guides/prix-maconnerie` | `/guides/comment-choisir-entreprise-maconnerie-toulouse` |
| `/guides/prix-terrassement` | `/guides/comment-preparer-chantier-terrassement` |
| *(new — no prior equivalent)* | `/guides/comment-choisir-professionnel-dallage-exterieur` |

`/guides/comment-choisir-son-entreprise-de-renovation` was already non-pricing (it discusses
what makes a quote *trustworthy*, not what things cost) and was kept unchanged.

Also fixed: the "Combien coûte ce type de projet ?" anchor text that linked service pages to
guides (`src/pages/ServiceDetail.tsx`) — replaced with a neutral "Pour préparer votre projet"
heading, since the guides it now links to are no longer about cost.

## What did not change

- The quote form's optional "Budget indicatif" field (`src/components/sections/QuoteForm.tsx`)
  — this asks the *visitor* what their own budget is, as lead-qualification data. RK never
  states a price back; this is standard quote-request practice, not published pricing.
- General advice about getting a *detailed* quote (e.g. "a serious quote itemizes work, not just
  a total price" in the choose-a-renovation-company guide) — this is guidance about evaluating
  any contractor's quote, not a price figure.
- `src/data/services.ts` never contained pricing to begin with.

## Where the removed keyword research lives now

Nothing was deleted from `seo/SEO_KEYWORD_MASTER.csv` (unchanged, still 75 rows). In
`seo/SEO_KEYWORD_MASTER.xlsx`'s `ALL_KEYWORDS` sheet, every "prix"/"combien coûte"/"budget"
keyword is marked `Used On Website = NO`, `Status = Research/Opportunity Only — no
customer-facing pricing (client decision, 2026-08-20)`, and has no `Target Page` — kept as
research/opportunity data, never as a live content target. See `CONTENT_GAPS` in the same
workbook for the consolidated record of this decision.

## If this changes in the future

Reintroducing pricing content would require: (1) explicit new client confirmation, (2) real,
current, ideally Toulouse-specific price data (not the 2026-08 national estimates cited above,
which are now stale/unused), and (3) updating `src/data/guides.ts`, `seo/SEO_KEYWORD_MASTER.xlsx`,
and this document together so they stay consistent.
