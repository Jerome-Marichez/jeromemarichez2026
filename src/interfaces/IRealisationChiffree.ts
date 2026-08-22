// IRealisationChiffree.ts — jeromemarichez-fr
// Une réalisation qui porte un chiffre. Le second des deux gabarits.

import type { IRealisation } from './IRealisation'
import type { IRealisationChiffre } from './IRealisationChiffre'

/**
 * Une réalisation dont le chiffre est **acquis au type**.
 *
 * Les deux gabarits de l'espace ne sont pas une affaire de rendu, ils sont dans le
 * modèle : `IRealisation` laisse `chiffre` optionnel — c'est le cas général, une fiche
 * sans nombre —, cette interface-ci le rend obligatoire.
 *
 * Elle sert au mur de preuves de l'accueil : `IProof.fiche` accepte une
 * `IRealisationChiffree` et rien d'autre, donc une preuve ne peut pointer que vers une
 * fiche qui porte réellement le chiffre annoncé. C'est ce qui garantit, sans test et sans
 * relecture, que le chiffre affiché de part et d'autre est le même — il n'est écrit
 * qu'une fois.
 */
export interface IRealisationChiffree extends IRealisation {
  chiffre: IRealisationChiffre
}
