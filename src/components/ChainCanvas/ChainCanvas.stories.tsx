// ChainCanvas.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MotionToggle } from '@/components/MotionToggle'
import { ChainCanvas } from '.'

const DESCRIPTION =
  'Quatre plaques gravées : le socle, le passage de la donnée, et les deux suites qu’elle ouvre.'

const meta = {
  title: 'Accueil/ChainCanvas',
  component: ChainCanvas,
  args: { description: DESCRIPTION },
} satisfies Meta<typeof ChainCanvas>

export default meta
type Story = StoryObj<typeof meta>

/**
 * La scène du seuil, en mouvement.
 *
 * C'est un décor : le conteneur est `aria-hidden`, et la description ne sert qu'au
 * substitut affiché quand la scène ne peut pas être peinte. Rien de ce qui s'y dit n'est
 * annoncé, donc rien de ce qui s'y dit ne doit être une information nécessaire à la
 * compréhension de la page.
 */
export const EnMouvement: Story = {}

/**
 * La scène avec sa commande de mise en pause.
 *
 * L'état figé s'atteint en un clic ici, alors qu'il demande de trouver le bouton sur le
 * site. Ce qu'on vient vérifier est que la scène reste lisible à l'arrêt : une
 * composition qui n'aurait de sens qu'en mouvement ne satisferait pas WCAG 2.2.2. Le
 * réglage système `prefers-reduced-motion` produit le même arrêt, sans clic.
 *
 * L'état est partagé par tout le catalogue, comme il l'est par tout le site : il reste
 * tel quel en passant à une autre story.
 */
export const AvecCommande: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '1rem', justifyItems: 'start' }}>
      <MotionToggle />
      <ChainCanvas {...args} />
    </div>
  ),
}
