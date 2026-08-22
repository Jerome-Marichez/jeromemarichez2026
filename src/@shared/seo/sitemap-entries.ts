// sitemap-entries.ts — jeromemarichez-fr
// Les entrées du sitemap : les routes fixes du site, plus un article par publication.
//
// La logique vit ici et non dans `src/app/sitemap.ts` : `app/` ne fait que du routage
// (docs/architecture.md), et cette liste-ci se vérifie sans démarrer Next.
//
// C'est le seul module de `@shared/seo` qui lit le contenu de `@vitrine`. C'est assumé :
// un sitemap est par définition l'inventaire du contenu publié, il n'existe aucune autre
// source d'où tirer la liste des articles.

import type { MetadataRoute } from 'next'
import { articleRevisionDate, listArticles } from '@/@vitrine/services/find-article'
import { INDEXABLE_ROUTES, ROUTES, toArticleRoute } from '../routes'
import { SITE_DERNIERE_REVISION } from './site'
import { toAbsoluteUrl } from './urls'

/**
 * Toutes les URL indexables du site, avec leur date de dernière modification.
 *
 * Trois dates différentes, et c'est voulu :
 * - les pages éditoriales portent la révision globale du site, tenue à la main ;
 * - un article porte **sa** date — c'est tout l'intérêt d'avoir un blog dans un sitemap ;
 * - la liste `/blog` porte la date de son article le plus récent, parce que c'est
 *   exactement ce qui la fait changer. Lui laisser la date globale reviendrait à
 *   annoncer une page modifiée les jours où elle ne l'est pas, et inchangée le jour
 *   d'une publication — soit le contraire du signal attendu.
 */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const articles = listArticles()
  const premier = articles[0]
  const dateBlog = premier ? articleRevisionDate(premier) : SITE_DERNIERE_REVISION

  const routesFixes = INDEXABLE_ROUTES.map((route) => ({
    url: toAbsoluteUrl(route),
    lastModified: route === ROUTES.blog ? dateBlog : SITE_DERNIERE_REVISION,
  }))

  const pagesArticles = articles.map((article) => ({
    url: toAbsoluteUrl(toArticleRoute(article.slug)),
    lastModified: articleRevisionDate(article),
  }))

  return [...routesFixes, ...pagesArticles]
}
