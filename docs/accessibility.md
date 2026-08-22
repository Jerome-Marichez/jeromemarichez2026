# Accessibilité

<!-- TODO : compléter avec les audits réalisés. -->

## Objectif

Conformité **WCAG 2.1 AA** sur les parcours principaux.

> Ces règles **priment sur les défauts d'un template UI importé** : un thème du
> commerce qui désactive des règles a11y ou pose des `div` cliquables doit être
> corrigé, pas suivi.

## Règles pour le front React

- HTML **sémantique** d'abord (`nav`, `main`, `button`…) ; ARIA seulement en complément.
- **Navigation clavier** complète : focus visible, ordre logique, pas de piège de focus.
- **Formulaires** : chaque champ a un `label` associé ; erreurs annoncées (`aria-live`).
- **Contrastes** : ratio ≥ 4.5:1 pour le texte courant. Les **seize valeurs** de la
  palette des pôles (`--accent` et `--accent-vif`, quatre pôles, deux thèmes) sont
  mesurées et tabulées dans [`design.md`](./design.md) :
  `--accent-vif` est **non-texte uniquement**, il est entre 3.5:1 et 3.9:1 en thème clair.
- **La couleur n'est jamais le seul porteur d'information** (WCAG 1.4.1). La teinte de
  pôle double une information déjà écrite — le nom du pôle, sa place, son temps. La
  limite connue de cette palette sous vision dichromate est documentée dans `design.md`,
  chiffres à l'appui, plutôt que passée sous silence.
- **Images** : `alt` pertinent (ou vide si décorative).

## Checklist par composant

- [ ] Élément interactif = vrai `button` / `a` (jamais un `div` avec `onClick` seul).
- [ ] Accessible et actionnable au **clavier** (Tab, Entrée/Espace) ; focus visible.
- [ ] Champs de formulaire reliés à un `label` (`htmlFor`/`id`) ; erreur en `aria-live`.
- [ ] Icône seule → `aria-label` ; image décorative → `alt=""`.
- [ ] Contraste texte/fond ≥ 4.5:1 (≥ 3:1 pour le grand texte).
- [ ] État dynamique (chargement, ouverture) annoncé (`aria-busy`, `aria-expanded`).

## Vérification

Trois niveaux, et il est important de ne pas les confondre :

1. **Lint** — règles a11y de Biome, à l'écriture. Attrape les fautes de balisage
   évidentes (`div` cliquable, `alt` manquant) avant même le build.
2. **Contrôle automatisé** — `make budget-a11y` : axe-core (Deque) sur les pages
   représentatives, dans un vrai navigateur. Une violation d'impact `critical` ou
   `serious` fait **échouer** le contrôle, et il tourne sur **chaque PR vers `dev`**
   (`ci-dev-a11y`).
3. **Audit manuel** — clavier et lecteur d'écran sur les parcours critiques. **Rien ne
   le remplace.**

### Ce que le contrôle automatique ne dit pas

axe-core ne détecte que la part **mécanisable** de WCAG : Deque annonce environ 57 % des
problèmes sur ses propres jeux de mesure, la pratique retient plutôt un tiers. Un
`make budget-a11y` vert ne signifie **pas** que le site est conforme RGAA, et le site ne
doit nulle part le laisser entendre — ce serait exactement le genre d'affirmation sans
preuve que le `CLAUDE.md` s'interdit.

Restent hors de portée d'axe, et donc à la charge de l'audit manuel :

- la **pertinence** d'une alternative textuelle, d'un intitulé de lien, d'un titre ;
- l'**ordre de lecture** et la cohérence de la hiérarchie de titres ;
- l'utilisabilité réelle **au clavier** d'un composant riche (piège de focus, raccourci) ;
- le **focus visible** en conditions réelles — axe ne juge pas la visibilité d'un
  contour ;
- `prefers-reduced-motion` : axe ne le teste pas. Le respect de la préférence est vérifié
  à la main sur la scène d'accueil ;
- **WCAG 2.2.2 (Pause, Stop, Hide)** — le mécanisme de mise en pause des animations. Un
  contrôle automatique ne sait pas dire si l'utilisateur peut réellement arrêter le
  mouvement ; c'est un point d'audit manuel explicite sur ce site ;
- les **contrastes** au-delà du cas simple texte sur fond uni : les seize valeurs de la
  palette des pôles sont mesurées à la main dans [`design.md`](./design.md), et
  `--accent-vif` y est déclaré **non-texte uniquement**. axe ne peut pas connaître cette
  intention.

### Pages contrôlées

Les mêmes que les budgets de performance — accueil, page de pôle, page d'article — parce
qu'un gabarit non mesuré est un gabarit non protégé. La liste vit dans
`scripts/budgets/pages.mjs`.

| Parcours | Audit | État |
|----------|-------|------|
| Accueil, pôle, article | axe-core (`ci-dev-a11y`) | **0 violation** — première exécution, 2026-08-22 |
| Clavier + lecteur d'écran | manuel | _à réaliser_ |
| WCAG 2.2.2 — pause des animations | manuel | _à réaliser_ |
