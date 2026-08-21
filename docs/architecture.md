# Architecture

## Vue d'ensemble

Site **vitrine** : l'essentiel est du contenu éditorial rendu statiquement. Il n'y a ni
base de données ni authentification — la seule surface dynamique est le formulaire de
contact.

```
Visiteur ──► Pages statiques (SSG)          ── contenu des offres, parcours, certifications
         └─► POST /api/contact (route API)  ── validation Zod ──► envoi du message
```

**Conséquence structurante** : tout ce qui peut être prérendu l'est. Une page qui exige
du rendu serveur doit le justifier — c'est la contrainte SEO et performance du
`README.md` qui commande, et le site est lui-même la démonstration de ce qu'il vend.

### Découpage par domaine

| Domaine | Contenu |
|---------|---------|
| `src/@vitrine/` | Sections éditoriales : offres, parcours, preuves, certifications |
| `src/@contact/` | Formulaire, schéma Zod, service d'envoi |
| `src/@shared/` | Design system, layout, composants transverses, SEO/métadonnées |

Le **contenu éditorial est de la donnée, pas du JSX** : offres, expériences et
certifications vivent dans des structures typées (`src/interfaces/`, une entité par
fichier, préfixe `I`) que les composants consomment. Ajouter une certification ou une
offre ne doit pas demander de toucher au rendu.

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
