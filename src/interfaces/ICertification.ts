// ICertification.ts — jeromemarichez-fr
// Une certification affichée sur le site.

import type { PoleId } from './types'

/**
 * Règle de véracité bloquante (CLAUDE.md) : **une URL de certification ne s'invente
 * ni ne s'approxime**. Tant que le justificatif officiel n'a pas été fourni par
 * Jérôme MARICHEZ, `justificatif` reste absent et la certification s'affiche sans
 * lien — jamais avec un lien mort.
 *
 * `annee` est également optionnelle : mieux vaut afficher une certification sans
 * millésime qu'un millésime approximatif.
 */
export interface ICertification {
  /** Intitulé exact tel qu'il figure sur le justificatif. */
  intitule: string
  /** Organisme qui délivre la certification. */
  organisme: string
  /** Année d'obtention. */
  annee?: number
  /** URL du justificatif officiel. Absente tant qu'elle n'a pas été fournie. */
  justificatif?: string
  /** Pôle auquel la certification apporte sa crédibilité, ou `transverse`. */
  pole: PoleId | 'transverse'
  /**
   * Ce que la certification change concrètement dans la prestation.
   * Une certification sans effet énonçable est une ligne de CV, pas un argument.
   */
  apport: string
}
