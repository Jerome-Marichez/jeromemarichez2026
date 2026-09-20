import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Mug } from './index'

/**
 * Le mug est le seul mouvement permanent du site : vapeur en boucle `linear`,
 * tourbillon du café au survol. Un catalogue qui le figerait mentirait sur ce
 * qu'il est ; il reste donc animé ici aussi, comme sur le site. Les deux
 * mouvements respectent `prefers-reduced-motion`, y compris dans ce panneau.
 */
const meta = {
  title: 'Composants/Mug',
  component: Mug,
} satisfies Meta<typeof Mug>

export default meta

type Story = StoryObj<typeof meta>

/** Décoratif : `description` absente, donc `role="presentation"` et masqué à la synthèse vocale. */
export const Decoratif: Story = {}

/** Porteur de sens : une `description` le rend en `role="img"` avec son `aria-label`. */
export const AvecDescription: Story = {
  args: {
    description: 'Mug de café fumant, illustration du poste de travail',
  },
}
