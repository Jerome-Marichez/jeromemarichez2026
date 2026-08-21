// page-metadata.ts — jeromemarichez-fr
// Les métadonnées d'une page, construites une seule fois pour toutes les pages.
//
// Le layout ne porte plus ni `canonical` ni `openGraph.url` : une valeur héritée y est
// forcément fausse partout sauf sur l'accueil, et une URL de partage fausse est pire
// qu'une URL absente — elle attribue le partage à la mauvaise page. Chaque page déclare
// donc la sienne, et c'est cette fonction qui la déclare pour elle.

import type { Metadata } from 'next'
import type { IPageMeta } from '@/interfaces/IEditorialPage'

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
