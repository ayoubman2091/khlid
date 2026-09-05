import { BUSINESS, SERVICE_AREAS } from '@/lib/constants'
import { SERVICES } from '@/data/services'
import { canonicalPath } from './canonicalPath'

const SITE = BUSINESS.siteUrl

/** Prefixes a site-relative path with the canonical site URL. Use this instead of ever
 * hardcoding a domain in a component — the domain is centralized in BUSINESS.siteUrl
 * (itself driven by VITE_SITE_URL, see DEPLOYMENT.md #1). Already-absolute URLs pass through. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  return `${SITE}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: BUSINESS.brandName,
    legalName: BUSINESS.legalName,
    url: SITE,
    logo: `${SITE}/logo/logo-512.png`,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,

    // Entity-disambiguation signals. Every value here already lives in BUSINESS and comes from
    // the same sourced record as the rest of the NAP block (public registry, SIREN 951 243 591
    // — see lib/constants.ts). Nothing is inferred or rounded. The point is that "RK Pyrénées
    // Construction" is a common-sounding name in a crowded local market: a SIREN/SIRET pair, a
    // founding year and a postal address let Google and AI answer engines bind the brand string
    // to one specific legal entity instead of guessing between similarly-named contractors.
    foundingDate: String(BUSINESS.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.addressLine,
      addressLocality: BUSINESS.city,
      postalCode: BUSINESS.postalCode,
      addressRegion: BUSINESS.region,
      addressCountry: 'FR',
    },
    // Spaces stripped so the values are machine-comparable against registry data; the
    // human-readable spacing in BUSINESS.siren/siret is what the UI displays, untouched.
    identifier: [
      { '@type': 'PropertyValue', name: 'SIREN', value: BUSINESS.siren.replace(/\s/g, '') },
      { '@type': 'PropertyValue', name: 'SIRET', value: BUSINESS.siret.replace(/\s/g, '') },
    ],

    // Only real, confirmed profiles belong here — never publish an unverified link.
    ...(BUSINESS.facebookUrl ? { sameAs: [BUSINESS.facebookUrl] } : {}),
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE}/#localbusiness`,
    name: BUSINESS.brandName,
    image: `${SITE}/logo/logo-512.png`,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    // No priceRange: an unconfirmed "€€" placeholder was here before — removed per the
    // client's no-pricing-anywhere decision (2026-08-20). priceRange can surface directly in
    // Google's business panel/rich results, which counts as customer-facing.
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.addressLine,
      addressLocality: BUSINESS.city,
      postalCode: BUSINESS.postalCode,
      addressRegion: BUSINESS.region,
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    url: SITE,
    hasMap: BUSINESS.mapsUrl,

    // Plain-language statement of who this is, what it does and where. Written as one factual
    // sentence because that is the shape AI answer engines actually quote — and derived from
    // SERVICES/BUSINESS/SERVICE_AREAS rather than typed out, so it can never drift from the
    // seven services the site really publishes.
    description: `${BUSINESS.brandName} est une entreprise de bâtiment (${BUSINESS.legalForm}) basée à ${BUSINESS.city}, créée en ${BUSINESS.foundedYear}. Elle intervient dans toute la zone ${SERVICE_AREAS[0]} sur ${SERVICES.length} métiers : ${SERVICES.map((s) => s.shortName.toLowerCase()).join(', ')}.`,

    // Before this, nothing in the structured data told a machine WHICH services exist — a
    // reader had to crawl and parse seven separate HTML pages to find out. Each Service page
    // emits its own Service node, but there was no catalogue binding them to the business.
    // Deliberately Offers WITHOUT `price`/`priceSpecification`: the client's no-pricing-anywhere
    // decision (2026-08-20) applies to structured data too, and an Offer is valid without one.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Services de ${BUSINESS.brandName}`,
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.tagline,
          url: `${SITE}${canonicalPath(`/services/${s.slug}`)}`,
        },
      })),
    },
    knowsAbout: SERVICES.map((s) => s.name),

    // Client-confirmed service area: Toulouse et Midi-Pyrénées.
    // No individual commune pages are created without verified local activity.
    areaServed: [
      {
        '@type': 'City',
        name: 'Toulouse',
      },
      {
        '@type': 'Place',
        name: 'Midi-Pyrénées',
      },
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    name: BUSINESS.brandName,
    url: SITE,
    inLanguage: 'fr-FR',
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE}${canonicalPath(item.path)}`,
    })),
  }
}

export function serviceSchema(opts: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: `${SITE}${canonicalPath(opts.path)}`,
    provider: { '@id': `${SITE}/#localbusiness` },

    // Client-confirmed service area: Toulouse et Midi-Pyrénées.
    areaServed: [
      {
        '@type': 'City',
        name: 'Toulouse',
      },
      {
        '@type': 'Place',
        name: 'Midi-Pyrénées',
      },
    ],
  }
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function articleSchema(opts: { headline: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: `${SITE}${canonicalPath(opts.path)}`,
    author: { '@id': `${SITE}/#organization` },
    publisher: { '@id': `${SITE}/#organization` },
  }
}

/**
 * ImageObject for a genuinely-owned content image (RK's own project photos — verified real
 * assets, see CURRENT_SITE_AUDIT.md §5.1). Used sparingly (one per realisation page, not one
 * per thumbnail) to avoid structured-data spam — see audit §19.
 */
export function imageObjectSchema(opts: {
  url: string
  alt: string
  width?: number
  height?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: absoluteUrl(opts.url),
    url: absoluteUrl(opts.url),
    description: opts.alt,
    ...(opts.width ? { width: opts.width } : {}),
    ...(opts.height ? { height: opts.height } : {}),
    representativeOfPage: true,
  }
}

/**
 * VideoObject builder — intentionally NOT wired into any page yet.
 *
 * The 15 YouTube videos on this site have unverified ownership (see CURRENT_SITE_AUDIT.md
 * §5.2): we don't know which channel published them, so we cannot honestly assert `creator`,
 * `publisher`, or `uploadDate` without inventing data. Publishing VideoObject with a
 * publisher/creator pointing at RK Pyrénées when that isn't confirmed would be exactly the
 * kind of misleading structured data the audit flagged (§18/§27) — so this helper exists ready
 * to use, but stays disconnected from every page until a real channel/ownership confirmation
 * is provided. At that point, wire it into RealisationDetail/VideoSection with the real name,
 * description and uploadDate — do not fill placeholders in the meantime.
 */
export function videoObjectSchema(opts: {
  name: string
  description: string
  thumbnailUrl: string
  embedUrl: string
  uploadDate?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: opts.name,
    description: opts.description,
    thumbnailUrl: [opts.thumbnailUrl],
    embedUrl: opts.embedUrl,
    ...(opts.uploadDate ? { uploadDate: opts.uploadDate } : {}),
  }
}