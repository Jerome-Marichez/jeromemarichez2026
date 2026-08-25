// ArticleSource.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ArticleSource } from '.'

const meta = {
  title: 'Blog/ArticleSource',
  component: ArticleSource,
  args: {
    source: {
      reseau: 'linkedin',
      url: 'https://www.linkedin.com/feed/update/urn:li:activity:0000000000000000000/',
    },
  },
} satisfies Meta<typeof ArticleSource>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Le renvoi vers la première parution du texte.
 *
 * Le libellé du réseau se déduit de `reseau`, il n'est jamais recopié dans un contenu :
 * une casse écrite à la main finit toujours par varier d'un article à l'autre.
 */
export const Defaut: Story = {}
