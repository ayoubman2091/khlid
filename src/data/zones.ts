import { SERVICE_AREAS } from '@/lib/constants'

export interface Zone {
  name: string
  isMainCity: boolean
  description: string
}

/**
 * Toulouse uniquement au lancement (décision finale du client, 2026-08-20) — voir le
 * commentaire sur SERVICE_AREAS dans lib/constants.ts. Aucune page dédiée par commune n'est
 * créée ; cette liste alimente uniquement /zones-intervention et la section ServiceAreas.
 * D'autres communes pourront être ajoutées ici sans changement de structure une fois
 * confirmées.
 */
export const ZONES: Zone[] = SERVICE_AREAS.map((name) => ({
  name,
  isMainCity: name === 'Toulouse',
  description: 'Zone d\'intervention confirmée de RK Pyrénées Construction.',
}))
