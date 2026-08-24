// IRealisationGroupe.ts — jeromemarichez-fr
// Un cadre d'emploi et les réalisations qui s'y rattachent.

import type { IRealisation } from './IRealisation'
import type { IRealisationCadre } from './IRealisationCadre'

/**
 * Le groupe tel que la liste l'affiche : un cadre d'emploi, puis ses fiches.
 *
 * C'est une **vue dérivée**, pas une donnée saisie : elle est calculée par
 * `src/services/find-realisation`, jamais déclarée dans le contenu. La déclarer
 * aurait créé une seconde liste de fiches, qui aurait fini par contredire la première.
 */
export interface IRealisationGroupe {
  cadre: IRealisationCadre
  realisations: IRealisation[]
}
