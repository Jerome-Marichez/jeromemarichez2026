// preuves.service.ts — jeromemarichez2026
// Logique métier : rapprocher une référence de preuve de l'offre qui la porte.
// Aucune logique de rendu ici (docs/architecture.md — services/ vs hooks).
import type { IOffre } from '../interfaces/offre'
import type { IPreuveResolue } from '../interfaces/preuve-resolue'
import type { IReferencePreuve } from '../interfaces/reference-preuve'

/**
 * Résout une référence de preuve contre le catalogue des offres.
 *
 * Échoue bruyamment plutôt que d'afficher une approximation : une référence qui
 * désigne une offre inconnue, un axe inconnu, ou un axe dont la preuve vaut `null`
 * est une erreur d'édition. Le contenu étant résolu au chargement du module, cette
 * erreur survient au BUILD — jamais devant un visiteur, et jamais sous la forme d'une
 * affirmation non prouvée (CLAUDE.md, « Ligne éditoriale »).
 */
function resoudreReference(reference: IReferencePreuve, offres: readonly IOffre[]): IPreuveResolue {
  const offre = offres.find((candidate) => candidate.cle === reference.offre)
  if (offre === undefined) {
    throw new Error(`Preuve « ${reference.offre}/${reference.axe} » : offre inconnue.`)
  }

  const axe = offre.axes.find((candidate) => candidate.cle === reference.axe)
  if (axe === undefined) {
    throw new Error(
      `Preuve « ${reference.offre}/${reference.axe} » : axe inconnu dans l’offre « ${offre.titre} ».`,
    )
  }

  if (axe.preuve === null) {
    throw new Error(
      `Preuve « ${reference.offre}/${reference.axe} » : l’axe « ${axe.titre} » ne porte aucune preuve publiable. Une affirmation sans preuve ne s’affiche pas.`,
    )
  }

  return {
    cle: `${reference.offre}-${reference.axe}`,
    offre: offre.titre,
    titre: axe.titre,
    enonce: axe.preuve,
  }
}

/**
 * Résout les références dans leur ordre de déclaration : l'ordre d'affichage est un
 * choix éditorial porté par le contenu, pas par le rendu.
 */
export function resoudrePreuves(
  references: readonly IReferencePreuve[],
  offres: readonly IOffre[],
): readonly IPreuveResolue[] {
  return references.map((reference) => resoudreReference(reference, offres))
}
