// IArticle.ts — jeromemarichez-fr
// Un article du blog : le seul contenu du site dont la date compte.
//
// Le contenu est versionné en TypeScript, comme le reste du site (docs/architecture.md).
// Ce n'est donc **pas** une entrée externe et il n'est pas validé par Zod : la seule
// frontière que le blog franchit est le `slug` d'URL, et il est confronté à cette liste
// close au build par `generateStaticParams`, pas à un schéma.

import type { IArticleSection } from './IArticleSection'
import type { IPageMeta } from './IEditorialPage'

/**
 * Un article publié.
 *
 * `slug` est l'identité durable de l'article : il fait l'URL, la clé de recherche et
 * l'ancre du JSON-LD. Le changer casse les liens entrants et l'historique de position
 * dans les moteurs — un titre se corrige, un slug ne se corrige pas.
 */
export interface IArticle {
  /** Identifiant kebab-case, dernier segment de l'URL (`/blog/<slug>/`). Immuable. */
  slug: string
  /** Titre affiché, `<h1>` de la page. */
  titre: string
  /** Chapô, 2 à 3 phrases. Sert aussi de résumé sur la liste et dans le JSON-LD. */
  chapo: string
  /** Métadonnées SEO propres à l'article. */
  meta: IPageMeta
  /** Date de première publication, au format `AAAA-MM-JJ`. */
  datePublication: string
  /**
   * Date de dernière révision de fond, au format `AAAA-MM-JJ`.
   *
   * Absente tant que l'article n'a pas été retouché : sans ce champ, le `lastModified`
   * du sitemap resterait figé sur la publication et deviendrait faux à la première
   * correction. Une révision de forme (coquille) ne la déplace pas.
   */
  dateRevision?: string
  /** Corps de l'article, découpé en sections titrées. */
  sections: IArticleSection[]
}
