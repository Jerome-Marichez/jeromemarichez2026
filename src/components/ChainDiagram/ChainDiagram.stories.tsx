// ChainDiagram.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ChainDiagram } from '.'

const meta = {
  title: 'Poles/ChainDiagram',
  component: ChainDiagram,
} satisfies Meta<typeof ChainDiagram>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Le modèle de l'offre, en entier : le tronc, le passage obligé, l'embranchement.
 *
 * C'est le composant où une erreur de mise en page coûte le plus cher, parce qu'il ne
 * décore pas le modèle, il l'énonce. Deux choses se vérifient ici et nulle part
 * ailleurs : les deux suites sont à la même hauteur, et aucune numérotation ne les
 * ordonne. En largeur réduite, la bifurcation se replie en colonne, et c'est le moment
 * où le sens est le plus fragile.
 */
export const Defaut: Story = {}
