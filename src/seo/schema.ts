import { BUSINESS } from '@/lib/constants'

const SITE = BUSINESS.siteUrl

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
    priceRange: '€€',
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
    areaServed: ['Toulouse', 'Blagnac', 'Colomiers', 'Tournefeuille', 'Balma', 'Muret', 'Cugnaux', "L'Union", 'Castanet-Tolosan'],
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
      item: `${SITE}${item.path}`,
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
    url: `${SITE}${opts.path}`,
    provider: { '@id': `${SITE}/#localbusiness` },
    areaServed: 'Toulouse',
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
    url: `${SITE}${opts.path}`,
    author: { '@id': `${SITE}/#organization` },
    publisher: { '@id': `${SITE}/#organization` },
  }
}
