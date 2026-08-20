import { fullSrc, thumbSrc } from '@/lib/images'

interface OptimizedImageProps {
  stem: string
  alt: string
  className?: string
  /** Use the smaller pre-generated variant (grids/thumbnails) instead of the full-size one. */
  variant?: 'full' | 'thumb'
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  sizes?: string
}

/**
 * Renders one of the real project photos (already converted to WebP in /public/images/optimized
 * — see CURRENT_SITE_AUDIT.md §5.1). Falls back to the two pre-built sizes rather than a full
 * responsive srcset set, which keeps the image pipeline simple for this v1.
 */
export function OptimizedImage({
  stem,
  alt,
  className,
  variant = 'full',
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes,
}: OptimizedImageProps) {
  const src = variant === 'thumb' ? thumbSrc(stem) : fullSrc(stem)
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      sizes={sizes}
    />
  )
}
