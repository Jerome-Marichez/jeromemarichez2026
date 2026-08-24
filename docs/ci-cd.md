# CI/CD

## Principe

Deux familles de pipelines, alignées sur le [workflow Git](./git-workflow.md) :

| Déclencheur | Workflows | Objectif |
|-------------|-----------|----------|
| **PR → `dev`** | `ci-dev-lint`, `ci-dev-types`, `ci-dev-tests`, `ci-dev-a11y`, `ci-dev-nginx`, `ci-dev-docker` | Checks **rapides** : lint (Biome + limite 300 lignes), vérification des types, tests unitaires et intégration, contrôle d'accessibilité (axe), validation de la configuration nginx de production. |
| **PR → `main`** | `ci-main-e2e`, `ci-main-system`, `ci-main-build`, `ci-main-budgets` | Checks **complets** avant production : e2e navigateur, tests système, build, budgets Lighthouse + axe. |

## Jobs

- **lint** : `make lint`, Biome sur tout le dépôt + `scripts/check-max-lines.sh`
  (échec si un fichier source dépasse **300 lignes**).
- **type-check (dev)** : `make type-check` (`tsc --noEmit`), vérification des types
  **sans émission de fichiers**. Un type faux fait échouer la PR vers `dev`, là où il
  n'était auparavant détecté qu'au `make build` de `ci-main-build`, au moment de la mise
  en production. Le job est **séparé de `ci-dev-lint`** parce qu'il exécute `make install`
  au préalable : `tsc` a besoin des types de Next, React et Jest, quand `ci-dev-lint`
  tourne volontairement sans installation (Biome via `npx`). Le périmètre est celui de
  `tsconfig.json` : `cypress.config.ts` et `tests/e2e` restent **exclus**. Les types de
  Cypress y chargent le `expect()` de Chai, qui écrase celui de Jest ; Cypress
  type-vérifie ses propres specs.
- **tests (dev)** : unitaires + intégration, front et back.
- **e2e (main)** : `make test-e2e`, le harnais `scripts/e2e.mjs` construit l'export
  statique si `out/` manque, le sert sur `127.0.0.1:E2E_PORT` (4173 par défaut) avec les
  règles de résolution de `docker/nginx.conf`, **attend que le port réponde** (sonde
  HTTP, pas de `sleep`), lance Cypress headless, puis arrête le serveur, y compris en
  cas d'échec, sans processus orphelin. Le code de sortie du harnais est celui de
  Cypress : aucun échec n'est absorbé. Détail : [testing](./testing.md).
- **a11y (dev)** : `make budget-a11y`, axe-core sur l'accueil, une page de pôle et une
  page d'article ; une violation d'impact `critical` ou `serious` fait échouer la PR.
  Placé sur `dev` **parce qu'il est rapide** (~2 min) et qu'une régression
  d'accessibilité vient presque toujours d'un changement de balisage : elle se corrige
  cent fois moins cher le jour où elle est écrite. Ce contrôle ne vaut **pas** un audit
  RGAA : il couvre la part mécanisable de WCAG AA, voir
  [accessibility](./accessibility.md).
- **budgets (main)** : `make budgets`, soit axe **et** Lighthouse (plancher bloquant : 80 en
  performance depuis le 2026-08-24, 95 sur les trois autres catégories ; cible 95
  partout ; mobile émulé + réseau bridé, médiane de trois passes) sur les mêmes pages.
  Placé sur `main` **parce qu'il est lent** : trois passes par page, et la variance de
  Lighthouse impose la répétition. Le payer à chaque PR vers `dev` taxerait tout le monde
  pour une métrique qui bouge rarement d'un commit à l'autre ; le placer sur la PR de
  mise en production le met là où la question se pose : *est-ce que ce qu'on publie tient
  les chiffres qu'on vend ?* Un `workflow_dispatch` permet de le lancer à la demande
  depuis `dev` sans attendre la PR de production. Seuils et cibles :
  `scripts/budgets/pages.mjs`, source unique. Un score entre le plancher et la cible ne
  fait pas échouer le contrôle, il est listé nommément dans le rapport.
  Détail : [testing](./testing.md).
- **nginx (dev)** : `make nginx-check`, monte `docker/nginx.conf` là où le
  `Dockerfile` le copie et lance **`nginx -t`** dans l'image `nginx:1.29-alpine`. Placé
  sur `dev` **parce qu'il est rapide** : aucun build applicatif, un pull d'image et un
  test de syntaxe, ~10 s. Ce fichier décidait jusqu'ici du comportement de production
  sans qu'aucun contrôle ne le lise : une directive mal orthographiée passait toute la CI
  au vert et n'éclatait qu'au premier `docker compose up`. Un défaut qui ne se voit qu'en
  production coûte trop cher pour attendre la PR de mise en production. Détail :
  [docker](./docker.md).
- **docker (dev)** : `make docker-smoke`, **construit l'image**, rejoue `nginx -t`
  dedans, la démarre et vérifie les promesses de la configuration : `GET /` → 200, URL
  absente → 404, `Content-Encoding: gzip` sur le HTML, `Vary: Accept-Encoding`. Il ajoute
  la seule chose que `nginx -t` ne sait pas dire : que les directives **agissent**. Un
  `gzip_types` mal placé reste syntaxiquement valide, un `Content-Encoding` absent ne se
  discute pas. Placé sur `dev` **après mesure** : estimé à quatre minutes, il en prend
  **cinquante secondes**, moins que `ci-dev-a11y`. Le critère du dépôt est la durée ; à ce
  prix-là, faire attendre la PR de production n'a plus de justification. Un
  `workflow_dispatch` permet de le rejouer à la demande.
- **système (main)** : vrai serveur HTTP + client réel.
- **build (main)** : build de production (front et back), artefacts vérifiés.

## Publication : la pipeline fait foi

Le hook `.claude/hooks/check-ci-before-publish.sh` (PreToolUse) vérifie l'état
**réel** de la pipeline pour le **commit courant** avant toute commande publiante :
`git push` vers `main`/`master`/`dev`/`prod`, push de tags, `gh pr merge` /
`glab mr merge`, `npm|pnpm|yarn|bun publish`, `gh|glab release create`.

| État de la pipeline sur le commit | Décision |
|---|---|
| tout vert | la commande passe |
| rouge (`failure`, `timed_out`, `cancelled`) | **refus** : on corrige le **code** |
| en cours (`queued`, `in_progress`, `running`) | **refus** : attendre (`gh pr checks --watch`, `glab ci status`) |
| aucun run pour ce commit, CLI absente, réseau KO | **confirmation humaine** |

Le push d'une branche `feature/*` ou `hotfix/*` passe toujours : c'est lui qui
déclenche la pipeline.

**Contournements refusés sans condition** : `--no-verify`, `[skip ci]` /
`[ci skip]`, `-o ci.skip`, `gh pr merge --admin`, `gh workflow disable`,
`gh run cancel`, `glab ci cancel`, et toute tentative de désarmer un garde-fou
depuis une commande. Sur les fichiers de workflow, `continue-on-error: true`,
`allow_failure: true` et un `|| true` sur une commande de test sont refusés ;
`if: false` et `when: never` demandent confirmation.

`REQUIRE_GREEN_CI=0` dans l'environnement de la session (Jérôme MARICHEZ uniquement)
désactive la seule interrogation réseau, jamais les anti-contournements.

## Règles

- Un check rouge **bloque la fusion** (branches protégées) **et la publication**.
- Interdiction de modifier/affaiblir les workflows pour faire passer la CI
  (voir `CLAUDE.md`, règle d'intégrité) : le hook ci-dessus l'applique.

<!-- TODO : ajouter le déploiement (registry Docker, environnements) quand il existera. -->
