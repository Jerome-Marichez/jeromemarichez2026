// IEditorialSection.ts — jeromemarichez-fr
// Une section de page : le niveau auquel le site se raconte.

import type { IEditorialBlock } from './IEditorialBlock'
import type { PoleId, SectionKind } from './types'

/**
 * Une section éditoriale rendue comme un bloc de page à part entière.
 *
 * `transition` porte la **charnière** : la phrase qui passe la main à la section
 * suivante. C'est elle qui transforme des offres empilées en une chaîne continue —
 * construire, exploiter et mesurer, puis décider — tenue par un seul interlocuteur.
 */
export interface IEditorialSection {
  /** Identifiant kebab-case, sert d'ancre (`#id`) et de cible aux liens internes. */
  id: string
  /** Nature de la section : commande son rendu. */
  kind: SectionKind
  /** Surtitre, 4 mots maximum. */
  kicker: string
  /** Titre de la section. */
  titre: string
  /** Chapô, 2 à 4 phrases. */
  chapo: string
  /** Points d'expertise de la section. */
  blocs: IEditorialBlock[]
  /** Phrase de charnière vers la section suivante. */
  transition?: string
  /** Pôle rattaché, quand la section en porte un. */
  pole?: PoleId
}
