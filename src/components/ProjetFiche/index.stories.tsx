import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { smsEnMassePlateforme } from '@/contenu/projets/sms-en-masse-plateforme'
import { truffle } from '@/contenu/projets/truffle'
import { ProjetFiche } from './index'

const meta = {
  title: 'Composants/ProjetFiche',
  component: ProjetFiche,
} satisfies Meta<typeof ProjetFiche>

export default meta

type Story = StoryObj<typeof meta>

/** Une fiche réelle de longueur courante. */
export const Defaut: Story = {
  args: {
    projet: smsEnMassePlateforme,
  },
}

/**
 * Cas limite : un bloc très long. La fiche Truffle Capital est, du jeu de
 * données réel, celle dont les quatre champs cumulent le plus de texte : elle
 * vérifie que la liste de définitions reste alignée sur sa colonne de
 * caractères même quand « Mon rôle » s'étend sur plusieurs lignes.
 */
export const BlocTresLong: Story = {
  args: {
    projet: truffle,
  },
}
