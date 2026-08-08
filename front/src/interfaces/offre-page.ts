// offre-page.ts — jeromemarichez2026
// Entité éditoriale : les libellés propres au GABARIT des pages d'offre.
//
// Ce jeu de libellés est commun aux trois pages : il décrit la charpente — comment
// s'appellent les sections, comment s'annonce une preuve — jamais ce que dit une offre.
// Tout ce qui distingue une offre d'une autre vient de `content/offres/`, qui fait foi.
//
// Aucune vue n'écrit de texte éditorial (docs/architecture.md — « le contenu éditorial
// est de la donnée, pas du JSX ») : corriger « Ce que couvre l'offre » ne demande donc
// jamais de toucher au rendu, et le correctif vaut pour les trois pages à la fois.
import type { IAppelAction } from './appel-action'

/** Appel à contact fermant chaque page d'offre. */
interface ISectionContactOffre {
  readonly titre: string
  readonly lead: string
  readonly action: IAppelAction
}

/**
 * Libellés du gabarit des pages d'offre.
 *
 * Aucun de ces champs ne porte d'affirmation : ce sont des intitulés de section et des
 * étiquettes. Les affirmations — et les preuves qui les appuient — vivent toutes dans
 * `content/offres/`, seul corpus relu contre les règles de véracité du CLAUDE.md.
 */
export interface IOffrePage {
  /** Titre de la section qui énumère les axes de travail de l'offre. */
  readonly titreAxes: string
  /**
   * Étiquette annonçant la preuve d'un axe.
   *
   * La ligne éditoriale impose qu'une affirmation porte sa preuve : l'étiquette rend
   * ce statut visible, au lieu de laisser le chiffre se confondre avec la description.
   */
  readonly libellePreuve: string
  /** Titre de la section portant `IOffre.decisionPermise`. */
  readonly titreDecision: string
  /** Titre de la section portant la grille tarifaire, quand l'offre en publie une. */
  readonly titreTarifs: string
  /** Étiquette introduisant la preuve chiffrée qui appuie l'argument de la grille. */
  readonly libellePreuveTarifs: string
  readonly contact: ISectionContactOffre
}
