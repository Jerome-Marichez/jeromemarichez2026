import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TitreMachine } from './index'

/**
 * Le titre est rendu entier côté serveur, seule sa révélation est animée en
 * CSS. La boucle ne rejoue pas indéfiniment (elle se termine après `duree`
 * secondes), donc rien à mettre en pause ici, contrairement au mug.
 */
const meta = {
  title: 'Composants/TitreMachine',
  component: TitreMachine,
} satisfies Meta<typeof TitreMachine>

export default meta

type Story = StoryObj<typeof meta>

/** Le titre réel de l'accueil, à la durée par défaut de 1,6 seconde. */
export const Defaut: Story = {
  args: {
    texte: '< Jérôme Marichez />',
  },
}

/** Cas limite : une durée de frappe plus longue, pour un texte plus court. */
export const DureePersonnalisee: Story = {
  args: {
    texte: '< Jérôme Marichez />',
    duree: 3.2,
  },
}
