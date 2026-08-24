// routes.ts — jeromemarichez-fr
// Les routes du site, énumérées une seule fois.
//
// Navigation, sitemap, fils d'Ariane et données structurées lisent toutes cette
// liste : une page ajoutée ici apparaît partout, une page oubliée nulle part.

import type { PoleId } from '@/interfaces/types'

export const ROUTES = {
  accueil: '/',
  blog: '/blog',
  realisations: '/realisations',
  'ingenierie-web': '/services/ingenierie-web',
  data: '/services/data',
  ia: '/services/ia',
  'sea-ux': '/services/sea-ux',
} as const satisfies Record<'accueil' | 'blog' | 'realisations' | PoleId, string>

/**
 * Toutes les routes **fixes** indexables.
 *
 * `ia` et `sea-ux` s'y suivent sans que cela dise quoi que ce soit : ce sont les deux
 * suites parallèles de la donnée, et un sitemap ne porte aucun ordre — c'est un
 * inventaire. Toute lecture ordonnée de cette liste serait une erreur.
 *
 * Les URL d'articles et de réalisations n'y figurent pas : ce ne sont pas des routes du
 * site mais des instances de deux routes dynamiques, et leur nombre change à chaque
 * publication. C'est le sitemap qui les ajoute, à partir des listes de contenu
 * (`src/seo/sitemap-entries`).
 */
export const INDEXABLE_ROUTES = [
  ROUTES.accueil,
  ROUTES['ingenierie-web'],
  ROUTES.data,
  ROUTES.ia,
  ROUTES['sea-ux'],
  ROUTES.realisations,
  ROUTES.blog,
] as const

/**
 * Route d'un article à partir de son slug.
 *
 * Une seule fonction sait comment une URL d'article se compose : liste, métadonnées,
 * fil d'Ariane, JSON-LD et sitemap passent tous par elle. Sans ça, le préfixe `/blog`
 * serait recopié à cinq endroits et une page finirait par se déclarer canonique sur une
 * URL qu'elle n'occupe pas.
 */
export function toArticleRoute(slug: string): string {
  return `${ROUTES.blog}/${slug}`
}

/**
 * Route d'une réalisation à partir de son slug.
 *
 * Même règle que pour un article, et pour la même raison : liste, métadonnées, fil
 * d'Ariane, JSON-LD, sitemap et renvois depuis le mur de preuves passent tous par ici.
 * Dans un export statique, une URL canonique fausse le reste jusqu'au prochain build.
 */
export function toRealisationRoute(slug: string): string {
  return `${ROUTES.realisations}/${slug}`
}
