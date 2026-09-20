import type { MetadataRoute } from 'next'

/**
 * Le site est un CV : il est fait pour etre indexe en entier. Rien n'est exclu,
 * et le plan du site est annonce explicitement plutot que laisse a la decouverte.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://jeromemarichez.fr/sitemap.xml',
    host: 'https://jeromemarichez.fr',
  }
}
