# Design & UI

Direction retenue : **« L'Établi »**. Le site est un plan de travail vu à travers des
panneaux de verre — on voit littéralement au travers parce qu'il n'y a rien à cacher,
ni chaîne de prestataires ni couche commerciale. Les quatre pôles ne sont pas quatre
offres côte à côte au catalogue, et ce n'est pas non plus une file de quatre maillons :
ce sont des plaques teintées chacune par sa propre teinte, dont les deux dernières —
l'IA et le SEA & UX — sont écartées **côte à côte**, à égalité. Un seul filet vertical
les traverse toutes : l'interlocuteur unique.

Le verre ne réfracte **jamais du texte**, seulement le fond d'atelier (dégradé + trame
technique). La transparence reste visible, la lisibilité reste intacte : c'est
exactement l'arbitrage que le site vend, appliqué à lui-même.

## Principes

- **Cohérence** : composants réutilisables, jetons de design centralisés dans
  [`src/app/globals.css`](../src/app/globals.css). Aucune couleur, aucun espacement,
  aucune taille en dur dans un composant.
- **Responsive** : mobile-first. Le verre réfractant est un **enrichissement desktop**,
  jamais un prérequis de lecture. La scène des quatre dalles, elle, est du SVG : elle
  s'affiche partout, au même coût sur un téléphone et sur un poste de travail.
- **Thème** : clair et sombre, via `prefers-color-scheme`. Les deux palettes sont
  complètes et vérifiées en contraste — aucune couleur n'est définie dans un seul thème.

## Bibliothèque UI

Aucune bibliothèque de composants. Le site est une vitrine de six écrans : importer un
système entier coûterait plus en poids et en contraintes qu'il ne ferait gagner.

| Choix | Notes |
|-------|-------|
| Composants maison | `src/@shared/components/` (transverse) et `src/@vitrine/components/` (éditorial) |

**Aucune dépendance d'effet visuel.** Le verre est du CSS — voir « Le verre » plus bas
pour les deux bibliothèques essayées et écartées, et pourquoi.

## Stratégie de style

**CSS Modules** : un `*.module.css` co-localisé avec chaque composant, classes en
français, valeurs issues des jetons. **Sans exception** : la classe globale
`.glass-surface` a disparu avec liquidGL, qui retrouvait ses lentilles par un sélecteur
littéral et n'aurait jamais lu un nom haché. Plus aucune classe globale n'existe sur le
site, et aucune n'est autorisée.

## Breakpoints

| Nom | Largeur | Usage |
|-----|---------|-------|
| `720px` | mobile / tablette | l'en-tête passe en colonne ; la barre de pôle repasse dans le flux ; le rembourrage des panneaux de verre se resserre |
| `900px` | tablette | le décalage en diagonale du schéma de chaîne est supprimé |
| `1024px` | desktop | flou des **bandes collantes** ; **réfraction** des panneaux (Blink seul) ; le pied de page passe de deux à quatre colonnes |

**Le flou des panneaux n'a plus de seuil ; leur réfraction en a un.** Les deux ne se
confondent pas : le flou est le verre lui-même et il est servi partout, la réfraction est
un enrichissement desktop qui coûtait un point de budget sur mobile pour un écart de
2/255 — voir « La réfraction » plus bas.

**Le flou des panneaux, donc, n'a plus de seuil.** Il en avait un — 1024px — pour deux raisons
qui appartenaient toutes deux à liquidGL : Safari devenait instable dès qu'une lentille
dépassait la moitié du viewport, et le flou promettait une couche GPU pour un mouvement
qui n'arrivait jamais sur un petit écran. La bibliothèque partie, il ne reste qu'un
`backdrop-filter` sur une surface **immobile**, que le navigateur compose une fois. Les
téléphones l'ont donc désormais, et c'est le gain le plus visible de ce lot : le verre
était jusqu'ici absent pour la majorité des visiteurs.

Les **bandes collantes** gardent le seuil, pour une raison qui n'a rien à voir avec
liquidGL : une bande `sticky` pleine largeur est reflouée à **chaque image de
défilement**, puisque ce qui passe dessous change en permanence. C'est le cas d'école du
jank au défilement, sur les appareils qui en ont le moins les moyens. Sous 1024px les
deux bandes sont donc **opaques** — jamais translucides sans flou, ce qui laisserait
passer un fantôme de texte.

## Jetons

Valeurs réelles dans [`globals.css`](../src/app/globals.css). Les ratios de contraste
ci-dessous sont ceux des couples texte/fond effectivement utilisés.

### Couleurs — thème clair

| Jeton | Valeur | Usage | Contraste sur `--fond` |
|-------|--------|-------|------------------------|
| `--fond` | `#F2EFE8` | fond de page, papier chaud | — |
| `--fond-creux` | `#E7E2D7` | bandes de section en retrait | — |
| `--encre` | `#14171A` | texte courant et titres | 15.67:1 |
| `--encre-douce` | `#4A5157` | texte secondaire, chapôs | 7.02:1 |
| `--cuivre` | `#8F4520` | teinte de marque, et teinte du pôle « ingénierie web » | 6.02:1 |
| `--cuivre-vif` | `#B4623A` | **non-texte uniquement** : filets, arêtes | 3.85:1 |
| `--signal` | `#1F5F52` | **la décision, et rien d'autre** — voir plus bas | 6.49:1 |

### Couleurs — thème sombre

| Jeton | Valeur | Contraste sur `--fond` |
|-------|--------|------------------------|
| `--fond` | `#0E1114` | — |
| `--encre` | `#ECE7DE` (jamais `#FFF`) | 15.38:1 |
| `--encre-douce` | `#9BA3AA` | 7.41:1 |
| `--cuivre` | `#E08B4C` | 7.18:1 |
| `--cuivre-vif` | `#F0A468` | 9.21:1 |
| `--signal` | `#5FD1AE` | 10.12:1 |

### Une teinte par pôle

La couleur porte une **information** : le pôle qu'on est en train de lire. Le mécanisme
tient en trois lignes, dans [`poles.css`](../src/app/poles.css) :

1. une page ou une section de pôle pose `data-pole="<id>"` ;
2. un bloc CSS mappe `--accent` et `--accent-vif` sur la teinte de ce pôle ;
3. **aucun composant ne connaît la couleur d'un pôle** — les dix-huit modules CSS du
   site ne consomment que `--accent` et `--accent-vif`.

Hors de tout `data-pole` — accueil, blog, en-tête, pied de page — `--accent` vaut le
cuivre : la teinte de marque, qui est aussi celle du socle.

Trois endroits posent `data-pole` : la page de pôle
([`PolePageView`](../src/@vitrine/views/PolePageView/index.tsx)), chaque maillon du
schéma de la chaîne ([`ChainDiagram`](../src/@vitrine/components/ChainDiagram/index.tsx)),
et chaque entrée du menu ([`SiteHeader`](../src/@shared/components/SiteHeader/index.tsx)) —
l'en-tête devient ainsi la légende de la palette.

#### Le choix des teintes

Les quatre teintes sont posées en **OKLCH**, sur une seule clarté et une seule chroma par
variante : **seule la teinte change**. C'est ce qui interdit de lire une progression là où
il n'y en a pas — en particulier entre l'IA et le SEA & UX, qui sont deux branches
**parallèles** de la donnée et non deux étapes successives (`CLAUDE.md`). Deux couleurs
d'éclat différent auraient affirmé dans le pixel un ordre que le modèle nie.

| Pôle | Place | Teinte OKLCH | Lecture |
|------|-------|--------------|---------|
| Ingénierie web | socle, temps 1 | h ≈ 45 — cuivre | inchangée : c'est la couleur de la maison |
| Data | passage, temps 2 | h = 215 — bleu d'encre | le tronc refroidit en passant du construire au mesurer |
| IA | suite, temps 3 | h = 300 — violet | à **+85°** du bleu de la donnée |
| SEA & UX | suite, temps 3 | h = 130 — vert | à **−85°** du bleu de la donnée |

Les deux suites sont **équidistantes** de la teinte de leur parent, à clarté et chroma
strictement égales : la branche ne progresse pas, elle se dédouble.

#### Contraste — les 16 valeurs, mesurées

Luminance relative WCAG 2.x, calculée sur les valeurs sRGB effectives. **Aucune n'est
arrondie ni estimée.**

| Pôle | `--accent` clair | `--accent-vif` clair | `--accent` sombre | `--accent-vif` sombre |
|------|------------------|----------------------|-------------------|-----------------------|
| Ingénierie web | `#8F4520` — **6.02:1** | `#B4623A` — **3.85:1** | `#E08B4C` — **7.18:1** | `#F0A468` — **9.21:1** |
| Data | `#00697B` — **5.53:1** | `#008AA1` — **3.55:1** | `#01B6D4` — **7.79:1** | `#48CBE7` — **9.89:1** |
| IA | `#674D91` — **6.00:1** | `#8669B7` — **3.88:1** | `#AF8FE8` — **7.14:1** | `#C3A6F8` — **9.14:1** |
| SEA & UX | `#48691D` — **5.52:1** | `#638937` — **3.54:1** | `#87B357` — **7.77:1** | `#9FC774` — **9.83:1** |

- **`--accent` porte du texte** : seuil 4.5:1. Les huit valeurs le passent, la plus basse
  à 5.52:1 (SEA & UX en thème clair).
- **`--accent-vif` ne porte JAMAIS de texte** : seuil non-texte 3:1. Les quatre valeurs
  claires sont entre 3.54:1 et 3.88:1 — au-dessus de 3:1, **sous** 4.5:1. C'est la même
  règle que celle qui s'appliquait déjà au cuivre vif, étendue aux quatre pôles : filets,
  arêtes, liserés, jamais un mot.
- En thème sombre, les seize valeurs dépassent 7:1 : aucune contrainte n'y est tendue.

#### Ce que la palette ne résout pas

Le bleu de la donnée est la seule teinte dont la **chroma est bridée par le gamut sRGB**
en thème clair : 0.084 au lieu des 0.110 des trois autres. Le cyan profond n'existe pas
plus saturé à cette clarté. La conséquence est visible — la donnée paraît légèrement
moins colorée que ses voisines sur fond clair — et elle est assumée : baisser les trois
autres à 0.084 aurait éteint toute la palette pour aligner une seule teinte.

Le **daltonisme** est la limite réelle de cette issue, et elle mérite d'être dite en
clair. Quatre teintes à clarté et chroma égales ne peuvent pas rester toutes
distinguables entre elles sous une vision dichromate : c'est une propriété de l'espace
des couleurs, pas un défaut d'implémentation. Le choix a donc porté sur la paire qui
compte le plus — les deux sœurs :

| Paire | Protanopie | Deutéranopie | Tritanopie |
|-------|-----------|--------------|------------|
| IA / SEA & UX (retenue, h 300 / 130) | ΔE 0.199 | ΔE 0.180 | ΔE 0.024 |
| *cyan / magenta voisins (écartée, h 210 / 320)* | *ΔE 0.061* | *ΔE 0.003* | *ΔE 0.115* |

ΔE en OKLab, simulation Viénot 1999. La paire voisine — celle qui aurait le mieux dit
« même famille chromatique » — rend les deux suites **strictement identiques** pour une
deutéranopie, qui touche environ 5 % des hommes. La paire retenue les sépare franchement
sur les deux formes courantes de daltonisme, et faiblement sur la tritanopie, qui touche
moins de 0.01 % de la population. Le prix payé est un écart de teinte plus large que
l'idéal esthétique.

Dans tous les cas, **la couleur n'est jamais le seul porteur d'information** (WCAG 1.4.1) :
chaque pôle porte aussi son nom, son libellé de place et son temps.

> **À trancher par Jérôme MARICHEZ.** Si l'écart de teinte entre l'IA et le SEA & UX
> paraît trop large à l'œil, l'alternative est documentée ci-dessus, avec son coût exact.

### `--signal` : la décision, et rien d'autre

`--signal` n'est pas une couleur d'ambiance. Il marque **la ligne « vous tranchez »**,
partout où un bloc éditorial en porte une (`decision:` dans les contenus — une trentaine
d'occurrences), et le **témoin de mise en pause** du `MotionToggle`. Trois emplois, une
seule idée : *ici, une décision*.

| Où | Forme |
|----|-------|
| `ExpertiseBlock` | filet vertical à gauche du bloc de décision |
| `ThreadSection` | l'étiquette « Vous tranchez » |
| `MotionToggle` | la pastille de l'animation active |

La **ligne de preuve** ne le porte plus : elle prend `--accent`. Une couleur qui sert à
deux choses ne sert plus à rien.

### Verre et élévation

Le flou du verre était écrit en dur dans trois modules, et les ombres du site étaient
quatre littéraux différents. Tout est en jetons dans [`verre.css`](../src/app/verre.css).

**Le voile n'est pas le flou.** Deux réglages indépendants font une surface de verre : le
flou de ce qui passe derrière, et la part de fond opaque mélangée à la teinte.

**Le suffixe dit la surface, et l'absence de suffixe dit le panneau.** Un panneau et une
bande ne peuvent pas partager un réglage : un panneau est posé sur un décor et doit s'y
enfoncer, une bande couvre l'écran et ce qui passe dessous est du **texte**. Au réglage
d'un panneau, ce texte ressortirait en traînée colorée sous l'en-tête.

| Jeton | Valeur | Où |
|-------|--------|-----|
| `--verre-flou` | `22px` | les panneaux, à toutes les largeurs. En dessous de 22px, le verre se lit comme un calque translucide posé sur la trame, pas comme une épaisseur |
| `--verre-saturation` | `1.7` | les panneaux. C'est la « vibrancy » : ce qui passe derrière ressort plus coloré qu'il n'entre — le réglage qui distingue un verre d'Apple d'un simple dépoli |
| `--verre-flou-bande` | `14px` | les deux bandes collantes, au-delà de 1024px |
| `--verre-saturation-bande` | `1.1` | les bandes : ce qui passe dessous est du texte, pas un décor |
| `--verre-teinte-part` | `8%` (clair) / `13%` (sombre) | part d'`--accent` lavée dans le **haut** du panneau, éteinte avant la moitié. Le verre prend la couleur du pôle qu'il porte |
| `--verre-epaisseur` | `1px` | l'arête d'un panneau, le filet d'une bande |
| `--verre-epaisseur-lueur` | `1px` | l'arête spéculaire, à l'intérieur |
| `--verre-rebond` | `rgba(255,255,255,.3)` / `.1` en sombre | la lumière du papier qui remonte sous la tranche basse. Toujours plus faible que `--verre-lueur`, sinon le panneau se lit comme un cadre |
| `--verre-ombre` | `0 22px 45px -30px` | ombre basse et très étalée : le panneau flotte de peu. Un rayon court et sombre en ferait une carte |
| `--verre-voile` | `55%` | panneaux **sans** `backdrop-filter` : la trame doit rester visible |
| `--verre-voile-bande` | `88%` | en-tête du site |
| `--verre-voile-barre` | `82%` | barre de pôle |

L'**échelle d'élévation** compte trois crans, dans l'ordre, et pas un de plus — un cran
sans emploi serait un jeton mort, exactement le défaut corrigé ici :

| Jeton | Sens | Où |
|-------|------|-----|
| `--elevation-creuse` | un creux **dans** le papier | la plaque de logo d'une certification |
| `--elevation-posee` | posé **sur** le papier : la lueur d'arête d'une surface au repos | les plaques de la chaîne, le bloc de contact |
| `--elevation-levee` | **au-dessus** : la seule vraie ombre portée du site, teintée par `--accent` | une action sous la main |

Le **panneau de verre ne prend aucun de ces trois crans** : son relief n'est pas une
élévation, c'est une propriété du matériau. Arête spéculaire haute, rebond bas et ombre
portée basse sont trois choses distinctes que le panneau compose lui-même, à partir de
`--verre-lueur`, `--verre-rebond` et `--verre-ombre`.

**L'arête spéculaire est un dégradé masqué en anneau, pas un `box-shadow: inset`.** Un
`inset 0 1px 0` poserait un trait d'épaisseur constante sur toute la largeur, angles
arrondis compris, là où il n'a rien à faire. L'anneau (`mask-composite: exclude`) suit
exactement le `border-radius` et s'éteint au milieu de la hauteur : la lumière vient
d'au-dessus, la tranche basse ne fait que renvoyer le papier.

**Sept surfaces consomment ces jetons** hors des panneaux de verre : `SiteHeader`,
`PoleStickyBar`, `ChainDiagram`, `HomeView` (`.contact`), `ThreadSection`,
`CertificationList`, `SlabScene`. C'est la condition pour qu'un réglage du verre les
emmène ensemble au lieu d'en laisser six derrière.

### Typographie

Deux familles chargées par `next/font/google` — donc auto-hébergées au build : aucune
requête vers `fonts.googleapis.com`, rien à déclarer côté RGPD. La troisième est servie
par la pile système, pour zéro octet. C'est un budget autant qu'un parti pris : chaque
fonte préchargée est un fichier que le navigateur va chercher avant de peindre le texte.

| Rôle | Famille | Notes |
|------|---------|-------|
| Titres | **Fraunces** (variable) | Axe `opsz` seul. `SOFT` et `WONK` valent zéro par défaut : les demander pour les neutraliser embarquait 60 ko dans le chemin critique sans changer le rendu |
| Corps | **Inter** (variable) | `'ss01' 1, 'cv05' 1` |
| Annotations et chiffres | **pile monospace système** | Ce registre est intégralement composé en capitales espacées, où le dessin propre à une fonte de labeur ne se distingue pas. `ui-monospace` prend SF Mono sur Apple ; tous les replis ont les chiffres à chasse fixe, seule vraie exigence des preuves |

Échelle fluide en `clamp()`, base 16px : `--t--1` (13px) à `--t-4` (34→52px), plus
`--t-note` (15px) et `--t-chiffre` (40→64px) pour le mur de preuves. Mesures : 64ch sur
le corps, 30ch sur les `h2`, 18ch sur le `h1`, 46ch dans un panneau de verre.

`--t-note` n'est pas un cran de confort : sept modules écrivaient `0.9375rem` en dur —
menus, repères de charnière, notes de bas de section. Un demi-cran manquait à l'échelle,
et chacun le réinventait chez lui.

L'**interlettrage** est un jeton, jamais une valeur locale. Une fonte de titre se
resserre à mesure qu'elle grandit — à 68 px, l'approche dessinée pour du labeur laisse
des trous entre les lettres ; les étiquettes font l'inverse, capitales de 13 px qui ont
besoin d'air.

| Jeton | Valeur | Où |
|-------|--------|-----|
| `--suivi-display` | `-0.028em` | `h1` |
| `--suivi-titre` | `-0.016em` | `h2`, `h3` |
| `--suivi-etiquette` | `0.09em` | kickers, rangs, tout le registre monospace en capitales |

### Espaces et formes

Rythme vertical sur base 8 : `--e-0` (4px) à `--e-7` (136px). `--rayon-verre` 18px,
`--rayon-petit` 8px, `--largeur-page` 76rem.

Trois jetons tiennent l'empilement collant, et un seul endroit les déclare :

| Jeton | Rôle |
|-------|------|
| `--hauteur-entete` | hauteur nominale de l'en-tête. Volontairement **2 à 3 px sous** la hauteur réelle : la barre de pôle se glisse dessous plutôt que de laisser voir une bande de contenu défiler entre les deux. `SiteHeader` pose le `min-height` correspondant, pour que l'en-tête ne puisse jamais devenir plus court que son jeton |
| `--hauteur-barre-pole` | hauteur de l'en-tête de pôle collant |
| `--decalage-ancre` | `scroll-margin-top` de toute section ancrable. Les pages de pôle le redéfinissent localement : deux bandes collantes, donc deux hauteurs à déduire |

### Le fond d'atelier

`.fond-atelier` est un calque peint, séparé du contenu — c'est ce que le verre floute, et
il fait plus de 9 000 px de haut sur l'accueil. **Tout ce qu'on y pose doit être une
tuile.** Un `repeating-linear-gradient` sans `background-size` est généré une fois aux
dimensions de son élément, soit ici plus de 9 000 px de haut.

Il est en `absolute` et non `fixed`, donc haut comme le **document** : un fond fixe ne
défilerait pas derrière les panneaux, et le verre n'aurait rien à montrer qui bouge.

| Calque | Tuile | Rôle |
|--------|-------|------|
| grain (`--grain`) | 128px | `feTurbulence` en data-URI, alpha moyen **sous 4 %**. Deux tuiles, une par thème : du grain noir sur un fond à 6 % de luminance ne se voit pas, il ne fait qu'assombrir |
| trame | 32px | deux filets `--trame`, la grille technique |
| dégradé | plein élément | `radial-gradient`, la lueur d'atelier |

Le grain est volontairement **une tuile de plus, et pas un filtre** : `filter: invert()`
sur ce calque pour l'adapter au thème sombre forcerait une couche de compositing de la
hauteur du document. Sous 4 % d'alpha, aucun couple texte/fond documenté ci-dessus ne
descend sous son seuil AA — et l'audit de contraste n'est de toute façon pas concerné,
le calque étant un frère du contenu, pas son ancêtre.

## Mouvement

Le mouvement sert la lecture ou il n'existe pas. **Pas** de défilement détourné (ni
Lenis ni Locomotive), pas de compteur qui s'incrémente, pas de parallaxe, pas de curseur
personnalisé.

| Geste | Où | Détail |
|-------|-----|--------|
| **Poser** | toute section qui entre dans l'écran | `opacity: 0` → `1` et `translateY(24px)` → `none`, `--duree-poser`. Porté par [`Reveal`](../src/@shared/components/Reveal/index.tsx), qui s'appuie sur `useInViewport` — voir « La révélation » ci-dessous |
| **Tracer** | les deux charnières | filet cuivre 2px, `scaleY(0)` → `scaleY(1)`, `--duree-tracer`. Seul mouvement porteur de sens : la chaîne se trace. Déclenché à l'entrée de la charnière dans l'écran, et non au chargement de la page |
| **Traverser** | le fil IA | filets cuivre **horizontaux**, `scaleX(0)` → `scaleX(1)`, même durée, même déclenchement. Perpendiculaires à ceux des charnières : la chaîne descend, le fil la coupe — la géométrie dit « ceci n'est pas une quatrième offre » |
| **Dériver** | la scène des quatre dalles | deux fréquences lentes qui ne se referment jamais ensemble, en `transform` seul — assez pour faire lire du volume, jamais assez pour appeler le regard. Le filet de tenue en est **exclu** : ce qui tient ne dérive pas |
| **Aimanter** | les boutons d'action | le bouton suit le pointeur, borné à **6 px** ([`utils/aimant.ts`](../src/utils/aimant.ts)), en `transform` seul. Souris uniquement : au doigt il n'y a pas de survol, l'attraction n'arriverait qu'après l'appui. `MagneticAction` est le **seul** module autorisé à poser un `transform` sur un bouton — deux règles concurrentes se départageraient à l'ordre du paquet CSS |
| **Micro-états** | liens et boutons | épaisseur de soulignement, `--aimant-appui: -1px` au survol, `--duree-micro` — aucun déplacement de mise en page |

Seuls `transform` et `opacity` sont animés, nulle part ailleurs. Ce sont les deux
propriétés que le compositeur traite sans repasser par la mise en page ni par le peintre,
donc les deux seules qui tiennent 60 images par seconde sur un téléphone.

Sous `prefers-reduced-motion: reduce` : les animations CSS sont coupées et la scène est
rendue **figée** — les dalles gardent leur pose. **Le verre, lui, n'est pas concerné** :
il ne bouge pas. Un `backdrop-filter` est une propriété de peinture, pas une animation ;
le couper sous mouvement réduit retirerait une qualité visuelle sans rien apporter à
personne. C'est la boucle de rendu permanente de liquidGL qui était une animation, pas le
verre.

Le bouton `MotionToggle` offre le même arrêt depuis la page, comme l'exige WCAG 2.2.2 :
une préférence système n'est pas un mécanisme de mise en pause, elle ne se change pas
depuis le site. Il est rendu par le **pied de page**, donc par la mise en page racine,
donc sur **toute page** — accueil, les quatre pôles, le blog. Il n'existait auparavant que
dans `HomeHero` : une page de pôle révélait ses sections au défilement sans offrir nulle
part le moyen d'arrêter ça. L'accueil en porte donc deux, et c'est voulu — les deux lisent
le même magasin, mais celui du seuil est au pied de la scène, là où le mouvement se voit.

Tout ce qui est encore en attente se pose alors **sans transition** : figer l'animation et
voir douze sections glisser en réponse à son propre clic serait la contradiction exacte de
ce que le bouton promet.

### La révélation

Une révélation au défilement se paie normalement de deux défauts, et [`Reveal`](../src/@shared/components/Reveal/index.tsx)
n'en accepte aucun :

- **Rien n'est masqué au rendu serveur.** L'état caché n'est armé qu'après montage. Sans
  JavaScript — ou si l'hydratation échoue — la page reste entièrement lisible. Une
  révélation qui laisse du contenu à `opacity: 0` n'est pas un effet, c'est une panne, et
  elle est invisible à celui qui l'écrit.
- **Ce qui est déjà à l'écran n'est jamais caché puis remontré.** Au montage, seul ce qui
  est *sous la ligne de flottaison* est armé. C'est le clignotement typique des
  révélations au défilement, et il frappe d'abord le premier écran.

L'état posé ne déclare **aucun** `transform` — pas même l'identité. Un
`translate3d(0, 0, 0)` résiduel créerait sur chaque section un contexte d'empilement et
une couche de compositing **permanents**, pour une animation qui ne dure que le temps de
l'arrivée : sur l'accueil, une douzaine de couches promises au GPU jusqu'à la fin de la
visite.

**La révélation enveloppe le corps d'une section, jamais la section elle-même**, et cette
règle paie deux fois :

- une section **vitrée** joue ainsi sa révélation *à l'intérieur* du panneau, sur son
  contenu, pendant que le verre reste immobile. Un panneau qui glisserait entraînerait son
  `backdrop-filter` avec lui, et le navigateur recalculerait le flou à chaque image de la
  transition ;
- une section **ancrable** ne bouge pas. Un `transform` sur l'élément que vise une ancre
  décale la cible du `scrollIntoView` de la hauteur de la révélation : la section se pose
  ensuite 24 px plus haut, et arrive sous l'en-tête. Les cinq sections ancrables de
  l'accueil gardent donc leur `<section>` — identifiant et `scroll-margin-top` — et la
  révélation passe à l'intérieur.

Les charnières et le fil font exception : ce sont les seules révélations qui *sont* leur
section, parce que le filet qui se trace est un `::before` de la section. Aucun lien ne
pointe vers leur identifiant, et un lien profond arrivant de l'extérieur est exact de
toute façon — le navigateur défile avant que React ne monte, donc la cible est déjà à
l'écran et la révélation ne s'arme pas.

## Les bandes collantes

Deux bandes s'empilent en haut d'une page de pôle : l'en-tête du site, puis
l'**en-tête de pôle** ([`PoleStickyBar`](../src/@vitrine/components/PoleStickyBar/index.tsx)).
Une page de pôle se lit sur plusieurs écrans ; passé le seuil, plus rien ne disait lequel
des pôles on lisait, et l'action de contact était restée en bas.

| Contrainte | Parade |
|------------|--------|
| Une bande `sticky` est **reflouée à chaque image** de défilement : ce qui passe dessous change en permanence | Flou **au-delà de 1024px seulement** — même recette pour les deux. C'est la seule surface du site où le seuil de largeur a encore un sens, et il n'a rien à voir avec l'ancien seuil de liquidGL |
| Sans flou, la translucidité laisse passer un **fantôme de texte** | En dessous de 1024px, la bande est **opaque**. La transparence du site est celle du verre, et le verre floute ; là où le flou n'est pas payé, la bande est pleine |
| Ce qui passe dessous est du **texte**, pas un décor | Jetons de bande, jamais de panneau : `--verre-flou-bande` (14px) et `--verre-saturation-bande` (1.1). Au réglage d'un panneau — 22px et 1.7 — le texte ressortirait en traînée colorée |
| L'en-tête est bien plus haut sous 720px (il passe en colonne) | La barre de pôle y reste **dans le flux**. Deux bandes collantes sur un téléphone prendraient la place de ce qu'elles annoncent |
| Une ancre ne doit pas se poser sous les bandes | `--decalage-ancre`, redéfini localement sur la page de pôle |

La barre consomme **`--accent`**, la teinte du pôle courant, posée par `data-pole` sur la
page. Aucun composant ne connaît la couleur d'un pôle : il ne connaît que `--accent`. Elle
consomme aussi `--verre-voile-barre`, `--verre-flou-bande` et `--verre-saturation-bande` :
son fond n'a plus une seule valeur qui lui soit propre.

## Le verre

Le verre est du **CSS**, dans un seul fichier :
[`GlassSurface/glass-surface.module.css`](../src/@shared/components/GlassSurface/glass-surface.module.css).
Rien à amorcer, rien à charger, rien à démonter, aucun seuil de largeur. Il est là au
premier octet de HTML servi, identique avec et sans JavaScript.

**Le contenu est DANS le verre.** `GlassSurface` est le conteneur de son contenu et se
dimensionne dessus. Le contrat précédent était l'inverse — une div vide posée *derrière*
le texte — et ce n'était pas un choix de design : liquidGL mutait l'élément dont il
faisait une lentille (`opacity: 0`, puis `pointer-events: none` jamais restauré) et
effaçait son `background` en styles en ligne. Le calque vide était une parade ; la
bibliothèque partie, la parade n'a plus d'objet.

Ce que le retour au conteneur rend possible : le panneau prend la hauteur de son texte au
lieu de la deviner, le rembourrage est une propriété du verre, et il n'y a plus deux
éléments à garder de la même taille. **Plus aucun cran d'empilement n'est à tenir** :
`::before` précède le contenu dans l'arbre, donc le texte passe au-dessus de l'arête sans
qu'aucun `z-index` ne soit déclaré. Le `main { position: static }` de `globals.css` et les
trois `z-index` qui l'accompagnaient ont disparu avec la bibliothèque qui les exigeait.

### La recette

| Couche | Ce qu'elle fait |
|--------|-----------------|
| `backdrop-filter: blur(22px) saturate(1.7)` | l'épaisseur et la « vibrancy ». La trame de 32px est effacée *à l'intérieur* du panneau et reste nette dehors : c'est ce contraste qui fait lire du verre épais plutôt qu'un calque translucide |
| lavis d'`--accent`, éteint avant la moitié | le verre prend la couleur du pôle qu'il porte. Une teinte uniforme se lirait comme un fond coloré ; une teinte qui décroît se lit comme de la lumière prise par la tranche haute |
| arête spéculaire (`::before` masqué en anneau) | vive en haut, éteinte au milieu, rebond faible en bas. Elle suit le `border-radius`, ce qu'un `box-shadow: inset` ne sait pas faire |
| `--verre-ombre`, basse et très étalée | le panneau flotte de peu. Un rayon court et sombre en ferait une carte |
| réfraction SVG (`--verre-refraction`), ≥ 1024px, Blink seul | l'épaisseur prend une **forme** : au ras de l'arête, le verre va chercher son image un peu plus loin vers le dedans. Mesurée à 2/255 sur ce fond — voir « La réfraction » |
| repli `@supports` | là où `backdrop-filter` manque, le voile opaque `--verre-voile` reprend la garantie de contraste du texte |

Le plafond de panneaux par page (`glass-policy.ts` : **1 sur l'accueil**, 3 sur une page
de pôle) est un plafond **de lecture**, et il le reste. Un panneau ne coûte plus rien à
monter ; au-delà de trois, l'effet cesse simplement d'être un signal et devient un fond.

L'accueil est passé de 3 à 1 avec l'issue #103, et ce n'est pas un réglage : le plafond
suit le nombre de sections **éditoriales réellement présentes**, et l'accueil devenu
vitrine n'en porte plus qu'une — les deux objections. Ses trois sections de pôle sont
descendues sur `/services/<pole>/`, où c'est `MAX_GLASS_PAGE_POLE` qui les vitre. La
page n'est pas pour autant sans verre : le seuil, les plaques du schéma de la chaîne et
le bloc de contact portent les mêmes jetons de surface, posés par leurs propres modules.

### Deux bibliothèques essayées, deux écartées

**liquidGL** (WebGL) a été retirée. **`liquid-glass-react`** (rdev, MIT, 33 ko gzip) a été
installée, mesurée et retirée le même jour. Elle ne peut pas rendre un panneau éditorial
pleine largeur, et le défaut est structurel, pas esthétique — mesuré sur un panneau réel
de 1164 × 282 px :

| Ce que la bibliothèque impose | Conséquence ici |
|-------------------------------|-----------------|
| `position: relative` par défaut, avec 3 calques de recouvrement **restés dans le flux** | un conteneur de **880 px** pour un panneau de 282 : trois blocs vides empilés sous lui. Le contournement est `position: absolute`, mais un panneau absolu ne peut plus être dimensionné par son contenu — et c'est exactement ce qu'on venait de regagner |
| `display: inline-flex` en style **en ligne** | le panneau se rétracte sur son contenu au lieu de tenir la largeur de la page. Un style en ligne ne se corrige que par `!important` |
| `padding: 24px 32px`, `box-shadow: rgba(0,0,0,.25) 0 12px 40px` en ligne | l'échelle d'espacement et les jetons d'élévation du site sont court-circuités, au profit d'un noir codé en dur étranger à la palette |
| `font: 500 20px/1 system-ui` et `text-shadow: rgba(0,0,0,.4) 0 2px 12px` en ligne, hérités | `line-height: 20px` **calculé sur les `h2`** du panneau, et un halo noir sur chaque texte. Sur le papier chaud du site, cela se lit comme du texte sale |
| le déplacement est piloté à la **souris**, invisible sur Safari et Firefox (le dépôt le dit lui-même) | l'effet n'existe ni au toucher, ni sur deux des quatre navigateurs cibles |

Rendre cela présentable demandait un `!important` sur huit propriétés en ligne. Ce n'est
plus consommer une bibliothèque, c'est la combattre.

Ce que le site vend étant la performance tenue, un effet payé 33 ko et visible d'un seul
navigateur ne se défend pas **sous cette forme**. La technique, elle, se défend : elle a
été réimplémentée en propre, et c'est l'objet de la section suivante.

### La réfraction : ce qu'elle coûte, ce qu'elle rend

**`feImage` + `feDisplacementMap`, deux primitives, zéro dépendance** — la même technique
que `liquid-glass-react`, en ~30 lignes de SVG rendues au serveur
([`GlassRefraction`](../src/@shared/components/GlassRefraction/index.tsx)). Le filtre est
déclaré une fois par la mise en page racine ; les panneaux le consomment par le jeton
`--verre-refraction`, jamais en écrivant `url(#…)` dans un module.

**Les artefacts en losange du premier essai ont disparu par construction, pas par
réglage.** La carte de déplacement pose un **plateau neutre au centre** — l'effet ne vit
que sur ~10 % de chaque bord, le seul endroit où un vrai verre courbe ce qu'il y a
derrière — et **échantillonne toujours vers l'intérieur** aux quatre bords. Aucun pixel ne
va donc chercher hors de la région du filtre, ce qui rend la frange impossible plutôt
qu'improbable. Vérifié sur damier haute fréquence jusqu'à six fois l'amplitude retenue.

#### Ce que la mesure dit, et elle est têtue

Écart pixel entre un panneau réfractant et le même panneau simplement flouté, sur le fond
réel, panneau de 1164 × 282 px :

| Configuration | Écart max | Moyenne |
|---|---|---|
| réfraction **avant** le flou, région élargie | **2 / 255** | 0,302 |
| réfraction **après** le flou | 1 / 255 | 0,001 |
| réfraction seule, sans flou | 17 / 255 | 1,954 |

**2 sur 255 est sous le seuil de perception**, et c'est arithmétiquement inévitable : la
trame du fond est à 5,5 % d'alpha avec un pas de 32px ; floutée à 22px elle ne pèse plus
que ~0,4 niveau, et le lavis radial varie de ~10 niveaux sur 1000px. **Un déplacement ne
crée pas du contraste qui n'existe pas.**

Un piège mérite d'être noté, parce qu'il aurait fait livrer l'inverse de ce qu'on croyait :
la variante qui « faisait le plus d'effet » (7/255) donnait **exactement les mêmes chiffres
avec un filtre identité**, qui ne fait rien. Ces sept niveaux n'étaient pas de la
réfraction mais le `blur(22px)` qui se dégradait faute de matière près des bords — la
version « visible » **abîmait** le verre. D'où la région élargie à 40 % de la boîte : il
faut au moins trois écarts-types de flou de matière autour du panneau.

#### Ce qu'elle coûte, et où elle est donc coupée

Lighthouse, mobile bridé, seuil ≥ 95 :

| Accueil | Perf |
|---|---|
| sans réfraction | 96 |
| réfraction sur toutes les largeurs | **95** — tout le reste de marge |
| réfraction ≥ 1024px (livré) | **96** — la marge est rendue |

Le seuil rend le point, et il faut dire pourquoi sans se payer de mots : **le budget est
mesuré en mobile bridé, donc il ne mesure plus la réfraction du tout.** Le coût d'un point
reste réel en desktop Blink. Ce que le seuil supprime, c'est de le faire payer à chaque
visiteur sur téléphone pour un effet qui, à ~350px de large, a encore moins à montrer que
les 2/255 du desktop.

Un point de budget pour un effet à 2/255, c'est trop cher, et **un budget pile sur le
seuil échoue en CI au tirage au sort**. La réfraction est donc **desktop seulement
(≥ 1024px)** : c'est déjà la règle posée en tête de ce document — le verre réfractant est
un enrichissement, jamais un prérequis de lecture. Sur un téléphone le panneau fait ~350px,
la rampe de 10 % n'y couvre plus que 35px, et il y a encore moins à voir qu'en desktop.
**Le seuil ne concerne que la réfraction** : le flou, lui, n'a plus de seuil et reste sur
tous les téléphones — c'est le gain du lot précédent, il n'est pas repris.

#### Le test de moteur, et pourquoi il existe

La réfraction est servie **à Blink seulement**, derrière un test de moteur explicite —
**la seule entorse de ce genre dans le projet**, et elle est assumée :

```css
@supports (backdrop-filter: url("#verre-refraction")) and
  (not (-webkit-backdrop-filter: blur(1px))) and
  (not (-moz-appearance: none))
```

`@supports` ne teste que la **grammaire**, jamais l'implémentation. WebKit et Gecko peuvent
accepter `backdrop-filter: url(…)` puis ne rien en faire — et une déclaration acceptée
**remplace** celle du dessus : ils perdraient leur flou, c'est-à-dire tout leur verre.

On ne peut pas s'en remettre à l'ordre des déclarations, et c'est un **défaut mesuré sur le
CSS livré** : Lightning CSS **synthétise le préfixe** — il écrit
`-webkit-backdrop-filter: url(…)` à l'intérieur du bloc — **et élargit la condition** en
`(-webkit-backdrop-filter: url(…)) or (backdrop-filter: url(…))`. Écrire le préfixe avant,
après ou pas du tout n'y change rien, et sur Safari 18+ les deux formes sont des alias.
C'est la **même famille que le bug de production déjà corrigé** (le minifieur ne gardant
que la dernière des deux formes), par une autre porte — et il ne se voit pas en `next dev`,
où rien n'est minifié.

Les deux sondes sont choisies pour être **vérifiables des deux côtés**, pas pour leur
exotisme. `-webkit-backdrop-filter` écarte WebKit : Blink y répond `false` (mesuré), et
Safari y répond **forcément** `true` — c'est la propriété même par laquelle le site lui
livre son flou aujourd'hui ; s'il y répondait `false`, il n'aurait déjà aucun verre.
L'exclusion de Safari n'est donc pas une supposition sur un moteur, elle est **forcée par
une propriété dont le site dépend déjà**. `-moz-appearance` écarte Gecko, `false` dans
Blink (mesuré).

**Le rendu de Safari et de Firefox reste raisonné et non observé** — l'automation Safari
est désactivée sur le poste et Firefox n'y est pas installé. C'est précisément pourquoi le
gate est construit ainsi : l'incertitude porte sur ce que ces moteurs *feraient* d'un
`url()`, et le gate fait en sorte qu'ils n'y soient jamais confrontés. Ils gardent
exactement le verre d'aujourd'hui.

Vérifié sur le CSS livré et sur la page rendue : à 412px le panneau calcule
`blur(22px) saturate(1.7)`, à 1280px `url("#verre-refraction") blur(22px) saturate(1.7)`.

**Ce qui permettrait de le retirer** : que `backdrop-filter: url()` soit rendu par les trois
moteurs, ou qu'un `@supports` sache tester le rendu et non la seule syntaxe.

`prefers-reduced-motion` et le `MotionToggle` coupent la réfraction et gardent le flou :
elle ne bouge pas d'elle-même, mais le compositeur la recalcule à chaque image où le fond
défile derrière le panneau. Les deux gardes sont indépendantes — requête média sans
JavaScript d'un côté, attribut publié sur `<html>` par
[`MotionState`](../src/@shared/components/MotionState/index.tsx) de l'autre (WCAG 2.2.2).

## La scène des quatre dalles

Quatre dalles de verre teintées et **un filet vertical qui les traverse toutes** : le
modèle de l'offre rendu en volume. Aucun texte, aucun logo, aucune particule.

La topologie est celle du `CLAUDE.md`, pas une composition libre :

```
  ┌───────────────┐      ingénierie web — temps 1, dans l'axe
  └───────────────┘
  ┌───────────────┐      data — temps 2, dans l'axe, décalée
  └───────────────┘
┌─────────┐ ┌─────────┐  IA  et  SEA & UX — temps 3, écartées côte à côte
└─────────┘ └─────────┘
        (un filet vertical descend derrière les quatre)
```

**Le point qui décide de tout** : les deux dalles du temps 3 sont des **sœurs**, jamais
une quatrième puis une cinquième étape. Même largeur, même hauteur, même dégradé, même
classe CSS, même durée d'animation ; seul un décalage vertical de 12 unités casse la
symétrie mécanique, et un décalage n'a ni premier ni second. Toute retouche de la scène
doit préserver cette égalité — c'est l'argument que le site vend.

Le **filet de tenue** est l'interlocuteur unique. Il est le seul élément **non animé** de
la scène, et le seul à ne porter aucun `data-pole` : il prend le cuivre de la racine, qui
est la couleur de la maison et non celle d'un pôle. Il descend derrière les quatre dalles
et ressort dans l'écart qui sépare les deux sœurs, là où on le lit le mieux.

Elle a d'abord été une scène WebGL (`three` + `@react-three/fiber`, ~235 ko gzip). Elle
est aujourd'hui **un SVG d'environ 1,7 ko rendu au serveur**, et le compromis n'en est pas
un : le site vend une performance tenue, il ne pouvait pas payer un moteur 3D pour un
décor. Ce qui est perdu — la réfraction physique, la rotation pilotée par le défilement —
n'était lisible par personne. Ce qui est gagné se mesure au premier chargement, et la
scène s'affiche désormais **aussi sous 1024px**, là où le WebGL n'était jamais monté.

- **Forme** : `viewBox="0 0 420 360"`, quatre rectangles arrondis et un filet de 2
  unités. [`ChainCanvas/SlabScene.tsx`](../src/@shared/components/ChainCanvas/SlabScene.tsx).
  Le rapport 7/6 se retrouve tel quel dans `chain-canvas.module.css` : les deux valeurs
  se suivent, sinon la réservation d'espace cesse de réserver la bonne place.
- **Teintes** : chaque dalle porte son `data-pole` dans le SVG, et `poles.css` lui pose
  `--accent` et `--verre-arete` dessous. **Aucune teinte de pôle n'est nommée dans le
  module CSS de la scène.** Un seul `<linearGradient>` sert les quatre dalles : son
  `currentColor` se résout sur l'élément qui *référence* le dégradé, pas sur le `<defs>`,
  donc chaque dalle le teinte avec son propre accent.
- **Mouvement** : le groupe porte une dérive d'ensemble, chaque dalle la sienne. Deux
  fréquences qui ne se referment jamais au même moment suffisent à faire lire du volume,
  là où une seule donnerait un balancement de métronome. `transform` et `opacity`
  uniquement. Le filet de tenue est hors du groupe animé et n'a pas d'animation propre.
- **Rendu** : entièrement serveur. Le seul motif restant de rendre `ChainCanvas` côté
  client est de lire le choix « animation figée » et de le passer à la scène. Plus de
  chargement différé à orchestrer, plus de détection de WebGL, plus de seuil de largeur.
- **Décor, jamais information** : le conteneur est `aria-hidden`, et la scène ne porte
  rien que le texte de la page ne dise déjà. C'est la condition pour qu'un décor animé
  soit acceptable sur un site qui vend de l'accessibilité tenue.

## Les entrées de l'accueil

L'accueil déroulait sa chaîne dans le fil du texte : on y entrait en lisant, ou par le
menu. Un visiteur qui scanne ne trouvait aucune porte. Deux composants la lui donnent, et
leur **disposition porte le modèle** plutôt que de le décrire.

### `PoleEntries` — les quatre pôles

Quatre plaques alignées à égalité diraient un catalogue, ce que le site refuse d'être. La
grille rend donc la chaîne réelle : **Ingénierie web** puis **Data** en pleine largeur —
le socle, puis le passage obligé — et **IA** et **SEA & UX** partageant une rangée,
côte à côte. Les deux suites partagent une ligne parce qu'elles partagent un temps ;
les empiler aurait réintroduit l'ordre que le modèle nie.

Chaque plaque porte `data-pole` : sa marque et son filet prennent `--accent` sans qu'aucune
règle du composant ne nomme une couleur.

### `PoleGlyph` — des marques produites, jamais trouvées

Le site n'a **aucune photographie utilisable** — ni portrait, ni capture de projet
autorisée, ni logo client. Tout visuel est donc construit, en SVG rendu au serveur :
quatre marques pèsent moins de 700 octets dans le document, là où la moindre image
matricielle ferait tomber un budget qui ne tient qu'à un point.

**Aucune de ces marques ne simule une donnée.** Un pictogramme qui mimerait un graphique —
courbe qui monte, barres qui progressent — afficherait un chiffre inventé, ce que les
règles de véracité interdisent. Ce sont des **figures de structure**, pas des
visualisations.

L'IA n'est pas dessinée par le nœud à trois entrées, c'est-à-dire le neurone : c'est le
cliché attendu, et il dirait quelque chose de faux, puisque ce pôle promet que « la
réponse n'est pas toujours un modèle ». Sa marque est un embranchement dont une branche
est retenue et l'autre écartée — la promesse, littéralement. Les deux sœurs partagent la
même grammaire de trait, même poids et même nombre de tracés : deux figures de décision de
rang égal.

### `SpaceEntries` — les deux espaces éditoriaux

Registre volontairement **plus sobre** que celui des pôles : un filet à gauche plutôt
qu'une plaque encadrée. Un espace ne se vend pas, il déplie — et la hiérarchie visuelle
doit le dire sans qu'un mot ait à l'expliquer.

Le volume annoncé est **dérivé des listes sources**, jamais écrit à la main : l'accueil ne
peut donc pas annoncer un nombre de fiches que l'espace ne tient pas. C'est la même règle
que pour les chiffres de `preuves.ts`.

## Les figures d'article

Le blog était entièrement textuel : sur `/blog/` comme sur une fiche, rien ne distinguait
un article d'un autre à l'œil. Chaque article porte désormais une **figure**
([`ArticleFigure`](../src/@vitrine/components/ArticleFigure/index.tsx)), et elle obéit à la
même doctrine que les marques de pôle — c'est ce qui fait que le blog appartient au même
site que l'accueil.

### Construite, jamais matricielle

Le site n'a **aucune image matricielle** : quatre SVG en tout, `next/image` écarté
délibérément. Une illustration d'article n'allait pas en introduire la première. Les figures
sont du **SVG rendu au serveur**, elles pèsent quelques centaines d'octets dans le
document, et le budget Lighthouse — qui ne tient qu'à un point — n'en sait rien.

Elles n'ont **aucun fichier**, ce qui a une conséquence en dehors du design : le JSON-LD
d'un article ne déclare toujours pas de champ `image`. La raison a changé — le site sert
désormais une illustration — mais il n'existe aucune ressource qu'un moteur puisse aller
chercher, et déclarer une URL qui rendrait 404 serait un mensonge de plus.

### Rien qui simule une donnée

C'est la règle des marques de pôle, appliquée mot pour mot. Le site vend la mesure : un
pictogramme qui mimerait un graphique — une courbe qui monte, des barres qui progressent —
afficherait un chiffre inventé, ce que les règles de véracité du `CLAUDE.md` interdisent.
Ce sont des **figures de structure**, pas des visualisations.

Le cas le plus tendu est celui de « Mesurer avant d'arbitrer », dont la figure est une
balance : son **fléau est strictement horizontal**, et ce n'est pas un détail de dessin. Une
balance qui penche affiche un verdict, c'est-à-dire un chiffre. Ce qui est dessiné, c'est
qu'un arbitrage repose sur une collecte — jamais lequel des deux plateaux l'emporte.

### La grammaire, reprise trait pour trait

| Signe | Sens | Où on l'a déjà vu |
|-------|------|-------------------|
| trait plein | ce qui est retenu | les quatre marques de pôle |
| trait tireté, opacité 0.65 | ce qui est écarté | `PoleGlyph` — l'IA et le SEA & UX |
| croix | une voie fermée | `PoleGlyph` — la branche écartée de l'IA |
| point plein | un aboutissement | les quatre marques de pôle |
| trait épais (2.4) | une assise | le socle de l'ingénierie web |

Une seule chose diffère, et elle corrige une lecture : **la croix n'est pas tiretée**. Ses
branches mesurent 5,1 unités, soit à peine deux tirets ; tiretées, elles ne rendent que leur
amorce et la croix se lit comme une **coche** — l'exact contraire de ce qu'elle dit. Mesuré
au rendu, pas supposé.

| Article | Figure | Ce qu'elle dessine |
|---------|--------|--------------------|
| Pourquoi ce site est un export statique | `borne` | Trois plaques écrites, un aboutissement, une ligne que rien ne franchit ; au-delà, tireté, le serveur applicatif qui n'existe plus |
| Le test avant le code, même avec un agent | `anteriorite` | Deux temps sur un axe — le point posé d'abord, la boîte ouverte ensuite ; dessous, tiretée et fermée d'une croix, la voie inverse |
| Mesurer avant d'arbitrer | `appui` | Un fléau à l'horizontale et deux plateaux identiques, la décision au sommet du mât, portés par une assise et sa trame de mesure |
| Un générateur de projets, public et personnel | `gabarit` | Une forme à trois compartiments, ouverte du côté de la sortie, et ce qui en sort : un cadre fermé, complet, jusqu'à son aboutissement |
| Le premier risque n'est pas le code, c'est l'endroit | `liaison` | Des ensembles séparés, un lieu commun plus grand qu'eux, deux liens qui portent — et un troisième, tireté, qui n'aboutit à rien |

Deux ajouts de l'issue #109 étendent la grammaire sans la contredire, et il vaut mieux
l'écrire ici que le redécouvrir :

- **Le trait tireté couvre une nuance de plus.** Sur `liaison`, « écarté » devient
  « annoncé, jamais emprunté » — la dépendance déclarée que rien n'importe. C'est le même
  sens au fond, un chemin qui n'a pas lieu ; le signe n'a donc pas eu à être dédoublé.
- **La longueur d'un tracé tireté est une contrainte, pas un hasard.** C'est le constat déjà
  fait sur la croix de `anteriorite` : à 2,6 unités de tiret, un segment court ne rend que
  son amorce. Là où la croix a été traitée en **retirant** le tiretage, le lien de `liaison`
  l'est en **allongeant** le tracé — quinze unités, soit trois tirets pleins.

Ce que ces deux figures se sont **interdit** relève de la même règle que le fléau horizontal
de `appui` : ne rien dessiner qui se compte. Pas de pile de formes produites sur `gabarit`,
qui afficherait un nombre de projets générés que personne n'a mesuré ; pas un carré par dépôt
sur `liaison`, qui afficherait la taille d'un système que l'article ne nomme pas et n'a pas à
nommer.

### Deux registres, un seul jeton

`--taille-figure-article` vaut **3rem** partout, et la fiche d'article le redéfinit chez elle
à `clamp(6.5rem, 22vw, 9rem)` — le même geste que `--decalage-ancre` sur les pages de pôle.
La hauteur n'a **pas** de jeton : elle suit le `viewBox` (48 × 32), et deux valeurs à tenir
d'accord divergent à la première retouche.

Le registre de liste tient à une contrainte posée ailleurs : la liste du blog est « une
liste, pas une grille » ([`BlogIndexView`](../src/@vitrine/views/BlogIndexView/index.tsx)).
Une vignette pleine largeur en ferait un magazine et promettrait des catégories qui
n'existent pas. La figure partage donc la **ligne de la date** au lieu de s'empiler dessus :
elle distingue les articles à l'œil sans ajouter une seule ligne au rythme de la liste.

Le registre est aussi ce qui distingue la figure d'une marque de pôle : une marque est
carrée (32 × 32), une figure d'article est **couchée** (48 × 32). Une page de pôle vend, un
article raconte — et une figure large se pose au-dessus d'un texte sans prétendre à l'insigne.

### Décor, jamais information

La figure est `aria-hidden` et ne porte rien que le titre et le chapô ne disent déjà en
toutes lettres, juste à côté (WCAG 1.1.1 et 1.4.1). C'est aussi ce qui autorise à la répéter
à l'identique sur la carte de la liste : un décor se répète, une information non.

Aucune couleur n'est nommée dans le module : le tracé est en `currentColor` et le module pose
`color: var(--accent)`. Le blog n'est sous aucun `data-pole`, donc `--accent` y vaut le cuivre
de la racine — la teinte de la maison, exactement ce que doit prendre un contenu qui
n'appartient à aucun pôle. Les deux thèmes suivent sans qu'une ligne y soit consacrée.

## La note de publication d'origine

Un article peut reprendre un texte d'abord paru sur un réseau
([`ArticleSource`](../src/@vitrine/components/ArticleSource/index.tsx)). Le champ est
**optionnel** et le restera. Un seul article publié porte une source à ce jour ; les autres
ont été écrits pour ce site, **ou bien reprennent un post dont l'adresse n'a pas été
fournie** — c'est le cas de « Un générateur de projets, public et personnel », et il se
publie donc sans source. **Une URL absente ne se devine pas** : c'est déjà la règle des
justificatifs de certification. Sans source, rien n'est rendu — ni ligne vide, ni filet
orphelin.

Le lien sort du site, et **son caractère externe ne repose pas sur la couleur** (WCAG 1.4.1).
Trois porteurs, dont chacun survit à la disparition des deux autres :

| Porteur | Ce qu'il couvre |
|---------|-----------------|
| le soulignement du lien | tient même sans images et sans CSS de couleur |
| une flèche sortante **dessinée**, en `currentColor` | tient pour qui ne distingue pas la teinte du lien de l'encre |
| « (nouvel onglet) », retiré du flux visuel | tient pour les technologies d'assistance, où la flèche ne dit rien |

La flèche est dessinée plutôt qu'écrite en caractère (« ↗ ») : le glyphe manque à plusieurs
polices système et s'y remplace par un rectangle, et son dessin varie assez d'une fonte à
l'autre pour ne plus faire série avec les figures du site. Elle redéclare `display:
inline-block` — c'est le **seul `svg` du site à vivre dans une ligne de texte**, et le
`display: block` global de `globals.css` la poussait seule à la ligne.

`rel="noopener noreferrer"`, comme le lien de justificatif d'une certification : un lien
sortant est traité pareil partout, ou il finit par ne l'être nulle part.

## Le lavis de pôle

Le fond était un lavis radial unique, une trame de 32 px et un grain. Correct, sobre —
et **sans matière**. C'est ce qui explique l'échec des trois tentatives de verre
réfractant : un verre ne montre rien par lui-même, il montre **ce qu'il déforme**. Sur un
lavis uniforme, la réfraction a été mesurée à **2 niveaux sur 255**, c'est-à-dire rien.

La première réponse fut une **maille** : quatre lavis larges, un par pôle, posés en
descendant dans `.fond-atelier` — ingénierie en haut à gauche, donnée à droite, les deux
suites plus bas. Elle a été **remplacée** (issue #104), pour deux défauts qui n'étaient
pas des réglages :

1. **Ses coordonnées étaient fixes et le document ne les connaissait pas.** Sur
   `/services/ia/`, le haut de page recevait le lavis d'ingénierie — non parce qu'on y
   parlait d'ingénierie, mais parce que c'est le haut du document. Le fond racontait la
   chaîne à un lecteur qui, lui, lisait une page.
2. **Étalés sur plus de 9 000 px, les quatre lavis n'atteignaient nulle part leur propre
   densité.** À 5,5 % au centre d'ellipses de la taille d'un écran, chaque point du fond
   n'en recevait qu'une fraction. Le résultat à l'écran était un beige uniforme du haut
   en bas de l'accueil.

**Le lavis suit désormais le contenu.** Il n'a plus de coordonnées : il est peint par le
bloc qui parle du pôle, c'est-à-dire par celui qui porte déjà `data-pole`. La section qui
parle de Data porte le lavis Data ; `/services/ia/` porte le lavis IA sur toute sa
hauteur ; les quatre portes de l'accueil sont quatre taches de couleur côte à côte.

### Le mécanisme

`poles.css` mappe `--accent` sous `data-pole`. `lavis.css` en dérive quatre jetons —
`--lavis-fond`, `--lavis-tache`, et leurs équivalents d'échelle bloc — **déclarés sur
`[data-pole]` lui-même**, jamais seulement sur `:root` : une propriété personnalisée est
substituée au *computed-value time*, sur l'élément qui la déclare. Déclarés à la racine,
ils figeraient le cuivre et descendraient tels quels dans les quatre pages de pôle. C'est
le piège déjà documenté pour `--verre-arete`, et c'est le même remède.

**Aucun composant ne nomme une teinte de pôle.** Deux classes globales suffisent, et elles
ne connaissent que les jetons :

| Classe | Échelle | Porteur | Recette |
|---|---|---|---|
| `.lavis-pole` | une page de pôle, plusieurs milliers de pixels | `PolePageView` | tuile de 1600 × 1100 px répétée en Y, `farthest-side` centré |
| `.lavis-bloc` | une carte, quelques centaines de pixels | `PoleEntries` | tache ancrée en haut à gauche, dimensionnée sur le bloc |

### Deux couches, et pourquoi pas trois

Le lavis est un **fond plat translucide** plus une **tache dégradée** par-dessus. Le fond
plat garantit que le bloc du pôle est teinté *partout* — c'est lui qui fait qu'on lit une
couleur et non une éclaircie, et c'est exactement ce qui manquait à la maille. La tache
fait le dégradé et empêche l'aplat.

Deux couches et pas plus, parce que **les alphas se composent** : là où deux taches se
recouvrent, la densité vaut `1-(1-a)(1-b)` et non `a`. Un troisième calque rendrait le
pire cas dépendant de la géométrie, donc de la hauteur du bloc, donc invérifiable. Ici il
est fixe et calculable — et c'est ce nombre-là qui est mesuré.

La **répartition** entre les deux change avec la surface, le plafond jamais. À l'échelle
d'une page, la tache a mille pixels pour s'installer et porte la moitié du plafond. À
l'échelle d'un bloc — une porte de l'accueil fait 160 px de haut — une tache qui décroît
sur cette hauteur laisse le bas de la carte au fond plat seul : mesuré à l'écran, les
quatre portes se lisaient alors quasiment beiges. La part constante monte donc à 6 %, et
la tache se réduit à une modulation.

| Échelle | Clair | Sombre |
|---|---|---|
| page (`.lavis-pole`) | 4 % + 4 % → **7,84 %** | 3,5 % + 3,5 % → **6,88 %** |
| bloc (`.lavis-bloc`) | 6 % + 2 % → **7,88 %** | 5 % + 2 % → **6,90 %** |

### Le plafond, et d'où il vient

**Il ne vient pas du texte.** `--encre-douce` tient encore 5,95:1 à 7,88 %, très au-dessus
du seuil AA de 4,5:1. Il vient des jetons `--accent-vif`, qui portent les filets et les
arêtes et doivent tenir **3:1** (WCAG 1.4.11). Sur le fond réellement peint — `#EDE9E0`,
le bas du dégradé d'atelier et non `--fond` — `--pole-data-vif` n'est déjà qu'à **3,29:1**
nu. Il reste 0,29 point de marge, et le lavis en consomme la quasi-totalité : à 9 % il
passe sous 3:1.

**7,84 % est donc un plafond mesuré, pas un réglage d'apparence.** Le monter demanderait
d'abord de rouvrir la palette des `-vif`, dont les seize valeurs sont plus haut.

En thème sombre le plafond change de nature : tout y tient au-dessus de 6:1, et la
contrainte n'est plus le contraste mais la teinte elle-même. Les couleurs de pôle y sont
choisies **claires** pour porter du texte sur un fond à 6 % de luminance — `--pole-data`
passe de `#00697B` à `#01B6D4`. À part égale, le même lavis y serait deux fois plus
présent et virerait au fond coloré.

### Ce qui reste dans `.fond-atelier`

Le calque plein document ne porte plus aucune couleur de pôle. Il garde le grain, la
trame, le dégradé d'atelier, et **une seule tache** en haut du document, dans
`--lavis-tache` — c'est-à-dire, hors de tout `data-pole`, dans le cuivre : la couleur de
la maison. Ce n'est pas la maille par une autre porte. La maille prétendait dire quel pôle
on lisait, à des coordonnées qui ne le savaient pas ; celle-ci ne dit rien d'un pôle, elle
éclaire l'entrée du document et donne au verre de l'en-tête de la matière à courber.

### Contraintes tenues

| Contrainte | Comment |
|---|---|
| Zéro octet téléchargé | Uniquement des `radial-gradient` et une couleur de fond. Aucune image. |
| Aucune couche de compositing | Deux propriétés de fond sur un élément déjà peint. Ni `filter`, ni `will-change`, ni `transform`. Rien n'est repeint au défilement. |
| Pas de rasterisation géante | `.lavis-pole` dimensionne sa tache en **pixels** et la répète en Y : elle est rasterisée une fois, sur 1600 × 1100 px, jamais à la hauteur d'un gabarit de 6 000 px. `.lavis-bloc` ne sert que des blocs de la taille d'une carte. |
| Aucune animation | Le lavis est statique. `prefers-reduced-motion` n'a rien à couper. |
| Aucune information portée par la seule couleur | Le lavis est un décor : le nom du pôle, son libellé de place et son temps restent écrits en toutes lettres (WCAG 1.4.1). |
| Lighthouse ≥ 95 | Mesuré après le lot : accueil 96, page de pôle 96, blog / article / réalisations 97 ; A11y, bonnes pratiques et SEO à 100. |

### Contraste — mesuré, pas supposé

Deux mesures indépendantes, et les deux sont dans le dépôt de la PR #104 : le calcul
analytique sur la couleur composée, puis la **lecture au pixel du rendu réel** — grain,
trame et lueur de seuil compris — dans les deux thèmes.

Calcul, pire cas : lavis à sa densité maximale, sur le fond le plus défavorable du dégradé
d'atelier (`#EDE9E0` en clair, `#14181D` en sombre).

| Thème | Pôle | Fond composé | `--encre` | `--encre-douce` | `--accent` (texte) | `--accent-vif` (non-texte) |
|---|---|---|---|---|---|---|
| clair | ingénierie web | `#E6DCD1` | 13.30:1 | **5.95:1** | 5.10:1 | 3.27:1 |
| clair | data | `#DADFD8` | 13.30:1 | **5.96:1** | 4.70:1 | **3.02:1** |
| clair | IA | `#E2DDDA` | 13.34:1 | **5.98:1** | 5.11:1 | 3.30:1 |
| clair | SEA & UX | `#E0DFD1` | 13.39:1 | **6.00:1** | 4.72:1 | 3.03:1 |
| sombre | ingénierie web | `#222020` | 13.16:1 | **6.34:1** | 6.15:1 | 7.89:1 |
| sombre | data | `#13232A` | 13.12:1 | **6.32:1** | 6.65:1 | 8.44:1 |
| sombre | IA | `#1F202B` | 13.11:1 | **6.31:1** | 6.08:1 | 7.79:1 |
| sombre | SEA & UX | `#1C2321` | 13.04:1 | **6.28:1** | 6.59:1 | 8.33:1 |

Lecture au pixel, sur le rendu servi. Les valeurs sont légèrement **plus basses** que le
calcul : le grain et la lueur de seuil s'y ajoutent, et c'est bien ce qu'un lecteur a sous
les yeux.

| Thème | Surface | `--encre-douce` | `--encre` |
|---|---|---|---|
| clair | les quatre portes de l'accueil | **5.59 → 5.70:1** | 12.48 → 12.72:1 |
| clair | les quatre pages de pôle | **5.85 → 5.86:1** | 13.06 → 13.09:1 |
| sombre | les quatre portes de l'accueil | **6.49 → 6.71:1** | 13.48 → 13.92:1 |
| sombre | les quatre pages de pôle | **6.74 → 6.80:1** | 14.00 → 14.12:1 |

Le seuil AA du texte est à 4.5:1, celui des éléments non-texte à 3:1 : les deux tiennent,
le second de justesse et par construction.

**Le verre par-dessus.** Le lavis est ce que `GlassSurface` floute : un fond plus coloré
change ce qu'il rend. Contrôlé sur les quatre teintes, dans les deux thèmes —
`--encre-douce` sur un panneau posé sur le lavis le plus dense vaut **6.79 à 6.82:1** en
clair et **5.23 à 5.28:1** en sombre. Le panneau *améliore* le contraste en clair (son
voile blanc éclaircit le fond) et le réduit en sombre sans jamais l'approcher du seuil.

> **Un écart relevé au passage, toujours valable.** Les ratios des tableaux de jetons plus
> haut sont mesurés sur `--fond` (`#F2EFE8`), alors que le fond réellement peint est le
> dégradé de `.fond-atelier`, qui descend à `#EDE9E0`. Les vrais ratios sont donc
> légèrement plus bas que ceux affichés — `--encre-douce` est à 6.65:1 et non 7.02:1.
> Tous restent au-dessus du seuil, mais la documentation est optimiste d'environ un tiers
> de point. C'est cet écart qui rend le plafond du lavis si serré : la marge des `-vif`
> est comptée sur `#EDE9E0`, pas sur `#F2EFE8`.

> **Un filet non conforme, antérieur au lavis.** `--accent` dilué à 45 % — le chiffre de
> place de `PoleHero`, le filet de preuve de `PoleEntries` — est à **1,9 à 2,5:1** sur le
> fond, et l'était déjà avant ce lot (le lavis lui coûte 0,07 point, teinte et fond
> bougeant ensemble). Les deux sont décoratifs et l'information qu'ils accompagnent est
> écrite à côté, mais le point est ouvert et n'est pas traité ici.

## Le verre de la bande

La bande avait déjà flou, saturation et un trait de lumière au ras du haut. Il lui
manquait ce qui fait lire du **verre** plutôt qu'un fond translucide : la **pile
d'ombres**.

Trois couches, et chacune dit une chose :

1. la **lumière** au ras du haut — la tranche qui prend le jour ;
2. le **rebond** au ras du bas — la face inférieure, qui ne reçoit que ce que le papier lui
   renvoie : plus faible, et jamais blanche ;
3. l'**ombre portée** sous la bande — sans elle, le verre est dans le plan de la page au
   lieu de flotter au-dessus. C'est ce décollement qui manquait.

L'ombre portée est large et très diluée : une ombre courte et dense se lirait comme une
bordure, pas comme de la distance.

La **réfraction** arrive aussi sur la bande, sous le même verrou que les panneaux — Blink
seul, Safari et Firefox exclus par une clause `not (…)` qui survit à la minification. Le
gate est recopié plutôt que factorisé : une classe partagée entre un panneau et une bande
obligerait l'une à porter les réglages de l'autre, et c'est exactement ce qui produit les
traînées colorées. Elle n'a de sens que depuis que le fond porte de la couleur — le lavis
du pôle qu'on lit, désormais, plus la lueur de seuil de `.fond-atelier`.

