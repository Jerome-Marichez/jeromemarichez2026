// ArticleView/index.tsx — jeromemarichez-fr
// Un article : son en-tête daté, son corps, et ce qu'on lit ensuite.

import Link from 'next/link'
import { Breadcrumb } from '@/@shared/components/Breadcrumb'
import { toArticleRoute } from '@/@shared/routes'
import type { IArticle } from '@/interfaces/IArticle'
import type { IBlogIndex } from '@/interfaces/IBlogIndex'
import { formatDateFr } from '@/utils/format-date'
import { ArticleCard } from '../../components/ArticleCard'
import { ArticleFigure } from '../../components/ArticleFigure'
import { ArticleSource } from '../../components/ArticleSource'
import styles from './article-view.module.css'

interface ArticleViewProps {
  article: IArticle
  index: IBlogIndex
  /** Articles proposés en fin de lecture. Choisis par le service, pas par la vue. */
  autres: IArticle[]
}

/**
 * Une seule colonne, mesurée à `--mesure-texte`.
 *
 * C'est la seule page du site dont le contenu se lit en continu plutôt qu'en blocs : la
 * largeur de ligne y devient le premier facteur de lisibilité, avant toute décoration.
 * Aucun panneau de verre non plus — l'effet sert à distinguer des offres, pas à habiller
 * un texte suivi.
 */
export function ArticleView({ article, index, autres }: ArticleViewProps) {
  return (
    <div className={styles.page}>
      <article className={styles.article}>
        <header className={styles.entete}>
          <Breadcrumb
            fil={[
              { nom: index.titre, route: index.route },
              { nom: article.titre, route: toArticleRoute(article.slug) },
            ]}
          />
          <ArticleFigure figure={article.figure} />
          <p className={styles.date}>
            <time dateTime={article.datePublication}>{formatDateFr(article.datePublication)}</time>
          </p>
          <h1 className={styles.titre}>{article.titre}</h1>
          <p className={styles.chapo}>{article.chapo}</p>
        </header>

        <div className={styles.corps}>
          {article.sections.map((section) => (
            <section
              aria-labelledby={`${section.id}-titre`}
              className={styles.section}
              id={section.id}
              key={section.id}
            >
              <h2 className={styles.sousTitre} id={`${section.id}-titre`}>
                {section.titre}
              </h2>
              {section.paragraphes.map((paragraphe) => (
                <p className={styles.paragraphe} key={paragraphe}>
                  {paragraphe}
                </p>
              ))}
              {/* La liste ferme la section : c'est le contrat de `IArticleSection.liste`,
                  et il est tenu ici par la position du bloc, pas par une convention de
                  saisie. Rien n'est rendu quand le champ est absent — c'est le cas de la
                  plupart des sections. */}
              {section.liste ? (
                <ul className={styles.points}>
                  {section.liste.map((point) => (
                    <li className={styles.point} key={point}>
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {/* Rien n'est rendu quand la source est absente : c'est le cas de la plupart des
            articles, et une note « publié nulle part ailleurs » n'aurait aucun sens. */}
        {article.source ? <ArticleSource source={article.source} /> : null}
      </article>

      {autres.length > 0 ? (
        <aside aria-labelledby="a-lire-ensuite" className={styles.ensuite}>
          <h2 className={styles.titreEnsuite} id="a-lire-ensuite">
            À lire ensuite
          </h2>
          <ol className={styles.liste}>
            {autres.map((autre) => (
              <li key={autre.slug}>
                <ArticleCard article={autre} headingLevel="h3" />
              </li>
            ))}
          </ol>
          <p className={styles.retour}>
            <Link href={index.route}>Tous les articles</Link>
          </p>
        </aside>
      ) : null}
    </div>
  )
}
