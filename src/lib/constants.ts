/**
 * Données NAP et informations légales de l'entreprise.
 * Source : brief client + registre public des entreprises françaises (Pappers/RNE, SIREN 951 243 591).
 * Ne jamais modifier ces valeurs sans confirmation — voir CURRENT_SITE_AUDIT.md.
 */
export const BUSINESS = {
  legalName: 'RK PYRÉNÉES CONSTRUCTION',
  brandName: 'RK Pyrénées Construction',
  siren: '951 243 591',
  siret: '951 243 591 00017',
  legalForm: 'SASU',
  foundedYear: 2023,
  addressLine: '22 Allée de Bellefontaine',
  postalCode: '31100',
  city: 'Toulouse',
  region: 'Occitanie',
  department: 'Haute-Garonne',
  country: 'France',
  phone: '06 66 82 78 02',
  phoneE164: '+33666827802',
  email: 'rk.pyrenees.construction@gmail.com',
  whatsappNumber: '33666827802',
  hoursLabel: 'Du lundi au vendredi, sur rendez-vous',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61575943691606',
  mapsUrl:
    'https://www.google.com/maps/place/22+All.+de+Bellefontaine,+31100+Toulouse,+France/@43.5636312,1.4052552,788m/',
  latitude: 43.5636312,
  longitude: 1.4052552,
  siteUrl: 'https://www.rk-pyrenees-construction.fr', // à remplacer par le domaine définitif retenu
} as const

export const MAIN_CITY = 'Toulouse'

/**
 * Communes de proche banlieue confirmées par le client (2026-08-19) comme zone d'intervention réelle.
 * Aucune page dédiée n'est créée pour ces communes tant que la demande de recherche n'est pas
 * validée par des données réelles — elles apparaissent uniquement sur /zones-intervention et dans
 * une mention "zones desservies" sur les pages service. Voir SEO_ARCHITECTURE.md.
 */
export const SERVICE_AREAS = [
  'Toulouse',
  'Blagnac',
  'Colomiers',
  'Tournefeuille',
  'Balma',
  'Muret',
  'Cugnaux',
  "L'Union",
  'Castanet-Tolosan',
] as const
