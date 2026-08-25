// BoundaryList.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LIMITES } from '@/contenu/limites'
import { BoundaryList } from '.'

const meta = {
  title: 'Editorial/BoundaryList',
  component: BoundaryList,
  args: { limites: LIMITES },
} satisfies Meta<typeof BoundaryList>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Les limites assumées : ce qui n'est pas proposé, et ce qui l'est à la place.
 *
 * Le composant est une liste de définitions, pas un tableau : chaque « hors » est un
 * terme, chaque « à la place » sa définition. C'est le balisage qui rend la paire
 * intelligible à un lecteur d'écran, et il ne se voit qu'en inspectant le DOM.
 */
export const Defaut: Story = {}

/** Une paire isolée, pour juger le rapport de force visuel entre les deux colonnes. */
export const UneSeule: Story = { args: { limites: LIMITES.slice(0, 1) } }
