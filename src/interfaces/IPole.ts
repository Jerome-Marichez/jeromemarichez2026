// IPole.ts — jeromemarichez-fr
// Un des quatre pôles, vu depuis la navigation et la page d'accueil.

import type { PoleId, PolePlace, PoleTemps } from './types'

/**
 * Un pôle de compétence — un **nœud** de la chaîne.
 *
 * Le modèle n'est pas une file de quatre maillons : l'ingénierie web mène à la donnée,
 * et la donnée ouvre deux suites parallèles — l'IA et le SEA & UX — qui se prennent
 * séparément ou ensemble. Le pôle ne porte donc plus de rang, mais sa **place**
 * (`socle`, `passage`, `suite`) et son **temps**, que les deux suites partagent.
 *
 * Ce qu'un pôle transmet au suivant n'est plus un champ d'ici : c'est une propriété de
 * l'**arête**, décrite par `IJointure`. Un nœud qui a deux successeurs ne pourrait pas
 * porter une seule remise sans en cacher une.
 */
export interface IPole {
  id: PoleId
  /** Place dans la chaîne : socle, passage obligé, ou suite de la donnée. */
  place: PolePlace
  /** Temps de la chaîne. Les deux suites portent le même — elles sont parallèles. */
  temps: PoleTemps
  /** Nom affiché du pôle. */
  nom: string
  /** Route de la page de détail. */
  route: string
  /** Promesse du pôle en une phrase. */
  promesse: string
  /** Ce que ce pôle prend en charge, en 2 ou 3 phrases. */
  accroche: string
}
