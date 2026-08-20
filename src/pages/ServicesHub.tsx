import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CTASection } from '@/components/sections/CTASection'
import { SEO } from '@/seo/SEO'
import { breadcrumbSchema } from '@/seo/schema'
import { BUSINESS } from '@/lib/constants'

export default function ServicesHub() {
  return (
    <>
      <SEO
        title={`Nos services de construction et rénovation à ${BUSINESS.city} | RK Pyrénées Construction`}
        description="Construction, rénovation, maçonnerie, terrassement, dallage, extension et aménagement extérieur à Toulouse. Découvrez nos services et demandez un devis gratuit."
        path="/services"
        schemas={[breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }])]}
      />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/services' }]} />
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h1 className="max-w-2xl font-display text-4xl font-bold text-ink-900 sm:text-5xl">
          Nos services de construction et rénovation
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-600">
          Sept métiers du bâtiment, une seule entreprise. Chaque service ci-dessous correspond à un savoir-faire
          réellement pratiqué par RK Pyrénées Construction à Toulouse et sa proche périphérie.
        </p>
      </div>
      <ServicesGrid title="" />
      <CTASection />
    </>
  )
}
