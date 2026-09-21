import type { Metadata } from 'next'
import { descriptions } from '@/seo/descriptions'
import { BlogView } from '@/views/BlogView'

export const metadata: Metadata = {
  title: 'Blog',
  description: descriptions.blog,
  alternates: { canonical: '/blog/' },
}

export default function PageBlog() {
  return <BlogView />
}
