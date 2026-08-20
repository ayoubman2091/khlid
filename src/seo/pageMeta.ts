import { BUSINESS } from '@/lib/constants'
import { SERVICES, getServiceBySlug } from '@/data/services'
import { REALISATIONS, getRealisationBySlug } from '@/data/realisations'
import { GUIDES, getGuideBySlug } from '@/data/guides'
import { GENERAL_FAQ } from '@/data/faq'
import { largestSrc } from '@/lib/images'
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbSchema,
  serviceSchema,
  faqPageSchema,
  articleSchema,
  imageObjectSchema,
  absoluteUrl,
} from './schema'

export interface Crumb {
  name: string
  path: string
}

export interface PageMeta {
  title: string
  description: string
  path: string
  image?: string
  schemas: object[]
  noindex?: boolean
  /** Present on every page except Home/NotFound — reused by both the visible <Breadcrumb> UI
   *  and the BreadcrumbList JSON-LD in `schemas`, so the two can never disagree. */
  crumbs?: Crumb[]
}

/**
 * Single source of truth for every static route's SEO metadata. Page components import these
 * functions directly (no metadata duplication between JSX and the prerender script — see
 * DEPLOYMENT.md and scripts/prerender.ts, which resolves the same functions via
 * getMetaForPath()). Also backs sitemap.xml/robots.txt generation (scripts/generate-seo-files.ts)
 * so the sitemap can never drift from the app's real routes or list a page that doesn't exist.
 */

const crumb = (name: string, path: string): Crumb => ({ name, path })
const HOME_CRUMB = crumb('Accueil', '/')

export function homeMeta(): PageMeta {
  return {
    title: `RK Pyrénées Construction — Maçonnerie, rénovation et construction à ${BUSINESS.city}`,
    description:
      'RK Pyrénées Construction : maçonnerie, rénovation, construction, terrassement, dallage et extension de maison à Toulouse. Devis gratuit.',
    path: '/',
    image: `${BUSINESS.siteUrl}/logo/logo-512.png`,
    schemas: [organizationSchema(), localBusinessSchema(), websiteSchema(), faqPageSchema(GENERAL_FAQ)],
  }
}

export function servicesHubMeta(): PageMeta {
  const crumbs = [HOME_CRUMB, crumb('Services', '/services')]
  return {
    title: `Nos services de construction et rénovation à ${BUSINESS.city} | RK Pyrénées Construction`,
    description:
      'Construction, rénovation, maçonnerie, terrassement, dallage, extension et aménagement extérieur à Toulouse. Découvrez nos services et demandez un devis gratuit.',
    path: '/services',
    schemas: [breadcrumbSchema(crumbs)],
    crumbs,
  }
}

export function serviceDetailMeta(slug: string): PageMeta | null {
  const service = getServiceBySlug(slug)
  if (!service) return null
  const crumbs = [HOME_CRUMB, crumb('Services', '/services'), crumb(service.shortName, `/services/${service.slug}`)]
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: absoluteUrl(largestSrc(service.heroImage.stem)),
    schemas: [
      breadcrumbSchema(crumbs),
      serviceSchema({ name: service.name, description: service.metaDescription, path: `/services/${service.slug}` }),
    ],
    crumbs,
  }
}

export function realisationsMeta(): PageMeta {
  const crumbs = [HOME_CRUMB, crumb('Réalisations', '/realisations')]
  return {
    title: 'Nos réalisations — Chantiers de construction et rénovation à Toulouse | RK Pyrénées Construction',
    description:
      'Découvrez les chantiers réels de RK Pyrénées Construction à Toulouse : dallage, gros œuvre, construction neuve et rénovation de bâti ancien.',
    path: '/realisations',
    schemas: [breadcrumbSchema(crumbs)],
    crumbs,
  }
}

export function realisationDetailMeta(slug: string): PageMeta | null {
  const realisation = getRealisationBySlug(slug)
  if (!realisation) return null
  const crumbs = [HOME_CRUMB, crumb('Réalisations', '/realisations'), crumb(realisation.title, `/realisations/${realisation.slug}`)]
  const coverImage = realisation.images[0]
  return {
    title: `${realisation.title} — Réalisation RK Pyrénées Construction`,
    description: realisation.description,
    path: `/realisations/${realisation.slug}`,
    // Fixed: was a relative path (invalid og:image) — always goes through absoluteUrl now.
    image: absoluteUrl(largestSrc(coverImage.stem)),
    schemas: [
      breadcrumbSchema(crumbs),
      imageObjectSchema({ url: largestSrc(coverImage.stem), alt: coverImage.alt }),
    ],
    crumbs,
  }
}

export function aboutMeta(): PageMeta {
  const crumbs = [HOME_CRUMB, crumb('À propos', '/a-propos')]
  return {
    title: `À propos — RK Pyrénées Construction, entreprise de bâtiment à ${BUSINESS.city}`,
    description:
      'RK Pyrénées Construction est une entreprise de bâtiment (SASU) basée à Toulouse depuis 2023, spécialisée en maçonnerie, rénovation et construction.',
    path: '/a-propos',
    schemas: [breadcrumbSchema(crumbs)],
    crumbs,
  }
}

export function zonesMeta(): PageMeta {
  const crumbs = [HOME_CRUMB, crumb("Zone d'intervention", '/zones-intervention')]
  return {
    title: `Zone d'intervention — RK Pyrénées Construction à ${BUSINESS.city}`,
    description: "RK Pyrénées Construction intervient à Toulouse. Un projet situé ailleurs ? Nous étudions chaque demande au cas par cas.",
    path: '/zones-intervention',
    schemas: [breadcrumbSchema(crumbs)],
    crumbs,
  }
}

export function contactMeta(): PageMeta {
  const crumbs = [HOME_CRUMB, crumb('Contact', '/contact')]
  return {
    title: `Contact — RK Pyrénées Construction, ${BUSINESS.city}`,
    description: `Contactez RK Pyrénées Construction à ${BUSINESS.city} : téléphone, email ou formulaire de devis gratuit.`,
    path: '/contact',
    schemas: [breadcrumbSchema(crumbs)],
    crumbs,
  }
}

export function quoteMeta(): PageMeta {
  const crumbs = [HOME_CRUMB, crumb('Devis gratuit', '/devis')]
  return {
    title: `Devis gratuit — RK Pyrénées Construction, ${BUSINESS.city}`,
    description: 'Demandez votre devis gratuit et sans engagement pour votre projet de construction, rénovation ou maçonnerie à Toulouse.',
    path: '/devis',
    schemas: [breadcrumbSchema(crumbs)],
    crumbs,
  }
}

export function guidesIndexMeta(): PageMeta {
  const crumbs = [HOME_CRUMB, crumb('Guides', '/guides')]
  return {
    title: `Guides pratiques construction et rénovation à ${BUSINESS.city} | RK Pyrénées Construction`,
    description: 'Étapes de chantier et conseils pour préparer vos projets de construction, rénovation, maçonnerie, terrassement et dallage à Toulouse.',
    path: '/guides',
    schemas: [breadcrumbSchema(crumbs)],
    crumbs,
  }
}

export function guideDetailMeta(slug: string): PageMeta | null {
  const guide = getGuideBySlug(slug)
  if (!guide) return null
  const crumbs = [HOME_CRUMB, crumb('Guides', '/guides'), crumb(guide.title, `/guides/${guide.slug}`)]
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    schemas: [breadcrumbSchema(crumbs), articleSchema({ headline: guide.title, description: guide.metaDescription, path: `/guides/${guide.slug}` })],
    crumbs,
  }
}

export function notFoundMeta(): PageMeta {
  return {
    title: 'Page introuvable | RK Pyrénées Construction',
    description: "Cette page n'existe pas ou plus.",
    path: '/404',
    schemas: [],
    noindex: true,
  }
}

/** Every indexable static route in the app, with its sitemap priority/changefreq. Drives both
 *  sitemap.xml generation and the prerender script — see scripts/generate-seo-files.ts and
 *  scripts/prerender.ts. Deliberately built FROM the real data files (SERVICES/REALISATIONS/
 *  GUIDES) so it's impossible for this list to include a page that doesn't actually exist. */
export function staticRoutes(): { path: string; priority: number; changefreq: string }[] {
  return [
    { path: '/', priority: 1.0, changefreq: 'monthly' },
    { path: '/services', priority: 0.9, changefreq: 'monthly' },
    ...SERVICES.map((s) => ({
      path: `/services/${s.slug}`,
      priority: ['renovation', 'construction', 'maconnerie'].includes(s.slug) ? 0.9 : 0.8,
      changefreq: 'monthly',
    })),
    { path: '/realisations', priority: 0.8, changefreq: 'weekly' },
    ...REALISATIONS.map((r) => ({ path: `/realisations/${r.slug}`, priority: 0.6, changefreq: 'monthly' })),
    { path: '/a-propos', priority: 0.6, changefreq: 'yearly' },
    { path: '/zones-intervention', priority: 0.6, changefreq: 'monthly' },
    { path: '/contact', priority: 0.7, changefreq: 'yearly' },
    { path: '/devis', priority: 0.8, changefreq: 'yearly' },
    { path: '/guides', priority: 0.6, changefreq: 'monthly' },
    ...GUIDES.map((g) => ({ path: `/guides/${g.slug}`, priority: 0.5, changefreq: 'monthly' })),
  ]
}

/** Resolves the PageMeta for any known static path, mirroring App.tsx's route table. Used by
 *  the prerender script so every generated HTML file gets the exact same metadata the SPA
 *  would compute client-side. Returns notFoundMeta() for anything unmatched. */
export function getMetaForPath(path: string): PageMeta {
  if (path === '/') return homeMeta()
  if (path === '/services') return servicesHubMeta()
  if (path === '/realisations') return realisationsMeta()
  if (path === '/a-propos') return aboutMeta()
  if (path === '/zones-intervention') return zonesMeta()
  if (path === '/contact') return contactMeta()
  if (path === '/devis') return quoteMeta()
  if (path === '/guides') return guidesIndexMeta()

  const serviceMatch = path.match(/^\/services\/([^/]+)$/)
  if (serviceMatch) return serviceDetailMeta(serviceMatch[1]) ?? notFoundMeta()

  const realisationMatch = path.match(/^\/realisations\/([^/]+)$/)
  if (realisationMatch) return realisationDetailMeta(realisationMatch[1]) ?? notFoundMeta()

  const guideMatch = path.match(/^\/guides\/([^/]+)$/)
  if (guideMatch) return guideDetailMeta(guideMatch[1]) ?? notFoundMeta()

  return notFoundMeta()
}
