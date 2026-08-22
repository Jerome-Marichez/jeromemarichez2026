// IRealisationEtape.ts — jeromemarichez-fr
// Une étape d'une réalisation : ce qui a été fait, et dans quel ordre.

/**
 * Une étape du travail mené.
 *
 * Volontairement pauvre — un titre, un paragraphe — pour la même raison qu'une section
 * d'article : donner des blocs, des encarts et des niveaux de titre libres reviendrait à
 * réinventer un éditeur, et à produire des fiches qui ne se ressemblent plus.
 */
export interface IRealisationEtape {
  /** Intitulé court de l'étape. */
  titre: string
  /** Ce qui a été fait, une à trois phrases. Texte fini, publiable tel quel. */
  texte: string
}
