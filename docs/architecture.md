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

### Le blog : la seule route dynamique du site

`/blog/[slug]` est le seul segment dynamique, et l'export statique en fixe les règles :

- **`generateStaticParams()` est obligatoire.** Sans lui, `next build` n'a aucune page à
  écrire pour ce segment et il échoue. La liste est dérivée des articles, jamais tenue à
  la main : publier un article suffit à créer sa page. `dynamicParams = false` est écrit
  noir sur blanc, pour qu'un futur passage au rendu serveur n'ouvre pas silencieusement
  `/blog/<n-importe-quoi>`.
- **Le sitemap devient composé.** `INDEXABLE_ROUTES` (`@shared/routes`) n'énumère que les
  routes **fixes** ; les URL d'articles ne sont pas des routes mais des instances d'une
  seule route, et leur nombre change à chaque publication. `@shared/seo/sitemap-entries`
  les ajoute avec **une date par article** — et donne à `/blog` la date de son article le
  plus récent, parce que c'est exactement ce qui la fait changer. C'est le seul module de
  `@shared/seo` qui lit le contenu de `@vitrine` : un sitemap est par définition
  l'inventaire du contenu publié, il n'y a pas d'autre source d'où tirer la liste.
- **Une seule fonction compose une URL d'article** : `toArticleRoute(slug)`. Liste,
  `canonical`, `og:url`, fil d'Ariane, JSON-LD et sitemap passent tous par elle. Dans un
  export statique, une URL canonique fausse reste fausse jusqu'au prochain build.
- **Un seul fil d'Ariane.** `buildBreadcrumbSchema` accepte les niveaux qui suivent
  l'accueil — celui-ci est un invariant du site, il est posé par la fonction et ne peut
  pas être oublié par un appelant. La même liste alimente le fil **visible**
  (`@shared/components/Breadcrumb`) : l'affiché et le déclaré ne peuvent pas diverger.
- **Le blog n'est pas un pôle**, et la navigation le dit : il occupe un bloc distinct de
  la liste numérotée de la chaîne, dans l'en-tête comme dans le pied de page.

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

- **`src/@shared/seo/open-graph.ts` porte le socle** (`SITE_OPEN_GRAPH` : `type`,
  `locale`, `siteName`, `images`). C'est la parade recommandée par Next : sortir les
  champs communs dans une constante et l'étaler dans chaque segment qui surcharge
  `openGraph`.
- **Le socle s'étale dans le constructeur commun, jamais page par page.** Les deux
  fonctions de `@shared/seo/page-metadata` (`buildPageMetadata` et
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

### Découpage par domaine

| Domaine | Contenu |
|---------|---------|
| `src/@vitrine/` | Sections éditoriales : offres, parcours, preuves, certifications, **articles du blog** |
| `src/@shared/` | Design system, layout, composants transverses, SEO/métadonnées |

Le **contenu éditorial est de la donnée, pas du JSX** : offres, expériences,
certifications et articles vivent dans des structures typées (`src/interfaces/`, une
entité par fichier, préfixe `I`) que les composants consomment. Ajouter une certification,
une offre ou un article ne doit pas demander de toucher au rendu. Le détail des entités
est décrit dans [data-model](./data-model.md).

## Front (Next.js (App Router) + TypeScript)

- **Organisation** : par domaine **métier**, pas par type technique. Quand l'app
  grandit, chaque domaine vit sous `src/@<domaine>/` (ex. `@core` = socle applicatif,
  `@vitrine` = site public, `@shared` = transverse) et porte ses propres
  `components/`, `hooks/`, `services/`, `utils/`, `interfaces/`.
- **Composant = un dossier** : `components/Button/index.tsx` + styles et assets
  colocalisés (`button.module.css`). Composants **purs** par défaut ; ceux qui portent
  des effets (store, réseau, auth) sont isolés dans `_notPure/`.
- **`views/` vs `pages/`** : `pages/` (ou `app/`) ne fait que le **routage** ; les
  sections d'écran composées vivent dans `src/views/<domaine>/`.
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
