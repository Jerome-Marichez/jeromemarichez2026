// src/app/blog/page.tsx — jeromemarichez-fr
// Routage seul : la liste est composée dans src/@vitrine/views/BlogIndexView.

import type { Metadata } from 'next'
import { StructuredData } from '@/@shared/components/StructuredData'
import { toArticleRoute } from '@/@shared/routes'
import { buildPageMetadata } from '@/@shared/seo/page-metadata'
import { buildBlogSchema, buildBreadcrumbSchema } from '@/@shared/seo/structured-data'
import { BLOG_INDEX } from '@/@vitrine/contenu/blog/blog-index'
import { listArticles } from '@/@vitrine/services/find-article'
import { BlogIndexView } from '@/@vitrine/views/BlogIndexView'

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
