import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { competences } from '@/contenu/competences'
import { MurDeStack } from './index'

const meta = {
  title: 'Composants/MurDeStack',
  component: MurDeStack,
} satisfies Meta<typeof MurDeStack>

export default meta

type Story = StoryObj<typeof meta>

/** Les neuf familles réelles, en grille dense, glyphe et ancrage compris. */
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
 * Cas limite : une seule famille. La grille du mur n'a alors plus qu'un
 * groupe à répartir, et la liste de définitions doit rester lisible avec un
 * seul terme au lieu des neuf habituels.
 */
export const UneSeuleFamille: Story = {
  args: {
    competences: [premiereFamille],
  },
}

/**
 * Cas limite : une famille sans ancrage de preuve, parce qu'aucun projet ne
 * la traite explicitement (CLAUDE.md, table des interdits : « aucun
 * rapprochement inventé »). La ligne « vu sur : » doit simplement être
 * absente, sans laisser de trou dans la mise en page.
 */
export const SansAncrage: Story = {
  args: {
    competences: [{ famille: premiereFamille.famille, items: premiereFamille.items }],
  },
}
