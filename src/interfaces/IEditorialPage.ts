// IEditorialPage.ts — jeromemarichez-fr
// Une page complète du site, contenu et métadonnées comprises.

import type { IEditorialSection } from './IEditorialSection'

/** Métadonnées SEO d'une page. Longueurs contraintes par l'affichage en SERP. */
export interface IPageMeta {
  /** Balise `<title>`, 60 caractères maximum. */
  title: string
  /** Meta description, 155 caractères maximum. */
  description: string
}

/**
 * Le contenu éditorial est de la **donnée, pas du JSX** (docs/architecture.md).
 * Ajouter une section ou un point d'expertise ne doit demander aucune retouche
 * de rendu : les vues consomment cette structure, elles ne la dupliquent pas.
 */
export interface IEditorialPage {
  /** Route Next.js servie par cette page. */
  route: string
  meta: IPageMeta
  sections: IEditorialSection[]
}
