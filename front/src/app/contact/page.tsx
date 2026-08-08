// src/app/contact/page.tsx — jeromemarichez2026
// app/ ne fait QUE du routage : la composition de la page vit dans src/views/contact/.
// Ce fichier déclare la route « /contact », ses métadonnées, et rend la vue.
//
// Destination de TOUS les appels à l'action du site : l'en-tête, le pied de page, les
// trois pages d'offre et la page parcours y mènent. Elle a répondu 404 jusqu'ici.
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/@shared/seo'
import { contactPage } from '@/content'
import { ContactView } from '@/views/contact/ContactView'

/**
 * Métadonnées de la route « /contact », tirées du contenu typé comme le reste de la
 * page. Le `path` donne l'URL canonique ; sans lui la page hériterait de celle de
 * l'accueil, c'est-à-dire d'une canonique fausse (politique SEO du CLAUDE.md).
 */
export const metadata: Metadata = buildPageMetadata({
  title: contactPage.meta.titre,
  description: contactPage.meta.description,
  path: '/contact',
})

export default function ContactPage() {
  return <ContactView />
}
