// formation.ts — jeromemarichez2026
// Entité éditoriale : un diplôme du parcours de formation.
import type { NiveauFormation } from './types'

/** Un diplôme obtenu, tel qu'inscrit sur les CV de référence. */
export interface IFormation {
  readonly cle: string
  readonly intitule: string
  readonly niveau: NiveauFormation
  readonly ville: string
  /** Année d'obtention. */
  readonly annee: number
}
