import type { Service } from '@/types'

/**
 * Les 7 services listés ici sont ceux réellement annoncés par RK Pyrénées Construction
 * (site actuel + brief client). Aucun service n'est inventé. Les visuels sont les vraies
 * photos de chantier récupérées du site actuel (voir CURRENT_SITE_AUDIT.md §5.1) —
 * les légendes décrivent honnêtement ce qui est visible, sans inventer d'adresse, de
 * client ou de date.
 */
export const SERVICES: Service[] = [
  {
    slug: 'renovation',
    name: 'Rénovation intérieure & extérieure',
    shortName: 'Rénovation',
    tagline: 'Rénover une maison ou un appartement, du gros œuvre aux finitions',
    metaTitle: 'Rénovation maison à Toulouse — Devis gratuit | RK Pyrénées Construction',
    metaDescription:
      "Entreprise de rénovation à Toulouse : rénovation intérieure, extérieure, maison ancienne. Devis gratuit avec RK Pyrénées Construction, artisan local.",
    h1: 'Rénovation maison et appartement à Toulouse',
    intro:
      "RK Pyrénées Construction accompagne les propriétaires de la région toulousaine sur des chantiers de rénovation intérieure et extérieure : reprise de murs, ouvertures, sols, façades et remise à niveau de bâti ancien. Chaque chantier est cadré par un devis détaillé avant le démarrage des travaux.",
    includes: [
      'Rénovation intérieure (sols, cloisons, ouvertures)',
      'Rénovation de façade et reprise d\'enduit',
      'Remplacement de menuiseries (fenêtres, baies) en maçonnerie existante',
      'Réfection de sols intérieurs (chapes, sols coulés)',
      'Remise en état de bâti ancien (pierre, brique toulousaine)',
    ],
    process: [
      { title: 'Visite et diagnostic', description: "Visite du site, évaluation de l'état du bâti et des travaux nécessaires." },
      { title: 'Devis détaillé', description: 'Devis gratuit décrivant les travaux, matériaux et délais avant tout engagement.' },
      { title: 'Réalisation des travaux', description: 'Exécution du chantier avec suivi régulier et photos d\'avancement.' },
      { title: 'Réception du chantier', description: 'Visite de fin de chantier avec vous pour valider le résultat.' },
    ],
    heroImage: { stem: 'img-20250515-wa0001-YbNBry5o7qCr23Mb', alt: 'Rénovation de façade d\'une maison en zone urbaine à Toulouse, chantier RK Pyrénées Construction' },
    gallery: [
      { stem: '47061-vBTBOy9ywctKb4Gh', alt: 'Reprise structurelle d\'un mur ancien en pierre et brique dans une cour intérieure, coffrage de poteau béton' },
      { stem: '47064-FC3fozwBw3SpmrTr', alt: 'Coffrage bois d\'un poteau béton contre un mur ancien lors d\'une rénovation structurelle' },
      { stem: '1000048237-YBg7z8JKoVSWg59E', alt: 'Pose d\'une fenêtre PVC dans une ouverture de mur en pierre lors d\'une rénovation de maison ancienne' },
      { stem: '1000048238-YNqB4NzjX8tp1BDE', alt: 'Sol intérieur en béton lissé après rénovation, pièce aux murs blancs' },
      { stem: '47086-IXEN9YGacJ9S3ExD', alt: 'Façade fraîchement enduite d\'un bâtiment annexe avec toiture en tuiles' },
      { stem: '47105-9zbaZCYWPP8pQKUC', alt: 'Bâtiment annexe rénové avec enduit neuf et toiture tuile, cour en gravier' },
    ],
    relatedServiceSlugs: ['maconnerie', 'dallage'],
    primaryKeywordCluster: 'RENOVATION_MAISON_TOULOUSE',
  },
  {
    slug: 'construction',
    name: 'Construction neuve',
    shortName: 'Construction',
    tagline: "Gros œuvre, fondations et structures béton armé pour maisons, extensions et bâtiments professionnels",
    metaTitle: 'Entreprise de gros œuvre à Toulouse | RK Pyrénées Construction',
    metaDescription:
      "Entreprise de gros œuvre à Toulouse : fondations, élévation de murs, structures en béton armé pour construction neuve et extension. Devis gratuit.",
    h1: 'Entreprise de gros œuvre et construction neuve à Toulouse',
    intro:
      "RK Pyrénées Construction réalise les travaux de gros œuvre à Toulouse et en Midi-Pyrénées : fondations, murs de soubassement, élévation en parpaing ou en brique, dalles et structures en béton armé. Le gros œuvre constitue la structure porteuse du bâtiment, sur des chantiers de construction neuve comme d'extension, en résidentiel comme en professionnel. Chaque chantier est chiffré par un devis détaillé avant le démarrage des travaux.",
    includes: [
      'Fondations et murs de soubassement',
      'Élévation de murs en parpaing ou brique',
      'Structures en béton armé (dalles, poteaux, escaliers)',
      'Gros œuvre pour bâtiments résidentiels et professionnels',
    ],
    process: [
      { title: 'Étude du projet', description: 'Analyse des plans et du terrain avant chiffrage.' },
      { title: 'Devis et planning', description: 'Devis détaillé et calendrier de chantier transmis avant démarrage.' },
      { title: 'Gros œuvre', description: 'Fondations, élévation des murs et structures béton armé.' },
      { title: 'Suivi de chantier', description: 'Points d\'étape réguliers jusqu\'à la livraison du gros œuvre.' },
    ],
    heroImage: { stem: '1000048194-A1aP2raD33t64j93', alt: 'Immeuble en construction en brique avec échafaudage, chantier urbain' },
    gallery: [
      { stem: '1000047990-mk3vP0QrzBHp2jJO', alt: 'Fondations en parpaings d\'une construction neuve, terrain dégagé' },
      { stem: '1000048023-YKb3QNo5MMSW2PZO', alt: 'Coulage de dalle béton armé au tapis pompe sur un chantier de bâtiment professionnel' },
      { stem: '1000048191-mePxr1wGNNi5jB29', alt: 'Ferraillage et coulage de dalle béton devant un bâtiment vitré' },
      { stem: '1000048230-AGB2J3pZ7QfLrWjp', alt: 'Coffrage bois et ferraillage d\'un escalier en béton armé en cours de construction' },
    ],
    relatedServiceSlugs: ['extension', 'maconnerie', 'terrassement'],
    primaryKeywordCluster: 'CONSTRUCTION_TOULOUSE',
  },
  {
    slug: 'maconnerie',
    name: 'Maçonnerie générale',
    shortName: 'Maçonnerie',
    tagline: 'Murs, ouvertures, structures béton armé',
    metaTitle: 'Maçon à Toulouse — Maçonnerie générale | RK Pyrénées Construction',
    metaDescription:
      'Maçon à Toulouse pour tous travaux de maçonnerie générale : murs, ouvertures, structures béton armé, reprises. Devis gratuit RK Pyrénées Construction.',
    h1: 'Maçon à Toulouse — maçonnerie générale',
    intro:
      "Travaux de maçonnerie générale à Toulouse : montage de murs, structures en béton armé, reprises sur bâti existant. RK Pyrénées Construction intervient aussi bien en construction neuve qu'en rénovation.",
    includes: [
      'Montage et élévation de murs',
      'Structures béton armé (poteaux, poutres, escaliers)',
      'Reprises et renforts sur mur existant',
      'Ouvertures dans mur porteur (en lien avec un bureau d\'études si nécessaire)',
    ],
    process: [
      { title: 'Diagnostic sur site', description: 'Évaluation de la structure existante ou du projet neuf.' },
      { title: 'Devis détaillé', description: 'Chiffrage clair des matériaux et de la main d\'œuvre.' },
      { title: 'Exécution', description: 'Travaux de maçonnerie réalisés selon les règles de l\'art.' },
      { title: 'Finitions', description: 'Nettoyage de chantier et remise en état des abords.' },
    ],
    heroImage: { stem: '1000048230-AGB2J3pZ7QfLrWjp', alt: 'Coffrage et ferraillage d\'un escalier en béton armé sur un chantier de maçonnerie' },
    gallery: [
      { stem: '47061-vBTBOy9ywctKb4Gh', alt: 'Travaux de maçonnerie générale : coffrage de poteau contre un mur ancien en pierre' },
      { stem: '1000048237-YBg7z8JKoVSWg59E', alt: 'Reprise de maçonnerie autour d\'une ouverture de fenêtre dans un mur en pierre' },
      { stem: '1000047990-mk3vP0QrzBHp2jJO', alt: 'Murs de fondation en parpaings montés pour une construction neuve' },
    ],
    relatedServiceSlugs: ['construction', 'renovation'],
    primaryKeywordCluster: 'MACONNERIE_TOULOUSE',
  },
  {
    slug: 'terrassement',
    name: 'Terrassement',
    shortName: 'Terrassement',
    tagline: 'Préparation de terrain avant dalle, fondation ou aménagement',
    metaTitle: 'Terrassement à Toulouse | RK Pyrénées Construction',
    metaDescription:
      'Entreprise de terrassement à Toulouse : préparation de terrain, ferraillage et mise à niveau avant coulage de dalle. Devis gratuit.',
    h1: 'Terrassement à Toulouse',
    intro:
      "Avant tout coulage de dalle ou toute construction, RK Pyrénées Construction prépare le terrain : décaissement, mise à niveau et pose du ferraillage nécessaire à un béton durable.",
    includes: [
      'Préparation et nivellement de terrain',
      'Pose de ferraillage avant coulage de dalle',
      'Préparation de plateforme pour terrasse, allée ou garage',
    ],
    process: [
      { title: 'Visite de terrain', description: 'Analyse du sol et de l\'accès chantier.' },
      { title: 'Devis', description: 'Chiffrage du terrassement selon la surface et la nature du sol.' },
      { title: 'Décaissement et nivellement', description: 'Préparation du terrain aux bonnes cotes.' },
      { title: 'Ferraillage', description: 'Pose du ferraillage prêt pour le coulage de dalle.' },
    ],
    heroImage: { stem: '1000048017-YNqB4pkJVqUB6ajv', alt: 'Ferraillage posé à plat pour une dalle béton, terrain clos avant coulage' },
    gallery: [
      { stem: '47122-Bsv7dob9NkU8wk9R', alt: 'Ferraillage préparé pour une dalle béton, coffrage bois en périphérie' },
      { stem: '1000048035-AR0LR7pqw7sx9Oye', alt: 'Dalle béton fraîchement coulée dans un quartier résidentiel, clôture de chantier' },
    ],
    relatedServiceSlugs: ['dallage', 'construction'],
    primaryKeywordCluster: 'TERRASSEMENT_TOULOUSE',
  },
  {
    slug: 'dallage',
    name: 'Dallage',
    shortName: 'Dallage',
    tagline: 'Dalles béton, terrasses et pavage extérieur',
    metaTitle: 'Dallage et terrasse béton à Toulouse | RK Pyrénées Construction',
    metaDescription:
      'Dallage extérieur, terrasse béton et pavage à Toulouse : coulage, finition et pavage pierre naturelle. Devis gratuit RK Pyrénées Construction.',
    h1: 'Dallage et terrasses béton à Toulouse',
    intro:
      "Terrasses en béton coulé, allées et plages de piscine en pierre naturelle : RK Pyrénées Construction réalise le dallage extérieur du terrassement à la finition.",
    includes: [
      'Dalles béton pour terrasse, allée ou garage',
      'Pavage de plage de piscine en pierre naturelle',
      'Allées et cheminements extérieurs',
      'Marches et perrons extérieurs',
    ],
    process: [
      { title: 'Étude et devis', description: 'Prise de mesures et devis selon la surface et la finition choisie.' },
      { title: 'Terrassement', description: 'Préparation du support (voir aussi notre service terrassement).' },
      { title: 'Coulage ou pose', description: 'Coulage de la dalle béton ou pose du dallage pierre.' },
      { title: 'Finition', description: 'Talochage, joints et nettoyage final.' },
    ],
    heroImage: { stem: '1000048005-YX4lrXn3lRc4LqEY', alt: 'Dallage en pierre naturelle le long d\'une piscine, finition aux joints en cours' },
    gallery: [
      { stem: '1000048008-m5KMqeXz8lhPN1nJ', alt: 'Plage de piscine dallée en pierre naturelle, vue d\'ensemble' },
      { stem: '1000048044-A0xl8WOkxaSr38r9', alt: 'Dalle béton fraîchement coulée en terrasse contre une maison en briques toulousaines' },
      { stem: '1000048047-AoPWr6vlwJh1K1pl', alt: 'Terrasse béton dans un jardin aménagé, bordure en briques' },
      { stem: '1000048182-A0xl8rQ1lxF56lR2', alt: 'Escalier extérieur en pierre reconstituée menant à une maison ancienne' },
      { stem: '47114-G3SfzQkdwWnt55Ee', alt: 'Terrasse béton fraîchement coulée dans un jardin clôturé' },
      { stem: '1000048041-Yan1kzGqXBIjy3Ka', alt: 'Allée en béton le long d\'un garage, finition talochée' },
    ],
    relatedServiceSlugs: ['terrassement', 'amenagement-exterieur'],
    primaryKeywordCluster: 'DALLAGE_TOULOUSE',
  },
  {
    slug: 'extension',
    name: 'Extension de maison',
    shortName: 'Extension',
    tagline: 'Agrandir une maison existante',
    metaTitle: 'Extension de maison à Toulouse — Devis | RK Pyrénées Construction',
    metaDescription:
      'Extension et agrandissement de maison à Toulouse : gros œuvre, fondations et structure. Devis gratuit avec RK Pyrénées Construction.',
    h1: 'Extension de maison à Toulouse',
    intro:
      "Agrandir une maison existante demande la même rigueur qu'une construction neuve : fondations adaptées à l'existant, structure béton armé et raccordement propre au bâti d'origine. RK Pyrénées Construction prend en charge le gros œuvre de votre extension.",
    includes: [
      'Fondations adaptées au bâti existant',
      'Structure béton armé de l\'extension',
      'Élévation de murs en continuité de la maison existante',
    ],
    process: [
      { title: 'Étude de faisabilité', description: 'Visite du site et analyse de la structure existante.' },
      { title: 'Devis', description: 'Chiffrage détaillé du gros œuvre de l\'extension.' },
      { title: 'Fondations', description: 'Réalisation des fondations en cohérence avec le bâti existant.' },
      { title: 'Structure', description: 'Élévation des murs et de la structure béton armé.' },
    ],
    heroImage: { stem: '1000047990-mk3vP0QrzBHp2jJO', alt: 'Fondations en parpaings prêtes pour l\'élévation d\'une structure, exemple de gros œuvre' },
    gallery: [
      { stem: '1000048230-AGB2J3pZ7QfLrWjp', alt: 'Coffrage et ferraillage d\'une structure béton armé, exemple de gros œuvre' },
      { stem: '1000048017-YNqB4pkJVqUB6ajv', alt: 'Ferraillage posé avant coulage de dalle, préparation de fondation' },
    ],
    relatedServiceSlugs: ['construction', 'maconnerie'],
    primaryKeywordCluster: 'EXTENSION_MAISON_TOULOUSE',
  },
  {
    slug: 'amenagement-exterieur',
    name: 'Aménagement extérieur',
    shortName: 'Aménagement extérieur',
    tagline: 'Terrasses, allées et abords de la maison',
    metaTitle: 'Aménagement extérieur à Toulouse | RK Pyrénées Construction',
    metaDescription:
      "Aménagement extérieur à Toulouse : terrasses, allées, perrons et abords en béton ou pierre naturelle. Devis gratuit RK Pyrénées Construction.",
    h1: 'Aménagement extérieur à Toulouse',
    intro:
      "RK Pyrénées Construction aménage les abords de votre maison : terrasses, allées et perrons en béton ou pierre naturelle. Ce service porte sur la structure et le dallage extérieur — pas sur la création de jardins végétalisés.",
    includes: [
      'Terrasses en béton ou pierre naturelle',
      'Allées et cheminements',
      'Perrons et marches extérieures',
    ],
    process: [
      { title: 'Visite et devis', description: 'Prise de mesures des abords et devis détaillé.' },
      { title: 'Préparation du terrain', description: 'Terrassement et mise à niveau.' },
      { title: 'Réalisation', description: 'Coulage ou pose selon le projet retenu.' },
    ],
    heroImage: { stem: '1000048182-A0xl8rQ1lxF56lR2', alt: 'Escalier extérieur en pierre reconstituée devant une maison ancienne' },
    gallery: [
      { stem: '47114-G3SfzQkdwWnt55Ee', alt: 'Terrasse béton fraîchement coulée dans un jardin clôturé' },
      { stem: '1000048047-AoPWr6vlwJh1K1pl', alt: 'Terrasse en béton aménagée dans un jardin avec bordures en briques' },
    ],
    relatedServiceSlugs: ['dallage', 'terrassement'],
    primaryKeywordCluster: 'AMENAGEMENT_EXTERIEUR_TOULOUSE',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
