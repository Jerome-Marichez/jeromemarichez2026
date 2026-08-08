// site.ts — jeromemarichez2026
// Origine du site et fabrication des URL absolues.
//
// POINT UNIQUE : aucun autre module ne reconstruit d'URL à la main et aucun ne relit
// `process.env`. Une URL canonique fausse est un défaut silencieux — elle ne casse
// aucun test, elle fait juste disparaître la page des résultats de recherche.
import { identite } from '@/content'
import { envSchema, URL_SITE_DEVELOPPEMENT } from '@/schemas/env.schema'

// Lecture LITTÉRALE de la variable, et non un spread de `process.env` : Next.js ne
// substitue les variables `NEXT_PUBLIC_*` à la compilation que sur un accès
// `process.env.NOM` explicite. Une chaîne vide vaut absence — sinon un `.env` présent
// mais mal rempli casserait le build au lieu de retomber sur le repli de développement.
const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
})

/** Origine absolue du site, garantie sans barre oblique finale par le schéma. */
export const siteUrl: string = env.NEXT_PUBLIC_SITE_URL ?? URL_SITE_DEVELOPPEMENT

/**
 * `metadataBase` de Next.js : toute URL relative déclarée dans les métadonnées (canonique,
 * Open Graph, images) se résout contre cette origine.
 */
export const siteOrigin = new URL(siteUrl)

/** Nom affiché du site et de l'activité — `og:site_name`, `applicationName`. */
export const siteName: string = identite.nom

/** Titre par défaut, servi tel quel sur les pages qui ne déclarent pas le leur. */
export const siteTitle = `${identite.nom} — ${identite.titreProfessionnel} à ${identite.ville}`

/**
 * Gabarit de titre appliqué à toutes les pages filles par Next.js.
 * `%s` est remplacé par le titre propre de la page.
 */
export const titleTemplate = `%s — ${identite.nom}`

/**
 * Locale Open Graph. Pendant de l'attribut `lang="fr"` déjà porté par `<html>` dans le
 * layout racine, qui reste la référence pour les technologies d'assistance.
 */
export const siteLocale = 'fr_FR'

/**
 * Applique le gabarit de titre hors du mécanisme de Next.js.
 *
 * Nécessaire parce que Next.js n'applique PAS `title.template` à `openGraph.title` ni à
 * `twitter.title` : sans cela, l'onglet du navigateur et l'aperçu de partage
 * afficheraient deux titres différents pour la même page.
 */
export function applyTitleTemplate(title: string): string {
  return titleTemplate.replace('%s', title)
}

/**
 * URL absolue d'un chemin du site. Le chemin est normalisé avec une barre initiale pour
 * qu'un appel relatif ne se résolve jamais contre le segment courant.
 *
 * La barre finale est retirée parce que Next.js sérialise les URL canoniques sans elle
 * (`trailingSlash: false`, la valeur par défaut) : sans cet alignement, la page d'accueil
 * se déclarerait `…/` dans le sitemap et dans le JSON-LD, mais `…` dans sa canonique.
 * Deux écritures d'une même URL, c'est exactement le signal que la canonique sert à
 * lever.
 */
export function absoluteUrl(path: string): string {
  const url = new URL(path.startsWith('/') ? path : `/${path}`, siteOrigin).toString()
  return url.endsWith('/') ? url.slice(0, -1) : url
}
