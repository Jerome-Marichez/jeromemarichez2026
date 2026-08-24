// manifest.ts — jeromemarichez-fr
// Manifeste d'application web : ce que le navigateur retient du site s'il est épinglé.

import type { MetadataRoute } from 'next'
import { SITE_IDENTITY, SITE_PROMESSE, SITE_THEME_COLORS } from '@/seo/site'

// `output: 'export'` exige que les routes de métadonnées soient déclarées statiques.
export const dynamic = 'force-static'

/**
 * `display: 'browser'` assumé : c'est un site vitrine, pas une application. L'ouvrir
 * sans barre d'adresse priverait le visiteur de l'URL qu'il est justement venu vérifier.
 *
 * Le manifeste ne porte qu'une seule `theme_color`, là où le site suit les deux thèmes
 * du système. Elle prend l'ambiance claire ; la bascule réelle se joue dans les balises
 * `theme-color` du layout, qui savent, elles, porter une condition de média.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_IDENTITY.nom} | ${SITE_IDENTITY.titre} à ${SITE_IDENTITY.ville}`,
    short_name: SITE_IDENTITY.nom,
    description: SITE_PROMESSE,
    lang: 'fr',
    start_url: '/',
    display: 'browser',
    background_color: SITE_THEME_COLORS.clair,
    theme_color: SITE_THEME_COLORS.clair,
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
