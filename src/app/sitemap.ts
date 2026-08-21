// sitemap.ts — jeromemarichez-fr
// Sitemap généré à partir de la liste des routes, jamais tenu à la main.

import type { MetadataRoute } from 'next'
import { INDEXABLE_ROUTES } from '@/@shared/routes'
import { SITE_DERNIERE_REVISION } from '@/@shared/seo/site'
import { toAbsoluteUrl } from '@/@shared/seo/urls'

// `output: 'export'` exige que les routes de métadonnées soient déclarées statiques.
export const dynamic = 'force-static'

/**
 * Seul `lastModified` est renseigné. Google ignore `changeFrequency` et `priority`
 * depuis 2023 : les garder reviendrait à publier des champs que personne ne lit, en
 * laissant croire qu'ils pilotent le passage du robot.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((route) => ({
    url: toAbsoluteUrl(route),
    lastModified: SITE_DERNIERE_REVISION,
  }))
}
