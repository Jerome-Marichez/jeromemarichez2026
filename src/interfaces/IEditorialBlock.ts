// IEditorialBlock.ts — jeromemarichez-fr
// Unité éditoriale la plus fine du site : un point d'expertise.

/**
 * Un bloc d'expertise à l'intérieur d'une section.
 *
 * Règle éditoriale du projet (README.md) : une affirmation porte sa preuve ou elle se
 * reformule, et un bloc de service se termine sur ce que le client peut **trancher**,
 * jamais sur une liste d'outils. Les deux champs correspondants sont donc optionnels
 * dans le type mais leur absence est un signal de relecture, pas un défaut de forme.
 *
 * `texte` est optionnel pour la raison inverse : quand un bloc porte déjà un titre, une
 * preuve chiffrée et une décision, le paragraphe est le seul des quatre champs qui
 * n'apporte rien à un dirigeant pressé — il redit en prose ce que les trois autres
 * établissent. Dans ce cas précis, il s'omet (issue #45).
 *
 * La réciproque est une règle, pas une préférence : **un bloc dépourvu de `preuve` et
 * de `decision` garde son `texte`**, sinon il ne reste qu'un titre orphelin. Les repères
 * des charnières sont exactement ce cas.
 */
export interface IEditorialBlock {
  /** Intitulé court du point d'expertise. */
  titre: string
  /**
   * Corps du bloc, une à trois phrases. Texte fini, publiable tel quel.
   *
   * S'omet quand `preuve` et `decision` sont tous deux présents ; obligatoire de fait
   * quand ils sont tous deux absents.
   */
  texte?: string
  /** Preuve chiffrée réelle (montant, pourcentage, durée, contrainte tenue). */
  preuve?: string
  /** Ce que le client peut trancher grâce à ce point d'expertise. */
  decision?: string
}
