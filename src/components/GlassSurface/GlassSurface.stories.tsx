// GlassSurface.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SECTION_CHAPITRE } from '../../../.storybook/jeux-de-donnees'
import { GlassSurface } from '.'

const meta = {
  title: 'Verre/GlassSurface',
  component: GlassSurface,
  args: {
    children: (
      <div style={{ color: 'var(--encre)', padding: '2rem' }}>
        <h2 style={{ marginTop: 0 }}>{SECTION_CHAPITRE.titre}</h2>
        <p style={{ color: 'var(--encre-douce)' }}>{SECTION_CHAPITRE.chapo}</p>
      </div>
    ),
  },
} satisfies Meta<typeof GlassSurface>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Le panneau de verre, posé sur le fond d'atelier.
 *
 * Deux choses se jugent ici et se perdent partout ailleurs. La **réfraction** d'abord :
 * elle se lit sur l'arête et disparaît au centre, comme un vrai verre courbe ce qu'il y
 * a derrière ; si l'effet se voit au milieu du panneau, c'est un défaut. La **trame du
 * fond** ensuite : elle doit rester visible à travers le panneau, puisque la
 * transparence est le sujet de la direction artistique.
 *
 * Le filtre de réfraction et le fond d'atelier sont posés par l'enveloppe des stories,
 * exactement comme la mise en page racine les pose sur le site.
 */
export const Defaut: Story = {}

/**
 * Le verre en thème sombre.
 *
 * L'arête du verre est une dilution de `--accent` : elle change donc de couleur avec le
 * pôle, et de densité avec le thème. C'est le réglage le plus fragile du système, et le
 * seul endroit où on peut le comparer d'un thème à l'autre sans changer de page.
 */
export const Sombre: Story = { globals: { theme: 'sombre' } }

/**
 * Un panneau étroit.
 *
 * L'amplitude de la réfraction est proportionnelle à la taille de la boîte : un petit
 * panneau courbe donc moins qu'un grand, comme une lentille plus fine. La story existe
 * pour vérifier que l'effet reste perceptible à cette échelle sans devenir un liseré.
 */
export const Etroit: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '22rem' }}>
        <Story />
      </div>
    ),
  ],
}
