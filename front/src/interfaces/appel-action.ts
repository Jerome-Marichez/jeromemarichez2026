// appel-action.ts — jeromemarichez2026
// Entité éditoriale : un appel à l'action, c'est-à-dire une navigation proposée au
// visiteur. Le site étant une vitrine entièrement prérendue, un appel à l'action est
// toujours un LIEN, jamais une commande — voir @shared/components/ActionLink.

/**
 * Un appel à l'action : sa destination et son libellé.
 *
 * `libelle` doit rester explicite hors contexte (WCAG 2.4.4) : il est lu seul par un
 * lecteur d'écran qui énumère les liens de la page. « En savoir plus » ne convient
 * donc pas ; « Voir l'offre Ingénierie Web » convient.
 */
export interface IAppelAction {
  readonly href: string
  readonly libelle: string
}
