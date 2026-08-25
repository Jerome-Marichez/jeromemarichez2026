// HingeNote.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HingeNote } from '.'

const meta = {
  title: 'Editorial/HingeNote',
  component: HingeNote,
  args: {
    texte:
      'Ce qui tourne produit de la donnée. Encore faut-il qu’elle soit gouvernée avant ' +
      'd’être exploitée.',
  },
} satisfies Meta<typeof HingeNote>

export default meta
type Story = StoryObj<typeof meta>

/** La phrase qui passe la main à la section suivante, sous un chapitre. */
export const Defaut: Story = {}

/**
 * Une note courte.
 *
 * Le cas limite du composant : le filet et le retrait doivent tenir même quand le texte
 * ne fait pas une ligne entière.
 */
export const Courte: Story = { args: { texte: 'La donnée est le passage obligé.' } }
