// find-jointure.ts — jeromemarichez-fr
// Retrouver l'arête qui mène à un pôle, ou celles qui en partent.

import type { IJointure } from '@/interfaces/IJointure'
import type { PoleId } from '@/interfaces/types'
import { JOINTURES } from '../contenu/jointures'

/**
 * L'arête qui **mène** au pôle demandé, s'il en a une.
 *
 * Chaque pôle a au plus un amont dans le modèle actuel — le socle n'en a aucun. C'est
 * l'arête entrante qui porte la phrase la plus utile au prospect : ce qui est requis, et
 * le fait que la matière déjà en sa possession ne se repaie pas.
 */
export function jointureVers(aval: PoleId): IJointure | undefined {
  return JOINTURES.find((jointure) => jointure.aval === aval)
}

/**
 * Les arêtes qui **partent** du pôle demandé.
 *
 * Un tableau, parce que la donnée en a deux et qu'elles sont parallèles.
 */
export function jointuresDepuis(amont: PoleId): IJointure[] {
  return JOINTURES.filter((jointure) => jointure.amont === amont)
}
