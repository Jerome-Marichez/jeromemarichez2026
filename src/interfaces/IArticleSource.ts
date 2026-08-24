// IArticleSource.ts — jeromemarichez-fr
// La publication d'origine d'un article, quand il en a une.
//
// Un article du blog peut reprendre un texte d'abord paru ailleurs — un post LinkedIn.
// Le dire est une exigence d'honnêteté élémentaire : sans ce champ, le site s'attribuait
// implicitement la primeur d'un contenu qu'il republie.

import type { ArticleSourceReseau } from './types'

/**
 * Le post d'origine d'un article.
 *
 * **L'URL ne s'invente ni ne s'approxime.** C'est la règle déjà appliquée aux
 * justificatifs de certification dans le `CLAUDE.md`, et elle vaut ici à l'identique :
 * un article dont l'adresse d'origine n'a pas été fournie par Jérôme MARICHEZ se publie
 * **sans source**, jamais avec un lien deviné. C'est la raison d'être du caractère
 * optionnel du champ `source` d'`IArticle` — pas une commodité de saisie.
 *
 * Aucun libellé n'est porté ici : il se déduit de `reseau` au rendu, pour que le nom du
 * réseau soit écrit une fois pour tout le site.
 */
export interface IArticleSource {
  /** Le réseau où le texte a d'abord paru. Décide du libellé affiché. */
  reseau: ArticleSourceReseau
  /**
   * URL absolue du post d'origine, telle que fournie.
   *
   * Elle sort du site : le rendu lui pose `rel="noopener noreferrer"` et signale son
   * caractère externe autrement que par la couleur (WCAG 1.4.1).
   */
  url: string
}
