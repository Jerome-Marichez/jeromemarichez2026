// experience.ts — jeromemarichez2026
// Entité éditoriale : une expérience professionnelle du parcours.
import type { CleOffre } from './types'

/**
 * Une expérience professionnelle.
 *
 * `intitule` est repris **à l'identique des CV de référence**
 * (`/Users/nicolasb/Documents/CV/`) : l'historique ne se réécrit jamais pour coller à
 * une offre de service. Règle : CLAUDE.md, « Règles de véracité du contenu ».
 */
export interface IExperience {
  readonly cle: string
  /** Intitulé de poste repris à l'identique des CV — jamais reformulé. */
  readonly intitule: string
  readonly employeur: string
  readonly secteur: string
  readonly anneeDebut: number
  readonly anneeFin: number
  /** Cadre du poste : taille d'équipe, périmètre, degré d'autonomie. */
  readonly contexte: string
  /** Faits marquants, chacun portant sa preuve quand elle existe. */
  readonly faits: readonly string[]
  /** Offres que cette expérience vient appuyer. */
  readonly offresLiees: readonly CleOffre[]
}
