import { useParams } from 'react-router-dom'
import { getRealisationBySlug } from '@/data/realisations'
import { getServiceBySlug } from '@/data/services'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { CTASection } from '@/components/sections/CTASection'
import { Button } from '@/components/ui/Button'
import { SEO } from '@/seo/SEO'
import { breadcrumbSchema } from '@/seo/schema'
import NotFound from './NotFound'

export default function RealisationDetail() {
  const { slug } = useParams<{ slug: string }>()
  const realisation = getRealisationBySlug(slug ?? '')
  if (!realisation) return <NotFound />

  const service = getServiceBySlug(realisation.serviceSlug)
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Réalisations', path: '/realisations' },
    { name: realisation.title, path: `/realisations/${realisation.slug}` },
  ]

  return (
    <>
      <SEO
        title={`${realisation.title} — Réalisation RK Pyrénées Construction`}
        description={realisation.description}
        path={`/realisations/${realisation.slug}`}
        image={`/images/optimized/${realisation.images[0].stem}-full.webp`}
        schemas={[breadcrumbSchema(crumbs)]}
      />

      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={crumbs} />
        <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-wide text-brick-500">
          {realisation.category}
        </span>
        <h1 className="mt-2 font-display text-4xl font-bold text-ink-900 sm:text-5xl">{realisation.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-600">{realisation.description}</p>
        {service && (
          <Button to={`/services/${service.slug}`} variant="ghost" className="mt-6">
            Voir le service {service.shortName}
          </Button>
        )}
      </div>

      <div className="mx-auto mt-10 max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {realisation.images.map((img) => (
            <div key={img.stem} className="overflow-hidden rounded-2xl bg-stone-200">
              <OptimizedImage stem={img.stem} alt={img.alt} variant="full" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <CTASection />
    </>
  )
}
