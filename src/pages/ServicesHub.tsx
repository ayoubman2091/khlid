import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CTASection } from '@/components/sections/CTASection'
import { SEO } from '@/seo/SEO'
import { servicesHubMeta } from '@/seo/pageMeta'

export default function ServicesHub() {
  const meta = servicesHubMeta()
  return (
    <>
      <SEO {...meta} />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={meta.crumbs!} />
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* URL Inspection on 2026-09-05 returned "Détectée, actuellement non indexée" for this
            page, while /services/construction/ and /services/renovation/ both came back
            "Envoyée et indexée". A hub whose entire body was one H1 and one sentence above a
            card grid gives Google very little reason to index it separately from the pages it
            links to. The paragraph below is real orientation copy — it says which trade covers
            what — not padding, and every claim restates data already in src/data/services.ts. */}
        <h1 className="max-w-2xl font-display text-4xl font-bold text-ink-900 sm:text-5xl">
          Nos services de construction et de rénovation à Toulouse
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-600">
          Sept métiers du bâtiment, une seule entreprise. Chaque service ci-dessous correspond à un savoir-faire
          réellement pratiqué par RK Pyrénées Construction à Toulouse.
        </p>
        <p className="mt-4 max-w-2xl text-ink-600">
          Le gros œuvre et la construction neuve couvrent la structure porteuse : fondations, élévation des murs
          et béton armé. La maçonnerie générale traite les murs, les ouvertures et les reprises sur bâti existant.
          La rénovation intervient sur l&apos;intérieur comme sur l&apos;extérieur d&apos;un bâtiment déjà debout.
          Le terrassement, le dallage et l&apos;aménagement extérieur préparent et finissent les abords, et
          l&apos;extension de maison agrandit une habitation existante. L&apos;ensemble de ces chantiers est réalisé
          à Toulouse et en Midi-Pyrénées, et chacun est chiffré par un devis détaillé avant démarrage.
        </p>
      </div>
      <ServicesGrid title="" />
      <CTASection />
    </>
  )
}
