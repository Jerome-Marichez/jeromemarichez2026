# Design & UI

Socle visuel du site : jetons, layout global et composants de base. Tout ce qui est
décrit ici vit dans `front/src/@shared/`.

Le site est la démonstration de ce qu'il vend. Accessibilité et performance ne sont pas
des finitions : elles sont dans les choix du socle, et les contrastes réellement mesurés
sont consignés dans [`accessibility.md`](./accessibility.md).

## Principes

- **Une seule source de vérité.** Toutes les valeurs visuelles sont des propriétés
  personnalisées CSS déclarées dans `@shared/styles/tokens.css`. Aucun composant
  n'écrit une couleur, un espacement ou une taille de police en dur.
- **Fluide plutôt que par paliers.** Tailles de police et espacements majeurs
  interpolent avec `clamp()` de 320 px à 1920 px. Il n'y a donc pas de « saut » de
  typographie à une largeur donnée, et rien à re-régler pour une largeur intermédiaire.
- **Le HTML d'abord.** Le socle n'embarque aucune bibliothèque d'interface et presque
  aucun JavaScript : la navigation, le lien d'évitement et les cartes sont du HTML
  sémantique stylé. Ce qui n'existe pas ne peut ni peser, ni casser l'accessibilité.
- **Pur par défaut.** Un composant ne lit que ses props. Le seul composant qui dépend
  d'autre chose est isolé dans `_notPure/` (voir plus bas).

## Stratégie de style

**CSS Modules colocalisés + propriétés personnalisées CSS.** Une seule stratégie, pas de
mélange (conformément à [`frontend-practices.md`](./frontend-practices.md)).

| Choix | Alternatives écartées | Justification |
|-------|----------------------|---------------|
| CSS Modules | CSS-in-JS (styled, emotion) | Aucun runtime de style expédié au navigateur, aucun coût d'hydratation. Next.js extrait le CSS à la compilation. |
| Propriétés personnalisées CSS pour les jetons | jetons en TypeScript | Le thème sombre devient une simple redéclaration de variables, sans re-rendu React ni duplication des composants. |
| Aucune bibliothèque d'interface | shadcn/ui, MUI, Tailwind | Le socle tient en quatre composants et un layout. Importer un système entier pour cela coûterait en poids, en dépendances à suivre et en défauts d'accessibilité à corriger. À réévaluer si le catalogue grossit franchement. |
| Pile de polices système | Google Fonts, polices auto-hébergées | Zéro requête réseau, zéro décalage de mise en page au chargement, et aucun appel à un service tiers — ce dernier point est aussi une contrainte RGPD du `README.md`. |

Nommage des classes : une classe par rôle, en `camelCase` (contrainte des modules CSS
consommés en TypeScript), fichier nommé d'après le composant
(`Card/index.tsx` + `Card/card.module.css`).

## Jetons

Source : `front/src/@shared/styles/tokens.css`.

### Couleurs

Seize jetons, déclarés à l'identique dans les deux thèmes. Les valeurs de contraste
mesurées sont dans [`accessibility.md`](./accessibility.md).

| Jeton | Clair | Sombre | Usage |
|-------|-------|--------|-------|
| `--color-background` | `#fcfcfa` | `#0e1013` | fond de page |
| `--color-surface` | `#ffffff` | `#171a1f` | cartes, éléments posés sur le fond |
| `--color-surface-muted` | `#f1f0eb` | `#1f2329` | sections alternées, pied de page |
| `--color-text` | `#16181c` | `#e9ebee` | texte courant |
| `--color-text-muted` | `#54585f` | `#a7aeb8` | texte secondaire |
| `--color-border` | `#dcdad3` | `#2c313a` | séparations décoratives |
| `--color-border-strong` | `#8b8780` | `#6b7380` | bordure d'un élément interactif (seuil 3:1) |
| `--color-accent` | `#0b4f79` | `#7fc1f0` | liens, actions, focus |
| `--color-accent-hover` | `#083a5a` | `#a8d5f7` | survol |
| `--color-accent-contrast` | `#ffffff` | `#07131c` | texte posé sur l'accent |
| `--color-accent-soft` | `#e3eef6` | `#152430` | pastilles, fonds d'accent discrets |
| `--color-focus` | `#0b4f79` | `#7fc1f0` | anneau de focus |
| `--color-depth-top` | `#0f4267` | `#0c3550` | borne haute du dégradé de profondeur |
| `--color-depth-bottom` | `#072235` | `#061b2a` | borne basse du dégradé de profondeur |
| `--color-depth-text` | `#f4f8fb` | `#eef4f8` | texte principal posé sur la profondeur |
| `--color-depth-text-muted` | `#b6c9d8` | `#adc0d0` | étiquettes et texte secondaire sur la profondeur |

Les quatre jetons `depth` forment un sous-système fermé : ils ne se mélangent jamais
aux autres. Un texte posé sur le dégradé emploie `--color-depth-text`, jamais
`--color-text` — les deux thèmes n'ont pas la même idée de ce qu'est du texte, alors
que le dégradé, lui, reste sombre dans les deux.

**Palette retenue** : un bleu d'encre profond sur un blanc légèrement chaud. Une seule
teinte d'accent, pas de couleur secondaire décorative — un site qui vend de l'ingénierie
n'a pas besoin d'une palette, il a besoin d'être lisible et calme. Le fond clair est
volontairement cassé (`#fcfcfa` plutôt que du blanc pur) pour réduire l'éblouissement,
et le fond sombre n'est pas noir (`#0e1013`) pour limiter le halo autour du texte clair.

Aucune couleur d'état (succès, alerte, erreur) n'est définie : le socle n'a pas encore
d'écran qui en produise. Elles seront ajoutées avec le formulaire de contact, et devront
passer par le même contrôle de contraste.

### Typographie

Pile système (`--font-sans`, `--font-mono`). Échelle fluide, interpolée de 320 px à
1920 px.

| Jeton | 320 px | 1920 px | Usage |
|-------|--------|---------|-------|
| `--font-size-xs` | 13 px | 13 px | mentions légales, pastilles |
| `--font-size-sm` | 14 px | 14 px | navigation, texte de pied de page |
| `--font-size-base` | 16 px | 18 px | texte courant |
| `--font-size-md` | 18 px | 21 px | chapô de section |
| `--font-size-lg` | 20 px | 24 px | `h4`, titre de carte |
| `--font-size-xl` | 24 px | 32 px | `h3` |
| `--font-size-2xl` | 30 px | 46 px | `h2` |
| `--font-size-3xl` | 34 px | 58 px | `h1` |

Les deux plus petites tailles sont fixes : les faire rétrécir en dessous de 13 px nuirait
à la lisibilité sans rien gagner.

Hauteurs de ligne : `--line-height-tight` (1.15, titres), `--line-height-snug` (1.3),
`--line-height-normal` (1.6, texte courant). Graisses : 400 / 500 / 700.

### Espacement

Échelle géométrique fondée sur 0.25 rem : `--space-3xs` (4 px), `--space-2xs` (8),
`--space-xs` (12), `--space-sm` (16), `--space-md` (24), `--space-lg` (32),
`--space-xl` (48), `--space-2xl` (64), `--space-3xl` (96).

Deux espacements fluides portent la mise en page :

| Jeton | 320 px | 1920 px | Usage |
|-------|--------|---------|-------|
| `--space-gutter` | 16 px | 40 px | gouttière latérale du conteneur |
| `--space-section` | 48 px | 96 px | respiration verticale d'une section |

### Rayons, ombres, layout

`--radius-sm` 4 px, `--radius-md` 8 px, `--radius-lg` 14 px, `--radius-pill`.

Quatre niveaux d'ombre, doux en thème clair et nettement plus sombres en thème sombre,
où une ombre diffuse ne se voit plus : c'est alors `--color-border` qui porte
l'essentiel de la séparation entre surfaces.

| Jeton | Rôle |
|-------|------|
| `--shadow-sm` | carte posée sur le fond (`Card` par défaut) |
| `--shadow-md` | surface détachée : carte d'offre, point d'entrée |
| `--shadow-lg` | surface franchement surélevée : maillon de la chaîne, panneau du constat |
| `--shadow-xl` | la même, soulevée au survol |

Deux jetons complètent le vocabulaire de profondeur :

| Jeton | Valeur | Rôle |
|-------|--------|------|
| `--elevation-lift` | `-2px` | décalage vertical d'une surface soulevée au survol |
| `--gradient-depth` | `linear-gradient(160deg, …)` | dégradé de bleu profond, bâti sur les deux bornes `--color-depth-*` |

`--gradient-depth` n'est déclaré **que** dans `:root`, et suit pourtant le thème : ses
deux bornes sont des `var()`, substituées au moment de l'emploi avec la valeur héritée
par l'élément. L'angle est donc décidé une seule fois, et le thème sombre n'a rien à
redéclarer.

Largeurs utiles : `--layout-width-narrow` 44 rem (texte suivi),
`--layout-width-default` 68 rem, `--layout-width-wide` 80 rem (en-tête, grilles).

### Focus et mouvement

`--focus-ring-width` 3 px, `--focus-ring-offset` 2 px, appliqués par une règle
`:focus-visible` globale jamais neutralisée.

`--transition-fast` 120 ms, `--transition-base` 200 ms. Sous
`prefers-reduced-motion: reduce`, ces deux jetons passent à `0s` : toutes les animations
du site étant construites dessus, cela suffit à les supprimer, sans sélecteur universel
ni `!important`.

## Points de rupture

Le socle n'utilise **aucune media query de largeur**. La mise en page s'adapte par des
mécanismes intrinsèques :

| Mécanisme | Où | Effet |
|-----------|-----|-------|
| `clamp()` | typographie, gouttière, sections | interpolation continue de 320 à 1920 px |
| `flex-wrap` | en-tête | la navigation passe sous l'identité quand la place manque |
| `grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr))` | pied de page, grilles de cartes | le nombre de colonnes se déduit de la place disponible |

Conséquence : il n'y a pas de largeur « non testée » entre deux paliers, et rien à
ajouter pour une taille d'écran nouvelle. Les jetons `sm/md/lg/xl` du gabarit initial ont
été retirés parce qu'ils n'étaient pas utilisés — une valeur non employée qui figure dans
la doc finit toujours par être employée à tort.

## Composants de base

Chacun dans son dossier PascalCase, `index.tsx` + module CSS colocalisé.

| Composant | Rôle | Points notables |
|-----------|------|-----------------|
| `Container` | borne la largeur, applique la gouttière | seul endroit qui décide d'une largeur maximale ; `width` = `narrow` / `default` / `wide` |
| `ActionLink` | lien mis en avant comme un bouton | rend toujours un `a` — les appels à l'action du site sont des navigations ; `variant` = `primary` / `secondary` ; `external` ajoute `rel="noopener noreferrer"` et une mention « nouvelle fenêtre » pour les lecteurs d'écran |
| `Card` | surface autonome titrée | volontairement non cliquable en entier : la zone d'action est explicite (`footer`), ce qui évite de superposer un lien invisible au texte |
| `Section` | bloc de page titré | `id` obligatoire : il nomme la région via `aria-labelledby` et sert d'ancre ; `tone="muted"` pour alterner les fonds |
| `SkipLink` | lien d'évitement | premier élément focusable du document |
| `SiteHeader` | en-tête global | identité + navigation principale |
| `SiteFooter` | pied de page global | promesse, navigation secondaire, appel à contact |

`Card` et `Section` acceptent un niveau de titre explicite (`headingLevel`) : la
hiérarchie des titres appartient à la page, pas au composant.

### Pureté et `_notPure/`

Tous les composants ci-dessus sont purs : leur rendu ne dépend que de leurs props, et ils
s'exécutent côté serveur.

Une seule exception, `SiteHeader/_notPure/NavLink/`. Ce composant lit la route courante
(`usePathname`) pour poser `aria-current="page"` sur l'entrée active. Il dépend donc du
contexte d'exécution et doit être rendu côté client. Le coût est assumé pour une raison
précise : sans cet attribut, un lecteur d'écran ne distingue pas la page affichée des
autres entrées du menu. La page courante n'est d'ailleurs jamais signalée par la seule
couleur — un soulignement épaissi porte la même information.

## Navigation

La navigation principale est une liste de liens qui se replie sur plusieurs lignes en
dessous d'environ 640 px, **pas** un menu déroulant. Cinq entrées tiennent sans cela, et
ce choix supprime d'un coup l'état d'ouverture, le piège de focus, la gestion de la
touche Échap et le JavaScript associé. L'en-tête n'est pas non plus collant : sur un
téléphone, il mange sinon une part notable de la hauteur utile.

Les entrées sont déclarées une seule fois dans `@shared/config/navigation.ts` et
consommées par l'en-tête comme par le pied de page : les deux ne peuvent pas diverger.

## Motifs de page

Les composants ci-dessus sont le vocabulaire ; les motifs ci-dessous sont les phrases
qu'on en compose. Ils vivent dans `front/src/views/<route>/`, pas dans `@shared/` : ce
sont des assemblages propres à une page, pas des briques réutilisables. Le premier à les
employer est la page d'accueil (`views/accueil/`).

| Motif | Où | Description |
|-------|-----|-------------|
| **Accroche** | `views/accueil/sections/Accroche` | Bloc d'ouverture portant le `h1`. Composé à la main plutôt qu'avec `Section`, qui ne sait titrer qu'en `h2`/`h3` : le niveau `h1` appartient à la page. Reste une région nommée (`aria-labelledby`). |
| **Grille de cartes** | `views/accueil/sections/Offres` | `ul` en `grid` `auto-fit` : un lecteur d'écran annonce le nombre de cartes avant de les énumérer. Les `li` sont en `display: grid` pour que chaque carte occupe toute la hauteur de sa rangée et que les pieds de carte s'alignent. |
| **Liste de preuves** | `views/accueil/sections/Preuves` | Volontairement **pas** des cartes : une preuve n'est pas une surface autonome mais un fait rattaché à une offre. Un filet d'accent de 1 px et un retrait suffisent à la délimiter. |
| **Panneau d'appel à l'action** | `views/accueil/sections/AppelContact` | Bloc sur `--color-accent-soft`, arrondi en `--radius-lg`, fermant la page. Ne contient qu'un seul lien, et il est `primary`. |
| **Chaîne** | `views/accueil/sections/Chaine` | `ol` en `grid` `auto-fit` : quatre maillons surélevés sur le dégradé de profondeur. L'ordre est l'information, d'où la liste **ordonnée**. |
| **Chemin d'étapes** | `views/accueil/sections/PointsEntree` | `ol` de pastilles reliées par un filet. Le filet est un `::after` au `content` **vide** : purement décoratif, jamais restitué. |
| **Constat en deux colonnes** | `views/accueil/sections/Pourquoi` | Panneau de profondeur, deux colonnes strictement symétriques. Aucun lien à l'intérieur. |

### Le motif de profondeur

La direction artistique demande de la **tridimensionnalité**, obtenue en **élévation et
en couches** — jamais en 3D. Une bibliothèque WebGL coûterait 150 à 600 ko et ferait de
ce site la contre-démonstration de ce qu'il vend : la profondeur est donc entièrement
en CSS, sans une ligne de JavaScript ni une dépendance.

Quatre procédés, et rien d'autre :

| Procédé | Jetons | Où |
|---------|--------|-----|
| Dégradé de bleu profond | `--gradient-depth` | maillons de la chaîne, panneau du constat |
| Ombre portée franche | `--shadow-lg`, `--shadow-xl` | les mêmes, plus les cartes d'offre et les points d'entrée |
| Décalage au survol | `--elevation-lift` | toute surface surélevée |
| Couches de fond alternées | `tone="muted"` de `Section` | rythme vertical de la page |

Deux règles tiennent ce motif :

- **La profondeur bleutée marque ce qui explique, pas ce qui fait agir.** La chaîne et
  le constat sont sur le dégradé ; les points d'entrée et les offres, qui portent les
  liens, restent sur `--color-surface`. Un lien sur le dégradé demanderait un cinquième
  jeu de couleurs (lien, survol, anneau de focus) pour un gain nul.
- **Le décalage se déclenche aussi au clavier.** Partout où une surface se soulève au
  survol, elle se soulève également en `:focus-within` : un visiteur au clavier voit la
  même carte se détacher qu'un visiteur à la souris.

Le mouvement réduit est traité **à la source** : les transitions sont exprimées avec
`--transition-base`, que `globals.css` passe à `0s` sous
`prefers-reduced-motion: reduce`. Le décalage devient alors instantané — plus rien ne
s'anime, sans sélecteur universel ni `!important`. C'est le bénéfice direct de la règle
« aucune valeur en dur » : il n'y a pas eu une seule animation à retrouver pour la
neutraliser.

L'élévation des cartes d'offre est appliquée depuis `offres.module.css` via la prop
`className` de `Card`, et **non** dans `Card` elle-même : la profondeur est un motif de
la page d'accueil, pas une propriété du composant partagé. Une carte de formulaire ou de
page d'offre n'a aucune raison de se soulever.

Deux contraintes du **panneau d'appel à l'action** viennent d'une **mesure**, pas d'un
goût :

- Il ne porte **aucun filet**. `--color-border` sur `--color-accent-soft` ne contraste
  qu'à **1.19:1** (thème clair) : la bordure serait invisible.
- Il n'accueille **pas** de lien `secondary`. Au survol, un lien secondaire prend
  précisément `--color-accent-soft` comme fond — il disparaîtrait dans le panneau.

Les combinaisons de couleurs introduites par ces motifs sont inscrites dans
`@shared/config/contrast-pairs.ts` et mesurées dans
[`accessibility.md`](./accessibility.md) : trois par le panneau d'appel à l'action
(`text-muted` / `accent-soft`, `accent-hover` / `accent-soft`, `focus` / `accent-soft`),
quatre par le motif de profondeur (`depth-text` et `depth-text-muted`, chacun contre les
deux bornes du dégradé).

**Pourquoi deux bornes suffisent à couvrir un dégradé.** Un ratio ne se calcule que
contre une couleur unie ; un dégradé en présente une infinité. `--color-depth-bottom`
est plus sombre que `--color-depth-top` **sur les trois canaux** : toute couleur
intermédiaire a donc une luminance comprise entre celles des deux bornes, et le ratio
avec un avant-plan clair est encadré par les deux ratios mesurés. Vérifier les bornes
vérifie tout le dégradé. Cet ordonnancement canal par canal est la condition de la
démonstration : le jour où une borne est retouchée, c'est lui qu'il faut revérifier
d'abord.

### Libellés de liens répétés

Trois cartes voisines menant à trois pages différentes ne peuvent pas afficher trois fois
le même libellé : restitués hors contexte, les liens deviendraient indiscernables
(WCAG 2.4.4). Le libellé est donc composé à partir des données — une amorce portée par le
contenu (`libelleLien`) suivie du titre de l'offre — ce qui donne « Voir l'offre
Ingénierie Web », « Voir l'offre Data & IA », « Voir l'offre SEO / SEA ».

## Ajouter un jeton ou un composant

1. Le jeton se déclare dans `tokens.css`, **dans les deux thèmes** — les deux blocs
   doivent porter exactement le même jeu de jetons de couleur.
2. Si le jeton introduit une nouvelle combinaison texte/fond ou bordure/fond, l'ajouter
   à `@shared/config/contrast-pairs.ts`. C'est cet inventaire qui rend le contrôle de
   contraste automatisable plutôt que déclaratif.
3. Le composant va dans son dossier PascalCase avec son module CSS ; s'il lit autre chose
   que ses props, il va dans `_notPure/`.
4. Aucune valeur en dur : si le jeton nécessaire n'existe pas, c'est lui qu'il faut
   ajouter, pas la valeur.
