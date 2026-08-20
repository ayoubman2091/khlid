/**
 * Wrapper GA4 minimal. N'envoie rien tant que GA4 n'est pas installé (aucun ID de mesure
 * n'est configuré dans cette v1 — voir brief §42/§43). Quand un ID GA4 réel sera fourni,
 * brancher gtag() dans index.html et cette fonction commencera à pousser les événements
 * sans qu'aucun autre fichier du projet n'ait à changer.
 */
type GtagFn = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: GtagFn
    dataLayer?: unknown[]
  }
}

export type ConversionEvent =
  | 'phone_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'form_start'
  | 'form_submit'
  | 'quote_request'
  | 'project_view'
  | 'video_play'

export function trackEvent(event: ConversionEvent, params: Record<string, string> = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  } else if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[analytics:dev-only]', event, params)
  }
}
