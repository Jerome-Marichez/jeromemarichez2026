// Reveal.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Reveal } from '.'

const meta = {
  title: 'Mouvement/Reveal',
  component: Reveal,
  args: {
    children: (
      <p style={{ color: 'var(--encre)', fontSize: '1.1rem', maxWidth: '46ch' }}>
        Le contenu révélé n’est jamais amputé quand l’animation ne joue pas : la révélation porte
        l’apparition, pas la présence.
      </p>
    ),
  },
} satisfies Meta<typeof Reveal>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Le bloc déjà dans le champ de vision au premier rendu.
 *
 * Il ne s'anime pas, et c'est la règle : on n'anime que ce qui entre. Un contenu déjà
 * visible qui se met à bouger au chargement se lit comme un défaut, pas comme une
 * intention.
 */
export const DansLeChamp: Story = {}

/**
 * Le bloc qui entre par le bas, l'état pour lequel le composant existe.
 *
 * Une hauteur est poussée au-dessus de lui pour qu'il commence hors champ : il faut
 * faire défiler l'aperçu pour voir la révélation, exactement comme sur le site.
 */
export const ALEntree: Story = {
  decorators: [
    (Story) => (
      <div>
        <div style={{ color: 'var(--encre-douce)', height: '110vh' }}>
          Faire défiler vers le bas.
        </div>
        <Story />
      </div>
    ),
  ],
}

/**
 * Le rendu en balise `section`, réservé aux charnières et au fil.
 *
 * Ce n'est pas un détail de balisage : le filet qui se trace est un `::before` de la
 * section, donc ces blocs *sont* leur propre révélation. Le nom accessible passe par
 * `ariaLabelledBy`, sans quoi la section serait un point de repère anonyme.
 */
export const EnSection: Story = {
  args: {
    as: 'section',
    ariaLabelledBy: 'reveal-titre',
    children: (
      <>
        <h2 id="reveal-titre" style={{ color: 'var(--encre)' }}>
          Une charnière
        </h2>
        <p style={{ color: 'var(--encre-douce)' }}>Ce qui passe la main à la suite.</p>
      </>
    ),
  },
}
