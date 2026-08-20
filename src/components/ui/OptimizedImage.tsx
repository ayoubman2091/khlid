import { getImageMeta, srcSetFor, largestSrc } from '@/lib/images'

interface OptimizedImageProps {
  stem: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  /** Describes how much of the viewport this image actually occupies at each breakpoint, so
   *  the browser can pick the right srcset candidate. Defaults to full-bleed; pass a precise
   *  value for grid/column layouts (see call sites) — see audit item #9. */
  sizes?: string
}

/**
 * Renders a real project photo (see scripts/generate-images.ts) with a genuine responsive
 * srcset — every width in srcset matches an actually-generated file at that pixel width, so
 * the browser never downloads a 1200px image for a 375px mobile viewport. Always sets
 * width/height from the source's real intrinsic dimensions so the browser can reserve layout
 * space before the image loads (prevents CLS) even without an aspect-ratio wrapper.
 */
export function OptimizedImage({
  stem,
  alt,
  className,
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes = '100vw',
}: OptimizedImageProps) {
  const meta = getImageMeta(stem)
  return (
    <img
      src={largestSrc(stem)}
      srcSet={srcSetFor(stem)}
      sizes={meta ? sizes : undefined}
      width={meta?.width}
      height={meta?.height}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
    />
  )
}
