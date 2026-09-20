import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LienEvitement } from './index'

/**
 * Invisible par défaut, il n'apparaît qu'au focus clavier (Tab). C'est l'état
 * qu'une navigation à la souris ne permet jamais d'atteindre, exactement ce que
 * ce catalogue sert à montrer.
 */
const meta = {
  title: 'Composants/LienEvitement',
  component: LienEvitement,
} satisfies Meta<typeof LienEvitement>

export default meta

type Story = StoryObj<typeof meta>

export const Defaut: Story = {}
