import { useParams, Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { getServiceBySlug, SERVICES } from '@/data/services'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Process } from '@/components/sections/Process'
import { ServiceAreas } from '@/components/sections/ServiceAreas'
import { CTASection } from '@/components/sections/CTASection'
import { Button } from '@/components/ui/Button'
import { SEO } from '@/seo/SEO'
import { breadcrumbSchema, serviceSchema } from '@/seo/schema'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const service = getServiceBySlug(slug ?? '')

  if (!service) return <NotFound />

  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.shortName, path: `/services/${service.slug}` },
  ]

  const related = SERVICES.filter((s) => service.relatedServiceSlugs.includes(s.slug))

  return (
    <>
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        path={`/services/${service.slug}`}
        schemas={[breadcrumbSchema(crumbs), serviceSchema({ name: service.name, description: service.metaDescription, path: `/services/${service.slug}` })]}
      />

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={crumbs} />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-bold text-ink-900 sm:text-5xl">{service.h1}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">{service.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/devis" size="lg">
                Demander un devis gratuit
              </Button>
              <Button to="/realisations" size="lg" variant="ghost">
                Voir des réalisations
              </Button>
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200">
            <OptimizedImage
              stem={service.heroImage.stem}
              alt={service.heroImage.alt}
              variant="full"
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-ink-900">Ce que couvre ce service</h2>
        <ul className="mt-6 space-y-3">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink-700">
              <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brick-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <Process steps={service.process} title="Comment se déroule ce chantier" />

      {service.gallery.length > 0 && (
        <section className="bg-stone-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-ink-900">Chantiers réels</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {service.gallery.map((img) => (
                <div key={img.stem} className="aspect-square overflow-hidden rounded-xl bg-stone-200">
                  <OptimizedImage stem={img.stem} alt={img.alt} variant="thumb" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ServiceAreas />

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-ink-900">Services complémentaires</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/services/${r.slug}`}
                className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 hover:border-brick-500 hover:text-brick-500"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}
