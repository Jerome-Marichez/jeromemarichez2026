/**
 * Les routes du site, dans l'ordre de lecture attendu d'un recruteur : il veut
 * d'abord savoir qui, puis ce qui a ete fait, puis avec quoi, puis comment
 * joindre.
 *
 * Les slugs sont en francais parce que le site l'est : un `/a-propos` indexe
 * mieux qu'un `/about` sur un site francophone, et l'URL fait partie du texte lu.
 */

export interface IEntreeNavigation {
  readonly libelle: string
  readonly href: string
  /** Nom du fichier affiche dans l'onglet d'editeur de l'en-tete. */
  readonly onglet: string
}

export const navigation: readonly IEntreeNavigation[] = [
  { libelle: 'Accueil', href: '/', onglet: 'accueil.tsx' },
  { libelle: 'À propos', href: '/a-propos/', onglet: 'a-propos.tsx' },
  { libelle: 'Parcours', href: '/parcours/', onglet: 'parcours.tsx' },
  { libelle: 'Projets', href: '/projets/', onglet: 'projets.tsx' },
  { libelle: 'Compétences', href: '/competences/', onglet: 'competences.tsx' },
  { libelle: 'Contact', href: '/contact/', onglet: 'contact.tsx' },
]
