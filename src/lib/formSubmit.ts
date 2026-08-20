import { ENV } from './env'
import { BUSINESS } from './constants'

export interface QuoteSubmission {
  name: string
  phone: string
  email: string
  city: string
  projectType: string
  budget?: string
  description: string
}

export type SubmitResult = { ok: true; mode: 'endpoint' | 'mailto' } | { ok: false; error: string }

/**
 * Provider-agnostic quote-form submission — see audit item #22.
 *
 * When VITE_FORM_ENDPOINT is set, POSTs the data as JSON to that endpoint (compatible with
 * Formspree-style endpoints out of the box: JSON body + `Accept: application/json` returns a
 * 2xx on success without any extra client library). Falls back to a mailto: draft when no
 * endpoint is configured yet, exactly like before — but NEVER reports success on a failed
 * request either way; a failed fetch surfaces as a real error state so the visitor can retry
 * or fall back to calling directly, instead of believing an unsent request went through.
 * See DEPLOYMENT.md #8 for exactly which env var to set and what the endpoint must accept.
 */
export async function submitQuote(data: QuoteSubmission): Promise<SubmitResult> {
  if (ENV.formEndpoint) {
    try {
      const res = await fetch(ENV.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) return { ok: true, mode: 'endpoint' }
      return { ok: false, error: `Le service de formulaire a répondu avec une erreur (${res.status}).` }
    } catch {
      return { ok: false, error: 'Impossible de contacter le service de formulaire pour le moment.' }
    }
  }

  // No backend configured yet — open a pre-filled mailto: draft instead (same behavior as
  // before this refactor, now reachable through the same interface a real endpoint uses).
  const body = [
    `Nom : ${data.name}`,
    `Téléphone : ${data.phone}`,
    `Email : ${data.email}`,
    `Ville : ${data.city}`,
    `Type de projet : ${data.projectType}`,
    data.budget ? `Budget indicatif : ${data.budget}` : null,
    '',
    'Description du projet :',
    data.description,
  ]
    .filter(Boolean)
    .join('\n')

  window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
    `Demande de devis — ${data.projectType || 'Projet'}`,
  )}&body=${encodeURIComponent(body)}`

  return { ok: true, mode: 'mailto' }
}
