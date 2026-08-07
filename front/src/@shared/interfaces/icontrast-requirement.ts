/**
 * Exigence de contraste portant sur une combinaison de jetons de couleur.
 * Les champs `foreground` et `background` désignent des NOMS de jetons
 * (sans les deux tirets), jamais des valeurs : les valeurs restent définies
 * une seule fois, dans `@shared/styles/tokens.css`.
 */
export interface IContrastRequirement {
  readonly foreground: string
  readonly background: string
  /** 4.5 pour du texte courant (WCAG 1.4.3), 3 pour un composant d'interface (1.4.11). */
  readonly minimumRatio: number
  /** Où cette combinaison apparaît réellement dans le socle. */
  readonly usage: string
}
