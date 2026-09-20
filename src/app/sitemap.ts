import type { MetadataRoute } from 'next'
import { navigation } from '@/contenu/navigation'

const RACINE = 'https://jeromemarichez.fr'

/**
 * Le plan du site, derive de la navigation : une route ajoutee au menu y entre
 * automatiquement. Une liste tenue a la main finirait par mentir.
 *
 * Les URL portent la barre finale parce que `trailingSlash` est actif dans
 * `next.config.mjs` : le plan du site et la balise canonique doivent designer
 * exactement la meme adresse, sinon le moteur voit deux pages la ou il y en a une.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const dateDeSortie = new Date()

  return navigation.map((entree) => ({
    url: `${RACINE}${entree.href}`,
    lastModified: dateDeSortie,
    changeFrequency: 'monthly',
    priority: entree.href === '/' ? 1 : 0.7,
  }))
}
