import type { Realisation } from '@/types'

/**
 * Le site actuel de RK Pyrénées ne nomme aucun chantier individuellement (pas d'adresse,
 * pas de date, pas de nom de client rattaché aux photos — voir CURRENT_SITE_AUDIT.md §2).
 * Plutôt que d'inventer de fausses fiches projet (interdit par le brief §57), ces
 * réalisations regroupent les vraies photos par type de chantier, avec des légendes qui
 * décrivent uniquement ce qui est visible. Si vous fournissez les détails réels d'un
 * chantier (ville, type de client, date), chaque entrée peut être transformée en fiche
 * projet complète sans changer la structure de la page.
 */
export const REALISATIONS: Realisation[] = [
  {
    slug: 'dallage-terrasses-pierre-naturelle',
    title: 'Dallage et terrasses en pierre naturelle',
    category: 'Dallage',
    serviceSlug: 'dallage',
    description:
      "Pavage de plage de piscine et de terrasse en pierre naturelle, de la pose au jointoiement.",
    images: [
      { stem: '1000048005-YX4lrXn3lRc4LqEY', alt: 'Dallage en pierre naturelle le long d\'une piscine, joints en cours de finition' },
      { stem: '1000048008-m5KMqeXz8lhPN1nJ', alt: 'Vue d\'ensemble d\'une plage de piscine dallée en pierre naturelle' },
    ],
  },
  {
    slug: 'dalles-beton-terrasses',
    title: 'Dalles béton et terrasses extérieures',
    category: 'Dallage / Terrassement',
    serviceSlug: 'dallage',
    description: 'Terrassement, ferraillage et coulage de dalles béton pour terrasses, allées et accès de garage.',
    images: [
      { stem: '1000048044-A0xl8WOkxaSr38r9', alt: 'Dalle béton fraîchement coulée en terrasse contre une maison en briques' },
      { stem: '1000048047-AoPWr6vlwJh1K1pl', alt: 'Terrasse béton dans un jardin aménagé' },
      { stem: '1000048035-AR0LR7pqw7sx9Oye', alt: 'Dalle béton fraîchement coulée dans un quartier résidentiel' },
      { stem: '1000048041-Yan1kzGqXBIjy3Ka', alt: 'Allée béton le long d\'un garage, finition talochée' },
      { stem: '1000048182-A0xl8rQ1lxF56lR2', alt: 'Escalier extérieur en pierre reconstituée devant une maison ancienne' },
      { stem: '47114-G3SfzQkdwWnt55Ee', alt: 'Terrasse béton fraîchement coulée dans un jardin clôturé' },
      { stem: '1000048017-YNqB4pkJVqUB6ajv', alt: 'Ferraillage posé à plat avant coulage de dalle' },
      { stem: '47122-Bsv7dob9NkU8wk9R', alt: 'Ferraillage préparé pour une dalle béton' },
    ],
  },
  {
    slug: 'gros-oeuvre-construction-neuve',
    title: 'Gros œuvre et construction neuve',
    category: 'Construction',
    serviceSlug: 'construction',
    description: 'Fondations, structures béton armé et élévation de murs pour des projets résidentiels et professionnels.',
    images: [
      { stem: '1000047990-mk3vP0QrzBHp2jJO', alt: 'Fondations en parpaings d\'une construction neuve' },
      { stem: '1000048023-YKb3QNo5MMSW2PZO', alt: 'Coulage de dalle béton armé au tapis pompe devant un bâtiment vitré' },
      { stem: '1000048191-mePxr1wGNNi5jB29', alt: 'Ferraillage et coulage de dalle béton sur un chantier de bâtiment' },
      { stem: '1000048194-A1aP2raD33t64j93', alt: 'Immeuble en brique en cours de construction, échafaudage en façade' },
      { stem: '1000048230-AGB2J3pZ7QfLrWjp', alt: 'Coffrage et ferraillage d\'un escalier en béton armé' },
    ],
  },
  {
    slug: 'renovation-bati-ancien',
    title: 'Rénovation de bâti ancien',
    category: 'Rénovation',
    serviceSlug: 'renovation',
    description: 'Reprises structurelles, ouvertures et remise en état de murs anciens en pierre et brique toulousaine.',
    images: [
      { stem: '47061-vBTBOy9ywctKb4Gh', alt: 'Reprise structurelle d\'un mur ancien en pierre et brique, coffrage de poteau béton' },
      { stem: '47064-FC3fozwBw3SpmrTr', alt: 'Coffrage bois d\'un poteau béton contre un mur ancien' },
      { stem: '1000048237-YBg7z8JKoVSWg59E', alt: 'Pose d\'une fenêtre PVC dans une ouverture de mur en pierre' },
      { stem: '1000048238-YNqB4NzjX8tp1BDE', alt: 'Sol intérieur en béton lissé après rénovation' },
      { stem: 'img-20250515-wa0001-YbNBry5o7qCr23Mb', alt: 'Rénovation de façade d\'une maison en zone urbaine à Toulouse' },
      { stem: '47086-IXEN9YGacJ9S3ExD', alt: 'Façade fraîchement enduite d\'un bâtiment annexe' },
      { stem: '47105-9zbaZCYWPP8pQKUC', alt: 'Bâtiment annexe rénové avec enduit neuf et toiture tuile' },
    ],
  },
]

export function getRealisationBySlug(slug: string): Realisation | undefined {
  return REALISATIONS.find((r) => r.slug === slug)
}

/**
 * Les 15 vidéos YouTube réelles intégrées sur le site actuel (voir audit §5.2).
 * Propriété de la chaîne non confirmée par le client au moment du build — affichées
 * sans attribution de chaîne tant que ce n'est pas confirmé.
 */
export const PROJECT_VIDEO_IDS = [
  'GhRafhgff9w', 'EDBvDhKor4c', 'hAzwNdjhoYU', '9hpvwHO7Bak', 'j1-KbqVnwwM',
  'jdh3CSACJxs', 'f3yhoKnT6mg', 'EDCpHptpFok', 'Hh1rVyL5Jb0', 'Ly112RaE08s',
  'qvQU6J1hP4Q', 'fqm2vnsjp0Y', 'mTU2whXb27A', 'ZKW_B0k8Gzc', 'sHNRgi1CcHc',
]
