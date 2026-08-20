import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BUSINESS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

export function CTASection() {
  return (
    <section className="bg-ink-950 py-16 text-center text-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Un projet de construction ou rénovation ?</h2>
        <p className="mt-4 text-stone-300">
          Décrivez votre projet, nous revenons vers vous avec un devis gratuit et sans engagement.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/devis" size="lg">
            Demander un devis gratuit
          </Button>
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            onClick={() => trackEvent('phone_click', { location: 'cta_section' })}
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-100 hover:text-white"
          >
            <Phone size={16} />
            {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
