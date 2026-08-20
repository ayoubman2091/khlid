import { useState, type FormEvent } from 'react'
import { BUSINESS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'

const PROJECT_TYPES = [
  'Rénovation',
  'Construction neuve',
  'Maçonnerie',
  'Terrassement',
  'Dallage',
  'Extension',
  'Aménagement extérieur',
  'Autre',
]

/**
 * IMPORTANT — limite connue de cette v1 : aucun backend d'envoi de formulaire n'est
 * configuré (aucun service de type Formspree/EmailJS/fonction serverless n'a été confirmé
 * par le client, et une clé d'API ne doit jamais être exposée côté frontend — brief §52).
 * En l'état, la soumission compose un e-mail pré-rempli via mailto: vers l'adresse
 * officielle — ce qui fonctionne sans backend mais dépend du client mail installé sur
 * l'appareil du visiteur. Recommandation prioritaire de suivi : brancher un vrai service
 * d'envoi (formulaire → email/CRM) pour fiabiliser la réception des demandes de devis.
 */
export function QuoteForm() {
  const [started, setStarted] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleFocus() {
    if (!started) {
      setStarted(true)
      trackEvent('form_start')
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name')
    const phone = data.get('phone')
    const email = data.get('email')
    const city = data.get('city')
    const projectType = data.get('projectType')
    const budget = data.get('budget')
    const description = data.get('description')

    const body = [
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      `Email : ${email}`,
      `Ville : ${city}`,
      `Type de projet : ${projectType}`,
      budget ? `Budget indicatif : ${budget}` : null,
      '',
      'Description du projet :',
      description,
    ]
      .filter(Boolean)
      .join('\n')

    trackEvent('form_submit')
    trackEvent('quote_request', { project_type: String(projectType ?? '') })
    setSubmitted(true)

    window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
      `Demande de devis — ${projectType ?? 'Projet'}`,
    )}&body=${encodeURIComponent(body)}`
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-forest-700/20 bg-forest-700/5 p-8 text-center">
        <h3 className="font-display text-xl font-bold text-forest-800">Votre client mail va s'ouvrir</h3>
        <p className="mt-2 text-sm text-ink-600">
          Un e-mail pré-rempli avec votre demande vient de s'ouvrir vers {BUSINESS.email}. Il ne vous reste qu'à
          l'envoyer. Vous pouvez aussi nous appeler directement au {BUSINESS.phone}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Nom complet" name="name" required onFocus={handleFocus} />
        <Field label="Téléphone" name="phone" type="tel" required onFocus={handleFocus} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required onFocus={handleFocus} />
        <Field label="Ville du projet" name="city" required onFocus={handleFocus} />
      </div>

      <div>
        <label htmlFor="projectType" className="mb-1.5 block text-sm font-semibold text-ink-900">
          Type de projet
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          onFocus={handleFocus}
          className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 focus:border-brick-500 focus:outline-none"
        >
          <option value="">Sélectionnez un type de projet</option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <Field label="Budget indicatif (optionnel)" name="budget" required={false} onFocus={handleFocus} />

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-ink-900">
          Décrivez votre projet
        </label>
        <textarea
          id="description"
          name="description"
          required
          onFocus={handleFocus}
          rows={5}
          className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 focus:border-brick-500 focus:outline-none"
        />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Demander mon devis gratuit
      </Button>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  onFocus,
}: {
  label: string
  name: string
  type?: string
  required: boolean
  onFocus: () => void
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink-900">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        onFocus={onFocus}
        className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 focus:border-brick-500 focus:outline-none"
      />
    </div>
  )
}
