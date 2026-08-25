// HingeSection.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SECTION_CHARNIERE } from '../../../.storybook/jeux-de-donnees'
import { HingeSection } from '.'

const meta = {
  title: 'Editorial/HingeSection',
  component: HingeSection,
  args: { section: SECTION_CHARNIERE },
} satisfies Meta<typeof HingeSection>

export default meta
type Story = StoryObj<typeof meta>

/**
 * La section qui passe la main d'un pôle au suivant.
 *
 * Elle est sa propre révélation : le filet qui se trace est un `::before` de la
 * `<section>`, ce qui explique qu'elle soit rendue en balise `section` et non en
 * `div`. Le filet ne se voit qu'à l'entrée dans le champ de vision.
 */
export const Defaut: Story = {}

/**
 * Une charnière sans repères, réduite à son chapô.
 *
 * Le contenu du site en porte toujours, mais rien dans le type ne l'impose : la liste
 * doit simplement disparaître, sans laisser d'espace vide sous le texte.
 */
export const SansReperes: Story = {
  args: { section: { ...SECTION_CHARNIERE, blocs: [] } },
}
