/**
 * SEO regression test — run after `npm run build` (reads the real prerendered dist/ output, not
 * source files, so it catches what actually ships). See task brief §27.
 *
 * Checks, per prerendered route:
 *  - exactly one <title>, non-empty
 *  - exactly one meta description, non-empty
 *  - exactly one canonical <link>, matching the route's real URL
 *  - exactly one <h1>
 *  - every <script type="application/ld+json"> block parses as valid JSON
 *  - no reference to an old/wrong domain
 *
 * Site-wide checks:
 *  - no <title> or meta description reused across two routes
 *  - no sitemap URL shipping a noindex robots meta
 *  - <lastmod> values are not all identical and never in the future
 *  - every prerendered route appears in the sitemap (and vice versa)
 *  - no route is orphaned (reachable only via the sitemap)
 *  - every sitemap.xml URL uses the configured production domain and has a matching
 *    dist/<route>/index.html (or dist/index.html for "/")
 *  - no pricing route ("prix-", "/tarif", "combien-coute") in the sitemap — client decision,
 *    see CONTENT_STRATEGY_NO_PRICING.md
 *  - no fake city route (a commune slug with no confirmed per-city page — see
 *    KEYWORD_CLUSTERING.md §"SUBURBS_CANDIDATE") in the sitemap
 *  - robots.txt references the same sitemap URL
 *
 * Exits non-zero (and prints every failure) if anything fails, so this can be wired into CI
 * later. Run via `npm run seo:audit` after a build.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolveSiteUrl } from './resolveSiteUrl.ts'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIST_DIR = join(ROOT, 'dist')
const SITE_URL = resolveSiteUrl(ROOT)

// Old/placeholder domains that must never appear in shipped output.
const FORBIDDEN_DOMAINS = ['assets.zyrosite.com/cdn-cgi', 'example.com', 'localhost']

// Client decision (2026-08-20): no customer-facing pricing content/URLs anywhere.
const PRICING_URL_PATTERNS = [/\/prix-/, /\/tarif/, /combien-coute/]

// No fake per-commune landing pages without explicit, verified client confirmation — see
// KEYWORD_CLUSTERING.md §"SUBURBS_CANDIDATE" and CONTENT_STRATEGY rules in the task brief §1.
const FAKE_CITY_SLUGS = ['blagnac', 'colomiers', 'balma', 'tournefeuille', 'muret', 'cugnaux', 'l-union', 'castanet']

const titlesSeen = new Map<string, string[]>()
const descsSeen = new Map<string, string[]>()

const failures: string[] = []
const fail = (msg: string) => failures.push(msg)

function readSitemapUrls(): string[] {
  const path = join(ROOT, 'public/sitemap.xml')
  if (!existsSync(path)) {
    fail('public/sitemap.xml not found')
    return []
  }
  const xml = readFileSync(path, 'utf8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

function routePathToDistFile(routePath: string): string {
  return routePath === '/' ? join(DIST_DIR, 'index.html') : join(DIST_DIR, routePath.replace(/^\//, ''), 'index.html')
}

function auditSitemap() {
  const urls = readSitemapUrls()
  if (urls.length === 0) {
    fail('sitemap.xml has no <loc> entries')
    return urls
  }
  for (const url of urls) {
    if (!url.startsWith(SITE_URL)) {
      fail(`sitemap URL does not use the configured production domain (${SITE_URL}): ${url}`)
      continue
    }
    for (const bad of FORBIDDEN_DOMAINS) {
      if (url.includes(bad)) fail(`sitemap URL references a forbidden/old domain fragment "${bad}": ${url}`)
    }
    for (const pattern of PRICING_URL_PATTERNS) {
      if (pattern.test(url)) fail(`sitemap contains a pricing-pattern URL (client rejected customer-facing pricing pages): ${url}`)
    }
    for (const slug of FAKE_CITY_SLUGS) {
      if (url.toLowerCase().includes(`/macon-${slug}`) || url.toLowerCase().includes(`-${slug}`)) {
        fail(`sitemap contains a suspected fake city-landing-page URL for "${slug}": ${url}`)
      }
    }
    const routePath = url.slice(SITE_URL.length) || '/'
    const distFile = routePathToDistFile(routePath)
    if (!existsSync(distFile)) {
      fail(`sitemap URL has no matching prerendered file (expected ${distFile.replace(ROOT, '.')}): ${url}`)
    }
  }
  return urls
}

/**
 * <lastmod> must be a real per-page date. Two regressions this catches, both of which have
 * actually shipped to production on this project:
 *   - every URL carrying the same timestamp (a site-wide file counted as page content, or a
 *     shallow CI checkout where `git log -1` returns HEAD for every path);
 *   - a date in the future, which is what a fabricated "now" looks like when clocks disagree.
 * Missing lastmod is NOT a failure: generate-seo-files.ts omits it on purpose when git cannot
 * answer, and an absent signal beats a wrong one.
 */
function auditLastmod() {
  const path = join(ROOT, 'public/sitemap.xml')
  if (!existsSync(path)) return
  const xml = readFileSync(path, 'utf8')
  const dates = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1])
  if (dates.length === 0) return
  const distinct = new Set(dates)
  if (dates.length >= 5 && distinct.size === 1) {
    fail(`sitemap: all ${dates.length} <lastmod> values are identical (${dates[0]}) — a site-wide file is being counted as page content, or the checkout is shallow (CI needs fetch-depth: 0)`)
  }
  const now = Date.now()
  for (const d of distinct) {
    const t = Date.parse(d)
    if (Number.isNaN(t)) fail(`sitemap: <lastmod> is not a parsable date: ${d}`)
    else if (t > now + 24 * 60 * 60 * 1000) fail(`sitemap: <lastmod> is in the future (${d}) — dates must come from real commit history, never a fabricated "now"`)
  }
}

/**
 * Every prerendered route must be in the sitemap, and vice versa. auditSitemap() already covers
 * sitemap -> dist; this covers dist -> sitemap, which is how a new page ends up shipped but
 * undeclared. 404.html is excluded: it is noindex and deliberately absent from the sitemap.
 */
function auditSitemapCoverage(urls: string[]) {
  const declared = new Set(urls.map((u) => (u.startsWith(SITE_URL) ? u.slice(SITE_URL.length) || '/' : u)))
  const walk = (dir: string, prefix: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      if (entry.name === 'assets' || entry.name === 'images' || entry.name === 'logo') continue
      const routePath = `${prefix}${entry.name}/`
      if (existsSync(join(dir, entry.name, 'index.html')) && !declared.has(routePath)) {
        fail(`prerendered route is missing from sitemap.xml: ${routePath}`)
      }
      walk(join(dir, entry.name), routePath)
    }
  }
  walk(DIST_DIR, '/')
}

/**
 * An important route nobody links to is discoverable only through the sitemap, which is exactly
 * the state /services/dallage/ was in when Google reported it as an unknown URL on 2026-09-08.
 * Counts real <a href> occurrences across the other prerendered pages, ignoring self-links.
 */
function auditOrphanRoutes(urls: string[]) {
  const routes = urls.map((u) => (u.startsWith(SITE_URL) ? u.slice(SITE_URL.length) || '/' : u)).filter((r) => r !== '/')
  const htmlByRoute = new Map<string, string>()
  for (const r of routes) {
    const f = routePathToDistFile(r)
    if (existsSync(f)) htmlByRoute.set(r, readFileSync(f, 'utf8'))
  }
  const home = routePathToDistFile('/')
  if (existsSync(home)) htmlByRoute.set('/', readFileSync(home, 'utf8'))
  for (const target of routes) {
    let inbound = 0
    for (const [source, html] of htmlByRoute) {
      if (source === target) continue
      if (html.includes(`href="${target}"`)) inbound++
    }
    if (inbound === 0) fail(`orphan route — no other prerendered page links to it: ${target}`)
  }
}

function auditRobots() {
  const path = join(ROOT, 'public/robots.txt')
  if (!existsSync(path)) {
    fail('public/robots.txt not found')
    return
  }
  const txt = readFileSync(path, 'utf8')
  if (!txt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
    fail(`robots.txt does not reference the sitemap at the configured domain (${SITE_URL})`)
  }
}

function auditPrerenderedPage(routePath: string) {
  const distFile = routePathToDistFile(routePath)
  if (!existsSync(distFile)) return // already reported by auditSitemap
  const html = readFileSync(distFile, 'utf8')
  const label = `[${routePath}]`

  const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)]
  if (titles.length !== 1) fail(`${label} expected exactly 1 <title>, found ${titles.length}`)
  else if (!titles[0][1].trim()) fail(`${label} <title> is empty`)
  else titlesSeen.set(titles[0][1].trim(), [...(titlesSeen.get(titles[0][1].trim()) ?? []), routePath])

  const descs = [...html.matchAll(/<meta name="description" content="([^"]*)"/g)]
  if (descs.length !== 1) fail(`${label} expected exactly 1 meta description, found ${descs.length}`)
  else if (!descs[0][1].trim()) fail(`${label} meta description is empty`)
  else descsSeen.set(descs[0][1].trim(), [...(descsSeen.get(descs[0][1].trim()) ?? []), routePath])

  // A sitemap URL that ships with noindex is a contradiction: we are asking Google to crawl a
  // page we are simultaneously telling it not to keep.
  if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) {
    fail(`${label} is in the sitemap but ships a noindex robots meta`)
  }

  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)]
  if (canonicals.length !== 1) fail(`${label} expected exactly 1 canonical link, found ${canonicals.length}`)
  else {
    const expected = `${SITE_URL}${routePath}`
    if (canonicals[0][1] !== expected) fail(`${label} canonical is "${canonicals[0][1]}", expected "${expected}"`)
  }

  const h1s = [...html.matchAll(/<h1[\s>]/g)]
  if (h1s.length !== 1) fail(`${label} expected exactly 1 <h1>, found ${h1s.length}`)

  for (const bad of FORBIDDEN_DOMAINS) {
    if (html.includes(bad)) fail(`${label} references a forbidden/old domain fragment "${bad}"`)
  }

  const ldJsonBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  for (const [, block] of ldJsonBlocks) {
    try {
      JSON.parse(block)
    } catch (err) {
      fail(`${label} contains invalid JSON-LD: ${(err as Error).message}`)
    }
  }
}

function auditOptimizedImages() {
  const manifestPath = join(ROOT, 'src/data/imageManifest.json')
  const outDir = join(ROOT, 'public/images/optimized')
  if (!existsSync(manifestPath)) {
    fail('src/data/imageManifest.json not found')
    return
  }
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<
    string,
    { variants: { file: string }[] }
  >
  const onDisk = existsSync(outDir) ? new Set(readdirSync(outDir)) : new Set<string>()
  for (const [stem, entry] of Object.entries(manifest)) {
    for (const variant of entry.variants) {
      if (!onDisk.has(variant.file)) fail(`imageManifest.json references missing file: ${variant.file} (stem "${stem}")`)
    }
  }
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error('[seo-audit] dist/ not found — run `npm run build` first.')
    process.exit(1)
  }

  auditRobots()
  auditLastmod()
  const urls = auditSitemap()
  auditSitemapCoverage(urls)
  auditOrphanRoutes(urls)
  for (const url of urls) {
    const routePath = url.startsWith(SITE_URL) ? url.slice(SITE_URL.length) || '/' : null
    if (routePath) auditPrerenderedPage(routePath)
  }
  for (const [title, routes] of titlesSeen) {
    if (routes.length > 1) fail(`duplicate <title> across ${routes.length} routes (${routes.join(', ')}): "${title}"`)
  }
  for (const [desc, routes] of descsSeen) {
    if (routes.length > 1) fail(`duplicate meta description across ${routes.length} routes (${routes.join(', ')}): "${desc.slice(0, 60)}…"`)
  }
  auditOptimizedImages()

  if (failures.length > 0) {
    console.error(`[seo-audit] ${failures.length} issue(s) found:\n`)
    for (const f of failures) console.error(`  ✗ ${f}`)
    process.exit(1)
  }

  console.log(`[seo-audit] OK — ${urls.length} route(s) checked, no issues found (site URL: ${SITE_URL}).`)
}

main().catch((err) => {
  console.error('[seo-audit] Failed:', err)
  process.exit(1)
})
