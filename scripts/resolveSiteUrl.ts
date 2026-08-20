/**
 * Resolves VITE_SITE_URL the same way `vite build` itself does (.env, .env.local,
 * .env.production, .env.production.local — see Vite's env file docs), for scripts that run as
 * plain `node` processes rather than through Vite's bundler.
 *
 * This matters: a standalone `node scripts/x.ts` process does NOT automatically read .env
 * files the way `import.meta.env` does inside Vite-bundled code — `process.env.VITE_SITE_URL`
 * alone would silently miss a value set only in .env.production. Using Vite's own `loadEnv`
 * closes that gap, so scripts/generate-seo-files.ts and scripts/prerender.ts see exactly the
 * same VITE_SITE_URL the client build/prerendered HTML end up using — one real source of
 * truth (.env.production), not a hardcoded duplicate that could quietly drift from it.
 *
 * Deliberately has NO hardcoded domain fallback: if this can't resolve a value, it throws
 * rather than silently defaulting to some other domain string. See audit instruction "do not
 * invent another domain" — a missing/misconfigured .env.production should fail loudly, not
 * paper over itself.
 */
import { loadEnv } from 'vite'

export function resolveSiteUrl(root: string): string {
  const env = loadEnv('production', root, 'VITE_')
  const value = process.env.VITE_SITE_URL || env.VITE_SITE_URL
  if (!value) {
    throw new Error(
      'VITE_SITE_URL is not set (checked process.env and .env/.env.production via loadEnv). ' +
        'Set it in .env.production — see DEPLOYMENT.md #1. Refusing to fall back to an invented domain.',
    )
  }
  return value.replace(/\/$/, '')
}
