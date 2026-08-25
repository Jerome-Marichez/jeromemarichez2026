# Storybook

## Rôle

Catalogue vivant des composants React : développement isolé, documentation visuelle,
base pour les revues design.

Sur ce site, il sert surtout à une chose que les pages ne savent pas faire : montrer les
**états qu'on ne peut pas atteindre en naviguant**. Le refus d'un formulaire de contact
vide, le lien d'évitement au focus, les cinq figures d'article côte à côte, les quatre
teintes de pôle sur un même composant. Chacun de ces états existe en production, aucun
ne se laisse observer sans effort.

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

La configuration tient dans quatre fichiers :

- `.storybook/main.ts` : le framework, où chercher les stories, l'alias `@/` que Vite ne
  lit pas dans `tsconfig.json`, et la télémétrie désactivée ;
- `.storybook/preview.tsx` : l'enveloppe commune, décrite ci-dessous ;
- `.storybook/theme-media.ts` : la bascule de thème ;
- `.storybook/jeux-de-donnees.ts` : les contenus réels prélevés dans `src/contenu/`.

## Les jetons, le piège de ce dépôt

**Aucun composant du site ne porte de couleur en dur** : ils consomment des jetons
déclarés dans quatre feuilles globales. Une story qui ne les charge pas n'affiche pas un
composant sobre, elle affiche un composant faux.

`preview.tsx` importe donc `globals.css`, `poles.css`, `verre.css` puis `lavis.css`
**dans l'ordre exact de `src/app/layout.tsx`**. L'ordre n'est pas indifférent : les trois
dernières s'appuient sur les jetons de la première, et `lavis.css` dérive les siens de
`--accent`, que `poles.css` mappe sur le pôle courant.

L'enveloppe pose aussi `FONT_VARIABLES` (les deux familles chargées par `next/font`), le
fond d'atelier et le filtre de réfraction, comme la mise en page racine les pose.

Un détail qui a coûté un aller-retour : **l'enveloppe ne peint aucun fond**. Le fond de
la page vient de `globals.css`, qui le pose sur le `<body>` d'où il se propage au
canevas. Peindre un fond sur l'enveloppe passerait par-dessus `.fond-atelier`, dont le
`z-index: -1` le place derrière le contenu mais devant le canevas : le verre n'aurait
alors plus aucune trame à laisser voir, et il n'y aurait plus moyen d'en juger l'effet.

## Les deux contrôles de la barre d'outils

**Thème** (auto, clair, sombre). Le site n'a pas de bascule : tout son thème sombre tient
dans quatre règles `@media (prefers-color-scheme: dark)`. Le contrôle réécrit au runtime
le `mediaText` de ces règles via le CSSOM : `all` pour forcer le sombre, `not all` pour
forcer le clair, la valeur d'origine pour rendre la main au système. **Aucun jeton n'est
dupliqué et aucun fichier du site n'est modifié** : une teinte ajoutée demain au thème
sombre est prise en compte sans rien changer au catalogue.

**Pôle** (aucun, et les quatre pôles). Le contrôle pose `data-pole` sur l'enveloppe,
exactement comme une section de pôle le fait sur le site ; `poles.css` fait tout le
reste. Sans ce contrôle, le catalogue ne montrerait que le cuivre par défaut. Quelques
stories posent leur propre `data-pole` sur leurs éléments, `PoleEntries` et
`ChainDiagram` notamment, et sont donc insensibles au contrôle : c'est le comportement du
site.

## Conventions

- Une story par composant **réutilisable** : `<Composant>.stories.tsx`, **à côté du
  composant**. Une story qui vit loin de son composant cesse d'être mise à jour avec lui.
- Chaque story couvre les **états significatifs** (défaut, erreur, vide, cas limite), et
  en priorité ceux qu'on ne peut pas atteindre sur le site.
- Les stories utilisent des **données réelles**, prélevées dans `src/contenu/`, jamais du
  lorem ipsum ni un chiffre recopié à la main : un nombre écrit deux fois dans un dépôt
  finit par valoir deux valeurs différentes.
- La limite de **300 lignes** s'applique aux fichiers de story comme au reste.
- Les stories ne sont **pas des tests** : ce sont les tests de `tests/` qui conditionnent
  la fusion, et ils sont écrits par Jérôme MARICHEZ (voir [`testing.md`](./testing.md)).

## Composants couverts

Trente et un composants sur trente-quatre ont une story.

| Groupe | Composants |
|--------|------------|
| Socle | `SiteHeader`, `SiteFooter`, `SkipLink`, `Breadcrumb` |
| Verre | `GlassSurface` |
| Mouvement | `MotionToggle`, `Reveal` |
| Pôles | `PoleGlyph`, `PoleHero`, `PoleTagList`, `PoleStickyBar`, `PoleEntries`, `ChainDiagram` |
| Éditorial | `EditorialSection`, `HingeSection`, `ThreadSection`, `HingeNote`, `ExpertiseBlock`, `BoundaryList`, `ProofWall`, `CertificationList`, `SpaceEntries` |
| Accueil | `HomeHero`, `ChainCanvas` |
| Blog | `ArticleCard`, `ArticleFigure`, `ArticleSource` |
| Réalisations | `RealisationCard`, `EmploymentFrame` |
| Contact | `ContactField`, `ContactForm` |

### Les trois exclusions, et leur raison

| Composant | Pourquoi pas de story |
|-----------|-----------------------|
| `StructuredData` | Il n'émet que du JSON-LD dans un `<script>`. Aucun rendu visuel : une story vide vaudrait moins que la raison écrite de son absence. |
| `MotionState` | Il rend `null`. Son seul effet est un attribut posé sur `<html>`, que le CSS lit. Il n'y a rien à montrer. |
| `GlassRefraction` | C'est un filtre SVG inerte, invisible par lui-même. L'enveloppe des stories le rend déjà partout, et c'est dans `GlassSurface` que son effet se juge. |

`MagneticAction` n'apparaît pas non plus : il a été supprimé du dépôt.
