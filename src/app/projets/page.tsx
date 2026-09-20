import type { Metadata } from 'next'
import { descriptions } from '@/seo/descriptions'
import { ProjetsView } from '@/views/ProjetsView'

export const metadata: Metadata = {
  title: 'Projets',
  description: descriptions.projets,
  alternates: { canonical: '/projets/' },
}

export default function PageProjets() {
  return <ProjetsView />
}
