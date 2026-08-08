# Architecture

## Vue d'ensemble

Deux applications séparées, une frontière HTTP explicite entre les deux.

```
                 ┌─────────────────────────────┐
   Visiteur ────►│ front/  Next.js (port 3000) │  pages statiques (SSG/ISR) : offres,
                 │                             │  parcours, certifications
                 └──────────────┬──────────────┘
                                │ HTTP (JSON, contrats de shared/)
                 ┌──────────────▼──────────────┐
                 │ back/  API Node (port 3001) │  formulaire de contact, /health,
                 │                             │  intégrations futures
                 └─────────────────────────────┘

   shared/  ── interfaces IXxx + schémas Zod communs aux deux côtés
```

**Le contenu éditorial reste côté front et prérendu.** Le back ne sert pas les pages :
il porte ce qui ne peut pas être statique — aujourd'hui l'envoi du formulaire de
contact, demain les intégrations (mesure d'audience côté serveur, webhooks, endpoints
appelables par un agent).

**Conséquence structurante** : tout ce qui peut être prérendu l'est. Une page qui exige
du rendu serveur doit le justifier — c'est la contrainte SEO et performance du
`README.md` qui commande, et le site est lui-même la démonstration de ce qu'il vend.

### Découpage par domaine (front)

| Domaine | Contenu |
|---------|---------|
| `front/src/@vitrine/` | Sections éditoriales : offres, parcours, preuves, certifications |
| `front/src/@contact/` | Formulaire et son appel à l'API back |
| `front/src/@shared/` | Design system, layout, composants transverses, SEO/métadonnées |

Le **socle SEO** vit dans `front/src/@shared/seo/` : origine du site (seul lecteur de
l'environnement), construction des métadonnées par page, données structurées JSON-LD et
découverte des routes réelles qui alimente le `sitemap.xml`. Une page ne rédige jamais
ses balises elle-même — elle déclare un titre, une description et un chemin, le reste en
découle. Marche à suivre : [`seo.md`](./seo.md).

Le **contenu éditorial est de la donnée, pas du JSX** : offres, expériences et
certifications vivent dans des structures typées (`front/src/interfaces/`, une entité
par fichier, préfixe `I`) que les composants consomment. Ajouter une certification ou
une offre ne doit pas demander de toucher au rendu.

**Le contrat de contact vit dans `shared/`** : `shared/interfaces/` pour l'entité,
`shared/schemas/` pour le schéma Zod. Le front valide avant l'envoi, le back revalide à
la frontière — **le même schéma**, jamais dupliqué.

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

## Partage front/back

- **`shared/`** à la racine : `shared/interfaces/` (entités `IXxx` communes) et
  `shared/schemas/` (schémas Zod communs) — une entité partagée n'est **jamais
  dupliquée** côté front et côté back.

## Back

- **Découpage** : routes → services → repositories.
- **Validation — Zod (obligatoire)** : chaque body/query/webhook est validé à la
  frontière par un schéma de `back/src/schemas/` (ou `shared/schemas/` si partagé).

## Choix techniques et justifications

| Choix | Alternatives considérées | Justification |
|-------|--------------------------|---------------|
| **Front et back séparés** | Next.js seul avec ses API routes | Choix explicite de Jérôme. Le back existe indépendamment du site : il pourra porter des intégrations (webhooks, endpoints appelables par un agent) sans que le front, lui, cesse d'être une vitrine entièrement prérendue. Coût assumé : deux applications à déployer et à exploiter. |
| **Next.js (App Router)** côté front | Vite + React, Astro | Rendu statique et métadonnées par page nativement, stratégie de rendu arbitrable route par route — exactement l'argument SEO vendu dans l'offre. C'est aussi la stack mise en avant sur le site : la cohérence compte. |
| **Rendu statique (SSG) par défaut** | SSR systématique | Contenu éditorial quasi figé. Coût serveur nul, TTFB minimal, Core Web Vitals au vert sans effort d'optimisation ultérieur. |
| **Back `node:http` sans framework** | Express, Fastify | Point de départ posé par le bootstrap. La surface est minuscule (contact, `/health`) ; introduire un framework se décidera quand une vraie route le justifiera, pas avant. |
| **Pas de base de données** | CMS headless (Strapi), Notion API | Le contenu change quelques fois par an et n'a qu'un seul auteur. Le versionner dans le dépôt le rend relisible en revue de PR et supprime une dépendance d'exploitation. À réévaluer si la publication devient fréquente. |
| **Contenu typé en TypeScript** | Fichiers Markdown / MDX | Les entités (offre, expérience, certification) ont une forme stricte que le typage fait respecter — un lien de certification manquant devient une erreur de compilation, pas une page publiée avec un lien mort. |
| **Preuves référencées, jamais recopiées** | Reprendre le texte des preuves dans le contenu de chaque page | Une page qui met en avant une preuve la désigne par `{ offre, axe }` (`IReferencePreuve`) ; `services/preuves.service.ts` la résout contre `content/offres/`. Le texte reste écrit à un seul endroit, celui qui a été relu contre les règles de véracité. Une référence cassée, ou pointant un axe sans preuve publiable, lève une erreur **au build** — le site ne peut pas afficher une affirmation non prouvée. |
| **Sitemap dérivé des routes réelles** | Liste de routes maintenue à la main ; bibliothèque tierce | `@shared/seo/routes.server.ts` lit l'arborescence de `src/app/` au build : la seule façon d'entrer dans le sitemap est d'exister comme route. Une liste manuelle serait juste le jour de son écriture et fausse au premier ajout de page — et un sitemap faux est pire qu'absent, il envoie les moteurs sur des 404 sans qu'aucun test ni aucun lint ne s'en aperçoive. Coût assumé : une lecture du système de fichiers au build, et les routes dynamiques restent à déclarer explicitement. |
| **Métadonnées construites par un module partagé** | Chaque page écrit ses balises | Une page déclare un titre, une description et un chemin ; canonique, Open Graph et carte Twitter en découlent. Les entrées sont bornées par Zod (60 / 160 caractères) et les pages étant prérendues, un dépassement casse le **build**. Le défaut SEO devient une erreur de compilation au lieu d'une régression invisible. |
| **Schéma de contact dans `shared/`** | Un schéma par côté | Front et back valident le **même** contrat Zod. Une divergence de validation entre les deux serait un bug invisible jusqu'au premier message perdu. |
| **Hébergement** | _à trancher_ | Le front s'héberge naturellement sur Vercel (affinité Next.js, previews par PR) ; le back demande un hôte distinct (Cloud Run, ou le VPS Hetzner existant). Décision à prendre avant la première mise en production. |
