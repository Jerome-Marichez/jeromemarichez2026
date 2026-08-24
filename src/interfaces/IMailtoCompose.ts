// IMailtoCompose.ts — jeromemarichez-fr
// Le résultat de la composition d'une URL `mailto:` : l'URL, sa longueur, et le verdict
// sur la limite que les clients mail imposent aux URL.

/**
 * Une URL `mailto:` composée, accompagnée de ce qu'il faut pour décider si on l'ouvre.
 *
 * `longueur` et `depasseLimite` ne sont pas redondants avec l'URL : le composant a besoin
 * du verdict sans avoir à connaître la limite, et un test a besoin de la longueur pour
 * situer un cas près du seuil sans recompter lui-même.
 */
export interface IMailtoCompose {
  /** L'URL complète, prête à être ouverte. Toutes les valeurs y sont pourcent-encodées. */
  url: string
  /** Longueur de l'URL en unités de code UTF-16, une fois encodée. */
  longueur: number
  /**
   * Vrai quand l'URL dépasse ce qu'un client mail accepte de façon fiable.
   *
   * Ce n'est pas la même borne que celle du champ de saisie : un message de 300 signes
   * d'apostrophes typographiques tient largement dans la limite de caractères et produit
   * pourtant 2 700 caractères d'URL. Le compteur borne ce que l'utilisateur voit, ce
   * drapeau borne ce que le navigateur reçoit.
   */
  depasseLimite: boolean
}
