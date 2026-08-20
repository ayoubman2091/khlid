import { useState } from 'react'
import { MapPin, ExternalLink, Map as MapIcon } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'

/**
 * Homepage location section (audit item: "Add Google Maps to the homepage").
 *
 * Click-to-load facade, same pattern as VideoSection's YouTube embeds: the real Google Maps
 * iframe (identical embed already used on /contact) never loads until the visitor clicks. This
 * guarantees zero network cost for the map on initial page load — it cannot become the LCP
 * element and cannot be the reason for a slow homepage, regardless of connection speed. The
 * facade and the iframe share the exact same fixed-aspect-ratio container, so nothing resizes
 * when the iframe replaces the facade — no layout shift either way.
 */
export function LocationSection() {
  const [showMap, setShowMap] = useState(false)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">Nous sommes à Toulouse</h2>
      <p className="mt-3 max-w-2xl text-ink-600">
        RK Pyrénées Construction est basée à Toulouse et y réalise vos travaux de construction, rénovation et
        maçonnerie.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brick-50 text-brick-500">
              <MapPin size={18} />
            </span>
            <div>
              <p className="font-display font-bold text-ink-900">Adresse</p>
              <p className="mt-0.5 text-ink-600">
                {BUSINESS.addressLine}
                <br />
                {BUSINESS.postalCode} {BUSINESS.city}
                <br />
                {BUSINESS.country}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              href={BUSINESS.mapsUrl}
              variant="ghost"
              icon={<ExternalLink size={16} />}
              onClick={() => trackEvent('maps_click', { location: 'home_location_section' })}
            >
              Ouvrir dans Google Maps
            </Button>
            <Button to="/contact">Nous contacter</Button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 sm:aspect-video">
            {showMap ? (
              <iframe
                title="Localisation RK Pyrénées Construction sur Google Maps"
                src={`https://www.google.com/maps?q=${BUSINESS.latitude},${BUSINESS.longitude}&z=15&output=embed`}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  setShowMap(true)
                  trackEvent('maps_click', { location: 'home_location_section_facade' })
                }}
                className="group flex h-full w-full flex-col items-center justify-center gap-3 text-ink-600 transition-colors hover:bg-stone-200/60"
                aria-label="Afficher la carte Google Maps"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brick-500 text-white shadow-lg transition-transform group-hover:scale-110">
                  <MapIcon size={24} />
                </span>
                <span className="font-display text-sm font-bold text-ink-900">Afficher la carte</span>
                <span className="text-xs text-ink-500">
                  {BUSINESS.postalCode} {BUSINESS.city}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
