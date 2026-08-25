// HomeHero.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HomeHero } from '.'

const meta = {
  title: 'Accueil/HomeHero',
  component: HomeHero,
} satisfies Meta<typeof HomeHero>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Le seuil de l'accueil : le titre, la promesse, les deux actions et la scène animée.
 *
 * C'est le bloc qui porte le LCP du site, donc celui où une régression de mise en page
 * coûte un point de budget. Il porte aussi le premier des deux boutons de mise en pause
 * des animations, celui qui est immédiatement à côté de ce qui bouge.
 */
export const Defaut: Story = {}
