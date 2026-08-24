// poles-places.ts — jeromemarichez-fr
// Comment chaque place de la chaîne se dit à l'écran.
//
// Ces libellés ont remplacé une numérotation (« Pôle 2 », « Pôle 2 sur 3 »). Ce n'est pas
// un habillage : un numéro sur quatre pôles dont deux sont parallèles affirme un ordre
// qui n'existe pas, et laisse croire qu'il faut les quatre. La place, elle, se lit sans
// compter — et elle dit en même temps ce qu'on peut acheter seul.

import type { PolePlace } from '@/interfaces/types'

/** Étiquette courte, pour une plaque de schéma. */
export const LIBELLE_PLACE: Record<PolePlace, string> = {
  socle: 'Le socle',
  passage: 'Le passage obligé',
  suite: 'Une des deux suites',
}

/** Phrase d'ouverture d'une page de pôle : la place, et ce qu'elle implique. */
export const SITUATION_PLACE: Record<PolePlace, string> = {
  socle: 'Le socle — on commence ici quand le produit est à construire',
  passage: 'Le passage obligé — tout ce qui suit y passe, et il se livre seul',
  suite: 'Une des deux suites de la donnée — sans ordre avec l’autre',
}
