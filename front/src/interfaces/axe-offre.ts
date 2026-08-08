// axe-offre.ts — jeromemarichez2026
// Entité éditoriale : un axe de travail à l'intérieur d'une offre.

/**
 * Un axe d'une offre : ce qui est fait, et la preuve qui l'appuie.
 *
 * La ligne éditoriale (CLAUDE.md) impose qu'une affirmation porte sa preuve — un
 * chiffre, une durée, une contrainte tenue. Quand aucune preuve publiable n'existe,
 * `preuve` vaut `null` : on n'en invente pas.
 */
export interface IAxeOffre {
  /** Clé stable, unique au sein de l'offre. */
  readonly cle: string
  readonly titre: string
  readonly description: string
  /** Preuve chiffrée, datée ou contrainte tenue. `null` si aucune n'est publiable. */
  readonly preuve: string | null
  /**
   * Volet nommé auquel l'axe appartient, quand l'offre en distingue plusieurs.
   *
   * Existe pour que le découpage de « Data & IA » en deux volets — agents autonomes
   * d'une part, projets data supervisés et non supervisés d'autre part — soit une
   * **donnée** et non une mise en forme du rendu. Un axe sans `volet` appartient au
   * socle commun de son offre : c'est le cas des trois offres pour tout le reste.
   */
  readonly volet?: string
}
