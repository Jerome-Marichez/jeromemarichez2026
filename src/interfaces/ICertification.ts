// ICertification.ts — jeromemarichez-fr
// Une certification affichée sur le site.

import type { ICertificationLogo } from './ICertificationLogo'
import type { PoleId } from './types'

/**
 * Règle de véracité bloquante (CLAUDE.md) : **une URL de certification ne s'invente
 * ni ne s'approxime**. Tant que le justificatif officiel n'a pas été fourni par
 * Jérôme MARICHEZ, `justificatif` reste absent et la certification s'affiche sans
 * lien — jamais avec un lien mort.
 *
 * `annee` est également optionnelle : mieux vaut afficher une certification sans
 * millésime qu'un millésime approximatif.
 *
 * L'entité ne porte **aucune prose**. Une certification se montre — logo, intitulé,
 * millésime — elle ne se commente pas : le paragraphe d'apport qui accompagnait
 * chacune d'elles a été retiré à la demande de Jérôme MARICHEZ (issue #49). Ce que la
 * certification change dans la prestation se dit dans les sections de pôle, à leur
 * place, une fois.
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
  /**
   * Logo de l'organisme. Absent tant que le fichier n'a pas été déposé dans `public/`
   * **et** que son usage n'a pas été autorisé par le propriétaire de la marque : sans
   * lui, la certification se rend en toutes lettres.
   */
  logo?: ICertificationLogo
  /** Pôle auquel la certification apporte sa crédibilité, ou `transverse`. */
  pole: PoleId | 'transverse'
}
