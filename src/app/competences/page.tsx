import type { Metadata } from 'next'
import { descriptions } from '@/seo/descriptions'
import { CompetencesView } from '@/views/CompetencesView'

export const metadata: Metadata = {
  title: 'Compétences',
  description: descriptions.competences,
  alternates: { canonical: '/competences/' },
}

export default function PageCompetences() {
  return <CompetencesView />
}
