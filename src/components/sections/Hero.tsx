import { Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { BUSINESS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="absolute inset-0">
        <OptimizedImage
          stem="1000048044-A0xl8WOkxaSr38r9"
          alt=""
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-stone-100 backdrop-blur">
          {BUSINESS.city}
        </p>
        <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
          Entreprise de construction et rénovation à Toulouse
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-200">
          Maçonnerie, rénovation, construction neuve, terrassement et dallage : RK Pyrénées
          Construction pilote vos travaux du devis à la réception de chantier.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button to="/devis" size="lg" icon={<ArrowRight size={18} />}>
            Demander un devis gratuit
          </Button>
          <Button to="/realisations" size="lg" variant="ghost" className="!bg-white/10 !text-white !border-white/30 hover:!border-white">
            Voir nos réalisations
          </Button>
        </div>

        <a
          href={`tel:${BUSINESS.phoneE164}`}
          onClick={() => trackEvent('phone_click', { location: 'hero' })}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-stone-100 hover:text-white"
        >
          <Phone size={16} />
          Ou appelez directement le {BUSINESS.phone}
        </a>
      </div>
    </section>
  )
}
