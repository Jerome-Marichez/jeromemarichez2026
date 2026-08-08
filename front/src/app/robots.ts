// robots.ts — jeromemarichez2026
// Génère `/robots.txt`. Convention de fichier Next.js (App Router).
import type { MetadataRoute } from 'next'
import { absoluteUrl, siteUrl } from '@/@shared/seo'

// Généré au build : le fichier ne dépend d'aucune donnée de requête, il n'y a aucune
// raison de le recalculer à chaque appel d'un robot.
export const dynamic = 'force-static'

/**
 * Tout est indexable : le site est une vitrine, il n'a ni espace privé ni page technique
 * à masquer. Le jour où il en aura une, la règle `disallow` se pose ici — et la page
 * concernée devra aussi sortir du sitemap (voir docs/seo.md).
 *
 * Le sitemap est déclaré en URL absolue : la spécification robots.txt l'exige, une URL
 * relative y est ignorée.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteUrl,
  }
}
