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
| `52rem` | les noms de fichier disparaissent des onglets ; les listes de définitions passent en une colonne |
| `44rem` | le mur de stack passe en une colonne |
| `40rem` | les marges et les respirations se resserrent ; le mug rétrécit |

**Pas de menu hamburger.** Sur mobile la barre d'onglets défile latéralement, comme une
vraie barre d'éditeur : la métaphore règle elle-même le débordement.
