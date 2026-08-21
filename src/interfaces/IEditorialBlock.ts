// IEditorialBlock.ts — jeromemarichez-fr
// Unité éditoriale la plus fine du site : un point d'expertise.

/**
 * Un bloc d'expertise à l'intérieur d'une section.
 *
 * Règle éditoriale du projet (README.md) : une affirmation porte sa preuve ou elle se
 * reformule, et un bloc de service se termine sur ce que le client peut **trancher**,
 * jamais sur une liste d'outils. Les deux champs correspondants sont donc optionnels
 * dans le type mais leur absence est un signal de relecture, pas un défaut de forme.
 */
export interface IEditorialBlock {
  /** Intitulé court du point d'expertise. */
  titre: string
  /** Corps du bloc, 2 à 5 phrases. Texte fini, publiable tel quel. */
  texte: string
  /** Preuve chiffrée réelle (montant, pourcentage, durée, contrainte tenue). */
  preuve?: string
  /** Ce que le client peut trancher grâce à ce point d'expertise. */
  decision?: string
}
