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

  const descs = [...html.matchAll(/<meta name="description" content="([^"]*)"/g)]
  if (descs.length !== 1) fail(`${label} expected exactly 1 meta description, found ${descs.length}`)
  else if (!descs[0][1].trim()) fail(`${label} meta description is empty`)

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
  const urls = auditSitemap()
  for (const url of urls) {
    const routePath = url.startsWith(SITE_URL) ? url.slice(SITE_URL.length) || '/' : null
    if (routePath) auditPrerenderedPage(routePath)
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
