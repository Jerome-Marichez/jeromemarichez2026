// .storybook/jeux-de-donnees.ts — jeromemarichez-fr
//
// Les données que les stories donnent à voir.
//
// Elles ne sont pas inventées : ce sont **les contenus réels du site**, prélevés dans
// `src/contenu/`. C'est la règle de `docs/storybook.md` — jamais de lorem ipsum pour des
// données métier — et c'est aussi la seule façon d'avoir un catalogue qui vieillit avec
// le site : une phrase recopiée ici dériverait du jour où le contenu changerait.
//
// Ce module vit dans `.storybook/` et non dans `src/` parce qu'il n'appartient qu'à
// l'outil : rien de ce qu'il contient ne part au navigateur d'un visiteur.

import { PAGE_ACCUEIL } from '../src/contenu/accueil'
import { SECTIONS_DATA } from '../src/contenu/data-sections'
import { SECTION_FIL_IA } from '../src/contenu/fil-ia'
import { SECTIONS_IA } from '../src/contenu/ia-sections'
import { SECTIONS_INGENIERIE_WEB } from '../src/contenu/ingenierie-web-sections'
import type { IEditorialSection } from '../src/interfaces/IEditorialSection'
import type { SectionKind } from '../src/interfaces/types'

/**
 * Le premier élément d'une liste, ou un échec bruyant.
 *
 * `noUncheckedIndexedAccess` est actif : indexer un tableau rend `T | undefined`, et le
 * catalogue n'a aucune raison d'être moins strict que le site. Une story qui désigne un
 * contenu disparu doit s'arrêter en le disant, plutôt que rendre un composant vide qu'on
 * prendrait pour un défaut de style.
 */
export function exiger<T>(liste: readonly T[], quoi: string): T {
  const [premier] = liste
  if (premier === undefined) throw new Error(`${quoi} : aucun contenu, le site a changé.`)
  return premier
}

/** La première section d'une nature donnée, dans l'ordre de la page. */
function sectionDeNature(sections: readonly IEditorialSection[], kind: SectionKind) {
  return exiger(
    sections.filter((section) => section.kind === kind),
    `section de nature « ${kind} »`,
  )
}

/** La section de preuves de l'accueil : celle qui répond aux objections par des chiffres. */
export const SECTION_PREUVES = exiger(PAGE_ACCUEIL.sections, 'section de l’accueil')

/** Un chapitre de page de pôle, le rendu le plus courant du site. */
export const SECTION_CHAPITRE = sectionDeNature(SECTIONS_INGENIERIE_WEB, 'chapitre')

/** Une charnière : la section qui passe la main d'un pôle au suivant. */
export const SECTION_CHARNIERE = sectionDeNature(SECTIONS_INGENIERIE_WEB, 'charniere')

/** Le fil transverse de la page IA : un axe de méthode, jamais une offre de plus. */
export const SECTION_FIL = SECTION_FIL_IA

/** Le premier chapitre de la page data, dont les blocs portent des preuves chiffrées. */
export const SECTION_DATA = sectionDeNature(SECTIONS_DATA, 'chapitre')

/** Le premier chapitre de la page IA. */
export const SECTION_IA = sectionDeNature(SECTIONS_IA, 'chapitre')
