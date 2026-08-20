import { useState, useEffect } from 'react'
import { Link, NavLink as RouterNavLink } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'

const NAV_LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'Zones d\'intervention', to: '/zones-intervention' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 font-display" onClick={() => setOpen(false)}>
          <img
            src="/logo/logo-256.png"
            alt="Logo RK Pyrénées Construction"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <span className="hidden text-sm font-bold leading-tight text-ink-900 sm:block">
            RK Pyrénées
            <br />
            Construction
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <RouterNavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-brick-500 ${isActive ? 'text-brick-500' : 'text-ink-800'}`
              }
            >
              {link.label}
            </RouterNavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            onClick={() => trackEvent('phone_click', { location: 'header' })}
            className="flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brick-500"
          >
            <Phone size={16} />
            {BUSINESS.phone}
          </a>
          <Button to="/devis" size="md">
            Devis gratuit
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 lg:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-stone-200 bg-stone-50 px-4 pb-6 pt-2 lg:hidden" aria-label="Navigation mobile">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <RouterNavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 text-base font-medium ${isActive ? 'bg-brick-50 text-brick-600' : 'text-ink-800'}`
                  }
                >
                  {link.label}
                </RouterNavLink>
              </li>
            ))}
          </ul>
          <Button to="/devis" size="lg" className="mt-4 w-full" onClick={() => setOpen(false)}>
            Demander un devis gratuit
          </Button>
        </nav>
      )}
    </header>
  )
}
