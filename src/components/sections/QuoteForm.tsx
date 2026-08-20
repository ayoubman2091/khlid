import { useState, type FormEvent } from 'react'
import { AlertCircle } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'
import { submitQuote } from '@/lib/formSubmit'
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

export function QuoteForm() {
  const [started, setStarted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const [submittedVia, setSubmittedVia] = useState<'endpoint' | 'mailto'>('mailto')
  const [error, setError] = useState<string | null>(null)

  function handleFocus() {
    if (!started) {
      setStarted(true)
      trackEvent('form_start')
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const projectType = String(data.get('projectType') ?? '')

    setStatus('submitting')
    setError(null)

    const result = await submitQuote({
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      city: String(data.get('city') ?? ''),
      projectType,
      budget: data.get('budget') ? String(data.get('budget')) : undefined,
      description: String(data.get('description') ?? ''),
    })

    if (result.ok) {
      trackEvent('quote_submit', { project_type: projectType, mode: result.mode })
      setSubmittedVia(result.mode)
      setStatus('submitted')
    } else {
      setError(result.error)
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    return (
      <div className="rounded-2xl border border-forest-700/20 bg-forest-700/5 p-8 text-center">
        <h3 className="font-display text-xl font-bold text-forest-800">
          {submittedVia === 'endpoint' ? 'Votre demande a bien été envoyée' : "Votre client mail va s'ouvrir"}
        </h3>
        <p className="mt-2 text-sm text-ink-600">
          {submittedVia === 'endpoint'
            ? `Nous revenons vers vous dès que possible. Vous pouvez aussi nous appeler directement au ${BUSINESS.phone}.`
            : `Un e-mail pré-rempli avec votre demande vient de s'ouvrir vers ${BUSINESS.email}. Il ne vous reste qu'à l'envoyer. Vous pouvez aussi nous appeler directement au ${BUSINESS.phone}.`}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'error' && error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-brick-500/30 bg-brick-50 p-4 text-sm text-brick-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>
            {error} Vous pouvez réessayer, ou nous appeler directement au{' '}
            <a href={`tel:${BUSINESS.phoneE164}`} className="font-semibold underline">
              {BUSINESS.phone}
            </a>
            .
          </p>
        </div>
      )}

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

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Envoi en cours…' : 'Demander mon devis gratuit'}
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
