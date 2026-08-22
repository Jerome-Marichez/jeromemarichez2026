# jeromemarichez-fr

## Présentation

Site portfolio et vitrine de services de Jérôme Marichez, ingénieur logiciel à Lille :
**Ingénierie web**, **Data**, **IA**, **SEA & UX**.

Le site raconte un parcours (ingénieur logiciel, 9 ans, passé par la chefferie de projet
et l'AMOA) et vend quatre pôles qui s'appuient dessus. Promesse centrale, à faire
apparaître partout : **un seul interlocuteur humain pour vos projets digitaux, du cadrage
au run** — celui qui cadre est celui qui code, mesure et exploite, et il répond de tout.
La promesse porte sur l'**interlocuteur** et la **responsabilité**, jamais sur l'absence
totale de tiers : sur un projet dont la taille le demande — c'est rare — Jérôme peut
s'entourer de prestataires qu'il choisit, cadre et dont il répond.

### Le modèle de l'offre — quatre pôles, un embranchement

```
Ingénierie web  →  DATA  →  ( IA  et/ou  SEA & UX )
```

*(Modèle arbitré par Jérôme MARICHEZ le 2026-08-21.)*

Ce n'est **pas** une chaîne linéaire de quatre maillons, et ce ne sont **pas** quatre offres
posées côte à côte au catalogue :

- **Data est le passage obligé.** Ni IA ni SEA & UX ne se font sans elle. C'est l'argument
  central du modèle, pas une étape administrative : sans mesure, l'IA devine et
  l'acquisition arbitre à l'aveugle.
- **L'embranchement est inclusif.** Un client peut prendre IA seule, SEA & UX seule, ou les
  deux. Rien n'oblige à acheter de l'IA pour tirer parti de la donnée, et le site doit le
  dire explicitement.
- **IA et SEA & UX sont deux branches parallèles**, pas deux étapes successives. Aucun
  contenu, aucun visuel, aucun libellé, aucun numéro d'ordre ne doit laisser croire que
  l'une vient après l'autre.

Le **périmètre éditorial complet** (les quatre pôles en détail, les preuves chiffrées,
les certifications, l'arborescence des pages, les contraintes SEO / perf / a11y / RGPD)
est décrit dans le [`README.md`](./README.md) : c'est la **source de vérité du contenu**.
Ce fichier-ci porte les règles qui encadrent la façon de l'écrire et de le développer.

**Stack** : TypeScript — Next.js (App Router) (front) ; Node.js/TypeScript (back le cas
échéant) ; **Zod** pour la validation des entrées.

**Contraintes produit non négociables** : rendu statique ou ISR et métadonnées par page
(SEO), Lighthouse ≥ 95 sur les 4 catégories, accessibilité RGAA / WCAG AA testée dans
`uat/`, mesure d'audience conforme RGPD avec consentement. Le site est la démonstration
de ce qu'il vend : un défaut de perf ou d'accessibilité y coûte plus cher qu'ailleurs.

> Projet géré par Jérôme MARICHEZ.

## Règles de véracité du contenu (bloquantes)

Le site engage la réputation professionnelle de Jérôme et sera lu par des prospects et
des recruteurs. **Aucune formulation ne doit dépasser ce qui est réellement établi**, même
quand une formule plus large serait plus vendeuse. Ces règles priment sur toute
considération marketing.

**Ne JAMAIS écrire sur ce site :**

| Interdit | Formulation juste |
|----------|-------------------|
| « aucune sous-traitance », « 0 sous-traitant », toute promesse d'**absence totale de tiers** | **Un seul interlocuteur, du cadrage au run, qui répond de tout.** Aucune couche commerciale, aucun transfert de dossier, l'interlocuteur ne change pas. Sur un projet dont la taille le demande — **c'est rare, et la rareté se dit** — des prestataires viennent en renfort : Jérôme les choisit, les cadre et en répond ; le client ne gère personne d'autre que lui. *(Règle mise à jour à la demande explicite de Jérôme MARICHEZ, issue #40.)* |
| ISTQB niveau **Avancé** / Automatisation de test | **ISTQB Foundation** uniquement — l'Avancé n'est pas obtenu |
| Management, lead ou mentorat de **développeurs** | Encadrement d'**équipes marketing / SEO-SEA, de prestataires externes, d'alternants et de stagiaires**. Titre réel : « Lead Tech » chez MailingVox (équipe de 2 devs + 1 PO) |
| « en collaboration avec l'Universitat de Barcelona » | Méthode d'extraction audio **publiée sur arXiv**, qu'il a **implémentée lui-même** puis industrialisée |
| LangChain, LlamaIndex, tout **framework** RAG | Le **RAG comme technique** est confirmé (recherche vectorielle PostgreSQL + API OpenAI), fait **maison** |
| AppsFlyer, Adjust, Amplitude, Tealium, Adobe Launch / Analytics | Côté mobile : **Firebase Analytics et Crashlytics uniquement**. Côté web : GTM (web et server-side), Measurement Protocol, GA, Matomo, CMP |
| Meta Ads, LinkedIn Ads | Google Ads, Bing Ads, SEO / SEA / SMA |
| GraphQL, NestJS, Prisma, Gherkin / Cucumber, PyTorch | Voir la stack réellement revendiquée dans le `README.md` |
| Cluster **Kubernetes** administré en propre | Cloud Run, VM Compute Engine **auto-scalées**, cloud functions, Pub/Sub, Vertex AI — l'absence de K8s se dit telle quelle, c'est un argument de lucidité |
| GTM attribué à la période **Verhoeven Joaillier** | GTM appartient à la période **Acetelecom / MailingVox**. Chez Verhoeven : Google Analytics, A/B testing, heatmaps |

**Points de vigilance supplémentaires :**

- **Prézage** et **Llama 3** peuvent être **nommés** (autorisation explicite de Jérôme,
  2026-08-07). Restent hors ligne : le contenu du corpus, les données, les chiffres du
  projet — le NDA couvre ceux-là.
- Les **intitulés de poste historiques** (Verhoeven Joaillier, Truffle Capital) sont
  repris **à l'identique des CV**, sans réécriture pour coller à une offre de service.
- Toute **certification affichée doit pointer vers son justificatif officiel**. Une URL
  de certification ne s'invente ni ne s'approxime : tant qu'elle n'a pas été fournie par
  Jérôme, le lien reste marqué *à fournir* et la certification n'est **pas** publiée avec
  un lien mort.
- Deux points de certification ont été **arbitrés par Jérôme MARICHEZ le 2026-08-20**, et
  ne sont donc plus à rouvrir : la certification **Google Ads est datée de 2021** (le CV
  Tracking Specialist indiquait 2022 — c'est 2021 qui fait foi), et la certification
  **Microsoft Ads est confirmée**, sans année connue : elle s'affiche donc sans millésime.
  `README.md` et `src/@vitrine/contenu/certifications.ts` appliquent déjà cet arbitrage.
- Les **CV de référence** vivent dans `/Users/nicolasb/Documents/CV/`
  (`cv-ingenieur-fullstack.md`, `cv-ai-engineer.md`, `cv-tracking-specialist.md`) : en cas
  de doute sur un chiffre, une date ou un périmètre, ce sont eux qui font foi — pas la
  mémoire de l'assistant.

## Ligne éditoriale

- **Vendre une décision, pas une techno.** Chaque bloc de service se termine sur ce que
  le client peut trancher grâce à la prestation, jamais sur une liste d'outils.
- **Chaque affirmation porte sa preuve** : un chiffre, une durée, une contrainte tenue.
  Les preuves disponibles sont listées dans le `README.md` (panier moyen +50 %,
  Lighthouse 98/100, budgets de 100 000 € pilotés, migrations sans coupure, fraude en
  baisse). Une affirmation sans preuve disponible se reformule ou se supprime.
- **Ton** : sobre, direct, à la première personne. Pas de superlatif, pas de jargon
  d'agence, pas d'emoji dans le contenu publié.
- **Le développement en IA augmentée** (Claude Code / Gemini — agents, hooks, skills,
  loop, serveurs MCP) **piloté par les tests (TDD)** est un différenciateur assumé : il
  apparaît partout où le site parle de programmation, jamais comme un détail
  d'outillage.

## Méthode de travail (workflow Git)

Le projet suit **toujours** un modèle à deux branches permanentes :

| Branche | Rôle |
|---------|------|
| `main`  | Branche de **production** — code stable, déployable, jamais cassé. |
| `dev`   | Branche d'**intégration** — développement courant, base des nouvelles fonctionnalités. |

### Règles

1. **Jamais de commit direct sur `main`.** `main` ne reçoit que des fusions depuis `dev` (ou des hotfix validés).
2. **Jamais de commit direct sur `dev`.** `dev` ne reçoit que des fusions depuis des branches de fonctionnalité (`feature/<nom>`).
3. **Toute nouvelle fonctionnalité suit le processus `/create-feat`** (skill **obligatoire**) : penser
   **micro-features** (petites unités livrables indépendamment ; plan mode privilégié
   pour l'orchestration/le découpage) puis, pour chaque micro-feature : **issue** →
   **branche `feature/<nom>` dérivée de `dev`** → **worktree dédié** → **subagent dédié**
   qui implémente dans ce worktree et ouvre la PR vers `dev`. Ce processus s'applique
   **aussi hors plan mode**, sans exception.
4. **Toute issue passe par `/create-issue`** (skill **obligatoire**), quel que soit
   son type (`bug`, `feature`, `documentation`, `autre`) : le **template d'issue
   commun** du dépôt (`.github/ISSUE_TEMPLATE/issue.md` ou
   `.gitlab/issue_templates/issue.md`) est rempli intégralement, titre au format
   `<type>: <résumé court>`, **jamais d'emoji** — pas d'issue en texte libre.
5. **Fusion d'une PR — la nuance `dev` vs `main`.**
   - **Vers `dev`** : dès que **tous les checks CI sont au vert**, la fusion est **autorisée en auto-merge** — l'assistant **peut fusionner lui-même** la PR.
   - **Vers `main`** (mise en production) : passe **obligatoirement** par le skill `/merge-prod` — PR ouverte et remplie par l'assistant après vérification de la CI de `dev`, mais **l'assistant n'a PAS le droit de la fusionner** — seule une **validation humaine** (Jérôme MARICHEZ) peut merger dans `main`.
6. **Hotfix** : `hotfix/<nom>` depuis `main`, fusionné dans `main` **et** `dev`.
7. **`main` est une branche protégée** : push direct interdit, PR obligatoire, checks CI au vert, revue approuvée. Détails : [`docs/git-workflow.md`](./docs/git-workflow.md).
8. **Intégrité des contrôles — aucun truquage.** L'assistant ne doit **jamais** modifier, désactiver, supprimer, ignorer (`skip`/`xfail`) ou affaiblir un **test**, une **assertion**, ni un **fichier de configuration CI/CD** (workflows, seuils de couverture, linters, limite de lignes…) dans le but de faire passer artificiellement la CI ou de masquer une régression. Les checks passent au vert **par une correction réelle du code**. Une évolution légitime d'un test reste possible, mais doit être **justifiée et documentée** dans la PR.
9. **Pipeline verte avant toute publication.** Aucun `git push` vers `main`/`dev`, aucune fusion de PR, aucun tag, aucune release, aucun `npm publish` tant que la pipeline du **commit courant** n'est pas **verte** — le hook `check-ci-before-publish.sh` interroge GitHub Actions (ou GitLab CI) et refuse une pipeline rouge **ou en cours**. Les contournements (`--no-verify`, `[skip ci]`, `gh pr merge --admin`, `gh run cancel`, `continue-on-error: true`, `allow_failure: true`, `|| true` sur un test) sont refusés sans condition. Détails : [`docs/ci-cd.md`](./docs/ci-cd.md).
10. **Pas d'auto-modification des règles.** L'assistant ne modifie **jamais** ce `CLAUDE.md`, un skill, un hook ou toute règle du projet **pour contourner** les consignes. Toute évolution de ces règles se fait à la demande explicite de Jérôme MARICHEZ.
11. **CI en échec — corriger puis escalader.** L'assistant retente 2 à 3 fois en corrigeant réellement, puis **signale à Jérôme MARICHEZ** avec un diagnostic clair si le blocage persiste.

## Politique de tests

Référence complète : [`docs/testing.md`](./docs/testing.md). Convention d'emplacement
**imposée** (un hook bloque toute création hors convention) :

| Niveau | Emplacement | Nommage | Outil |
|--------|-------------|---------|-------|
| unitaire | `tests/unitaire/` | `*.spec.ts(x)` | Jest + React Testing Library |
| intégration | `tests/integration/` | `*.integration.spec.ts(x)` | Jest + RTL (vraie frontière HTTP pilotée par fixtures) |
| e2e | `tests/e2e/` | `*.cy.ts` | Cypress |
| système | `tests/systeme/` | `*.test.ts` | Jest + vrai serveur HTTP (`listen(0)`) + `fetch` ; collection **Postman** rejouable |

**Acceptation / UAT** : `tests/acceptance/` (+ `uat/{disponibilite,securite,performance,robustesse}/`),
nommage `*.test.js|ts`, runner Node natif (`make test-acceptance`).

La **qualité** des tests unitaires/intégration est mesurée par **Stryker**
(mutation testing, `make test-mutation`) — ne jamais abaisser ses seuils.

Règles :

- **Le test précède le code.** Avant d'écrire une ligne d'implémentation, le
  comportement attendu est couvert par un test — **au moins l'un des trois niveaux**
  (unitaire, intégration, système) selon ce que le comportement exige ; l'unitaire est
  le minimum dès qu'il y a de la logique. Le hook `require-test-first.sh` demande
  confirmation dès qu'un fichier source qu'aucun test ne couvre est écrit.
- **Le test est écrit par Jérôme MARICHEZ, jamais par l'assistant.** L'assistant expose
  dans le chat l'**intention** du test (comportement attendu, cas limites, niveau
  visé, jeu de données utilisé) et le contenu qu'il propose ; Jérôme MARICHEZ pose le
  fichier. Le hook refuse toute écriture d'un fichier de test par l'assistant.
  Délégation ponctuelle possible par Jérôme MARICHEZ (`TESTS_WRITABLE_BY_ASSISTANT=1` dans
  l'environnement de la session) — et même alors, le test doit porter en tête un bloc
  **`Intention : …`**. Les **jeux de données** ne sont pas des tests : l'assistant
  peut les préparer.
- **Le code s'adapte au test, jamais l'inverse.** Faire passer un test ne justifie
  **jamais** d'en modifier l'intention (assertions affaiblies, cas supprimé, `skip`).
  Si un test paraît faux, le signaler à Jérôme MARICHEZ — ne pas le réécrire.
- **Intégration / e2e** : vérifier d'abord si un test pertinent existe ; sinon, si le
  composant le justifie (frontière API, accès base, auth ; parcours utilisateur critique
  pour e2e), **proposer** son intention à Jérôme MARICHEZ.
- **Pas de mocks — des jeux de données.** Aucune doublure de module (`jest.mock`,
  `vi.mock`, `__mocks__`, `sinon.stub`, `mockResolvedValue`…) : les vrais services
  collaborent entre eux et tournent sur des **jeux de données réalistes** versionnés
  dans `tests/fixtures/` (`<entite>.fixture.json`). Seules les **frontières** se
  pilotent : MSW pour le réseau, Supertest ou un vrai serveur (`listen(0)`) pour
  HTTP, une base de test dédiée pour la persistance ; `jest.fn()`/`jest.spyOn`
  restent permis pour **observer** un appel. Le hook `check-test-doubles.sh`
  applique la règle.
- Les tests **conditionnent la fusion** vers `dev`.

## Versionnage — Semantic Versioning

Le projet respecte **toujours** la convention **SemVer** (`MAJEUR.MINEUR.CORRECTIF`) :
version dans `package.json` (point de vérité), releases taguées `vX.Y.Z`, incrément
selon la nature du changement (rupture → majeur, fonctionnalité → mineur,
correctif → patch). La release est **automatique** : à chaque push sur `main`, la CI
lit la version de `package.json` et crée le tag `vX.Y.Z` + la release s'ils
n'existent pas encore. **Toute modification fusionnée sur `main` DOIT donc bumper la
version dans le même commit/PR**, sinon aucune release n'est publiée. Les
**dépendances** sont soumises à la même exigence par le hook `check-new-dependency.sh` :
un paquet dont la version ne respecte pas SemVer (ou dont l'information est
indisponible) est **refusé**.

## Qualité du code

- **Lint** : Biome (`make lint`) — la CI échoue si le lint échoue.
- **Limite de taille** : **aucun fichier source ne dépasse 300 lignes**
  (`scripts/check-max-lines.sh`, vérifié par hook local et par la CI).
  Si un fichier approche la limite : **extraire** (sous-composants, hooks, services),
  ne jamais contourner le contrôle.
- **TypeScript strict** : pas de `any` non justifié.
- **Nommage des fichiers** : **Majuscule (PascalCase)** uniquement pour les
  **composants React** (`Button.tsx`, `ProductCard.tsx`) et les **vues/pages** le cas
  échéant (`HomeView.tsx`) ; **tout le reste en minuscules** (`cart.service.ts`,
  `use-cart.ts`, `product.repository.ts`, `types.ts`).
- **Nommage des symboles** : **PascalCase** pour les **interfaces** (`IProduct`), les
  **composants `.tsx`** (`ProductCard`) et les **classes du dossier métier
  `services/`** (`CartService`) ; **camelCase** pour tout le reste (fonctions,
  variables, hooks `useCart`, instances).
- **Séparation métier / rendu (front)** : le front a **toujours** un dossier
  `services/` qui porte la **logique métier** (classes/fonctions pures, appels API,
  règles de gestion) ; les **hooks React** (`use-*.ts`) ne gèrent que la **logique de
  rendu** (état d'UI, abonnements, orchestration des services pour les composants) —
  jamais de règle métier dans un hook ou un composant.
- **`utils/`** : un dossier `src/utils/` regroupe **toujours**
  les **utilitaires** transverses (formatage, helpers purs, sans état ni métier).
- **Interfaces et types** : toutes les **interfaces d'entités** vivent dans le dossier
  `src/interfaces/` (un fichier par entité) et leur nom **commence toujours par `I`**
  (`IProduct`, `IUser`…). Les **alias de types purs** (unions, utilitaires) vont dans
  `src/interfaces/types.ts` — uniquement des `type`, jamais d'interface.
- **Validation des entrées — Zod (obligatoire)** : toute entrée externe (body/query
  d'API, formulaire, webhook, variables d'environnement) est validée par un schéma
  **Zod** avant usage. Les schémas vivent dans `schemas/` (un fichier par entité,
  `product.schema.ts` ; dans `shared/schemas/` si partagé front-back) et les types
  d'entrée sont **dérivés du schéma** (`z.infer`), jamais l'inverse. Aucun cast
  direct (`as`) d'une donnée externe.
- **Composant = un dossier** : chaque composant React vit dans son dossier PascalCase
  avec un `index.tsx` et ses styles/assets **colocalisés**
  (`components/Button/index.tsx` + `button.module.css`). Les composants sont **purs**
  par défaut ; ceux qui portent des effets (store, réseau, auth…) sont isolés dans un
  sous-dossier **`_notPure/`**.
- **`views/` vs `pages/`** : `pages/` (ou `app/`) ne fait **que le routage** ; les
  sections d'écran composées vivent dans `src/views/<domaine>/` et assemblent les
  composants.
- **Découpage par domaine** : quand l'app grandit, regrouper le code front par domaine
  métier sous `src/@<domaine>/` (ex. `@core` pour le socle applicatif, `@vitrine` pour
  le site public, `@shared` pour le transverse), chaque domaine portant ses propres
  `components/`, `hooks/`, `services/`, `utils/`, `interfaces/`.

## Politique de documentation

- Toute modification de code **impactante** met à jour le `README.md` et la doc `docs/`
  concernée (architecture, data-model, testing, ci-cd, docker, tooling…).
- Une nouvelle catégorie `docs/` créée doit être **liée** dans le `README.md` **et** ce `CLAUDE.md`.
- Docs disponibles : [architecture](./docs/architecture.md), [data-model](./docs/data-model.md),
  [testing](./docs/testing.md), [ci-cd](./docs/ci-cd.md), [git-workflow](./docs/git-workflow.md),
  [tooling](./docs/tooling.md), [model-routing](./docs/model-routing.md),
  [security](./docs/security.md),
  [accessibility](./docs/accessibility.md), [design](./docs/design.md),
  [frontend-practices](./docs/frontend-practices.md),
  [docker](./docs/docker.md),
  [storybook](./docs/storybook.md),
  [rgpd](./docs/rgpd.md), [ameliorations](./docs/ameliorations.md).

## Skills projet (`.claude/skills/`)

Trois skills **obligatoires** encadrent le cycle de vie :

| Skill | Usage |
|-------|-------|
| `/create-issue` | **Obligatoire** pour créer toute issue (`bug`, `feature`, `documentation`, `autre`) : template d'issue commun rempli intégralement, titre `<type>: <résumé>`, jamais d'emoji. |
| `/create-feat` | **Obligatoire** pour démarrer toute fonctionnalité : issue (via `/create-issue`) → branche depuis `dev` → worktree → subagent dédié → PR vers `dev`. |
| `/merge-prod` | **Obligatoire** pour toute mise en production : vérifier la CI de `dev`, ouvrir la PR `dev` → `main`, surveiller les checks — **sans jamais merger** (validation humaine). |

Ajouter ici les procédures récurrentes du projet (build, déploiement, fixes connus).

## Routage de modèles (subagents `.claude/agents/`)

Le hook `route-task.sh` (UserPromptSubmit) classifie chaque demande et **recommande**
un subagent adapté — voir [`docs/model-routing.md`](./docs/model-routing.md) :

| Subagent | Modèle / effort | Tâches |
|----------|-----------------|--------|
| `opus-architect` | Opus, effort xhigh | architecture, conception, migrations, sécurité, debugging profond |
| `opus-dev` | Opus, effort medium | features, refactoring, bugfix non trivial, tests |
| `opus-frontend` | Opus, effort medium | composants React, vues, styles, responsive, a11y, Storybook (projets avec UI) |
| `haiku-mechanic` | Haiku | doc, renommages, formatage, git, recherches simples |

Règles : **en cas de doute, router vers le haut** (jamais de perte de précision pour
économiser) ; un subagent qui découvre que la tâche le dépasse répond `ESCALATE: <raison>`
et le travail est re-délégué un cran au-dessus ; la recommandation du hook peut être
outrepassée si le contexte de session l'exige.

## Commandes

Interface unique : **Make** (voir `Makefile`).

```bash
make install        # dépendances
make dev            # démarrage local
make lint           # Biome + limite 300 lignes
make test           # tous les niveaux de tests
make docker-up      # stack conteneurisée
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
