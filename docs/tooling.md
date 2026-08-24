# Outillage

## Make : interface de commandes unique

Toutes les opérations passent par `make` (voir `Makefile`) : agnostique, documenté
(`make help`), identique en local et en CI.

## Lint : Biome + limite 300 lignes

- **Biome** (`biome.json` à la racine) : lint + format TypeScript/React.
  Règles notables : `noExplicitAny` et **`noConsole`** en `error`. Pas de
  `console.*` dans le code applicatif : passer par le **service de log** du projet
  (voir [`frontend-practices.md`](./frontend-practices.md)) ; l'`override` de
  `biome.json` lève la règle pour les fichiers de log, config et scripts.
- **Version épinglée à l'exact : `2.5.7`.** Sans `^` ni `~`, et aux trois endroits qui
  invoquent l'outil : `package.json`, le `Makefile` et le workflow `ci-dev-lint.yml`.
  Deux raisons. D'abord, Biome durcit ses règles en mineure : la 2.5.7 a rendu
  `lint/performance/noImgElement` plus sévère, et une prochaine mineure peut transformer
  un avertissement en erreur sur un fichier que personne n'aura touché. Ensuite, la CI et
  le poste local doivent juger le code avec le même outil : un contrôle dont la définition
  change toute seule n'est plus un contrôle. La montée de version devient ainsi un acte
  volontaire, visible dans un diff, plutôt qu'un effet de bord de la résolution npm. Le
  champ `$schema` de `biome.json` suit la même version.
  *(Arbitrage de Jérôme MARICHEZ, issue #150, 2026-08-24.)*
- **Une règle qui a tort se lève à l'endroit exact**, avec sa raison écrite
  (`// biome-ignore <règle>: <raison>`), jamais dans `biome.json` pour tout le dépôt.
  Seul cas en vigueur : `noImgElement` sur `src/components/CertificationList/index.tsx`.
  Les logos de certification sont des SVG, et `/_next/image` les refuse tant que
  `dangerouslyAllowSVG` vaut `false`, ce qu'il doit rester pour des raisons de sécurité.
  La règle garde toute sa valeur partout ailleurs, elle n'est donc pas assouplie.
- **`scripts/check-max-lines.sh`** : échoue si un fichier source (`.ts`, `.tsx`,
  `.js`, `.jsx`) dépasse **300 lignes**. Exécuté par `make lint`, par la CI et par
  un hook Claude Code. Remède : extraire (sous-composants, hooks, services),
  jamais d'exclusion de fichier.

```bash
make lint
```

## Hooks Claude Code (`.claude/`)

| Hook | Événement | Rôle |
|------|-----------|------|
| `route-task.sh` | UserPromptSubmit | Classifie la demande (architecture / feature / mécanique) et recommande le subagent adapté (voir [`model-routing.md`](./model-routing.md)) ; plafonne les recommandations si le budget crédits est bas (`CREDITS_LIMIT_TOKENS`). |
| `require-test-first.sh` | PreToolUse (Write/Edit/MultiEdit) | Impose l'ordre : le test d'abord, écrit par Jérôme MARICHEZ. Refuse toute écriture d'un fichier de test par l'assistant (délégation par `TESTS_WRITABLE_BY_ASSISTANT=1`, qui exige alors un en-tête `Intention :`) et demande confirmation avant d'écrire un fichier source qu'aucun test unitaire/intégration/système ne couvre. Désarmement : `REQUIRE_TEST_FIRST=0`. |
| `check-test-doubles.sh` | PreToolUse (Write/Edit/MultiEdit) | Refuse toute doublure de module (`jest.mock`, `vi.mock`, `__mocks__`, `sinon.stub`, `mockResolvedValue`, `moduleNameMapper` vers un mock) : les vrais services tournent sur les **jeux de données** de `tests/fixtures/`. Les frontières (MSW, Supertest, `listen(0)`, base de test) et `jest.fn()`/`jest.spyOn` restent autorisées. Désarmement : `ALLOW_TEST_DOUBLES=1`. |
| `check-test-location.sh` | PreToolUse (Write) | Bloque la création d'un fichier de test hors de la convention (`docs/testing.md`) ; `tests/fixtures/` en est exclu. |
| `check-ci-before-publish.sh` | PreToolUse (Bash/Write/Edit/MultiEdit) | **La pipeline fait foi.** Refuse toute commande publiante (push vers `main`/`dev`, push de tags, `gh pr merge`, `npm publish`, `gh release create`) si la pipeline du commit courant est rouge **ou en cours** ; confirmation humaine si l'état est invérifiable. Refuse les contournements (`--no-verify`, `[skip ci]`, `--admin`, `gh run cancel`) et la neutralisation d'un job (`continue-on-error`, `allow_failure`, `\|\| true`). Désarmement de la seule vérification réseau : `REQUIRE_GREEN_CI=0`. |
| `check-new-dependency.sh` | PreToolUse (Bash/Write/Edit/MultiEdit) | Nouvelle dépendance : ≥ 3 contributeurs, OU éditeur de confiance (Meta, Google, Amazon, Microsoft, Vercel… extensible via `TRUSTED_ORGS_EXTRA`) avec ≥ 1000 étoiles ; SemVer obligatoire ; publication > 6 mois → confirmation manuelle. Lit le registre par ses points d'accès légers (`<pkg>/latest` pour la version et le dépôt, `/-/v1/search` pour la date de publication) et jamais le document complet, qui pèse des mégaoctets ; une récupération incomplète rend `ask`, jamais `deny`. Délai réseau réglable par `NPM_TIMEOUT` (20 s par défaut). |
| `lib/extract-install-packages.awk` | (appelé par le précédent) | Découpe une commande Bash selon les règles du shell pour n'y voir que les installations réellement exécutées : un texte entre guillemets reste un seul mot, un corps de heredoc est de la donnée, et seul le premier mot d'une commande simple peut être le gestionnaire de paquets. Une ligne d'installation **citée** dans l'argument d'une autre commande n'est donc plus prise pour une installation. |
| `check-file-length.sh` | PostToolUse (Write/Edit) | Avertit dès qu'un fichier source dépasse 300 lignes. |
| `remind-docs.sh` | PostToolUse (Write/Edit) | Rappelle de mettre à jour README/docs après une modification de code (au plus une fois par quart d'heure). |
| `remind-tests.sh` | PostToolUse (Write/Edit) | Rappelle la politique de tests (unitaire systématique, intégration/e2e sur demande), même throttle. |

## Dépendances évaluées puis écartées

Cette section existe pour éviter de refaire une évaluation déjà faite. Un paquet qui
figure ici a été examiné, et la raison de son refus est écrite.

### `react-glassy` : évalué, refusé, le verre reste maison

Le paquet avait été demandé pour vitrer les boutons, la navbar et le formulaire de
contact (issue #142). Il est **écarté**. Le système de verre du dépôt (constitué de
`src/app/verre.css` et des composants qui s'appuient dessus) continue de porter l'effet.

**Refusé d'abord par le garde-fou du dépôt lui-même**, `check-new-dependency.sh`, en
décision `deny` non levable. Relevé du 2026-08-24 :

| Critère du hook | Seuil | `react-glassy` |
|---|---|---|
| Contributeurs GitHub | >= 3 | **1** |
| Étoiles (voie alternative) | 1000 | **0** |
| Éditeur de confiance | liste du hook | `zeroqs`, absent |
| Fraîcheur, SemVer | | conformes |

Un audit du paquet, mené **sans l'installer**, a par ailleurs relevé quatre
incompatibilités avec la calibration mesurée de la PR #135 :

1. **Aucun `saturate` dans son CSS.** Le jeton `--verre-saturation-bande: 1.3` n'aurait
   aucun point d'entrée : la saturation mesurée serait simplement perdue.
2. **Aucun repli `@supports`.** Là où `backdrop-filter` n'existe pas, il ne reste chez
   lui qu'un voile de 15 %, contre les 86 % en clair et 73 % en sombre du système maison.
   Le texte posé dessus deviendrait illisible sur ces navigateurs.
3. **Aucune directive `"use client"` dans son `dist`.** Vitrer la navbar la ferait
   basculer en composant client, et elle vit dans le layout racine : le surcoût de
   JavaScript porterait sur les sept pages d'un site qui vise Lighthouse >= 95.
4. **Ses presets `frost` sont des filtres de déplacement**, de scale 60 à 150. C'est
   précisément la traînée colorée que `src/app/verre.css` interdit sur les bandes, pour
   la raison qui y est documentée : une bande porte du texte, un panneau non.

Vendorer l'effet ou abaisser le seuil du hook ont tous deux été écartés : le premier
reprend la dette sans le paquet, le second désarme un contrôle pour un besoin cosmétique.
*(Arbitrage rendu par Jérôme MARICHEZ le 2026-08-24, issue #142.)*

## Subagents Claude Code (`.claude/agents/`)

Trois subagents pré-définis portent le routage de modèles (`opus-architect`,
`opus-dev`, `haiku-mechanic`) : critères, garde-fous et sources dans
[`model-routing.md`](./model-routing.md).

## Skills Claude Code (`.claude/skills/`)

Ajouter ici les procédures récurrentes du projet (build, déploiement, fixes connus),
un dossier par skill avec un `SKILL.md` (voir l'exemple fourni).
