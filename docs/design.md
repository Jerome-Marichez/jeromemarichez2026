# Design et interface

Direction retenue : **Le Poste de Travail à 3h du matin**.

> **État de ce document.** Il consigne ce qui est **construit et stable** : les jetons,
> la grille et les règles de mouvement. Le système complet (inventaire des composants,
> états, variantes) est écrit **au bouclage du chantier, depuis le site construit** et
> non depuis les intentions, comme l'exige le flux de design du projet. Un règlement
> écrit avant le build finit par être défendu contre la réalité au lieu de la décrire.
> Le contrat de direction complet vit dans `.impeccable/surfaces/`.

## Le monde

Le site est le poste de travail où ce métier se fait réellement, à l'heure où il se
fait : nuit, mug tiède, une seule lampe allumée.

Il refuse l'arrangement que cette catégorie livre par défaut, le héros centré suivi
d'une grille de cartes de projets égales, pour une raison de fond : une grille de cartes
traite dix ans comme six vignettes interchangeables. Ici le contenu est disposé comme du
code se lit, aligné, indenté, annoté, dense là où la densité est une preuve.

L'ADN café et code vient du portfolio d'origine
(`github.com/Jerome-Marichez/portfolio`), qui sert encore `jeromemarichez.fr` au moment
d'écrire ces lignes. Il est repris, pas réinventé : ses jetons, ses deux polices et son
mug sont conservés, et modernisés.

## Un seul thème, et c'est un choix

Le site n'a **pas** de version claire. La scène d'usage est une nuit de travail, et un
thème clair diluerait le monde que le site engage.

**Le revers se dit** : un recruteur qui lit à 10h dans un bureau clair n'aura pas de
variante confortable. Le contraste des couples texte/fond est donc vérifié partout, et
aucun ne descend sous 4.5:1.

## Jetons

Source unique : [`src/app/jetons.css`](../src/app/jetons.css). Aucune couleur, aucun
espacement, aucune taille en dur dans un composant.

### Couleurs

| Jeton | Valeur | Usage | Contraste sur `--fond` |
|-------|--------|-------|------------------------|
| `--fond` | `#232020` | fond de page, café torréfié | sans objet |
| `--fond-creux` | `#1b1918` | région en retrait : le mur de stack | sans objet |
| `--fond-releve` | `#2b2726` | en relief : bandeau collant, survols | sans objet |
| `--encre` | `#f7f2f2` | texte courant et titres | 15.1:1 |
| `--encre-douce` | `#bebebe` | texte secondaire, chapôs | 8.5:1 |
| `--encre-faible` | `#8d8d8d` | micro-libellés, légendes | 4.9:1 |
| `--cafe` | `#d48646` | la teinte de marque, lisible en texte | 5.5:1 |
| `--cafe-vif` | `#e8a066` | survol, état actif | 7.6:1 |
| `--cafe-sourd` | `#8a5530` | **non-texte uniquement** : filets, arêtes | 3.2:1 |

**Une seule source de lumière, et elle possède des régions.** Le café n'est pas saupoudré
en accents : il occupe des surfaces entières (l'action primaire en aplat, le filet de
l'onglet ouvert, les intitulés du mur de stack). C'est ce qui distingue une teinte de
marque d'une décoration.

### Coloration syntaxique

`--code-mot-cle`, `--code-chaine`, `--code-selecteur`, `--code-nombre`,
`--code-commentaire`. Héritée du portfolio d'origine, elle est **réservée au code réel** :
l'employer comme palette décorative viderait sa signification.

`--code-commentaire` est volontairement remontée à 4.9:1, au-dessus d'un gris de
commentaire d'éditeur : les quatre axes de l'accueil se lisent comme un commentaire,
donc c'est du texte porteur et non de la décoration.

## La grille est une grille de caractères

C'est la décision qui fait du monospace un **système** et non un costume.

- Les largeurs et les gouttières s'expriment en **`ch`**, l'unité de la cellule de
  caractère de Fira Code. `--colonne` vaut 72ch, dans la fourchette de mesure lisible.
- Le rythme vertical suit une **ligne de base de 24px** (`--ligne`), et les espacements
  `--e1` à `--e7` en sont des fractions ou des multiples.
- Les colonnes fixes d'une liste de définitions sont en `ch`, pour que les termes
  s'alignent **au caractère** d'une ligne à l'autre.

## Le titre tient sur une ligne, par calcul

Le titre de l'accueil et l'intitulé qui le suit ne se cassent **jamais** sur deux lignes,
et ce n'est pas un réglage empirique.

Ils portaient un `clamp()` en `vw`, sans rapport avec la longueur réelle de la chaîne :
sur un MacBook, `< Jérôme Marichez />` passait à la ligne. Un `clamp()` ajusté à la main
aurait recassé au premier changement de titre.

Fira Code étant à chasse fixe, la largeur d'une chaîne est **calculable** : un caractère
vaut 0,6em, donc N caractères valent N x 0,6em. Le composant expose N au CSS dans
`--caracteres`, et la taille se déduit de la largeur du conteneur :

```css
font-size: min(var(--t-heros), calc(100cqi / (var(--caracteres) * 0.64)));
white-space: nowrap;
```

Le conteneur est déclaré `container-type: inline-size` sur la colonne du titre, sinon les
`cqi` se rapporteraient au viewport, donc à une largeur plus grande que la colonne
réelle. Le plafond `--t-heros` reste, sinon le titre deviendrait énorme sur un très grand
écran.

C'est le corollaire direct de la grille de caractères : **la police étant la grille, elle
sert aussi à dimensionner.**

## La tasse, seule interaction du site

La tasse de café est l'élément qui porte l'identité. C'est la tasse **d'origine** du
portfolio de Jérôme MARICHEZ, sa photo et sa vidéo de café réel, pas une reconstitution.

Une version l'avait redessinée en SVG pour économiser 1,7 Mo. L'économie était réelle, le
résultat était moins bon, et sur cet élément-là c'est le résultat qui tranche. Le revers
est assumé et compensé : la vidéo ne charge pas sous 64rem, et la tasse entière disparaît
sous 834px.

**Son interaction unique : elle s'oriente vers le curseur.** Elle ne se déplace pas,
seule sa rotation change, et elle vaut l'angle entre son centre et la souris. Le
mouvement est amorti par la transition CSS, donc la tasse arrive toujours un peu après le
curseur : ce retard lui donne du poids, là où une poursuite exacte donnerait un objet
collé au pointeur.

**Aucun état de survol.** Le portfolio d'origine faisait pivoter la tasse à 150 degrés au
survol ; l'orientation vers le curseur répond déjà au même geste, et deux réponses
concurrentes se gêneraient.

## Le logo d'une marque

Une fiche projet peut porter le logo de l'entreprise ou du produit cité, à côté de son
titre, sur sa ligne de base : jamais dans un bloc séparé, jamais sur une pastille de
fond. Le site n'habille pas ses illustrations d'un cadre, voir le refus de carte
ci-dessous, et un logo n'y échappe pas.

**Fond transparent, donc fichier retravaillé si besoin.** Le logo est posé directement
sur `--fond`, pas sur un aplat clair. Un logo dont l'encre est sombre ou dont le fond
d'origine est blanc y devient illisible ; il est alors recoloré en `--encre` sur notre
copie du fichier, jamais sur le fichier du titulaire. Trois des cinq logos actuels ont
reçu ce traitement : le détail, la mesure de contraste avant traitement et la provenance
de chaque fichier vivent dans `public/marques/LISEZMOI.md`. Un logo déjà clair ou déjà
transparent (Sms En Masse, Prézage) n'est pas touché.

Un projet sans marque répertoriée ne rend aucun logo et ne laisse aucun trou dans la mise
en page : voir `src/components/LogoMarque`.

## Ce que le site refuse

Ces refus sont dans le contrat de direction, ils ne se rediscutent pas au cas par cas :

- **Aucune carte.** Pas de conteneur à coins arrondis avec ombre portée. Les séparations
  sont des filets d'un pixel et des changements de fond, comme les panneaux d'un éditeur.
  Une grille de cartes de même taille est la structure paresseuse par défaut.
- **Aucun sur-titre** au-dessus d'un titre. Le titre porte son propre poids.
- **Aucun numéro de section** (01, 02, 03) : les axes n'ont pas de hiérarchie, et un
  numéro en inventerait une.
- **Aucun dégradé sur du texte.** L'emphase vient du poids ou de la taille.
- **Aucun emoji, aucun glyphe unicode en guise d'icône.** Les icônes sont dessinées en
  SVG, à épaisseur de trait constante.
- **Aucune barre de progression en pourcentage** sur les compétences : elle inventerait
  une précision que personne ne peut mesurer.

## Typographie

| Police | Rôle |
|--------|------|
| **Fira Code** | tout le site. La police EST la grille |
| **Shadows Into Light** | l'annotation manuscrite, et rien d'autre |

Les deux sont auto-hébergées par `next/font` (`src/app/polices.ts`), donc aucune requête
vers un tiers et aucun décalage de mise en page au chargement.

**L'annotation reste rare par construction** : dès qu'elle sert deux fois sur un écran,
elle a cessé d'être une annotation pour devenir une police de corps. Une par page au plus.

Les **ligatures de Fira Code sont désactivées** hors du code : elles déforment des mots
courants. Elles sont rendues au code réel et au titre, qui en est.

## Les surfaces du navigateur

Sélection, curseur de saisie, anneau de focus, ascenseur et chiffres tabulaires arrivent
avec des valeurs par défaut qui n'appartiennent à aucun système de design. Ils sont tous
thématisés dans `globals.css`. Les laisser en place, c'est assembler une page au lieu de
la construire.

Les chiffres sont en **chasse fixe** (`tabular-nums`) : les preuves chiffrées s'alignent
en colonne d'une ligne à l'autre.

## Mouvement

Référence complète : `.claude/skills/web-animation-design`. Règles appliquées :

| Situation | Courbe | Durée |
|-----------|--------|-------|
| entrée ou sortie d'écran | sortie exponentielle (`--sortie`) | sous 300ms |
| mouvement à vitesse constante (la vapeur) | `linear` | 5 à 7s |
| survol, changement de couleur | `ease` | 140ms |

- **Seuls `transform` et `opacity` sont animés.** Ils évitent les étapes de mise en page
  et de peinture.
- Une entrée part d'un état **déjà presque juste** : jamais de `scale(0)` ni de longue
  translation, qui font trembler le contenu.
- Les survols sont sous `@media (hover: hover) and (pointer: fine)` : sur tactile, un
  appui déclencherait un faux survol.
- **Chaque élément animé porte son propre bloc `prefers-reduced-motion`**, en plus du
  filet global de `globals.css`.

Le **seul mouvement permanent** est la vapeur du mug. Un bouton de mise en pause
explicite (WCAG 2.2.2) vit dans le pied de page et pose `data-mouvement="pause"` sur la
racine.

## Points de rupture

| Largeur | Ce qui change |
|---------|---------------|
| `64rem` | le mug passe sous le propos ; le mur de stack passe de trois à deux colonnes |
| `834px` | la tasse disparaît entièrement. Valeur en pixels et non en rem, contrairement au reste : c'est une largeur d'appareil réelle, l'iPad en portrait, et l'arrondir au `52rem` voisin la laissait affichée exactement là où on la voulait masquée |
| `52rem` | les noms de fichier disparaissent des onglets ; les listes de définitions passent en une colonne |
| `44rem` | le mur de stack passe en une colonne |
| `40rem` | les marges et les respirations se resserrent ; le mug rétrécit |

**Pas de menu hamburger.** Sur mobile la barre d'onglets défile latéralement, comme une
vraie barre d'éditeur : la métaphore règle elle-même le débordement.
