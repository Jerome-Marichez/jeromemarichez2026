// src/app/blog/page.tsx — jeromemarichez-fr
// Routage seul : la liste est composée dans src/@vitrine/views/BlogIndexView.

import type { Metadata } from 'next'
import { StructuredData } from '@/components/StructuredData'
import { BLOG_INDEX } from '@/contenu/blog/blog-index'
import { toArticleRoute } from '@/routes'
import { buildPageMetadata } from '@/seo/page-metadata'
import { buildBlogSchema, buildBreadcrumbSchema } from '@/seo/structured-data'
import { listArticles } from '@/services/find-article'
import { BlogIndexView } from '@/views/BlogIndexView'

export const metadata: Metadata = buildPageMetadata(BLOG_INDEX)

export default function BlogPage() {
  const articles = listArticles()

  return (
    <>
      <BlogIndexView articles={articles} index={BLOG_INDEX} />
      <StructuredData
        schemas={[
          buildBlogSchema({
            nom: BLOG_INDEX.titre,
            description: BLOG_INDEX.meta.description,
            route: BLOG_INDEX.route,
            articles: articles.map((article) => ({
              titre: article.titre,
              route: toArticleRoute(article.slug),
            })),
          }),
          buildBreadcrumbSchema([{ nom: BLOG_INDEX.titre, route: BLOG_INDEX.route }]),
        ]}
      />
    </>
  )
}
