// IBreadcrumbItem.ts — jeromemarichez-fr
// Un niveau de fil d'Ariane, vu à la fois par le rendu et par le JSON-LD.

/**
 * Un niveau du fil d'Ariane.
 *
 * La même structure alimente le fil visible et le `BreadcrumbList` de schema.org. C'est
 * le point : un fil affiché qui ne dit pas la même chose que celui déclaré aux moteurs
 * est une incohérence que Google sanctionne, et elle ne se voit pas à l'œil nu.
 */
export interface IBreadcrumbItem {
  /** Libellé affiché, repris tel quel dans le JSON-LD. */
  nom: string
  /** Route interne du niveau. */
  route: string
}
