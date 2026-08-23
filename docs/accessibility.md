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

### Le lavis de pôle — contrastes relevés

Depuis l'issue #104, le fond papier porte un **lavis pastel de la teinte du pôle** sous
tout bloc qui parle d'un pôle : les quatre pages `/services/<pole>/` sur toute leur
hauteur, les quatre portes de l'accueil. Le texte du site est posé dessus, donc le fond de
référence n'est plus `--fond` : c'est la couleur **composée** papier + lavis + grain +
trame. Le détail du mécanisme et le calcul analytique sont dans
[`design.md`](./design.md) ; ce qui suit est la **lecture au pixel du rendu servi**, dans
les deux thèmes, sur le lavis le plus dense de chaque pôle.

| Thème | Surface | `--encre-douce` (texte) | `--encre` (texte) |
|---|---|---|---|
| clair | les quatre portes de l'accueil | **5.59 → 5.70:1** | 12.48 → 12.72:1 |
| clair | les quatre pages de pôle | **5.85 → 5.86:1** | 13.06 → 13.09:1 |
| sombre | les quatre portes de l'accueil | **6.49 → 6.71:1** | 13.48 → 13.92:1 |
| sombre | les quatre pages de pôle | **6.74 → 6.80:1** | 14.00 → 14.12:1 |

Éléments **non-texte** (`--accent-vif` : filets, arêtes, flèches), pire cas calculé sur le
fond le plus défavorable du dégradé d'atelier :

| Thème | Pôle le plus serré | `--accent-vif` sur le lavis | Seuil |
|---|---|---|---|
| clair | data | **3.02:1** | 3:1 (WCAG 1.4.11) |
| clair | SEA & UX | 3.03:1 | 3:1 |
| sombre | IA | 7.79:1 | 3:1 |

C'est cette marge de 0,02 point qui **fixe la densité du lavis**, et non un choix
d'apparence : à 9 % de teinte, `--pole-data-vif` passe sous 3:1. Toute augmentation
future du lavis demande de rouvrir d'abord la palette des `-vif`.

Trois points relevés, à garder en tête :

- le **verre** (`GlassSurface`) floute ce lavis : un fond plus coloré change ce qu'il
  rend. Contrôlé sur les quatre teintes — `--encre-douce` sur un panneau posé sur le
  lavis le plus dense vaut **6.79 à 6.82:1** en clair, **5.23 à 5.28:1** en sombre ;
- le lavis est un **décor** : aucune information n'y est portée par la seule couleur
  (WCAG 1.4.1). Le nom du pôle, son libellé de place et son temps restent écrits en
  toutes lettres à côté. Le survol d'une porte, lui, ne se dit plus par le fond — celui-ci
  est au plafond de contraste — mais par l'arête qui se ferme **et** l'invite qui se
  souligne ;
- **`--accent` dilué à 45 %** — le chiffre de place de `PoleHero`, le filet de preuve de
  `PoleEntries` — est à **1,9 à 2,5:1** sur le fond, et l'était déjà avant le lavis (qui
  lui coûte 0,07 point, la teinte et le fond bougeant ensemble). Les deux sont décoratifs
  et l'information qu'ils accompagnent est écrite à côté, mais le point est **ouvert** et
  n'a pas été traité par ce lot.

### Le verre des bandes collantes — contrastes relevés

Depuis l'issue #115, l'en-tête du site et la barre de pôle laissent passer nettement plus
de fond qu'avant : leur voile descend de 88 → 86 % (clair) et 73 % (sombre) pour
l'en-tête, de 82 → 76 % et 58 % pour la barre. Le texte d'une bande passe donc sur **ce
qui défile derrière elle**, et son contraste varie avec le contenu de la page à cet
instant : il ne peut pas se calculer sur une couleur de fond fixe.

Le relevé est fait **au pixel sur le rendu servi**, page entière balayée au pas de 24px —
un pas plus large saute le pire cas, qui ne dure qu'une trentaine de pixels de
défilement. Méthode complète et pièges de mesure dans [`design.md`](./design.md).

| Bande | Thème | Pire contraste | Seuil | Ce qui le fixe |
|---|---|---|---|---|
| en-tête du site | clair | **4.61:1** | 4.5:1 | `--pole-data` à 13px, sur l'aplat du bouton du seuil |
| en-tête du site | sombre | **4.75:1** | 4.5:1 | `--pole-ia` à 13px, même aplat |
| barre de pôle | clair | **4.59:1** | 4.5:1 | `--pole-data` à 13px, sur le lavis le plus dense |
| barre de pôle | sombre | **4.85:1** | 4.5:1 | `--pole-data` à 13px |

Le reste de ce que portent les bandes est très au-dessus du seuil : `--encre` à 15 et 18px
vaut 10.2 à 13.1:1, `--encre-douce` à 13px vaut 4.93 à 5.86:1. Le bouton d'action de
chaque bande porte son propre fond plein d'`--accent` : son contraste ne dépend pas du
verre et reste à 6.02:1 en clair, 7.18:1 en sombre.

Deux points à garder en tête :

- **le plafond est atteint sur l'en-tête en thème clair.** Les 88 % d'avant n'étaient pas
  prudents, ils étaient déjà le plancher — `--pole-data` à 13px n'y valait que 4.74:1. Ce
  qui bloque est identifié : les quatre chiffres de temps de l'en-tête, en `--accent` à
  13px, passent au-dessus de l'aplat d'`--accent` du bouton d'action du seuil. Deux
  couleurs de la même famille, donc de luminances voisines. Le même en-tête tiendrait un
  voile de 68 % avec `--encre-douce` et de 30 % avec `--encre` — mais ce serait renoncer à
  ce que l'en-tête soit la légende de la palette du site, et c'est un arbitrage de système
  de design, pas de verre ;
- **axe-core ne voit rien de tout cela.** Il juge le contraste d'un texte sur une couleur
  de fond calculée ; il ne compose pas un `backdrop-filter`, ne connaît pas la position de
  défilement, et ne saurait pas quel contenu passe sous une bande `sticky`. Un
  `make budget-a11y` vert ne dit **rien** sur ce point : seul le relevé au pixel ci-dessus
  le couvre, et il est à rejouer dès qu'un voile de bande bouge.

### Pages contrôlées

Les mêmes que les budgets de performance — accueil, page de pôle, liste du blog, page
d'article, index et fiche de réalisation — parce qu'un gabarit non mesuré est un gabarit
non protégé. La liste vit dans `scripts/budgets/pages.mjs`.

| Parcours | Audit | État |
|----------|-------|------|
| Accueil, pôle, blog, article, réalisations | axe-core (`ci-dev-a11y`) | **0 violation** — dernière exécution 2026-08-23, avec le lavis de pôle |
| Contrastes sur le lavis de pôle | mesure au pixel, deux thèmes | **tenu** — 2026-08-23, voir le tableau ci-dessus |
| Contrastes sur les bandes de verre | mesure au pixel, page balayée, deux thèmes | **tenu** — 2026-08-24, marges de 0,09 à 0,35 point |
| Clavier + lecteur d'écran | manuel | _à réaliser_ |
| WCAG 2.2.2 — pause des animations | manuel | _à réaliser_ |
