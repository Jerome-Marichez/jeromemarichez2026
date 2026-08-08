// index.ts — module SEO partagé (domaine @shared)
// Point d'entrée unique du dispositif SEO : une page importe d'ici, jamais des fichiers
// internes. Voir docs/seo.md pour la marche à suivre sur une nouvelle page.
//
// `routes.server.ts` n'est délibérément PAS ré-exporté : il lit le système de fichiers
// et ne doit jamais entrer dans un bundle client. `sitemap.ts` l'importe directement.
export { buildPageMetadata, buildRootMetadata } from './metadata'
export {
  absoluteUrl,
  applyTitleTemplate,
  siteLocale,
  siteName,
  siteOrigin,
  siteTitle,
  siteUrl,
  titleTemplate,
} from './site'
export { buildOffreStructuredData, buildSiteStructuredData } from './structured-data'
