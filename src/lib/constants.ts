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
   * RÉSOLU 2026-09-08 — la source manquante existait : la fiche Google Business Profile de
   * l'entreprise, publiée par le client lui-même (place ID ChIJEc-FiFu7rhIRngCJK5mUsuk,
   * relevée le 2026-09-08). Ce n'est pas une supposition : c'est l'horaire que le client
   * publie déjà publiquement, et le site affichait jusqu'ici MOINS d'informations que sa
   * propre fiche. Toute modification doit être répercutée sur la fiche Google et ici en même
   * temps — la cohérence NAP+H entre les deux est précisément ce qui est exploité en local.
   */
  hoursLabel:
    'Lundi au jeudi : 8h00 – 17h00 · Vendredi : 8h00 – 16h00 · Samedi et dimanche : fermé',
  /**
   * Même source que hoursLabel, sous forme structurée pour openingHoursSpecification
   * (schema.ts). Les deux DOIVENT rester synchronisés : le texte affiché et le JSON-LD ne
   * peuvent pas se contredire.
   */
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '17:00' },
    { days: ['Friday'], opens: '08:00', closes: '16:00' },
  ] as ReadonlyArray<{ days: readonly string[]; opens: string; closes: string }>,

  /**
   * Fiche Google Business Profile de l'entreprise — l'actif le plus fort du dossier
   * (5,0/5 sur 21 avis au 2026-09-08) et, jusqu'à ce commit, totalement invisible pour une
   * machine lisant le site : aucun lien, aucun `sameAs`, et un `hasMap` qui pointait vers une
   * simple épingle d'adresse (mapsUrl ci-dessous) et non vers la fiche.
   * L'URL est construite à partir du place ID, format canonique de Google — elle ne dépend
   * d'aucun slug d'affichage et ne casse pas si le nom de la fiche change.
   */
  googlePlaceId: 'ChIJEc-FiFu7rhIRngCJK5mUsuk',
  googleBusinessUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJEc-FiFu7rhIRngCJK5mUsuk',
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

/**
 * Zone d'intervention élargie à "Toulouse et Midi-Pyrénées" (décision client, 2026-08-21 —
 * remplace la décision "Toulouse uniquement" du 2026-08-20). Ceci décrit où l'entreprise
 * INTERVIENT (zone de chalandise) et est distinct de BUSINESS.city, qui reste "Toulouse" :
 * l'adresse légale/postale du siège (SIRET, schema.org PostalAddress, Google Maps) ne change
 * pas. Une mention antérieure de 8 communes de banlieue "confirmées par le client" dans une
 * session précédente n'a pas pu être vérifiée et reste retirée : ne pas la réintroduire sans
 * une confirmation explicite et traçable. L'architecture (ZONES, /zones-intervention,
 * areaServed) reste prête à accueillir d'autres entrées dès qu'elles seront confirmées, sans
 * changement de structure — voir src/data/zones.ts et src/seo/schema.ts.
 */
export const SERVICE_AREAS = ['Toulouse et Midi-Pyrénées'] as const
