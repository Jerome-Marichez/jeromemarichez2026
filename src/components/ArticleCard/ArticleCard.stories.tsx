// ArticleCard.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { listArticles } from '@/services/find-article'
import { exiger } from '../../../.storybook/jeux-de-donnees'
import { ArticleCard } from '.'

const ARTICLE = exiger(listArticles(), 'article du blog')

const meta = {
  title: 'Blog/ArticleCard',
  component: ArticleCard,
  args: { article: ARTICLE },
  argTypes: { headingLevel: { control: 'inline-radio', options: ['h2', 'h3'] } },
} satisfies Meta<typeof ArticleCard>

export default meta
type Story = StoryObj<typeof meta>

/** La carte telle qu'elle paraît sur l'index du blog. */
export const Defaut: Story = {}

/**
 * Le niveau de titre abaissé, pour la liste des articles liés en bas de fiche.
 *
 * Rien ne change à l'écran : ce qui change est la hiérarchie du document. Deux `h2` de
 * rangs différents dans la même page cassent la navigation par titres d'un lecteur
 * d'écran, et cela ne se voit sur aucune capture.
 */
export const NiveauAbaisse: Story = { args: { headingLevel: 'h3' } }

/**
 * Les cartes du blog les unes sous les autres.
 *
 * C'est l'alignement qu'on vient juger : des titres de longueurs très inégales ne
 * doivent pas décaler les dates ni les figures d'une carte à l'autre.
 */
export const EnListe: Story = {
  render: () => (
    <ul style={{ display: 'grid', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
      {listArticles().map((article) => (
        <li key={article.slug}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  ),
}
