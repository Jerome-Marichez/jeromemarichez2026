// src/app/page.tsx — jeromemarichez2026
// app/ ne fait QUE du routage : la composition de la page vit dans src/views/.
// Ce fichier déclare la route « / », ses métadonnées, et rend la vue.
import type { Metadata } from 'next'
import { accueil } from '@/content'
import { AccueilView } from '@/views/accueil/AccueilView'

/**
 * Métadonnées de la route « / », tirées du contenu typé comme le reste de la page.
 *
 * `title.absolute` court-circuite un éventuel gabarit de titre défini par le layout :
 * la page d'accueil porte déjà l'identité complète, elle ne doit pas être suffixée
 * une seconde fois par le nom du site.
 */
export const metadata: Metadata = {
  title: { absolute: accueil.meta.titre },
  description: accueil.meta.description,
}

export default function HomePage() {
  return <AccueilView />
}
