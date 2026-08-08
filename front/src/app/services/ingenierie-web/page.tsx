// src/app/services/ingenierie-web/page.tsx — jeromemarichez2026
// app/ ne fait QUE du routage : le gabarit vit dans src/views/offre/.
// Ce fichier déclare la route, ses métadonnées, et rend le gabarit avec son offre.
import type { Metadata } from 'next'
import { offreIngenierieWeb } from '@/content'
import { metadonneesOffre } from '@/views/offre/metadonnees'
import { OffreView } from '@/views/offre/OffreView'

export const metadata: Metadata = metadonneesOffre(offreIngenierieWeb)

export default function IngenierieWebPage() {
  return <OffreView offre={offreIngenierieWeb} />
}
