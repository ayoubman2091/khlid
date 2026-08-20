/**
 * Generates seo/SEO_KEYWORD_MASTER.xlsx — a 5-sheet workbook built from the REAL keyword
 * research already on file (seo/SEO_KEYWORD_MASTER.csv, KEYWORD_CLUSTERING.md,
 * COMPETITOR_ANALYSIS.md, CURRENT_SITE_AUDIT.md). No search volume, trend, CPC, or difficulty
 * value is invented anywhere in this file — every metric absent from the original research
 * stays N/A. "Used On Website" was verified by grepping the actual page content in
 * src/data/services.ts and src/data/guides.ts (see the audit-fix conversation for the
 * verification pass) — not assumed from the original target_page assignment.
 *
 * Run manually: `node scripts/generate-keyword-workbook.ts` (not part of the site build —
 * this produces a research artifact, not a build asset).
 */
import ExcelJS from 'exceljs'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CSV_PATH = join(ROOT, 'seo/SEO_KEYWORD_MASTER.csv')
const OUT_PATH = join(ROOT, 'seo/SEO_KEYWORD_MASTER.xlsx')

// ---------------------------------------------------------------------------
// 1. Parse the existing CSV — the authoritative prior research. Every value read
//    from it is carried forward unchanged; nothing here overwrites it.
// ---------------------------------------------------------------------------

function parseCSV(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else inQuotes = false
      } else field += c
    } else {
      if (c === '"') inQuotes = true
      else if (c === ',') {
        row.push(field)
        field = ''
      } else if (c === '\n') {
        row.push(field)
        rows.push(row)
        row = []
        field = ''
      } else if (c === '\r') {
        /* skip */
      } else field += c
    }
  }
  if (field || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

const csvRaw = readFileSync(CSV_PATH, 'utf8').replace(/^﻿/, '')
const csvRows = parseCSV(csvRaw)
const header = csvRows[0]
const col = (name: string) => header.indexOf(name)
const dataRows = csvRows.slice(1).filter((r) => r.length > 1 && r[0])

interface CsvRow {
  keyword: string
  language: string
  country: string
  city: string
  cluster: string
  search_intent: string
  commercial_intent: string
  local_intent: string
  trend_score: string
  trend_direction: string
  search_volume: string
  volume_source: string
  competition: string
  keyword_difficulty: string
  CPC: string
  business_value: string
  priority: string
  target_page: string
  content_type: string
  SERP_type: string
  competitors: string
  notes: string
}

const csvKeywords: CsvRow[] = dataRows.map((r) => ({
  keyword: r[col('keyword')],
  language: r[col('language')],
  country: r[col('country')],
  city: r[col('city')],
  cluster: r[col('cluster')],
  search_intent: r[col('search_intent')],
  commercial_intent: r[col('commercial_intent')],
  local_intent: r[col('local_intent')],
  trend_score: r[col('trend_score')],
  trend_direction: r[col('trend_direction')],
  search_volume: r[col('search_volume')],
  volume_source: r[col('volume_source')],
  competition: r[col('competition')],
  keyword_difficulty: r[col('keyword_difficulty')],
  CPC: r[col('CPC')],
  business_value: r[col('business_value')],
  priority: r[col('priority')],
  target_page: r[col('target_page')],
  content_type: r[col('content_type')],
  SERP_type: r[col('SERP_type')],
  competitors: r[col('competitors')],
  notes: r[col('notes')],
}))

// ---------------------------------------------------------------------------
// 2. Per-keyword overlay — decisions made during this pass, each traceable to a
//    verification step actually performed (grepping real page content, checking the CSV's
//    own methodology notes). Only "usedOnWebsite: false" entries need a reason; everything
//    else defaults sensibly per cluster (see DEFAULTS below).
// ---------------------------------------------------------------------------

type SearchIntentCategory = 'INFORMATIONAL' | 'COMMERCIAL' | 'TRANSACTIONAL' | 'LOCAL' | 'NAVIGATIONAL'
type DataType = 'VERIFIED DATA' | 'OBSERVED SERP' | 'CLIENT DATA' | 'SEMANTIC INFERENCE' | 'N/A'
type UsedStatus = 'YES' | 'NO'

interface Overlay {
  intent: SearchIntentCategory
  status: string
  source: string
  dataType: DataType
  used: UsedStatus
  usedNote?: string
  /** Overrides target_page from the CSV. Set to '' to explicitly clear a target (e.g. a
   *  pricing keyword whose page no longer exists — see the NO_PRICING_NOTE overrides below). */
  targetPage?: string
}

/**
 * Client decision (2026-08-20): NO pricing content anywhere on the customer-facing site — no
 * price tables, no €/m² figures, no "prix X" guide pages. The 4 price guides that used to exist
 * (prix-renovation-maison, prix-construction-maison, prix-maconnerie, prix-terrassement) were
 * removed and replaced with non-pricing process/choice guides — see src/data/guides.ts. Every
 * "prix"/"combien coûte"/"budget" keyword below is downgraded to Research/Opportunity Only:
 * kept in the database (nothing deleted), but with no target page and Used On Website = NO.
 */
const NO_PRICING_NOTE =
  'Mot-clé "prix" — NE PAS créer de contenu tarifaire client (décision client, 2026-08-20). Conservé comme mot-clé de recherche/opportunité uniquement, sans page cible sur le site actuel.'
const NO_PRICING_STATUS = 'Research/Opportunity Only — no customer-facing pricing (client decision, 2026-08-20)'

const CLUSTER_DEFAULTS: Record<string, Omit<Overlay, 'used' | 'usedNote'>> = {
  CONSTRUCTION_TOULOUSE: { intent: 'LOCAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  RENOVATION_MAISON_TOULOUSE: { intent: 'LOCAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  MACONNERIE_TOULOUSE: { intent: 'LOCAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  TERRASSEMENT_TOULOUSE: { intent: 'LOCAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  DALLAGE_TOULOUSE: { intent: 'LOCAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  EXTENSION_MAISON_TOULOUSE: { intent: 'LOCAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  AMENAGEMENT_EXTERIEUR_TOULOUSE: { intent: 'LOCAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  INFORMATIONAL_PRIX_RENOVATION: { intent: 'INFORMATIONAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  INFORMATIONAL_PRIX_CONSTRUCTION: { intent: 'INFORMATIONAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  INFORMATIONAL_PRIX_MACONNERIE: { intent: 'INFORMATIONAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  INFORMATIONAL_PRIX_TERRASSEMENT: { intent: 'INFORMATIONAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  INFORMATIONAL_GUIDE_CHOIX: { intent: 'INFORMATIONAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  BRAND: { intent: 'NAVIGATIONAL', status: 'Active', source: 'Internal semantic expansion', dataType: 'SEMANTIC INFERENCE' },
  SUBURBS_CANDIDATE: {
    intent: 'LOCAL',
    status: 'On Hold — Toulouse-only launch (confirmed 2026-08-20)',
    source: 'Client-provided (proche banlieue mentioned) + Internal semantic expansion',
    dataType: 'SEMANTIC INFERENCE',
  },
  INTERNATIONAL_SCAN: {
    intent: 'INFORMATIONAL',
    status: 'Opportunity / Research Only',
    source: 'Internal semantic expansion (exploratory)',
    dataType: 'SEMANTIC INFERENCE',
  },
}

// keyword -> overrides. Every entry here was checked against real src/ content this session.
const OVERRIDES: Record<string, Partial<Overlay>> = {
  'RK Pyrénées Construction': { dataType: 'CLIENT DATA', source: 'Client-provided' },
  'RK Pyrénées Construction avis': {
    used: 'NO',
    usedNote: "Aucune section avis/témoignages sur le site (aucun avis vérifié disponible — voir CURRENT_SITE_AUDIT.md §7, politique anti-fabrication de témoignages).",
  },
  'devis rénovation maison gratuit': { intent: 'TRANSACTIONAL' },
  'entreprise construction Haute-Garonne': {
    used: 'NO',
    usedNote: '"Haute-Garonne" (nom de département) n\'apparaît pas sur /services/construction — seul "Toulouse" (ville) y est utilisé.',
  },
  'rénovation maison Haute-Garonne': {
    used: 'NO',
    usedNote: '"Haute-Garonne" n\'apparaît pas sur /services/renovation — seul "Toulouse" y est utilisé.',
  },
  'rénovation complète maison Toulouse': {
    used: 'NO',
    usedNote: 'Le mot "complète" n\'apparaît pas sur /services/renovation. La page service couvre le même périmètre ("rénovation intérieure et extérieure") sans utiliser ce mot exact.',
  },
  'entreprise maçonnerie Toulouse': {
    used: 'NO',
    usedNote: 'Le mot "entreprise" n\'apparaît pas sur /services/maconnerie (la page utilise "Maçon à Toulouse"). Gap identifié — voir feuille CONTENT_GAPS.',
  },
  'prix maçonnerie Toulouse': { used: 'NO', usedNote: NO_PRICING_NOTE, status: NO_PRICING_STATUS, targetPage: '' },
  'artisan maçon Toulouse': {
    used: 'NO',
    usedNote: 'Le mot "artisan" n\'apparaît pas sur /services/maconnerie (il apparaît sur /services/renovation).',
  },
  'terrassement maison Toulouse': {
    used: 'NO',
    usedNote: 'Le mot "maison" n\'apparaît pas dans le texte de /services/terrassement (le service y est décrit de façon générale, avant tout type de construction).',
  },
  'prix terrassement Toulouse': { used: 'NO', usedNote: NO_PRICING_NOTE, status: NO_PRICING_STATUS, targetPage: '' },
  'prix dalle béton m2': { used: 'NO', usedNote: NO_PRICING_NOTE, status: NO_PRICING_STATUS, targetPage: '' },
  'prix extension maison Toulouse': { used: 'NO', usedNote: NO_PRICING_NOTE, status: NO_PRICING_STATUS, targetPage: '' },
  'extension maison prix m2': { used: 'NO', usedNote: NO_PRICING_NOTE, status: NO_PRICING_STATUS, targetPage: '' },
  'entreprise extension maison Toulouse': {
    used: 'NO',
    usedNote: 'Le mot "entreprise" n\'apparaît pas sur /services/extension. Gap identifié — voir CONTENT_GAPS.',
  },
  'surélévation maison Toulouse': {
    used: 'NO',
    usedNote: 'Le mot "surélévation" n\'apparaît nulle part sur le site — /services/extension couvre "agrandir une maison" de façon générale sans nommer ce sous-type précis. Gap identifié — voir CONTENT_GAPS.',
  },
  'terrasse bois Toulouse': {
    used: 'NO',
    usedNote: "/services/amenagement-exterieur précise explicitement travailler le béton et la pierre naturelle, pas le bois — décalage potentiel entre ce mot-clé et le périmètre réel du service. À confirmer avec le client avant toute action (le service inclut-il vraiment la terrasse bois ?) plutôt que de publier un contenu non représentatif. Voir CONTENT_GAPS.",
  },
  'prix rénovation maison au m2': {
    used: 'NO',
    usedNote: `${NO_PRICING_NOTE} L'ancien guide /guides/prix-renovation-maison (qui citait de vraies fourchettes sourcées) a été retiré et remplacé par /guides/etapes-renovation-maison (sans aucun chiffre).`,
    status: NO_PRICING_STATUS,
    targetPage: '',
  },
  'combien coûte une rénovation maison': { used: 'NO', usedNote: NO_PRICING_NOTE, status: NO_PRICING_STATUS, targetPage: '' },
  'quel budget pour rénover une maison': { used: 'NO', usedNote: NO_PRICING_NOTE, status: NO_PRICING_STATUS, targetPage: '' },
  'prix construction maison au m2': {
    used: 'NO',
    usedNote: `${NO_PRICING_NOTE} Ancien guide /guides/prix-construction-maison retiré, remplacé par /guides/etapes-projet-construction.`,
    status: NO_PRICING_STATUS,
    targetPage: '',
  },
  'prix maçonnerie au m2': {
    used: 'NO',
    usedNote: `${NO_PRICING_NOTE} Ancien guide /guides/prix-maconnerie retiré, remplacé par /guides/comment-choisir-entreprise-maconnerie-toulouse.`,
    status: NO_PRICING_STATUS,
    targetPage: '',
  },
  'combien coûte un maçon': { used: 'NO', usedNote: NO_PRICING_NOTE, status: NO_PRICING_STATUS, targetPage: '' },
  'prix terrassement au m2': {
    used: 'NO',
    usedNote: `${NO_PRICING_NOTE} Ancien guide /guides/prix-terrassement retiré, remplacé par /guides/comment-preparer-chantier-terrassement.`,
    status: NO_PRICING_STATUS,
    targetPage: '',
  },
}

const SUBURB_TARGET_NOTE =
  'Aucune page créée — décision finale Toulouse uniquement (confirmée 2026-08-20). Architecture prête (ZONES dans src/data/zones.ts) si confirmation future.'
const INTL_TARGET_NOTE =
  "Aucune page créée — hors périmètre d'intervention physique de RK Pyrénées (SASU basée à Toulouse). Conservé uniquement comme veille exploratoire — voir INTERNATIONAL_SEO (recommandation) et KEYWORD_CLUSTERING.md §11."

function extractCompetitorNames(competitionText: string): string {
  const m = competitionText.match(/\(([^)]+)\)/)
  if (!m) return 'Voir COMPETITOR_ANALYSIS.md'
  return m[1]
}

// ---------------------------------------------------------------------------
// 3. Build the ALL_KEYWORDS rows (full 29-column schema)
// ---------------------------------------------------------------------------

interface MasterRow {
  id: string
  keyword: string
  language: string
  country: string
  city: string
  cluster: string
  searchIntent: SearchIntentCategory
  commercialIntent: string
  localIntent: string
  trend: string
  trendDirection: string
  searchVolume: string
  competition: string
  keywordDifficulty: string
  cpc: string
  businessValue: string
  priority: string
  targetPage: string
  contentType: string
  serpType: string
  competitors: string
  usedOnWebsite: UsedStatus
  status: string
  source: string
  dataType: DataType
  notes: string
  opportunityOnly: string
}

const masterRows: MasterRow[] = csvKeywords.map((row, i) => {
  const cdef = CLUSTER_DEFAULTS[row.cluster]
  const ov = OVERRIDES[row.keyword] ?? {}
  const isSuburb = row.cluster === 'SUBURBS_CANDIDATE'
  const isIntl = row.cluster === 'INTERNATIONAL_SCAN'
  const used: UsedStatus = ov.used ?? (isSuburb || isIntl ? 'NO' : 'YES')
  const usedNote = ov.usedNote ?? ''

  let notes = row.notes
  if (usedNote) notes = `${notes} | Used On Website: ${usedNote}`
  if (isSuburb) notes = `${notes} | ${SUBURB_TARGET_NOTE}`
  if (isIntl) notes = `${notes} | ${INTL_TARGET_NOTE}`
  if (row.commercial_intent !== 'N/A' || row.local_intent !== 'N/A') {
    notes = `${notes} | Commercial Intent / Local Intent : scores qualitatifs 0-100 attribués par le chercheur (estimation de pertinence), PAS une donnée mesurée par un outil Ads/Analytics — voir Data Type.`
  }

  return {
    id: `K${String(i + 1).padStart(3, '0')}`,
    keyword: row.keyword,
    language: row.language,
    country: row.country,
    city: row.city === 'N/A' ? '' : row.city,
    cluster: row.cluster,
    searchIntent: ov.intent ?? cdef.intent,
    commercialIntent: row.commercial_intent,
    localIntent: row.local_intent,
    trend: row.trend_score,
    trendDirection: row.trend_direction,
    searchVolume: row.search_volume,
    competition: row.competition,
    keywordDifficulty: row.keyword_difficulty,
    cpc: row.CPC,
    businessValue: row.business_value,
    priority: row.priority,
    targetPage: ov.targetPage ?? row.target_page,
    contentType: row.content_type,
    serpType: row.SERP_type,
    competitors: extractCompetitorNames(row.competition),
    usedOnWebsite: used,
    status: ov.status ?? cdef.status,
    source: ov.source ?? cdef.source,
    dataType: ov.dataType ?? cdef.dataType,
    notes,
    opportunityOnly: isIntl ? 'Opportunity / Research Only' : '',
  }
})

/**
 * New non-pricing keywords added for the 6 new guide pages created in this pass (replacing the
 * 4 removed price guides — see src/data/guides.ts). Source = Client-provided: these topics were
 * given directly in the content-strategy instruction (2026-08-20), not derived from a search
 * tool — marked accordingly, not as SEMANTIC INFERENCE, since the topic itself is the client's
 * own direction rather than a researcher's guess. No volume/trend/CPC/difficulty is invented —
 * all N/A, same discipline as the rest of the database.
 */
const NEW_KEYWORD_DEFS: { keyword: string; cluster: string; targetPage: string; priority: string; businessValue: string }[] = [
  { keyword: 'étapes rénovation maison Toulouse', cluster: 'INFORMATIONAL_ETAPES_RENOVATION', targetPage: '/guides/etapes-renovation-maison', priority: 'P2', businessValue: 'N/A (nouveau)' },
  { keyword: 'comment préparer un projet de rénovation', cluster: 'INFORMATIONAL_ETAPES_RENOVATION', targetPage: '/guides/etapes-renovation-maison', priority: 'P2', businessValue: 'N/A (nouveau)' },
  { keyword: 'rénovation maison ancienne étapes', cluster: 'INFORMATIONAL_RENOVATION_ANCIENNE', targetPage: '/guides/renovation-maison-ancienne-etapes', priority: 'P2', businessValue: 'N/A (nouveau)' },
  { keyword: 'étapes projet construction Toulouse', cluster: 'INFORMATIONAL_ETAPES_CONSTRUCTION', targetPage: '/guides/etapes-projet-construction', priority: 'P2', businessValue: 'N/A (nouveau)' },
  { keyword: 'comment choisir une entreprise de maçonnerie Toulouse', cluster: 'INFORMATIONAL_CHOIX_MACONNERIE', targetPage: '/guides/comment-choisir-entreprise-maconnerie-toulouse', priority: 'P2', businessValue: 'N/A (nouveau)' },
  { keyword: 'comment préparer un chantier de terrassement', cluster: 'INFORMATIONAL_PREPARER_TERRASSEMENT', targetPage: '/guides/comment-preparer-chantier-terrassement', priority: 'P3', businessValue: 'N/A (nouveau)' },
  { keyword: 'comment choisir un professionnel pour un dallage extérieur', cluster: 'INFORMATIONAL_CHOIX_DALLAGE', targetPage: '/guides/comment-choisir-professionnel-dallage-exterieur', priority: 'P3', businessValue: 'N/A (nouveau)' },
]

const newKeywordRows: MasterRow[] = NEW_KEYWORD_DEFS.map((d, i) => ({
  id: `K${String(masterRows.length + i + 1).padStart(3, '0')}`,
  keyword: d.keyword,
  language: 'fr',
  country: 'France',
  city: 'Toulouse',
  cluster: d.cluster,
  searchIntent: 'INFORMATIONAL',
  commercialIntent: 'N/A',
  localIntent: 'N/A',
  trend: 'N/A',
  trendDirection: 'N/A',
  searchVolume: 'N/A',
  competition: 'N/A — non recherché (nouveau sujet, remplace un guide de prix retiré)',
  keywordDifficulty: 'N/A',
  cpc: 'N/A',
  businessValue: d.businessValue,
  priority: d.priority,
  targetPage: d.targetPage,
  contentType: 'guide pratique (sans prix)',
  serpType: 'PAA (probable, non vérifié)',
  competitors: 'N/A — non recherché',
  usedOnWebsite: 'YES',
  status: 'Active — nouveau (remplace un guide de prix retiré, décision client 2026-08-20)',
  source: 'Client-provided (directive de stratégie de contenu, 2026-08-20)',
  dataType: 'CLIENT DATA',
  notes: `Sujet fourni directement par le client pour remplacer le contenu tarifaire retiré. Représenté sur ${d.targetPage} (vérifié).`,
  opportunityOnly: '',
}))

masterRows.push(...newKeywordRows)

// ---------------------------------------------------------------------------
// 4. CORE_8_KEYWORDS — highest real business_value, one per major cluster/page (no
//    redundant near-duplicates targeting the same page), selected from the SAME
//    business_value scores already in the CSV — nothing re-scored or invented.
// ---------------------------------------------------------------------------

const CORE_8 = [
  'RK Pyrénées Construction',
  'rénovation maison Toulouse',
  'construction maison Toulouse',
  'maçon Toulouse',
  'extension maison Toulouse',
  'devis rénovation maison gratuit',
  'terrassement Toulouse',
  'dallage Toulouse',
]

const CORE_8_REASONS: Record<string, string> = {
  'RK Pyrénées Construction': "Terme de marque — business_value 100/100, doit être imbattable sur son propre nom (schema Organization/LocalBusiness).",
  'rénovation maison Toulouse': "Cluster n°1 : service le plus recherché et le mieux documenté chez les concurrents directs (Bâti HALLI, Avenir Rénovations). business_value 95/100.",
  'construction maison Toulouse': "Deuxième pilier de service, business_value 90/100, cible /services/construction.",
  'maçon Toulouse': "Terme de tête du cluster maçonnerie (business_value 90/100) — marché dominé par les annuaires, la fiche GBP compte autant que la page.",
  'extension maison Toulouse': "business_value 85/100, cible /services/extension — pas de contenu tarifaire (décision client 2026-08-20), le contenu reste centré sur le savoir-faire et les réalisations.",
  'devis rénovation maison gratuit': "Variante transactionnelle du cluster rénovation (business_value 80/100) — capte l'intention de conversion directe, distincte du terme informationnel.",
  'terrassement Toulouse': "business_value 75/100 — service réellement proposé, maillage fort recommandé avec dallage.",
  'dallage Toulouse': "business_value 70/100 — marché de spécialistes purs (dallage-toulouse.com) où les vraies réalisations RK sont un avantage différenciant.",
}

// ---------------------------------------------------------------------------
// 5. KEYWORD_PAGE_MAP — only keywords with an actual target page (68 of 75; suburbs/
//    international excluded since they intentionally have none).
// ---------------------------------------------------------------------------

const pageMapRows = masterRows
  .filter((r) => r.targetPage.startsWith('/'))
  .map((r) => {
    // Real secondary-page relationships, based on the site's own related-content wiring
    // (ServiceDetail.tsx's relatedServiceSlugs / getGuidesForService — see src/data/services.ts).
    let secondary = ''
    if (r.cluster === 'DALLAGE_TOULOUSE') secondary = '/services/terrassement'
    if (r.cluster === 'TERRASSEMENT_TOULOUSE') secondary = '/services/dallage'
    if (r.cluster === 'EXTENSION_MAISON_TOULOUSE') secondary = '/services/construction'
    if (r.cluster === 'INFORMATIONAL_GUIDE_CHOIX') secondary = '/services/renovation'
    // New non-pricing guide clusters (replace the removed INFORMATIONAL_PRIX_* ones):
    if (r.cluster === 'INFORMATIONAL_ETAPES_RENOVATION') secondary = '/services/renovation'
    if (r.cluster === 'INFORMATIONAL_RENOVATION_ANCIENNE') secondary = '/services/maconnerie'
    if (r.cluster === 'INFORMATIONAL_ETAPES_CONSTRUCTION') secondary = '/services/construction'
    if (r.cluster === 'INFORMATIONAL_CHOIX_MACONNERIE') secondary = '/services/maconnerie'
    if (r.cluster === 'INFORMATIONAL_PREPARER_TERRASSEMENT') secondary = '/services/terrassement'
    if (r.cluster === 'INFORMATIONAL_CHOIX_DALLAGE') secondary = '/services/dallage'

    return {
      keyword: r.keyword,
      primaryPage: r.targetPage,
      secondaryPage: secondary,
      searchIntent: r.searchIntent,
      primarySecondary: 'Primary',
      cannibalizationRisk: 'LOW — un seul cluster cible cette page (voir KEYWORD_CLUSTERING.md, règle anti-cannibalisation)',
      recommendedAnchor: r.cluster.startsWith('INFORMATIONAL')
        ? `Voir le guide : ${r.keyword}`
        : `${r.keyword.replace(/ Toulouse$/i, '')} à Toulouse`,
      status: r.usedOnWebsite === 'YES' ? 'Représenté sur la page' : 'Gap identifié — voir CONTENT_GAPS',
    }
  })

// ---------------------------------------------------------------------------
// 6. CONTENT_GAPS — only the real gaps found while verifying Used On Website above.
// ---------------------------------------------------------------------------

const contentGaps = [
  {
    keyword: 'entreprise maçonnerie Toulouse / entreprise extension maison Toulouse',
    existingPage: '/services/maconnerie, /services/extension',
    missingContent: 'Le mot "entreprise" n\'apparaît sur aucune des deux pages (elles utilisent "Maçon à Toulouse" / "Extension de maison à Toulouse").',
    recommendedPage: '/services/maconnerie, /services/extension',
    intent: 'LOCAL',
    priority: 'P3',
    reason: "Faible effort (ajout d'une phrase), gain SEO ciblé sur une variante de requête déjà identifiée dans la recherche.",
  },
  {
    keyword: 'prix maçonnerie Toulouse / prix terrassement Toulouse / prix dalle béton m2 / prix extension maison Toulouse / extension maison prix m2 / prix rénovation maison au m2 / prix construction maison au m2 / prix maçonnerie au m2 / prix terrassement au m2 / combien coûte une rénovation maison / combien coûte un maçon / quel budget pour rénover une maison',
    existingPage: 'Aucune (les 4 anciens guides de prix ont été retirés du site)',
    missingContent: 'DÉCISION CLIENT (2026-08-20) : aucun contenu tarifaire client, quel qu\'il soit. Ce n\'est plus un gap à combler — c\'est un choix de stratégie assumé, à ne pas "corriger" sans nouvelle instruction du client.',
    recommendedPage: 'Aucune — remplacé par des guides pratiques sans prix (voir /guides/etapes-renovation-maison, /guides/etapes-projet-construction, /guides/comment-choisir-entreprise-maconnerie-toulouse, /guides/comment-preparer-chantier-terrassement).',
    intent: 'COMMERCIAL',
    priority: 'N/A — WILL NOT FIX',
    reason: 'Conservé comme mot-clé de recherche/opportunité dans ALL_KEYWORDS (Status = Research/Opportunity Only), jamais comme cible de contenu publié.',
  },
  {
    keyword: 'surélévation maison Toulouse',
    existingPage: '/services/extension',
    missingContent: 'Le terme "surélévation" (ajout d\'étage) n\'est jamais utilisé — la page reste générale ("agrandir une maison existante").',
    recommendedPage: '/services/extension',
    intent: 'LOCAL',
    priority: 'P3',
    reason: 'Sous-type de service réel non nommé explicitement — à confirmer avec le client que RK réalise bien ce type de travaux avant d\'ajouter le terme.',
  },
  {
    keyword: 'terrasse bois Toulouse',
    existingPage: '/services/amenagement-exterieur',
    missingContent: "La page précise explicitement travailler le béton et la pierre naturelle — pas le bois.",
    recommendedPage: 'N/A — nécessite confirmation client avant toute action',
    intent: 'LOCAL',
    priority: 'P4',
    reason: "Décalage potentiel entre le mot-clé et le périmètre réel du service : ne pas publier de contenu \"terrasse bois\" sans confirmation que RK propose réellement ce type de travaux (risque de contenu non représentatif).",
  },
  {
    keyword: 'entreprise construction Haute-Garonne / rénovation maison Haute-Garonne',
    existingPage: '/services/construction, /services/renovation',
    missingContent: 'Le nom de département "Haute-Garonne" n\'apparaît nulle part sur le site (seul "Toulouse" est utilisé).',
    recommendedPage: '/services/construction, /services/renovation',
    intent: 'LOCAL',
    priority: 'P4',
    reason: "Variante géographique mineure (département vs ville) — faible priorité, gain incertain sans donnée de volume.",
  },
  {
    keyword: 'RK Pyrénées Construction avis',
    existingPage: '/',
    missingContent: 'Aucune section avis/témoignages sur le site.',
    recommendedPage: '/',
    intent: 'NAVIGATIONAL',
    priority: 'P2',
    reason: "Forte intention de réassurance avant contact — mais NE PAS créer de section avis tant qu'aucun avis Google réel et vérifié n'est disponible (voir CURRENT_SITE_AUDIT.md §7). Résoudre en connectant une vraie fiche Google Business Profile, jamais en fabriquant des avis.",
  },
]

// ---------------------------------------------------------------------------
// 7. SOURCES — only sources genuinely used in this project. Dates match the actual
//    session dates recorded in CURRENT_SITE_AUDIT.md / KEYWORD_CLUSTERING.md.
// ---------------------------------------------------------------------------

const sources = [
  {
    source: 'Analyse du site existant (HTML brut, sitemap.xml, robots.txt)',
    url: 'https://xn--rkpyrnesconstruction-f2bb.com/ (ancien site Hostinger)',
    dateChecked: '2026-08-19',
    whatWasObtained: 'Structure de pages, titres/meta actuels, texte, 25 images réelles, 15 vidéos YouTube, témoignages non sourcés — voir CURRENT_SITE_AUDIT.md',
    limitations: 'Pas d\'accès Search Console / Analytics / Google Business Profile pour ce site',
  },
  {
    source: 'Registre public des entreprises françaises (Pappers/RNE)',
    url: 'https://www.pappers.fr (SIREN 951 243 591)',
    dateChecked: '2026-08-19',
    whatWasObtained: 'Raison sociale légale, SIREN/SIRET, forme juridique, date de création, adresse du siège',
    limitations: 'Consultation ponctuelle — à revérifier si le statut de l\'entreprise change',
  },
  {
    source: 'Recherche concurrentielle (WebSearch + WebFetch sur les SERP Google réelles)',
    url: 'Voir COMPETITOR_ANALYSIS.md pour la liste des requêtes et concurrents observés',
    dateChecked: '2026-08-19',
    whatWasObtained: 'Concurrents apparaissant réellement en recherche par cluster, structure de leurs sites, signaux de confiance affichés (avis, FAQ, formulaires)',
    limitations: "Pas d'outil de rank tracking positionné sur Toulouse — positions exactes non garanties. Pas d'outil de backlinks/autorité (Ahrefs/SEMrush/Majestic).",
  },
  {
    source: 'Google Trends',
    url: 'https://trends.google.com/explore',
    dateChecked: '2026-08-19',
    whatWasObtained: 'AUCUNE DONNÉE — tentative bloquée par une erreur 429 (rate-limit)',
    limitations: "Complètement indisponible dans cet environnement. Toutes les colonnes Trend/Trend Direction sont N/A pour cette raison, pas par omission.",
  },
  {
    source: 'Recherche de prix tiers (Effy, Hellowatt, Architecteo, La Maison Des Travaux) — HISTORIQUE, PLUS UTILISÉ',
    url: 'N/A — retiré du site',
    dateChecked: '2026-08-19',
    whatWasObtained:
      "Fourchettes de prix nationales indicatives (rénovation €/m², extension €/m²), utilisées dans les guides de prix d'origine.",
    limitations:
      "Ces guides ont été retirés le 2026-08-20 (décision client : aucun contenu tarifaire client). Cette recherche reste documentée ici pour l'historique mais n'alimente plus aucune page du site actuel — voir src/data/guides.ts.",
  },
  {
    source: 'Brief et échanges avec le client',
    url: 'N/A (communication directe)',
    dateChecked: '2026-08-19 au 2026-08-20',
    whatWasObtained: 'Liste des services réellement proposés, NAP, décision finale "Toulouse uniquement" (2026-08-20), domaine de production confirmé (2026-08-20)',
    limitations: 'Aucune — source la plus fiable du projet pour les faits qu\'elle couvre',
  },
  {
    source: 'Expansion sémantique interne (génération manuelle de variantes de mots-clés)',
    url: 'N/A — travail interne, pas une source externe',
    dateChecked: '2026-08-19',
    whatWasObtained: "La majorité des mots-clés de ce classeur : variantes construites à partir des services réels de RK et du vocabulaire du secteur BTP français, recoupées avec le langage effectivement utilisé par les concurrents observés",
    limitations: "N'est PAS Google Autocomplete, Google Trends, ou People Also Ask — ces outils n'ont pas été utilisés (voir ligne Google Trends ci-dessus). Aucune donnée de volume ne doit être déduite de cette méthode.",
  },
  {
    source: 'Google Keyword Planner / Ahrefs / SEMrush / Google Search Console',
    url: 'N/A',
    dateChecked: 'N/A',
    whatWasObtained: 'AUCUNE — aucun accès à ces outils dans cet environnement',
    limitations: "C'est la raison pour laquelle Search Volume, Keyword Difficulty et CPC sont N/A sur l'ensemble du classeur. À utiliser dès que Search Console sera installé (voir DEPLOYMENT.md #7 et seo/README.md).",
  },
]

// ---------------------------------------------------------------------------
// 8. Build the workbook
// ---------------------------------------------------------------------------

async function main() {
  const wb = new ExcelJS.Workbook()
  wb.creator = 'RK Pyrénées Construction — SEO keyword research'
  wb.created = new Date('2026-08-20')

  const HEADER_FILL: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1B1B15' } }
  const HEADER_FONT: Partial<ExcelJS.Font> = { color: { argb: 'FFFFFFFF' }, bold: true }

  function styleHeader(ws: ExcelJS.Worksheet) {
    const headerRow = ws.getRow(1)
    headerRow.eachCell((cell) => {
      cell.fill = HEADER_FILL
      cell.font = HEADER_FONT
      cell.alignment = { vertical: 'middle', wrapText: true }
    })
    headerRow.height = 30
    ws.views = [{ state: 'frozen', ySplit: 1 }]
    ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: ws.columns.length } }
  }

  // --- Sheet 1: CORE_8_KEYWORDS ---
  const wsCore = wb.addWorksheet('CORE_8_KEYWORDS')
  wsCore.columns = [
    { header: 'Rank', key: 'rank', width: 7 },
    { header: 'Keyword', key: 'keyword', width: 34 },
    { header: 'Cluster', key: 'cluster', width: 30 },
    { header: 'Intent', key: 'intent', width: 14 },
    { header: 'Commercial Intent', key: 'commercialIntent', width: 16 },
    { header: 'Local Intent', key: 'localIntent', width: 13 },
    { header: 'Search Volume', key: 'searchVolume', width: 14 },
    { header: 'Trend', key: 'trend', width: 10 },
    { header: 'Competition', key: 'competition', width: 42 },
    { header: 'Business Value', key: 'businessValue', width: 16 },
    { header: 'Target Page', key: 'targetPage', width: 26 },
    { header: 'Reason', key: 'reason', width: 60 },
  ]
  CORE_8.forEach((kw, i) => {
    const r = masterRows.find((m) => m.keyword === kw)!
    wsCore.addRow({
      rank: i + 1,
      keyword: r.keyword,
      cluster: r.cluster,
      intent: r.searchIntent,
      commercialIntent: r.commercialIntent,
      localIntent: r.localIntent,
      searchVolume: r.searchVolume,
      trend: r.trend,
      competition: r.competition,
      businessValue: r.businessValue,
      targetPage: r.targetPage,
      reason: CORE_8_REASONS[kw],
    })
  })
  styleHeader(wsCore)
  wsCore.eachRow((row, i) => {
    if (i === 1) return
    row.alignment = { vertical: 'top', wrapText: true }
  })

  // --- Sheet 2: ALL_KEYWORDS ---
  const wsAll = wb.addWorksheet('ALL_KEYWORDS')
  wsAll.columns = [
    { header: 'ID', key: 'id', width: 8 },
    { header: 'Keyword', key: 'keyword', width: 32 },
    { header: 'Language', key: 'language', width: 10 },
    { header: 'Country', key: 'country', width: 10 },
    { header: 'City', key: 'city', width: 12 },
    { header: 'Cluster', key: 'cluster', width: 30 },
    { header: 'Search Intent', key: 'searchIntent', width: 14 },
    { header: 'Commercial Intent', key: 'commercialIntent', width: 15 },
    { header: 'Local Intent', key: 'localIntent', width: 12 },
    { header: 'Trend', key: 'trend', width: 9 },
    { header: 'Trend Direction', key: 'trendDirection', width: 13 },
    { header: 'Search Volume', key: 'searchVolume', width: 13 },
    { header: 'Competition', key: 'competition', width: 45 },
    { header: 'Keyword Difficulty', key: 'keywordDifficulty', width: 15 },
    { header: 'CPC', key: 'cpc', width: 8 },
    { header: 'Business Value', key: 'businessValue', width: 15 },
    { header: 'Priority', key: 'priority', width: 9 },
    { header: 'Target Page', key: 'targetPage', width: 26 },
    { header: 'Content Type', key: 'contentType', width: 24 },
    { header: 'SERP Type', key: 'serpType', width: 22 },
    { header: 'Competitors', key: 'competitors', width: 45 },
    { header: 'Used On Website', key: 'usedOnWebsite', width: 15 },
    { header: 'Status', key: 'status', width: 30 },
    { header: 'Source', key: 'source', width: 34 },
    { header: 'Data Type', key: 'dataType', width: 18 },
    { header: 'Opportunity Only', key: 'opportunityOnly', width: 20 },
    { header: 'Notes', key: 'notes', width: 70 },
  ]
  masterRows.forEach((r) => wsAll.addRow(r))
  styleHeader(wsAll)
  wsAll.eachRow((row, i) => {
    if (i === 1) return
    row.alignment = { vertical: 'top', wrapText: true }
  })
  // Conditional formatting: Used On Website (col 21) and Priority (col 17)
  wsAll.addConditionalFormatting({
    ref: `U2:U${masterRows.length + 1}`,
    rules: [
      { type: 'containsText', operator: 'containsText', text: 'YES', priority: 1, style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFDCF5E0' } } } },
      { type: 'containsText', operator: 'containsText', text: 'NO', priority: 2, style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFDE7E7' } } } },
    ],
  })
  wsAll.addConditionalFormatting({
    ref: `Q2:Q${masterRows.length + 1}`,
    rules: [
      { type: 'containsText', operator: 'containsText', text: 'P1', priority: 1, style: { font: { bold: true }, fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFFF1D6' } } } },
    ],
  })

  // --- Sheet 3: KEYWORD_PAGE_MAP ---
  const wsMap = wb.addWorksheet('KEYWORD_PAGE_MAP')
  wsMap.columns = [
    { header: 'Keyword', key: 'keyword', width: 34 },
    { header: 'Primary Page', key: 'primaryPage', width: 24 },
    { header: 'Secondary Page', key: 'secondaryPage', width: 24 },
    { header: 'Search Intent', key: 'searchIntent', width: 14 },
    { header: 'Primary/Secondary', key: 'primarySecondary', width: 16 },
    { header: 'Cannibalization Risk', key: 'cannibalizationRisk', width: 55 },
    { header: 'Recommended Anchor', key: 'recommendedAnchor', width: 40 },
    { header: 'Status', key: 'status', width: 30 },
  ]
  pageMapRows.forEach((r) => wsMap.addRow(r))
  styleHeader(wsMap)
  wsMap.eachRow((row, i) => {
    if (i === 1) return
    row.alignment = { vertical: 'top', wrapText: true }
  })

  // --- Sheet 4: CONTENT_GAPS ---
  const wsGaps = wb.addWorksheet('CONTENT_GAPS')
  wsGaps.columns = [
    { header: 'Keyword', key: 'keyword', width: 55 },
    { header: 'Existing Page', key: 'existingPage', width: 34 },
    { header: 'Missing Content', key: 'missingContent', width: 55 },
    { header: 'Recommended Page', key: 'recommendedPage', width: 40 },
    { header: 'Intent', key: 'intent', width: 13 },
    { header: 'Priority', key: 'priority', width: 9 },
    { header: 'Reason', key: 'reason', width: 60 },
  ]
  contentGaps.forEach((r) => wsGaps.addRow(r))
  styleHeader(wsGaps)
  wsGaps.eachRow((row, i) => {
    if (i === 1) return
    row.alignment = { vertical: 'top', wrapText: true }
  })

  // --- Sheet 5: SOURCES ---
  const wsSources = wb.addWorksheet('SOURCES')
  wsSources.columns = [
    { header: 'Source', key: 'source', width: 45 },
    { header: 'URL', key: 'url', width: 45 },
    { header: 'Date Checked', key: 'dateChecked', width: 16 },
    { header: 'What Was Obtained', key: 'whatWasObtained', width: 60 },
    { header: 'Limitations', key: 'limitations', width: 60 },
  ]
  sources.forEach((r) => wsSources.addRow(r))
  styleHeader(wsSources)
  wsSources.eachRow((row, i) => {
    if (i === 1) return
    row.alignment = { vertical: 'top', wrapText: true }
  })

  await wb.xlsx.writeFile(OUT_PATH)
  console.log(`[generate-keyword-workbook] Wrote ${OUT_PATH}`)
  console.log(`  CORE_8_KEYWORDS: ${CORE_8.length} rows`)
  console.log(`  ALL_KEYWORDS: ${masterRows.length} rows`)
  console.log(`  KEYWORD_PAGE_MAP: ${pageMapRows.length} rows`)
  console.log(`  CONTENT_GAPS: ${contentGaps.length} rows`)
  console.log(`  SOURCES: ${sources.length} rows`)
  const usedYes = masterRows.filter((r) => r.usedOnWebsite === 'YES').length
  const usedNo = masterRows.length - usedYes
  const researchOnly = masterRows.filter((r) => r.opportunityOnly).length
  console.log(`  Used On Website = YES: ${usedYes}, NO: ${usedNo}, Research-Only (international): ${researchOnly}`)
}

main().catch((err) => {
  console.error('[generate-keyword-workbook] Failed:', err)
  process.exit(1)
})
