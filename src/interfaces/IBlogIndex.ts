// IBlogIndex.ts — jeromemarichez-fr
// L'en-tête éditoriale de la liste d'articles.

import type { IPageMeta } from './IEditorialPage'

/**
 * La page de liste du blog, hors articles.
 *
 * Elle n'est pas un `IEditorialPage` : celui-ci porte des sections rédigées, alors que
 * la liste ne porte qu'une accroche et se remplit toute seule à partir des articles.
 * Les confondre aurait obligé à inventer des sections vides pour satisfaire le type.
 */
export interface IBlogIndex {
  /** Route servie par la liste. */
  route: string
  meta: IPageMeta
  /** Titre affiché, `<h1>`. Sert aussi de libellé au fil d'Ariane des articles. */
  titre: string
  /** Chapô, 2 à 3 phrases : ce qu'on trouve ici, et ce qu'on n'y trouve pas. */
  chapo: string
}
