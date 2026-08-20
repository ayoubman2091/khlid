import type { ReactNode } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { QuoteForm } from '@/components/sections/QuoteForm'
import { SEO } from '@/seo/SEO'
import { contactMeta } from '@/seo/pageMeta'
import { BUSINESS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

export default function Contact() {
  const meta = contactMeta()
  return (
    <>
      <SEO {...meta} />
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={meta.crumbs!} />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink-900 sm:text-5xl">Contact</h1>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="space-y-6 lg:col-span-2">
          <InfoRow icon={Phone} label="Téléphone">
            <a href={`tel:${BUSINESS.phoneE164}`} onClick={() => trackEvent('phone_click', { location: 'contact_page' })} className="hover:text-brick-500">
              {BUSINESS.phone}
            </a>
          </InfoRow>
          <InfoRow icon={Mail} label="Email">
            <a href={`mailto:${BUSINESS.email}`} onClick={() => trackEvent('email_click', { location: 'contact_page' })} className="break-all hover:text-brick-500">
              {BUSINESS.email}
            </a>
          </InfoRow>
          <InfoRow icon={MapPin} label="Adresse">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('maps_click', { location: 'contact_page' })}
              className="hover:text-brick-500"
            >
              {BUSINESS.addressLine}, {BUSINESS.postalCode} {BUSINESS.city}
            </a>
          </InfoRow>
          {BUSINESS.hoursLabel && (
            <InfoRow icon={Clock} label="Horaires">
              {BUSINESS.hoursLabel}
            </InfoRow>
          )}

          <div className="overflow-hidden rounded-2xl border border-stone-200">
            <iframe
              title="Localisation RK Pyrénées Construction sur Google Maps"
              src={BUSINESS.mapsEmbedUrl}
              className="h-64 w-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink-900">Demander un devis gratuit</h2>
            <p className="mt-1.5 text-sm text-ink-600">Réponse dès que possible, sans engagement.</p>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function InfoRow({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brick-50 text-brick-500">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-ink-900">{children}</p>
      </div>
    </div>
  )
}
