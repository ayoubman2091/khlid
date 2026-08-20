import { SERVICE_AREAS } from '@/lib/constants'

export interface Zone {
  name: string
  isMainCity: boolean
  description: string
}

/**
 * Zones confirmées par le client (2026-08-19). Aucune page dédiée par commune n'est créée :
 * elles apparaissent uniquement ici et en mention sur les pages service, tant qu'une demande
 * de recherche réelle par commune n'a pas été confirmée (voir SEO_ARCHITECTURE.md).
 */
export const ZONES: Zone[] = SERVICE_AREAS.map((name) => ({
  name,
  isMainCity: name === 'Toulouse',
  description:
    name === 'Toulouse'
      ? 'Zone principale d\'intervention de RK Pyrénées Construction.'
      : `RK Pyrénées Construction intervient à ${name} et alentours pour vos projets de construction, rénovation et maçonnerie.`,
}))
