// chaine.service.ts — jeromemarichez2026
// Logique métier : rapprocher un maillon de la chaîne des offres qui le couvrent.
// Aucune logique de rendu ici (docs/architecture.md — services/ vs hooks).
import type { IMaillonChaine } from '../interfaces/maillon-chaine'
import type { IMaillonResolu } from '../interfaces/maillon-resolu'
import type { IOffre } from '../interfaces/offre'
import type { CleOffre } from '../interfaces/types'

/**
 * Remplace une clé d'offre par le titre réel de l'offre.
 *
 * Échoue bruyamment plutôt que d'afficher une approximation : une clé qui ne désigne
 * aucune offre est une erreur d'édition. Le contenu étant résolu au rendu serveur,
 * donc au BUILD, cette erreur survient à la compilation — jamais devant un visiteur,
 * et jamais sous la forme d'un maillon rattaché à une offre inexistante.
 */
function titreOffre(cle: CleOffre, maillon: string, offres: readonly IOffre[]): string {
  const offre = offres.find((candidate) => candidate.cle === cle)
  if (offre === undefined) {
    throw new Error(`Maillon « ${maillon} » : offre « ${cle} » inconnue.`)
  }

  return offre.titre
}

/**
 * Résout les maillons dans leur ordre de déclaration : l'ordre d'affichage EST la
 * chaîne — le site, la donnée structurée et l'entrepôt, le taggage, le SEA. C'est un
 * choix éditorial porté par le contenu, jamais par le rendu.
 */
export function resoudreMaillons(
  maillons: readonly IMaillonChaine[],
  offres: readonly IOffre[],
): readonly IMaillonResolu[] {
  return maillons.map((maillon) => ({
    ...maillon,
    offres: maillon.offres.map((cle) => titreOffre(cle, maillon.cle, offres)),
  }))
}
