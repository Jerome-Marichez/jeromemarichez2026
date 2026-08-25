// PoleEntries.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PoleEntries } from '.'

const meta = {
  title: 'Poles/PoleEntries',
  component: PoleEntries,
} satisfies Meta<typeof PoleEntries>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Les quatre portes d'entrée de l'accueil.
 *
 * Le composant ne prend aucune prop : il lit `POLES_NAV` et range les plaques par
 * **place** — le tronc d'abord, socle puis passage, et les deux suites ensuite, côte à
 * côte. C'est la mise en page qui porte le modèle, et c'est elle qu'on vient vérifier
 * ici : deux plaques alignées à la même hauteur disent « parallèles » là où une colonne
 * de quatre aurait dit « dans cet ordre ».
 *
 * Chaque plaque pose son propre `data-pole` : le contrôle « Pôle » de la barre d'outils
 * n'a donc aucun effet sur cette story, et c'est normal.
 */
export const Defaut: Story = {}
