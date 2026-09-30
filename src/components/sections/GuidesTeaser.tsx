import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { GUIDES } from '@/data/guides'

/**
 * Homepage entry point to every guide.
 *
 * Added 2026-09-30 on measured evidence, not by default (see SEO_EXPERIMENT_LOG.md EXP-006):
 * URL Inspection that day reported three guides as « Détectée, actuellement non indexée » —
 * never crawled — while the homepage is Google's most frequently crawled URL on the site
 * (last crawl 2026-09-29). The built link graph showed every guide reachable only from the
 * /guides/ hub plus one or two service pages, and no guide linked from the homepage at all.
 * The titles below are the guides' own titles from src/data/guides.ts; nothing new is claimed.
 */
export function GuidesTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">Guides pratiques</h2>
          <p className="mt-3 max-w-xl text-ink-600">
            Étapes de chantier et conseils pour bien préparer votre projet de construction, rénovation ou maçonnerie
            à Toulouse, avant de demander un devis.
          </p>
        </div>
        <Link to="/guides/" className="text-sm font-semibold text-brick-500 hover:underline">
          Voir tous les guides →
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
        {GUIDES.map((guide) => (
          <li key={guide.slug} className="border-b border-stone-200">
            <Link
              to={`/guides/${guide.slug}/`}
              className="group flex items-center justify-between gap-4 py-4 font-medium text-ink-900 hover:text-brick-500"
            >
              {guide.title}
              <ArrowRight size={16} className="shrink-0 text-brick-500 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
