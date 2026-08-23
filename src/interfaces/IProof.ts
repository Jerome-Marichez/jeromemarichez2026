// IProof.ts — jeromemarichez-fr
// Une preuve chiffrée, avec son contexte et — quand elle en a une — la fiche qui la déplie.

import type { IRealisationChiffree } from './IRealisationChiffree'

/**
 * Un chiffre sans contexte est un chiffre invérifiable.
 *
 * Chaque preuve porte donc l'organisation et la période où elle a été obtenue : c'est ce
 * qui la distingue d'un argument de plaquette, et ce qui permet à un prospect de la
 * recouper avec le parcours.
 */
export interface IProof {
  /** Le chiffre, tel qu'il s'affiche. */
  chiffre: string
  /** Ce que le chiffre mesure. */
  libelle: string
  /** Où et quand. Repris à l'identique des CV de référence. */
  contexte: string
  /**
   * La fiche de réalisation qui déplie cette preuve, quand elle existe.
   *
   * Le type est `IRealisationChiffree` et non `IRealisation` : une preuve ne peut donc
   * pointer que vers une fiche qui porte **réellement** un chiffre, et `preuves.ts` lit
   * ce chiffre depuis la fiche plutôt que de le recopier. Le nombre n'est écrit qu'une
   * fois dans tout le dépôt — c'est ce qui garantit, sans test et sans relecture, que
   * l'accueil et la fiche affichent la même valeur.
   *
   * Optionnel, parce que trois preuves sur six ne racontent pas un travail : les
   * migrations, les neuf ans d'autonomie et la promesse d'interlocuteur unique n'ont pas
   * de fiche, et n'ont pas à en avoir une.
   */
  fiche?: IRealisationChiffree
}
