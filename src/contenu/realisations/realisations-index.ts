// realisations-index.ts — jeromemarichez-fr
// L'en-tête éditoriale de la liste. Les fiches, elles, viennent de `realisations.ts`.

import type { IRealisationsIndex } from '@/interfaces/IRealisationsIndex'
import { ROUTES } from '@/routes'

/**
 * Le libellé « Réalisations » est repris à l'identique dans la navigation, le fil
 * d'Ariane, le titre de la page et l'URL — même règle que pour le blog.
 *
 * Le chapô porte le cadre, et il le porte en clair plutôt qu'en note de bas de page : un
 * visiteur qui arrive ici cherche des références clients, et il doit apprendre en deux
 * phrases à quel titre chaque travail a été mené — deux postes salariés, une mission en
 * indépendant. Le dire franchement vaut mieux que le laisser découvrir fiche par fiche, et
 * mieux que l'ancienne formule « trois postes salariés », qui était fausse pour Truffle
 * Capital (issue #107).
 */
export const REALISATIONS_INDEX: IRealisationsIndex = {
  route: ROUTES.realisations,
  titre: 'Réalisations',
  meta: {
    title: 'Réalisations — ce que j’ai construit, et dans quel cadre',
    description:
      'Treize réalisations avec leur cadre réel : statut, intitulé de poste, période, ' +
      'équipe. Trois portent un chiffre, les autres n’en portent aucun.',
  },
  chapo:
    'Deux postes salariés et une mission en indépendant. Chaque fiche porte le cadre dans ' +
    'lequel elle a été menée — statut, intitulé exact, période, équipe. Trois fiches ' +
    'portent un chiffre ; les autres n’en portent aucun, parce que je ne publie que les ' +
    'chiffres que je peux tenir.',
}
