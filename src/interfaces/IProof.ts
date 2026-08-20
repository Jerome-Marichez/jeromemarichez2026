// IProof.ts — jeromemarichez-fr
// Une preuve chiffrée, avec son contexte.

/**
 * Un chiffre sans contexte est un chiffre invérifiable.
 *
 * Chaque preuve porte donc l'employeur et la période où elle a été obtenue : c'est ce
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
}
