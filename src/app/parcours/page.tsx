import type { Metadata } from 'next'
import { descriptions } from '@/seo/descriptions'
import { ParcoursView } from '@/views/ParcoursView'

export const metadata: Metadata = {
  title: 'Parcours',
  description: descriptions.parcours,
  alternates: { canonical: '/parcours/' },
}

export default function PageParcours() {
  return <ParcoursView />
}
