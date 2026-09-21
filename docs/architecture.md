# Architecture

Site CV statique. Next.js 16 en App Router, React 19, TypeScript strict, CSS Modules.
Aucune base de données, aucune authentification, aucun appel réseau au navigateur.

## Le choix structurant : export statique

`next.config.mjs` porte `output: 'export'`. `next build` écrit un site complet dans
`out/`, servi par n'importe quel serveur de fichiers.

**Ce que ça coûte**, et c'est assumé : plus de route API, plus d'ISR, plus de Server
Action. Un formulaire de contact exigerait un service tiers. C'est précisément pourquoi
la page Contact n'en a pas, et affiche les coordonnées en clair.

**Ce que ça rapporte** : rien à exploiter, rien à patcher, aucune surface d'attaque
côté serveur, un hébergement interchangeable, et un temps de réponse qui ne dépend que
du réseau.

`trailingSlash: true` fait sortir chaque route en `<route>/index.html`, la seule forme
qu'un serveur de fichiers résout sans règle de réécriture. En contrepartie les URL
canoniques portent la barre finale, et `src/app/sitemap.ts` comme les balises
`canonical` sont alignés dessus.

## Arborescence de `src/`

Le code front vit **directement sous `src/`**, sans découpage par domaine : ce site est
une vitrine de six écrans, et deux niveaux de chemin de plus n'y trancheraient rien.

```
src/
  app/            routage Next.js, et RIEN d'autre
    layout.tsx    gabarit racine : polices, en-tete, pied de page
    page.tsx      /
    jetons.css    les jetons de design, source unique
    globals.css   remise a zero, surfaces du navigateur, mouvement
    polices.ts    Fira Code et Shadows Into Light, auto-hebergees
    sitemap.ts    derive de src/contenu/navigation.ts
    robots.ts
    <route>/page.tsx
    blog/[slug]/page.tsx   route dynamique, figee par generateStaticParams
  views/          les sections d'ecran composees, une par route
  components/     un dossier PascalCase par composant, styles colocalises
  contenu/        le contenu du site, en TypeScript type
  interfaces/     une interface par entite, prefixee I
  seo/            les textes de referencement
  utils/          helpers purs, sans etat ni metier
```

### `app/` ne fait que du routage

Chaque `page.tsx` porte ses métadonnées et rend une vue. Il ne contient aucune mise en
page. Les sections composées vivent dans `views/`, qui assemblent les composants de
`components/`.

Cette séparation a une raison pratique : une vue se rend dans Storybook et se teste
isolément, une page de Next ne s'y prête pas.

### Le contenu est du code typé

`src/contenu/` porte le contenu du site sous forme de tableaux typés, et
`src/interfaces/` les entités correspondantes. Aucune chaîne de contenu n'est écrite
en dur dans un composant.

Ce n'est pas un détour inutile : le contenu de ce site est **contraint par des règles de
véracité bloquantes** (voir `CLAUDE.md`). Le rassembler en un seul endroit rend ces
règles vérifiables, ce qu'une chaîne perdue dans un JSX n'est pas.

`experiences/` et `projets/` sont découpés en un fichier par entrée, agrégés par un
`index.ts` : c'est la limite de 300 lignes par fichier qui l'impose, et le découpage
rend au passage chaque expérience relisible seule.

### Les vues déléguent leur unité répétée à un composant

Une vue qui rend une liste d'entrées riches (une expérience, une fiche de projet, un
diplôme) n'écrit pas le gabarit de l'entrée : elle le délègue.

| Composant | Rendu pour |
|-----------|-----------|
| `ExperienceBloc` | une expérience du parcours |
| `ProjetFiche` | un projet, en Contexte, Enjeu, Mon rôle, Résultat |
| `FormationListe` | les diplômes |
| `AxeListe` | les quatre axes de la pratique |
| `MurDeStack` | les neuf familles de compétences |

C'est la limite de 300 lignes par fichier qui force cette extraction, et c'est un bon
forçage : le gabarit d'une entrée devient relisible seul, et il se rend dans Storybook
sans monter la page entière.

Aucun de ces composants n'est une **carte**. Ils rendent des listes de définitions
séparées par des filets, ce qui est la structure retenue par la direction visuelle : une
grille de cartes de même taille traiterait dix ans comme des vignettes
interchangeables. Voir [design.md](./design.md).

### Les composants n'ont pas de bibliothèque

Aucune bibliothèque de composants, aucune dépendance d'effet visuel. Le site compte
une dizaine de composants : importer un système entier coûterait plus en poids et en
contraintes qu'il ne ferait gagner.

Conséquence assumée : chaque composant est écrit ici, avec ses états et son
comportement clavier.

### Composants serveur par défaut

Presque tout le site est rendu sur le serveur, sans JavaScript envoyé au navigateur.
Trois exceptions, et chacune a sa raison :

| Composant | Pourquoi il est client |
|-----------|------------------------|
| `EnTete` | lit la route courante avec `usePathname` pour marquer l'onglet ouvert |
| `BoutonMouvement` | pose `data-mouvement` sur la racine, donc il a un état |
| `Mug` | pilote une vidéo et suit le curseur, voir ci-dessous |

**Le mug a été serveur, il ne l'est plus, et le revirement mérite d'être écrit.** Une
première version le redessinait en SVG animé en CSS : zéro octet de script, et un rendu
jugé inférieur à l'original. Sur l'élément qui porte l'identité du site, c'est le
résultat visuel qui tranche, pas l'argument de poids. La tasse d'origine est revenue,
avec sa photo et sa vidéo de café, et deux comportements qui exigent du JavaScript :

- **mettre la vidéo en pause.** Une règle CSS suspend une animation, pas une vidéo. Le
  respect de `prefers-reduced-motion` et du bouton de mise en pause (WCAG 2.2.2) passe
  donc par un appel à `pause()` ;
- **suivre le curseur.** La tasse s'oriente vers la souris, et c'est sa seule
  interaction. L'angle est écrit directement dans une propriété CSS, jamais dans un état
  React : une position de curseur change des dizaines de fois par seconde, et un
  `useState` re-rendrait le composant à chaque image.

Le **titre qui s'écrit** reste un composant serveur : il est rendu entier, seule sa
révélation est animée, par un retard par caractère calculé au rendu. Le portfolio
d'origine le construisait dans un `useState`, donc invisible à l'indexation et à la
synthèse vocale.

### Les images ne sont pas optimisées, et c'est voulu

`next.config.mjs` porte `images: { unoptimized: true }`. L'optimisation d'images de Next
est un service qui tourne au moment de la requête : elle est **incompatible avec
`output: 'export'`**, et Next lève une erreur d'exécution dès qu'un `next/image` est
rendu sans cette ligne.

Ce n'est pas une perte : la seule image du site est le mug, 124 Kio, servi tel quel.
`next/image` reste utilisé pour ce qu'il apporte sans serveur, les dimensions connues à
la compilation, donc aucun décalage de mise en page au chargement.

## Le style

**CSS Modules**, un `*.module.css` colocalisé avec chaque composant, classes en
français, valeurs issues des jetons. Deux feuilles globales seulement :

- `app/jetons.css` : les jetons, et rien d'autre. Source unique des couleurs, des
  espacements, des tailles et des courbes d'animation.
- `app/globals.css` : remise à zéro, thématisation des surfaces du navigateur
  (sélection, curseur, anneau de focus, ascenseur) et pilotage global du mouvement.

**Aucune couleur, aucun espacement, aucune taille en dur dans un composant.** Aucune
classe globale non plus, à l'exception des trois utilitaires de structure déclarés dans
`globals.css` (`cadre`, `mesure`, `hors-ecran`).

La mise en page s'aligne sur une **grille de caractères** : les largeurs et les
gouttières s'expriment en `ch`, le rythme vertical sur une ligne de base de 24px. Voir
[design.md](./design.md).

## Le mouvement

Un seul mouvement permanent, la vapeur du mug. Deux interrupteurs l'arrêtent :
`prefers-reduced-motion`, et un bouton de mise en pause explicite exigé par WCAG 2.2.2,
qui pose `data-mouvement="pause"` sur la racine.

Règles appliquées partout : seuls `transform` et `opacity` sont animés, les entrées sont
en sortie exponentielle sous 300ms, le mouvement à vitesse constante est en `linear`, et
les survols sont réservés aux pointeurs fins pour éviter les faux survols au toucher.

## Ce qui n'est pas là, et pourquoi

- **Pas de gestionnaire d'état.** Aucun état partagé entre écrans.
- **Pas de couche de service métier.** Il n'y a pas de règle de gestion : le site lit du
  contenu et le rend. `src/utils/` porte les quelques helpers purs.
- **Pas de schéma Zod pour l'instant.** La règle du projet impose Zod sur toute entrée
  externe, et ce site n'en a aucune : ni formulaire, ni query, ni webhook, ni variable
  d'environnement. Le jour où il en a une, elle passe par un schéma de `src/schemas/`.
