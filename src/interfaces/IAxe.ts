import type { IPreuve } from './IPreuve'
import type { NomAxe } from './types'

/**
 * Un des quatre axes de la pratique (Full Stack, IA, QA, Data-Driven). Les quatre
 * axes n'ont aucun ordre hiérarchique entre eux : voir CLAUDE.md, section
 * « Positionnement ».
 */
export interface IAxe {
  nom: NomAxe
  phrase: string
  preuves: IPreuve[]
}
