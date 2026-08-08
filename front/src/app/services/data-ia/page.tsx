// src/app/services/data-ia/page.tsx — jeromemarichez2026
// app/ ne fait QUE du routage : le gabarit vit dans src/views/offre/.
// Ce fichier déclare la route, ses métadonnées, et rend le gabarit avec son offre.
import type { Metadata } from 'next'
import { offreDataIa } from '@/content'
import { metadonneesOffre } from '@/views/offre/metadonnees'
import { OffreView } from '@/views/offre/OffreView'

export const metadata: Metadata = metadonneesOffre(offreDataIa)

export default function DataIaPage() {
  return <OffreView offre={offreDataIa} />
}
