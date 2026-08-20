import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'
import { SERVICES } from '@/data/services'
import { ZONES } from '@/data/zones'
import { trackEvent } from '@/lib/analytics'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink-950 text-stone-200">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <img src="/logo/logo-256.png" alt="Logo RK Pyrénées Construction" width={40} height={40} className="h-10 w-10 rounded-full bg-white" />
            <span className="font-display text-sm font-bold text-white">RK Pyrénées Construction</span>
          </div>
          <p className="text-sm leading-relaxed text-stone-300">
            Construction, rénovation, maçonnerie et aménagement extérieur à Toulouse.
          </p>
          {BUSINESS.facebookUrl && (
            <a
              href={BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RK Pyrénées Construction sur Facebook"
              className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-600 text-stone-200 hover:border-brick-500 hover:text-brick-500"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.36C16.24 4.32 15.36 4.25 14.33 4.25c-2.15 0-3.63 1.31-3.63 3.72V10.5H8.2v3h2.5V21h2.8Z" />
              </svg>
            </a>
          )}
        </div>

        <div>
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-white">Services</h2>
          <ul className="space-y-2.5 text-sm text-stone-300">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-brick-500">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-white">Zones d'intervention</h2>
          <ul className="space-y-2.5 text-sm text-stone-300">
            {ZONES.map((z) => (
              <li key={z.name}>{z.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-white">Contact</h2>
          <ul className="space-y-3 text-sm text-stone-300">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brick-500" />
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('maps_click', { location: 'footer' })}
                className="hover:text-brick-500"
              >
                {BUSINESS.addressLine}, {BUSINESS.postalCode} {BUSINESS.city}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-brick-500" />
              <a href={`tel:${BUSINESS.phoneE164}`} onClick={() => trackEvent('phone_click', { location: 'footer' })} className="hover:text-brick-500">
                {BUSINESS.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-brick-500" />
              <a href={`mailto:${BUSINESS.email}`} onClick={() => trackEvent('email_click', { location: 'footer' })} className="break-all hover:text-brick-500">
                {BUSINESS.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {BUSINESS.legalName} — {BUSINESS.legalForm}, SIREN {BUSINESS.siren}
          </p>
          {BUSINESS.hoursLabel && <p>{BUSINESS.hoursLabel}</p>}
        </div>
      </div>
    </footer>
  )
}
