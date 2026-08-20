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
        <h1 className="max-w-2xl font-display text-4xl font-bold text-ink-900 sm:text-5xl">
          Nos services de construction et rénovation
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-600">
          Sept métiers du bâtiment, une seule entreprise. Chaque service ci-dessous correspond à un savoir-faire
          réellement pratiqué par RK Pyrénées Construction à Toulouse.
        </p>
      </div>
      <ServicesGrid title="" />
      <CTASection />
    </>
  )
}
