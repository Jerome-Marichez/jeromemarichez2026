# Accessibilité

## Objectif

Conformité **WCAG 2.1 AA** sur les six pages du site, pas seulement sur les parcours
principaux : le site en compte six, les couvrir toutes coûte moins cher que de choisir
lesquelles sacrifier.

**Le plancher d'accessibilité est à 95 et ne bouge pas**, là où celui de la performance a
été abaissé à 80. Une performance tolérée à 82 n'excuse aucune régression
d'accessibilité.

> Ces règles **priment sur les défauts d'un template UI importé** : un thème du
> commerce qui désactive des règles a11y ou pose des `div` cliquables doit être
> corrigé, pas suivi.

## Règles pour le front React

- HTML **sémantique** d'abord (`nav`, `main`, `button`…) ; ARIA seulement en complément.
- **Navigation clavier** complète : focus visible, ordre logique, pas de piège de focus.
- **Formulaires** : chaque champ a un `label` associé ; erreurs annoncées (`aria-live`).
- **Contrastes** : ratio ≥ 4.5:1 pour le texte courant. Les valeurs de la palette sont
  mesurées et tabulées dans [`design.md`](./design.md). Un seul jeton y est déclaré
  **non-texte uniquement**, `--cafe-sourd` : il sert aux filets et aux arêtes, jamais à
  un mot.
- **La couleur n'est jamais le seul porteur d'information** (WCAG 1.4.1). Le site n'a
  qu'une teinte d'accent, donc aucune information n'est encodée par une couleur parmi
  plusieurs. L'onglet ouvert de l'en-tête le montre bien : il porte à la fois un filet,
  un changement de fond et `aria-current="page"`, et pas seulement la couleur café.
- **Images** : `alt` pertinent, ou `alt=""` si décorative. Le mug est un `svg`
  décoratif par défaut (`role="presentation"` et `aria-hidden`), et il ne devient une
  image nommée que si on lui passe une description.
- **Un seul thème, sombre.** Ce n'est pas un manquement d'accessibilité mais un choix
  documenté (voir [`design.md`](./design.md)), et il a un revers qui se dit : un visiteur
  qui préfère un fond clair n'a pas de variante. Les contrastes sur fond sombre sont donc
  vérifiés sans indulgence, et ils sont tous au delà du seuil.
- **Le mouvement s'arrête de deux façons.** `prefers-reduced-motion` couvre le visiteur
  qui a réglé son système ; un bouton explicite dans le pied de page couvre celui qui ne
  l'a pas fait. C'est WCAG 2.2.2, et sur un site dont la signature est animée ce n'est
  pas une option.

## Checklist par composant

- [ ] Élément interactif = vrai `button` / `a` (jamais un `div` avec `onClick` seul).
- [ ] Accessible et actionnable au **clavier** (Tab, Entrée/Espace) ; focus visible.
- [ ] Champs de formulaire reliés à un `label` (`htmlFor`/`id`) ; erreur en `aria-live`.
- [ ] Icône seule → `aria-label` ; image décorative → `alt=""`.
- [ ] Contraste texte/fond ≥ 4.5:1 (≥ 3:1 pour le grand texte).
- [ ] État dynamique (chargement, ouverture) annoncé (`aria-busy`, `aria-expanded`).

## Vérification

Trois niveaux, et il est important de ne pas les confondre :

1. **Lint** : règles a11y de Biome, à l'écriture. Attrape les fautes de balisage
   évidentes (`div` cliquable, `alt` manquant) avant même le build.
2. **Contrôle automatisé** avec `make budget-a11y` : axe-core (Deque) sur les pages
   représentatives, dans un vrai navigateur. Une violation d'impact `critical` ou
   `serious` fait **échouer** le contrôle, et il tourne sur **chaque PR vers `dev`**
   (`ci-dev-a11y`).
3. **Audit manuel** : clavier et lecteur d'écran sur les parcours critiques. **Rien ne
   le remplace.**

### Ce que le contrôle automatique ne dit pas

axe-core ne détecte que la part **mécanisable** de WCAG : Deque annonce environ 57 % des
problèmes sur ses propres jeux de mesure, la pratique retient plutôt un tiers. Un
`make budget-a11y` vert ne signifie **pas** que le site est conforme RGAA, et le site ne
doit nulle part le laisser entendre : ce serait exactement le genre d'affirmation sans
preuve que le `CLAUDE.md` s'interdit.

Restent hors de portée d'axe, et donc à la charge de l'audit manuel :

- la **pertinence** d'une alternative textuelle, d'un intitulé de lien, d'un titre ;
- l'**ordre de lecture** et la cohérence de la hiérarchie de titres ;
- l'utilisabilité réelle **au clavier** d'un composant riche (piège de focus, raccourci) ;
- le **focus visible** en conditions réelles : axe ne juge pas la visibilité d'un
  contour ;
- `prefers-reduced-motion` : axe ne le teste pas. Le respect de la préférence est vérifié
  à la main sur la scène d'accueil ;
- **WCAG 2.2.2 (Pause, Stop, Hide)** : le mécanisme de mise en pause des animations. Un
  contrôle automatique ne sait pas dire si l'utilisateur peut réellement arrêter le
  mouvement ; c'est un point d'audit manuel explicite sur ce site ;
- les **contrastes** au-delà du cas simple texte sur fond uni : les seize valeurs de la
  palette des pôles sont mesurées à la main dans [`design.md`](./design.md), et
  `--accent-vif` y est déclaré **non-texte uniquement**. axe ne peut pas connaître cette
  intention.

### Les pages contrôlées

**Les six routes du site**, sans exception : `/`, `/a-propos/`, `/parcours/`, `/projets/`,
`/competences/`, `/contact/`. La liste vit dans
[`scripts/budgets/pages.mjs`](../scripts/budgets/pages.mjs), partagée avec les budgets de
performance, parce qu'un gabarit non mesuré est un gabarit non protégé.

### Le relevé du 2026-09-20

Première exécution sur le site CV, après la table rase.

| Page | axe-core (bloquantes) | axe-core (mineures et modérées) | Lighthouse a11y |
|------|----------------------|--------------------------------|-----------------|
| `/` | 0 | 0 | 100 |
| `/a-propos/` | 0 | 0 | 100 |
| `/parcours/` | 0 | 0 | 100 |
| `/projets/` | 0 | 0 | 100 |
| `/competences/` | 0 | 0 | 100 |
| `/contact/` | 0 | 0 | 100 |

**Ce relevé n'a pas été vert du premier coup, et c'est l'information utile.** Le test de
fumée e2e, réécrit le même jour, a trouvé deux pages sans aucun `h1` : `/projets/` et
`/contact/` utilisaient `TitreSection`, qui rend un `h2`. Elles s'affichaient
normalement, et étaient pourtant cassées pour un lecteur d'écran comme pour un moteur.

La correction en a produit une seconde : en posant le `h1`, les entrées restées en `h3`
faisaient sauter le niveau `h2`, ce qu'axe a signalé en `moderate` sur deux pages
(`heading-order`). Les noms d'entreprise et les titres de fiche sont donc passés en `h2`.

Deux enseignements, notés parce qu'ils se reproduiront :

1. **Un composant de titre de section n'est pas un titre de page.** `TitreSection` rend un
   `h2` ou un `h3` et porte un marqueur `//` pensé pour une sous-section. Une page a
   besoin d'un `h1`, et aucun composant ne le fournit : il s'écrit dans la vue.
2. **Un défaut de hiérarchie de titres ne se voit pas à l'écran.** C'est exactement la
   classe de défaut qu'un contrôle automatique attrape et qu'une relecture visuelle
   laisse passer.

### Ce qui reste à faire à la main

Le vert d'axe-core ne dispense d'aucune de ces vérifications, et aucune n'a encore été
menée sur le site CV :

| Vérification | État |
|--------------|------|
| Clavier complet sur les six pages, de l'évitement au pied de page | à réaliser |
| Lecteur d'écran sur les six pages | à réaliser |
| WCAG 2.2.2 : le bouton de pause arrête réellement la vapeur du mug | à réaliser |
| `prefers-reduced-motion` : les trois composants animés respectent la préférence | à réaliser |
| Pertinence des intitulés de liens, notamment ceux du pied de page | à réaliser |
| La densité du mur de stack reste lisible en zoom 200 % | à réaliser |

**Le site ne doit nulle part laisser entendre qu'il est conforme RGAA.** Un audit RGAA
est une démarche formelle, et ce dépôt n'en porte pas. Ce qu'il porte est un contrôle
automatisé bloquant sur chaque PR, plus cette liste honnête de ce qu'il ne couvre pas.
