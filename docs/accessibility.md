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
- **L'état de survol d'un bouton d'action ne tient ni au mouvement ni à la couleur.**
  Les trois actions concernées (le seuil, la barre collante d'un pôle, le bloc de contact
  de l'accueil) répondaient au survol en se déplaçant vers le pointeur. **Jérôme MARICHEZ
  n'a pas voulu de ce geste** (issue #137), et son module a été supprimé. Deux signaux le
  remplacent, et ils sont posés ensemble : l'ombre monte (`--elevation-levee`) et le
  libellé se souligne. Le soulignement est là pour WCAG 1.4.1 : une ombre portée se
  perçoit mal sur un écran mat, un trait sous le libellé est une forme et se voit
  partout. Le repos des boutons n'a pas changé, et le focus clavier reste le
  `:focus-visible` global (contour de 2px en `--accent`, 3px d'écart, WCAG 2.4.7).
  Détail et raisons dans [`design.md`](./design.md).

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

### La chaîne et les derniers porteurs — contrastes relevés (issue #114)

Le lavis s'étend à `ChainDiagram`, dont les plaques sont **du verre** : le lavis passe sous
le voile plutôt que devant, et ses parts compensent ce que le voile absorbe. Le mécanisme
est dans [`design.md`](./design.md) ; ce qui suit est la **lecture au pixel du rendu
servi** (`next dev`, viewport 1440, capture PNG décodée, deux thèmes).

**La non-composition, prouvée sur le rendu et non déduite.** Deux témoins ont été rendus
dans la page à côté de la vraie chaîne : *A*, une plaque IA hors de toute chaîne (un seul
lavis) ; *B*, la même plaque IA dans un conteneur peint au lavis de la donnée — c'est-à-dire
exactement ce qu'aurait produit un lavis posé sur le maillon.

| Thème | Plaque IA réelle (dans le maillon « data ») | Témoin A — un lavis | Témoin B — deux lavis | Écart réel↔A | Écart réel↔B |
|---|---|---|---|---|---|
| clair | `#E4DFDC` | `#E4DFDC` | `#DEDCDA` | **0 niveau** | 6 niveaux |
| sombre | `#191A22` | `#191A22` | `#181D25` | **0 niveau** | 3 niveaux |

La plaque réelle est **au niveau près** identique au cas « un seul lavis », et distincte du
cas « deux lavis ». Le `<li data-pole="data">` a par ailleurs
`background-color: rgba(0,0,0,0)` et `background-image: none` en style calculé : il ne
peint rien. Contrôle croisé sur le fond, à la même abscisse — la gouttière entre les deux
branches, *dans* le maillon « data », vaut `#E5E1D8` ; le gap de la chaîne, *hors* de tout
`<li>`, vaut `#E6E2D9`. L'écart d'un niveau est celui du dégradé d'atelier, pas un lavis.

**Parité des deux branches.** IA et SEA & UX passent par le même composant, donc la même
classe et les mêmes jetons : leur lavis ne peut différer que par la teinte. Écart de
luminance mesuré entre les deux plaques : **0,39 %** en clair, **0,03 %** en sombre.

Contrastes sur la couleur **composée réellement lue** au centre de chaque plaque :

| Thème | Pôle | Fond composé | `--encre` | `--encre-douce` | place (`--accent`, **texte**) | arête + soulignement (`--accent-vif`, non-texte) |
|---|---|---|---|---|---|---|
| clair | ingénierie web | `#E8E0D7` | 13.77:1 | 6.17:1 | 5.29:1 | 3.38:1 |
| clair | data | `#DEE2DC` | 13.72:1 | 6.15:1 | **4.84:1** | **3.11:1** |
| clair | IA | `#E4DFDC` | 13.61:1 | 6.10:1 | 5.21:1 | 3.37:1 |
| clair | SEA & UX | `#E2E1D5` | 13.68:1 | 6.13:1 | **4.82:1** | **3.09:1** |
| sombre | ingénierie web | `#1D1B1A` | 13.93:1 | 6.71:1 | 6.51:1 | 8.35:1 |
| sombre | data | `#101C21` | 14.09:1 | 6.79:1 | 7.14:1 | 9.07:1 |
| sombre | IA | `#191A22` | 14.07:1 | 6.78:1 | 6.53:1 | 8.36:1 |
| sombre | SEA & UX | `#171C1A` | 14.01:1 | 6.75:1 | 7.08:1 | 8.95:1 |

Les deux cas les plus serrés sont le SEA & UX et la donnée, à 4,82:1 pour du texte
(seuil 4.5:1) et 3,09:1 pour du non-texte (seuil 3:1) — tenus, dans les deux thèmes.

**Un défaut antérieur, trouvé et corrigé.** `PoleTagList` portait un lavis écrit à la main
à 8 %, au-dessus du plafond, et **sous du texte de sa propre teinte**. Mesuré en thème
clair sur `/realisations/` :

| Pôle | Texte avant → après | Filet avant → après |
|---|---|---|
| ingénierie web | 5.01 → **5.60:1** | 3.21 → **5.60:1** |
| IA | 4.75 → **5.28:1** | 3.06 → **5.28:1** |
| SEA & UX | 4.63 → **5.13:1** | **2.97** → **5.13:1** |
| data | **4.30** → **4.78:1** | **2.76** → **4.78:1** |

Deux valeurs étaient **sous le seuil** avant ce lot : le texte de la donnée à 4,30:1
(WCAG 1.4.3) et son filet à 2,76:1 (WCAG 1.4.11), celui du SEA & UX à 2,97:1. L'aplat est
retiré et le filet passe de `--accent-vif` à `--accent` — raisonnement et alternatives
mesurées dans [`design.md`](./design.md). En thème sombre, aucune de ces valeurs n'était en
défaut (6,05 à 6,60:1) et toutes montent (6,76 à 7,41:1).

**Les pages de pôle et les portes de l'accueil sont inchangées** : `.lavis-pole` et
`.lavis-bloc` n'ont pas bougé. Relevé de contrôle en thème clair — `--encre-douce` de 6,80
à 6,83:1 et `--accent-vif` de 3,73 à 3,75:1 sur les quatre pages ; en sombre, 7,22 à 7,25:1
et 8,98 à 9,02:1.

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
| barre de pôle | clair | **4.60:1** | 4.5:1 | `--pole-data` à 13px, sur le lavis le plus dense |
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

### Le formulaire de contact, premier élément interactif complexe du site

Le site n'avait jusqu'ici que des liens et deux bascules. Un formulaire ouvre une famille
de problèmes qu'aucun d'eux ne posait : un état d'erreur, un focus à déplacer, et un texte
qui apparaît après une action. Les choix sont écrits ici, parce qu'ils ne se relisent pas
dans le CSS et qu'axe-core n'en juge presque aucun.

- **Un `label` visible et associé par champ** (`htmlFor` / `id`), jamais un `placeholder`
  en guise de libellé : un `placeholder` disparaît dès la première frappe, et c'est
  exactement au moment où l'on écrit qu'on veut relire ce qui est demandé.
- **Le caractère obligatoire est ÉCRIT** : « (obligatoire) » à côté de chaque libellé, pas
  un astérisque, pas une couleur (WCAG 1.4.1). L'attribut natif `required` le porte aussi
  aux technologies d'assistance. La mention est rendue en casse normale à l'intérieur d'un
  libellé en majuscules : « (OBLIGATOIRE) » se lit comme un avertissement, et certaines
  synthèses vocales l'épellent.
- **Chaque champ est décrit par son aide, puis par son erreur** (`aria-describedby`), dans
  cet ordre. Un lecteur d'écran restitue les descriptions dans l'ordre donné, et on veut
  entendre ce que le champ attend avant d'entendre pourquoi ce qui y est ne convient pas.
  Le champ de message y ajoute son compteur de caractères.
- **`aria-invalid` marque le champ fautif**, et l'état se dit trois fois : le message écrit
  dessous, l'attribut, et seulement en dernier l'arête en `--cuivre` (6.02:1 en clair,
  7.18:1 en sombre). La couleur n'est jamais seule.
- **La validation n'a lieu qu'à la soumission, jamais à la frappe.** Valider pendant qu'on
  écrit fait passer le champ en erreur au deuxième caractère, et le lecteur d'écran
  l'annonce. Les erreurs posées restent affichées jusqu'à la soumission suivante.
- **Deux régions vivantes distinctes, présentes dès le premier rendu, vides.** Un
  `role="alert"` inséré dans le document en même temps que son texte n'est pas annoncé de
  façon fiable ; une région déjà là au chargement l'est. Elles sont effacées par `:empty`,
  jamais par une condition de rendu. Le refus passe par `role="alert"`, qui interrompt ; la
  réussite par `role="status"`, qui attend une pause. Un envoi qui marche n'a aucune raison
  de couper la parole.
- **Le focus part au résumé d'erreurs, pas au premier champ fautif.** Le résumé liste les
  erreurs et renvoie vers chaque champ par un vrai lien : on entend tout, on choisit quoi
  corriger, on y arrive d'une touche. Sauter d'office au premier champ ferait perdre les
  autres. Le bloc est `tabIndex={-1}` : focusable sans entrer dans l'ordre de tabulation.
  Deux refus de suite sur les mêmes champs produisent le même état d'erreur, d'où un
  compteur de refus plutôt qu'un booléen : sans lui, le second refus passerait inaperçu.
- **`noValidate` sur le formulaire.** Sans lui, le navigateur affiche ses propres bulles,
  dans sa langue et avec ses formulations, et court-circuite les messages écrits.
- **Le champ de message n'est pas borné par `maxLength`.** Un `maxLength` tronque un texte
  collé sans le dire, ce qui est le piège même que ce formulaire doit éviter. Le visiteur
  peut dépasser, le compteur le lui montre, et la validation le lui dit en toutes lettres.
- **Le bouton d'envoi ne bouge pas.** Aucun effet de déplacement au survol (issue #137) :
  il est atteint au clavier bien plus souvent qu'un lien de fin de page, et le survol se
  dit par une élévation et un anneau intérieur, deux changements de forme, pas par la
  teinte seule.
- **Ordre de tabulation vérifié**, du premier champ à l'envoi : nom, sujet, message,
  bouton. Aucun piège de focus, aucun arrêt parasite, contour de focus global visible.
- **L'adresse reste affichée en clair, en `mailto:`, à côté du formulaire.** Ce n'est pas
  une redondance : le formulaire a besoin d'un client mail installé sur le poste, et sans
  cette sortie un visiteur qui n'en a pas repartirait avec un bouton qui ne fait rien.

### Pages contrôlées

Les mêmes que les budgets de performance — accueil, page de pôle, liste du blog, page
d'article, index et fiche de réalisation — parce qu'un gabarit non mesuré est un gabarit
non protégé. La liste vit dans `scripts/budgets/pages.mjs`.

| Parcours | Audit | État |
|----------|-------|------|
| Accueil, pôle, blog, article, réalisations | axe-core (`ci-dev-a11y`) | **0 violation** — dernière exécution 2026-08-23, avec le lavis de pôle |
| Contrastes sur le lavis de pôle | mesure au pixel, deux thèmes | **tenu** — 2026-08-23, voir le tableau ci-dessus |
| Contrastes sur le lavis de feuille (`ChainDiagram`) | mesure au pixel, deux thèmes | **tenu** — 2026-08-23, pire cas 4,82:1 (texte) et 3,09:1 (non-texte) |
| Non-composition des lavis dans `ChainDiagram` | témoins rendus + mesure au pixel | **prouvée** — 2026-08-23, écart nul avec le cas « un seul lavis » |
| Étiquettes de pôle (`PoleTagList`) | mesure au pixel, deux thèmes | **corrigé** — 2026-08-23, deux valeurs étaient sous le seuil |
| Contrastes sur les bandes de verre | mesure au pixel, page balayée, deux thèmes | **tenu** — 2026-08-24, rejoué après intégration de `dev`, marges de 0,10 à 0,35 point |
| Formulaire de contact : ordre de tabulation, envoi au clavier, deux thèmes | manuel | **tenu** le 2026-08-24, du premier champ à l'envoi, sur l'export statique |
| Formulaire de contact : lecteur d'écran | manuel | _à réaliser_ |
| Clavier + lecteur d'écran (reste du site) | manuel | _à réaliser_ |
| WCAG 2.2.2 — pause des animations | manuel | _à réaliser_ |
