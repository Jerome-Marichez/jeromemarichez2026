import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { competences } from '@/contenu/competences'
import { MurDeStack } from './index'

const meta = {
  title: 'Composants/MurDeStack',
  component: MurDeStack,
} satisfies Meta<typeof MurDeStack>

export default meta

type Story = StoryObj<typeof meta>

/** Les neuf familles réelles, en colonnes denses. */
export const Defaut: Story = {
  args: {
    competences,
  },
}

const [premiereFamille] = competences

if (premiereFamille === undefined) {
  throw new Error('Le contenu réel des compétences est vide.')
}

/**
 * Cas limite : une seule famille. Les colonnes du mur n'ont alors plus qu'un
 * groupe à répartir, et la liste de définitions doit rester lisible avec un
 * seul terme au lieu des neuf habituels.
 */
export const UneSeuleFamille: Story = {
  args: {
    competences: [premiereFamille],
  },
}
