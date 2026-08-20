// sitemap.ts — jeromemarichez-fr
// Sitemap généré à partir de la liste des routes, jamais tenu à la main.

import type { MetadataRoute } from 'next'
import { INDEXABLE_ROUTES, ROUTES } from '@/@shared/routes'
import { SITE_URL } from '@/@shared/seo/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route === ROUTES.accueil ? '' : route}`,
    changeFrequency: 'monthly' as const,
    priority: route === ROUTES.accueil ? 1 : 0.8,
  }))
}
