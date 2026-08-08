// sitemap.ts — jeromemarichez2026
// Génère `/sitemap.xml`. Convention de fichier Next.js (App Router).
import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/@shared/seo'
import { listSiteRoutes } from '@/@shared/seo/routes.server'

// Généré au build, comme les pages elles-mêmes : `listSiteRoutes()` lit l'arborescence
// de `src/app/`, qui n'existe pas dans la sortie `standalone` exécutée en production.
// Cette directive garantit que la lecture a lieu au build et jamais à l'exécution.
export const dynamic = 'force-static'

/**
 * Les URL du sitemap sont DÉRIVÉES des routes réelles : ajouter un
 * `src/app/<route>/page.tsx` suffit à faire apparaître la page ici, en supprimer un
 * suffit à l'en retirer. Aucune liste à tenir à jour, donc aucune divergence possible.
 *
 * Ni `priority` ni `changeFrequency` ne sont émis : Google les ignore depuis des années
 * et les renseigner reviendrait à inventer des valeurs. Seul `lastModified`, qui a une
 * source réelle (la date du fichier de page), est déclaré.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return listSiteRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified,
  }))
}
