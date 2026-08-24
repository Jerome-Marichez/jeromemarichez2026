# Pratiques frontend

Principes transverses appliqués par l'agent `opus-frontend` (voir
[`model-routing.md`](./model-routing.md)). Neutres vis-à-vis de la stack : ils
valent que le projet soit sous Vite ou Next, avec ou sans Storybook. Un encart
« Exemple réel » en fin de page illustre une implémentation concrète — à titre
indicatif, **pas** normatif.

## État : serveur vs client

La décision frontend la plus structurante. Deux natures de données à ne jamais
confondre :

- **État serveur** — données distantes (listes, entités, réponses d'API). Géré par
  une couche de **cache/fetching** (SWR, React Query…) : dédup des requêtes,
  revalidation, invalidation. **Jamais recopié** dans un store global — la source
  de vérité reste le cache.
- **État client** — état d'interface (formulaire en cours, onglet actif, modale
  ouverte). État **local** au composant par défaut ; remonté dans un store partagé
  (Redux Toolkit, Zustand…) seulement s'il est réellement partagé entre plusieurs
  vues.

Règle : ne pas dupliquer une donnée serveur dans le state global « pour l'avoir
sous la main ». Toute mise en place ou refonte d'**architecture d'état global** est
une décision structurante → `ESCALATE` vers `opus-architect`.

## Logging

Pas de `console.*` dans le code applicatif : passer par un **service de log** dédié
(niveau, contexte, redirection possible). La règle Biome `noConsole` fait échouer le
lint ailleurs que dans ce service (voir [`tooling.md`](./tooling.md)).

## Style

Une **seule** stratégie de style par projet, décidée dans [`design.md`](./design.md)
(CSS Modules, styled/emotion, ou utilitaire type Tailwind) — pas de mélange. Style
**co-localisé** avec le composant, approche **mobile-first**, valeurs tirées des
**tokens** de design (couleurs, espacements, typo) plutôt qu'en dur.

## Performance

- **Virtualiser** les longues listes et tableaux (ne pas monter 10 000 lignes).
- `memo` / `useMemo` / `useCallback` sur des rendus coûteux **mesurés** — jamais par
  réflexe.
- **Code-splitting / lazy-load** des vues et dépendances lourdes (éditeurs, graphes,
  export PDF…).
- Pas de micro-optimisation prématurée : mesurer (Profiler, Lighthouse) avant.

## Structure et nommage

- **Un dossier par composant** réutilisable : `Composant/index.tsx`, style
  co-localisé (`index.module.css` ou équivalent), et la story si Storybook est en
  place.
- Composants en `PascalCase` ; fonctions en anglais `camelCase`, verbe + nom
  (ex. `displayArrayData`, `formatPhoneNumber`).
- Logique métier hors des composants : dans `hooks/` (état/effets réutilisables) ou
  `services/` (appels, transformations pures).

## SVG : une largeur CSS ne dimensionne pas un `<svg>` imbriqué

Piège relevé en conditions réelles sur ce site (issue #102), à connaître avant de
construire le prochain visuel en SVG.

Un `<svg>` **racine dans du HTML** se dimensionne très bien en CSS : `width` et `height`
s'appliquent comme sur n'importe quelle boîte, et un jeton (`--taille-glyphe`) suffit à
tenir toute une série de marques.

Le même composant **imbriqué dans un autre `<svg>`** ignore cette largeur. L'élément
interne retombe sur sa valeur par défaut `100 %` du viewport parent, et son `viewBox` est
mis à l'échelle de la scène entière : mesuré ici **271 px de tracé au lieu de 33**, six
fois trop grand, dans une scène large de 457 px.

Règles :

- Dans un contexte imbriqué, la taille passe par les **attributs** `width` / `height`,
  seuls fiables — jamais par le CSS.
- Ne pas poser les deux « pour être sûr » : une règle CSS l'emporte sur un attribut de
  présentation, donc la taille demandée serait perdue précisément là où elle est la seule
  à fonctionner. Un composant servant dans les deux contextes expose une prop de taille
  optionnelle et **n'applique sa classe de dimensionnement CSS que lorsqu'elle est
  absente** (voir `PoleGlyph` et `SlabScene`).
- Une règle CSS rendue morte par ce choix (un `--taille-…` posé sur le parent imbriqué)
  se supprime : laissée en place, elle se lit comme la source de la taille et fera perdre
  une heure au prochain lecteur.

## Accessibilité et tests

L'a11y (WCAG 2.1 AA) est traitée dans [`accessibility.md`](./accessibility.md) et
**prime sur les défauts d'un template UI importé**. Chaque composant a des tests
unitaires (RTL) couvrant ses états significatifs ; en l'absence de Storybook, ces
tests tiennent lieu de catalogue d'états.

---

## Exemple réel : SmsEnMasse-FrontEnd

Illustration d'une stack de production appliquant ces principes (indicatif) :

| Principe | Implémentation |
|----------|----------------|
| État serveur | **SWR** (cache/revalidation des données d'API) |
| État client partagé | **Redux Toolkit** + `redux-state-sync` (multi-onglets) |
| Logging | `no-console` ESLint + **`LoggerService`** dédié |
| Tableaux virtualisés | **material-react-table** |
| Style | CSS Modules (`index.module.css`) + BEM, thème MUI |
| Structure | `src/@core/components/<Composant>/index.tsx` |
| Tests | **Jest + RTL** (unitaire) + **Cypress** (e2e) |

Ces choix sont propres à ce projet : sur un nouveau projet, retenir les **principes**
ci-dessus, pas nécessairement les mêmes bibliothèques.
