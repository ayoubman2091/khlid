import { ENV } from './env'

/**
 * GA4 wrapper. Sends nothing unless VITE_GA4_MEASUREMENT_ID is set at build time — never a
 * hardcoded/invented ID (see DEPLOYMENT.md #6). Call initAnalytics() once (done in main.tsx);
 * trackEvent() is then safe to call from anywhere regardless of whether GA4 is configured.
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
  | 'maps_click'
  | 'form_start'
  | 'quote_submit'
  | 'project_view'
  | 'video_play'

let initialized = false

/** Injects the GA4 tag script when a measurement ID is configured. No-op (and no network
 *  request) otherwise. Idempotent — safe to call more than once. */
export function initAnalytics() {
  if (initialized) return
  initialized = true
  const id = ENV.ga4MeasurementId
  if (!id || typeof document === 'undefined') return

  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', id)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)
}

export function trackEvent(event: ConversionEvent, params: Record<string, string> = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  } else if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[analytics:dev-only, GA4 not configured]', event, params)
  }
}
