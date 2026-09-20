# Storybook

## Rôle

Catalogue vivant des composants React : développement isolé, documentation visuelle,
base pour les revues design.

Sur ce site, il sert surtout à une chose que les pages ne savent pas faire : montrer les
**états qu'on ne peut pas atteindre en naviguant**. Le lien d'évitement au focus, une
certification avec son justificatif renseigné alors qu'aucune n'en a encore, une
expérience sans encadrement, un mur de stack réduit à une seule famille. Chacun de ces
états existe dans le code, aucun ne se laisse observer sans effort sur le site.

## Commandes

```bash
make storybook          # démarrage local (http://localhost:6006)
make storybook-build    # build statique, dans storybook-static/ (non versionné)
```

## L'installation

| Paquet | Rôle |
|--------|------|
| `storybook` | le noyau et la ligne de commande |
| `@storybook/nextjs-vite` | le framework : il résout `next/font`, `next/image` et `next/link` hors d'un serveur Next |
| `vite` | le bundler dont dépend le framework |

Les trois sont en **`devDependencies` uniquement**. Rien n'entre dans `next build`, donc
rien ne part au navigateur d'un visiteur : le poids du JavaScript des pages est
inchangé, et l'export statique n'est pas concerné.

La configuration tient dans deux fichiers :

- `.storybook/main.ts` : le framework, où chercher les stories, l'alias `@/` que Vite ne
  lit pas dans `tsconfig.json`, et la télémétrie désactivée ;
- `.storybook/preview.tsx` : l'enveloppe commune, décrite ci-dessous.

**Deux fichiers morts restent à supprimer** : `.storybook/theme-media.ts`, une bascule
clair et sombre devenue sans objet puisque le site n'a qu'un thème, et
`.storybook/jeux-de-donnees.ts`, qui importe des modules de contenu supprimés
(`src/contenu/accueil`, `data-sections`, `fil-ia` et d'autres). Rien ne les importe plus.
Ils sont notés dans [`ameliorations.md`](./ameliorations.md).

## Les jetons et les polices, le piège de ce dépôt

**Aucun composant du site ne porte de couleur en dur** : ils consomment les jetons de
[`src/app/jetons.css`](../src/app/jetons.css). Une story qui ne les charge pas n'affiche
pas un composant sobre, elle affiche un composant faux.

`preview.tsx` importe donc [`src/app/globals.css`](../src/app/globals.css), qui importe
lui-même `jetons.css`. Une seule feuille à charger, et l'ordre ne peut donc pas se
désynchroniser de celui du site.

**Les polices comptent autant que les couleurs ici, et pour une raison particulière à ce
dépôt** : la mise en page s'aligne sur une **grille de caractères**, en unités `ch`.
Sans Fira Code, la cellule de caractère change, donc toutes les largeurs sont fausses et
un composant paraît mal aligné sans l'être. L'enveloppe applique les deux familles par
`policeCode.variable` et `policeMain.variable`, comme le fait la mise en page racine.

**L'enveloppe ne peint aucun fond.** Celui de la page vient de `globals.css`, posé sur le
`<body>`, d'où il se propage au canevas. Le repeindre dans l'enveloppe masquerait une
régression du fond réel sans que personne le voie.

## Le seul contrôle de la barre d'outils

**Mouvement** (« Animé », « En pause »). Il pose `data-mouvement` sur la racine, exactement
comme le bouton de mise en pause du pied de page, et les règles globales de
`globals.css` font le reste. Il sert surtout aux trois composants animés du site,
`Mug`, `TitreMachine` et `BoutonMouvement` : sans lui, une story d'animation en boucle
est inconfortable à consulter.

**Il n'y a pas de contrôle de thème.** Le site n'a qu'un thème, sombre, et c'est un choix
assumé (voir [`design.md`](./design.md)). Un sélecteur clair ou sombre dans le catalogue
laisserait croire à une variante qui n'existe pas.

## Conventions

- Une story par composant **réutilisable** : `index.stories.tsx`, **à côté du composant**.
  Une story qui vit loin de son composant cesse d'être mise à jour avec lui.
- Chaque story couvre les **états significatifs**, et en priorité ceux qu'on ne peut pas
  atteindre sur le site : une certification avec son justificatif renseigné, une
  expérience sans encadrement, un mur de stack à une seule famille.
- Les stories utilisent des **données réelles**, prélevées dans `src/contenu/`, jamais du
  lorem ipsum ni un chiffre recopié à la main : un nombre écrit deux fois dans un dépôt
  finit par valoir deux valeurs différentes.
- Quand un cas limite n'existe pas dans le contenu réel, il se construit **à partir du
  type**, en TypeScript, dans le fichier de story. Il reste alors visiblement un exemple
  technique : **aucune donnée inventée sur le parcours de Jérôme MARICHEZ** n'entre dans
  un catalogue, employeur, chiffre ou certification.
- La limite de **300 lignes** s'applique aux fichiers de story comme au reste.
- Les stories ne sont **pas des tests** : ce sont les tests de `tests/` qui conditionnent
  la fusion, et ils sont écrits par Jérôme MARICHEZ (voir [`testing.md`](./testing.md)).
  Une story n'assure rien, elle montre.

## Le catalogue

Il couvre les composants de [`src/components/`](../src/components/), un dossier par
composant avec sa story colocalisée.

**Le catalogue a été refait le 2026-09-20.** Les trente et une stories précédentes
décrivaient les composants du site vitrine à quatre pôles, supprimé le même jour. Elles
sont parties avec eux, et `make storybook-build` a échoué jusqu'à ce que le catalogue soit
reconstruit : une construction Storybook sans aucune story est un échec, pas un succès
vide.

**La configuration a échoué avant les stories**, et c'est la panne qui vaut d'être
retenue : `preview.tsx` importait encore `GlassRefraction`, `src/typography/fonts`,
`poles.css`, `verre.css` et `lavis.css`. Le message d'erreur parlait de Vite et non de
fichiers manquants, ce qui a coûté un diagnostic. Quand `storybook build` échoue sans
raison lisible, **vérifier d'abord ce que `preview.tsx` importe**.

### Ce qui ne mérite pas de story

Un composant sans rendu visible n'en a pas : une story vide vaudrait moins que la raison
écrite de son absence. Ce site n'en compte aucun aujourd'hui, la règle est écrite pour
plus tard.
