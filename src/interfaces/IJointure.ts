// IJointure.ts — jeromemarichez-fr
// L'arête de la chaîne : ce qui relie deux pôles, et à quelle condition.

import type { PoleId } from './types'

/**
 * Une jointure entre deux pôles.
 *
 * C'est une **entité à part entière**, et pas un champ du pôle amont, pour une raison de
 * modèle : la donnée ouvre deux suites, l'IA et le SEA & UX. Un pôle qui porterait une
 * seule remise en cacherait forcément une des deux.
 *
 * `siDejaEnPlace` est le champ qui décide de tout, et c'est celui que le site n'avait
 * pas. Sans lui, « il faut passer par la donnée » se lit comme une dépendance
 * d'**achat** : il faudrait acheter le pôle amont pour avoir le droit du suivant. Avec
 * lui, la dépendance redevient ce qu'elle est réellement — une dépendance de
 * **matière** : c'est le résultat qui est requis, pas la facture. Un client qui possède
 * déjà cette matière part de là, et ne la repaie pas.
 */
export interface IJointure {
  /** Pôle d'où part l'arête. */
  amont: PoleId
  /** Pôle vers lequel elle mène. */
  aval: PoleId
  /** Ce que l'amont produit et sans quoi l'aval travaille à l'aveugle. */
  matiere: string
  /** Ce qui se passe quand le client possède déjà cette matière. */
  siDejaEnPlace: string
}
