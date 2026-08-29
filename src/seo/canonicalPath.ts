/**
 * Single source of truth for this site's canonical URL format: WITH a trailing slash.
 *
 * Why the slash and not the bare path: production runs on Hostinger (Apache). Every
 * prerendered route is written by scripts/prerender.ts as `dist/<route>/index.html`, i.e. a
 * real directory, and Apache's mod_dir DirectorySlash therefore answers `/services/dallage`
 * with a 301 to `/services/dallage/`. Only the slashed form returns 200. Turning that off
 * (`DirectorySlash Off`) would mean hand-writing rewrite rules to map every clean URL onto
 * its index.html, so the site follows the server instead of fighting it.
 *
 * Before this helper existed the sitemap, the canonical tags, the JSON-LD `url`/breadcrumb
 * items and every internal <Link> all used the NON-slashed form — so every one of them
 * pointed at a URL that immediately 301s. Google resolved that conflict on its own terms:
 * URL Inspection on 2026-08-28 showed BOTH /services/extension and /services/extension/
 * indexed as separate URLs, with Google's chosen canonical being the slashed one while our
 * declared canonical said otherwise. Five of the seven service pages were not indexed at all.
 *
 * Anything that emits a route URL — canonical, og:url, sitemap <loc>, JSON-LD, internal
 * links — must go through this function so they can never disagree again.
 *
 * Asset paths (/images/..., /logo/...) are NOT route paths and must not be passed here;
 * schema.ts's absoluteUrl() handles those and is deliberately left alone.
 */
export function canonicalPath(path: string): string {
  if (!path.startsWith('/')) return path
  if (path === '/') return '/'
  return path.endsWith('/') ? path : `${path}/`
}
