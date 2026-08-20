import { useEffect } from 'react'
import { BUSINESS } from '@/lib/constants'

interface SEOProps {
  title: string
  description: string
  path: string
  image?: string
  schemas?: object[]
  noindex?: boolean
}

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
 * Gère title / meta description / canonical / Open Graph / Twitter Card / JSON-LD
 * par page, côté client (pas de SSR/prerendering dans cette v1 — voir note dans le
 * rapport de livraison sur la recommandation de prerendering pour durcir le SEO/GEO).
 */
export function SEO({ title, description, path, image, schemas = [], noindex = false }: SEOProps) {
  // Schemas are passed as fresh array/object literals from each page on every render;
  // stringify for a stable dependency so this effect doesn't re-run (and re-scroll) on
  // unrelated re-renders (e.g. typing in a form on the same page).
  const schemasKey = JSON.stringify(schemas)

  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setLink('canonical', `${BUSINESS.siteUrl}${path}`)

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `${BUSINESS.siteUrl}${path}`)
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

    window.scrollTo({ top: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, noindex, schemasKey])

  return null
}
