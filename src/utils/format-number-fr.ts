// format-number-fr.ts — jeromemarichez-fr
// Le rendu d'un entier en français. Un seul endroit, parce qu'un même nombre affiché de
// deux façons sur un même écran se remarque.

/**
 * Formateur construit une seule fois : il est appelé à chaque frappe dans le champ de
 * message, et instancier un `Intl.NumberFormat` par touche serait le seul coût mesurable
 * du formulaire. Il porte l'espace insécable des milliers, que la locale française attend
 * et qu'une concaténation manuelle n'aurait pas mise.
 */
const NOMBRE_FR = new Intl.NumberFormat('fr-FR')

/** Rend un entier avec le séparateur de milliers français. */
export function formatNumberFr(valeur: number): string {
  return NOMBRE_FR.format(valeur)
}
