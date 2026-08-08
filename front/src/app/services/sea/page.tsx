// src/app/services/sea/page.tsx — jeromemarichez2026
// app/ ne fait QUE du routage : le gabarit vit dans src/views/offre/.
// Ce fichier déclare la route, ses métadonnées, et rend le gabarit avec son offre.
import type { Metadata } from 'next'
import { offreSea } from '@/content'
import { metadonneesOffre } from '@/views/offre/metadonnees'
import { OffreView } from '@/views/offre/OffreView'

export const metadata: Metadata = metadonneesOffre(offreSea)

export default function SeaPage() {
  return <OffreView offre={offreSea} />
}
