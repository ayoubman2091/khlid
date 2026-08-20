/** Resolve the optimized WebP paths for a real project photo stored in /public/images/optimized. */
export function fullSrc(stem: string) {
  return `/images/optimized/${stem}-full.webp`
}

export function thumbSrc(stem: string) {
  return `/images/optimized/${stem}-thumb.webp`
}
