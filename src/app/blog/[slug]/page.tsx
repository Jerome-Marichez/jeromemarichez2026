import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { articles } from '@/contenu/blog'
import { ArticleView } from '@/views/ArticleView'

interface IPageArticleProps {
  readonly params: Promise<{ slug: string }>
}

/**
 * `output: 'export'` exige la liste complète des routes dynamiques au build :
 * sans elle, Next ne sait pas quelles pages écrire dans `out/`.
 */
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

function trouverArticle(slug: string) {
  return articles.find((article) => article.slug === slug)
}

export async function generateMetadata({ params }: IPageArticleProps): Promise<Metadata> {
  const { slug } = await params
  const article = trouverArticle(slug)

  if (article === undefined) {
    return {}
  }

  return {
    title: article.titre,
    description: article.metaDescription,
    alternates: { canonical: `/blog/${article.slug}/` },
  }
}

export default async function PageArticle({ params }: IPageArticleProps) {
  const { slug } = await params
  const article = trouverArticle(slug)

  if (article === undefined) {
    notFound()
  }

  return <ArticleView article={article} />
}
