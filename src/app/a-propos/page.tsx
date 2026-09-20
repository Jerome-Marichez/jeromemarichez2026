import type { Metadata } from 'next'
import { descriptions } from '@/seo/descriptions'
import { AProposView } from '@/views/AProposView'

export const metadata: Metadata = {
  title: 'À propos',
  description: descriptions.aPropos,
  alternates: { canonical: '/a-propos/' },
}

export default function PageAPropos() {
  return <AProposView />
}
