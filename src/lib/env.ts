/**
 * Centralized environment variable access. Every value here is OPTIONAL and the app must
 * degrade gracefully when unset — never invent a fallback ID/credential. See DEPLOYMENT.md
 * for exactly which variables exist, what each one unlocks, and where to set them.
 *
 * Vite only exposes variables prefixed `VITE_` to client code, and only injects them at
 * build time (there is no runtime env access in the shipped bundle).
 */
export const ENV = {
  /** Final production domain, e.g. "https://www.example.fr" (no trailing slash). Falls back
   *  to a clearly-marked placeholder in lib/constants.ts when unset — see DEPLOYMENT.md #1. */
  siteUrl: import.meta.env.VITE_SITE_URL as string | undefined,

  /** GA4 measurement ID, e.g. "G-XXXXXXX". Analytics stay inert (dev-console-only) until set. */
  ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined,

  /** Google Search Console HTML-tag verification value (the `content` of the
   *  google-site-verification meta tag) — NOT the whole tag. */
  gscVerification: import.meta.env.VITE_GSC_VERIFICATION as string | undefined,

  /** POST endpoint for the quote form (Formspree-style: accepts multipart/form-data or JSON,
   *  returns 2xx on success). Form falls back to a mailto: draft when unset. */
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT as string | undefined,
} as const
