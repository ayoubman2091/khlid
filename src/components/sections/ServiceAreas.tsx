import { MapPin } from 'lucide-react'
import { ZONES } from '@/data/zones'

export function ServiceAreas() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">Zones d'intervention</h2>
      <p className="mt-3 max-w-2xl text-ink-600">
        RK Pyrénées Construction intervient à Toulouse et dans sa proche périphérie. Vous êtes en dehors de cette
        liste ? Contactez-nous, nous vérifions la faisabilité au cas par cas.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        {ZONES.map((zone) => (
          <span
            key={zone.name}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium ${
              zone.isMainCity
                ? 'border-brick-500 bg-brick-50 text-brick-600'
                : 'border-stone-300 bg-white text-ink-800'
            }`}
          >
            <MapPin size={14} />
            {zone.name}
          </span>
        ))}
      </div>
    </section>
  )
}
