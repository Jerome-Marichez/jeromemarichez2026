// src/app/page.tsx — jeromemarichez-fr
// Routage seul : la page d'accueil est composée dans src/@vitrine/views/HomeView.

import type { Metadata } from 'next'
import { buildPageMetadata } from '@/@shared/seo/page-metadata'
import { PAGE_ACCUEIL } from '@/@vitrine/contenu/accueil'
import { HomeView } from '@/@vitrine/views/HomeView'

// Sans cet export, la description écrite pour l'accueil restait du code mort et Google
// lisait la promesse générique du layout à sa place.
export const metadata: Metadata = buildPageMetadata(PAGE_ACCUEIL)

export default function HomePage() {
  return <HomeView />
}
