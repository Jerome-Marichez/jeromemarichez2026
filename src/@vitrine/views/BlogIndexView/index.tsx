// BlogIndexView/index.tsx — jeromemarichez-fr
// La liste des articles.

import { Breadcrumb } from '@/@shared/components/Breadcrumb'
import type { IArticle } from '@/interfaces/IArticle'
import type { IBlogIndex } from '@/interfaces/IBlogIndex'
import { ArticleCard } from '../../components/ArticleCard'
import styles from './blog-index-view.module.css'

interface BlogIndexViewProps {
  index: IBlogIndex
  /** Articles déjà classés par le service : la vue n'ordonne rien. */
  articles: IArticle[]
}

/**
 * Une liste, pas une grille.
 *
 * Le blog n'a ni vignettes ni catégories, et une mise en page de magazine promettrait
 * les deux. Une colonne de titres datés dit ce qu'est cet endroit : quelques notes, lues
 * de la plus récente à la plus ancienne.
 */
export function BlogIndexView({ index, articles }: BlogIndexViewProps) {
  return (
    <div className={styles.page}>
      <header className={styles.entete}>
        <Breadcrumb fil={[{ nom: index.titre, route: index.route }]} />
        <h1 className={styles.titre}>{index.titre}</h1>
        <p className={styles.chapo}>{index.chapo}</p>
      </header>

      <ol className={styles.liste}>
        {articles.map((article) => (
          <li key={article.slug}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ol>
    </div>
  )
}
