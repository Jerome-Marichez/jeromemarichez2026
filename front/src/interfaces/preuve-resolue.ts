// preuve-resolue.ts — jeromemarichez2026
// Entité de rendu : une référence de preuve, une fois rapprochée de l'offre qui la
// porte. Produite par services/preuves.service.ts, consommée par les vues.

/**
 * Une preuve prête à afficher, avec le contexte qui la rend lisible hors de sa page
 * d'offre : de quelle offre elle vient, et sur quel axe de travail elle a été obtenue.
 *
 * `enonce` n'est jamais `null` : le service refuse de résoudre une référence pointant
 * un axe sans preuve publiable. Une affirmation sans preuve ne s'affiche pas.
 */
export interface IPreuveResolue {
  /** Clé stable pour le rendu de liste, dérivée de la référence. */
  readonly cle: string
  /** Titre de l'offre d'origine — sert d'étiquette de rattachement. */
  readonly offre: string
  /** Titre de l'axe de travail concerné. */
  readonly titre: string
  /** Le texte de la preuve, repris tel quel depuis l'offre. */
  readonly enonce: string
}
