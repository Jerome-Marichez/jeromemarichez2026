// src/app/blog/[slug]/page.tsx — jeromemarichez-fr
// Routage seul : l'article est composé dans src/views/ArticleView.

import type { Metadata } from 'next'
import { StructuredData } from '@/components/StructuredData'
import { BLOG_INDEX } from '@/contenu/blog/blog-index'
import { toArticleRoute } from '@/routes'
import { buildArticleMetadata } from '@/seo/page-metadata'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/seo/structured-data'
import { articleRevisionDate, findArticle, listArticles } from '@/services/find-article'
import { ArticleView } from '@/views/ArticleView'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

/**
 * Obligatoire sous `output: 'export'` : sans cette liste, le build n'a aucune page à
 * écrire pour ce segment et il échoue. Elle est dérivée des articles, jamais tenue à la
 * main — un article publié devient une page servie sans autre geste.
 */
export function generateStaticParams(): { slug: string }[] {
  return listArticles().map((article) => ({ slug: article.slug }))
}

/**
 * Aucune URL hors de cette liste n'est servie. C'est déjà la conséquence de l'export
 * statique ; l'écrire noir sur blanc évite qu'un futur passage au rendu serveur ouvre
 * silencieusement `/blog/<n-importe-quoi>` sur une page générée à la volée.
 */
export const dynamicParams = false

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const { article } = findArticle(slug)

  return buildArticleMetadata({
    meta: article.meta,
    route: toArticleRoute(article.slug),
    datePublished: article.datePublication,
    dateModified: articleRevisionDate(article),
  })
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const { article, autres } = findArticle(slug)
  // Une seule dérivation de la route, partagée par le JSON-LD et le fil d'Ariane : c'est
  // ce qui garantit qu'ils désignent la page réellement servie.
  const route = toArticleRoute(article.slug)

  return (
    <>
      <ArticleView article={article} autres={autres} index={BLOG_INDEX} />
      <StructuredData
        schemas={[
          buildArticleSchema({
            titre: article.titre,
            chapo: article.chapo,
            route,
            datePublished: article.datePublication,
            dateModified: articleRevisionDate(article),
          }),
          buildBreadcrumbSchema([
            { nom: BLOG_INDEX.titre, route: BLOG_INDEX.route },
            { nom: article.titre, route },
          ]),
        ]}
      />
    </>
  )
}
