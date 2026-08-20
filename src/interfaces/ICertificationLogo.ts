// ICertificationLogo.ts — jeromemarichez-fr
// Le logo d'un organisme certificateur.

/**
 * Un logo n'est pas une donnée éditoriale comme une autre : c'est une **marque
 * appartenant à un tiers**, dont l'usage est encadré par son propriétaire (Google,
 * Microsoft et ISTQB imposent chacun leurs règles, ISTQB n'autorisant que le badge
 * « Certified Tester »). Le champ reste donc optionnel sur `ICertification` et n'est
 * renseigné que pour un fichier réellement déposé et réellement autorisé.
 *
 * Même logique que `justificatif` : rien ne s'invente. Sans fichier, la certification
 * s'affiche en toutes lettres — jamais avec une image cassée.
 */
export interface ICertificationLogo {
  /** Chemin public du fichier, servi depuis `public/` (ex. `/certifications/istqb.svg`). */
  fichier: string
  /** Largeur intrinsèque en pixels — exigée pour réserver la place et éviter tout CLS. */
  largeur: number
  /** Hauteur intrinsèque en pixels. */
  hauteur: number
}
