# jeromemarichez.fr

Site portfolio et vitrine de services de **Jérôme Marichez**, ingénieur logiciel à Lille :
ingénierie web, data & IA, SEA & UX.

**Stack** : TypeScript — Next.js (App Router).

Le site a deux fonctions et une seule promesse. Il **raconte un parcours** — ingénieur
logiciel, 9 ans, passé par la chefferie de projet et l'AMOA — et il **vend une chaîne à trois pôles**
qui s'appuie dessus. La promesse : *un seul interlocuteur humain pour vos projets
digitaux, du cadrage au run*. Celui qui cadre est celui qui code, mesure et exploite —
et il répond de tout.

Ce que la promesse **n'engage pas** : l'absence totale de tiers. Sur un projet dont la
taille le demande — c'est rare — Jérôme s'entoure de prestataires qu'il choisit, qu'il
cadre et dont il répond. Le client, lui, ne gère personne d'autre que lui : aucune couche
commerciale, aucun transfert de dossier, l'interlocuteur ne change pas. La page d'accueil
le dit explicitement dans la section « Et si le projet dépasse une personne ? ».

---

## 🎯 Positionnement

| Ce qui est vendu | Ce qui le rend crédible |
|------------------|-------------------------|
| Un interlocuteur unique, pas une chaîne de prestataires | 9 ans en petite équipe ou en autonomie complète, décisions techniques assumées en production |
| Une responsabilité unique, même quand un renfort est nécessaire | Encadrement de prestataires externes déjà exercé (équipe marketing de 5 à 10 personnes et 3 prestataires chez Truffle Capital, SEA/SEO/SMA chez Verhoeven Joaillier) et spécifications écrites pour des tiers extérieurs au domaine (AMOA Artedrone) |
| Du conseil qui va jusqu'au run | Trois migrations majeures menées sans interruption de service |
| De la décision simplifiée, pas des tableaux de bord de plus | Double casquette rare : développeur produit **et** pilote d'acquisition |
| De la mesure conforme | RGPD et DORA tenus en appels d'offres grands comptes |

**Angle éditorial transverse** : ne jamais vendre une techno, toujours vendre une
décision rendue possible. Chaque bloc de service se termine sur ce que le client
*décide* grâce à la prestation, pas sur la liste d'outils employés.

---

## 🧩 Les trois pôles — une chaîne, pas un catalogue

Ce ne sont **pas trois offres qu'on achète séparément**. C'est une prise en charge
continue, où chaque pôle passe explicitement la main au suivant :

| | Pôle | Ce qu'il fait | Ce qu'il remet au suivant |
|---|------|---------------|---------------------------|
| 1 | **Ingénierie web** | construire le site, le SaaS, l'application mobile — et les exploiter | un produit **en production**, donc mesuré : le run fait naître le besoin de data |
| 2 | **Data & IA** | comprendre le métier, bâtir ou reprendre la stratégie data, gouverner — puis choisir la solution, IA ou non | un métier **formalisé** et une donnée **gouvernée**, donc arbitrables |
| 3 | **SEA & UX** | trancher les parcours et les budgets sur cette donnée, puis implémenter | la modification **retourne au pôle 1** — même personne, aucun transfert de dossier |

Les deux jointures — appelées **charnières** dans le site — sont traitées comme des
sections à part entière, avec leur propre titre. Sans elles, l'offre redevient un
catalogue de trois prestations qu'on pourrait acheter à trois fournisseurs différents.
La chaîne n'est crédible **que** parce que c'est la même personne aux trois postes :
c'est l'argument de vente, pas un détail d'organisation.

#### Le fil IA — l'axe transverse

Un troisième type de section, le **fil**, traverse les trois pôles au lieu de s'insérer
entre deux. Il lève une confusion que le site crée lui-même : l'IA y apparaît comme
**offre** (pôle 2) *et* comme **méthode de production** (les trois pôles). Le fil parle
de la seconde, en quatre étapes — concevoir, construire, livrer, piloter — et se place
avant le pôle 1 pour que la méthode se lise avant les offres.

Sa règle d'écriture est bloquante : **l'IA propose, les tests tranchent**. Le pilotage
SEA reste attribué à la donnée et aux modèles (clustering, profilage), jamais à un agent
autonome. Le fil ne cite aucune preuve qui ne soit déjà portée par un pôle.

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

**L'ordre est le contenu.** Ce pôle ne part pas de la technique, il y arrive. On
comprend d'abord le métier, on traite ensuite la stratégie data, puis la gouvernance et
le droit — et seulement alors on choisit la solution. Toute réécriture qui remettrait la
technique en tête viderait l'offre de son sens : la solution technique **répond** au
problème métier posé au départ, elle ne le précède jamais, et **elle n'est pas toujours
de l'IA**.

**1. Comprendre le métier — une prestation à part entière, pas une étape préparatoire.**

- **Faire émerger les règles métier existantes** — celles que les équipes appliquent
  sans les avoir formalisées : recueil auprès de ceux qui les appliquent, mise par
  écrit, confrontation à l'historique. *Preuve : AMOA de la startup biotech Artedrone,
  besoin recueilli auprès des équipes scientifiques et dirigeantes et traduit en
  spécifications exploitables par des prestataires non spécialistes ; BPMN 2.0,
  cartographie SI.*
- **Découvrir les profils de clients** — profilage par clustering (KNN) sur les données
  réelles, restitution visuelle pensée pour la décision.
- **Découvrir les insights métier** — reprise de l'historique, analyse exploratoire sous
  Orange Data Mining, pondération et sélection des variables, élimination des
  corrélations fortes et du bruit. *Preuve : analyse de l'historique des inscriptions
  ayant abouti à des règles anti-fraude — fraude en baisse, conversion en hausse.*
- **Livrable propre** : ce que la donnée dit de l'activité, les règles formalisées, les
  profils identifiés, les questions sans réponse. Le client peut s'arrêter là.

**2. La stratégie data — la déployer, ou s'appuyer sur celle qui existe.**

- **Quand rien n'est en place** — définition des indicateurs à partir des questions du
  métier, plan de collecte, pipelines d'ingestion, modélisation : PostgreSQL
  (relationnel, séries temporelles, vectoriel), MySQL, Firebase.
- **Quand la donnée existe** — reprise de l'existant, agrégation et réconciliation
  multi-sources, dédoublonnage des identités, contrôles d'intégrité et de véracité dès
  l'ingestion, détection d'anomalies. La qualité est un **prérequis**, pas un correctif.
  *Preuve : système d'analyse multi-sources conforme RGPD mesurant la rentabilité client
  à long terme, branché sur Google Ads et Bing Ads.*

**3. Gouvernance et législation — avant la technique, jamais après.**

- **Qui possède quoi** — cartographie des sources et de leur propriété, ce qui peut
  sortir de chez le client et ce qui doit y rester.
- **Ce qui a le droit d'être collecté et traité** — RGPD, base légale, consentement
  (CMP, déclenchement conditionnel des tags par catégorie), cadrage des traitements avec
  le juridique. *Preuve : conformité RGPD et DORA tenue en appels d'offres grands
  comptes (distribution, assurance, banque) ; cadrage RGPD des données clients chez un
  e-commerçant de joaillerie.*
- **La contrainte oriente la solution** — une donnée qui ne peut pas sortir écarte
  d'office un service tiers et ramène l'arbitrage entre modèle open-weight hébergé et
  règle explicite.

**4. La solution technique — et pas toujours de l'IA.**

- **Une règle métier suffit souvent** — moins chère à faire tourner, plus facile à
  expliquer à un régulateur, plus simple à corriger qu'un modèle. Intégrée aux systèmes
  existants, c'est un **livrable complet**. *Preuve : règles anti-fraude définies puis
  implémentées dans le produit — fraude en baisse, conversion des inscriptions en
  hausse, latence réduite ; flux commande, stock et facturation modélisés en BPMN puis
  intégrés entre un ERP et un site marchand — survente évitée sur des pièces uniques.*
- **Machine learning** — supervisé (classification, réseaux de neurones) ou non
  supervisé selon ce que la donnée permet. Modèle supervisé anticipant les échecs de
  dépôt vocal, en production (TensorFlow, inférence en cloud functions) : extraction des
  caractéristiques du signal audio selon une méthode publiée sur **arXiv**, implémentée
  par Jérôme lui-même, adaptée aux données réelles puis industrialisée. *Preuve : routes
  vocales coûteuses évitées.*
- **LLM, quand le problème est du langage** — Claude (Vertex AI, API Anthropic), OpenAI,
  Gemini, Llama. Context engineering, comparaison continue et arbitrage
  **coût / latence / qualité / confidentialité** par cas d'usage. Fine-tuning de
  **Llama 3** sur corpus métier pour l'application mobile *Prézage*, complété par un
  procédé maison d'augmentation du contexte proche du RAG. *Preuve : charge de travail
  des prestataires réduite.*
- **RAG documentaire, fait maison** — réponse automatisée aux tickets de support de
  niveau 1 : recherche vectorielle PostgreSQL + API OpenAI, réponses ancrées sur la
  documentation interne et non sur la mémoire du modèle. **Aucun framework tiers.**
- **Agents & interopérabilité** — conception, développement **et documentation** de
  serveurs **MCP** et de plugins **n8n / Make / Zapier** : le produit devient appelable
  par un agent IA ou un scénario no-code chez le client.
- **MLOps & cloud** — déploiement, versioning et monitoring de modèles, CI/CD Docker et
  GitHub Actions, Vertex AI, Pub/Sub, Cloud Run, cloud functions, VM Compute Engine
  auto-scalées. **Pas de cluster Kubernetes administré en propre** — l'absence se dit
  telle quelle.

### 3. SEA & UX

L'offre acquisition **et arbitrage**, tenue par un ingénieur des données. C'est ce qui
la différencie d'une agence : la mesure n'est pas déclarative, elle est construite dans
le code.

> **Point de vigilance éditorial numéro un.** *UX* ne veut **pas** dire design
> graphique. Jérôme ne vend **aucune** création visuelle, aucune direction artistique,
> aucune maquette livrée en fichier. Ce qu'il vend, ce sont des **arbitrages** pris sur
> la donnée : quel parcours, quelle étape supprimée, quel formulaire raccourci, quel
> test A/B tranché, quelle page rendue en SSR plutôt qu'en CSR — puis implémentés par
> lui-même. Toute formulation qui laisserait planer un doute là-dessus est à réécrire.

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
- **Arbitrages UX** — refonte de parcours pilotée par la mesure : A/B testing des pages
  et des designs, heatmaps, taux de rebond, part de trafic mobile. Une étape disparaît
  parce que les chiffres le disent. *Preuve : panier moyen +50 % chez Verhoeven
  Joaillier.* Et comme c'est la même personne qui code, l'arbitrage décidé est
  **implémenté**, pas transmis à un tiers — c'est ce qui boucle la chaîne sur le pôle 1.
- **SEO technique** — stratégie de rendu Next.js par type de page, Core Web Vitals,
  Lighthouse, accessibilité — le référencement traité comme une propriété du produit.

---

## 🚫 Les limites assumées

Le site porte une section **« Ce que je ne fais pas »** ([`src/@vitrine/contenu/limites.ts`](./src/@vitrine/contenu/limites.ts)).
Ce n'est pas un aveu, c'est l'argument qui rend le reste croyable : un prestataire qui
sait tout faire ne sait rien faire.

Chaque ligne y traduit une règle de véracité du [`CLAUDE.md`](./CLAUDE.md) — pas de
cluster Kubernetes administré en propre, pas de framework RAG tiers, pas de création
graphique, une seule chaîne d'outillage de mesure mobile, ISTQB Foundation et rien
au-delà.

**Règle de rédaction de cette section** : elle énonce ce qui est fait, elle ne **nomme
jamais** un outil ou un niveau de certification proscrit par la table de véracité, même
sous forme de négation. « Deux régies publicitaires, pas douze » plutôt que la liste de
celles qui ne sont pas couvertes. Le test d'intégration `veracite-contenu.spec.ts`
échoue si un terme proscrit réapparaît où que ce soit dans le contenu publié.

---

## 🎓 Certifications à mettre en avant

Chaque certification doit être **cliquable vers son justificatif officiel**. Aucune URL
n'ayant été fournie à ce jour, les sept certifications sont publiées **sans lien**, avec
la mention « justificatifs communiqués sur demande » : un lien mort coûterait plus cher
que l'absence de lien. Les millésimes ont été arbitrés par Jérôme le **2026-08-20** —
Google Ads en 2021 (le CV Tracking Specialist indiquait 2022) et Microsoft Ads
confirmée, sans année connue.

| Certification | Année | Lien officiel |
|---------------|-------|---------------|
| Claude with Google Cloud's Vertex AI | 2026 | *à fournir* |
| ISTQB **Foundation** (niveau Avancé **non** obtenu) | 2026 | *à fournir* |
| Google Analytics Individual Qualification (GAIQ) | 2021 | *à fournir* |
| Google Ads | 2021 | *à fournir* |
| Microsoft Ads | — | *à fournir* |
| WeLoveDev — Top 5 % React | 2023 | *à fournir* |
| EF SET — Anglais B2 (CECRL) | — | *à fournir* |

---

## 🗺️ Arborescence prévue

| Route | Rôle |
|-------|------|
| `/` | Accroche, promesse d'interlocuteur unique, le fil IA transverse, la chaîne complète (3 pôles + 2 charnières), preuves chiffrées, limites assumées, certifications, les deux objections traitées (« et si je disparais ? » et « et si le projet dépasse une personne ? »), appel à contact |
| `/services/ingenierie-web` | Pôle 1 en détail |
| `/services/data-ia` | Pôle 2 en détail |
| `/services/sea-ux` | Pôle 3 en détail |
| `/parcours` | *(pas encore construite)* Parcours d'ingénieur et de chef de projet, formation |
| `/contact` | *(pas encore construite)* Formulaire (validation Zod) + coordonnées directes. En attendant, l'accueil et le pied de page portent un `mailto:` direct |

Chaque page de service porte ses propres métadonnées SEO, ses données structurées
(`schema.org/Service` et `ProfessionalService`) et un appel à contact contextualisé.

## ✅ Contraintes produit

- **SEO** : rendu statique ou ISR par défaut, métadonnées et données structurées par
  page, sitemap et robots générés.
- **Performance** : Lighthouse ≥ 95 sur les 4 catégories, Core Web Vitals au vert —
  le site est lui-même la démonstration de ce qui est vendu.
- **Accessibilité** : RGAA / WCAG AA, testée et non supposée (`uat/`).
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
make install        # dépendances
make dev            # démarrage en mode développement
```

L'application est servie sur **http://localhost:3000**. Les variables d'environnement
requises sont décrites dans `.env.example` (elles sont validées par un schéma Zod au
démarrage).

## 🧪 Tests & qualité

```bash
make lint             # Biome + limite 300 lignes/fichier
make test             # unitaires + intégration
make test-unit        # unitaires
make test-int         # intégration
make test-e2e         # e2e (navigateur)
make test-system      # système (vrai serveur HTTP)
make test-acceptance  # acceptation / non-fonctionnels (uat/)
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
