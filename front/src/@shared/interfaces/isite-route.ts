/**
 * Une route réellement servie par le site, découverte dans l'arborescence de
 * `src/app/` au moment du build (voir `@shared/seo/routes.server.ts`).
 *
 * Sert de source unique au `sitemap.xml` : il n'existe pas de liste de routes écrite à
 * la main, qui divergerait de la réalité au premier ajout de page.
 */
export interface ISiteRoute {
  /** Chemin absolu depuis la racine, sans domaine ni barre finale (`/`, `/parcours`). */
  readonly path: string
  /** Date de dernière modification du fichier `page.*` qui porte la route. */
  readonly lastModified: Date
}
