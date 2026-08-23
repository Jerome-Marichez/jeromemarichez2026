// IArticle.ts — jeromemarichez-fr
// Un article du blog : le seul contenu du site dont la date compte.
//
// Le contenu est versionné en TypeScript, comme le reste du site (docs/architecture.md).
// Ce n'est donc **pas** une entrée externe et il n'est pas validé par Zod : la seule
// frontière que le blog franchit est le `slug` d'URL, et il est confronté à cette liste
// close au build par `generateStaticParams`, pas à un schéma.

import type { IArticleSection } from './IArticleSection'
import type { IArticleSource } from './IArticleSource'
import type { IPageMeta } from './IEditorialPage'
import type { ArticleFigureId } from './types'

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
  /**
   * La figure qui illustre l'article. Obligatoire, et c'est délibéré.
   *
   * Rendue à l'identique sur la fiche et sur la carte de la liste, elle est ce qui
   * distingue un article d'un autre à l'œil. La laisser facultative aurait produit une
   * liste où certains articles ont une figure et d'autres pas, c'est-à-dire un rythme
   * cassé sans qu'aucune information ne le justifie.
   *
   * Ce n'est **pas** un chemin de fichier : le site ne sert aucune image matricielle, et
   * cette valeur désigne un tracé SVG rendu au serveur (voir `ArticleFigureId`). Deux
   * articles peuvent partager une figure — rien ne l'interdit ici — mais les trois
   * articles publiés en ont chacun une, sans quoi la figure cesserait de distinguer.
   */
  figure: ArticleFigureId
  /**
   * Publication d'origine de l'article, quand il en a une.
   *
   * Optionnelle, et elle le restera : les trois premiers articles ont été écrits pour ce
   * site et n'ont pas de post d'origine. **Une URL absente ne se devine pas** — un
   * article sans source fournie se publie sans source, et la fiche n'affiche alors
   * simplement rien. Voir `IArticleSource`.
   */
  source?: IArticleSource
  /** Corps de l'article, découpé en sections titrées. */
  sections: IArticleSection[]
}
