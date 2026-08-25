// MotionToggle.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MotionToggle } from '.'

const meta = {
  title: 'Mouvement/MotionToggle',
  component: MotionToggle,
} satisfies Meta<typeof MotionToggle>

export default meta
type Story = StoryObj<typeof meta>

/** Animations actives : le bouton propose de les figer, `aria-pressed` vaut `false`. */
export const Actif: Story = {}

/**
 * Animations figées, après un clic.
 *
 * Le libellé change, `aria-pressed` passe à `true` et le témoin bascule. L'état est
 * porté par un store partagé hors de React : le bouton du pied de page et celui du haut
 * de l'accueil disent donc toujours la même chose, et cette story le montre en cliquant
 * plutôt qu'en le forçant.
 */
export const Fige: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'))
  },
}
