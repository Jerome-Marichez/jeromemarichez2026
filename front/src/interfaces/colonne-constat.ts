// colonne-constat.ts — jeromemarichez2026
// Entité éditoriale : une colonne du constat qui fonde la promesse d'interlocuteur
// unique sur la page d'accueil.

/**
 * Une colonne du constat : un jeu de chiffres, et à quoi il sert.
 *
 * Le constat s'énonce en deux colonnes parce que c'est exactement sa forme : les
 * chiffres sur lesquels une campagne s'optimise et ceux sur lesquels une entreprise
 * décide ne sont pas les mêmes, et ils ne vivent pas au même endroit.
 *
 * Ce que ce découpage n'est PAS : un jugement sur une profession. Aucune colonne ne
 * nomme d'acteur, aucune ne porte de verbe d'intention. Une colonne décrit un
 * dispositif — un périmètre d'accès à la donnée — pas des personnes ni des sociétés
 * (règle de formulation de l'issue #19, non négociable).
 */
export interface IColonneConstat {
  /** Clé stable, unique. Sert de clé de rendu de liste. */
  readonly cle: string
  readonly titre: string
  /** Les chiffres de cette colonne. Énoncés nus, sans commentaire. */
  readonly elements: readonly string[]
}
