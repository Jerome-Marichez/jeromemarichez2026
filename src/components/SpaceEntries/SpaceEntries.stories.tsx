// SpaceEntries.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SpaceEntries } from '.'

const meta = {
  title: 'Editorial/SpaceEntries',
  component: SpaceEntries,
} satisfies Meta<typeof SpaceEntries>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Les deux espaces éditoriaux, réalisations et blog.
 *
 * Les volumes annoncés sont **dérivés** des listes sources, jamais recopiés : la story
 * montre donc le compte réel du jour. Si le chiffre affiché ici cesse de correspondre au
 * nombre de fiches, c'est la dérivation qui est cassée, pas la story.
 */
export const Defaut: Story = {}
