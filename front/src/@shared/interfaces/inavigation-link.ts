/**
 * Lien de navigation du site (en-tête et pied de page).
 * `label` est le libellé lu par l'utilisateur et par les technologies d'assistance :
 * il doit rester explicite hors contexte (critère WCAG 2.4.4).
 */
export interface INavigationLink {
  readonly href: string
  readonly label: string
}
