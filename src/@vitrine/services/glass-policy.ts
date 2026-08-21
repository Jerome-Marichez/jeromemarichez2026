// glass-policy.ts — jeromemarichez-fr
// Quelles sections reçoivent le verre réfractant, et combien au maximum.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'
import type { SectionKind } from '@/interfaces/types'

/**
 * Les natures de section qui peuvent recevoir le verre.
 *
 * `pole` sur l'accueil, `chapitre` sur une page de pôle : dans les deux cas une section
 * de contenu à part entière. Les charnières et les fils restent en texte nu sur le fond
 * — ce sont des respirations, et les vitrer reviendrait à les faire passer pour une
 * offre de plus.
 */
const NATURES_VITRABLES: ReadonlySet<SectionKind> = new Set<SectionKind>(['pole', 'chapitre'])

/**
 * Plafond de surfaces vitrées sur l'accueil.
 *
 * L'accueil porte une section vitrable par pôle vendu. Le plafond y suit donc le nombre
 * de pôles, et le relever est une décision éditoriale — pas un réglage technique.
 */
export const MAX_GLASS_ACCUEIL = 3

/**
 * Plafond de surfaces vitrées sur une page de pôle.
 *
 * Une page de pôle compte aujourd'hui **quatre à cinq** chapitres vitrables : au-delà du
 * plafond, les derniers sont rendus en texte nu. Ce n'est pas un accident, c'est la
 * raison d'être du plafond — au-delà de trois panneaux, l'effet cesse d'être un signal
 * et devient un fond. Mais la troncature n'est plus muette : elle est nommée ici, et
 * l'appelant choisit son plafond au lieu de le subir.
 *
 * Le coût n'est pas la contrainte : liquidGL tient une trentaine de lentilles, et
 * chacune lit la même capture plein document — le coût réel est celui de la texture, pas
 * celui du nombre de panneaux. La contrainte est de lecture.
 */
export const MAX_GLASS_PAGE_POLE = 3

/**
 * Les identifiants des sections à vitrer, dans la limite du plafond demandé.
 *
 * Le plafond est un paramètre obligatoire : deux gabarits qui n'ont ni le même nombre de
 * sections ni le même récit n'ont aucune raison de partager une constante implicite.
 */
export function selectGlassSectionIds(sections: IEditorialSection[], plafond: number): Set<string> {
  const eligibles = sections.filter((section) => NATURES_VITRABLES.has(section.kind))
  return new Set(eligibles.slice(0, plafond).map((section) => section.id))
}
