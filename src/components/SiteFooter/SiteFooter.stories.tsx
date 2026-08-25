// SiteFooter.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SiteFooter } from '.'

const meta = {
  title: 'Socle/SiteFooter',
  component: SiteFooter,
} satisfies Meta<typeof SiteFooter>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Le pied de page, identique sur toutes les pages.
 *
 * Il porte le second exemplaire du bouton de mise en pause des animations : c'est le
 * point d'accès garanti au réglage, celui qu'on atteint sans avoir à remonter en haut de
 * page. Le vérifier ici évite de le perdre lors d'un remaniement du pied.
 */
export const Defaut: Story = {}
