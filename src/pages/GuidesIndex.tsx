import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { GUIDES } from '@/data/guides'
import { CTASection } from '@/components/sections/CTASection'
import { SEO } from '@/seo/SEO'
import { breadcrumbSchema } from '@/seo/schema'
import { BUSINESS } from '@/lib/constants'

export default function GuidesIndex() {
  const crumbs = [{ name: 'Accueil', path: '/' }, { name: 'Guides', path: '/guides' }]
  return (
    <>
      <SEO
        title={`Guides prix construction et rénovation à ${BUSINESS.city} | RK Pyrénées Construction`}
        description="Repères de prix et conseils pour vos projets de construction, rénovation, maçonnerie et terrassement à Toulouse."
        path="/guides"
        schemas={[breadcrumbSchema(crumbs)]}
      />
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={crumbs} />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink-900 sm:text-5xl">Guides &amp; repères de prix</h1>
        <p className="mt-4 text-lg text-ink-600">
          Des repères pour cadrer votre budget avant de demander un devis précis. Chaque chiffre cité indique sa
          source.
        </p>
      </div>
      <div className="mx-auto max-w-3xl divide-y divide-stone-200 px-4 py-10 sm:px-6 lg:px-8">
        {GUIDES.map((guide) => (
          <Link key={guide.slug} to={`/guides/${guide.slug}`} className="group flex items-center justify-between gap-4 py-5">
            <div>
              <h2 className="font-display text-lg font-bold text-ink-900 group-hover:text-brick-500">{guide.title}</h2>
              <p className="mt-1 text-sm text-ink-600">{guide.dek}</p>
            </div>
            <ArrowRight size={18} className="shrink-0 text-brick-500" />
          </Link>
        ))}
      </div>
      <CTASection />
    </>
  )
}
