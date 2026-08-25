// ArticleFigure.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { ArticleFigureId } from '@/interfaces/types'
import { ArticleFigure } from '.'

const FIGURES: readonly ArticleFigureId[] = ['borne', 'anteriorite', 'appui', 'gabarit', 'liaison']

const meta = {
  title: 'Blog/ArticleFigure',
  component: ArticleFigure,
  args: { figure: 'borne' },
  argTypes: { figure: { control: 'inline-radio', options: FIGURES } },
} satisfies Meta<typeof ArticleFigure>

export default meta
type Story = StoryObj<typeof meta>

/** Une figure isolée, à choisir dans le contrôle. */
export const Seule: Story = {}

/**
 * Les cinq figures ensemble.
 *
 * Le site ne les montre jamais côte à côte : chaque article n'en porte qu'une. C'est
 * pourtant la seule vue qui permette de vérifier ce qui compte, à savoir qu'aucune des
 * cinq ne se confond avec une autre au premier coup d'oeil, et qu'aucune ne simule une
 * donnée chiffrée. Les noms disent la structure dessinée, jamais le sujet de l'article.
 */
export const LesCinq: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, 16rem)' }}>
      {FIGURES.map((figure) => (
        <div key={figure}>
          <ArticleFigure figure={figure} />
          <p style={{ color: 'var(--encre-douce)', fontSize: '0.8rem' }}>{figure}</p>
        </div>
      ))}
    </div>
  ),
}
