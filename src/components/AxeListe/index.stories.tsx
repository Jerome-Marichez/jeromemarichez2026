import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { axes } from '@/contenu/axes'
import type { IAxe } from '@/interfaces/IAxe'
import { AxeListe } from './index'

const meta = {
  title: 'Composants/AxeListe',
  component: AxeListe,
} satisfies Meta<typeof AxeListe>

export default meta

type Story = StoryObj<typeof meta>

/** Les quatre axes réels de la pratique, dans leur ordre de déclaration. */
export const Defaut: Story = {
  args: {
    axes,
  },
}

/**
 * Cas limite : un axe sans preuve. Le type `IAxe` autorise un tableau `preuves`
 * vide, un cas que le contenu réel ne rencontre jamais puisque chaque axe publié
 * porte au moins une preuve chiffrée. La variante ci-dessous reprend l'axe
 * « QA » réel et vide son tableau de preuves, pour vérifier que la liste de
 * définitions reste lisible quand la puce `<dd>` n'a rien à énumérer.
 */
const axeQa = axes.find((axe) => axe.nom === 'QA')

if (axeQa === undefined) {
  throw new Error("L'axe QA est introuvable dans le contenu réel.")
}

const axeSansPreuve: IAxe = {
  ...axeQa,
  preuves: [],
}

export const AxeSansPreuve: Story = {
  args: {
    axes: [axeSansPreuve],
  },
}
