// robots.ts — jeromemarichez-fr
// robots.txt généré, pointant vers le sitemap.

import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/@shared/seo/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
