// find-pole.ts — jeromemarichez-fr
// Retrouver un pôle et les suites qu'il ouvre.

import type { IPole } from '@/interfaces/IPole'
import type { PoleId } from '@/interfaces/types'
import { JOINTURES } from '../contenu/jointures'
import { POLES_NAV } from '../contenu/poles-nav'

/**
 * Rend le pôle demandé et les pôles vers lesquels il ouvre.
 *
 * `suites` est un **tableau**, et pas un `suivant` optionnel : la donnée en ouvre deux —
 * l'IA et le SEA & UX — et il n'existe aucun ordre entre elles. Un champ au singulier
 * obligerait à en élire une, ce qui inventerait une succession que le modèle n'a pas.
 *
 * Les suites se lisent dans les **arêtes**, pas dans la position du pôle dans le tableau
 * de navigation : l'index d'un tableau ne sait rien d'un embranchement.
 */
export function findPole(id: PoleId): { pole: IPole; suites: IPole[] } {
  const pole = POLES_NAV.find((candidat) => candidat.id === id)

  if (!pole) throw new Error(`Pôle inconnu : ${id}`)

  const avals = JOINTURES.filter((jointure) => jointure.amont === id).map(
    (jointure) => jointure.aval,
  )

  return {
    pole,
    suites: POLES_NAV.filter((candidat) => avals.includes(candidat.id)),
  }
}
