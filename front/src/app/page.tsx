// src/app/page.tsx — jeromemarichez2026
// app/ ne fait QUE du routage : la composition de la page vit dans src/views/.
// Ce fichier déclare la route « / », ses métadonnées, et rend la vue.
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/@shared/seo'
import { accueil } from '@/content'
import { AccueilView } from '@/views/accueil/AccueilView'

/**
 * Métadonnées de la route « / », tirées du contenu typé comme le reste de la page.
 *
 * Le titre reste NON suffixé (`absoluteTitle`) : la page d'accueil porte déjà l'identité
 * complète et le gabarit du layout la répéterait. Passer malgré tout par
 * `buildPageMetadata` lui donne son URL canonique, son Open Graph et sa carte Twitter —
 * qui, déclarés à la main, auraient divergé du titre réellement servi.
 */
export const metadata: Metadata = buildPageMetadata({
  title: accueil.meta.titre,
  description: accueil.meta.description,
  path: '/',
  absoluteTitle: true,
})

export default function HomePage() {
  return <AccueilView />
}
