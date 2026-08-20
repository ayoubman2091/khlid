import { BUSINESS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

const PREFILLED_MESSAGE = 'Bonjour, je vous contacte via votre site internet pour un projet à Toulouse.'

/**
 * Persistent floating WhatsApp button — visible on every page, on both mobile and desktop,
 * fixed so it stays on screen while scrolling ("bouge avec la page").
 *
 * Positioned above MobileBottomBar on mobile (which is itself fixed at the very bottom,
 * lg:hidden) so the two never overlap; drops to a standard bottom-right FAB position on
 * desktop, where MobileBottomBar doesn't render at all.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { location: 'floating_button' })}
      aria-label="Contactez-nous sur WhatsApp"
      title="WhatsApp"
      className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 active:scale-95 sm:right-6 lg:bottom-6 lg:h-16 lg:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-25 animate-ping" />
      <WhatsAppIcon size={28} className="relative" />
    </a>
  )
}
