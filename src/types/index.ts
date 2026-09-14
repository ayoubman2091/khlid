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
  /**
   * Deep body content, rendered between the "what this covers" list and the process steps.
   * Same rule as Realisation.sections: technique explained factually, or grounded in the
   * gallery photos and the `includes` list above - never an invented certification, effectif,
   * guarantee, project count or price. Optional, so a service can stay short rather than be
   * padded to a word count.
   */
  sections?: { heading: string; body: string }[]
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
  /**
   * Case-study body. Every claim here must be readable off the photos in `images` (their alt
   * text was written against the real files) or be standard trade practice for the technique
   * those photos show. Never a client name, address, date, duration, budget or guarantee:
   * none of that is known for these chantiers, and the brief says omit what is unknown rather
   * than invent it. Optional so a realisation can ship as a gallery if nothing can be said
   * honestly about it.
   */
  sections?: { heading: string; body: string }[]
  /** Techniques and materials actually visible in the photos — rendered as a short list. */
  techniques?: string[]
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
