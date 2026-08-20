import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/data/services'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

export function ServicesGrid({ title = 'Nos services' }: { title?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {title && (
        <div className="mb-10 max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">{title}</h2>
          <p className="mt-3 text-ink-600">
            Des services réellement proposés par RK Pyrénées Construction, illustrés par nos vrais chantiers.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-lg"
          >
            <div className="aspect-[4/3] overflow-hidden bg-stone-200">
              <OptimizedImage
                stem={service.heroImage.stem}
                alt={service.heroImage.alt}
                variant="thumb"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-ink-900">{service.name}</h3>
              <p className="mt-1.5 text-sm text-ink-600">{service.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brick-500">
                Découvrir <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
