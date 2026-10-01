import type { IArticle } from '@/interfaces/IArticle'
import { formatArticleDate } from '@/utils/format-date'
import styles from './article-view.module.css'

interface IArticleViewProps {
  readonly article: IArticle
}

/**
 * Un article : titre, date, puis le corps.
 *
 * Le corps est une chaîne HTML écrite à la main dans `src/contenu/blog` et
 * injectée directement : c'est sans risque ici parce que ce contenu est écrit
 * dans le dépôt et compilé au build, jamais reçu d'un visiteur. Si une source
 * externe alimente un jour ce champ, cette injection directe doit être retirée
 * avant tout le reste.
 */
export function ArticleView({ article }: IArticleViewProps) {
  return (
    <article className="cadre">
      <header className={styles.entete}>
        <h1 className={styles.titre}>{article.titre}</h1>
        <time className={styles.date} dateTime={article.datePublication}>
          {formatArticleDate(article.datePublication)}
        </time>
      </header>
      {/* Contenu compilé depuis src/contenu/blog, jamais reçu d'un visiteur : voir
          IArticle.corpsHtml. */}
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: corpsHtml est écrit à la
          main dans le dépôt et compilé au build, jamais reçu d'un visiteur (voir
          IArticle.corpsHtml). Si une source externe alimente un jour ce champ, cette
          injection directe doit être retirée avant tout le reste. */}
      <div className={styles.corps} dangerouslySetInnerHTML={{ __html: article.corpsHtml }} />
      {article.source !== undefined && (
        <p className={styles.source}>
          Initialement publié sur{' '}
          <a href={article.source.url} target="_blank" rel="noopener noreferrer">
            {article.source.reseau}
          </a>
          .
        </p>
      )}
    </article>
  )
}
