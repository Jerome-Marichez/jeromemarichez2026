// src/app/page.tsx — jeromemarichez-fr
// Routage seul : la page d'accueil est composée dans src/@vitrine/views/HomeView.

import type { Metadata } from 'next'
import { PAGE_ACCUEIL } from '@/contenu/accueil'
import { buildPageMetadata } from '@/seo/page-metadata'
import { HomeView } from '@/views/HomeView'

// Sans cet export, la description écrite pour l'accueil restait du code mort et Google
// lisait la promesse générique du layout à sa place.
export const metadata: Metadata = buildPageMetadata(PAGE_ACCUEIL)

export default function HomePage() {
  return <HomeView />
}
