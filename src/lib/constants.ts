import { ENV } from './env'

/**
 * Données NAP et informations légales de l'entreprise.
 * Source : brief client + registre public des entreprises françaises (Pappers/RNE, SIREN 951 243 591).
 * Ne jamais modifier ces valeurs sans confirmation — voir CURRENT_SITE_AUDIT.md.
 */
export const BUSINESS = {
  /**
   * NEEDS CLIENT CONFIRMATION — orthographe légale.
   * Le registre public (Pappers/RNE, source vérifiable) donne "RK PYRENNEES CONSTRUCTION"
   * (double N, sans accent) pour la raison sociale déclarée — voir CURRENT_SITE_AUDIT.md §4.
   * On utilise donc cette orthographe (la seule sourcée) pour tout ce qui est légal
   * (schema.org Organization.legalName, copyright footer). Le nom de marque affiché
   * partout ailleurs reste "RK Pyrénées Construction" (brandName ci-dessous), qui n'est
   * pas en cause. Cette valeur doit être confirmée explicitement par le client avant
   * publication finale — ne pas la modifier sans cette confirmation.
   */
  legalName: 'RK PYRENNEES CONSTRUCTION',
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
  /**
   * NEEDS CLIENT CONFIRMATION — horaires. Aucune source vérifiée pour l'instant
   * (voir CURRENT_SITE_AUDIT.md §8). Laisser `null` tant que ce n'est pas confirmé :
   * les composants qui l'utilisent (Footer, Contact) n'affichent rien si la valeur est vide,
   * plutôt que de publier une information non vérifiée.
   */
  hoursLabel: null as string | null,
  /**
   * NEEDS CLIENT CONFIRMATION — l'URL Facebook n'a pas été vérifiée comme étant la page
   * officielle de l'entreprise (voir CURRENT_SITE_AUDIT.md §8). Laisser `null` tant que ce
   * n'est pas confirmé plutôt que de publier un lien non vérifié dans le footer ou en `sameAs`.
   */
  facebookUrl: null as string | null,
  mapsUrl:
    'https://www.google.com/maps/place/22+All.+de+Bellefontaine,+31100+Toulouse,+France/@43.5636312,1.4052552,788m/',
  latitude: 43.5636312,
  longitude: 1.4052552,
  /**
   * NEEDS CLIENT CONFIRMATION — domaine de production final. `VITE_SITE_URL` est le SEUL
   * endroit à modifier pour changer le domaine partout (canonical, sitemap.xml, robots.txt,
   * Open Graph, JSON-LD, URLs d'images absolues) — voir DEPLOYMENT.md #1. Tant que cette
   * variable n'est pas définie au build, la valeur ci-dessous (placeholder) est utilisée ;
   * NE PAS considérer ce domaine comme définitif.
   */
  siteUrl: (ENV.siteUrl ?? 'https://www.rk-pyrenees-construction.fr').replace(/\/$/, ''),
} as const

export const MAIN_CITY = 'Toulouse'

/**
 * Zone d'intervention confirmée au lancement : Toulouse uniquement (décision finale du
 * client — voir l'échange du 2026-08-20). Une mention antérieure de 8 communes de banlieue
 * "confirmées par le client" dans une session précédente n'a pas pu être vérifiée et a été
 * retirée : ne pas la réintroduire sans une confirmation explicite et traçable. L'architecture
 * (ZONES, /zones-intervention, areaServed) reste prête à accueillir d'autres communes dès
 * qu'elles seront confirmées, sans changement de structure — voir src/data/zones.ts.
 */
export const SERVICE_AREAS = ['Toulouse'] as const
