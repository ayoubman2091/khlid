import { useParams } from 'react-router-dom'
import { getRealisationBySlug } from '@/data/realisations'
import { getServiceBySlug } from '@/data/services'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { CTASection } from '@/components/sections/CTASection'
import { Button } from '@/components/ui/Button'
import { SEO } from '@/seo/SEO'
import { realisationDetailMeta } from '@/seo/pageMeta'
import NotFound from './NotFound'

export default function RealisationDetail() {
  const { slug } = useParams<{ slug: string }>()
  const realisation = getRealisationBySlug(slug ?? '')
  const meta = realisation ? realisationDetailMeta(realisation.slug) : null
  if (!realisation || !meta) return <NotFound />

  const service = getServiceBySlug(realisation.serviceSlug)

  return (
    <>
      <SEO {...meta} />

      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={meta.crumbs!} />
        <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-wide text-brick-500">
          {realisation.category}
        </span>
        <h1 className="mt-2 font-display text-4xl font-bold text-ink-900 sm:text-5xl">{realisation.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-600">{realisation.description}</p>
        {service && (
          <Button to={`/services/${service.slug}/`} variant="ghost" className="mt-6">
            Voir le service {service.shortName}
          </Button>
        )}
      </div>

      {realisation.techniques && realisation.techniques.length > 0 && (
        <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
            Techniques et matériaux mis en œuvre
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {realisation.techniques.map((t) => (
              <li key={t} className="rounded-full bg-stone-100 px-3 py-1 text-sm text-ink-700">
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      {realisation.sections && realisation.sections.length > 0 && (
        <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6 lg:px-8">
          {realisation.sections.map((section) => (
            <section key={section.heading} className="mt-8 first:mt-0">
              <h2 className="font-display text-2xl font-bold text-ink-900">{section.heading}</h2>
              <p className="mt-3 text-ink-600">{section.body}</p>
            </section>
          ))}
        </div>
      )}

      <div className="mx-auto mt-10 max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="sr-only">Photos du chantier</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {realisation.images.map((img) => (
            <div key={img.stem} className="overflow-hidden rounded-2xl bg-stone-200">
              {/* No forced h-full/object-cover here: width+height from OptimizedImage let the
                  browser reserve the image's real aspect ratio (no CLS) without cropping
                  portrait/landscape photos into a uniform box — see audit item #11. */}
              <OptimizedImage stem={img.stem} alt={img.alt} sizes="(min-width: 640px) 50vw, 100vw" className="h-auto w-full" />
            </div>
          ))}
        </div>
      </div>

      <CTASection />
    </>
  )
}
