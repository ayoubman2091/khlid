import type { Guide } from '@/types'

/**
 * Contenu informationnel basé sur le keyword research (KEYWORD_CLUSTERING.md, cluster
 * INFORMATIONAL_PRIX_*). Les fourchettes de prix citées sont des ESTIMATES publiées par des
 * tiers, trouvées par recherche web en août 2026 — jamais présentées comme des tarifs RK
 * Pyrénées Construction. Un devis reste nécessaire pour un chiffrage réel.
 */
export const GUIDES: Guide[] = [
  {
    slug: 'prix-renovation-maison',
    title: 'Prix d\'une rénovation de maison au m² en 2026',
    metaTitle: 'Prix rénovation maison au m² à Toulouse (2026) | RK Pyrénées Construction',
    metaDescription:
      'Combien coûte la rénovation d\'une maison au m² en 2026 ? Fourchettes de prix par type de travaux et facteurs qui font varier le budget.',
    h1: 'Combien coûte une rénovation de maison au m² ?',
    dek: "Le prix d'une rénovation varie fortement selon l'ampleur des travaux. Voici des repères pour cadrer votre budget avant de demander un devis précis.",
    sections: [
      {
        heading: 'Fourchettes de prix par type de rénovation',
        body:
          "D'après plusieurs sources spécialisées consultées en août 2026 (Effy, Hellowatt, Architecteo), le prix moyen d'une rénovation se situe autour de 700 €/m². Un simple rafraîchissement démarre autour de 160-350 €/m², une rénovation complète se situe plutôt entre 950 et 1 250 €/m², et une rénovation lourde (structure, réseaux, isolation complète) peut atteindre 4 000 €/m². Pour une maison de 100 m², le budget total varie ainsi entre 25 000 € et 150 000 € selon le niveau de rénovation visé.",
      },
      {
        heading: 'Ce qui fait varier le prix',
        body:
          "La surface, l'état initial du bâti (une maison ancienne toulousaine en pierre ou brique demande souvent plus de reprises structurelles), les matériaux choisis, et les normes énergétiques actuelles (isolation, chauffage) influencent fortement le budget final — les nouvelles exigences énergétiques peuvent ajouter 10 à 20 % au budget initial.",
      },
      {
        heading: 'Obtenir un chiffrage réel',
        body:
          "Ces fourchettes restent indicatives et nationales. Le seul moyen d'obtenir un prix fiable pour votre projet est une visite sur site suivie d'un devis détaillé — c'est ce que propose RK Pyrénées Construction, gratuitement et sans engagement, pour les projets de rénovation à Toulouse et sa proche périphérie.",
      },
    ],
    sourceNote:
      "Fourchettes de prix : estimations publiées par des sites tiers spécialisés (Effy, Hellowatt, Architecteo — consultés en août 2026), non vérifiées indépendamment et non spécifiques à RK Pyrénées Construction.",
    relatedServiceSlugs: ['renovation'],
  },
  {
    slug: 'prix-construction-maison',
    title: 'Prix de construction d\'une maison au m² en 2026',
    metaTitle: 'Prix construction maison au m² à Toulouse (2026) | RK Pyrénées Construction',
    metaDescription:
      "Combien coûte la construction d'une maison au m² ? Repères de budget et facteurs de variation avant de demander un devis à Toulouse.",
    h1: 'Combien coûte la construction d\'une maison au m² ?',
    dek: 'Le budget d\'une construction neuve dépend fortement du type de structure, des matériaux et de la complexité du terrain.',
    sections: [
      {
        heading: 'Repères de prix',
        body:
          "Le prix du gros œuvre (fondations, murs, structure) varie selon la complexité du projet, la nature du terrain et le type de construction (traditionnelle ou ossature bois). Contrairement aux prix de rénovation, les tarifs de construction neuve sont très dépendants du terrain (accès, nature du sol, raccordements) — un chiffrage générique national est peu fiable pour estimer un projet précis.",
      },
      {
        heading: 'Pourquoi une visite de terrain est indispensable',
        body:
          'La nature du sol, l\'accès au chantier et les raccordements disponibles changent fortement le coût du gros œuvre. RK Pyrénées Construction établit un devis après avoir étudié votre terrain et vos plans, pour un chiffrage qui correspond réellement à votre projet.',
      },
    ],
    sourceNote:
      "Aucune donnée de prix national fiable et suffisamment sourcée n'a été trouvée pour ce guide au moment de la rédaction — contrairement au guide rénovation, ce contenu reste volontairement général en attendant une source publique fiable à citer.",
    relatedServiceSlugs: ['construction', 'extension'],
  },
  {
    slug: 'prix-maconnerie',
    title: 'Prix de la maçonnerie au m² — combien coûte un maçon ?',
    metaTitle: 'Prix maçonnerie au m² à Toulouse | RK Pyrénées Construction',
    metaDescription: 'Combien coûte un maçon et quel est le prix de la maçonnerie au m² ? Facteurs qui influencent le tarif d\'un chantier de maçonnerie à Toulouse.',
    h1: 'Combien coûte un maçon ? Prix de la maçonnerie',
    dek: 'Le tarif d\'un chantier de maçonnerie dépend du type de travaux (murs neufs, reprise, ouverture) et des matériaux utilisés.',
    sections: [
      {
        heading: 'Ce qui détermine le prix',
        body:
          "Le prix de la maçonnerie varie selon le type d'intervention : montage de murs neufs, reprise sur bâti existant, ouverture de mur porteur (qui nécessite souvent une étude structurelle complémentaire), ou structure béton armé. La nature du matériau (parpaing, brique, pierre) et l'accessibilité du chantier jouent aussi sur le tarif.",
      },
      {
        heading: 'Demander un devis précis',
        body:
          "Faute de donnée de prix nationale suffisamment fiable pour ce type de travaux très variables, la meilleure approche reste une visite sur site suivie d'un devis détaillé. RK Pyrénées Construction propose ce devis gratuitement pour tout projet de maçonnerie à Toulouse.",
      },
    ],
    sourceNote:
      "Aucune fourchette de prix nationale suffisamment fiable n'a été trouvée pour la maçonnerie générale (contrairement à la rénovation globale) — ce guide reste volontairement général plutôt que de citer un chiffre non vérifié.",
    relatedServiceSlugs: ['maconnerie'],
  },
  {
    slug: 'prix-terrassement',
    title: 'Prix du terrassement au m²',
    metaTitle: 'Prix terrassement au m² à Toulouse | RK Pyrénées Construction',
    metaDescription: 'Combien coûte un terrassement avant construction ou dallage ? Facteurs de prix et conseils avant de demander un devis à Toulouse.',
    h1: 'Combien coûte un terrassement ?',
    dek: 'Le prix du terrassement dépend de la nature du sol, de la surface à préparer et de l\'accès au chantier.',
    sections: [
      {
        heading: 'Facteurs de prix',
        body:
          "Le terrassement (décaissement, nivellement, évacuation de terre, pose de ferraillage) varie selon la nature du sol, la surface concernée et la facilité d'accès pour les engins. Un terrain difficile d'accès ou avec un sol rocheux augmente le coût.",
      },
      {
        heading: 'Un devis après visite de terrain',
        body:
          "Comme pour la construction, le terrassement dépend trop du terrain pour qu'un prix générique national soit fiable. RK Pyrénées Construction établit un devis après avoir vu le terrain concerné.",
      },
    ],
    sourceNote:
      "Aucune fourchette de prix nationale suffisamment fiable n'a été trouvée pour le terrassement — ce guide reste volontairement général plutôt que de citer un chiffre non vérifié.",
    relatedServiceSlugs: ['terrassement', 'dallage'],
  },
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
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug)
}
