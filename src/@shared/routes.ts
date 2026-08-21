// routes.ts — jeromemarichez-fr
// Les routes du site, énumérées une seule fois.
//
// Navigation, sitemap, fils d'Ariane et données structurées lisent toutes cette
// liste : une page ajoutée ici apparaît partout, une page oubliée nulle part.

import type { PoleId } from '@/interfaces/types'

export const ROUTES = {
  accueil: '/',
  blog: '/blog',
  'ingenierie-web': '/services/ingenierie-web',
  'data-ia': '/services/data-ia',
  'sea-ux': '/services/sea-ux',
} as const satisfies Record<'accueil' | 'blog' | PoleId, string>

/**
 * Toutes les routes **fixes** indexables, dans l'ordre de priorité.
 *
 * Les URL d'articles n'y figurent pas : elles ne sont pas des routes du site mais des
 * instances d'une seule route dynamique, et leur nombre change à chaque publication.
 * C'est le sitemap qui les ajoute, à partir de la liste des articles
 * (`@shared/seo/sitemap-entries`).
 */
export const INDEXABLE_ROUTES = [
  ROUTES.accueil,
  ROUTES['ingenierie-web'],
  ROUTES['data-ia'],
  ROUTES['sea-ux'],
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
