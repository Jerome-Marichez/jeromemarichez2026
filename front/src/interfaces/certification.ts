// certification.ts — jeromemarichez2026
// Entité éditoriale : une certification obtenue et son justificatif officiel.
import type { Justificatif } from './types'

/**
 * Une certification.
 *
 * Deux garde-fous de véracité sont portés par le typage lui-même :
 *
 * - `justificatif` est une union discriminée. Tant que l'URL officielle n'a pas été
 *   fournie par Jérôme MARICHEZ, la variante est `a-fournir` et **ne porte pas de
 *   propriété `url`** : le rendu ne peut pas produire un lien mort ou inventé sans
 *   échouer à la compilation.
 * - `annee` vaut `null` quand l'année n'est pas établie de façon certaine (sources
 *   divergentes ou absente des CV). Une année approchée ne s'écrit jamais.
 */
export interface ICertification {
  readonly cle: string
  readonly intitule: string
  readonly organisme: string
  /** Année d'obtention, ou `null` si elle n'est pas établie. Jamais approchée. */
  readonly annee: number | null
  readonly justificatif: Justificatif
}
