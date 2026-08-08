// groupe-axes.ts — jeromemarichez2026
// Entité de rendu : une suite d'axes contigus partageant le même volet.
// Produite par services/axes.service.ts, consommée par la vue d'offre.
import type { IAxeOffre } from './axe-offre'

/**
 * Un groupe d'axes, tel qu'il se lit sur une page d'offre.
 *
 * Le groupe est obtenu en parcourant `IOffre.axes` DANS SON ORDRE et en ouvrant un
 * nouveau groupe à chaque changement de `volet` — jamais en rassemblant tous les axes
 * d'un même volet où qu'ils se trouvent. La nuance est le message de l'offre
 * « Data & IA » : ses deux premiers axes (fiabilité puis qualification des données)
 * précèdent volontairement toute promesse d'IA, et ses trois derniers (MLOps,
 * conformité, sur devis) la suivent. Un regroupement par valeur les aurait fait
 * remonter ou descendre, c'est-à-dire aurait réécrit le discours.
 *
 * `volet` vaut `null` pour le socle commun — les axes qui n'appartiennent à aucun
 * volet nommé. C'est le cas de la totalité des axes des offres qui n'en distinguent
 * aucun.
 */
export interface IGroupeAxes {
  /** Clé stable pour le rendu de liste, dérivée du premier axe du groupe. */
  readonly cle: string
  /** Nom du volet, ou `null` pour le socle commun. */
  readonly volet: string | null
  /** Les axes du groupe, dans l'ordre du contenu. Jamais vide. */
  readonly axes: readonly IAxeOffre[]
}
