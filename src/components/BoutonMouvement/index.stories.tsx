import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BoutonMouvement } from './index'

const meta = {
  title: 'Composants/BoutonMouvement',
  component: BoutonMouvement,
} satisfies Meta<typeof BoutonMouvement>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Le seul état possible côté props : le composant lit son état initial depuis
 * `document.documentElement.dataset.mouvement` après le montage. Cliquer dessus
 * dans le panneau bascule réellement `data-mouvement` sur la racine du document
 * de la story, exactement comme sur le site.
 */
export const Defaut: Story = {}
