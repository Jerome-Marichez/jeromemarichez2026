# jeromemarichez2026

Site portfolio et vitrine de services de **Jérôme Marichez**, ingénieur logiciel à Lille :
ingénierie web, data & IA, SEA. Domaine visé : **jeromemarichez.fr**.

**Stack** : TypeScript — front Next.js (App Router), back Node.js/TypeScript, entités et
schémas Zod partagés dans `shared/`.

Le site a deux fonctions et une seule promesse. Il **raconte un parcours** — ingénieur
logiciel, 9 ans, passé par la chefferie de projet et l'AMOA — et il **vend trois offres**
qui s'appuient dessus. La promesse : *un seul interlocuteur humain pour vos projets
digitaux, aucune sous-traitance*. Celui qui cadre est celui qui code, mesure et exploite.

Le contenu publié est écrit à la **première personne du singulier** : « je », jamais
« nous ». Un « nous » contredirait la promesse à l'endroit exact où elle se vend.

> Ce n'est **pas** un paquet npm : rien n'est publié sur le registre. Les `package.json`
> ne servent qu'à l'outillage et au build.

---

## 🎯 Positionnement

| Ce qui est vendu | Ce qui le rend crédible |
|------------------|-------------------------|
| Un interlocuteur unique, pas une chaîne de prestataires | 9 ans en petite équipe ou en autonomie complète, décisions techniques assumées en production |
| Du conseil qui va jusqu'au run | Trois migrations majeures menées sans interruption de service |
| De la décision simplifiée, pas des tableaux de bord de plus | Double casquette rare : développeur produit **et** pilote d'acquisition |
| De la mesure conforme | RGPD et DORA tenus en appels d'offres grands comptes |

**Angle éditorial transverse** : ne jamais vendre une techno, toujours vendre une
décision rendue possible. Chaque bloc de service se termine sur ce que le client
*décide* grâce à la prestation, pas sur la liste d'outils employés.

---

## 🔗 La chaîne, et les deux points d'entrée

Les trois offres ne sont **pas un catalogue** : elles forment une **chaîne continue**.
Je cadre, je développe, je câble la donnée — et cette donnée pilote ensuite l'acquisition
et alimente les projets IA. Le visiteur doit pouvoir **se situer immédiatement** :

```
   Vous partez de zéro ──►  Cadrage ──► Développement ──► Câblage data ──┬──► SEA
                                                                         │
   Vous avez déjà une app ─────────────────────►  Câblage data ──────────┴──► Data & IA
```

| Étape | Contenu |
|-------|---------|
| 1. Je cadre | Besoin, spécifications, BPMN 2.0, cartographie SI, matrice de risques, arbitrages techniques |
| 2. Je développe | Site ou logiciel : UI/UX, front, back, mise en production, exploitation |
| 3. Je câble | Taggage, entrepôt data multi-source, intégration big data |
| 4a. Je pilote | SEA Google et Bing, dashboard unique, décisions sur la rentabilité long terme |
| 4b. J'exploite | Agents autonomes, projets data supervisés et non supervisés |

L'**entrepôt data est le pivot** : il alimente **à la fois** l'acquisition et l'IA. C'est
ce qui justifie que ce soit la même personne qui construise le produit et qui pilote la
mesure — le site est conçu dès le départ pour produire la donnée, au lieu d'être
instrumenté après coup.

> **Le SEO n'est pas une prestation vendue.** Ni rédaction de contenu, ni netlinking, ni
> suivi de positions. Ce qui est livré, c'est un site **SEO-ready** : une propriété du
> livrable de l'offre Ingénierie Web, pas une offre. La troisième offre est **SEA**, sans
> SEO. En revanche l'**expérience SEO passée reste au parcours** (100 000 € ADS/SEO
> pilotés chez Truffle Capital, encadrement SEO chez Verhoeven Joaillier) : la ligne passe
> entre *ce qui est vendu* et *ce qui a été fait*.

---

## 🧩 Les trois offres

### 1. Ingénierie Web

L'offre socle : concevoir, développer et exploiter un produit web ou mobile de bout en
bout. Elle mobilise toutes les compétences du parcours.

- **Cadrage** — recueil du besoin, spécifications, **BPMN 2.0**, cartographie SI, matrice
  de risques, recette et tests d'acceptation (UAT). Coordination d'équipes et de
  prestataires. *Preuve : équipe marketing de 5 à 10 personnes et 3 prestataires
  coordonnés chez Truffle Capital.*
- **UI / UX** — maquettage et design system, catalogue de composants (Storybook),
  accessibilité **RGAA / WCAG / W3C**, refonte de parcours pilotée par la mesure
  (A/B testing, heatmaps, taux de rebond). *Preuve : panier moyen +50 % sur un
  e-commerce de joaillerie de luxe.*
- **Front-end** — React, Next.js avec stratégie de rendu différenciée par type de page
  (CSR / SSR / SSG / ISR) pour arbitrer performance perçue, coût serveur et
  référencement ; Angular, Ionic (iOS / Android), Redux / Zustand / React Query,
  Tailwind, Material UI. *Preuve : Lighthouse 98/100.*
- **Back-end** — Node.js / Express, API REST, webhooks, cloud functions, traitements
  asynchrones distribués (Google Cloud Pub/Sub), PostgreSQL (relationnel, séries
  temporelles, vectoriel), MySQL, Firebase, validation Zod.
- **Livré SEO-ready** — métadonnées et données structurées par page, URL canoniques,
  sitemap et robots générés, rendu statique, Core Web Vitals, sémantique HTML et
  accessibilité. *Le site que vous lisez en est la démonstration : son propre socle de
  référencement est construit exactement ainsi.* **Ce n'est pas une prestation de
  référencement** : le site est prêt à être référencé, le travail éditorial et le
  netlinking ne font partie d'aucune offre.
- **Architecture & exploitation** — arbitrage monolithe / microservices, Docker, CI/CD
  GitHub Actions, Google Cloud (Cloud Run, VM Compute Engine auto-scalées, cloud
  functions, Pub/Sub), Vercel, serveurs on-premise et IaaS. SLI / SLO / SLA, PCA et PRA
  testés, déploiements sans interruption de service.
- **Qualité** — développement **piloté par les tests (TDD)**, Jest, Cypress, Playwright,
  tests de mutation (Stryker), Postman, tests de performance et de charge,
  non-régression à chaque livraison. Certification **ISTQB Foundation**.
- **Migrations sans coupure** — PHP 5 → 7 puis réécriture Node.js, jQuery → React,
  Ionic 6 → 8 et Angular 15 → 19, chacune menée sans interruption ni gel de la roadmap.
- **Développement en IA augmentée** — Claude Code et Gemini au quotidien (agents,
  hooks, skills, loop, serveurs MCP internes), piloté par les tests. Vélocité
  augmentée à effectif constant.

### 2. Data & IA

Mettre l'IA **en production**, dans des produits vendus, avec les contraintes qui vont
avec : coût d'inférence, latence, RGPD, disponibilité. Pas dans des notebooks.

**L'ordre de lecture est le message** (précisions de Jérôme MARICHEZ, 2026-08-08).
L'offre s'ouvre sur la **fiabilité** des données, puis sur leur **qualification selon
l'usage visé**, et **seulement ensuite** sur les deux volets d'exploitation. C'est le
discours réel, et ce qui le distingue de qui vend l'IA d'abord pour découvrir ensuite que
la donnée du client est inexploitable. Cet ordre ne s'inverse pas pour gagner en effet
d'annonce : dans le contenu typé, l'ordre du tableau `axes` le porte tel quel.

#### D'abord — la donnée

- **Fiabilité des données** — le préalable, traité comme tel : vos données sont-elles
  intègres, dédoublonnées, exploitables ? Pipelines d'ingestion, nettoyage,
  dédoublonnage, agrégation et réconciliation multi-sources, contrôles d'intégrité et de
  véracité dès l'ingestion, détection d'anomalies. La qualité de la donnée est un
  **prérequis**, jamais un correctif appliqué après coup.
- **Qualification selon l'usage visé** — la même donnée ne se prépare pas de la même
  façon selon ce qu'on veut en faire. Trois usages, trois préparations : **usages
  marketing** (segmentation, activation, mesure) ; **IA générative et LLM** (corpus,
  découpage, indexation vectorielle) ; **modèles prédictifs et non prédictifs**
  (sélection et pondération des variables, étiquetage, jeux d'entraînement et de test).

Ensuite seulement, l'offre porte **deux volets explicites** sur ce même socle. Le
découpage est porté par la donnée elle-même (`IAxeOffre.volet`), pas par la mise en page.

#### Volet 1 — Agents autonomes

- **LLM en production** — Claude (Vertex AI, API Anthropic), OpenAI, Gemini, Llama.
  Context engineering, comparaison continue des modèles et arbitrage
  **coût / latence / qualité / confidentialité** par cas d'usage.
- **MCP & automatisation no-code** — conception, développement **et documentation** de
  serveurs **MCP** et de plugins **n8n / Make / Zapier** : le produit devient appelable
  par un agent IA ou un scénario no-code chez le client.
- **RAG documentaire** — recherche vectorielle PostgreSQL + API OpenAI sur la base
  documentaire, réponses ancrées sur les documents et non sur la mémoire du modèle.
  *Preuve : réponse automatisée aux tickets de support de niveau 1.*
- **Adaptation de modèles open-weight** — fine-tuning de **Llama 3** sur corpus métier
  pour l'application mobile *Prézage*, complété par un procédé maison d'augmentation du
  contexte proche du RAG. *Preuve : charge de travail des prestataires réduite.*

#### Volet 2 — Projets data supervisés et non supervisés

- **Apprentissage supervisé — modèles prédictifs** — classification, régression, réseaux
  de neurones, **TensorFlow**. Modèle anticipant les échecs de dépôt vocal, en production
  (inférence en cloud functions) : extraction des caractéristiques du signal audio selon
  une méthode publiée sur **arXiv** par l'Universitat de Barcelona, implémentée, adaptée
  aux données réelles puis industrialisée. *Preuve : routes vocales coûteuses évitées.*
- **Apprentissage non supervisé — descriptif et non prédictif** — clustering, **KNN**,
  profilage et segmentation. Ces modèles décrivent ce qui est, ils ne prédisent pas : la
  distinction se dit, elle évite d'attendre d'un profilage ce qu'il ne peut pas donner.
- **Data mining & règles métier** — analyse exploratoire sous Orange Data Mining,
  pondération et sélection des variables, élimination des corrélations fortes et du
  bruit, puis règles implémentées dans le produit. *Preuve : fraude en baisse,
  conversion des inscriptions en hausse, latence réduite.*

#### Socle commun aux deux volets

- **MLOps & cloud** — déploiement, versioning et monitoring de modèles, CI/CD Docker et
  GitHub Actions, Vertex AI, Pub/Sub, Cloud Run, VM auto-scalées.
- **Conformité** — RGPD et DORA, exigés en appels d'offres grands comptes
  (distribution, assurance, banque).

> **Data & IA est entièrement sur devis** (arbitrage de Jérôme MARICHEZ, 2026-08-08). Un
> projet data se chiffre au périmètre : volume et état des données, usage visé,
> contraintes de mise en production. **Aucun montant n'est affiché pour cette offre.**
> « Sur devis » est une modalité, pas un prix — c'est à ce titre que la mention est
> publiée. La seule grille tarifaire du site est celle de l'offre **SEA**, plus bas ; le
> contenu typé de Data & IA ne porte aucun montant et aucune grille ne lui est rattachée.

### 3. SEA

Le SEA piloté par la donnée, tenu par un ingénieur des données. Ce qui le distingue d'une
agence : la mesure n'est pas déclarative, elle est construite dans le code.

**Cette offre ne contient aucun SEO** — voir l'encadré de la section « La chaîne ».

- **Taggage et collecte** — Google Tag Manager conteneur **web et server-side**,
  dataLayer, Measurement Protocol, plan de taggage et nomenclature d'événements
  standardisée, documentée et opposable. Google Analytics, Matomo, Search Console,
  et côté mobile Firebase Analytics / Crashlytics.
- **Conformité by design** — RGPD, CMP et gestion du consentement (déclenchement
  conditionnel des tags par catégorie), cadrage des traitements avec le juridique.
  La conformité n'est pas une case à cocher après coup : elle conditionne l'architecture
  de collecte.
- **Entrepôt data multi-source** — Google Analytics, Matomo, Google Ads et Bing Ads
  agrégés, réconciliés et dédoublonnés, avec **intégration big data**. Pas de connecteur
  générique : la donnée est modélisée selon le métier du client. C'est ce même entrepôt
  qui alimente ensuite les projets data et IA.
- **Un seul tableau de bord** — toutes les sources sur un écran, sur mesure par client et
  par produit. Plus de va-et-vient entre quatre interfaces qui ne comptent pas pareil.
  Selon les besoins : data visualisation, clustering et profilage clients, segmentation
  marketing et sémantique.
- **LTV, pas one-shot** — agrégation des sources d'acquisition, réconciliation et
  dédoublonnage des identités, mesure de la **rentabilité client à long terme**. Les
  budgets sont arbitrés sur la rentabilité réelle, pas sur les métriques natives des
  régies.
- **Pilotage des campagnes** — Google Ads et Bing Ads, structuration des campagnes,
  A/B testing, optimisation du taux de conversion. *Preuves : 100 000 € ADS/SEO pilotés
  chez Truffle Capital, ~25 000 € de prestataires SEA encadrés chez Verhoeven Joaillier —
  faits du parcours, pas prestations vendues.*
- **Ce que l'offre ne couvre pas** — ni rédaction de contenu, ni netlinking, ni suivi de
  positions. Dit explicitement plutôt que laissé à supposer.

#### Tarifs

Grille publiée — arbitrages de Jérôme MARICHEZ du 2026-08-08 (issue #17). **Toutes taxes
comprises**, mention affichée à côté de chaque montant et jamais reléguée en note de bas
de page : c'est elle qui rend le prix non ambigu.

| Prestation | Condition d'application | Tarif |
|------------|-------------------------|-------|
| Mise en place de la solution data-driven | si j'ai conçu le site | **incluse** |
| Mise en place de la solution data-driven | sur un site existant, que je n'ai pas conçu | **fourchette TTC, une seule fois, selon le périmètre** |
| Gestion du compte | ensuite, une fois la solution en place | **forfait mensuel, sur devis** |

> **Les montants eux-mêmes ne sont pas recopiés ici.** Ils vivent dans
> `front/src/content/offres/sea-tarifs.ts`, et nulle part ailleurs — même règle que les
> coordonnées de contact. Un prix écrit à deux endroits finit par diverger, et c'est la
> copie oubliée qui engage Jérôme vis-à-vis d'un prospect. La mention « TTC » n'est pas
> une convention de rédaction : c'est une **propriété du montant**, sans laquelle le
> contenu ne compile pas — voir [`docs/data-model.md`](./docs/data-model.md).

**Pourquoi la mise en place est incluse quand je conçois le site.** En encadrant des
prestataires d'acquisition avant de piloter moi-même, j'ai vu la même mécanique se
répéter : les campagnes s'optimisent sur les métriques de la régie — coût par clic,
conversions déclarées — parce que c'est la seule matière disponible de ce côté-là,
pendant que l'entreprise décide sur ses chiffres à elle : marge, stock, valeur d'un
client dans la durée. Ce n'est pas une affaire de compétence, c'est une affaire d'accès.
D'où la gratuité de la mise en place dans ce cas précis : c'est le seul où la mesure est
construite dans le produit dès le départ, du côté des chiffres du client. C'est la
charnière économique de la chaîne cadrage → développement → câblage data → SEA.

*Cet argument se dit **à la première personne, depuis l'expérience vécue** — jamais comme
un jugement sur une profession, sans nom d'agence et sans généralisation. Le dénigrement
de concurrents est juridiquement risqué, et un prospect déjà accompagné se sentirait pris
à partie.*

---

## 🎓 Certifications à mettre en avant

Chaque certification doit être **cliquable vers son justificatif officiel**. Les URLs
sont à récupérer auprès de Jérôme avant mise en ligne — aucune ne doit être inventée
ni approximée.

| Certification | Année | Lien officiel |
|---------------|-------|---------------|
| Claude with Google Cloud's Vertex AI | 2026 | *à fournir* |
| ISTQB **Foundation** (niveau Avancé **non** obtenu) | 2026 | *à fournir* |
| Google Analytics Individual Qualification (GAIQ) | 2021 | *à fournir* |
| Google Ads | *aucune année affichée* | *à fournir* |
| WeLoveDev — Top 5 % React | 2023 | *à fournir* |

Trois arbitrages de Jérôme MARICHEZ (2026-08-08), rendus après recoupement des trois CV
de référence, et tenus par le contenu typé (`front/src/content/certifications.ts`) :

- **Google Ads reste sans année.** Les CV se contredisent — 2021 sur l'Ingénieur Full
  Stack et l'AI Engineer, 2022 sur le Tracking Specialist. Une année approchée ne
  s'écrit pas : la donnée porte `annee: null` et rien n'est affiché.
- **Microsoft Ads est retiré.** Il figurait ici avec la mention « à confirmer » et
  n'apparaît sur aucun des trois CV : non établi, donc non publié. Il ne se réintroduit
  qu'avec un justificatif.
- **EF SET n'est pas une certification** et ne figure plus dans ce tableau. Les trois CV
  le classent sous « Langues » : c'est le test qui a **évalué** un niveau d'anglais, pas
  un titre professionnel obtenu.

## 🗣️ Langues

| Langue | Niveau | Référentiel | Évalué par |
|--------|--------|-------------|------------|
| Anglais | B2 | CECRL | EF SET |

Portée par `identite.langues` et émise dans `knowsLanguage` du JSON-LD — jamais dans
`hasCredential`, qui est réservé aux diplômes et aux certifications.

---

## 🗺️ Arborescence prévue

| Route | Rôle |
|-------|------|
| `/` | Accroche, promesse d'interlocuteur unique, les 3 offres, preuves chiffrées, appel à contact |
| `/services/ingenierie-web` | Offre 1 en détail |
| `/services/data-ia` | Offre 2 en détail |
| `/services/sea` | Offre 3 en détail |
| `/parcours` | Parcours d'ingénieur et de chef de projet, formation, certifications liées |
| `/contact` | Coordonnées directes (e-mail obfusqué, téléphone, LinkedIn) et mention RGPD. **Sans formulaire** — arbitrage de Jérôme MARICHEZ du 2026-08-08 : le service d'acheminement des messages n'est pas choisi, et un formulaire qui afficherait « message envoyé » sans rien envoyer serait pire que pas de formulaire. Le formulaire, son schéma partagé `shared/` et la route back feront l'objet d'une évolution ultérieure |

Chaque page de service porte ses propres métadonnées SEO, ses données structurées
(`schema.org/Service` et `ProfessionalService`) et un appel à contact contextualisé.

## ✅ Contraintes produit

- **SEO** : rendu statique ou ISR par défaut, métadonnées et données structurées par
  page, sitemap et robots générés. Le socle technique est en place — une page déclare
  son titre, sa description et son chemin, et l'URL canonique, l'Open Graph et la carte
  Twitter en découlent ; le `sitemap.xml` est **dérivé des routes réelles**, jamais
  d'une liste écrite à la main. Marche à suivre et vérifications :
  [`docs/seo.md`](./docs/seo.md).
- **Performance** : Lighthouse ≥ 90 sur les 4 catégories, Core Web Vitals au vert —
  le site est lui-même la démonstration de ce qui est vendu. *(Seuil abaissé de 95 à 90
  sur arbitrage de Jérôme MARICHEZ, 2026-08-08. À ne pas confondre avec la preuve
  historique « Lighthouse 98/100 » de l'offre Ingénierie Web, obtenue sur la plateforme
  Sms En Masse : c'est un résultat passé, pas le seuil du présent site — il ne bouge
  pas.)*
- **Accessibilité** : RGAA / WCAG AA, testée et non supposée (`tests/acceptance/uat/`).
- **RGPD** : mesure d'audience conforme, consentement géré, aucune donnée personnelle
  collectée hors formulaire de contact explicite. *(État réel à ce jour : le site ne
  collecte RIEN — aucun formulaire, aucun cookie, aucune mesure d'audience implémentée, et
  les seules données personnelles publiées sont celles de Jérôme MARICHEZ lui-même. Détail
  et points restant à trancher : [`docs/rgpd.md`](./docs/rgpd.md).)*

Le contenu éditorial doit respecter les **règles de véracité** listées dans
[`CLAUDE.md`](./CLAUDE.md) — ce qui n'est pas revendicable n'est pas écrit, même quand
la formule serait vendeuse.

---

## 🚀 Pour lancer l'application

### Prérequis

- **Node.js 24** (LTS, voir `.nvmrc`) et npm
- **Docker** (pour le démarrage conteneurisé)
- **Make** (interface de commandes)

### Démarrage rapide (Docker)

```bash
cp .env.example .env    # compléter les variables (jamais commité)
make docker-up          # stack conteneurisée (docker compose)
make logs               # logs des conteneurs
make docker-down        # arrêt
```

### Démarrage local (hors Docker)

```bash
make install        # dépendances (front + back)
make dev            # démarrage des deux applications
```

| Application | URL locale | Variable de port |
|-------------|-----------|------------------|
| Front (Next.js) | http://localhost:3000 | `FRONT_PORT` |
| Back (API Node) | http://localhost:3001 | `BACK_PORT` |
| Sonde de santé back | http://localhost:3001/health | — |
| Storybook | http://localhost:6006 | — |

Les variables d'environnement sont décrites dans `.env.example` et validées par un
schéma Zod (`schemas/env.schema.ts`) avant usage.

`NEXT_PUBLIC_SITE_URL` (domaine public du site) est une variable de **build** et non
d'exécution : Next.js la substitue pendant `next build`. Elle doit donc être présente
dans l'environnement de construction — `docker compose` la transmet en argument de
build. Absente, le front retombe sur `http://localhost:3000`. Détails :
[`docs/seo.md`](./docs/seo.md).

## 🧪 Tests & qualité

```bash
make lint             # Biome + limite 300 lignes/fichier
make test             # unitaires + intégration (front + back)
make test-unit        # unitaires (front + back)
make test-int         # intégration (front + back)
make test-e2e         # e2e navigateur (Cypress, front)
make test-system      # système back (vrai serveur HTTP via listen(0))
make test-acceptance  # acceptation / non-fonctionnels (tests/acceptance/uat)
make test-mutation    # mutation (Stryker)
```

La stratégie complète (niveaux, conventions d'emplacement et de nommage) est
décrite dans [`docs/testing.md`](./docs/testing.md).

## 📚 Documentation

| Document | Contenu |
|----------|---------|
| [`docs/architecture.md`](./docs/architecture.md) | Architecture applicative et choix techniques |
| [`docs/data-model.md`](./docs/data-model.md) | Modèle de données |
| [`docs/seo.md`](./docs/seo.md) | SEO technique (métadonnées, robots, sitemap, données structurées) |
| [`docs/testing.md`](./docs/testing.md) | Stratégie de tests |
| [`docs/ci-cd.md`](./docs/ci-cd.md) | Pipelines CI/CD |
| [`docs/git-workflow.md`](./docs/git-workflow.md) | Workflow Git (main/dev, PR, protections) |
| [`docs/docker.md`](./docs/docker.md) | Conteneurisation |
| [`docs/tooling.md`](./docs/tooling.md) | Outillage (Make, Biome, hooks Claude Code) |
| [`docs/model-routing.md`](./docs/model-routing.md) | Routage de modèles (subagents Claude Code) |
| [`docs/security.md`](./docs/security.md) | Sécurité |
| [`docs/accessibility.md`](./docs/accessibility.md) | Accessibilité |
| [`docs/design.md`](./docs/design.md) | Design & UI |
| [`docs/storybook.md`](./docs/storybook.md) | Storybook (catalogue de composants) |
| [`docs/rgpd.md`](./docs/rgpd.md) | RGPD |
| [`docs/ameliorations.md`](./docs/ameliorations.md) | Pistes d'amélioration |

## Workflow Git

Deux branches permanentes : `main` (production, protégée) et `dev` (intégration).
Toute fonctionnalité passe par `feature/<nom>` → PR vers `dev` → CI verte → merge.
Détails : [`docs/git-workflow.md`](./docs/git-workflow.md).

> Projet géré par Jérôme MARICHEZ.
