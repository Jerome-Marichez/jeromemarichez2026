// urls.ts — jeromemarichez-fr
// Une route interne devenue URL absolue, sous la forme exacte que le site sert.

import { SITE_URL } from './site'

/**
 * URL absolue et canonique d'une route.
 *
 * L'export statique sort chaque page en `<route>/index.html` (`trailingSlash` dans
 * `next.config.mjs`), donc l'URL servie porte toujours la barre finale et c'est celle
 * que Next écrit dans `<link rel="canonical">`. Sitemap et JSON-LD passent par ici pour
 * dire la même URL au caractère près : une variante sans barre finale ferait deux
 * adresses pour une seule page aux yeux d'un moteur.
 */
export function toAbsoluteUrl(route: string): string {
  const chemin = route.endsWith('/') ? route : `${route}/`
  return `${SITE_URL}${chemin}`
}
