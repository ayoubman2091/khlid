import { useEffect } from 'react'
import { BUSINESS } from '@/lib/constants'
import type { PageMeta } from './pageMeta'
import { canonicalPath } from './canonicalPath'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Updates title / meta description / canonical / Open Graph / Twitter Card / JSON-LD on
 * client-side navigation. Every page passes a `PageMeta` object computed by a function in
 * seo/pageMeta.ts — the SAME functions scripts/prerender.ts calls to bake this exact metadata
 * into the static HTML for each route at build time (see scripts/prerender.ts), so what a
 * crawler sees in the prerendered HTML and what this effect produces on client navigation are
 * always identical, not two metadata sources that can drift apart.
 */
export function SEO({ title, description, path, image, schemas = [], noindex = false }: PageMeta) {
  // Schemas are passed as fresh array/object literals from each page on every render;
  // stringify for a stable dependency so this effect doesn't re-run on unrelated re-renders
  // (e.g. typing in a form on the same page).
  const schemasKey = JSON.stringify(schemas)

  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    // One canonical URL form for the whole site — see seo/canonicalPath.ts.
    const canonicalUrl = `${BUSINESS.siteUrl}${canonicalPath(path)}`
    setLink('canonical', canonicalUrl)

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', BUSINESS.brandName)
    setMeta('property', 'og:locale', 'fr_FR')
    if (image) setMeta('property', 'og:image', image)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    if (image) setMeta('name', 'twitter:image', image)

    const scriptIds: string[] = []
    schemas.forEach((schema, i) => {
      const id = `ld-json-${i}`
      scriptIds.push(id)
      let el = document.getElementById(id) as HTMLScriptElement | null
      if (!el) {
        el = document.createElement('script')
        el.id = id
        el.type = 'application/ld+json'
        document.head.appendChild(el)
      }
      el.textContent = JSON.stringify(schema)
    })

    // Clean up JSON-LD blocks from a previous page that this page doesn't reuse
    document.head.querySelectorAll('script[id^="ld-json-"]').forEach((el) => {
      if (!scriptIds.includes(el.id)) el.remove()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, noindex, schemasKey])

  return null
}
