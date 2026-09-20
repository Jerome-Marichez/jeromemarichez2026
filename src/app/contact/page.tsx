import type { Metadata } from 'next'
import { descriptions } from '@/seo/descriptions'
import { ContactView } from '@/views/ContactView'

export const metadata: Metadata = {
  title: 'Contact',
  description: descriptions.contact,
  alternates: { canonical: '/contact/' },
}

export default function PageContact() {
  return <ContactView />
}
