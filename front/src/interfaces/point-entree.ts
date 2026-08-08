// point-entree.ts — jeromemarichez2026
// Entité éditoriale : un point d'entrée dans la chaîne — la façon dont le visiteur
// se situe. Deux cas existent : partir de zéro, ou brancher sur une application déjà
// en service (README.md — « La chaîne, et les deux points d'entrée »).
import type { CleOffre } from './types'

/**
 * Lien vers une page d'offre.
 *
 * La destination n'est PAS écrite : elle est dérivée de la clé par
 * `@shared/config/routes.ts`. Un seul module connaît le gabarit `/services/<cle>`, et
 * le contenu éditorial n'a donc jamais d'URL à tenir à jour.
 *
 * `libelle` est complet et non composé : deux points d'entrée voisins mènent à des
 * étapes différentes, leurs liens doivent rester discernables une fois restitués hors
 * contexte par un lecteur d'écran (WCAG 2.4.4).
 */
export interface ILienOffre {
  readonly offre: CleOffre
  readonly libelle: string
}

/** Une situation de départ, et le chemin qu'elle ouvre dans la chaîne. */
export interface IPointEntree {
  /** Clé stable, unique. Sert de clé de rendu de liste. */
  readonly cle: string
  /** La situation, dite du point de vue du visiteur : « Vous partez de zéro ». */
  readonly situation: string
  readonly description: string
  /**
   * Les étapes traversées depuis ce point d'entrée, dans l'ordre. Rendues comme un
   * chemin : c'est ce qui donne à voir que les deux entrées rejoignent la même chaîne
   * à des endroits différents.
   */
  readonly etapes: readonly string[]
  /** Où mène ce point d'entrée. Au moins un lien ; la seconde entrée bifurque. */
  readonly liens: readonly ILienOffre[]
}
