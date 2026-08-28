import { Phone, ClipboardList } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

/**
 * Barre de conversion mobile fixe (brief §41). Masquée sur desktop (lg:hidden) et positionnée
 * derrière un padding-bottom sur le layout pour ne jamais masquer le contenu ni le footer.
 */
export function MobileBottomBar() {
  return (
    <nav
      aria-label="Actions rapides"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-stone-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur lg:hidden"
    >
      <a
        href={`tel:${BUSINESS.phoneE164}`}
        onClick={() => trackEvent('phone_click', { location: 'mobile_bottom_bar' })}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-ink-900 active:bg-stone-100"
      >
        <Phone size={20} />
        <span className="text-[11px] font-medium">Appeler</span>
      </a>
      <a
        href={`https://wa.me/${BUSINESS.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { location: 'mobile_bottom_bar' })}
        className="flex flex-col items-center justify-center gap-0.5 border-x border-stone-200 py-2.5 text-forest-700 active:bg-stone-100"
      >
        <WhatsAppIcon size={20} />
        <span className="text-[11px] font-medium">WhatsApp</span>
      </a>
      <Link
        to="/devis/"
        className="flex flex-col items-center justify-center gap-0.5 bg-brick-500 py-2.5 text-white active:bg-brick-600"
      >
        <ClipboardList size={20} />
        <span className="text-[11px] font-medium">Devis</span>
      </Link>
    </nav>
  )
}
