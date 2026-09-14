# Keyword map — source de vérité intention → URL

**Dernière mise à jour :** 2026-09-08
**Règle :** une intention primaire = une URL canonique. Toute nouvelle page doit être ajoutée ici
AVANT d'être écrite. Si une intention n'a pas d'URL libre, on améliore l'existante — on n'en crée
pas une deuxième.

Priorité géographique : **Toulouse → Haute-Garonne → Occitanie.** Pas de contenu Occitanie ou
France tant que Toulouse n'est pas en page 1 sur le cluster gros œuvre.

---

## 1. Carte des intentions

| Cluster | URL primaire | Intention | URL secondaires (support, jamais concurrentes) |
|---|---|---|---|
| entreprise bâtiment Toulouse (marque + générique) | `/` | Navigationnelle + commerciale large | `/a-propos/`, `/contact/` |
| gros œuvre Toulouse | `/services/construction/` | Commerciale | `/realisations/gros-oeuvre-construction-neuve/`, `/guides/etapes-projet-construction/` |
| construction maison Toulouse | `/services/construction/` | Commerciale | idem |
| rénovation maison Toulouse | `/services/renovation/` | Commerciale | `/guides/etapes-renovation-maison/`, `/realisations/renovation-bati-ancien/` |
| rénovation maison ancienne Toulouse | `/guides/renovation-maison-ancienne-etapes/` | Informationnelle | `/services/renovation/`, `/realisations/renovation-bati-ancien/` |
| maçon Toulouse / maçonnerie Toulouse | `/services/maconnerie/` | Commerciale | `/guides/comment-choisir-entreprise-maconnerie-toulouse/` |
| ouverture mur porteur Toulouse | `/services/maconnerie/` | Commerciale | `/realisations/renovation-bati-ancien/` |
| terrassement Toulouse | `/services/terrassement/` | Commerciale | `/guides/comment-preparer-chantier-terrassement/`, `/realisations/dalles-beton-terrasses/` |
| dallage / dalle béton Toulouse | `/services/dallage/` | Commerciale | `/guides/comment-choisir-professionnel-dallage-exterieur/`, `/realisations/dalles-beton-terrasses/` |
| terrasse pierre naturelle / plage de piscine | `/realisations/dallage-terrasses-pierre-naturelle/` | Commerciale + preuve | `/services/dallage/` |
| extension / agrandissement maison Toulouse | `/services/extension/` | Commerciale | `/services/construction/`, `/services/terrassement/` |
| aménagement extérieur Toulouse | `/services/amenagement-exterieur/` | Commerciale | `/services/dallage/` |
| choisir une entreprise de travaux | `/guides/comment-choisir-son-entreprise-de-renovation/` | Informationnelle | tous les services |
| devis travaux Toulouse | `/devis/` | Transactionnelle | CTA sur toutes les pages commerciales |
| zone d'intervention | `/zones-intervention/` | Navigationnelle + locale | `/contact/` |

---

## 2. Conflits de cannibalisation — détectés et arbitrés

| Conflit | Constat (données réelles) | Arbitrage |
|---|---|---|
| **`gros oeuvre toulouse` : `/` vs `/services/construction/`** | GSC 10/06→05/09 : 118 impressions sur le cluster gros œuvre, **servies par la page d'accueil** (pos. 14-19). `/services/construction/` porte l'expression exacte dans son title et n'a enregistré **aucune** impression. | Google a désigné l'accueil comme page d'entité. On ne se bat pas contre : l'accueil garde « gros œuvre » en title (retarget du 05/09) comme porte d'entrée de marque, et `/services/construction/` reste la page technique profonde vers laquelle l'accueil pointe. **À revérifier au 30/09** : si `/services/construction/` prend des impressions, basculer l'intention dessus et retirer l'expression du title de l'accueil. |
| `construction` vs `gros œuvre` sur une même URL | Les deux intentions partagent `/services/construction/`. | Acceptable : en français commercial, « entreprise gros œuvre » et « construction neuve » désignent la même offre. Ne PAS créer `/services/gros-oeuvre/` — ce serait un doublon. |
| `dallage` vs `terrassement` sur les dalles béton | `/realisations/dalles-beton-terrasses/` est catégorisée « Dallage / Terrassement ». | Rattachée à `serviceSlug: 'dallage'`, liée en secondaire vers terrassement. Pas de page dédiée « dalle béton terrasse ». |
| Pages communes (Colomiers, Blagnac, Muret…) | Aucune n'existe. | **Aucune ne doit être créée** sans activité vérifiée sur place — voir §4. |

---

## 3. Intentions volontairement NON couvertes

| Intention | Volume observé | Raison |
|---|---|---|
| `prix rénovation maison Toulouse`, `prix terrassement Toulouse`, `prix maçonnerie`, `prix construction maison` | Réel et élevé | **Décision client du 20/08/2026, statut « Final »** : aucune information tarifaire sur le site. Quatre pages « prix » existaient et ont été supprimées. Voir `CONTENT_STRATEGY_NO_PRICING.md`. Réactivation uniquement sur confirmation client écrite. |
| `entreprise batiment pyrénées`, `entreprise de gros œuvre pyrénées` | 66 impressions, **position 1,5, 0 clic** | Faux positif de marque : « Pyrénées » est dans la raison sociale, l'internaute cherche les Hautes-Pyrénées (65) ou les Pyrénées-Atlantiques (64). Trafic non convertible depuis Toulouse. Ne pas optimiser. |
| `new construction homes`, `foundation repair`, `general contractor`, `concrete` | ~25 impressions | Requêtes anglophones sans intention locale. Bruit. |
| `démolition Toulouse` | 17 impressions, pos. 7-15, aucune page | **En attente de confirmation client.** Les avis Google documentent des ouvertures de murs porteurs et des déposes, pas de la démolition complète. Ne pas publier un service non exercé. |
| `rénovation façade Toulouse` | Non mesuré | Le service façade n'existe pas dans `SERVICES`. Des travaux de façade apparaissent dans `/realisations/renovation-bati-ancien/`. À confirmer avant d'en faire un service. |

---

## 4. Règle d'expansion géographique

Une page commune n'est créée que si **les trois** conditions sont réunies :

1. le client confirme explicitement intervenir dans cette commune ;
2. il existe au moins un élément réel propre à cette commune (chantier, photo, contrainte locale) ;
3. la page peut atteindre le niveau de contenu des fiches chantier actuelles (400+ mots utiles).

Sans les trois, l'intention locale reste servie par `/zones-intervention/`.

Signal en attente : GSC montre `rénovation de maison à portet sur garonne` (18 impressions,
pos. 15,1) et `remise en état après travaux à vieille toulouse` (10 impressions, pos. 38,4) —
Google cherche déjà une page locale sur ce site et n'en trouve aucune.

---

## 5. Où vivent les autres données

- `seo/SEO_KEYWORD_MASTER.csv` / `.xlsx` — recherche brute (75 lignes), requêtes « prix » marquées `Used On Website = NO`.
- `KEYWORD_CLUSTERING.md` — méthodologie de clustering.
- `CONTENT_STRATEGY_NO_PRICING.md` — décision tarifaire, périmètre exact.
- `seo/SEO_EXPERIMENT_LOG.md` — journal des changements et de leurs effets mesurés.

Ce fichier-ci prime en cas de désaccord sur l'affectation intention → URL.
