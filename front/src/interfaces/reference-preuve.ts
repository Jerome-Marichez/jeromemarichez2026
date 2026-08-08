// reference-preuve.ts — jeromemarichez2026
// Entité éditoriale : la DÉSIGNATION d'une preuve, jamais son texte.
import type { CleOffre } from './types'

/**
 * Référence vers une preuve déjà écrite dans une offre (`IAxeOffre.preuve`).
 *
 * Volontairement une référence et non une chaîne : une preuve recopiée sur la page
 * d'accueil pourrait diverger de celle de la page d'offre, et une preuve saisie
 * directement ici échapperait à la relecture de véracité faite sur `content/offres/`.
 * Le texte affiché reste donc écrit à un seul endroit.
 */
export interface IReferencePreuve {
  readonly offre: CleOffre
  /** Clé de l'axe, unique au sein de l'offre (`IAxeOffre.cle`). */
  readonly axe: string
}
