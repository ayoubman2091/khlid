import { MapPin, ExternalLink } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'

/**
 * Homepage location section. The map now shows automatically (per explicit request) instead
 * of behind a click — same real embed already used on /contact, with the same `loading="lazy"`
 * protection: the browser only fetches the iframe once it nears the viewport on scroll, not on
 * initial page load. Positioned well below the fold (after Hero/TrustSignals/Services/Projects/
 * Video/WhyUs/ServiceAreas), so this never competes with the Hero image for LCP, and the fixed
 * aspect-ratio container (4:3 mobile, 16:9 desktop) reserves the map's space either way — no
 * layout shift when it finishes loading.
 */
export function LocationSection() {
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
            <iframe
              title="Localisation RK Pyrénées Construction sur Google Maps"
              src={`https://www.google.com/maps?q=${BUSINESS.latitude},${BUSINESS.longitude}&z=15&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
