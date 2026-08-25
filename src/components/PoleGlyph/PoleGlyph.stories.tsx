// PoleGlyph.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { PoleId } from '@/interfaces/types'
import { PoleGlyph } from '.'

const POLES: readonly PoleId[] = ['ingenierie-web', 'data', 'ia', 'sea-ux']

const meta = {
  title: 'Poles/PoleGlyph',
  component: PoleGlyph,
  args: { pole: 'data' },
  argTypes: {
    pole: { control: 'inline-radio', options: POLES },
    taille: { control: { type: 'range', max: 96, min: 16, step: 4 } },
  },
} satisfies Meta<typeof PoleGlyph>

export default meta
type Story = StoryObj<typeof meta>

/** Une marque isolée. Sa couleur vient de `--accent`, donc du contrôle « Pôle ». */
export const Seule: Story = {}

/**
 * Les quatre marques, chacune sous son propre `data-pole`.
 *
 * C'est l'état qu'on ne peut voir nulle part sur le site : les quatre pôles n'y sont
 * jamais côte à côte à la même taille. Les traits doivent se lire comme quatre
 * structures distinctes, et les quatre teintes se distinguer sans lire les noms.
 */
export const LesQuatre: Story = {
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '2.5rem' }}>
      {POLES.map((pole) => (
        <div data-pole={pole} key={pole} style={{ textAlign: 'center' }}>
          <PoleGlyph pole={pole} taille={64} />
          <p style={{ color: 'var(--encre-douce)', fontSize: '0.8rem' }}>{pole}</p>
        </div>
      ))}
    </div>
  ),
}

/** L'échelle réelle des usages : de l'étiquette de carte au titre de page de pôle. */
export const Echelles: Story = {
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '1.5rem' }}>
      {[20, 28, 40, 64, 96].map((taille) => (
        <PoleGlyph key={taille} pole="ia" taille={taille} />
      ))}
    </div>
  ),
}
