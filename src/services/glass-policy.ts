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
 *
 * `preuves` a rejoint la liste avec l'issue #103. Ce n'est pas un assouplissement : c'est
 * la seule nature de section éditoriale que l'accueil porte encore, celui-ci étant devenu
 * une vitrine dont le détail est descendu sur les pages de pôle. Une section qui traite
 * les deux objections de fond du site est une section de contenu à part entière, au même
 * titre qu'un pôle l'était.
 */
const NATURES_VITRABLES: ReadonlySet<SectionKind> = new Set<SectionKind>([
  'pole',
  'chapitre',
  'preuves',
])

/**
 * Plafond de surfaces vitrées sur l'accueil.
 *
 * Il suit le nombre de sections éditoriales **réellement présentes sur la page**, pas le
 * nombre de pôles vendus. Depuis l'issue #103 l'accueil n'en porte plus qu'une — les deux
 * objections — et le plafond vaut donc un. Les trois sections de pôle qu'il comptait sont
 * descendues sur `/services/<pole>/`, où c'est `MAX_GLASS_PAGE_POLE` qui les vitre.
 *
 * L'accueil n'est pas pour autant sans verre : le seuil, les plaques du schéma de la
 * chaîne et le bloc de contact portent les mêmes jetons de surface, posés par leurs
 * propres modules.
 */
export const MAX_GLASS_ACCUEIL = 1

/**
 * Plafond de surfaces vitrées sur une page de pôle.
 *
 * Une page de pôle compte aujourd'hui **quatre à cinq** chapitres vitrables : au-delà du
 * plafond, les derniers sont rendus en texte nu. Ce n'est pas un accident, c'est la
 * raison d'être du plafond — au-delà de trois panneaux, l'effet cesse d'être un signal
 * et devient un fond. Mais la troncature n'est plus muette : elle est nommée ici, et
 * l'appelant choisit son plafond au lieu de le subir.
 *
 * Le plafond est de LECTURE, et il le reste. Un panneau ne coûte plus rien à monter — le
 * verre est du CSS, il n'y a ni moteur ni capture — mais un `backdrop-filter` reste une
 * surface que le navigateur refloute quand ce qui passe derrière change. Ni l'une ni
 * l'autre de ces raisons ne fixerait le plafond à trois : c'est la lecture qui le fixe,
 * parce qu'au-delà de trois panneaux, l'effet cesse d'être un signal et devient un fond.
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
