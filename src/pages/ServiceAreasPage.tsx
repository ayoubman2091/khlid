import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CTASection } from '@/components/sections/CTASection'
import { SEO } from '@/seo/SEO'
import { breadcrumbSchema } from '@/seo/schema'
import { ZONES } from '@/data/zones'
import { BUSINESS } from '@/lib/constants'
import { MapPin } from 'lucide-react'

export default function ServiceAreasPage() {
  const crumbs = [{ name: 'Accueil', path: '/' }, { name: "Zones d'intervention", path: '/zones-intervention' }]
  return (
    <>
      <SEO
        title={`Zones d'intervention — RK Pyrénées Construction à ${BUSINESS.city}`}
        description="RK Pyrénées Construction intervient à Toulouse et dans sa proche périphérie : Blagnac, Colomiers, Tournefeuille, Balma, Muret, Cugnaux, L'Union, Castanet-Tolosan."
        path="/zones-intervention"
        schemas={[breadcrumbSchema(crumbs)]}
      />
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={crumbs} />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink-900 sm:text-5xl">Zones d'intervention</h1>
        <p className="mt-4 text-lg text-ink-600">
          RK Pyrénées Construction intervient à {BUSINESS.city} et dans les communes de sa proche périphérie.
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ZONES.map((zone) => (
            <li key={zone.name} className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brick-500" />
              <div>
                <p className="font-display font-bold text-ink-900">{zone.name}</p>
                <p className="mt-0.5 text-sm text-ink-600">{zone.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-ink-600">
          Votre commune n'apparaît pas dans cette liste ? Contactez-nous : nous étudions chaque demande au cas par
          cas selon la localisation de votre projet.
        </p>
      </div>

      <CTASection />
    </>
  )
}
