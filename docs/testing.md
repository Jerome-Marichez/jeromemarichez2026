# Stratégie de tests

Les tests **conditionnent la fusion** d'une PR vers `dev` (voir le
[workflow Git](./git-workflow.md)) : tant qu'un niveau échoue, la PR n'est pas fusionnée.

## Niveaux de tests

| Niveau | Côté | Objet | Outil | Emplacement / nommage |
|--------|------|-------|-------|-----------------------|
| **unitaire** | front | composants, hooks, logique pure | **Jest + React Testing Library** | `front/tests/unitaire/**/*.spec.ts(x)` |
| **intégration** | front | plusieurs unités ensemble (composant ↔ service ↔ vraie frontière HTTP pilotée par fixtures) | **Jest + RTL** (+ MSW à la frontière réseau) | `front/tests/integration/**/*.integration.spec.ts(x)` |
| **e2e** | front | parcours **navigateur** contre l'app réelle (front + back) | **Cypress** | `front/tests/e2e/**/*.cy.ts` |
| **unitaire** | back | services, validation, logique métier pure | **Jest** | `back/tests/unitaire/**/*.test.ts` |
| **intégration** | back | routes → services → repositories → **base de test dédiée** | **Jest + Supertest** | `back/tests/integration/**/*.test.ts` |
| **système** | back | **vrai serveur HTTP** (`app.listen(0)`, port éphémère) appelé par un client réel (`fetch`) — bout en bout **sans navigateur** | **Jest + fetch** | `back/tests/systeme/**/*.test.ts` |
| **système API (rejouable)** | back | validation documentée de l'API de bout en bout | **Postman** (collection versionnée) | `back/tests/systeme/postman_collection.json` |

**Acceptation / non-fonctionnel** : parcours métier de bout en bout **et** volets
**UAT** (disponibilité, sécurité, performance, robustesse) sur la stack réellement
lancée — runner Node natif (`node:test` + `fetch`), dans `tests/acceptance/` et
`tests/acceptance/uat/<catégorie>/`.

## Environnement de test front — jsdom, TSX et modules CSS

Les tests front des niveaux **unitaire** et **intégration** rendent de vrais composants
React avec React Testing Library : ils ont besoin d'un DOM et tournent donc en
environnement **`jsdom`** (`front/jest.config.mjs`). Le **back reste en environnement
`node`** — sa configuration (`back/jest.config.mjs`) est indépendante et inchangée.

La compilation du TypeScript/JSX et la résolution des imports non-JS sont déléguées à
**`next/jest`**, livré avec Next.js — **aucune dépendance supplémentaire** :

| Ce qu'importe le composant | Ce que voit le test |
|---|---|
| `.ts` / `.tsx` | compilé par **SWC**, le compilateur du build Next, avec les alias de `tsconfig.json` (`@/…`) |
| `styles from './card.module.css'` | un **proxy d'objet** : `styles.card` vaut la chaîne `'card'` — la classe appliquée reste donc assertable |
| CSS global, images, `next/font`, `server-only` | neutralisés : ce ne sont pas des comportements observables en Jest |

Cette résolution vient **de la configuration**, jamais d'une doublure écrite à la main :
le dépôt ne contient ni `jest.mock`, ni dossier `__mocks__`, ni fichier de doublure. Un
module CSS est un **actif de style**, pas un module métier — la règle « pas de mocks »
ci-dessous porte sur la **logique métier**, qui n'est jamais remplacée.

**Contrepartie assumée** : SWC transpile **sans vérifier les types**. Un test front peut
donc être **vert avec une erreur de types** — c'est vérifié, pas supposé : une erreur de
types inoffensive à l'exécution laisse `npx jest` afficher `2 passed` là où `tsc` échoue
sur le même fichier.

Le type-checking est donc porté par une cible dédiée, **`make typecheck`**
(`tsc --noEmit`, front + back, `tests/**` inclus), exécutée par le workflow
`ci-dev-lint` **avant toute fusion dans `dev`**. Elle ne remplace pas les tests : les
tests vérifient le **comportement**, `tsc` vérifie la **cohérence des types**. Voir
[`tooling.md`](./tooling.md) et [`ci-cd.md`](./ci-cd.md).

Côté back, `ts-jest` remonte déjà les diagnostics de types à l'exécution des tests, mais
seulement pour les fichiers **atteints par un test** : `make typecheck` couvre le reste.

## Cycle : le test d'abord, écrit par le développeur

L'ordre n'est pas négociable — il est appliqué par le hook
`.claude/hooks/require-test-first.sh` (PreToolUse) :

1. **Intention.** Le comportement attendu est formulé explicitement : ce qui doit se
   passer, les cas limites, le niveau visé (**unitaire**, **intégration** ou
   **système** — au moins l'un des trois), le jeu de données utilisé. L'assistant
   propose cette intention et le contenu du test **dans le chat**.
2. **Le test est posé par Jérôme MARICHEZ.** L'assistant n'écrit pas les fichiers de test :
   le hook refuse toute écriture sur `*.spec.*`, `*.test.*`, `*.cy.ts` et sur les
   dossiers `tests/`. Les **jeux de données** échappent à cette règle (ce ne sont pas
   des tests) et restent à la charge de l'assistant.
3. **Le test échoue pour la bonne raison**, puis le code est écrit pour le faire
   passer. Écrire un fichier source qu'aucun test ne couvre déclenche une demande de
   confirmation.
4. **L'intention n'est jamais modifiée pour arranger le code** : pas d'assertion
   retirée, pas de cas supprimé, pas de `skip`. Un test qui semble faux se signale,
   il ne se réécrit pas.

**Délégation ponctuelle** : Jérôme MARICHEZ peut confier l'écriture des tests à l'assistant
en posant `TESTS_WRITABLE_BY_ASSISTANT=1` dans l'environnement de la session. Le hook
exige alors que chaque test porte en tête un bloc d'intention :

```ts
/**
 * Intention (validée par Jérôme MARICHEZ) :
 * un panier vide facture 0 EUR, frais de port inclus.
 * Cas limites : quantité nulle, remise supérieure au total.
 */
describe('CartService.total', () => { /* … */ });
```

Le garde-fou complet se désarme par `REQUIRE_TEST_FIRST=0` — décision de Jérôme MARICHEZ,
jamais de l'assistant.

## Jeux de données — jamais de mocks

Un test qui remplace la logique métier par une doublure ne prouve rien. Ici, les
**vrais services collaborent entre eux** et tournent sur des **jeux de données
réalistes**, versionnés :

| | Emplacement | Nommage |
|---|---|---|
| Jeux de données | `front/tests/fixtures/`, `back/tests/fixtures/` | `<entite>.fixture.json` |

**Interdit** (refusé par le hook `.claude/hooks/check-test-doubles.sh`) :
`jest.mock`, `vi.mock`, `jest.unstable_mockModule`, un dossier `__mocks__/`,
`sinon.stub` / `sinon.mock`, `mockResolvedValue` / `mockReturnValue` /
`mockImplementation`, `proxyquire`, ou un `moduleNameMapper` qui redirige un module
vers un mock.

**Autorisé, parce que ce sont des frontières et non des doublures de métier** :

- **MSW** (`setupServer`) à la frontière réseau — les réponses viennent des fixtures ;
- **Supertest** ou un **vrai serveur** (`listen(0)`) pour le niveau système ;
- une **base de test dédiée** (jamais celle de dev/prod), rechargée depuis les fixtures ;
- `jest.fn()` / `jest.spyOn` pour **observer** un appel (callback, événement) sans
  remplacer un module métier ;
- la **résolution des actifs non-JS** (modules CSS, images, polices) par `next/jest` —
  un mapper de configuration fourni par le framework, qui ne remplace **aucun module
  métier** (voir « Environnement de test front » ci-dessus).

Le hook se désarme par `ALLOW_TEST_DOUBLES=1` — décision de Jérôme MARICHEZ, à justifier.

## Qualité des tests — mutation testing (Stryker)

**Stryker** mesure la capacité des tests unitaires/intégration à détecter de vraies
régressions (score de mutation, seuils dans `stryker.config.json` — le build casse
sous le seuil `break`). Lancer : `make test-mutation`.

## Règles

- **Le test précède le code et il est écrit par Jérôme MARICHEZ** (voir la section
  « Cycle » ci-dessus) ; le code s'adapte au test, jamais l'inverse.
- **Pas de mocks des données métier** : les frontières (HTTP, base) sont pilotées avec
  des **jeux de données réalistes** ; les services métier réels collaborent entre eux.
- **Base de test dédiée** (intégration back) : jamais la base de développement/production ;
  base propre entre les suites ; garde-fou anti-prod dans le setup.
- **e2e réservé aux parcours navigateur** ; le bout-en-bout back sans navigateur est le
  niveau **système**.
- **Couverture** : seuil défini dans la config de test — la CI échoue en dessous.
  <!-- TODO : fixer le seuil (ex. 90 %). -->

## Commandes

```bash
make typecheck        # vérification des types (tsc --noEmit, front + back, tests inclus)
make test             # unitaires + intégration
make test-unit        # unitaires (Jest)
make test-int         # intégration (Jest)
make test-e2e         # Cypress headless
make test-system      # système (Jest + fetch ; collection Postman rejouable)
make test-mutation    # Stryker (score de mutation)
make test-acceptance  # acceptation / UAT
```
