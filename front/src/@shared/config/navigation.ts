import type { INavigationLink } from '../interfaces/inavigation-link'

/**
 * Identifiant du conteneur de contenu principal. Sert de cible au lien
 * d'évitement de l'en-tête ; le `main` correspondant est rendu focusable pour
 * que le saut déplace réellement le focus, et pas seulement le défilement.
 */
export const MAIN_CONTENT_ID = 'contenu'

/**
 * Navigation principale du site : les trois offres, le parcours, le contact.
 * Ordre volontaire — les offres d'abord (ce qui est vendu), le parcours ensuite
 * (ce qui le rend crédible), le contact en dernier (l'action attendue).
 * Les routes correspondantes sont créées par d'autres lots ; les libellés, eux,
 * sont figés ici pour que l'en-tête et le pied de page ne divergent jamais.
 */
export const siteNavigation: readonly INavigationLink[] = [
  { href: '/services/ingenierie-web', label: 'Ingénierie web' },
  { href: '/services/data-ia', label: 'Data et IA' },
  { href: '/services/seo-sea', label: 'SEO et SEA' },
  { href: '/parcours', label: 'Parcours' },
  { href: '/contact', label: 'Contact' },
]
