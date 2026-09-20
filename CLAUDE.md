# jeromemarichez-fr

## Le projet

Site CV de **Jérôme Marichez**, ingénieur logiciel à Lille. Il existe pour **décrocher un
poste**, et le succès se mesure à une chose : le recruteur qui arrive accorde l'entretien.

**Positionnement, l'intitulé LinkedIn fait foi : Ingénieur Full Stack | IA | QA |
Data-Driven.** Dix ans d'expérience, toujours en petite équipe ou en autonomie complète.

Quatre axes, **une seule pratique**. Ce ne sont pas quatre métiers juxtaposés : ils
tiennent ensemble parce que les équipes où Jérôme a travaillé n'avaient ni QA, ni ops, ni
équipe data. Ce qui manquait, il l'a construit. Aucun contenu ne doit leur donner un ordre
ni une hiérarchie.

**L'encadrement se raconte dans les expériences, jamais dans le titre** : alternants et
stagiaires développeurs, prestataires recrutés et mesurés, équipes marketing et SEO-SEA,
équipe de 5 à 10 personnes, budgets justifiés en comité de direction.

Le lecteur lit en deux temps, et les deux se servent : **trente secondes de jaugeage**
(niveau, stack, séniorité, lieu), puis la **lecture détaillée** et le CV en PDF. **Le site
est la démonstration de ce qu'il raconte** : un défaut de performance ou d'accessibilité y
contredit directement ce que la page affirme.

Vérité produit complète dans [`PRODUCT.md`](./PRODUCT.md), contenu dans
[`README.md`](./README.md). Ce fichier-ci porte les règles.

**Stack** : TypeScript strict, Next.js 16 en App Router, export statique, CSS Modules,
**Zod** pour toute entrée externe.

**Contraintes non négociables** : rendu statique et métadonnées par page, budgets
Lighthouse bloquants (**performance 80**, plancher arbitré le 2026-08-24, issue #146 ;
**accessibilité, bonnes pratiques et SEO 95**), RGAA et WCAG AA testés, aucun cookie et
aucune mesure d'audience. Valeurs exécutables dans `scripts/budgets/pages.mjs`, elles ne
se recopient nulle part.

> Projet géré par Jérôme MARICHEZ.

## Règles de véracité du contenu (bloquantes)

Le site engage une réputation professionnelle et sera lu par des recruteurs. **Aucune
formulation ne dépasse ce qui est réellement établi**, même quand une formule plus large
serait plus vendeuse. Ces règles priment sur toute considération marketing.

| Interdit | Formulation juste |
|----------|-------------------|
| ISTQB **Avancé**, Automatisation de test | **ISTQB Foundation** uniquement |
| management, lead ou mentorat de **développeurs** | Encadrement d'**alternants et stagiaires développeurs, de prestataires, d'équipes marketing et SEO-SEA**. Titre réel : « Lead tech » sur Sms En Masse |
| « en collaboration avec l'Universitat de Barcelona » | Méthode **publiée sur arXiv**, qu'il a **implémentée lui-même** puis industrialisée |
| LangChain, LlamaIndex, tout **framework** RAG | Le **RAG comme technique** : recherche vectorielle PostgreSQL et API, fait **maison** |
| AppsFlyer, Adjust, Amplitude, Tealium, Adobe | Mobile : **Firebase Analytics et Crashlytics** seuls. Web : GTM web et server-side, Measurement Protocol, GA, Matomo, CMP |
| Meta Ads, LinkedIn Ads | Google Ads, Bing Ads, SEO / SEA / SMA |
| GraphQL, NestJS, Prisma, Gherkin, Cucumber, PyTorch | Voir la stack revendiquée dans le `README.md` |
| cluster **Kubernetes** administré en propre | Cloud Run, Compute Engine **auto-scalées**, cloud functions, Pub/Sub, Vertex AI. L'absence de K8s se dit, c'est un argument de lucidité |
| GTM attribué à **Verhoeven Joaillier** | GTM appartient à **Acetelecom**. Chez Verhoeven : Google Analytics, A/B testing, heatmaps |
| **Truffle Capital** présenté comme employeur | **Client, en mission indépendante** (2017-2019). Le risque commercial et financier était le sien |

**Vigilance supplémentaire**

- **Prézage** et **Llama 3** peuvent être **nommés** (autorisation de Jérôme, 2026-08-07).
  Restent couverts par le NDA : le contenu du corpus, les données, les chiffres du projet.
- Les **intitulés de poste historiques** sont repris **à l'identique des CV**, sans
  réécriture pour coller à une offre.
- **Aucune date sur les certifications ni sur les diplômes** (arbitrage de Jérôme
  MARICHEZ, 2026-09-20) : l'**ordre de déclaration** fait le classement. Le champ `annee` a
  été retiré des interfaces plutôt que laissé inutilisé.
- Une certification ne porte de lien que si son **justificatif** a été fourni. Aucune URL
  ne s'invente ni ne s'approxime ; un lien mort est pire que pas de lien.
- **Aucun témoignage, aucun tarif, aucune disponibilité**, aucun client non cité dans les
  CV.
- Les **CV de référence** vivent dans `/Users/nicolasb/Documents/CV/MES CV/` (six versions
  ciblées, la plus complète est *Ingénieur Fullstack & Chef de Projet*). En cas de doute sur
  un chiffre, une date ou un périmètre, **ce sont eux qui font foi**, pas la mémoire de
  l'assistant.

## Ligne éditoriale

- **Chaque affirmation porte sa preuve** : un chiffre, une durée, une contrainte tenue. Les
  preuves disponibles sont listées dans le `README.md`. Une affirmation sans preuve se
  reformule ou se supprime.
- **Ton** : sobre, direct, à la première personne. Pas de superlatif, pas de jargon
  d'agence, **aucun emoji** dans le contenu publié.
- **Jamais de tiret cadratin dans un texte destiné à être lu.** Ce caractère signe une
  écriture de machine. La règle couvre `src/contenu/`, `docs/`, le `README.md`, ce fichier,
  et **tout texte lu ailleurs dans `src/`** : métadonnée SEO, libellé, chaîne rendue,
  message, et tout attribut lu par une synthèse vocale (`aria-*`, `alt`, `title`). Un texte
  lu par un lecteur d'écran est un texte destiné à être lu. Le tri se fait **ligne par
  ligne**, jamais dossier par dossier (issue #153).
  Les **commentaires de code en sont exclus**.
  Ce n'est **pas une substitution de caractère** : le tiret y sert de ponctuation, donc la
  phrase se **reformule** (virgule, deux-points, parenthèses, ou deux phrases). Un `sed`
  global est proscrit, il produirait des phrases fausses.
  **Une exception constatée et non corrigeable** : le bloc `nextjs-agent-rules` en bas de
  ce fichier. Il est réécrit à l'identique par
  `node_modules/next/dist/server/lib/generate-agent-files.js` à chaque `next dev`.
  Reformulé deux fois, il est revenu deux fois. Inutile d'y revenir.
  *(Règle demandée par Jérôme MARICHEZ, 2026-08-23 ; périmètre étendu et exception
  constatée le 2026-08-24.)*
- **Tout texte destiné à être lu passe par un second agent avant la PR** : contenu,
  articles, `README.md`, `docs/`. Le code et les commentaires n'y passent pas. Ce second
  agent **n'a pas le contexte de rédaction**, et c'est ce qui fait la seconde vue : un agent
  qui a écrit un texte a déjà accepté ses propres choix. Il vérifie quatre points, dans cet
  ordre :
  1. **La fidélité à la source** quand le texte adapte un écrit de Jérôme MARICHEZ. On le
     **porte**, on ne le réécrit pas : son titre, son plan et ses formulations restent les
     siens. Corriger l'orthographe est un devoir, **changer l'angle est une faute**
     (issue #121).
  2. La **table des interdits** ci-dessus.
  3. La **ligne éditoriale** : ton, preuve, absence d'emoji.
  4. L'**absence de tiret cadratin**.

  Il propose une réécriture ; le premier agent l'intègre ou motive son refus dans la PR.
  *(Règle demandée par Jérôme MARICHEZ, 2026-08-23.)*
- **Le développement en IA augmentée** (Claude Code, Gemini : agents, hooks, skills, loop,
  serveurs MCP) **piloté par les tests** est le différenciateur revendiqué : il apparaît
  partout où le site parle de programmation, jamais comme un détail d'outillage.

## Méthode de travail (workflow Git)

Deux branches permanentes : **`main`** en production (stable, déployable) et **`dev`** en
intégration.

1. **Jamais de commit direct sur `main`.** Elle ne reçoit que des fusions depuis `dev` ou un
   hotfix validé.
2. **Jamais de commit direct sur `dev`.** Elle ne reçoit que des fusions depuis des branches
   `feature/<nom>`. Un hook (`check-branch-sync.sh`) refuse d'éditer un fichier quand `dev`
   local est en retard sur `origin/dev`.
3. **Toute fonctionnalité passe par `/create-feat`** (skill **obligatoire**) : penser
   **micro-features** (petites unités livrables indépendamment), puis pour chacune
   **issue**, **branche `feature/<nom>` depuis `dev`**, **worktree**, **subagent dédié** qui
   implémente et ouvre la PR vers `dev`. Sans exception, plan mode ou non.
4. **Toute issue passe par `/create-issue`** (skill **obligatoire**), quel que soit son
   type : template commun rempli intégralement, titre `<type>: <résumé court>`, **jamais
   d'emoji**. Pas d'issue en texte libre.
5. **Fusion, la nuance `dev` et `main`.** Vers **`dev`** : dès que **tous les checks CI sont
   verts**, l'assistant **peut fusionner lui-même**. Vers **`main`** : passe
   **obligatoirement** par `/merge-prod`, et **l'assistant n'a PAS le droit de fusionner**.
   Seule une **validation humaine** (Jérôme MARICHEZ) merge dans `main`.
6. **Hotfix** : `hotfix/<nom>` depuis `main`, fusionné dans `main` **et** `dev`.
7. **`main` est protégée** : push direct interdit, PR obligatoire, checks verts, revue
   approuvée. GitHub refuse un force-push, y compris à l'assistant. Détails :
   [`docs/git-workflow.md`](./docs/git-workflow.md).
8. **Intégrité des contrôles : aucun truquage.** L'assistant ne doit **jamais** modifier,
   désactiver, supprimer, ignorer (`skip`, `xfail`) ou affaiblir un **test**, une
   **assertion**, un **seuil** ni un **fichier de CI/CD** pour faire passer artificiellement
   la CI ou masquer une régression. Les checks passent au vert **par une correction réelle du
   code**. Une évolution légitime reste possible, mais doit être **justifiée et documentée**
   dans la PR.
9. **Pipeline verte avant toute publication.** Aucun push vers `main` ou `dev`, aucune
   fusion, aucun tag, aucune release tant que la pipeline du **commit courant** n'est pas
   **verte**. Le hook `check-ci-before-publish.sh` refuse une pipeline rouge **ou en cours**.
   Contournements refusés sans condition : `--no-verify`, une directive de saut de CI dans un
   message de commit, `gh pr merge --admin`, `gh run cancel`, `continue-on-error: true`,
   `|| true` sur un test. Détails : [`docs/ci-cd.md`](./docs/ci-cd.md).
10. **Pas d'auto-modification des règles.** L'assistant ne modifie **jamais** ce fichier, un
    skill, un hook ou une règle du projet **pour contourner** une consigne. Toute évolution
    se fait à la demande explicite de Jérôme MARICHEZ.
11. **CI en échec : corriger puis escalader.** Deux ou trois tentatives avec correction
    réelle, puis **signaler à Jérôme MARICHEZ** avec un diagnostic clair.

## Politique de tests

Référence : [`docs/testing.md`](./docs/testing.md). Emplacements **imposés**, un hook bloque
toute création hors convention :

| Niveau | Emplacement | Nommage | Outil |
|--------|-------------|---------|-------|
| unitaire | `tests/unitaire/` | `*.spec.ts(x)` | Jest + RTL |
| intégration | `tests/integration/` | `*.integration.spec.ts(x)` | Jest + RTL, vraie frontière HTTP |
| e2e | `tests/e2e/` | `*.cy.ts` | Cypress |
| système | `tests/systeme/` | `*.test.ts` | Jest + vrai serveur (`listen(0)`) ; collection Postman |

**Acceptation et UAT** : `tests/acceptance/` et
`uat/{disponibilite,securite,performance,robustesse}/`, runner Node natif
(`make test-acceptance`). La **qualité** des tests unitaires et d'intégration est mesurée
par **Stryker** (`make test-mutation`) ; ne jamais abaisser ses seuils.

- **Le test précède le code.** Le comportement attendu est couvert avant toute
  implémentation, **au moins à l'un des trois niveaux** (unitaire, intégration, système) ;
  l'unitaire est le minimum dès qu'il y a de la logique. Le hook `require-test-first.sh`
  demande confirmation dès qu'un fichier source non couvert est écrit.
- **Le test est écrit par Jérôme MARICHEZ, jamais par l'assistant.** L'assistant expose dans
  le chat l'**intention** (comportement attendu, cas limites, niveau visé, jeu de données) et
  le contenu proposé ; Jérôme pose le fichier. Le hook refuse toute écriture d'un test par
  l'assistant. **Délégation ponctuelle possible** (`TESTS_WRITABLE_BY_ASSISTANT=1`, ou
  autorisation donnée en session) ; le test porte alors en tête un bloc **`Intention : …`**
  et la délégation y est **écrite plutôt que taire**. Les **jeux de données ne sont pas des
  tests** : l'assistant peut les préparer.
- **Le code s'adapte au test, jamais l'inverse.** Faire passer un test ne justifie jamais
  d'en modifier l'intention. Si un test paraît faux, le **signaler**, ne pas le réécrire.
- **Pas de mocks, des jeux de données.** Aucune doublure de module (`jest.mock`,
  `__mocks__`, `mockResolvedValue`…) : les vrais services collaborent sur des jeux de données
  versionnés dans `tests/fixtures/` (`<entite>.fixture.json`). Seules les **frontières** se
  pilotent : MSW pour le réseau, un vrai serveur pour HTTP, une base dédiée pour la
  persistance. `jest.fn()` et `jest.spyOn` restent permis pour **observer**. Le hook
  `check-test-doubles.sh` applique la règle.
- Les tests **conditionnent la fusion** vers `dev`.

## Qualité du code

- **Lint** : Biome (`make lint`). La CI échoue si le lint échoue.
- **Aucun fichier source au delà de 300 lignes** (`scripts/check-max-lines.sh`, hook local et
  CI). Si un fichier approche : **extraire** (sous-composants, hooks, services), jamais
  contourner. `.claude/skills/` est exclu du contrôle depuis le 2026-09-20 (code tiers
  vendué, même nature que `node_modules`) ; aucun fichier du projet n'y échappe.
- **TypeScript strict** : pas de `any` non justifié.
- **Nommage des fichiers** : **PascalCase** pour les **composants React** et les **vues** ;
  **tout le reste en minuscules** (`cart.service.ts`, `use-cart.ts`, `types.ts`).
- **Nommage des symboles** : **PascalCase** pour les **interfaces** (`IProduct`), les
  **composants** et les **classes de `services/`** ; **camelCase** pour tout le reste.
- **Séparation métier et rendu** : `services/` porte la **logique métier** ; les **hooks
  React** (`use-*.ts`) ne gèrent que la **logique de rendu**. Jamais de règle métier dans un
  hook ou un composant.
- **`src/utils/`** regroupe les **utilitaires** transverses (formatage, helpers purs, sans
  état ni métier).
- **Interfaces et types** : les **interfaces d'entités** vivent dans `src/interfaces/`, un
  fichier par entité, nom **préfixé `I`**. Les **alias de types purs** vont dans
  `src/interfaces/types.ts` : uniquement des `type`, jamais d'interface.
- **Validation Zod obligatoire** : toute entrée externe (body, query, formulaire, webhook,
  variable d'environnement) est validée par un schéma **Zod** avant usage. Les schémas vivent
  dans `schemas/`, un fichier par entité, et les types sont **dérivés du schéma** (`z.infer`).
  Aucun cast direct (`as`) d'une donnée externe. Le site actuel n'a **aucune** entrée
  externe : le jour où il en a une, elle passe par là.
- **Composant = un dossier** PascalCase avec `index.tsx` et ses styles colocalisés
  (`components/Bouton/index.tsx` plus `bouton.module.css`). **Aucune séparation entre
  composants purs et composants à effets** : la règle `_notPure/` est **retirée**, elle
  n'avait jamais été appliquée et n'ajoutait qu'un niveau de dossier. *(Retirée à la demande
  de Jérôme MARICHEZ, 2026-08-24, issue #143.)*
- **`views/` et `app/`** : `src/app/` est le système de pages de Next.js et ne fait **que le
  routage** ; les sections d'écran composées vivent dans `src/views/`.
- **Pas de découpage par domaine.** Le front vit **directement sous `src/`** : `app/`,
  `components/`, `views/`, `contenu/`, `interfaces/`, `seo/`, `utils/`. Deux domaines pour une
  vitrine de six écrans ajoutaient un niveau de chemin sans rien trancher. *(Retiré à la
  demande de Jérôme MARICHEZ, 2026-08-24, issue #143.)*

## Versionnage : SemVer

Convention **SemVer** (`MAJEUR.MINEUR.CORRECTIF`), version dans `package.json` (point de
vérité), releases taguées `vX.Y.Z`. La release est **automatique** : à chaque push sur
`main`, la CI lit la version et crée le tag et la release. **Toute modification fusionnée sur
`main` DOIT donc bumper la version dans la même PR**, sinon rien n'est publié. Les
**dépendances** sont soumises à la même exigence (`check-new-dependency.sh`) : un paquet dont
la version ne respecte pas SemVer est **refusé**.

## Documentation

Toute modification **impactante** met à jour le `README.md` et la page `docs/` concernée. Une
nouvelle catégorie `docs/` est **liée** dans le `README.md` et ici.

[architecture](./docs/architecture.md) · [data-model](./docs/data-model.md) · [design](./docs/design.md) · [frontend-practices](./docs/frontend-practices.md) · [accessibility](./docs/accessibility.md) · [testing](./docs/testing.md) · [ci-cd](./docs/ci-cd.md) · [git-workflow](./docs/git-workflow.md) · [docker](./docs/docker.md) · [storybook](./docs/storybook.md) · [tooling](./docs/tooling.md) · [model-routing](./docs/model-routing.md) · [security](./docs/security.md) · [rgpd](./docs/rgpd.md) · [ameliorations](./docs/ameliorations.md)

## Skills projet

| Skill | Usage |
|-------|-------|
| `/create-issue` | **Obligatoire** pour toute issue : template rempli, titre `<type>: <résumé>`, jamais d'emoji |
| `/create-feat` | **Obligatoire** pour démarrer toute fonctionnalité : issue, branche depuis `dev`, worktree, subagent, PR vers `dev` |
| `/merge-prod` | **Obligatoire** pour toute mise en production : vérifier la CI de `dev`, ouvrir la PR `dev` vers `main`, **sans jamais merger** |

Deux skills de design sont installés et font foi sur l'interface : **`impeccable`** (le
contrat de direction vit dans `.impeccable/surfaces/`) et **`web-animation-design`**.

## Routage de modèles

Le hook `route-task.sh` classifie chaque demande et **recommande** un subagent (voir
[`docs/model-routing.md`](./docs/model-routing.md)) : `opus-architect` (architecture,
migrations, sécurité, debugging profond), `opus-dev` (features, refactoring, bugfix),
`opus-frontend` (composants, vues, styles, a11y, Storybook), `haiku-mechanic` (doc,
renommages, git, recherches).

**En cas de doute, router vers le haut.** Un subagent qui découvre que la tâche le dépasse
répond `ESCALATE: <raison>` et le travail est re-délégué un cran au-dessus. La recommandation
peut être outrepassée si le contexte l'exige.

## Commandes

```bash
make install        # dépendances
make dev            # démarrage local
make lint           # Biome + limite 300 lignes
make test           # tous les niveaux
make budgets        # Lighthouse + axe-core
make storybook      # catalogue de composants
make docker-up      # stack conteneurisée
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
