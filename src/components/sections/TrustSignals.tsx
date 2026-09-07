import { ShieldCheck, MapPinned, FileCheck2, Star } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'

/**
 * Signaux de confiance honnêtes uniquement : pas de nombre de clients ni d'années
 * d'expérience inventés (voir CURRENT_SITE_AUDIT.md §3 — le site actuel affichait des
 * chiffres non vérifiables qui n'ont pas été repris ici).
 *
 * Ajout 2026-09-07 — la note Google. L'entreprise a 21 avis pour 5,0 sur sa fiche Google
 * Business Profile, la meilleure note du panel de concurrents relevé sur « entreprise gros
 * oeuvre Toulouse » (Eiffage 3,1/20 · BTROC 3,7/16 · Mesaglio 4,3/6). Ce chiffre n'était
 * affiché nulle part sur le site : le principal actif de réputation de l'entreprise était
 * invisible pour un visiteur qui atterrit ici sans passer par Maps, et invisible pour les
 * moteurs de réponse IA qui lisent le texte de la page.
 *
 * Affiché en TEXTE et lié à la fiche — jamais en `aggregateRating` JSON-LD : Google interdit
 * de baliser sur son propre site une note agrégée provenant d'une plateforme tierce.
 * Le lien sort vers la fiche, ce qui alimente aussi les signaux d'engagement du GBP.
 */
const SIGNALS = [
  { icon: FileCheck2, label: `Devis gratuit`, detail: 'Sans engagement, avant tout démarrage' },
  { icon: ShieldCheck, label: 'SASU immatriculée', detail: `SIREN ${BUSINESS.siren}` },
  { icon: MapPinned, label: `Ancrée à ${BUSINESS.city}`, detail: 'Intervention locale' },
]

export function TrustSignals() {
  const rating = BUSINESS.googleRating.toLocaleString('fr-FR', { minimumFractionDigits: 1 })

  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        <a
          href={BUSINESS.googleBusinessUrl}
          target="_blank"
          rel="noopener"
          className="flex items-start gap-3 rounded-lg transition-colors hover:bg-stone-50"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brick-50 text-brick-500">
            <Star size={20} />
          </span>
          <div>
            <p className="font-display text-sm font-bold text-ink-900">
              {rating} / 5 sur Google
            </p>
            <p className="text-xs text-ink-600">
              {BUSINESS.googleReviewCount} avis clients vérifiés
            </p>
          </div>
        </a>
        {SIGNALS.map(({ icon: Icon, label, detail }) => (
          <div key={label} className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brick-50 text-brick-500">
              <Icon size={20} />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-ink-900">{label}</p>
              <p className="text-xs text-ink-600">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
