// navigation.ts — jeromemarichez2026
// Navigation principale du site. Les libellés des offres ne sont PAS écrits ici :
// ils sont dérivés de `src/content/offres/`, seule source éditoriale.
import { offres } from '@/content/offres'
import type { INavigationLink } from '../interfaces/inavigation-link'
import { cheminOffre } from './routes'

/**
 * Identifiant du conteneur de contenu principal. Sert de cible au lien
 * d'évitement de l'en-tête ; le `main` correspondant est rendu focusable pour
 * que le saut déplace réellement le focus, et pas seulement le défilement.
 */
export const MAIN_CONTENT_ID = 'contenu'

/**
 * Entrées des offres, DÉRIVÉES du contenu : le libellé est le titre de l'offre, le
 * lien est construit sur sa clé, et l'ordre est celui déclaré dans `content/offres/`.
 *
 * Rien n'est recopié ici, donc plus rien ne peut diverger. La version précédente
 * réécrivait les trois libellés à la main et avait dérivé dès la première livraison :
 * l'en-tête annonçait « Data et IA » quand la carte juste en dessous annonçait
 * « Data & IA » (issue #11). Ajouter une quatrième offre au contenu l'ajoute
 * désormais à la navigation sans toucher à ce fichier.
 */
const liensOffres: readonly INavigationLink[] = offres.map((offre) => ({
  href: cheminOffre(offre.cle),
  label: offre.titre,
}))

/**
 * Entrées sans source éditoriale : ni « Parcours » ni « Contact » ne correspondent à
 * une offre. Leur libellé n'existe nulle part ailleurs, il se déclare donc ici — et
 * c'est le seul texte que ce fichier ait encore le droit de porter.
 */
const liensHorsOffres: readonly INavigationLink[] = [
  { href: '/parcours', label: 'Parcours' },
  { href: '/contact', label: 'Contact' },
]

/**
 * Navigation principale du site : les trois offres, le parcours, le contact.
 * Ordre volontaire — les offres d'abord (ce qui est vendu), le parcours ensuite
 * (ce qui le rend crédible), le contact en dernier (l'action attendue).
 *
 * L'en-tête et le pied de page consomment cette même liste : ils ne peuvent diverger
 * ni l'un de l'autre, ni du contenu dont elle est tirée.
 */
export const siteNavigation: readonly INavigationLink[] = [...liensOffres, ...liensHorsOffres]
