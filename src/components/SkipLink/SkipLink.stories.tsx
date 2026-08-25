// SkipLink.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SkipLink } from '.'

const meta = {
  title: 'Socle/SkipLink',
  component: SkipLink,
} satisfies Meta<typeof SkipLink>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Le lien d'évitement au repos : hors flux visuel, présent dans le document.
 *
 * L'aperçu paraît vide, et c'est l'état correct. Le composant ne se voit qu'au clavier.
 */
export const AuRepos: Story = {}

/**
 * Le même lien, une fois reçu le focus.
 *
 * C'est l'état qui compte, et il est presque impossible à observer sur le site : il faut
 * charger une page et appuyer sur Tab avant tout autre geste. Ici il est simplement posé
 * à l'écran, ce qui permet de juger son contraste et sa lisibilité dans les deux thèmes.
 * Le focus est donné après la peinture, sans quoi le navigateur n'a rien à cibler.
 */
export const AuClavier: Story = {
  play: async ({ canvas }) => {
    const lien = canvas.getByRole('link', { name: 'Aller au contenu' })
    lien.focus()
  },
}
