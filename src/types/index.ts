export interface ServiceImage {
  /** Filename stem shared by the -full.webp and -thumb.webp variants in /public/images/optimized */
  stem: string
  alt: string
  caption?: string
}

export interface Service {
  slug: string
  name: string
  shortName: string
  /** Verb-first one-liner used in cards/navigation */
  tagline: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  /** What is genuinely included — no invented sub-services */
  includes: string[]
  process: { title: string; description: string }[]
  heroImage: ServiceImage
  gallery: ServiceImage[]
  relatedServiceSlugs: string[]
  primaryKeywordCluster: string
  /** Service-specific questions — distinct from the homepage's GENERAL_FAQ, grounded only in
   *  facts already present in `includes`/`intro`/`process` above. Optional so a service can
   *  ship without one rather than force filler content. */
  faq?: FAQItem[]
}

export interface Realisation {
  slug: string
  title: string
  /** Honest work category — not a fabricated project name/address */
  category: string
  serviceSlug: string
  description: string
  images: ServiceImage[]
  videoIds?: string[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Guide {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  h1: string
  dek: string
  sections: { heading: string; body: string }[]
  sourceNote: string
  relatedServiceSlugs: string[]
}

export interface NavLink {
  label: string
  to: string
}
