// find-realisation.ts — jeromemarichez-fr
// Les règles qui s'appliquent aux réalisations : regroupement, recherche, voisinage.
//
// Le contenu (`contenu/realisations/`) ne porte aucune de ces règles : il déclare des
// fiches. Tout ce qui relève d'une décision — comment on les groupe, laquelle on propose
// ensuite — est ici.

import type { IRealisation } from '@/interfaces/IRealisation'
import type { IRealisationGroupe } from '@/interfaces/IRealisationGroupe'
import { CADRES } from '../contenu/realisations/cadres'
import { REALISATIONS } from '../contenu/realisations/realisations'

/**
 * Nombre de fiches proposées au pied d'une fiche.
 *
 * Deux, comme pour les articles, et pour la même raison : au-delà, le bas d'une fiche
 * devient un sommaire et cesse d'être une suite de lecture.
 */
export const MAX_REALISATIONS_LIEES = 2

/** Les réalisations, dans l'ordre déclaré. Aucun tri : elles ne sont pas datées. */
export function listRealisations(): IRealisation[] {
  return REALISATIONS
}

/**
 * Les réalisations groupées par cadre, du plus récent au plus ancien.
 *
 * Le groupement se fait sur le **nom de l'organisation**, qui identifie le cadre à lui
 * seul : les trois cadres ne partagent ni organisation ni période, et le statut varie
 * entre eux sans les distinguer — deux d'entre eux sont des postes salariés.
 *
 * L'ordre des groupes est celui de `CADRES`, jamais celui d'apparition dans la liste des
 * fiches : c'est la chronologie qui classe, et elle n'a aucune raison de dépendre de
 * l'ordre dans lequel les fiches ont été écrites.
 *
 * Un cadre sans fiche ne produit pas de groupe vide — une organisation annoncée sans rien
 * à montrer se lit comme une omission.
 */
export function groupRealisationsByCadre(): IRealisationGroupe[] {
  return CADRES.map((cadre) => ({
    cadre,
    realisations: REALISATIONS.filter(
      (realisation) => realisation.cadre.organisation === cadre.organisation,
    ),
  })).filter((groupe) => groupe.realisations.length > 0)
}

/**
 * Rend la fiche demandée et jusqu'à deux autres à lire ensuite.
 *
 * Le voisinage se calcule sur les **pôles partagés**, et non sur le cadre : la liste
 * groupe déjà par organisation, et proposer trois fois la même organisation en bas de
 * page n'apprendrait rien. Passer par les pôles montre au contraire qu'un même pôle a été
 * mobilisé sous trois cadres différents, ce qui est exactement l'argument de l'espace.
 *
 * Si moins de deux fiches partagent un pôle, la liste est complétée dans l'ordre déclaré :
 * un bloc « à voir aussi » à moitié rempli se remarque plus que son absence.
 *
 * Lève sur un slug inconnu, volontairement : les slugs servis sont énumérés au build par
 * `generateStaticParams`, donc un slug absent ici est une incohérence de code, pas une URL
 * saisie par un visiteur.
 */
export function findRealisation(slug: string): {
  realisation: IRealisation
  autres: IRealisation[]
} {
  const realisation = REALISATIONS.find((candidat) => candidat.slug === slug)

  if (!realisation) throw new Error(`Réalisation inconnue : ${slug}`)

  const reste = REALISATIONS.filter((candidat) => candidat.slug !== slug)
  const voisines = reste.filter((candidat) =>
    candidat.poles.some((pole) => realisation.poles.includes(pole)),
  )
  const complement = reste.filter((candidat) => !voisines.includes(candidat))

  return {
    realisation,
    autres: [...voisines, ...complement].slice(0, MAX_REALISATIONS_LIEES),
  }
}
