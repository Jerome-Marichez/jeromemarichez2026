/**
 * Un diplôme obtenu.
 *
 * **Aucune année**, même décision que pour les certifications (Jérôme MARICHEZ,
 * 2026-09-20) : l'ordre de déclaration dans `src/contenu/formation.ts` fait le
 * classement, du plus récent au plus ancien.
 */
export interface IFormation {
  diplome: string
  ville: string
}
