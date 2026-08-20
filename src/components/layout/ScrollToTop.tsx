import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to the top of the page on every route change. Previously lived inside SEO.tsx's
 * effect — split out because SEO.tsx now only describes head metadata (kept in sync with the
 * prerender script via seo/pageMeta.ts) and shouldn't also own unrelated viewport behavior.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}
