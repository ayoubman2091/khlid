import { SERVICE_AREAS } from '@/lib/constants'

export interface Zone {
  name: string
  isMainCity: boolean
  description: string
}

/**
 * Voir le commentaire sur SERVICE_AREAS dans lib/constants.ts pour la décision et sa date.
 * Aucune page dédiée par commune n'est créée ; cette liste alimente uniquement
 * /zones-intervention et la section ServiceAreas. D'autres entrées pourront être ajoutées ici
 * sans changement de structure une fois confirmées.
 */
export const ZONES: Zone[] = SERVICE_AREAS.map((name) => ({
  name,
  isMainCity: name === SERVICE_AREAS[0],
  description: 'Zone d\'intervention confirmée de RK Pyrénées Construction.',
}))
