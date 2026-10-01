import Link from 'next/link'
import { articles } from '@/contenu/blog'
import { descriptions } from '@/seo/descriptions'
import { formatArticleDate } from '@/utils/format-date'
import styles from './blog-view.module.css'

/**
 * La page Blog : la liste des articles, du plus récent au plus ancien, portée
 * par `src/contenu/blog`. Comme ProjetsView, aucune grille de cartes : les
 * entrées se suivent en liste, séparées par un filet.
 */
export function BlogView() {
  return (
    <section className={`cadre ${styles.bloc}`}>
      <h1 className={styles.titre}>Blog</h1>
      <p className={styles.chapo}>{descriptions.blog}</p>
      <ul className={styles.liste}>
        {articles.map((article) => (
          <li className={styles.item} key={article.slug}>
            <article>
              <h2 className={styles.titreArticle}>
                <Link href={`/blog/${article.slug}/`}>{article.titre}</Link>
              </h2>
              <time className={styles.date} dateTime={article.datePublication}>
                {formatArticleDate(article.datePublication)}
              </time>
              <p className={styles.chapoArticle}>{article.chapo}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
