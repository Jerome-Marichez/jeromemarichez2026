// tarif.ts — jeromemarichez2026
// Entité éditoriale : une ligne de la grille tarifaire d'une offre.
import type { Montant } from './types'

/**
 * Une ligne tarifaire : une prestation, le cas dans lequel elle s'applique, et son prix.
 *
 * C'est le premier engagement commercial chiffré du site. La séparation
 * `intitule` / `condition` n'est pas cosmétique : la même prestation — la mise en place
 * de la solution data-driven — n'a pas le même prix selon que j'ai conçu le site ou non.
 * Deux lignes portent donc le même `intitule` et deux `condition` différentes, et le
 * prospect identifie son cas avant de lire un montant plutôt que l'inverse.
 *
 * Le prix lui-même est un `Montant` (union discriminée, `interfaces/types.ts`) : c'est
 * lui qui rend impossible la publication d'un chiffre sans sa mention fiscale.
 */
export interface ITarif {
  /** Clé stable, unique au sein de la grille. Sert d'identifiant de rendu. */
  readonly cle: string
  /** La prestation vendue. Reprise à l'identique d'une ligne à l'autre si c'est la même. */
  readonly intitule: string
  /**
   * Le cas dans lequel cette ligne s'applique, à la première personne du singulier
   * (« si j'ai conçu le site ») — comme tout le contenu publié.
   *
   * Obligatoire : une ligne tarifaire sans condition d'application oblige le prospect à
   * deviner laquelle le concerne, et deux montants ambigus valent moins que pas de prix
   * du tout.
   */
  readonly condition: string
  readonly montant: Montant
}
