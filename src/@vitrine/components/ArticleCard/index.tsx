// ArticleCard/index.tsx — jeromemarichez-fr
// Un article vu depuis une liste : sa date, son titre, son chapô.

import Link from 'next/link'
import { toArticleRoute } from '@/@shared/routes'
import type { IArticle } from '@/interfaces/IArticle'
import { formatDateFr } from '@/utils/format-date'
import styles from './article-card.module.css'

interface ArticleCardProps {
  article: IArticle
  /** Niveau de titre, pour que la hiérarchie du document reste juste selon le contexte. */
  headingLevel?: 'h2' | 'h3'
}

/**
 * Le lien porte le titre, et rien d'autre.
 *
 * Rendre la carte entière cliquable aurait demandé de la superposer d'un lien vide ou de
 * la piloter en JavaScript : dans les deux cas, un lecteur d'écran annonce un lien sans
 * intitulé ou une zone qu'aucune touche n'atteint. Un titre cliquable dit exactement où
 * l'on va, au clavier comme à la souris.
 */
export function ArticleCard({ article, headingLevel = 'h2' }: ArticleCardProps) {
  const Heading = headingLevel

  return (
    <article className={styles.carte}>
      <p className={styles.date}>
        <time dateTime={article.datePublication}>{formatDateFr(article.datePublication)}</time>
      </p>

      <Heading className={styles.titre}>
        <Link className={styles.lien} href={toArticleRoute(article.slug)}>
          {article.titre}
        </Link>
      </Heading>

      <p className={styles.chapo}>{article.chapo}</p>
    </article>
  )
}
