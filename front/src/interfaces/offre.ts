// offre.ts — jeromemarichez2026
// Entité éditoriale : une des trois offres de service du site.
import type { IAxeOffre } from './axe-offre'
import type { CleOffre } from './types'

/**
 * Une offre de service (Ingénierie Web, Data & IA, SEA).
 *
 * `decisionPermise` est structurant : la ligne éditoriale interdit de terminer un bloc
 * de service sur une liste d'outils — il se termine sur ce que le client peut trancher
 * grâce à la prestation.
 */
export interface IOffre {
  readonly cle: CleOffre
  readonly titre: string
  /** Une phrase : ce que couvre l'offre, sans superlatif. */
  readonly accroche: string
  /** Ce que le client peut décider grâce à la prestation. Jamais une liste d'outils. */
  readonly decisionPermise: string
  readonly axes: readonly IAxeOffre[]
}
