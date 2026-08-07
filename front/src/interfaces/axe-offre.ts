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
}
