// realisations-index.ts — jeromemarichez-fr
// L'en-tête éditoriale de la liste. Les fiches, elles, viennent de `realisations.ts`.

import { ROUTES } from '@/@shared/routes'
import type { IRealisationsIndex } from '@/interfaces/IRealisationsIndex'

/**
 * Le libellé « Réalisations » est repris à l'identique dans la navigation, le fil
 * d'Ariane, le titre de la page et l'URL — même règle que pour le blog.
 *
 * Le chapô porte l'arbitrage de nom, et il le porte en clair plutôt qu'en note de bas de
 * page : un visiteur qui arrive ici cherche des références clients, et il doit apprendre
 * en deux phrases que ce n'en sont pas. Le dire franchement vaut mieux que le laisser
 * découvrir fiche par fiche.
 */
export const REALISATIONS_INDEX: IRealisationsIndex = {
  route: ROUTES.realisations,
  titre: 'Réalisations',
  meta: {
    title: 'Réalisations — ce que j’ai construit, et dans quel cadre',
    description:
      'Treize réalisations avec leur cadre d’emploi réel : intitulé de poste, période, ' +
      'équipe. Trois portent un chiffre, les autres n’en portent aucun.',
  },
  chapo:
    'Ce ne sont pas des cas clients : ce sont trois postes salariés, et chaque fiche porte le ' +
    'cadre dans lequel elle a été menée — intitulé exact, période, équipe. Trois fiches ' +
    'portent un chiffre ; les autres n’en portent aucun, parce que je ne publie que les ' +
    'chiffres que je peux tenir.',
}
