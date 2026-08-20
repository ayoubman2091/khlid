# CURRENT SITE AUDIT — RK Pyrénées Construction

**Site audité :** https://xn--rkpyrnesconstruction-f2bb.com/ (punycode pour « rk-pyrénées-construction.com »)
**Date de l'audit :** 2026-08-19
**Méthode :** Récupération HTML brute (curl) des 4 pages indexées + sitemap.xml + robots.txt, lecture du DOM rendu, recherche du registre légal public (Pappers.fr). Aucune donnée Search Console / Analytics / Google Business Profile n'a pu être consultée (pas d'accès identifié à ces comptes) — ces sections sont marquées **N/A** et devront être complétées par le propriétaire.

---

## 0. RÉSUMÉ EXÉCUTIF

Le site actuel est généré par **Hostinger Website Builder** (`<meta name="generator" content="Hostinger Website Builder">`), un constructeur de site IA "générique". Il compte **4 pages** (`/`, `/services`, `/projets`, `/contact`), un sitemap propre et un robots.txt correct, mais :

- Le **texte est presque intégralement du remplissage IA générique**, répété quasi mot pour mot sur les 4 pages (« partenaire de confiance… solutions durables et innovantes… résultats de qualité »), sans aucune mention concrète de Toulouse, de la Haute-Garonne, de projets réels ou de prix.
- Le site contient au moins **une affirmation commerciale très probablement fausse** (« 15 ans de garantie qualité ») alors que l'entreprise est immatriculée depuis **avril 2023** (donc ~3 ans d'existence) — voir §6.
- **Aucune donnée structurée LocalBusiness/Organization** n'est présente — seulement un schema `WebSite`/`WebPage` générique, sans NAP, sans géolocalisation, sans horaires.
- **Aucun formulaire de contact** n'existe : la page `/contact` ne propose qu'un lien `tel:` et `mailto:`. C'est une perte de conversion majeure (§8).
- **25 images réelles** et **15 vidéos YouTube réelles** existent et sont exploitables — elles ont été téléchargées dans `/public/images/original/` (voir §5). Aucun logo réel n'existe (favicon = image vide en base64).
- Le nom légal exact au registre est **« RK PYRENNEES CONSTRUCTION »** (double N), alors que la marque affichée est **« RK Pyrénées Construction »** — à clarifier (§6).

---

## 1. STRUCTURE DU SITE

| URL | Statut HTTP | Poids HTML brut | Title actuel |
|---|---|---|---|
| `/` | 200 | 315 KB (surtout JS inline) | "Solutions innovantes en construction - RK Pyrénées \| construction" |
| `/services` | 200 | 132 KB | "Solutions de construction innovantes et durables \| construction" |
| `/projets` | 200 | 140 KB | "Projets de construction innovants et durables en Pyrénées \| construction" |
| `/contact` | 200 | 98 KB | "Contactez RK Pyrénées pour vos projets de construction \| construction" |

**Sitemap** (`/sitemap.xml`) : 4 URLs, `lastmod` identique sur les 4 (2026-05-05), priorités 1.0/0.5/0.5/0.5. Format valide.
**Robots.txt** : `User-agent: *` / `Disallow:` (tout est autorisé) + référence au sitemap. Correct mais minimal.
**Canonical** : présent et correct sur les 4 pages (auto-référencé, pas de dupliqué).

### PROBLEM → IMPACT → PRIORITY → SOLUTION

| # | Problem | Impact | Priority | Solution |
|---|---|---|---|---|
| 1.1 | Seulement 4 pages, aucune page service dédiée, aucune page réalisation individuelle, aucune page locale | Aucune couverture de la longue traîne, impossible de ranker sur des intentions précises (« maçon Toulouse », « prix rénovation maison Toulouse »…) | **P1** | Créer l'architecture complète définie en §13 du brief (pages services, réalisations, zones, guides) |
| 1.2 | `<title>` se termine systématiquement par « \| construction » (générique, redondant) | Title peu différenciant en SERP, mot-clé "construction" sur-répété sans valeur | P2 | Réécrire chaque title autour d'un mot-clé validé + marque, sans suffixe générique |

---

## 2. CONTENU — AUDIT QUALITATIF

Le texte est identique en structure sur toutes les pages (copié du template IA de Hostinger) :

> « RK Pyrénées, votre partenaire de confiance en construction, propose des solutions durables et innovantes. Notre expertise garantit des résultats de qualité pour tous vos projets. »

Cette phrase (ou une variante quasi identique) apparaît dans : meta description de `/`, meta description de `/services`, meta description de `/contact`, le JSON-LD de chaque page, et plusieurs blocs de texte visibles. Aucune page ne mentionne explicitly "Toulouse" ou "Haute-Garonne" dans un H1/H2 alors que c'est la zone d'intervention réelle.

**Services décrits** (5 cartes sur la home, texte très court, sans détail ni prix) :
- Construction neuve
- Terrassement & dallage
- Aménagement extérieur
- Rénovation intérieure & extérieure
- Maçonnerie générale

Aucun processus, aucun prix, **aucune FAQ** sur tout le site, aucune étude de cas.

**Page `/projets`** : pas de projets nommés individuellement. Trois blocs génériques ("Expertise Construction", "Solutions Durables", "Projets") avec galeries d'images mais sans titre de projet, sans localisation, sans description de travaux, sans avant/après structuré. C'est la plus grosse perte de potentiel SEO + conversion du site actuel : les réalisations réelles existent en images/vidéos (§5) mais ne sont pas racontées.

**Témoignages** : un testimonial "Bertrand Carrelet" sur la home, un autre non attribué sur `/services`. Origine et véracité **non vérifiables** depuis le site (aucune date, aucune source Google/Trustpilot liée). → à confirmer avec le client avant réutilisation ; ne pas les présenter comme avis Google vérifiés tant que ce n'est pas confirmé.

### PROBLEM → IMPACT → PRIORITY → SOLUTION

| # | Problem | Impact | Priority | Solution |
|---|---|---|---|---|
| 2.1 | Contenu quasi identique/dupliqué entre les 4 pages | Cannibalisation, faible différenciation sémantique, peu de matière indexable | **P1** | Réécrire un contenu unique par page, ancré localement, basé sur le keyword research |
| 2.2 | Page réalisations sans projets nommés | Perte totale du potentiel "Google Images" + preuve sociale + longue traîne locale | **P1** | Créer `/realisations/[slug]` avec vrai descriptif par chantier (voir §5 pour les visuels disponibles) |
| 2.3 | Aucune FAQ, aucun prix, aucun process | Faible couverture des requêtes informationnelles et des moteurs IA (GEO) | **P1** | Ajouter FAQ réelles + pages guides validées par le keyword research |
| 2.4 | Témoignages non sourcés | Risque de crédibilité, non conforme aux bonnes pratiques d'avis | P2 | Confirmer authenticité avec le client ou lier aux avis Google réels |

---

## 3. AFFIRMATIONS COMMERCIALES À VÉRIFIER (IMPORTANT)

La page `/services` affiche deux chiffres de crédibilité :

- **« 150+ clients satisfaits »**
- **« 15 ans de garantie / d'expérience qualité »**

D'après le registre public des entreprises françaises (Pappers.fr, données SIREN), **RK PYRENNEES CONSTRUCTION (SIREN 951 243 591)** a été créée le **01/04/2023** — soit environ **3 ans d'activité** à la date de cet audit, pas 15. Ce chiffre est très probablement un texte placeholder généré automatiquement par le constructeur de site IA et **jamais corrigé**.

**Règle appliquée (§50/§57 du brief) : ne jamais inventer ni reconduire une donnée non vérifiable.**
→ Ces deux chiffres ne seront **pas repris** dans le nouveau site tant qu'ils ne sont pas confirmés par vous. Si "150+ clients" est réel, donnez-moi le chiffre exact et je l'utiliserai avec une formulation honnête (ex. "depuis 2023" plutôt qu'un nombre d'années inventé).

---

## 4. DONNÉES LÉGALES / ENTREPRISE (source publique vérifiable)

Source : Pappers.fr (registre RNE/RCS français), consultable publiquement.

| Champ | Valeur |
|---|---|
| Nom légal (RNE) | RK PYRENNEES CONSTRUCTION *(orthographe registre : "PYRENNEES", double N — vs marque affichée "RK Pyrénées Construction")* |
| SIREN | 951 243 591 |
| SIRET (siège) | 951 243 591 00017 |
| Forme juridique | SASU (société par actions simplifiée unipersonnelle) |
| Adresse siège | Appartement A2 108, 22 Allée de Bellefontaine, 31100 Toulouse |
| Code NAF/APE | 41.20B — Construction d'autres bâtiments |
| Date de création | 01/04/2023 |
| RCS | Toulouse, immatriculée le 13/04/2023 |
| Représentant légal | Regad Khalid (Président) |
| Capital | 100,00 € |
| Statut | Active |

**Note :** l'adresse est un appartement (siège social), pas un local commercial visible. C'est cohérent avec une entreprise artisanale/BTP opérant chez les clients — à traiter en **Service Area Business** sur Google Business Profile plutôt qu'en commerce de proximité (recommandation en §7 du dossier Local SEO à venir).

---

## 5. AUDIT DES ASSETS (images & vidéos réelles)

### 5.1 Images

**25 images réelles** ont été identifiées dans le HTML source des 4 pages (hébergées sur `assets.zyrosite.com`, le CDN de Hostinger) et **téléchargées en pleine résolution** dans [`public/images/original/`](public/images/original/). Aucune image stock/IA n'a été utilisée pour cet inventaire — 2 à 3 URLs `images.unsplash.com` existent dans le bundle JS mais ne sont pas confirmées comme affichées (probablement résiduelles du template) ; elles ne seront pas reprises.

| Fichier | Dimensions | Poids original | Page(s) d'usage détectée |
|---|---|---|---|
| 1000048044-A0xl8...jpg | 1200×1600 | 570 KB | Home (image hero) |
| 1000048047-AoPWr...jpg | 1600×1200 | 529 KB | Services, Projets, Contact |
| 1000048017-YNqB4...jpg | 1024×768 | 151 KB | Services, Projets |
| 1000048041-Yan1k...jpg | 1600×1200 | 452 KB | Services |
| 1000048695-mjE7r...jpg | 1892×1900 | 357 KB | Services, Projets, Contact |
| 1000048182/191/194/230/237/238-*.jpg | portraits type photo mobile (1007×2160 / 738×1600 / 1200×1600) | 100–260 KB | Home (galerie) |
| 47061/47064/47086-*.jpg | 1500–2000px, paysage | 425–657 KB | Home (galerie / avant-après probable) |
| 47105/47114/47122-*.jpg | plus petites (595×944 à 883×664) | 108–170 KB | Home (galerie) |
| img-20250515-wa0001-*.jpg | 1200×1600 | 304 KB | Projets, Contact — **nom de fichier "wa0001" = probable export WhatsApp, donc photo réelle de chantier** |
| 1000047990 / 1000048008-*.jpg | 768×1024 / 1024×768 | 170–180 KB | Projets |

**Doublons détectés** (même image, deux clés CDN différentes, à dédupliquer dans le nouveau projet) :
- `1000048017-YNqB4pkJVqUB6ajv.jpg` = `1000048017-Yan1X3laJNTQPeeE.jpg` (151 310 octets, identiques)
- `1000048035-AR0LR7pqw7sx9Oye.jpg` = `1000048035-Yg2jngJBoWI8yVza.jpg` (315 294 octets, identiques)

**Poids total téléchargé : ~7,1 Mo pour 25 fichiers** (moyenne ~284 Ko/image, non compressées côté source). Le site actuel sert des versions redimensionnées à la volée via `assets.zyrosite.com/cdn-cgi/image/...` (bon réflexe déjà en place), mais les originaux ne sont pas optimisés (pas d'AVIF/WebP à la source). → conversion AVIF/WebP prévue dans le nouveau build (§3 du brief).

**Logo : un vrai logo existe** — `1000048695-mjE7r5N91JcPaaMn.jpg` (badge rond, monogramme "R" stylisé en toit de maison, texte "RK Pyrénées construction" + téléphone). *Correction par rapport à une première lecture de cet audit : ce fichier avait été catalogué comme une photo de chantier générique ; un examen visuel direct de chaque image a permis de l'identifier comme le vrai logo de l'entreprise.* Il n'est simplement **pas intégré** au site actuel (absent du header, absent du favicon). Le favicon actuel reste un placeholder vide (`data:;base64,iVBORw0KGgo=`). → Le nouveau site réutilise ce logo réel (recadré proprement) au lieu d'en créer un nouveau, conformément à la règle de préservation des assets (§57 du brief).

### 5.2 Vidéos

**15 vidéos YouTube réelles** sont intégrées (iframes `youtube.com/embed/...`) sur la page d'accueil, section "Notre Nouveau Réalisation en vidéos" :

`GhRafhgff9w`, `EDBvDhKor4c`, `hAzwNdjhoYU`, `9hpvwHO7Bak`, `j1-KbqVnwwM`, `jdh3CSACJxs`, `f3yhoKnT6mg`, `EDCpHptpFok`, `Hh1rVyL5Jb0`, `Ly112RaE08s`, `qvQU6J1hP4Q`, `fqm2vnsjp0Y`, `mTU2whXb27A`, `ZKW_B0k8Gzc`, `sHNRgi1CcHc`

Je n'ai pas pu confirmer via récupération automatique le nom de la chaîne YouTube propriétaire, le titre exact ni la description de chaque vidéo (YouTube bloque la récupération de contenu par les outils disponibles ici) — **N/A**. Merci de confirmer que ces 15 vidéos appartiennent bien à la chaîne YouTube de RK Pyrénées (et de me communiquer l'URL de la chaîne) afin que je puisse : leur donner un vrai contexte texte par vidéo, les associer à un chantier précis dans `/realisations`, et implémenter `VideoObject` correctement.

Toutes les 15 vidéos se chargent actuellement **en même temps** en iframes sur la home (15 embeds simultanés) → gros problème de performance (§8).

### PROBLEM → IMPACT → PRIORITY → SOLUTION

| # | Problem | Impact | Priority | Solution |
|---|---|---|---|---|
| 5.1 | Images non compressées à la source (~284 Ko/moy.) | LCP dégradé, poids de page inutile | **P1** | Conversion AVIF/WebP + `srcset`/`sizes` dans le nouveau build |
| 5.2 | 15 iframes YouTube chargées simultanément | JS/réseau très lourd sur la home, CLS/INP dégradés | **P1** | Lazy-load : thumbnail + `facade` cliquable, iframe chargée à la demande |
| 5.3 | Doublons d'images (mêmes fichiers, clés différentes) | Poids inutile, confusion de gestion des assets | P3 | Dédupliquer dans `/public/images` |
| 5.4 | Aucun logo réel | Pas de marque visuelle mémorable, favicon vide | P2 | Créer un wordmark simple (texte + repère graphique), pas un faux "logo historique" |

---

## 6. NAP (Nom / Adresse / Téléphone) — COHÉRENCE

| Source | Nom affiché | Adresse | Téléphone |
|---|---|---|---|
| Site actuel (footer/contact) | "RK Pyrénées" / "RK Pyrénées Construction" | **"22 allée de belfontaine, 31100 Toulouse"** (⚠️ faute : "belfontaine" au lieu de "Bellefontaine") | 06 66 82 78 02 |
| Registre légal (Pappers/RNE) | RK PYRENNEES CONSTRUCTION | Appartement A2 108, 22 Allée de Bellefontaine, 31100 Toulouse | — |
| Brief fourni (référence à utiliser) | RK PYRÉNÉES CONSTRUCTION | 22 Allée de Bellefontaine, 31100 Toulouse | 06 66 82 78 02 |
| Email | rk.pyrenees.construction@gmail.com — cohérent partout | | |

**Incohérence confirmée : le site actuel orthographie mal "Bellefontaine".** C'est une erreur NAP classique qui nuit au Local SEO (Google doit faire correspondre l'adresse exacte à la fiche Google Business Profile). Le nouveau site utilisera systématiquement l'orthographe correcte du brief : **22 Allée de Bellefontaine, 31100 Toulouse**.

La fiche Google Business Profile / Google Maps n'a pas pu être auditée automatiquement (rendu JS non accessible aux outils disponibles ici — voir §7). **N/A** pour : catégorie exacte, note, nombre d'avis, photos publiées, horaires déclarés. → à fournir par vous (export ou capture d'écran de la fiche), ou à auditer manuellement ensemble à l'étape Local SEO.

---

## 7. STRUCTURED DATA / SEO TECHNIQUE

| Élément | État actuel | Constat |
|---|---|---|
| JSON-LD | `WebSite` (home) / `WebPage` (autres pages) uniquement | **Aucun `LocalBusiness`/`Organization`**, aucune adresse structurée, aucun téléphone structuré, aucun horaire |
| Meta description | Présente, unique par page mais texte quasi identique | Pas assez différenciée |
| Open Graph / Twitter Card | Présents mais `og:image`/`twitter:image` **vides** | Aucune image de partage sur les réseaux sociaux |
| Canonical | Présent, correct | OK |
| Hreflang | Absent (site mono-langue FR) | Normal à ce stade, à ajouter seulement si une stratégie multilingue est validée (brief §31) |
| Breadcrumbs | Absent | À ajouter |
| Robots.txt / Sitemap.xml | Présents, valides, minimalistes | OK comme base |
| Favicon | Placeholder vide | À créer |
| Police | Roboto + "Google Sans" via `cdn.zyrosite.com` (proxy Google Fonts) | Chargement correct mais dépendant du CDN Hostinger — à internaliser/optimiser dans le nouveau build |
| Cookie consent | Une librairie "cookieconsent" est chargée | À réévaluer selon les trackers réellement utilisés dans le nouveau site (§9 brief) |
| Analytics (GA4/GTM) | Aucun identifiant `G-XXXXXXX` ni `GTM-XXXXX` détecté dans le HTML | **Le site actuel n'a probablement aucun tracking actif** → aucune donnée Search Console/Analytics historique à attendre |

### PROBLEM → IMPACT → PRIORITY → SOLUTION

| # | Problem | Impact | Priority | Solution |
|---|---|---|---|---|
| 7.1 | Pas de schema `LocalBusiness`/`Organization` | Google ne peut pas rattacher formellement le site à l'entité locale (NAP, zone, horaires) | **P1** | Implémenter `LocalBusiness` + `Organization` avec données vérifiées uniquement |
| 7.2 | `og:image`/`twitter:image` vides | Partages sociaux sans visuel, mauvais CTR | P2 | Renseigner une image réelle (hero) en OG |
| 7.3 | Aucun tracking détecté | Zéro historique de données pour piloter la stratégie SEO | **P1** | Installer GA4 + Search Console dès la mise en ligne (brief §42) |

---

## 8. CONVERSION / UX

- **Aucun formulaire de contact** sur `/contact` — uniquement `tel:` et `mailto:`. C'est la lacune de conversion la plus importante du site actuel.
- **Aucune barre CTA mobile fixe** (Appeler / WhatsApp / Devis).
- **Aucun CTA "Devis gratuit" identifiable** de façon cohérente sur les pages services/projets/contact.
- Pas de carte Google Maps intégrée sur `/contact`.
- Pas d'horaires affichés de façon structurée (seule mention "Lun à Ven" trouvée, sans heures précises) — à confirmer avec vous.

### PROBLEM → IMPACT → PRIORITY → SOLUTION

| # | Problem | Impact | Priority | Solution |
|---|---|---|---|---|
| 8.1 | Pas de formulaire de contact | Perte de leads pour tout visiteur qui préfère un formulaire à un appel | **P1** | Formulaire complet (brief §39) + envoi email/CRM |
| 8.2 | Pas de barre CTA mobile sticky | Friction de conversion sur mobile (majorité du trafic local) | **P1** | Barre fixe Appeler / WhatsApp / Devis (brief §40) |
| 8.3 | Pas de carte intégrée | Manque de réassurance locale sur la page contact | P2 | Intégrer Google Maps embed pointant sur l'adresse exacte |

---

## 9. PERFORMANCE (limites de cet audit)

Je n'ai pas de navigateur/Lighthouse réel à disposition dans cet environnement pour mesurer LCP/INP/CLS/TTFB en conditions réelles → **N/A** pour les scores Lighthouse actuels. Constats indirects, basés sur le HTML/réseau observés :

- Page d'accueil : **315 Ko de HTML**, dont l'essentiel est un bundle JS inline massif (~307 Ko sur une seule ligne) → probable JavaScript non critique bloquant/lourd.
- 15 iframes vidéo simultanées sur la home (§5.2) → risque élevé sur LCP/INP/poids réseau.
- Images non modernes à la source (JPEG uniquement, pas d'AVIF/WebP natif).
- Pas de `fetchpriority`/`preload` détecté sur l'image hero.

**Recommandation :** une fois le nouveau site buildé, lancer un audit Lighthouse réel (`npm run build` + Chrome DevTools/PageSpeed Insights) — étape prévue au brief (§52/§9 STEP 9).

---

## 10. RÉCAPITULATIF DES PRIORITÉS

| Priorité | Sujets |
|---|---|
| **P1 — Critique** | Formulaire de contact, barre CTA mobile, schema LocalBusiness/Organization, contenu unique par page (fin du duplicate IA), page réalisations avec vrais projets nommés, tracking GA4/Search Console, compression images/vidéos |
| **P2 — Important** | Favicon/logo, OG image, cohérence NAP (correction "Bellefontaine"), FAQ, sourcing des témoignages |
| **P3 — Mineur** | Déduplication fichiers images, nettoyage title suffixe générique |

---

## 11. POINTS À CONFIRMER AVEC VOUS AVANT LA SUITE

1. **"150+ clients satisfaits" et "15 ans"** (§3) — confirmez-vous un chiffre réel de clients ? Sinon je n'utilise aucun chiffre inventé.
2. **Chaîne YouTube** propriétaire des 15 vidéos (§5.2) — quelle URL, pour un vrai crédit/contexte ?
3. **Zone(s) d'intervention réelle(s)** au-delà de Toulouse (brief §16/§33 : pas de fausses pages villes) — quelles villes/communes desservez-vous réellement ?
4. **Témoignages** (§2) — sont-ils de vrais clients ? Peut-on les lier à un avis Google réel ?
5. **Accès Google Business Profile / Search Console / Analytics** — pourrez-vous me donner (ou consulter vous-même) ces données pour la boucle d'optimisation post-lancement (brief §50 / STEP 11) ?

---

*Prochaine étape (STEP 2 du brief) : Keyword Research complet, croisé avec Google Trends, pour bâtir `SEO_KEYWORDS.xlsx` et le clustering — sans attendre vos réponses ci-dessus si vous préférez que je continue tout de suite.*
