// page-metadata.ts — jeromemarichez-fr
// Les métadonnées d'une page, construites une seule fois pour toutes les pages.
//
// Le layout ne porte plus ni `canonical` ni `openGraph.url` : une valeur héritée y est
// forcément fausse partout sauf sur l'accueil, et une URL de partage fausse est pire
// qu'une URL absente — elle attribue le partage à la mauvaise page. Chaque page déclare
// donc la sienne, et c'est cette fonction qui la déclare pour elle.

import type { Metadata } from 'next'
import type { IPageMeta } from '@/interfaces/IEditorialPage'
import { SITE_IDENTITY } from './site'

/**
 * Métadonnées d'une page à partir de son contenu éditorial.
 *
 * `title` et `description` ne sont volontairement pas repris dans le bloc `openGraph` :
 * sans surcharge, Next y recopie le titre **après** application du gabarit du layout
 * (`%s — Jérôme Marichez`), ce qui est la forme voulue pour un partage. Les redéclarer
 * ici perdrait le nom du site.
 *
 * Les URL sont relatives : `metadataBase` (layout) les résout en absolu, barre finale
 * comprise puisque `trailingSlash` est actif.
 */
export function buildPageMetadata(page: { meta: IPageMeta; route: string }): Metadata {
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: page.route },
    openGraph: { url: page.route },
  }
}

/**
 * Métadonnées d'un article de blog.
 *
 * Deux différences avec une page ordinaire, et une seule raison : un article est daté.
 * `og:type` passe donc à `article` et la date de publication accompagne le partage —
 * c'est ce qui permet à un agrégateur de classer le billet plutôt que de le traiter
 * comme une page de site parmi d'autres.
 *
 * L'appelant fournit la route, comme pour `buildPageMetadata`, mais il la tient de
 * `toArticleRoute(slug)` : c'est la seule façon de composer une URL d'article dans ce
 * dépôt, donc la seule qui garantisse que `canonical` et `og:url` désignent la page
 * réellement servie.
 */
export function buildArticleMetadata(article: {
  meta: IPageMeta
  route: string
  datePublished: string
  dateModified: string
}): Metadata {
  return {
    title: article.meta.title,
    description: article.meta.description,
    alternates: { canonical: article.route },
    openGraph: {
      type: 'article',
      url: article.route,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [SITE_IDENTITY.nom],
    },
  }
}
