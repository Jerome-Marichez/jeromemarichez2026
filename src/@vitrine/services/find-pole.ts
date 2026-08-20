// find-pole.ts — jeromemarichez-fr
// Retrouver un pôle et son suivant dans la chaîne.

import type { IPole } from '@/interfaces/IPole'
import type { PoleId } from '@/interfaces/types'
import { POLES_NAV } from '../contenu/poles-nav'

/**
 * Rend le pôle demandé et celui qui le suit.
 *
 * Le « suivant » n'est pas un détail de navigation : chaque page de pôle annonce la
 * suite de la chaîne dès son ouverture, sinon elle se lit comme une plaquette isolée.
 * Le dernier pôle n'en a pas — la boucle revient au produit, ce que sa page dit en
 * toutes lettres.
 */
export function findPole(id: PoleId): { pole: IPole; suivant?: IPole } {
  const index = POLES_NAV.findIndex((pole) => pole.id === id)
  const pole = POLES_NAV[index]

  if (!pole) throw new Error(`Pôle inconnu : ${id}`)

  return { pole, suivant: POLES_NAV[index + 1] }
}
