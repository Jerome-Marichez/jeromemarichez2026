// IRealisationsIndex.ts — jeromemarichez-fr
// L'en-tête éditoriale de la liste des réalisations.

import type { IPageMeta } from './IEditorialPage'

/**
 * La page de liste des réalisations, hors fiches.
 *
 * Même raison d'être que `IBlogIndex`, et même raison de ne pas être un
 * `IEditorialPage` : celui-ci porte des sections rédigées, alors que cette page-ci ne
 * porte qu'une accroche et se remplit toute seule à partir des fiches. Les confondre
 * aurait obligé à inventer des sections vides pour satisfaire le type.
 */
export interface IRealisationsIndex {
  /** Route servie par la liste. */
  route: string
  meta: IPageMeta
  /** Titre affiché, `<h1>`. Sert aussi de libellé au fil d'Ariane des fiches. */
  titre: string
  /** Chapô : ce qu'on trouve ici, sous quel cadre, et ce qu'on n'y trouve pas. */
  chapo: string
}
