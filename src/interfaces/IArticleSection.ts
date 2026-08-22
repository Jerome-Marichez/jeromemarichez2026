// IArticleSection.ts — jeromemarichez-fr
// Une section d'article : un titre et ses paragraphes.

/**
 * Section du corps d'un article.
 *
 * Volontairement pauvre : un titre, des paragraphes. Un article du site n'est pas un
 * gabarit de page — lui donner des blocs, des encarts et des niveaux de titre libres
 * reviendrait à réinventer un éditeur, et à ouvrir la porte à des articles qui ne se
 * ressemblent plus. Le jour où un article demande davantage, c'est le modèle qu'on
 * élargit, pas le rendu qu'on contourne.
 */
export interface IArticleSection {
  /** Identifiant kebab-case, sert d'ancre (`#id`) et de cible aux liens profonds. */
  id: string
  /** Titre de la section, rendu en `<h2>`. */
  titre: string
  /** Paragraphes de la section. Texte fini, publiable tel quel. */
  paragraphes: string[]
}
