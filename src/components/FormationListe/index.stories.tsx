import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { formation } from '@/contenu/formation'
import { FormationListe } from './index'

const meta = {
  title: 'Composants/FormationListe',
  component: FormationListe,
} satisfies Meta<typeof FormationListe>

export default meta

type Story = StoryObj<typeof meta>

/** Les deux diplômes réels, du plus récent au plus ancien. */
export const Defaut: Story = {
  args: {
    formations: formation,
  },
}

const [premiereFormation] = formation

if (premiereFormation === undefined) {
  throw new Error('Le contenu réel de la formation est vide.')
}

/** Cas limite : une seule formation déclarée. */
export const UneSeuleFormation: Story = {
  args: {
    formations: [premiereFormation],
  },
}
