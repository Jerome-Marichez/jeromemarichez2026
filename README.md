# jeromemarichez.fr

Site CV de **Jérôme Marichez**, ingénieur logiciel à Lille.

**Ingénieur Full Stack | IA | QA | Data-Driven.** Dix ans d'expérience, toujours en
petite équipe ou en autonomie complète.

> Ce fichier est la **source de vérité du contenu** côté projet. La vérité produit
> (qui lit le site, pour décider quoi, sous quelles contraintes) vit dans
> [`PRODUCT.md`](./PRODUCT.md). Les règles d'écriture et de développement vivent dans
> [`CLAUDE.md`](./CLAUDE.md).

## À qui ce site parle

**Au recruteur, et à lui d'abord.** Le site existe pour décrocher un poste, et le
succès se mesure à une seule chose : le recruteur qui arrive accorde l'entretien.

Son parcours se fait en deux temps, et les deux sont servis :

1. **Trente secondes de jaugeage.** Niveau, stack, séniorité, localisation. À ce stade
   il cherche une raison d'éliminer, et le site doit lui donner de quoi continuer.
2. **La lecture détaillée.** Parcours, projets, preuves chiffrées, puis le CV en PDF
   qu'il archive ou transmet.

Un client peut lire le site, mais il n'est pas la cible : aucune hiérarchie et aucun
appel à l'action ne se décide pour lui.

## Le positionnement : quatre axes, une seule pratique

L'intitulé LinkedIn fait foi : **Ingénieur Full Stack | IA | QA | Data-Driven**.

Ce ne sont **pas** quatre métiers juxtaposés, et le site doit le dire explicitement.
Ils tiennent ensemble pour une raison factuelle : les équipes où Jérôme a travaillé
n'avaient ni QA, ni ops, ni équipe data. Ce qui manquait, il l'a construit.

| Axe | Ce qu'il porte |
|-----|----------------|
| **Full Stack** | React et Next.js avec un rendu arbitré page par page, Node.js et Express derrière une API REST spécifiée en OpenAPI |
| **IA** | Le développement en IA augmentée piloté par les tests : critères d'acceptation écrits d'abord, tests et tests de mutation comme juge |
| **QA** | Certifié ISTQB Foundation, développeur autant que testeur, non-régression rendue bloquante avant production |
| **Data-Driven** | Des décisions prises sur la donnée, avec des sujets choisis sur le problème plutôt que sur la mode |

**L'encadrement se raconte dans les expériences, jamais dans le titre.** Alternants et
stagiaires développeurs encadrés, prestataires recrutés et mesurés, équipe de 5 à 10
personnes coordonnée, budgets justifiés en comité de direction.

**Le double poste est réel et documenté** sur les trois expériences : développeur
fullstack et chef de projet digital chez Verhoeven, chef de projet et développeur en
indépendant chez Truffle, lead tech et ingénieur fullstack chez Acetelecom.

## Ce qu'un profil voisin ne pourrait pas copier sans mentir

- **Le développement en IA augmentée piloté par les tests.** Claude Code et Gemini au
  quotidien, outillés par des agents, des hooks, des skills et des serveurs MCP
  internes. Méthode écrite et transmise à une équipe, pas une pratique personnelle.
- **Il conçoit, livre, recette puis exploite.** Donc il paie lui-même le prix de ses
  choix d'architecture.
- **La qualité et l'intégration continue définies là où il n'y en avait pas**, pas
  héritées d'une équipe qui les avait déjà.
- **Le risque financier porté en propre** chez Truffle Capital, en indépendant :
  proposition commerciale défendue en comité de direction, puis prestataires recrutés
  et rémunérés à ses frais pour tenir l'engagement.

## Les preuves, toutes issues des CV

| Preuve | Contexte |
|--------|----------|
| Panier moyen en hausse de 50 % | Verhoeven Joaillier, parcours refondus sur la donnée |
| Lighthouse 98/100, RGAA et WCAG | Sms En Masse |
| Plus de 200 000 installations iOS et Android, près de 1 000 avis | Prézage |
| 3 migrations majeures sans coupure de service | PHP 5 vers 7 puis Node.js, jQuery vers React, Ionic 6 vers 8 et Angular 15 vers 19 |
| Survente supprimée sur des pièces uniques | Verhoeven, ERP M3 Soft synchronisé |
| Fraude en baisse, conversion préservée | Sms En Masse, pression du régulateur ARCOM |
| Budget ADS et SEO justifié en comité de direction | Truffle Capital et Verhoeven |
| Équipe de 5 à 10 personnes coordonnée | Truffle Capital, mission en indépendant |

**Une affirmation sans preuve disponible se reformule ou se supprime.** C'est une règle,
pas une intention.

## Les limites assumées

Les dire est un argument de lucidité, pas une faiblesse :

- **ISTQB Foundation**, pas l'Avancé.
- **Pas de cluster Kubernetes administré en propre.** Cloud Run, Compute Engine
  auto-scalées, cloud functions, Pub/Sub, Vertex AI.
- **Pas de framework RAG.** Le RAG comme technique, recherche vectorielle PostgreSQL
  plus API, fait maison.
- **Pas de management de développeurs.** Encadrement d'alternants, de stagiaires, de
  prestataires et d'équipes marketing.
- **Truffle Capital était un client**, en mission indépendante, pas un employeur.

## Les sources du contenu

Rien ne s'écrit de mémoire. En cas de doute sur un chiffre, une date ou un périmètre,
ces sources font foi, dans cet ordre :

1. Les six CV ciblés dans `/Users/nicolasb/Documents/CV/MES CV/` : Ingénieur Fullstack
   & Chef de Projet (le plus complet), Ingénieur Fullstack, Chef de projet digital,
   Testeur QA, Web Analyste, Support Applicatif N2.
2. [`PRODUCT.md`](./PRODUCT.md), la vérité produit validée.
3. La table des interdits de [`CLAUDE.md`](./CLAUDE.md), bloquante.

Le site raconte **un profil unique sur ses quatre axes**. Les six CV sont sa matière,
pas six entrées de lecture : il n'y a **aucun sélecteur de profil**.

## Points ouverts, à ne pas trancher seul

- **Date de la certification Google Ads.** Les CV indiquent 2022, un arbitrage
  antérieur retenait 2021. Le champ vaut `null` et aucune année ne s'affiche tant que
  Jérôme MARICHEZ n'a pas tranché.
- **URL des justificatifs de certification.** Aucune n'a été fournie. Aucun lien n'est
  posé : un lien mort serait pire que pas de lien.
- **Le CV téléchargeable affiche « 9 ans »** alors que le site dit dix. Les PDF sont
  générés par les scripts Python de `MES CV/sources/` et restent à régénérer.

## Arborescence

| Route | Rôle |
|-------|------|
| `/` | Le premier écran : nom, métier, quatre axes, les deux actions attendues |
| `/a-propos/` | Le profil, la méthode, la formation, les certifications |
| `/parcours/` | Les trois expériences, avec les réalisations portées telles quelles |
| `/projets/` | Les projets détaillés, en Contexte, Enjeu, Mon rôle, Résultat |
| `/competences/` | Le mur de stack : neuf familles, soixante-et-onze entrées |
| `/contact/` | Les coordonnées, en clair et cliquables. Aucun formulaire |
| `/blog/` | Les articles, du plus récent au plus ancien |
| `/blog/<slug>/` | Un article. Son corps est une chaîne HTML écrite à la main |

**Aucun formulaire de contact**, et c'est une décision : le site est un export statique,
donc un formulaire exigerait un service tiers, du RGPD et de la maintenance, pour
remplacer un numéro de téléphone qui fonctionne déjà.

## Contraintes produit

- **Rendu statique** (`output: 'export'`), métadonnées par page, `trailingSlash`.
- **Budgets Lighthouse bloquants** : performance **80** (plancher arbitré le
  2026-08-24), accessibilité, bonnes pratiques et SEO **95**. Valeurs exécutables dans
  [`scripts/budgets/pages.mjs`](./scripts/budgets/pages.mjs), elles ne se recopient
  nulle part.
- **RGAA et WCAG AA testés**, pas déclarés. Mise en pause du mouvement (WCAG 2.2.2) et
  respect de `prefers-reduced-motion` : l'ADN du site est animé, donc ce point n'est
  pas une option.
- **Aucun cookie, aucune mesure d'audience, aucun formulaire.** Rien n'est collecté,
  donc il n'y a pas de bandeau de consentement à afficher.
- **TypeScript strict**, validation Zod de toute entrée externe, aucun fichier source
  au delà de 300 lignes.

Le site est la démonstration de ce qu'il raconte : un défaut de performance ou
d'accessibilité y contredit directement ce que la page affirme.

## Direction visuelle

**Le Poste de Travail à 3h du matin.** Reprise de l'ADN café et code du portfolio
d'origine (`github.com/Jerome-Marichez/portfolio`), puis modernisée.

- Fond café torréfié, et **une seule source de lumière**, le café au lait, qui possède
  des régions entières plutôt que de saupoudrer des accents.
- **Fira Code sur tout le site**, et Shadows Into Light réservée à l'annotation
  manuscrite, la voix humaine dans la marge.
- **Tout s'aligne sur une grille de caractères** en unités `ch`, jamais sur une grille
  de pixels arbitraire : c'est ce qui fait du monospace un système et non un costume.
- **Aucune carte.** Les séparations sont des filets d'un pixel et des changements de
  fond, comme les panneaux d'un éditeur.
- **Un seul thème, sombre**, et c'est un choix : la scène d'usage est une nuit de
  travail. Le revers est assumé, il n'y a pas de version claire.

Le contrat de direction complet vit dans `.impeccable/surfaces/`. Le système de design
est documenté dans [`docs/design.md`](./docs/design.md), écrit depuis le site construit
et non depuis les intentions.

## Pour lancer l'application

### Prérequis

Node.js (version dans [`.nvmrc`](./.nvmrc)), et Docker pour la stack conteneurisée.

### Démarrage local

```bash
make install
make dev
```

### Stack conteneurisée

```bash
make docker-up
```

### Catalogue de composants

```bash
make storybook
```

## Tests et qualité

```bash
make lint          # Biome, plus la limite de 300 lignes
make type-check    # tsc --noEmit
make test          # tous les niveaux
make budgets       # Lighthouse et axe-core sur les pages mesurées
```

| Niveau | Emplacement | Outil |
|--------|-------------|-------|
| unitaire | `tests/unitaire/` | Jest et React Testing Library |
| intégration | `tests/integration/` | Jest et RTL, vraie frontière HTTP |
| e2e | `tests/e2e/` | Cypress |
| système | `tests/systeme/` | Jest, vrai serveur HTTP, collection Postman |
| acceptation | `tests/acceptance/`, `uat/` | runner Node natif |

**Les tests sont écrits par Jérôme MARICHEZ**, pas par l'assistant : un hook l'applique.
Détail dans [`docs/testing.md`](./docs/testing.md).

## Documentation

[architecture](./docs/architecture.md) ·
[data-model](./docs/data-model.md) ·
[design](./docs/design.md) ·
[frontend-practices](./docs/frontend-practices.md) ·
[accessibility](./docs/accessibility.md) ·
[testing](./docs/testing.md) ·
[ci-cd](./docs/ci-cd.md) ·
[git-workflow](./docs/git-workflow.md) ·
[docker](./docs/docker.md) ·
[storybook](./docs/storybook.md) ·
[tooling](./docs/tooling.md) ·
[model-routing](./docs/model-routing.md) ·
[security](./docs/security.md) ·
[rgpd](./docs/rgpd.md) ·
[ameliorations](./docs/ameliorations.md)

## Workflow Git

Deux branches permanentes, `main` en production et `dev` en intégration. Aucun commit
direct sur l'une ou l'autre : toute fonctionnalité passe par une branche
`feature/<nom>` et une PR. Détail dans [`docs/git-workflow.md`](./docs/git-workflow.md).
