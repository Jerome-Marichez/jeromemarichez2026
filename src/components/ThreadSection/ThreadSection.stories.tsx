// ThreadSection.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SECTION_FIL } from '../../../.storybook/jeux-de-donnees'
import { ThreadSection } from '.'

const meta = {
  title: 'Editorial/ThreadSection',
  component: ThreadSection,
  args: { section: SECTION_FIL },
} satisfies Meta<typeof ThreadSection>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Le fil de la page IA : un axe de méthode qui traverse les pôles.
 *
 * Un fil ne reçoit jamais le verre — le vitrer en ferait une offre de plus, alors qu'il
 * décrit la façon de tenir les autres. Les rangs affichés en tête d'étape sont
 * décoratifs : la numérotation appartient au `<ol>`, et l'annoncer deux fois ferait
 * entendre « un un » à un lecteur d'écran.
 */
export const Defaut: Story = {}
