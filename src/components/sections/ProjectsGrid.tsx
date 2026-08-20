import { Link } from 'react-router-dom'
import { REALISATIONS } from '@/data/realisations'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { trackEvent } from '@/lib/analytics'

export function ProjectsGrid({ title = 'Nos réalisations', limit }: { title?: string; limit?: number }) {
  const items = limit ? REALISATIONS.slice(0, limit) : REALISATIONS

  return (
    <section className="bg-stone-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">{title}</h2>
              <p className="mt-3 max-w-xl text-ink-600">
                De vrais chantiers, classés par type de travaux — dallage, gros œuvre et rénovation de bâti ancien.
              </p>
            </div>
            {limit && (
              <Link to="/realisations" className="text-sm font-semibold text-brick-500 hover:underline">
                Voir toutes les réalisations →
              </Link>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((r) => (
            <Link
              key={r.slug}
              to={`/realisations/${r.slug}`}
              onClick={() => trackEvent('project_view', { project: r.slug })}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden bg-stone-200">
                <OptimizedImage
                  stem={r.images[0].stem}
                  alt={r.images[0].alt}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-brick-500">{r.category}</span>
                <h3 className="mt-1 font-display text-base font-bold leading-snug text-ink-900">{r.title}</h3>
                <p className="mt-1 text-xs text-ink-600">{r.images.length} photos</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
