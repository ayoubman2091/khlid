/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Final production domain, e.g. "https://www.example.fr" (no trailing slash). Optional — see src/lib/env.ts and DEPLOYMENT.md. */
  readonly VITE_SITE_URL?: string
  /** GA4 measurement ID, e.g. "G-XXXXXXX". Optional. */
  readonly VITE_GA4_MEASUREMENT_ID?: string
  /** Google Search Console verification meta tag content. Optional. */
  readonly VITE_GSC_VERIFICATION?: string
  /** Quote form POST endpoint (Formspree-style). Optional — falls back to mailto:. */
  readonly VITE_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
