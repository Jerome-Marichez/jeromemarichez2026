import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { accroches } from '@/contenu/accroches'
import { TitreSection } from './index'

const meta = {
  title: 'Composants/TitreSection',
  component: TitreSection,
} satisfies Meta<typeof TitreSection>

export default meta

type Story = StoryObj<typeof meta>

/** Niveau 2, celui d'une section de page. */
export const Niveau2: Story = {
  args: {
    children: accroches.axes,
    niveau: 2,
  },
}

/** Niveau 3, celui d'une sous-section. Le style ne change pas avec le niveau. */
export const Niveau3: Story = {
  args: {
    children: accroches.formation,
    niveau: 3,
  },
}
