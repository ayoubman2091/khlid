# KEYWORD CLUSTERING — RK Pyrénées Construction

Base : [seo/SEO_KEYWORD_MASTER.csv](seo/SEO_KEYWORD_MASTER.csv) (75 mots-clés).
Méthode de scoring : voir §"Méthodologie" en bas de page — **aucune donnée de volume/CPC/difficulté n'a été inventée**, ces champs sont `N/A` faute d'accès à un outil (Keyword Planner, Ahrefs, SEMrush, Search Console). Le score `business_value` est une **estimation qualitative** basée sur : présence/nombre de concurrents réels observés en SERP, correspondance avec un service réellement proposé par RK, intention commerciale de la requête, et pertinence locale.

Règle anti-cannibalisation (brief §14/§25) : **une URL canonique par cluster**, listée ci-dessous. Aucune page ne doit dupliquer l'intention d'une autre.

---

## P1 — CLUSTERS PRIORITAIRES (services réellement proposés, zone Toulouse)

### 1. RENOVATION_MAISON_TOULOUSE — page pilier
**URL cible unique :** `/services/renovation`
Mots-clés (12) : rénovation maison Toulouse, entreprise rénovation Toulouse, entreprise rénovation maison Toulouse, rénovation appartement Toulouse, rénovation intérieure Toulouse, rénovation extérieure Toulouse, travaux rénovation Toulouse, devis rénovation maison Toulouse, artisan rénovation Toulouse, rénovation complète maison Toulouse, rénovation maison ancienne Toulouse, rénovation maison Haute-Garonne, + devis rénovation maison gratuit (transactionnel).
**Pourquoi cluster n°1 :** c'est le service où la concurrence locale (Bâti HALLI, Avenir Rénovations, CA Rénovation, Habitat et Rénovation) publie le plus de contenu (FAQ, avant/après, devis en ligne) — donc le plus gros écart à combler, mais aussi le plus gros volume d'intention.

### 2. CONSTRUCTION_TOULOUSE
**URL cible unique :** `/services/construction`
Mots-clés (8) : construction maison Toulouse, entreprise construction Toulouse, entreprise de construction Toulouse, construction bâtiment Toulouse, entreprise bâtiment Toulouse, devis construction maison Toulouse, construction maison individuelle Toulouse, entreprise construction Haute-Garonne.
**Note de positionnement :** RK n'est pas un constructeur de maisons catalogue (type Mikit, Cogebois) — le contenu doit être honnête sur le périmètre réel (construction/gros-œuvre sur mesure, extensions, bâtiments) plutôt que rivaliser frontalement sur "constructeur de maison individuelle".

### 3. MACONNERIE_TOULOUSE
**URL cible unique :** `/services/maconnerie`
Mots-clés (8) : maçon Toulouse, maçonnerie Toulouse, entreprise maçonnerie Toulouse, maçonnerie générale Toulouse, travaux maçonnerie Toulouse, devis maçon Toulouse, prix maçonnerie Toulouse, artisan maçon Toulouse.
**Particularité SERP :** dominé par des annuaires (PagesJaunes, Travaux.com) → la fiche Google Business Profile pèse autant que la page (voir LOCAL_SEO.md à produire).

### 4. TERRASSEMENT_TOULOUSE
**URL cible unique :** `/services/terrassement`
Mots-clés (5) : terrassement Toulouse, entreprise terrassement Toulouse, terrassement maison Toulouse, prix terrassement Toulouse, devis terrassement Toulouse.

### 5. DALLAGE_TOULOUSE
**URL cible unique :** `/services/dallage`
Mots-clés (5) : dallage Toulouse, dalle béton Toulouse, terrasse béton Toulouse, dallage extérieur Toulouse, prix dalle béton m2.
**Concurrence directe de spécialistes purs** (dallage-toulouse.com, Isidéco) — nécessite des visuels de chantiers réels forts pour rivaliser (RK en dispose, voir CURRENT_SITE_AUDIT.md §5).

### 6. EXTENSION_MAISON_TOULOUSE
**URL cible unique :** `/services/extension`
Mots-clés (6) : extension maison Toulouse, agrandissement maison Toulouse, prix extension maison Toulouse, extension maison prix m2, entreprise extension maison Toulouse, surélévation maison Toulouse.
**Contenu prix disponible (ESTIMATE, sourcé) :** ~1275–2850 €/m² pour une extension 2 pans à Toulouse (source : La Maison Des Travaux, consulté août 2026) — à citer avec attribution, jamais présenté comme tarif RK.

### 7. AMENAGEMENT_EXTERIEUR_TOULOUSE
**URL cible unique :** `/services/amenagement-exterieur`
Mots-clés (4) : aménagement extérieur Toulouse, terrasse bois Toulouse, aménagement jardin Toulouse, création allée Toulouse.
**Différenciation nécessaire :** le marché est occupé par des paysagistes (végétal) — RK doit rester positionné sur la structure/maçonnerie extérieure (dallage, allées, murets), pas se présenter comme paysagiste si ce n'est pas le métier réel.

### 8. BRAND
**URL cible :** `/` (homepage) + fiche Google Business Profile
Mots-clés (3) : RK Pyrénées Construction, RK Pyrénées Construction avis, RK Pyrénées Construction Toulouse.

---

## P2 — CLUSTERS SECONDAIRES

### 9. INFORMATIONAL_PRIX_* (guides)
4 sous-clusters, chacun avec sa propre URL pour éviter la cannibalisation :
- `INFORMATIONAL_PRIX_RENOVATION` → `/guides/prix-renovation-maison` (3 mots-clés : prix rénovation maison au m2, combien coûte une rénovation maison, quel budget pour rénover une maison)
- `INFORMATIONAL_PRIX_CONSTRUCTION` → `/guides/prix-construction-maison` (1 mot-clé : prix construction maison au m2)
- `INFORMATIONAL_PRIX_MACONNERIE` → `/guides/prix-maconnerie` (2 mots-clés : prix maçonnerie au m2, combien coûte un maçon)
- `INFORMATIONAL_PRIX_TERRASSEMENT` → `/guides/prix-terrassement` (1 mot-clé : prix terrassement au m2)
- `INFORMATIONAL_GUIDE_CHOIX` → `/guides/comment-choisir-son-entreprise-de-renovation` (1 mot-clé)

**Rôle dans le funnel :** ces pages captent une intention informationnelle nationale (donc peu concurrentielle localement mais très concurrentielle nationalement face à des médias comme Effy/Hellowatt), puis doivent renvoyer vers la page service Toulouse correspondante via un maillage interne clair (brief §36).

### 10. SUBURBS_CANDIDATE — **pages NON créées pour l'instant**
8 mots-clés candidats (maçon Blagnac, rénovation maison Colomiers, entreprise rénovation Tournefeuille, maçon Balma, rénovation maison Muret, construction extension Cugnaux, maçonnerie L'Union, rénovation maison Castanet-Tolosan).
Suite à votre réponse ("Toulouse + proche banlieue" sans liste précise), ces communes sont des **candidates à valider**, pas des pages confirmées : voir §"Décision à prendre" ci-dessous.

---

## P3 — HORS PÉRIMÈTRE POUR L'INSTANT

### 11. INTERNATIONAL_SCAN
7 mots-clés (Maroc ×3, Belgique ×2, Suisse ×2) conservés uniquement comme veille exploratoire. **Aucune page prévue** — RK Pyrénées est une SASU basée à Toulouse sans capacité d'intervention physique dans ces pays ; créer des pages ciblant ce trafic générerait des visiteurs non convertibles, à l'inverse de l'objectif "trafic qualifié" du brief (§1). Voir `INTERNATIONAL_SEO.md` (à produire) pour la recommandation complète.

---

## DÉCISION À PRENDRE : liste exacte des communes de banlieue

Le cluster `SUBURBS_CANDIDATE` utilise 8 communes plausibles (Blagnac, Colomiers, Tournefeuille, Balma, Muret, Cugnaux, L'Union, Castanet-Tolosan) choisies parce que ce sont des communes importantes de la métropole toulousaine avec une activité BTP visible en recherche. **Confirmez la liste réelle des communes où RK intervient** pour que je verrouille :
1. la liste finale de mots-clés locaux à cibler,
2. si chacune mérite une page dédiée (seuil : demande réelle + intervention réelle + contenu unique possible, brief §16) ou simplement une mention dans une section "Zones d'intervention" sur les pages services.

---

## MÉTHODOLOGIE (transparence sur les données)

| Donnée | Disponibilité | Méthode |
|---|---|---|
| Search volume | **N/A** partout | Aucun accès Keyword Planner/Ahrefs/SEMrush/Search Console dans cet environnement |
| Google Trends (score/direction) | **N/A** partout | `trends.google.com` a renvoyé une erreur 429 (rate-limit/blocage bot) lors de la tentative de consultation — voir tentative documentée dans cette session |
| Compétition | Estimée qualitativement | Basée sur le nombre et la nature des concurrents réellement trouvés en recherche Google pour chaque requête (voir COMPETITOR_ANALYSIS.md) |
| CPC / Keyword difficulty | **N/A** partout | Aucun outil disponible |
| Prix (rénovation, extension) | **ESTIMATE sourcée** | Chiffres publiés par des sites tiers (Effy, Hellowatt, Architecteo, La Maison Des Travaux) trouvés via recherche web, cités avec attribution, jamais présentés comme des tarifs RK |
| business_value / priority | Estimation qualitative | Correspondance service réel × intention commerciale × présence de concurrents actifs × faisabilité de contenu unique |

**Prochaine étape recommandée pour fiabiliser ces données :** une fois le site en ligne avec Google Search Console installé (brief §42), remplacer les colonnes N/A par les vraies impressions/positions observées (boucle décrite au brief §50).
