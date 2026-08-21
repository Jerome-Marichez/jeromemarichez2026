// glass-policy.ts — jeromemarichez-fr
// Quelles sections reçoivent le verre réfractant, et combien au maximum.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

/**
 * Plafond de surfaces vitrées par page.
 *
 * liquidGL tient une trentaine de lentilles, mais chacune lit la même capture plein
 * document : le coût réel est celui de la texture, pas celui du nombre de panneaux. Le
 * plafond est donc là pour une raison de lecture, pas de performance — au-delà de trois
 * panneaux, l'effet cesse d'être un signal et devient un fond.
 */
export const MAX_GLASS_PER_PAGE = 3

/**
 * Le verre marque les sections qui portent un pôle. Les charnières, elles, restent en
 * texte nu sur le fond : ce sont des respirations, et les vitrer reviendrait à les
 * transformer en quatrième offre.
 */
export function selectGlassSectionIds(sections: IEditorialSection[]): Set<string> {
  const eligibles = sections.filter((section) => section.kind === 'pole')
  return new Set(eligibles.slice(0, MAX_GLASS_PER_PAGE).map((section) => section.id))
}
