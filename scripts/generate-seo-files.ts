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
 * The domain comes from VITE_SITE_URL (falls back to the placeholder documented in
 * lib/constants.ts) — see audit item #6 / DEPLOYMENT.md #1.
 *
 * lastmod is intentionally omitted (see audit item #15): this project doesn't track real
 * per-page modification dates, and a fabricated "today" date on every page is exactly the
 * fake-freshness signal the audit called out. Add real lastmod values later only when backed
 * by an actual content-modification timestamp (e.g. from git history or a CMS).
 */
import { writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SSR_ENTRY = join(ROOT, 'dist-ssr/entry-server.js')
const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://www.rk-pyrenees-construction.fr').replace(/\/$/, '')

async function main() {
  if (!existsSync(SSR_ENTRY)) {
    console.error('[generate-seo-files] dist-ssr/entry-server.js not found — run the SSR build first (see package.json "build" script).')
    process.exit(1)
  }

  const { staticRoutes } = (await import(pathToFileURL(SSR_ENTRY).href)) as {
    staticRoutes: () => { path: string; priority: number; changefreq: string }[]
  }

  const routes = staticRoutes()

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(
      (r) => `  <url><loc>${SITE_URL}${r.path}</loc><priority>${r.priority.toFixed(1)}</priority><changefreq>${r.changefreq}</changefreq></url>`,
    ),
    '</urlset>',
    '',
  ].join('\n')

  const robots = [`User-agent: *`, `Allow: /`, '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n')

  writeFileSync(join(ROOT, 'public/sitemap.xml'), sitemap)
  writeFileSync(join(ROOT, 'public/robots.txt'), robots)

  console.log(`[generate-seo-files] Wrote public/sitemap.xml (${routes.length} URLs) and public/robots.txt for ${SITE_URL}`)
}

main().catch((err) => {
  console.error('[generate-seo-files] Failed:', err)
  process.exit(1)
})
