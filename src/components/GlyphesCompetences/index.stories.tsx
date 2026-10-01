import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { competences } from '@/contenu/competences'
import { GlypheCompetence } from './index'

const meta = {
  title: 'Composants/GlypheCompetence',
  component: GlypheCompetence,
} satisfies Meta<typeof GlypheCompetence>

export default meta

type Story = StoryObj<typeof meta>

/** Les neuf glyphes réels du mur de stack, un par famille, dans l'ordre du CV. */
export const NeufFamilles: Story = {
  args: {
    famille: 'Front & design system',
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
      {competences.map((competence) => (
        <div
          key={competence.famille}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <GlypheCompetence famille={competence.famille} />
          <span style={{ fontSize: '0.6875rem' }}>{competence.famille}</span>
        </div>
      ))}
    </div>
  ),
}

/**
 * Cas limite : une famille sans glyphe défini. Le composant ne rend rien
 * plutôt qu'une forme approximative, ce qui laisse simplement l'intitulé de
 * la famille porter seul l'information.
 */
export const FamilleInconnue: Story = {
  args: {
    famille: 'Famille non répertoriée',
  },
}
