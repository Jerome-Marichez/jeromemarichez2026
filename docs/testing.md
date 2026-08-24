# Stratégie de tests

Les tests **conditionnent la fusion** d'une PR vers `dev` (voir le
[workflow Git](./git-workflow.md)) : tant qu'un niveau échoue, la PR n'est pas fusionnée.

## Niveaux de tests

| Niveau | Objet | Outil | Emplacement / nommage |
|--------|-------|-------|-----------------------|
| **unitaire** | composants, hooks, logique pure | **Jest + React Testing Library** | `tests/unitaire/**/*.spec.ts(x)` |
| **intégration** | plusieurs unités ensemble (composant ↔ service ↔ vraie frontière HTTP pilotée par fixtures) | **Jest + RTL** (+ MSW à la frontière réseau) | `tests/integration/**/*.integration.spec.ts(x)` |
| **e2e** | parcours **navigateur** contre l'app réelle | **Cypress** | `tests/e2e/**/*.cy.ts` |
| **système** | **vrai serveur HTTP** (`listen(0)`, port éphémère) appelé par un client réel (`fetch`), bout en bout **sans navigateur** | **Jest + fetch** | `tests/systeme/**/*.test.ts` |
| **système API (rejouable)** | validation documentée de l'API de bout en bout | **Postman** (collection versionnée) | `tests/systeme/postman_collection.json` |

**Acceptation / non-fonctionnel** : parcours métier de bout en bout **et** volets
**UAT** (disponibilité, sécurité, performance, robustesse) sur la stack réellement
lancée : runner Node natif (`node:test` + `fetch`), dans `tests/acceptance/` et
`tests/acceptance/uat/<catégorie>/`.

## Cycle : le test d'abord, écrit par le développeur

L'ordre n'est pas négociable. Il est appliqué par le hook
`.claude/hooks/require-test-first.sh` (PreToolUse) :

1. **Intention.** Le comportement attendu est formulé explicitement : ce qui doit se
   passer, les cas limites, le niveau visé (**unitaire**, **intégration** ou
   **système** ; au moins l'un des trois), le jeu de données utilisé. L'assistant
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

Le garde-fou complet se désarme par `REQUIRE_TEST_FIRST=0`, décision de Jérôme MARICHEZ,
jamais de l'assistant.

## Jeux de données : jamais de mocks

Un test qui remplace la logique métier par une doublure ne prouve rien. Ici, les
**vrais services collaborent entre eux** et tournent sur des **jeux de données
réalistes**, versionnés :

| | Emplacement | Nommage |
|---|---|---|
| Jeux de données | `tests/fixtures/` | `<entite>.fixture.json` |

**Interdit** (refusé par le hook `.claude/hooks/check-test-doubles.sh`) :
`jest.mock`, `vi.mock`, `jest.unstable_mockModule`, un dossier `__mocks__/`,
`sinon.stub` / `sinon.mock`, `mockResolvedValue` / `mockReturnValue` /
`mockImplementation`, `proxyquire`, ou un `moduleNameMapper` qui redirige un module
vers un mock.

**Autorisé, parce que ce sont des frontières et non des doublures de métier** :

- **MSW** (`setupServer`) à la frontière réseau : les réponses viennent des fixtures ;
- **Supertest** ou un **vrai serveur** (`listen(0)`) pour le niveau système ;
- une **base de test dédiée** (jamais celle de dev/prod), rechargée depuis les fixtures ;
- `jest.fn()` / `jest.spyOn` pour **observer** un appel (callback, événement) sans
  remplacer un module métier.

Le hook se désarme par `ALLOW_TEST_DOUBLES=1`, décision de Jérôme MARICHEZ, à justifier.

## Qualité des tests : mutation testing (Stryker)

**Stryker** mesure la capacité des tests unitaires/intégration à détecter de vraies
régressions (score de mutation, seuils dans `stryker.config.json` : le build casse
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
- **Couverture** : seuil défini dans la config de test. La CI échoue en dessous.
  <!-- TODO : fixer le seuil (ex. 90 %). -->

## Harnais statique : l'export servi en local

Le site est en **export statique** (`output: 'export'`) : il n'y a ni back, ni route
API, ni serveur applicatif. La « stack » se réduit donc à **servir le dossier `out/`**.
`scripts/harnais-statique.mjs` porte cette mécanique **une seule fois**, pour les tests
e2e (`scripts/e2e.mjs`) comme pour les budgets (`scripts/budgets.mjs`) : deux harnais
concurrents finiraient par diverger sur le port, la sonde ou le nettoyage, et c'est
toujours le second qui laisse un serveur orphelin en CI.

`make test-e2e`, en local comme dans le workflow `ci-main-e2e` :

1. **build si nécessaire** : `npm run build` si `out/index.html` manque ;
2. **serveur statique** : `scripts/serve-out.mjs` sert `out/` sur `127.0.0.1:E2E_PORT`
   (**4173** par défaut), sans aucune dépendance : `node:http` suffit ;
3. **attente réelle** : le harnais sonde `GET /` jusqu'à obtenir une réponse HTTP
   (30 s max). Jamais de `sleep` arbitraire ;
4. **Cypress headless** : `npx cypress run` (les arguments passés à `scripts/e2e.mjs`
   lui sont transmis, ex. `--spec`) ;
5. **arrêt propre garanti** : le serveur est fermé dans un `finally` et sur
   `SIGINT`/`SIGTERM` : aucun processus orphelin, même quand les tests échouent. Le
   **code de sortie reste celui de Cypress** : aucun échec n'est absorbé.

`cypress.config.ts` dérive son `baseUrl` du même `E2E_PORT` : le port ne peut pas
diverger entre le serveur et le navigateur.

**Résolution des URL identique à la production.** `trailingSlash: true` fait sortir
chaque route en `<route>/index.html`. `serve-out.mjs` applique exactement les règles de
`docker/nginx.conf` (`try_files $uri $uri/ =404`, `index index.html`,
`error_page 404 /404.html`) : un dossier est servi par son `index.html`, un dossier sans
`index.html` et une URL inconnue renvoient **404** avec la page `404.html`. Un serveur
statique qui ignorerait cette règle ferait échouer les specs pour la mauvaise raison.
La traversée de répertoire hors de `out/` est refusée.

## Budgets exécutables : performance et accessibilité

Le `CLAUDE.md` pose deux contraintes produit non négociables : **Lighthouse à 95 visé sur
les quatre catégories** et **accessibilité WCAG AA**. Elles étaient écrites, elles ne sont
plus seulement écrites : `make budgets` échoue quand le site descend sous le plancher, et
dit **quelle page** sur **quelle catégorie**.

### Plancher, cible, et les trois états du rapport

Le **plancher bloquant** de la catégorie performance est à **80** depuis le 2026-08-24 :
« Pour le LCP j'autorise 80/100 mais pas moins » (décision de Jérôme MARICHEZ,
issue #146). Accessibilité, bonnes pratiques et SEO gardent un plancher à 95. La
**cible** reste 95 partout, y compris en performance.

Le plancher n'est donc pas la cible, et le rapport distingue trois états au lieu de deux :

| Marque | Ce qu'elle dit | Effet sur le budget |
|--------|----------------|---------------------|
| `✓` | le score atteint la cible | passe |
| `~` | le score passe le plancher, sous la cible | passe, et le rapport le liste nommément |
| `✗` | le score est sous le plancher | **échec**, rien ne se livre |

Les scores en `~` sont repris sous le tableau, page par page et catégorie par catégorie :
un tableau entièrement vert ne se relit pas, une ligne nommée si.

Les valeurs vivent dans `scripts/budgets/pages.mjs` (`SEUILS_LIGHTHOUSE`,
`CIBLES_LIGHTHOUSE`), source unique lue par la CI comme par la doc. La règle 8 du
`CLAUDE.md` reste entière : l'assistant n'abaisse jamais un seuil pour faire passer un
contrôle, aucun `|| true`, aucune catégorie exemptée, aucune page retirée de la mesure.
Une révision de plancher ne vient que de Jérôme MARICHEZ, et s'écrit datée et attribuée
dans le fichier qui la porte.

Ce ne sont pas des tests au sens des quatre niveaux ci-dessus : ils ne décrivent pas un
comportement attendu du code, ils mesurent une propriété du site rendu. Ils vivent donc
dans `scripts/budgets/`, pas dans `tests/`.

```bash
make budgets       # accessibilité + performance
make budget-a11y   # axe-core seul, rapide (~2 min)
make budget-perf   # Lighthouse seul, lent (3 passes x 3 pages)
```

Prérequis local, une fois : `npx puppeteer browsers install chrome`.

### Ce qui est mesuré, et pourquoi

**Trois pages, trois gabarits** (`scripts/budgets/pages.mjs`) : l'accueil (scène animée,
verre, le gabarit le plus lourd), une page de pôle (sections, preuves, palette dédiée)
et une page d'article (corps long, typographie, fil d'Ariane, JSON-LD). Mesurer le seul
accueil ne dit rien des deux autres, et c'est là que les régressions se logent.

**Profil de mesure : mobile émulé, réseau bridé « slow 4G », CPU ×4.** C'est le profil
par défaut de PageSpeed Insights, et le cas sur lequel un prospect jugera le site. Un
profil desktop sans bridage donnerait des scores flatteurs qui ne protègent de rien : sur
ce site, l'écart entre les deux profils est de **dix-sept points** (voir plus bas).

**Médiane de trois passes.** Lighthouse varie de quelques points d'une exécution à
l'autre. Un budget qui échoue au hasard une fois sur cinq se fait désactiver en une
semaine ; la médiane le rend crédible. `BUDGET_PASSES` permet de réduire le nombre de
passes en local pour itérer vite, jamais en CI.

**Un seul Chrome pour toute la campagne** : Lighthouse s'y connecte par le port de
débogage, axe par l'API puppeteer. Deux navigateurs mesureraient deux sites.

### Première exécution : 2026-08-22

Mesuré sur l'export de `dev` (commit `596aafd`), médiane de 3 passes, profil mobile.

| Page | Perf | A11y | Bonnes prat. | SEO |
|------|------|------|--------------|-----|
| accueil | **80** ✗ | 100 ✓ | 100 ✓ | 100 ✓ |
| pôle `ingenierie-web` | **81** ✗ | 100 ✓ | 100 ✓ | 100 ✓ |
| article | **82** ✗ | 100 ✓ | 100 ✓ | 100 ✓ |

axe-core : **0 violation** sur les trois pages, à tous les impacts.

**Le budget de performance n'est pas tenu.** Il n'a pas été abaissé pour autant : c'est
la page qu'on corrige, jamais le seuil (règle 8 du `CLAUDE.md`). Le diagnostic est
consigné dans [`ameliorations.md`](./ameliorations.md).

Pour situer : en profil **desktop** non bridé, les mêmes pages sortent à **99 / 100 / 100
/ 100**. Le site n'est donc pas lent dans l'absolu : il l'est sur un mobile en 4G
médiocre, ce qui est précisément le cas qui compte.

## Vérification des types

`make type-check` exécute `tsc --noEmit` : le compilateur vérifie tout le dépôt sans
écrire un seul fichier. Ce n'est pas un niveau de test : c'est le filet qui attrape ce
qu'aucun test ne voit (unions fermées, `satisfies`, signatures), mais il tourne au même
titre qu'eux, dans le job `ci-dev-types` de toute PR vers `dev`, et il **fait échouer la
PR**. `cypress.config.ts` et `tests/e2e` en sont exclus par `tsconfig.json` : leurs types
Cypress chargent le `expect()` de Chai, qui écrase celui de Jest et casserait la
compilation des tests unitaires. Cypress type-vérifie ses specs de son côté.

## Commandes

```bash
make type-check       # types TypeScript (tsc --noEmit), sans émission de fichiers
make test             # unitaires + intégration
make test-unit        # unitaires (Jest)
make test-int         # intégration (Jest)
make test-e2e         # build + export statique servi + Cypress headless + arrêt du serveur
make test-system      # système (Jest + fetch ; collection Postman rejouable)
make test-mutation    # Stryker (score de mutation)
make test-acceptance  # acceptation / UAT
make budgets          # budgets perf (Lighthouse) + accessibilité (axe) sur 3 gabarits
make budget-perf      # budget de performance seul
make budget-a11y      # budget d'accessibilité seul
```
