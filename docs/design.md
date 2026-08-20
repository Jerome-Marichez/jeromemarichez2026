# Design & UI

Direction retenue : **« L'Établi »**. Le site est un plan de travail vu à travers des
panneaux de verre — on voit littéralement au travers parce qu'il n'y a rien à cacher,
ni chaîne de prestataires ni couche commerciale. Les trois pôles ne sont pas trois
offres côte à côte : ce sont trois plaques alignées dans le même axe, tenues par un
liseré de cuivre.

Le verre ne réfracte **jamais du texte**, seulement le fond d'atelier (dégradé + trame
technique). La transparence reste visible, la lisibilité reste intacte : c'est
exactement l'arbitrage que le site vend, appliqué à lui-même.

## Principes

- **Cohérence** : composants réutilisables, jetons de design centralisés dans
  [`src/app/globals.css`](../src/app/globals.css). Aucune couleur, aucun espacement,
  aucune taille en dur dans un composant.
- **Responsive** : mobile-first. La scène WebGL et le verre réfractant sont des
  **enrichissements desktop**, jamais des prérequis de lecture.
- **Thème** : clair et sombre, via `prefers-color-scheme`. Les deux palettes sont
  complètes et vérifiées en contraste — aucune couleur n'est définie dans un seul thème.

## Bibliothèque UI

Aucune bibliothèque de composants. Le site est une vitrine de six écrans : importer un
système entier coûterait plus en poids et en contraintes qu'il ne ferait gagner.

| Choix | Notes |
|-------|-------|
| Composants maison | `src/@shared/components/` (transverse) et `src/@vitrine/components/` (éditorial) |
| **liquidGL** (NaughtyDuk, MIT) | Verre réfractant WebGL — voir la section dédiée ci-dessous |
| **three** + **@react-three/fiber** | Scène 3D des trois dalles, chargée en différé |

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
| `1024px` | desktop | **seuil d'activation** de la scène WebGL et du verre liquidGL |

Le seuil de 1024px n'est pas esthétique : Safari devient instable dès qu'une lentille
liquidGL dépasse la moitié du viewport — ce qui est le cas de toute carte pleine largeur
sur mobile — et le coût GPU d'une capture plein document n'a aucune contrepartie sur un
petit écran.

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

Trois familles, chargées par `next/font/google` — donc auto-hébergées au build : aucune
requête vers `fonts.googleapis.com`, rien à déclarer côté RGPD.

| Rôle | Famille | Notes |
|------|---------|-------|
| Titres | **Fraunces** (variable) | `'SOFT' 0, 'WONK' 0` — la fantaisie est retirée, il reste une antique ferme |
| Corps | **Inter** (variable) | `'ss01' 1, 'cv05' 1` |
| Annotations et chiffres | **IBM Plex Mono** | registre étiquette d'établi, `tabular-nums` sur les preuves |

Échelle fluide en `clamp()`, base 16px : `--t--1` (13px) à `--t-4` (38→64px), plus
`--t-chiffre` pour le mur de preuves. Mesures : 64ch sur le corps, 34ch sur les `h2`,
20ch sur le `h1`, 46ch dans un panneau de verre.

### Espaces et formes

Rythme vertical sur base 8 : `--e-1` (8px) à `--e-7` (104px). `--rayon-verre` 18px,
`--rayon-petit` 8px, `--largeur-page` 76rem.

## Mouvement

Le mouvement sert la lecture ou il n'existe pas. **Pas** de défilement détourné (ni
Lenis ni Locomotive), pas de compteur qui s'incrémente, pas de parallaxe, pas de curseur
personnalisé.

| Geste | Où | Détail |
|-------|-----|--------|
| **Tracer** | les deux charnières | filet cuivre 2px, `scaleY(0)` → `scaleY(1)`, 700ms. Seul mouvement porteur de sens : la chaîne se trace |
| **Pivoter** | la scène WebGL | rotation interpolée sur l'avancement du défilement du premier écran |
| **Micro-états** | liens et boutons | épaisseur de soulignement, `translateY(-1px)`, 120 à 140ms — aucun déplacement de mise en page |

Sous `prefers-reduced-motion: reduce` : les animations CSS sont coupées, la scène est
rendue **figée** (une image, `uTime` gelé), et liquidGL **n'est pas amorcé du tout** —
sa boucle de rendu permanente est une animation, même quand aucune lentille ne bouge.

## Le verre liquidGL

Réglages centralisés dans [`src/@shared/glass/settings.ts`](../src/@shared/glass/settings.ts).
Trois contraintes de la bibliothèque sont tenues, et leur parade est explicite :

| Contrainte réelle | Parade |
|-------------------|--------|
| Toutes les lentilles doivent partager le **même z-index** | `z-index: 2` posé une seule fois dans `glass-surface.css` ; aucun `z-index` local |
| Les éléments `fixed` et `sticky` sont **ignorés** | L'en-tête collant utilise un `backdrop-filter` CSS, pas liquidGL |
| Safari instable au-delà de **50 % du viewport** | Verre désactivé sous 1024px, et plafonné à 3 surfaces par page (`glass-policy.ts`) |
| Les `<canvas>` sont **exclus de la capture** | La scène 3D n'est jamais placée derrière une surface de verre ; elle porte `data-liquid-ignore` |
| Capture plein document, coût en carré de `resolution` | `resolution: 1.5` au lieu de 2.0 par défaut |
| Aucune API de destruction | Démontage maison dans [`glass/teardown.ts`](../src/@shared/glass/teardown.ts) |

Le repli `backdrop-filter` n'est pas un pis-aller : c'est le rendu **par défaut** sur
mobile, sans WebGL et en mouvement réduit.

## La scène WebGL

Trois dalles de verre biseautées, décalées en profondeur, alignées dans le même axe :
la thèse du site rendue en volume. Aucun texte, aucun logo, aucune particule.

- **Géométrie** : `ExtrudeGeometry` avec biseau réel — c'est lui qui attrape la lumière.
  ~600 triangles par dalle, géométrie construite une fois et partagée par les trois.
- **Matériau** : un `ShaderMaterial` partagé, Fresnel non éclairé. **Pas** de
  `transmission` : elle impose une passe de rendu et une cible de rendu par objet, sans
  rapport avec le résultat cherché. Zéro lumière, zéro ombre, zéro texture.
- **Chargement** : `next/dynamic` sans SSR, monté seulement à l'approche du viewport,
  repli SVG inline tenant la place — donc zéro CLS et un LCP qui reste le `h1`.
- **Dégradations** : viewport < 1024px, absence de WebGL, `saveData`, ou
  `prefers-reduced-motion` → repli SVG ou image figée. Le conteneur est `aria-hidden` :
  la scène ne porte aucune information que le texte ne donne déjà.
