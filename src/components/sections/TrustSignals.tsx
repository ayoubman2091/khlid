import { ShieldCheck, MapPinned, FileCheck2, Hammer } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'

/**
 * Signaux de confiance honnêtes uniquement : pas de nombre de clients ni d'années
 * d'expérience inventés (voir CURRENT_SITE_AUDIT.md §3 — le site actuel affichait des
 * chiffres non vérifiables qui n'ont pas été repris ici).
 */
const SIGNALS = [
  { icon: FileCheck2, label: `Devis gratuit`, detail: 'Sans engagement, avant tout démarrage' },
  { icon: Hammer, label: 'SASU immatriculée', detail: `SIREN ${BUSINESS.siren}` },
  { icon: MapPinned, label: `Ancrée à ${BUSINESS.city}`, detail: 'Intervention locale' },
  { icon: ShieldCheck, label: 'Suivi de chantier', detail: 'Devis détaillé et réception avec vous' },
]

export function TrustSignals() {
  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
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
