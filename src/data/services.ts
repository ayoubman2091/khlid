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
    faq: [
      {
        question: 'Intervenez-vous sur des maisons anciennes en pierre ou brique toulousaine ?',
        answer:
          "Oui, la remise en état de bâti ancien (murs en pierre ou en brique toulousaine) fait partie de nos chantiers courants, aussi bien pour la structure que pour les façades.",
      },
      {
        question: 'Peut-on rénover uniquement la façade sans reprendre tout le bâtiment ?',
        answer:
          "Oui, la rénovation de façade et la reprise d'enduit peuvent être traitées comme un chantier indépendant, sans reprise complète du bâtiment.",
      },
      {
        question: 'Le remplacement de fenêtres nécessite-t-il de gros travaux de maçonnerie ?',
        answer:
          "Le remplacement de menuiseries dans une ouverture existante ne nécessite généralement pas de reprise structurelle lourde ; un agrandissement d'ouverture, en revanche, est étudié au cas par cas.",
      },
    ],
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
    faq: [
      {
        // "gros oeuvre définition" is a top related query on Google Trends both nationally (12)
        // and in Midi-Pyrénées, where it scores HIGHER (20) — definitional intent is stronger in
        // this region than across France. It is also the first Google autocomplete completion for
        // "gros oeuvre". The answer below is written to stand alone as an extractable definition:
        // one sentence that defines the term, then the scope. Grounded entirely in `includes`.
        question: "Qu'est-ce que le gros œuvre exactement ?",
        answer:
          "Le gros œuvre désigne l'ensemble des éléments qui assurent la solidité et la stabilité d'un bâtiment : les fondations, les murs porteurs, les planchers et les structures en béton armé. C'est l'ossature du bâtiment — ce qui la constitue ne peut pas être modifié sans toucher à sa structure. Le gros œuvre est réalisé en premier, avant les travaux de second œuvre.",
      },
      {
        // "gros oeuvre et second oeuvre" is a top-10 Google autocomplete completion for
        // "gros oeuvre". The distinction was previously only implied, in a half-sentence at the
        // end of another answer. It is also commercially useful: it tells a visitor precisely
        // where RK's intervention stops, which prevents unqualified enquiries.
        question: 'Quelle est la différence entre le gros œuvre et le second œuvre ?',
        answer:
          "Le gros œuvre correspond à la structure porteuse : fondations, murs porteurs, planchers, béton armé. Le second œuvre regroupe tout ce qui vient ensuite pour rendre le bâtiment habitable, sans rôle structurel : cloisons, isolation, électricité, plomberie, menuiseries et finitions. RK Pyrénées Construction intervient sur le gros œuvre ; nos chantiers de rénovation couvrent par ailleurs des travaux de reprise sur bâti existant.",
      },
      {
        // Cost intent dominates this cluster: "devis construction maison" is a RISING query in
        // Midi-Pyrénées (+110), alongside "budget construction maison" (+60) and "tarif
        // construction maison" (+60). The client's no-pricing decision stands, so this answers
        // the intent WITHOUT any figure — it explains what drives a quote and how one is
        // produced. No price, no range, no average is stated or implied anywhere.
        question: "Qu'est-ce qui fait varier le coût d'un chantier de gros œuvre ?",
        answer:
          "Principalement la nature du terrain et le type de fondations qu'il impose, la surface et la hauteur à construire, le matériau d'élévation retenu, la complexité de la structure béton armé et l'accessibilité du chantier pour les engins et les livraisons. Ces éléments ne peuvent être évalués qu'après une visite sur site : c'est pourquoi nous chiffrons chaque chantier dans un devis détaillé plutôt que sur la base d'un prix au mètre carré.",
      },
      {
        question: 'Intervenez-vous pour des bâtiments professionnels ou uniquement des maisons individuelles ?',
        answer:
          'Les deux : nos chantiers de gros œuvre couvrent aussi bien les maisons individuelles que les bâtiments professionnels.',
      },
      {
        question: 'Réalisez-vous uniquement le gros œuvre ou aussi les finitions ?',
        answer:
          'Notre intervention porte sur le gros œuvre — la structure. Pour des travaux de rénovation intérieure ou de finitions, voir notre service de rénovation.',
      },
    ],
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
    faq: [
      {
        question: 'Peut-on abattre un mur porteur avec vous ?',
        answer:
          "Oui, une ouverture dans un mur porteur est possible ; selon la portée, ce type d'intervention est réalisé en lien avec un bureau d'études pour garantir la stabilité de la structure.",
      },
      {
        question: 'Travaillez-vous en rénovation ou uniquement en construction neuve ?',
        answer:
          'Les deux : nos travaux de maçonnerie générale interviennent aussi bien en construction neuve qu\'en reprise sur bâti existant.',
      },
      {
        question: 'Un mur fissuré doit-il être reconstruit ou peut-il être réparé ?',
        answer:
          "Cela dépend de l'origine et de l'ampleur de la fissure : après diagnostic sur site, une reprise ou un renfort du mur existant suffit souvent, sans reconstruction complète.",
      },
    ],
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
    faq: [
      {
        question: 'Le terrassement est-il obligatoire avant de couler une dalle béton ?',
        answer:
          "Oui : un terrain mal préparé ou mal nivelé fragilise la dalle. Le décaissement, la mise à niveau et le ferraillage sont les étapes préalables à un béton durable.",
      },
      {
        question: 'Intervenez-vous aussi pour préparer une allée ou un garage, pas seulement une maison ?',
        answer:
          'Oui, la préparation de plateforme concerne aussi bien une terrasse, une allée qu\'un garage — pas uniquement les fondations d\'une maison.',
      },
      {
        question: 'À quoi sert le ferraillage posé avant le béton ?',
        answer:
          "Le ferraillage renforce la dalle en résistance à la traction, ce que le béton seul ne peut pas apporter ; il est posé et vérifié avant le coulage.",
      },
    ],
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
    faq: [
      {
        question: 'Quelle différence entre une dalle béton et un dallage en pierre naturelle ?',
        answer:
          'La dalle béton coulée est plus rapide à mettre en œuvre et plus économique ; le dallage en pierre naturelle posée offre un rendu plus haut de gamme, notamment autour d\'une piscine. Les deux sont proposés selon votre projet.',
      },
      {
        question: 'Faites-vous aussi les plages de piscine ?',
        answer:
          'Oui, le pavage de plage de piscine en pierre naturelle fait partie de nos chantiers de dallage extérieur.',
      },
      {
        question: 'Le terrassement est-il inclus dans un projet de dallage ?',
        answer:
          'La préparation du terrain (terrassement) est une étape nécessaire avant tout coulage ou pose de dallage ; elle est chiffrée avec le reste du projet dans le même devis.',
      },
    ],
  },
  {
    slug: 'extension',
    name: 'Extension de maison',
    shortName: 'Extension',
    tagline: 'Agrandir une maison existante',
    // "agrandissement" is a parallel consumer vocabulary for the same service, not a different
    // service. Google Trends (FR, 12m) shows a full cluster around it — "prix agrandissement
    // maison" (100), "agrandissement maison bois" (72), "plan agrandissement maison" (29),
    // "cout agrandissement maison" (26) — while the word appeared only twice on this whole site
    // and never in the title or H1. Adding it here cannot cannibalize anything: it is the same
    // page, the same service, addressed by its autre common name.
    metaTitle: 'Extension et agrandissement de maison à Toulouse | RK Pyrénées Construction',
    metaDescription:
      'Extension et agrandissement de maison à Toulouse : gros œuvre, fondations et structure. Devis gratuit avec RK Pyrénées Construction.',
    h1: 'Extension et agrandissement de maison à Toulouse',
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
    faq: [
      {
        question: "Les fondations d'une extension sont-elles différentes de celles d'une construction neuve ?",
        answer:
          "Elles doivent surtout être adaptées au bâti existant auquel l'extension se raccorde, contrairement à une construction neuve réalisée sur terrain libre.",
      },
      {
        question: 'Comment l\'extension est-elle raccordée à la maison existante ?',
        answer:
          "La structure béton armé de l'extension est étudiée pour s'élever en continuité des murs existants, avec un raccordement propre entre l'ancien et le nouveau bâti.",
      },
      {
        // Direct consequence of the vocabulary split above: people search both words and some
        // genuinely wonder whether they name different works. They do not. Stating that plainly
        // is useful to a visitor and makes the synonym explicit pour retrieval systems.
        question: 'Extension ou agrandissement : y a-t-il une différence ?',
        answer:
          "Non, les deux mots désignent la même opération : augmenter la surface d'une maison existante en y ajoutant une construction neuve. « Agrandissement » est le terme courant, « extension » le terme employé sur les plans et les devis. Dans les deux cas, le gros œuvre consiste à créer des fondations adaptées au bâti existant puis à élever une structure raccordée à la maison d'origine.",
      },
      {
        question: 'Quelle est la différence entre une extension et une rénovation ?',
        answer:
          "Une extension agrandit la surface habitable avec de nouvelles fondations et une nouvelle structure ; une rénovation intervient sur le bâti existant sans en augmenter l'emprise au sol.",
      },
    ],
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
    faq: [
      {
        question: 'Faites-vous aussi l\'aménagement de jardins et espaces verts ?',
        answer:
          "Non : notre intervention porte sur la structure et le dallage extérieur (terrasses, allées, perrons), pas sur la création de jardins ou d'espaces végétalisés.",
      },
      {
        question: 'Quelle différence entre une terrasse en béton et une terrasse en pierre naturelle ?',
        answer:
          'Le béton coulé est plus rapide et économique ; la pierre naturelle offre un rendu plus haut de gamme. Le choix dépend du budget et du style recherché pour vos abords.',
      },
      {
        question: 'Peut-on ajouter un perron ou des marches à une maison existante ?',
        answer:
          'Oui, les perrons et marches extérieures peuvent être ajoutés ou repris sur une maison déjà construite, en cohérence avec l\'accès existant.',
      },
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
