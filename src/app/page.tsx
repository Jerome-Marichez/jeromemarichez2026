import type { Metadata } from 'next'
import { descriptions } from '@/seo/descriptions'
import { AccueilView } from '@/views/AccueilView'

export const metadata: Metadata = {
  // Le gabarit racine porte deja le titre complet pour l'accueil : le redefinir
  // ici avec le modele « %s · Jerome Marichez » doublerait son nom.
  description: descriptions.accueil,
  alternates: { canonical: '/' },
}

export default function PageAccueil() {
  return <AccueilView />
}
