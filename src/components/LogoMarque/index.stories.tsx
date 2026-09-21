import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { marques } from '@/contenu/marques'
import { LogoMarque } from './index'

const meta = {
  title: 'Composants/LogoMarque',
  component: LogoMarque,
} satisfies Meta<typeof LogoMarque>

export default meta

type Story = StoryObj<typeof meta>

/** Logo carré sur fond opaque (Prézage). */
export const LogoCarre: Story = {
  args: {
    marque: marques.prezage,
  },
}

/**
 * Cas limite : un tracé recoloré en `--encre` sur fond transparent (Truffle
 * Capital, à l'origine bleu nuit et illisible sur `--fond`, voir
 * `public/marques/LISEZMOI.md`).
 */
export const TraceRecolore: Story = {
  args: {
    marque: marques.truffle,
  },
}

/** Cas limite : un logo large et bas, très éloigné du carré (Verhoeven Joaillier). */
export const LogoLarge: Story = {
  args: {
    marque: marques.verhoeven,
  },
}
