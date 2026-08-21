// robots.ts — jeromemarichez-fr
// robots.txt généré, pointant vers le sitemap.

import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/@shared/seo/site'

// `output: 'export'` exige que les routes de métadonnées soient déclarées statiques.
export const dynamic = 'force-static'

/**
 * Pas de directive `Host` : elle n'a jamais été comprise que par Yandex, et Google
 * l'ignore. Le domaine canonique se dit par `<link rel="canonical">` et le sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
