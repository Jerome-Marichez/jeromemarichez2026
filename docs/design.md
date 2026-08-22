# Design & UI

Direction retenue : **« L'Établi »**. Le site est un plan de travail vu à travers des
panneaux de verre — on voit littéralement au travers parce qu'il n'y a rien à cacher,
ni chaîne de prestataires ni couche commerciale. Les quatre pôles ne sont pas quatre
offres côte à côte : ce sont des plaques alignées dans le même axe, tenues par un
liseré de cuivre.

> **Décor à reprendre.** La scène SVG du seuil (`ChainCanvas` / `SlabScene`) dessine
> encore **trois** dalles en file, héritées du modèle à trois pôles linéaires. Elle est
> purement décorative — `aria-hidden`, `role="presentation"`, et son texte de substitution
> ne compte plus les pôles — mais elle ne dit pas encore l'embranchement. À reprendre avec
> le lot de réécriture éditoriale.

Le verre ne réfracte **jamais du texte**, seulement le fond d'atelier (dégradé + trame
technique). La transparence reste visible, la lisibilité reste intacte : c'est
exactement l'arbitrage que le site vend, appliqué à lui-même.

## Principes

- **Cohérence** : composants réutilisables, jetons de design centralisés dans
  [`src/app/globals.css`](../src/app/globals.css). Aucune couleur, aucun espacement,
  aucune taille en dur dans un composant.
- **Responsive** : mobile-first. Le verre réfractant est un **enrichissement desktop**,
  jamais un prérequis de lecture. La scène des trois dalles, elle, est du SVG : elle
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
| `--cuivre` | `#8F4520` | liens, accents de texte, focus | 6.02:1 |
| `--cuivre-vif` | `#B4623A` | **non-texte uniquement** : filets, arêtes | 3.85:1 |
| `--signal` | `#1F5F52` | disponibilité, ligne « ce que vous tranchez » | 6.49:1 |

### Couleurs — thème sombre

| Jeton | Valeur | Contraste sur `--fond` |
|-------|--------|------------------------|
| `--fond` | `#0E1114` | — |
| `--encre` | `#ECE7DE` (jamais `#FFF`) | 15.38:1 |
| `--encre-douce` | `#9BA3AA` | 7.41:1 |
| `--cuivre` | `#E08B4C` | 7.18:1 |
| `--cuivre-vif` | `#F0A468` | 9.21:1 |
| `--signal` | `#5FD1AE` | 10.12:1 |

> `--cuivre-vif` en thème clair est à **3.85:1** : il passe le seuil AA des éléments
> non textuels (3:1) mais **pas** celui du texte (4.5:1). Il ne doit jamais porter de
> texte en thème clair.

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
| **Dériver** | la scène des trois dalles | deux fréquences lentes qui ne se referment jamais ensemble, en `transform` seul — assez pour faire lire du volume, jamais assez pour appeler le regard |
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
page (mécanisme de l'issue #44). Aucun composant ne connaît la couleur d'un pôle : il ne
connaît que `--accent`. Tant que les teintes ne sont pas définies, le repli est le
cuivre — la barre est correcte avant elles, et juste après.

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

## La scène des trois dalles

Trois dalles de verre décalées en profondeur, alignées dans le même axe : la thèse du
site rendue en volume. Aucun texte, aucun logo, aucune particule.

Elle a d'abord été une scène WebGL (`three` + `@react-three/fiber`, ~235 ko gzip). Elle
est aujourd'hui **un SVG de 1,6 ko rendu au serveur**, et le compromis n'en est pas un :
le site vend une performance tenue, il ne pouvait pas payer un moteur 3D pour un décor.
Ce qui est perdu — la réfraction physique, la rotation pilotée par le défilement —
n'était lisible par personne. Ce qui est gagné se mesure au premier chargement, et la
scène s'affiche désormais **aussi sous 1024px**, là où le WebGL n'était jamais monté.

- **Forme** : trois rectangles arrondis décalés, liseré cuivre, un dégradé de lueur sur
  la dalle de premier plan. [`ChainCanvas/SlabScene.tsx`](../src/@shared/components/ChainCanvas/SlabScene.tsx).
- **Mouvement** : le groupe porte une dérive d'ensemble, chaque dalle la sienne. Deux
  fréquences qui ne se referment jamais au même moment suffisent à faire lire du volume,
  là où une seule donnerait un balancement de métronome. `transform` et `opacity`
  uniquement.
- **Rendu** : entièrement serveur. Le seul motif restant de rendre `ChainCanvas` côté
  client est de lire le choix « animation figée » et de le passer à la scène. Plus de
  chargement différé à orchestrer, plus de détection de WebGL, plus de seuil de largeur.
- **Décor, jamais information** : le conteneur est `aria-hidden`, et la scène ne porte
  rien que le texte de la page ne dise déjà. C'est la condition pour qu'un décor animé
  soit acceptable sur un site qui vend de l'accessibilité tenue.
