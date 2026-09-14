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
    techniques: [
      'Pierre naturelle en dalles',
      'Pose scellée',
      'Jointoiement après pose',
      'Plage de piscine et terrasse',
    ],
    sections: [
      {
        heading: 'Le support avant la pose',
        body:
          "Une plage de piscine en pierre naturelle ne se juge pas sur la pierre : elle se joue sur ce qu'il y a dessous. La dalle support doit être stable, plane et surtout correctement pentée — de l'ordre de 1 à 1,5 % dirigés vers l'extérieur du bassin — pour que l'eau de baignade parte au caniveau et non sous le dallage. Un support qui retient l'eau finit par faire remonter des efflorescences dans les joints et décoller les dalles de rive.",
      },
      {
        heading: 'La pose des dalles',
        body:
          "Les photos montrent une pose au pourtour du bassin, dalle par dalle, avec les coupes de rive ajustées sur place. La pierre naturelle n'a pas la régularité d'un carreau industriel : les épaisseurs varient d'une dalle à l'autre, ce qui impose de rattraper chaque niveau au mortier plutôt que de poser au cordeau sur une épaisseur constante. C'est ce travail-là, invisible une fois terminé, qui donne une surface sans ressaut sous le pied nu.",
      },
      {
        heading: 'Le jointoiement',
        body:
          "La deuxième photo saisit le chantier au moment du jointoiement, joints encore frais. C'est l'étape qui décide de la durée de vie de l'ouvrage : un joint trop maigre laisse l'eau atteindre le mortier de pose, un joint trop dur fissure au premier cycle de dilatation. Autour d'un bassin, le joint travaille en plus avec les projections d'eau traitée, qui attaquent un mortier inadapté beaucoup plus vite que la pluie.",
      },
      {
        heading: 'Pourquoi la pierre naturelle autour d\'un bassin',
        body:
          "La pierre naturelle reste tempérée sous le soleil là où un béton foncé ou une dalle céramique brûle, et son grain conserve de l'adhérence mouillée. C'est la raison pour laquelle elle domine encore les abords de piscine malgré un coût de mise en œuvre plus élevé qu'une dalle coulée : le confort d'usage se joue pieds nus, et il ne se rattrape pas après coup.",
      },
    ],
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
    techniques: [
      'Décaissement et terrassement',
      'Treillis soudé sur distanciers',
      'Coulage de béton',
      'Finition talochée',
      'Pierre reconstituée (marches)',
    ],
    sections: [
      {
        heading: 'Le terrassement, avant tout le reste',
        body:
          "Une dalle extérieure commence par un décaissement : on retire la terre végétale, qui se tasse et se rétracte, jusqu'à retrouver un fond de forme portant. Sauter cette étape, c'est couler un beau béton sur un sol qui bougera sous lui. Sur les terrains argileux qui dominent une bonne partie de l'agglomération toulousaine, le retrait-gonflement saisonnier rend cette préparation d'autant moins négociable : une dalle posée sur argile mal préparée fissure au premier été sec.",
      },
      {
        heading: 'Le ferraillage',
        body:
          "Deux photos de cette série montrent le ferraillage seul, posé à plat avant le béton — c'est le moment où tout se vérifie, parce qu'après coulage plus rien n'est visible. Le treillis doit se trouver dans l'épaisseur du béton, pas au fond du coffrage : relevé sur distanciers, il reprend les efforts de traction en partie basse de la dalle. Un treillis laissé au contact du sol ne renforce rien et rouille.",
      },
      {
        heading: 'Coulage et finition',
        body:
          "Les dalles apparaissent ici fraîchement coulées, surface encore humide. La finition talochée visible sur l'allée de garage n'est pas un choix esthétique : elle laisse un grain antidérapant, ce qu'une finition lissée à l'hélicoptère ne fait pas. Sur une allée carrossable, elle se combine avec une épaisseur et un ferraillage renforcés par rapport à une terrasse piétonne — une voiture ne charge pas un sol comme une table de jardin.",
      },
      {
        heading: 'Joints et raccords au bâti',
        body:
          "Le béton se dilate. Une terrasse coulée contre une maison, comme sur la photo prise au pied d'une façade en briques, doit être désolidarisée du mur par un joint souple, faute de quoi elle pousse sur le bâti ou fissure au droit du raccord. Les grandes surfaces se fractionnent également en panneaux : mieux vaut une fissure provoquée dans un joint droit qu'une fissure subie en travers de la terrasse.",
      },
      {
        heading: 'Les ouvrages associés',
        body:
          "La série comprend un escalier extérieur en pierre reconstituée devant une maison ancienne. Les marches extérieures relèvent de la même logique que les dalles — fondation, appui, écoulement de l'eau — avec une contrainte de plus : le nez de marche encaisse le gel, les chocs et le passage, et c'est toujours par lui qu'un escalier mal fondé commence à se dégrader.",
      },
    ],
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
    techniques: [
      'Fondations et soubassement parpaing',
      'Dalle béton armé coulée au tapis pompe',
      'Élévation en brique',
      'Escalier béton coulé en place',
      'Échafaudage de façade',
    ],
    sections: [
      {
        heading: 'Des fondations au premier niveau',
        body:
          "La première photo montre un soubassement en parpaings monté sur fondations — le stade où se fige la géométrie de tout le bâtiment. Une implantation fausse de quelques centimètres à ce niveau ne se rattrape plus ensuite : elle se répercute sur les murs, puis sur la charpente, puis sur les menuiseries. C'est la phase la moins spectaculaire d'un chantier de gros œuvre et celle qui coûte le plus cher à reprendre.",
      },
      {
        heading: 'Dalle béton armé et moyens de mise en œuvre',
        body:
          "Deux photos montrent un coulage de dalle armée, dont un au tapis pompe devant un bâtiment vitré. Le recours au tapis n'est pas un détail d'organisation : il permet d'alimenter la dalle en continu depuis la voirie quand la toupie ne peut pas approcher, et un béton livré en continu prend de manière homogène. Un coulage interrompu crée des reprises, c'est-à-dire des plans de faiblesse dans un ouvrage qui est justement là pour porter.",
      },
      {
        heading: 'Élévation',
        body:
          "La série comprend un immeuble en brique en cours d'élévation, échafaudage monté en façade. Monter en brique demande un appareillage régulier et des chaînages verticaux et horizontaux qui ceinturent la structure : c'est ce réseau de chaînages, invisible dans le mur fini, qui tient le bâtiment ensemble sous les efforts de vent et les mouvements du sol.",
      },
      {
        heading: 'Escalier béton coulé en place',
        body:
          "Une photo montre le coffrage et le ferraillage d'un escalier en béton armé. Un escalier coulé sur place est l'un des ouvrages les plus exigeants du gros œuvre : il faut que le coffrage tienne la forme exacte des marches sous la poussée du béton frais, et que le ferraillage suive la ligne de la volée. Les défauts d'un escalier coffré à la va-vite restent visibles pendant toute la vie du bâtiment.",
      },
      {
        heading: 'Résidentiel et tertiaire',
        body:
          "Les chantiers de cette série couvrent aussi bien la maison individuelle que le bâtiment collectif ou professionnel. Les techniques de base ne changent pas — fondation, structure, élévation — mais les contraintes d'accès, de phasage et de coactivité avec les autres corps d'état ne sont pas comparables entre une parcelle pavillonnaire et un chantier en site occupé.",
      },
    ],
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
    techniques: [
      'Reprise en sous-œuvre',
      'Poteau béton coffré en bois',
      'Création d\'ouverture dans mur porteur',
      'Pose de menuiserie en mur épais',
      'Béton lissé intérieur',
      'Enduit de façade',
    ],
    sections: [
      {
        heading: 'Lire le mur avant d\'y toucher',
        body:
          "Le bâti ancien toulousain mélange la pierre et la brique foraine, souvent hourdées à la terre ou à la chaux maigre, avec des reprises successives qu'aucun plan ne documente. Deux photos de cette série montrent précisément cette composition mixte. Avant toute intervention structurelle, c'est ce que le mur porte réellement, et par où, qui détermine la méthode — et cela ne se déduit pas d'une façade : il faut ouvrir.",
      },
      {
        heading: 'Reprise structurelle et poteau béton',
        body:
          "Les deux premières photos documentent une reprise en sous-œuvre : un poteau en béton armé, coffré en bois, monté contre un mur ancien pour reprendre une descente de charge que la maçonnerie existante n'assurait plus. C'est une opération qui se mène étape par étape, sous étaiement, en ne déchargeant jamais plus de mur que ce que la structure provisoire peut tenir. Le coffrage bois visible sur la photo est l'ouvrage temporaire qui donne sa forme au poteau définitif.",
      },
      {
        heading: 'Créer une ouverture dans un mur porteur',
        body:
          "Une photo montre la pose d'une fenêtre PVC dans une ouverture pratiquée en mur de pierre. L'ordre des opérations est non négociable : étaiement, puis pose du linteau, puis seulement démolition sous le linteau. Dans un mur ancien, l'épaisseur impose en plus un traitement du tableau et de l'appui, et la menuiserie neuve doit être posée sans créer de pont d'humidité entre l'extérieur et l'intérieur du mur.",
      },
      {
        heading: 'Remise en état intérieure',
        body:
          "Le sol en béton lissé photographié après travaux illustre la phase qui suit la structure. Dans l'ancien, un sol neuf sert souvent à rattraper des niveaux qui ne sont plus horizontaux nulle part, et c'est aussi l'occasion de traiter les remontées capillaires par le sol, invisibles mais responsables d'une bonne partie des désordres qu'on attribue aux murs.",
      },
      {
        heading: 'Façades et enduits',
        body:
          "Trois photos concernent l'extérieur, dont une façade en zone urbaine à Toulouse et un bâtiment annexe repris en enduit neuf avec sa toiture en tuile. Sur un mur ancien, le choix de l'enduit engage le bâtiment : un enduit ciment étanche enferme l'humidité dans une maçonnerie conçue pour respirer et la fait ressortir plus bas, souvent en pied de mur. Un support ancien demande un enduit qui laisse passer la vapeur.",
      },
    ],
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
