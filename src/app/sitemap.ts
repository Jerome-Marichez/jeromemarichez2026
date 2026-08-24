// sitemap.ts — jeromemarichez-fr
// Sitemap généré à partir des routes et des articles, jamais tenu à la main.

import type { MetadataRoute } from 'next'
import { buildSitemapEntries } from '@/seo/sitemap-entries'

// `output: 'export'` exige que les routes de métadonnées soient déclarées statiques.
export const dynamic = 'force-static'

/**
 * Seul `lastModified` est renseigné. Google ignore `changeFrequency` et `priority`
 * depuis 2023 : les garder reviendrait à publier des champs que personne ne lit, en
 * laissant croire qu'ils pilotent le passage du robot.
 *
 * La composition des entrées — quelles URL, avec quelle date — vit dans
 * `@shared/seo/sitemap-entries`, où elle se vérifie sans démarrer Next.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries()
}
