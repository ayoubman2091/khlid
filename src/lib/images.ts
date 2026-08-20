import manifest from '@/data/imageManifest.json'

export interface ImageMeta {
  width: number
  height: number
  variants: { width: number; file: string }[]
}

const MANIFEST = manifest as Record<string, ImageMeta>

/**
 * Resolves the real, generated responsive variants for a project photo (see
 * scripts/generate-images.ts). Returns null for an unknown stem instead of guessing a path —
 * callers (OptimizedImage) fall back to a plain, non-responsive <img> in that case so a typo
 * fails loudly (broken image) rather than silently.
 */
export function getImageMeta(stem: string): ImageMeta | null {
  return MANIFEST[stem] ?? null
}

export function srcSetFor(stem: string): string | undefined {
  const meta = getImageMeta(stem)
  if (!meta) return undefined
  return meta.variants.map((v) => `/images/optimized/${v.file} ${v.width}w`).join(', ')
}

/** Largest available variant — used as the plain `src` fallback for browsers that ignore srcset. */
export function largestSrc(stem: string): string {
  const meta = getImageMeta(stem)
  if (!meta) return `/images/optimized/${stem}.webp` // best-effort; will 404 loudly if stem is wrong
  const largest = meta.variants[meta.variants.length - 1]
  return `/images/optimized/${largest.file}`
}
