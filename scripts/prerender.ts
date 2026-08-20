/**
 * Generates real per-route static HTML in dist/ after `vite build` — see audit item #13.
 *
 * For each route in seo/pageMeta.ts's staticRoutes(): resolves that route's metadata via
 * getMetaForPath() (title/description/canonical/OG/JSON-LD — the exact same function SEO.tsx
 * uses client-side, so there is one metadata source, not two that can drift) and renders the
 * real page body via the SSR bundle (dist-ssr/entry-server.js, built from src/entry-server.tsx
 * — see that file for why it's a separate eager-import entry rather than App.tsx's lazy one).
 * Writes dist/index.html for `/` and dist/<route>/index.html for every other route, so a
 * static host serving "pretty URLs" (Netlify/Vercel default behavior, matching
 * netlify.toml/vercel.json) resolves each clean URL to real, route-specific HTML — not one
 * generic shell for every page.
 *
 * Run via `npm run build` (chained after both the client and SSR vite builds).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolveSiteUrl } from './resolveSiteUrl.ts'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIST_DIR = join(ROOT, 'dist')
const SSR_ENTRY = join(ROOT, 'dist-ssr/entry-server.js')
const SITE_URL = resolveSiteUrl(ROOT)

interface PageMeta {
  title: string
  description: string
  path: string
  image?: string
  schemas: object[]
  noindex?: boolean
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Removes any tags a PREVIOUS run of this script already injected. Makes the script
 *  idempotent — re-running it against an already-prerendered dist/index.html (e.g. someone
 *  runs `npm run prerender` twice without an intervening `vite build`) produces the same
 *  output instead of silently duplicating every meta tag and JSON-LD block. */
function stripPreviousInjection(html: string): string {
  return html
    .replace(/\s*<meta name="robots"[^>]*>/g, '')
    .replace(/\s*<link rel="canonical"[^>]*>/g, '')
    .replace(/\s*<meta property="og:[a-z_]+"[^>]*>/g, '')
    .replace(/\s*<meta name="twitter:[a-z_]+"[^>]*>/g, '')
    .replace(/\s*<script type="application\/ld\+json">.*?<\/script>/gs, '')
    // Non-greedy + anchored on the closing </body> so this matches exactly the outermost
    // #root wrapper (however much nested markup a previous prerender put inside it), not an
    // over-greedy span ending at some unrelated later </div> in the document.
    .replace(/<div id="root">[\s\S]*?<\/div>\s*(?=<\/body>)/, '<div id="root"></div>')
}

function injectMeta(template: string, meta: PageMeta, bodyHtml: string): string {
  let html = stripPreviousInjection(template)

  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(meta.title)}</title>`)
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
  )

  const canonicalUrl = `${SITE_URL}${meta.path}`
  const extraTags = [
    `<meta name="robots" content="${meta.noindex ? 'noindex, nofollow' : 'index, follow'}" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="RK Pyrénées Construction" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    meta.image ? `<meta property="og:image" content="${escapeHtml(meta.image)}" />` : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    meta.image ? `<meta name="twitter:image" content="${escapeHtml(meta.image)}" />` : '',
    ...meta.schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`),
  ]
    .filter(Boolean)
    .join('\n    ')

  html = html.replace('</head>', `    ${extraTags}\n  </head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)
  return html
}

async function main() {
  if (!existsSync(join(DIST_DIR, 'index.html'))) {
    console.error('[prerender] dist/index.html not found — run `vite build` first.')
    process.exit(1)
  }
  if (!existsSync(SSR_ENTRY)) {
    console.error('[prerender] dist-ssr/entry-server.js not found — run the SSR build first (see package.json "build" script).')
    process.exit(1)
  }

  const mod = await import(pathToFileURL(SSR_ENTRY).href)
  const { render, staticRoutes, getMetaForPath } = mod as {
    render: (url: string) => string
    staticRoutes: () => { path: string }[]
    getMetaForPath: (path: string) => PageMeta
  }

  let template = readFileSync(join(DIST_DIR, 'index.html'), 'utf8')
  // Vite's HTML env replacement leaves %VITE_GSC_VERIFICATION% literal when the var is unset
  // (it only warns, doesn't strip) — remove the whole tag rather than ship a placeholder
  // string as a meta tag's content in production HTML. See index.html and DEPLOYMENT.md #7.
  const gscValue = process.env.VITE_GSC_VERIFICATION
  template = gscValue
    ? template.replace('%VITE_GSC_VERIFICATION%', gscValue)
    : template.replace(/\s*<meta name="google-site-verification"[^>]*>\n?/, '\n')

  const routes = staticRoutes()
  let written = 0

  for (const route of routes) {
    const meta = getMetaForPath(route.path)
    const bodyHtml = render(route.path)
    const html = injectMeta(template, meta, bodyHtml)
    const outPath = route.path === '/' ? join(DIST_DIR, 'index.html') : join(DIST_DIR, route.path.replace(/^\//, ''), 'index.html')
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, html)
    written++
    console.log(`[prerender] ✓ ${route.path} → ${outPath.replace(DIST_DIR, 'dist')}`)
  }

  // dist/404.html — Netlify and Vercel's static output both auto-serve a file with this exact
  // name (at the publish root) with a real HTTP 404 status for any path that matches no other
  // file, so a genuinely unknown URL gets a true 404 instead of a silent 200 — see audit #16.
  // Any unmatched path renders NotFound.tsx via App's catch-all `*` route.
  const notFoundMeta = getMetaForPath('/__unknown__')
  const notFoundHtml = render('/__unknown__')
  writeFileSync(join(DIST_DIR, '404.html'), injectMeta(template, notFoundMeta, notFoundHtml))
  console.log('[prerender] ✓ dist/404.html (real 404 status on Netlify/Vercel — see netlify.toml/vercel.json)')

  console.log(`[prerender] Done: ${written} route(s) prerendered (site URL: ${SITE_URL}).`)
}

main().catch((err) => {
  console.error('[prerender] Failed:', err)
  process.exit(1)
})
