// IPole.ts — jeromemarichez-fr
// Un des trois pôles de la chaîne, vu depuis la navigation et la page d'accueil.

import type { PoleId, PoleRank } from './types'

/**
 * Un pôle de compétence.
 *
 * Les trois pôles ne se vendent pas séparément : ils forment une chaîne — construire,
 * exploiter et mesurer, arbitrer — et c'est le même interlocuteur qui la tient de bout
 * en bout. `remise` porte ce que le pôle transmet au suivant : c'est ce champ qui
 * empêche le site de retomber sur un catalogue de trois offres juxtaposées.
 */
export interface IPole {
  id: PoleId
  /** Rang dans la chaîne. */
  rang: PoleRank
  /** Nom affiché du pôle. */
  nom: string
  /** Route de la page de détail. */
  route: string
  /** Promesse du pôle en une phrase. */
  promesse: string
  /** Ce que ce pôle prend en charge, en 2 ou 3 phrases. */
  accroche: string
  /** Ce que le pôle remet au suivant. Absent pour le dernier maillon. */
  remise?: string
}
