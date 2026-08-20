import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { QuoteForm } from '@/components/sections/QuoteForm'
import { SEO } from '@/seo/SEO'
import { quoteMeta } from '@/seo/pageMeta'
import { BUSINESS } from '@/lib/constants'
import { Phone } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

export default function Quote() {
  const meta = quoteMeta()
  return (
    <>
      <SEO {...meta} />
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={meta.crumbs!} />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink-900 sm:text-5xl">Demander un devis gratuit</h1>
        <p className="mt-4 text-lg text-ink-600">
          Décrivez votre projet : nous revenons vers vous avec un devis détaillé, sans engagement.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            onClick={() => trackEvent('phone_click', { location: 'quote_page' })}
            className="inline-flex items-center gap-2 font-semibold text-ink-900 hover:text-brick-500"
          >
            <Phone size={16} /> {BUSINESS.phone}
          </a>
          <a
            href={`https://wa.me/${BUSINESS.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'quote_page' })}
            className="inline-flex items-center gap-2 font-semibold text-forest-700 hover:text-forest-800"
          >
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <QuoteForm />
        </div>
      </div>
    </>
  )
}
