import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PiedDePage } from './index'

/**
 * Le pied de page n'a pas de props : il tire les coordonnées, la navigation et
 * l'année directement de `src/contenu/`, exactement comme sur le site. Une
 * seule story suffit donc à en couvrir le rendu.
 */
const meta = {
  title: 'Composants/PiedDePage',
  component: PiedDePage,
} satisfies Meta<typeof PiedDePage>

export default meta

type Story = StoryObj<typeof meta>

export const Defaut: Story = {}
