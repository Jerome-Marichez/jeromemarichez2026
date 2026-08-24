# Architecture

## Vue d'ensemble

Site **vitrine** : tout le contenu est éditorial et rendu statiquement. Il n'y a ni base
de données, ni authentification, **ni serveur**.

```
Visiteur ──► Fichiers statiques servis par nginx  ── offres, parcours, preuves, certifications
         └─► mailto: direct                       ── aucun formulaire, aucun traitement
```

**Conséquence structurante** : `next.config.mjs` porte `output: 'export'`. `next build`
n'écrit pas un serveur, il écrit un site complet dans `out/`. Ce n'est pas un réglage de
déploiement, c'est une contrainte d'architecture — elle ferme, définitivement tant qu'elle
tient :

| Fermé | Pourquoi ça n'est pas un manque ici |
|-------|-------------------------------------|
| Routes API (`/api/*`) | Le seul besoin identifié était le formulaire de contact — voir ci-dessous |
| ISR et revalidation | Le contenu change quand Jérôme le réécrit, donc au build |
| Server Actions | Même raison : aucune écriture côté serveur |
| Optimiseur `next/image` | Les images sont optimisées au build, pas à la requête |

**Le formulaire de contact est donc reporté.** L'accueil et le pied de page portent un
`mailto:` direct, ce qui est cohérent avec la promesse du site — *vous écrivez à la
personne qui fera le travail*. Le jour où un formulaire s'impose, il faudra soit un
service tiers, soit un back séparé, soit renoncer à l'export : c'est un arbitrage à
prendre en connaissance de cause, pas un détail de configuration.

### Les deux routes dynamiques du site : le blog et les réalisations

`/blog/[slug]` et `/realisations/[slug]` sont les seuls segments dynamiques, et l'export
statique leur impose les mêmes règles :

- **`generateStaticParams()` est obligatoire.** Sans lui, `next build` n'a aucune page à
  écrire pour ce segment et il échoue. La liste est dérivée du contenu, jamais tenue à
  la main : publier un article ou une fiche suffit à créer sa page. `dynamicParams = false`
  est écrit noir sur blanc, pour qu'un futur passage au rendu serveur n'ouvre pas
  silencieusement `/blog/<n-importe-quoi>` ni `/realisations/<n-importe-quoi>`.
- **Le sitemap devient composé.** `INDEXABLE_ROUTES` (`src/routes`) n'énumère que les
  routes **fixes** ; les URL d'articles et de fiches ne sont pas des routes mais des
  instances de deux routes, et leur nombre change à chaque publication.
  `src/seo/sitemap-entries` les ajoute avec **une date par article** — et donne à
  `/blog` la date de son article le plus récent, parce que c'est exactement ce qui la fait
  changer. C'est le seul module de `src/seo/` qui lit le contenu éditorial : un
  sitemap est par définition l'inventaire du contenu publié, il n'y a pas d'autre source
  d'où tirer la liste.
- **Une réalisation n'est pas datée**, et le sitemap le respecte : elle porte la révision
  globale du site, comme les pages éditoriales. Ce qui la situe dans le temps, c'est la
  période du poste sous lequel elle a été menée, et cette période appartient au **contenu**
  de la fiche. Même raison côté métadonnées : `buildPageMetadata` et non
  `buildArticleMetadata`, qui exigerait une `datePublished` qu'il faudrait inventer.
- **Une seule fonction compose une URL** : `toArticleRoute(slug)`, `toRealisationRoute(slug)`.
  Liste, `canonical`, `og:url`, fil d'Ariane, JSON-LD, sitemap et renvois depuis le mur de
  preuves passent tous par elles. Dans un export statique, une URL canonique fausse reste
  fausse jusqu'au prochain build.
- **Un seul fil d'Ariane.** `buildBreadcrumbSchema` accepte les niveaux qui suivent
  l'accueil — celui-ci est un invariant du site, il est posé par la fonction et ne peut
  pas être oublié par un appelant. La même liste alimente le fil **visible**
  (`src/components/Breadcrumb`) : l'affiché et le déclaré ne peuvent pas diverger.
- **Ni le blog ni les réalisations ne sont des pôles**, et la navigation le dit : ils
  occupent un bloc distinct de la liste numérotée de la chaîne, dans l'en-tête comme dans
  le pied de page.

#### Le JSON-LD des réalisations : le type le plus pauvre possible

La liste déclare une `CollectionPage` dont le `mainEntity` est une `ItemList` ; chaque
fiche déclare une `WebPage` rattachée par `isPartOf`. **Ni `Service`, ni `CreativeWork`,
ni `Project`** : le premier affirmerait une prestation vendue, le deuxième une œuvre dont
on détiendrait les droits, le troisième une entreprise autonome. Aucune de ces trois
affirmations n'est vraie d'un travail mené sous contrat de travail — et le JSON-LD est
d'autant plus tentant à gonfler qu'il n'est lu que par des moteurs.

### Métadonnées : la fusion de Next est **de surface**

C'est le piège le plus coûteux de l'App Router, parce qu'il est silencieux : rien
n'échoue, ni au build ni au lint. Next fusionne les objets `metadata` des segments d'une
route **en surface**. Un champ imbriqué — `openGraph`, `robots`, `twitter` — déclaré par
un segment enfant **remplace intégralement** celui du layout ; il ne le complète pas.

Une page qui n'exportait que son URL de partage :

```ts
openGraph: { url: page.route }   // ✗ efface og:image, og:site_name et og:locale
```

perdait donc le visuel et l'identité du site posés par `src/app/layout.tsx`. Partagée sur
un réseau social, elle sortait en **lien nu** — sans image et sans nom de site (issue
#60). Le défaut ne se voit pas dans le code source de la page : il ne se constate que
dans le HTML généré.

Les règles qui en découlent :

- **`src/seo/open-graph.ts` porte le socle** (`SITE_OPEN_GRAPH` : `type`,
  `locale`, `siteName`, `images`). C'est la parade recommandée par Next : sortir les
  champs communs dans une constante et l'étaler dans chaque segment qui surcharge
  `openGraph`.
- **Le socle s'étale dans le constructeur commun, jamais page par page.** Les deux
  fonctions de `src/seo/page-metadata` (`buildPageMetadata` et
  `buildArticleMetadata`) écrivent `{ ...SITE_OPEN_GRAPH, url: … }`, et toutes les pages
  passent par elles. Une route ajoutée demain hérite sans y penser — c'est la seule
  raison pour laquelle ces constructeurs existent.
- **Ce qui est propre à la page vient après le spread** : `url` toujours, `type:
  'article'` et les dates pour un billet de blog.
- **Une seule déclaration de l'image.** Alt, dimensions et type MIME vivent dans
  `open-graph.ts` ; `src/app/opengraph-image.tsx` les importe pour dessiner la vignette.
  L'image produite et ce que les métadonnées en annoncent ne peuvent donc pas diverger.
- **`openGraph.images` échappe à `trailingSlash`.** Next n'applique cette règle qu'à
  `openGraph.url` ; les images sont seulement résolues contre `metadataBase`. Le chemin
  `/opengraph-image` tombe donc bien sur le fichier produit par l'export, qui n'a ni
  extension ni barre finale — et que `docker/nginx.conf` doit typer à la main, faute de
  suffixe à lire.
- **La vérification se fait sur le HTML généré**, jamais sur le code source :
  `make build`, puis inspecter les balises `og:` de `out/<route>/index.html`. Une page
  de référence qui ne surcharge rien (`out/404.html`) sert de témoin.

### L'organisation des sources

Le code front vit **directement sous `src/`**, sans découpage par domaine. Le regroupement
sous `src/@<domaine>/` a existé (`@vitrine` pour l'éditorial, `@shared` pour le transverse) :
il est **retiré**. Pour une vitrine statique de 34 composants, deux domaines ajoutaient un
niveau de chemin sans rien trancher, et aucun nom n'entrait en collision entre les deux.
*(Retrait décidé par Jérôme MARICHEZ le 2026-08-24, issue #143.)*

| Dossier | Contenu |
|---------|---------|
| `src/app/` | Le **système de pages de Next.js**. Routage seul, aucune section composée. |
| `src/views/` | Les écrans composés, un dossier par vue (`HomeView`, `ArticleView`, `PolePageView`) |
| `src/components/` | Les 34 composants, un dossier PascalCase chacun, styles colocalisés |
| `src/contenu/` | Sections éditoriales : offres, parcours, preuves, certifications, **articles du blog**, **fiches de réalisation** |
| `src/services/` | La règle métier : sélection d'un article, d'un pôle, d'une réalisation, politique de verre |
| `src/hooks/` | La logique de rendu : état d'écran, abonnements, viewport |
| `src/seo/` | Métadonnées, Open Graph, sitemap, données structurées |
| `src/interfaces/`, `src/schemas/`, `src/utils/` | Entités typées, validation Zod, helpers purs |
| `src/motion/`, `src/typography/`, `src/routes.ts` | Socle d'animation, fontes, table des routes |

Le **contenu éditorial est de la donnée, pas du JSX** : offres, expériences,
certifications et articles vivent dans des structures typées (`src/interfaces/`, une
entité par fichier, préfixe `I`) que les composants consomment. Ajouter une certification,
une offre ou un article ne doit pas demander de toucher au rendu. Le détail des entités
est décrit dans [data-model](./data-model.md).

**Les illustrations sont de la donnée aussi.** Le site ne sert aucune image matricielle :
l'illustration d'un article n'est pas un chemin de fichier mais une **valeur d'union close**
(`IArticle.figure`), rendue en SVG au serveur par `src/components/ArticleFigure`. Un
article ne peut donc pas réclamer une figure qui n'existe pas — le compilateur le dit avant
le build, et aucune ressource ne peut manquer à l'exécution. La grammaire de ces figures est
décrite dans [design](./design.md).

## Front (Next.js (App Router) + TypeScript)

- **Organisation** : **par type technique, directement sous `src/`**. Le découpage par
  domaine (`src/@<domaine>/`) n'est **pas retenu** sur ce site : voir « L'organisation des
  sources » ci-dessus.
- **Composant = un dossier** : `components/Button/index.tsx` + styles et assets
  colocalisés (`button.module.css`). **Aucune distinction entre composants purs et
  composants à effets** : la règle `_notPure/` est **retirée**, un site statique sans
  store, sans authentification et sans appel réseau n'en tirait aucun bénéfice. Les
  composants portant `'use client'` vivent avec les autres.
  *(Retrait décidé par Jérôme MARICHEZ le 2026-08-24, issue #143.)*
- **`views/` vs `pages/`** : `src/app/` est le **système de pages de Next.js** et ne fait
  que le **routage** ; les sections d'écran composées vivent dans `src/views/`.
- **Nommage des fichiers** : PascalCase pour les **composants** et **vues**
  (`Button.tsx`, `HomeView.tsx`) ; **minuscules** pour tout le reste
  (services, hooks, utilitaires, configs).
- **Nommage des symboles** : PascalCase pour les **interfaces** (`IProduct`), les
  **composants `.tsx`** et les **classes métier** de `services/` (`CartService`) ;
  camelCase pour tout le reste (fonctions, variables, hooks).
- **`services/` vs hooks** : la logique **métier** vit dans `src/services/`
  (règles de gestion, appels API) ; les **hooks React** ne portent que la logique
  de **rendu** (état d'UI, orchestration des services pour les composants).
- **`src/utils/`** : utilitaires transverses (helpers purs, formatage) — sans état,
  sans logique métier.
- **Interfaces & types** : `src/interfaces/` regroupe **toutes** les interfaces
  d'entités — une interface par fichier, nom préfixé par `I` (`IProduct`, `IUser`…) ;
  `src/interfaces/types.ts` regroupe les **alias de types purs** (unions, utilitaires),
  jamais d'interface dedans.
- **Validation des entrées — Zod (obligatoire)** : toute entrée externe (formulaire,
  réponse d'API, query params, env) passe par un schéma Zod de `src/schemas/`
  (`product.schema.ts`) ; type dérivé par `z.infer`, jamais de cast direct.
- **État** : privilégier l'état local + hooks ; un store global uniquement si justifié.
- **Composants** : max 300 lignes — extraire sous-composants et hooks personnalisés.

## API (routes du framework)

- **Découpage** : routes → services → repositories — les routes ne portent aucune
  logique métier.
- **Validation — Zod (obligatoire)** : chaque body/query/webhook est validé à la
  frontière par un schéma de `src/schemas/`.

## Choix techniques et justifications

| Choix | Alternatives considérées | Justification |
|-------|--------------------------|---------------|
| **Next.js (App Router)** | Vite + React, Astro | Rendu statique et métadonnées par page nativement, stratégie de rendu arbitrable route par route — exactement l'argument SEO vendu dans l'offre. C'est aussi la stack mise en avant sur le site : la cohérence compte. |
| **Rendu statique (SSG) par défaut** | SSR systématique | Contenu éditorial quasi figé. Coût serveur nul, TTFB minimal, Core Web Vitals au vert sans effort d'optimisation ultérieur. |
| **Pas de base de données** | CMS headless (Strapi), Notion API | Le contenu change quelques fois par an et n'a qu'un seul auteur. Le versionner dans le dépôt le rend relisible en revue de PR et supprime une dépendance d'exploitation. À réévaluer si la publication devient fréquente. |
| **Contenu typé en TypeScript** | Fichiers Markdown / MDX | Les entités (offre, expérience, certification) ont une forme stricte que le typage fait respecter — un lien de certification manquant devient une erreur de compilation, pas une page publiée avec un lien mort. |
| **Zod sur `/api/contact`** | Validation manuelle | Seule entrée externe du site, donc seule surface d'attaque : elle est validée à la frontière, type dérivé par `z.infer`. |
| **Hébergement** | _à trancher_ | Vercel (affinité Next.js, previews par PR) ou le VPS Hetzner existant. Décision à prendre avant la première mise en production. |
