// src/app/parcours/page.tsx — jeromemarichez2026
// app/ ne fait QUE du routage : la composition de la page vit dans src/views/parcours/.
// Ce fichier déclare la route « /parcours », ses métadonnées, et rend la vue.
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/@shared/seo'
import { parcoursPage } from '@/content'
import { ParcoursView } from '@/views/parcours/ParcoursView'

/**
 * Métadonnées de la route « /parcours », tirées du contenu typé comme le reste de la
 * page. Le `path` donne l'URL canonique ; sans lui la page hériterait de celle de
 * l'accueil, c'est-à-dire d'une canonique fausse (politique SEO du CLAUDE.md).
 *
 * L'existence de ce fichier suffit à faire entrer `/parcours` dans le sitemap :
 * `@shared/seo/routes.server.ts` dérive les URL des routes réelles au build.
 */
export const metadata: Metadata = buildPageMetadata({
  title: parcoursPage.meta.titre,
  description: parcoursPage.meta.description,
  path: '/parcours',
})

export default function ParcoursPage() {
  return <ParcoursView />
}
