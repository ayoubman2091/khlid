import { useParams } from 'react-router-dom'
import { Info } from 'lucide-react'
import { getGuideBySlug } from '@/data/guides'
import { getServiceBySlug } from '@/data/services'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { CTASection } from '@/components/sections/CTASection'
import { SEO } from '@/seo/SEO'
import { guideDetailMeta } from '@/seo/pageMeta'
import NotFound from './NotFound'

export default function Guide() {
  const { slug } = useParams<{ slug: string }>()
  const guide = getGuideBySlug(slug ?? '')
  const meta = guide ? guideDetailMeta(guide.slug) : null
  if (!guide || !meta) return <NotFound />

  const relatedServices = guide.relatedServiceSlugs.map(getServiceBySlug).filter(Boolean)

  return (
    <>
      <SEO {...meta} />
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={meta.crumbs!} />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink-900 sm:text-5xl">{guide.h1}</h1>
        <p className="mt-4 text-lg text-ink-600">{guide.dek}</p>
      </div>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {guide.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display text-2xl font-bold text-ink-900">{section.heading}</h2>
            <p className="mt-3 leading-relaxed text-ink-700">{section.body}</p>
          </div>
        ))}

        <div className="flex gap-3 rounded-xl border border-stone-200 bg-stone-100 p-4 text-sm text-ink-600">
          <Info size={18} className="mt-0.5 shrink-0 text-brick-500" />
          <p>{guide.sourceNote}</p>
        </div>

        {relatedServices.length > 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <p className="font-display font-bold text-ink-900">Un projet en tête ?</p>
            <p className="mt-2 text-sm text-ink-600">
              Obtenez un chiffrage réel et gratuit pour votre projet à Toulouse.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedServices.map((s) => (
                <Button key={s!.slug} to={`/services/${s!.slug}/`} variant="ghost">
                  Voir {s!.shortName}
                </Button>
              ))}
              <Button to="/devis/">Demander un devis</Button>
            </div>
          </div>
        )}
      </div>

      <CTASection />
    </>
  )
}
