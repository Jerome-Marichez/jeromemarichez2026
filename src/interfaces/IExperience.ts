import type { StatutExperience } from './types'

/**
 * Une expérience professionnelle. `posteIntitule` est repris à l'identique du CV
 * source, sans réécriture : voir CLAUDE.md, table des interdits, ligne « intitulés
 * de poste historiques ».
 */
export interface IExperience {
  periode: string
  entreprise: string
  secteur: string
  statut: StatutExperience
  posteIntitule: string
  contexte: string
  realisations: string[]
  stackTechnique: string[]
  encadrement: string | null
}
