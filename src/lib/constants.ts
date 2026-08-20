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
  /**
   * Real Google Maps "place" embed for this exact business listing (Google's own Share →
   * Embed a map output — references the place ID directly, not just a lat/lng pin, so the
   * embedded card shows the actual listing). Single source of truth for both /contact and the
   * homepage LocationSection — never hardcode a maps src in a component.
   */
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.3694431189538!2d1.4052552!3d43.563631199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebbcd3028f1d5%3A0x345aaf506de362bd!2s22%20All.%20de%20Bellefontaine%2C%2031100%20Toulouse%2C%20France!5e1!3m2!1sfr!2sma!4v1787236216346!5m2!1sfr!2sma',
  latitude: 43.5636312,
  longitude: 1.4052552,
  /**
   * Domaine de production CONFIRMÉ par le client (2026-08-20) : https://xn--rkpyrnesconstruction-f2bb.com
   * (punycode du domaine réel actuellement en ligne — voir CURRENT_SITE_AUDIT.md §0). `VITE_SITE_URL`
   * reste le SEUL endroit à modifier pour changer le domaine partout (canonical, sitemap.xml,
   * robots.txt, Open Graph, JSON-LD, URLs d'images absolues) — voir DEPLOYMENT.md #1 ; sa valeur
   * vit dans .env.production (committé, ce n'est pas un secret). La valeur ci-dessous n'est
   * qu'un filet de sécurité pour `npm run dev` sans fichier .env — le build de production lit
   * toujours .env.production en premier.
   */
  siteUrl: (ENV.siteUrl ?? 'https://xn--rkpyrnesconstruction-f2bb.com').replace(/\/$/, ''),
} as const

/**
 * Site developer credit — NOT part of RK's own business info (BUSINESS above), so kept
 * separate. This Facebook profile is the developer's own, requested directly by the client
 * as a "site by" footer credit — unrelated to (and not a substitute for) BUSINESS.facebookUrl,
 * which is still null pending confirmation of RK's own official page.
 */
export const DEVELOPER = {
  name: 'Ayoub Touati',
  facebookUrl: 'https://web.facebook.com/touati.ayoub02',
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
