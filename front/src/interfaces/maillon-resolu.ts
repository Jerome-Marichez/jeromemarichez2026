// maillon-resolu.ts — jeromemarichez2026
// Entité de rendu : un maillon de la chaîne, une fois ses clés d'offres remplacées
// par les titres réels. Produite par services/chaine.service.ts.
import type { IMaillonChaine } from './maillon-chaine'

/**
 * Un maillon prêt à afficher : identique au maillon éditorial, sauf que `offres` ne
 * porte plus des clés mais les TITRES des offres, lus dans `content/offres/`.
 *
 * Le titre n'est jamais recopié dans le contenu de l'accueil : c'est la même règle que
 * pour la navigation (`@shared/config/navigation.ts`), où une recopie avait déjà fait
 * diverger « Data et IA » de « Data & IA » (issue #11).
 */
export interface IMaillonResolu extends Omit<IMaillonChaine, 'offres'> {
  /** Titres des offres qui couvrent le maillon, dans l'ordre déclaré. */
  readonly offres: readonly string[]
}
