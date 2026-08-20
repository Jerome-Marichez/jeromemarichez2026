// glass-class.ts — jeromemarichez-fr
// Nom de la classe de verre, isolé pour rester synchronisé avec le sélecteur liquidGL.

import { GLASS_TARGET } from '../../glass/settings'

/**
 * Classe globale — et non un module CSS.
 *
 * liquidGL cible les lentilles par un sélecteur CSS littéral au moment du montage :
 * un nom de classe haché par CSS Modules ne serait jamais retrouvé. C'est la seule
 * exception à la règle « style co-localisé et scopé » de `docs/frontend-practices.md`,
 * et elle est bornée à cette classe-là, définie dans `styles/glass-surface.css`.
 */
export const GLASS_CLASS = GLASS_TARGET.slice(1)
