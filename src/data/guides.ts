import type { Guide } from '@/types'

/**
 * Contenu informationnel SANS aucune indication de prix (décision client, 2026-08-20 : aucun
 * contenu tarifaire visible côté client, quel qu'il soit — plus de fourchettes, plus de prix au
 * m², plus de guides "prix X"). Les anciens guides de prix (prix-renovation-maison,
 * prix-construction-maison, prix-maconnerie, prix-terrassement) ont été retirés et remplacés par
 * des guides pratiques (étapes de chantier, comment choisir une entreprise) qui reprennent
 * honnêtement le déroulement réel des chantiers RK Pyrénées Construction déjà documenté dans
 * src/data/services.ts — rien n'est inventé, aucun chiffre n'est cité. Voir
 * CONTENT_STRATEGY_NO_PRICING.md pour le détail de ce changement de stratégie.
 */
export const GUIDES: Guide[] = [
  {
    slug: 'comment-choisir-son-entreprise-de-renovation',
    title: 'Comment choisir son entreprise de rénovation à Toulouse ?',
    metaTitle: 'Comment choisir son entreprise de rénovation à Toulouse ? | RK Pyrénées Construction',
    metaDescription: 'Les points à vérifier avant de choisir une entreprise de rénovation ou de construction à Toulouse : devis, assurance, avis, suivi de chantier.',
    h1: 'Comment choisir son entreprise de rénovation ?',
    dek: 'Quelques points de vigilance avant de vous engager avec une entreprise de rénovation ou de construction.',
    sections: [
      {
        heading: 'Un devis détaillé, pas une estimation vague',
        body:
          "Un devis sérieux détaille les postes de travaux, les matériaux et les délais — pas seulement un prix global. Cela vous permet de comparer plusieurs entreprises sur des bases claires.",
      },
      {
        heading: 'La transparence en cours de chantier',
        body:
          "Demandez comment l'entreprise gère les imprévus ou les modifications de projet : un avenant chiffré avant travaux supplémentaires est un bon signe de sérieux.",
      },
      {
        heading: 'La proximité et la réactivité',
        body:
          "Une entreprise locale, qui connaît le bâti toulousain (pierre, brique ancienne) et peut se déplacer facilement sur votre chantier, simplifie le suivi et la réactivité en cas de besoin.",
      },
    ],
    sourceNote: 'Conseils généraux, non sourcés à un organisme tiers spécifique.',
    relatedServiceSlugs: ['renovation'],
  },
  {
    slug: 'etapes-renovation-maison',
    title: "Les étapes d'une rénovation de maison",
    metaTitle: "Étapes d'une rénovation de maison à Toulouse | RK Pyrénées Construction",
    metaDescription:
      "Quelles sont les grandes étapes d'un projet de rénovation, de la première visite à la réception du chantier ? Le déroulement chez RK Pyrénées Construction à Toulouse.",
    h1: "Quelles sont les étapes d'une rénovation de maison ?",
    dek: 'De la première visite à la réception du chantier, voici comment se déroule concrètement un projet de rénovation.',
    sections: [
      {
        heading: 'Visite et diagnostic du bâti',
        body:
          "Tout commence par une visite sur place pour évaluer l'état du bâti existant : structure, murs porteurs, sols, façade. À Toulouse, cette étape compte particulièrement pour les maisons anciennes en pierre ou brique, où l'état réel des murs conditionne l'ampleur des travaux.",
      },
      {
        heading: 'Devis détaillé avant tout engagement',
        body:
          "Après le diagnostic, RK Pyrénées Construction établit un devis détaillé décrivant les travaux prévus, les matériaux et les délais estimés. Rien ne démarre avant que ce devis soit validé — c'est la base de tout le chantier.",
      },
      {
        heading: 'Déroulement du chantier',
        body:
          "Les travaux suivent l'ordre logique du bâtiment : structure et gros œuvre d'abord, puis sols, cloisons et finitions. Un suivi régulier avec photos d'avancement permet de garder une visibilité sur l'état du chantier.",
      },
      {
        heading: 'Réception des travaux',
        body:
          "Une visite de fin de chantier a lieu avec vous pour vérifier que le résultat correspond au devis validé, avant la remise des clés du chantier terminé.",
      },
    ],
    sourceNote:
      'Étapes générales basées sur le déroulement réel des chantiers de rénovation RK Pyrénées Construction (voir /services/renovation) — non sourcées à un organisme tiers.',
    relatedServiceSlugs: ['renovation'],
  },
  {
    slug: 'renovation-maison-ancienne-etapes',
    title: 'Rénovation de maison ancienne : les étapes importantes',
    metaTitle: 'Rénovation de maison ancienne à Toulouse : les étapes | RK Pyrénées Construction',
    metaDescription:
      "Rénover une maison ancienne à Toulouse demande une approche spécifique. Les points de vigilance sur le bâti en pierre et brique toulousaine.",
    h1: 'Rénovation de maison ancienne : les étapes importantes',
    dek: 'Le bâti ancien toulousain (pierre, brique) demande une approche différente d\'une rénovation classique — voici les points de vigilance.',
    sections: [
      {
        heading: "Diagnostiquer l'état du bâti ancien",
        body:
          "Avant tout chiffrage, un examen des murs porteurs, des fondations et de la charpente est nécessaire. Les maisons anciennes toulousaines en pierre ou brique peuvent cacher des reprises structurelles non visibles au premier regard.",
      },
      {
        heading: 'Anticiper les reprises structurelles',
        body:
          "Reprise de mur, coffrage de poteau, ouverture dans un mur existant : ces interventions demandent un savoir-faire spécifique au bâti ancien, différent d'une construction neuve. RK Pyrénées Construction intervient régulièrement sur ce type de chantier à Toulouse.",
      },
      {
        heading: 'Concilier ancien et confort actuel',
        body:
          "Remplacement de menuiseries, réfection de sols, mise à niveau du bâti : l'enjeu est d'apporter le confort actuel sans dénaturer la structure d'origine. Chaque intervention est cadrée par un devis détaillé avant travaux.",
      },
    ],
    sourceNote:
      'Points de vigilance basés sur les chantiers réels de rénovation de bâti ancien menés par RK Pyrénées Construction (voir /realisations) — non sourcés à un organisme tiers.',
    relatedServiceSlugs: ['renovation', 'maconnerie'],
  },
  {
    slug: 'etapes-projet-construction',
    title: "Les étapes d'un projet de construction",
    metaTitle: "Étapes d'un projet de construction à Toulouse | RK Pyrénées Construction",
    metaDescription:
      "Quelles sont les grandes étapes d'un chantier de construction, de l'étude du terrain à la livraison du gros œuvre ? Le déroulement à Toulouse.",
    h1: "Quelles sont les étapes d'un projet de construction ?",
    dek: "De l'étude du terrain à la livraison du gros œuvre, voici comment se déroule un chantier de construction.",
    sections: [
      {
        heading: 'Étude du projet et du terrain',
        body:
          "Avant tout chiffrage, les plans et la nature du terrain sont analysés : accès chantier, nature du sol, raccordements disponibles. Ces éléments conditionnent fortement la suite du projet.",
      },
      {
        heading: 'Devis et planning',
        body:
          "Un devis détaillé et un calendrier de chantier sont transmis avant tout démarrage, pour que le déroulement du projet soit clair dès le départ.",
      },
      {
        heading: 'Gros œuvre',
        body:
          "Fondations, élévation des murs, structures en béton armé : le gros œuvre suit un ordre précis, avec des points de contrôle à chaque étape clé.",
      },
      {
        heading: 'Suivi de chantier jusqu\'à la livraison',
        body:
          "Des points d'étape réguliers permettent de suivre l'avancement jusqu'à la livraison du gros œuvre, avec une communication continue sur l'état du chantier.",
      },
    ],
    sourceNote:
      'Étapes générales basées sur le déroulement réel des chantiers de construction RK Pyrénées Construction (voir /services/construction) — non sourcées à un organisme tiers.',
    relatedServiceSlugs: ['construction', 'extension'],
  },
  {
    slug: 'comment-choisir-entreprise-maconnerie-toulouse',
    title: 'Comment choisir une entreprise de maçonnerie à Toulouse ?',
    metaTitle: 'Comment choisir une entreprise de maçonnerie à Toulouse ? | RK Pyrénées Construction',
    metaDescription:
      "Les points à vérifier avant de confier vos travaux de maçonnerie à Toulouse : expérience du bâti local, devis détaillé, suivi de chantier.",
    h1: 'Comment choisir une entreprise de maçonnerie à Toulouse ?',
    dek: 'Quelques critères concrets pour choisir un maçon à Toulouse, au-delà du premier contact.',
    sections: [
      {
        heading: "L'expérience du bâti toulousain",
        body:
          "Toulouse compte de nombreuses constructions en brique ou en pierre, dont les techniques de reprise diffèrent d'une construction moderne en parpaing. Vérifier que l'entreprise a une pratique réelle de ce type de bâti est un critère utile.",
      },
      {
        heading: 'Un devis qui détaille le type de structure',
        body:
          "Montage de murs neufs, reprise sur existant, structure béton armé : un devis sérieux précise le type d'intervention et les matériaux prévus, pas seulement un chiffrage global.",
      },
      {
        heading: 'Le suivi et les finitions',
        body:
          "Un chantier de maçonnerie ne s'arrête pas au gros œuvre : le nettoyage de chantier et la remise en état des abords font partie d'une prestation complète.",
      },
    ],
    sourceNote: 'Conseils généraux, non sourcés à un organisme tiers spécifique.',
    relatedServiceSlugs: ['maconnerie'],
  },
  {
    slug: 'comment-preparer-chantier-terrassement',
    title: 'Comment préparer un chantier de terrassement ?',
    metaTitle: 'Préparer un chantier de terrassement à Toulouse | RK Pyrénées Construction',
    metaDescription:
      "Ce qu'il faut anticiper avant un chantier de terrassement à Toulouse : accès, nature du sol, démarches préalables.",
    h1: 'Comment préparer un chantier de terrassement ?',
    dek: 'Quelques points à anticiper avant que les engins n\'arrivent sur le terrain.',
    sections: [
      {
        heading: "Vérifier l'accès au chantier",
        body:
          "La largeur d'accès pour les engins de terrassement conditionne fortement l'organisation du chantier. Une visite préalable permet d'anticiper d'éventuelles contraintes (portail, végétation, voisinage).",
      },
      {
        heading: 'Connaître la nature du sol',
        body:
          "Terrain argileux, rocheux ou meuble : la nature du sol influence la méthode de décaissement et de nivellement retenue. Ce point est évalué lors de la visite de terrain avant devis.",
      },
      {
        heading: 'Anticiper les réseaux enterrés',
        body:
          "Avant tout terrassement, la présence de réseaux enterrés (eau, électricité, télécom) doit être vérifiée pour la sécurité du chantier — une démarche à effectuer avant le démarrage des travaux.",
      },
    ],
    sourceNote:
      'Conseils généraux basés sur le déroulement réel des chantiers de terrassement RK Pyrénées Construction (voir /services/terrassement) — non sourcés à un organisme tiers.',
    relatedServiceSlugs: ['terrassement', 'dallage'],
  },
  {
    slug: 'comment-choisir-professionnel-dallage-exterieur',
    title: 'Comment choisir un professionnel pour un dallage extérieur ?',
    metaTitle: 'Choisir un professionnel pour un dallage extérieur à Toulouse | RK Pyrénées Construction',
    metaDescription:
      "Terrasse béton ou pierre naturelle : les points à vérifier avant de confier votre dallage extérieur à un professionnel à Toulouse.",
    h1: 'Comment choisir un professionnel pour un dallage extérieur ?',
    dek: 'Terrasse béton, allée ou plage de piscine : quelques critères pour bien choisir votre prestataire.',
    sections: [
      {
        heading: 'Le choix du matériau',
        body:
          "Dalle béton coulée ou pavage en pierre naturelle : chaque matériau a ses contraintes de pose et de finition. Un professionnel sérieux vous explique les options adaptées à votre projet (terrasse, allée, plage de piscine) plutôt que d'imposer une seule solution.",
      },
      {
        heading: 'La préparation du support',
        body:
          "Un dallage durable commence par un terrassement et un nivellement soignés — une étape souvent sous-estimée mais déterminante pour la tenue dans le temps.",
      },
      {
        heading: 'La qualité des finitions',
        body:
          "Talochage, joints, pente d'écoulement : ce sont ces finitions qui font la différence entre une dalle qui vieillit bien et une dalle qui se dégrade rapidement. Demandez à voir des réalisations réelles avant de vous engager.",
      },
    ],
    sourceNote: 'Conseils généraux, non sourcés à un organisme tiers spécifique.',
    relatedServiceSlugs: ['dallage', 'amenagement-exterieur'],
  },
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug)
}

/** Guides relevant to a given service — used to link a service page to its matching practical
 *  guide (natural, one contextual link, not a blanket "see all guides" everywhere — audit #17).
 *  No guide here discusses pricing — see the file header note. */
export function getGuidesForService(serviceSlug: string): Guide[] {
  return GUIDES.filter((g) => g.relatedServiceSlugs.includes(serviceSlug))
}
