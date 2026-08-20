# SEO ARCHITECTURE — RK Pyrénées Construction

Traduit le keyword research ([SEO_KEYWORD_MASTER.csv](seo/SEO_KEYWORD_MASTER.csv), [KEYWORD_CLUSTERING.md](KEYWORD_CLUSTERING.md)) et l'audit ([CURRENT_SITE_AUDIT.md](CURRENT_SITE_AUDIT.md)) en un plan de site concret. Une URL canonique par intention — pas de doublon, pas de cannibalisation (brief §14/§25).

---

## 1. SITE MAP (routes de lancement)

| Route | Cluster ciblé | Type | Priorité | Statut |
|---|---|---|---|---|
| `/` | BRAND + vue d'ensemble tous services | Homepage | P1 | À construire |
| `/services` | Vue d'ensemble des 6 services | Hub | P1 | À construire |
| `/services/renovation` | RENOVATION_MAISON_TOULOUSE | Page service pilier | **P1** | À construire |
| `/services/construction` | CONSTRUCTION_TOULOUSE | Page service | P1 | À construire |
| `/services/maconnerie` | MACONNERIE_TOULOUSE | Page service | P1 | À construire |
| `/services/terrassement` | TERRASSEMENT_TOULOUSE | Page service | P1 | À construire |
| `/services/dallage` | DALLAGE_TOULOUSE | Page service | P1 | À construire |
| `/services/extension` | EXTENSION_MAISON_TOULOUSE | Page service | P1 | À construire |
| `/services/amenagement-exterieur` | AMENAGEMENT_EXTERIEUR_TOULOUSE | Page service | P1 | À construire |
| `/realisations` | Toutes réalisations (hub Google Images/Video) | Hub portfolio | P1 | À construire (contenu = vrais projets, en attente de vos titres/localisations par chantier) |
| `/realisations/[slug]` | Longue traîne locale + preuve sociale | Fiche projet | P1 | À construire au fur et à mesure des projets confirmés |
| `/a-propos` | BRAND, E-E-A-T | Page confiance | P1 | À construire |
| `/zones-intervention` | Toulouse + banlieue (candidats à valider) | Page locale | P2 | À construire (contenu conditionné à votre validation des communes) |
| `/contact` | BRAND transactionnel | Page conversion | **P1** | À reconstruire (le point le plus faible du site actuel — pas de formulaire aujourd'hui) |
| `/devis` | Toutes intentions transactionnelles | Page conversion dédiée | P1 | À construire (formulaire complet brief §39, lié depuis chaque CTA du site) |
| `/guides/prix-renovation-maison` | INFORMATIONAL_PRIX_RENOVATION | Guide | P2 | À construire (contenu sourcé, cf clustering) |
| `/guides/prix-construction-maison` | INFORMATIONAL_PRIX_CONSTRUCTION | Guide | P2 | À construire |
| `/guides/prix-maconnerie` | INFORMATIONAL_PRIX_MACONNERIE | Guide | P2 | À construire |
| `/guides/prix-terrassement` | INFORMATIONAL_PRIX_TERRASSEMENT | Guide | P2 | À construire |
| `/guides/comment-choisir-son-entreprise-de-renovation` | INFORMATIONAL_GUIDE_CHOIX | Guide | P2 | À construire |

**Non créées au lancement (justification) :**
- Pages villes individuelles (Blagnac, Colomiers…) → regroupées dans `/zones-intervention` tant que la demande réelle par commune n'est pas confirmée (évite les "fausses pages villes" interdites au brief §33/§16).
- Pages internationales (Maroc, Belgique, Suisse) → aucune, RK n'intervient pas physiquement hors 31 (voir KEYWORD_CLUSTERING.md §11).
- `/blog` générique → pas de blog fourre-tout ; seulement les guides ci-dessus, chacun rattaché à un mot-clé réel validé (brief §30, anti keyword-stuffing).

---

## 2. STACK TECHNIQUE (confirmée par le brief)

React 18 + TypeScript + Vite + Tailwind CSS + React Router + Lucide React. Framer Motion seulement si une animation ne peut pas être obtenue en CSS pur. Aucune dépendance superflue (pas de UI kit lourd, pas de carousel library, pas de state manager global — le site est vitrine + formulaire, pas une app).

## 3. ARBORESCENCE DE FICHIERS

```
src/
  components/
    ui/              # Button, Badge, Input, Textarea, Accordion (FAQ)...
    layout/          # Header, Footer, MobileBottomBar, Breadcrumb
    sections/        # Hero, TrustSignals, ServicesGrid, ProjectsGrid,
                      # BeforeAfter, Process, WhyUs, Reviews, ServiceAreas, FAQSection, CTASection
  pages/             # Home, ServicesHub, ServiceDetail, Realisations, RealisationDetail,
                      # About, ServiceAreas, Contact, Quote, Guide, NotFound
  data/              # services.ts, projects.ts, faq.ts, zones.ts, guides.ts — contenu séparé du JSX
  seo/               # SEO.tsx (title/meta/canonical/OG par page), structured-data/ (JSON-LD builders)
  hooks/             # useConversionTracking, etc.
  lib/               # utils, image helpers (srcset), constants (NAP, phone, email)
  types/             # Service, Project, FAQItem, Zone...
  assets/            # (référence vers /public, pas de doublon d'images ici)
public/
  images/original/   # 25 photos réelles récupérées du site actuel (déjà en place)
  images/optimized/  # AVIF/WebP générés à partir des originaux (étape build)
  videos/            # posters + éventuels fichiers vidéo propres si fournis
  logo/              # wordmark à créer (aucun logo réel n'existe — voir audit §5.1)
```

## 4. DONNÉES NAP CANONIQUES (à utiliser partout, sans exception)

```
RK PYRÉNÉES CONSTRUCTION
22 Allée de Bellefontaine, 31100 Toulouse
06 66 82 78 02
rk.pyrenees.construction@gmail.com
```
*(corrige la faute "belfontaine" trouvée sur le site actuel — voir audit §6)*

## 5. STRUCTURED DATA PRÉVU (par page)

| Page | Schema |
|---|---|
| Toutes | `Organization` (site-wide, dans le layout) |
| `/` | `LocalBusiness` (sous-type `GeneralContractor`), `WebSite` |
| `/services/*` | `Service` + `BreadcrumbList` |
| `/realisations/[slug]` | `BreadcrumbList` + `VideoObject` si vidéo associée + `ImageObject` |
| `/guides/*` | `Article` + `FAQPage` si contenu réellement en Q/R |
| `/contact` | `BreadcrumbList` |

`Review`/`AggregateRating` : **non implémenté au lancement**, faute d'avis sourcés vérifiés (voir audit §2, témoignages non confirmés). À activer uniquement avec de vrais avis Google liés.

## 6. MAILLAGE INTERNE (principe, détail complet dans INTERNAL_LINKING_MAP.md à venir)

```
Home → Services (hub) → Service détail → Réalisations liées → Devis
Guide prix X → Service détail correspondant → Devis
Réalisation → Service correspondant + Réalisations similaires
Footer → tous les services + zones + contact (présent sur 100% des pages)
```

## 7. CE QUI RESTE À PRODUIRE AVANT/PENDANT LE DÉVELOPPEMENT

Conformément à la liste de fichiers du brief, dans l'ordre où ils deviennent nécessaires :
- `LOCAL_SEO.md` — stratégie Google Business Profile (nécessite votre confirmation des zones + accès si possible à votre fiche GBP)
- `INTERNATIONAL_SEO.md` — formalisation courte de la décision "pas de page internationale pour l'instant"
- `GEO_AI_SEARCH.md` — recommandations GEO/IA (peut être écrit en parallèle du développement)
- `INTERNAL_LINKING_MAP.md` — détaillé une fois les pages construites
- `CONTENT_CALENDAR.md`, `SEO_ROADMAP.md`, `SEO_KPI_TRACKER.md` — après mise en ligne (nécessitent le site en prod)
- `PERFORMANCE_AUDIT.md`, `FINAL_SEO_REPORT.md` — après build (Step 9-11)

**Prochaine étape : Step 7-8 du brief (design system + implémentation React).** C'est la phase la plus longue et la plus irréversible du projet (beaucoup de code) — je démarre le scaffolding maintenant sauf si vous voulez d'abord ajuster quelque chose dans ce plan de site.
