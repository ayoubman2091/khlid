import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { BUSINESS, DEVELOPER } from '@/lib/constants'
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
          <div className="mt-4 flex items-center gap-2.5">
            {BUSINESS.facebookUrl && (
              <a
                href={BUSINESS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RK Pyrénées Construction sur Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-600 text-stone-200 hover:border-brick-500 hover:text-brick-500"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.36C16.24 4.32 15.36 4.25 14.33 4.25c-2.15 0-3.63 1.31-3.63 3.72V10.5H8.2v3h2.5V21h2.8Z" />
                </svg>
              </a>
            )}
            <a
              href={`https://wa.me/${BUSINESS.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'footer' })}
              aria-label="RK Pyrénées Construction sur WhatsApp"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-600 text-stone-200 hover:border-forest-700 hover:text-forest-700"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.52 3.449C18.24 1.245 15.24 0 12.05 0 5.463 0 .102 5.36.1 11.947c0 2.105.549 4.161 1.595 5.976L0 24l6.223-1.632a11.9 11.9 0 0 0 5.822 1.482h.005c6.586 0 11.946-5.36 11.949-11.947a11.86 11.86 0 0 0-3.479-8.454" />
              </svg>
            </a>
          </div>
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
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-stone-400 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:px-6 lg:px-8">
          <p>
            © {year} {BUSINESS.legalName} — {BUSINESS.legalForm}, SIREN {BUSINESS.siren}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {BUSINESS.hoursLabel && <p>{BUSINESS.hoursLabel}</p>}
            <p>
              Site développé par{' '}
              <a
                href={DEVELOPER.facebookUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="font-medium text-stone-300 hover:text-brick-500"
              >
                {DEVELOPER.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
