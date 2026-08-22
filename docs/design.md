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
| **liquidGL** (NaughtyDuk, MIT) | Verre réfractant WebGL — voir la section dédiée ci-dessous |

## Stratégie de style

**CSS Modules** : un `*.module.css` co-localisé avec chaque composant, classes en
français, valeurs issues des jetons.

**Une seule exception**, documentée et bornée : la classe `.glass-surface`
([`src/app/glass-surface.css`](../src/app/glass-surface.css)) est **globale**. liquidGL
retrouve ses lentilles par un sélecteur CSS littéral au montage — un nom haché par CSS
Modules ne serait jamais trouvé. Aucune autre classe globale n'est autorisée.

## Breakpoints

| Nom | Largeur | Usage |
|-----|---------|-------|
| `720px` | mobile / tablette | l'en-tête passe en colonne |
| `900px` | tablette | le décalage en diagonale du schéma de chaîne est supprimé |
| `1024px` | desktop | **seuil d'activation** du verre liquidGL et du `backdrop-filter` |

Le seuil de 1024px n'est pas esthétique : Safari devient instable dès qu'une lentille
liquidGL dépasse la moitié du viewport — ce qui est le cas de toute carte pleine largeur
sur mobile — et le coût GPU d'une capture plein document n'a aucune contrepartie sur un
petit écran. En dessous, le panneau se contente d'un fond translucide **plat** : ni
`backdrop-filter`, ni `will-change`. Le moteur n'y est jamais amorcé, la lentille ne se
transforme donc jamais — flouter une grande surface à chaque image de défilement y
serait un coût payé pour un effet que personne ne voit.

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

| Jeton | Valeur | Où |
|-------|--------|-----|
| `--verre-flou` | `14px` | les six surfaces floutées, au-delà de 1024px |
| `--verre-saturation` | `1.15` | les panneaux de verre |
| `--verre-saturation-bande` | `1.1` | les bandes collantes : ce qui passe dessous est du texte, pas un décor |
| `--verre-epaisseur` | `1px` | l'arête d'un panneau, le filet d'une bande |
| `--verre-epaisseur-lueur` | `1px` | la lueur haute, à l'intérieur |
| `--verre-voile` | `55%` | panneaux : la trame doit rester visible |
| `--verre-voile-bande` | `88%` | en-tête du site |
| `--verre-voile-barre` | `82%` | barre de pôle |

L'**échelle d'élévation** compte trois crans, dans l'ordre, et pas un de plus — un cran
sans emploi serait un jeton mort, exactement le défaut corrigé ici :

| Jeton | Sens | Où |
|-------|------|-----|
| `--elevation-creuse` | un creux **dans** le papier | la plaque de logo d'une certification |
| `--elevation-posee` | posé **sur** le papier : la lueur d'arête d'une surface au repos | `.glass-surface`, les plaques de la chaîne, le bloc de contact |
| `--elevation-levee` | **au-dessus** : la seule vraie ombre portée du site, teintée par `--accent` | une action sous la main |

**Six surfaces répliquent un flou hors de liquidGL** — la bibliothèque ignore le `sticky`,
et tout n'est pas une lentille : `SiteHeader`, `PoleStickyBar`, `ChainDiagram`,
`HomeView` (`.contact`), `ThreadSection`, `CertificationList`. Elles consomment toutes les
jetons ci-dessus. C'est la condition pour qu'un réglage du verre les emmène ensemble au
lieu d'en laisser cinq derrière.

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

Échelle fluide en `clamp()`, base 16px : `--t--1` (13px) à `--t-4` (40→68px), plus
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

`.fond-atelier` est un calque peint, séparé du contenu — c'est ce que liquidGL capture,
et il fait plus de 9 000 px de haut sur l'accueil. **Tout ce qu'on y pose doit être une
tuile.** Un `repeating-linear-gradient` sans `background-size` est généré une fois aux
dimensions de son élément, puis capturé tel quel en texture.

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

Sous `prefers-reduced-motion: reduce` : les animations CSS sont coupées, la scène est
rendue **figée** — les dalles gardent leur pose — et liquidGL **n'est pas amorcé du
tout**, sa boucle de rendu permanente étant une animation même quand aucune lentille ne
bouge. Le bouton `MotionToggle` offre le même arrêt depuis la page, comme l'exige
WCAG 2.2.2 : une préférence système n'est pas un mécanisme de mise en pause, elle ne se
change pas depuis le site. Tout ce qui est encore en attente se pose alors **sans
transition** : figer l'animation et voir douze sections glisser en réponse à son propre
clic serait la contradiction exacte de ce que le bouton promet.

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
`translate3d(0, 0, 0)` résiduel créerait un contexte d'empilement permanent sur chaque
section, et l'empilement des lentilles liquidGL se compare dans le contexte racine (voir
`glass-surface.css`).

**La révélation enveloppe le corps d'une section, jamais la section elle-même**, et cette
règle paie deux fois :

- une section **vitrée** se retrouve ainsi sous `GlassSurface`, à l'intérieur d'un
  conteneur qui est déjà un contexte d'empilement : le `transform` transitoire ne peut
  pas déplacer la lentille dans l'ordre de peinture ;
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
| liquidGL **ignore** les éléments `sticky` | Ni l'un ni l'autre n'est une lentille. Fond plat, flou CSS au-delà de 1024px seulement — même recette pour les deux |
| Sans flou, la translucidité laisse passer un **fantôme de texte** | En dessous de 1024px, la bande est **opaque**. La transparence du site est celle du verre, et le verre floute ; là où le flou n'est pas payé, la bande est pleine |
| L'en-tête est bien plus haut sous 720px (il passe en colonne) | La barre de pôle y reste **dans le flux**. Deux bandes collantes sur un téléphone prendraient la place de ce qu'elles annoncent |
| Une ancre ne doit pas se poser sous les bandes | `--decalage-ancre`, redéfini localement sur la page de pôle |

La barre consomme **`--accent`**, la teinte du pôle courant, posée par `data-pole` sur la
page. Aucun composant ne connaît la couleur d'un pôle : il ne connaît que `--accent`. Elle
consomme aussi `--verre-voile-barre`, `--verre-flou` et `--verre-saturation-bande` : son
fond n'a plus une seule valeur qui lui soit propre.

## Le verre liquidGL

Réglages centralisés dans [`src/@shared/glass/settings.ts`](../src/@shared/glass/settings.ts).
Trois contraintes de la bibliothèque sont tenues, et leur parade est explicite :

| Contrainte réelle | Parade |
|-------------------|--------|
| Toutes les lentilles doivent partager le **même z-index** | `z-index: 2` posé une seule fois dans `glass-surface.css` ; aucun `z-index` local |
| Les éléments `fixed` et `sticky` sont **ignorés** | L'en-tête collant utilise un `backdrop-filter` CSS, pas liquidGL |
| Safari instable au-delà de **50 % du viewport** | Verre désactivé sous 1024px, et plafonné par gabarit dans `glass-policy.ts` : `MAX_GLASS_ACCUEIL` (3) et `MAX_GLASS_PAGE_POLE` (3). Le plafond est passé par l'appelant, pas hérité d'une constante unique — une page de pôle compte 4 à 5 chapitres vitrables, et la troncature doit se lire dans le code plutôt que se subir |
| Le flou coûte cher là où rien ne bouge | Sous 1024px, `backdrop-filter` et `will-change` ne sont pas posés du tout : fond translucide plat |
| Tout ce qui n'est pas le fond fausse la capture | La scène des dalles porte `data-liquid-ignore` et n'est jamais placée derrière une surface de verre |
| Capture plein document, coût en carré de `resolution` | `resolution: 0.75` au lieu de 2.0 par défaut. On ne capture pas la page mais un dégradé et une trame de 32px : vue à travers un verre dépoli, sa netteté n'a aucune importance — la mémoire, si |
| Aucune API de destruction | Démontage maison dans [`glass/teardown.ts`](../src/@shared/glass/teardown.ts) |

Le fond translucide n'est pas un pis-aller : c'est le rendu **par défaut** sur mobile,
sans WebGL et en mouvement réduit.

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
