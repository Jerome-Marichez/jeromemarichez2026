# jeromemarichez2026

Site portfolio et vitrine de services de **Jérôme Marichez**, ingénieur logiciel à Lille :
ingénierie web, data & IA, SEO/SEA. Domaine visé : **jeromemarichez.fr**.

**Stack** : TypeScript — front Next.js (App Router), back Node.js/TypeScript, entités et
schémas Zod partagés dans `shared/`.

Le site a deux fonctions et une seule promesse. Il **raconte un parcours** — ingénieur
logiciel, 9 ans, passé par la chefferie de projet et l'AMOA — et il **vend trois offres**
qui s'appuient dessus. La promesse : *un seul interlocuteur humain pour vos projets
digitaux, aucune sous-traitance*. Celui qui cadre est celui qui code, mesure et exploite.

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

## 🧩 Les trois offres

### 1. Ingénierie Web

L'offre socle : concevoir, développer et exploiter un produit web ou mobile de bout en
bout. Elle mobilise toutes les compétences du parcours.

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
- **Architecture & exploitation** — arbitrage monolithe / microservices, Docker, CI/CD
  GitHub Actions, Google Cloud (Cloud Run, VM Compute Engine auto-scalées, cloud
  functions, Pub/Sub), Vercel, serveurs on-premise et IaaS. SLI / SLO / SLA, PCA et PRA
  testés, déploiements sans interruption de service.
- **Qualité** — développement **piloté par les tests (TDD)**, Jest, Cypress, Playwright,
  tests de mutation (Stryker), Postman, tests de performance et de charge,
  non-régression à chaque livraison. Certification **ISTQB Foundation**.
- **Migrations sans coupure** — PHP 5 → 7 puis réécriture Node.js, jQuery → React,
  Ionic 6 → 8 et Angular 15 → 19, chacune menée sans interruption ni gel de la roadmap.
- **Chefferie de projet & AMOA** — recueil du besoin, spécifications, **BPMN 2.0**,
  cartographie SI, matrice de risques, recette et tests d'acceptation (UAT),
  coordination d'une équipe marketing de 5 à 10 personnes et de 3 prestataires.
- **Développement en IA augmentée** — Claude Code et Gemini au quotidien (agents,
  hooks, skills, loop, serveurs MCP internes), piloté par les tests. Vélocité
  augmentée à effectif constant.

### 2. Data & IA

Mettre l'IA **en production**, dans des produits vendus, avec les contraintes qui vont
avec : coût d'inférence, latence, RGPD, disponibilité. Pas dans des notebooks.

- **LLM en production** — Claude (Vertex AI, API Anthropic), OpenAI, Gemini, Llama.
  Context engineering, comparaison continue des modèles et arbitrage
  **coût / latence / qualité / confidentialité** par cas d'usage.
- **Adaptation de modèles** — fine-tuning de **Llama 3** sur corpus métier pour
  l'application mobile *Prézage*, complété par un procédé maison d'augmentation du
  contexte proche du RAG. Objectif métier tenu : charge de travail des prestataires
  réduite.
- **RAG documentaire** — réponse automatisée aux tickets de support de niveau 1 sur
  l'ensemble des produits : recherche vectorielle PostgreSQL + API OpenAI, réponses
  ancrées sur la documentation interne et non sur la mémoire du modèle.
- **Agents & interopérabilité** — conception, développement **et documentation** de
  serveurs **MCP** et de plugins **n8n / Make / Zapier** : le produit devient appelable
  par un agent IA ou un scénario no-code chez le client.
- **Machine learning** — modèle supervisé anticipant les échecs de dépôt vocal, en
  production (TensorFlow, inférence en cloud functions) : extraction des
  caractéristiques du signal audio selon une méthode publiée sur **arXiv** par
  l'Universitat de Barcelona, implémentée, adaptée aux données réelles puis
  industrialisée. Routes vocales coûteuses évitées.
- **Data mining & règles métier** — analyse exploratoire sous Orange Data Mining,
  pondération et sélection des variables, élimination des corrélations fortes et du
  bruit, puis règles implémentées dans le produit. *Preuve : fraude en baisse,
  conversion des inscriptions en hausse, latence réduite.*
- **Data engineering** — pipelines d'ingestion, nettoyage, dédoublonnage, agrégation et
  réconciliation multi-sources. La qualité de la donnée est traitée comme un
  **prérequis**, pas comme un correctif : contrôles d'intégrité et de véracité dès
  l'ingestion, détection d'anomalies.
- **MLOps & cloud** — déploiement, versioning et monitoring de modèles, CI/CD Docker et
  GitHub Actions, Vertex AI, Pub/Sub, Cloud Run, VM auto-scalées.
- **Conformité** — RGPD et DORA, exigés en appels d'offres grands comptes
  (distribution, assurance, banque).

### 3. SEO / SEA

L'offre acquisition, tenue par un ingénieur des données. C'est ce qui la différencie
d'une agence : la mesure n'est pas déclarative, elle est construite dans le code.

- **Mesure et taggage** — Google Tag Manager conteneur **web et server-side**,
  dataLayer, Measurement Protocol, plan de taggage et nomenclature d'événements
  standardisée, documentée et opposable. Google Analytics, Matomo, Search Console,
  et côté mobile Firebase Analytics / Crashlytics.
- **Conformité by design** — RGPD, CMP et gestion du consentement (déclenchement
  conditionnel des tags par catégorie), cadrage des traitements avec le juridique.
  La conformité n'est pas une case à cocher après coup : elle conditionne l'architecture
  de collecte.
- **LTV, pas one-shot** — système d'analyse multi-sources (SEO, SEA, IA) conforme RGPD :
  agrégation des sources d'acquisition, réconciliation et dédoublonnage des identités,
  mesure de la **rentabilité client à long terme**. Les budgets sont arbitrés sur la
  rentabilité réelle, pas sur les métriques natives des régies.
- **Solutions sur mesure multi-source** — pas de connecteur générique : la donnée est
  agrégée depuis les régies (Google Ads, Bing Ads), le produit et le CRM, puis
  réconciliée selon le modèle métier du client.
- **Tableaux de bord personnalisés** — un dashboard par client et par produit, pas un
  gabarit. Data visualisation et **clustering / profilage clients** (KNN) pour rendre
  la décision lisible : ce que le dirigeant doit trancher apparaît, le reste
  disparaît.
- **SEA & pilotage** — Google Ads, Bing Ads, SEO / SEA / SMA, A/B testing, optimisation
  du taux de conversion. *Budgets pilotés : 100 000 € ADS/SEO chez Truffle Capital,
  ~25 000 € d'encadrement de prestataires SEA chez Verhoeven Joaillier.*
- **SEO technique** — stratégie de rendu Next.js par type de page, Core Web Vitals,
  Lighthouse, accessibilité — le référencement traité comme une propriété du produit.

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
| Google Ads | 2021 *(à confirmer : 2022 sur un CV)* | *à fournir* |
| Microsoft Ads *(à confirmer)* | — | *à fournir* |
| WeLoveDev — Top 5 % React | 2023 | *à fournir* |
| EF SET — Anglais B2 (CECRL) | — | *à fournir* |

---

## 🗺️ Arborescence prévue

| Route | Rôle |
|-------|------|
| `/` | Accroche, promesse d'interlocuteur unique, les 3 offres, preuves chiffrées, appel à contact |
| `/services/ingenierie-web` | Offre 1 en détail |
| `/services/data-ia` | Offre 2 en détail |
| `/services/seo-sea` | Offre 3 en détail |
| `/parcours` | Parcours d'ingénieur et de chef de projet, formation, certifications liées |
| `/contact` | Formulaire (validation Zod) + coordonnées directes |

Chaque page de service porte ses propres métadonnées SEO, ses données structurées
(`schema.org/Service` et `ProfessionalService`) et un appel à contact contextualisé.

## ✅ Contraintes produit

- **SEO** : rendu statique ou ISR par défaut, métadonnées et données structurées par
  page, sitemap et robots générés.
- **Performance** : Lighthouse ≥ 95 sur les 4 catégories, Core Web Vitals au vert —
  le site est lui-même la démonstration de ce qui est vendu.
- **Accessibilité** : RGAA / WCAG AA, testée et non supposée (`tests/acceptance/uat/`).
- **RGPD** : mesure d'audience conforme, consentement géré, aucune donnée personnelle
  collectée hors formulaire de contact explicite.

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
