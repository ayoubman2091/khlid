/**
 * Generates public/robots.txt and public/sitemap.xml from a single source of truth
 * (seo/pageMeta.ts's staticRoutes(), itself derived from the real SERVICES/REALISATIONS/GUIDES
 * data — see audit item #14). Reads staticRoutes() through the already-built SSR bundle
 * (dist-ssr/entry-server.js) rather than importing src/seo/pageMeta.ts directly, because that
 * file (like most of src/) uses the `@/` path alias, which only Vite's bundler resolves — a
 * plain `node` import of the raw .ts file would fail to resolve it. Must run AFTER the SSR
 * build and BEFORE the client `vite build`, so the generated files land in dist/ via Vite's
 * normal public/ passthrough — see the "build" script in package.json.
 *
 * The domain comes from VITE_SITE_URL, resolved via scripts/resolveSiteUrl.ts (same resolution
 * `vite build` uses — reads .env.production) — see audit item #6 / DEPLOYMENT.md #1.
 *
 * -- lastmod (revised 2026-09-08) ---------------------------------------------------------
 * Audit item #15 removed lastmod because the only thing on offer at the time was `new Date()`
 * stamped on all 26 URLs — a date that says "everything changed today" on every single build,
 * which is a fabricated freshness signal and correctly rejected.
 *
 * That reasoning ruled out fake dates; it did not rule out real ones. This repository has a
 * genuine per-page modification timestamp and always did: the commit history of the files that
 * actually produce each page. `git log -1 --format=%cI -- <files>` is the real date the content
 * behind a URL last changed, sourced rather than invented, and it is exactly what
 * sitemaps.org's <lastmod> asks for.
 *
 * Rules kept deliberately strict, so this can never silently degrade back into a fake signal:
 *   - A route's date comes only from the files whose content genuinely determines that page
 *     (sourcesForRoute below) — a CSS tweak must not "refresh" all 26 URLs.
 *   - If git is unavailable, the checkout is shallow, or a file has no history, lastmod is
 *     OMITTED for that URL. It is never replaced by today's date, and the build does not fail:
 *     an absent lastmod is a missing signal, a wrong one is a misleading signal.
 *
 * Element order inside <url> is also fixed here: the sitemap XSD requires
 * loc -> lastmod -> changefreq -> priority, and the previous output emitted priority before
 * changefreq. Google tolerates it; validators do not.
 */
import { writeFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolveSiteUrl } from './resolveSiteUrl.ts'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SSR_ENTRY = join(ROOT, 'dist-ssr/entry-server.js')
const SITE_URL = resolveSiteUrl(ROOT)

/**
 * Routes whose visible copy (title, description, headings) is written inline in pageMeta.ts
 * rather than pulled from a data file. Only these may take pageMeta.ts as a lastmod source —
 * for /services/<slug>, /guides/<slug> and /realisations/<slug> the copy lives in
 * data/services.ts, data/guides.ts and data/realisations.ts, which are listed per route below.
 *
 * src/seo/schema.ts is deliberately NOT a source for anything. It wires JSON-LD site-wide, so
 * counting it would stamp every one of the 26 URLs with the same date the moment it is touched
 * — precisely the "everything changed today" signal audit item #15 rejected. Verified the hard
 * way: the first version of this file included it, and the very commit that shipped it flattened
 * all 26 lastmod values to one identical timestamp. Structured-data plumbing is not page
 * content; do not add it back.
 */
const META_INLINE_ROUTES = new Set([
  '/', '/services', '/realisations', '/guides', '/a-propos', '/zones-intervention', '/contact', '/devis',
])

/**
 * The files whose content actually renders each route. Anything not listed for a route cannot
 * move that route's lastmod — that constraint is the whole point.
 */
function sourcesForRoute(path: string): string[] {
  const own = (() => {
    if (path === '/') return ['src/pages/Home.tsx', 'src/data/services.ts', 'src/data/faq.ts', 'src/data/realisations.ts']
    if (path === '/services') return ['src/pages/ServicesHub.tsx', 'src/data/services.ts']
    if (path === '/realisations') return ['src/pages/Realisations.tsx', 'src/data/realisations.ts']
    if (path === '/guides') return ['src/pages/GuidesIndex.tsx', 'src/data/guides.ts']
    if (path === '/a-propos') return ['src/pages/About.tsx', 'src/lib/constants.ts']
    if (path === '/zones-intervention') return ['src/pages/ServiceAreasPage.tsx', 'src/data/zones.ts', 'src/lib/constants.ts']
    if (path === '/contact') return ['src/pages/Contact.tsx', 'src/lib/constants.ts']
    if (path === '/devis') return ['src/pages/Quote.tsx', 'src/components/sections/QuoteForm.tsx']
    if (path.startsWith('/services/')) return ['src/data/services.ts', 'src/pages/ServiceDetail.tsx']
    if (path.startsWith('/realisations/')) return ['src/data/realisations.ts', 'src/pages/RealisationDetail.tsx']
    if (path.startsWith('/guides/')) return ['src/data/guides.ts', 'src/pages/Guide.tsx']
    return []
  })()
  const meta = META_INLINE_ROUTES.has(path) ? ['src/seo/pageMeta.ts'] : []
  return [...own, ...meta].filter((f) => existsSync(join(ROOT, f)))
}

let gitUsable = true

/** Last commit date (ISO 8601) touching any of `files`, or null when git cannot answer. */
function lastCommitDate(files: string[]): string | null {
  if (!gitUsable || files.length === 0) return null
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return out || null
  } catch {
    // No git binary, not a repository, or a shallow checkout with no history for these paths.
    // Flip the flag so the remaining routes do not each pay for a failing subprocess.
    gitUsable = false
    return null
  }
}

async function main() {
  if (!existsSync(SSR_ENTRY)) {
    console.error('[generate-seo-files] dist-ssr/entry-server.js not found — run the SSR build first (see package.json "build" script).')
    process.exit(1)
  }

  const { staticRoutes, canonicalPath } = (await import(pathToFileURL(SSR_ENTRY).href)) as {
    staticRoutes: () => { path: string; priority: number; changefreq: string }[]
    canonicalPath: (path: string) => string
  }

  const routes = staticRoutes()
  let withLastmod = 0
  const seenDates = new Set<string>()

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((r) => {
      // <loc> must be the URL that actually returns 200 — see src/seo/canonicalPath.ts.
      const loc = `${SITE_URL}${canonicalPath(r.path)}`
      const date = lastCommitDate(sourcesForRoute(r.path))
      if (date) {
        withLastmod++
        seenDates.add(date)
      }
      // Order is fixed by the sitemap schema: loc, lastmod, changefreq, priority.
      return [
        '  <url>',
        `<loc>${loc}</loc>`,
        date ? `<lastmod>${date}</lastmod>` : '',
        `<changefreq>${r.changefreq}</changefreq>`,
        `<priority>${r.priority.toFixed(1)}</priority>`,
        '</url>',
      ].join('')
    }),
    '</urlset>',
    '',
  ].join('\n')

  const robots = [`User-agent: *`, `Allow: /`, '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n')

  writeFileSync(join(ROOT, 'public/sitemap.xml'), sitemap)
  writeFileSync(join(ROOT, 'public/robots.txt'), robots)

  console.log(`[generate-seo-files] Wrote public/sitemap.xml (${routes.length} URLs, ${withLastmod} with a real lastmod) and public/robots.txt for ${SITE_URL}`)
  if (withLastmod < routes.length) {
    console.warn(`[generate-seo-files] ${routes.length - withLastmod} URL(s) have no lastmod — git history unavailable for their sources. Emitting none is intentional; do not substitute a build date.`)
  }
  // A real per-page date varies per page. One date shared by nearly every URL means some
  // site-wide file has crept into sourcesForRoute(), or the checkout is shallow — either way the
  // signal has degenerated into "everything changed today", the exact thing this avoids.
  if (withLastmod >= 5 && seenDates.size === 1) {
    console.error(`[generate-seo-files] All ${withLastmod} lastmod values are identical (${[...seenDates][0]}).`)
    console.error('[generate-seo-files] Two known causes: (1) a site-wide file has been added to sourcesForRoute(); (2) the checkout is shallow, so `git log -1` returns the HEAD commit for every path — CI needs `fetch-depth: 0` on actions/checkout.')
    console.error('[generate-seo-files] Failing the build on purpose: a sitemap claiming all 26 pages changed at the same instant is a worse signal than no sitemap dates at all.')
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('[generate-seo-files] Failed:', err)
  process.exit(1)
})
