import type { MetadataRoute } from 'next'

/**
 * Le site est un CV : il est fait pour etre indexe en entier. Rien n'est exclu,
 * et le plan du site est annonce explicitement plutot que laisse a la decouverte.
 */
/**
 * `output: 'export'` exige que cette route se declare statique explicitement :
 * Next refuse de collecter une route de metadonnees sans savoir si elle doit etre
 * rejouee a chaque requete. Sur un site sans donnees changeantes, la reponse est
 * toujours la meme, donc on la fige au build.
 */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://jeromemarichez.fr/sitemap.xml',
    host: 'https://jeromemarichez.fr',
  }
}
