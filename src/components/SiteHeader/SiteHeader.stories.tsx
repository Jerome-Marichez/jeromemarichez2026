// SiteHeader.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SiteHeader } from '.'

const meta = {
  title: 'Socle/SiteHeader',
  component: SiteHeader,
} satisfies Meta<typeof SiteHeader>

export default meta
type Story = StoryObj<typeof meta>

/**
 * L'en-tête du site, identique sur toutes les pages.
 *
 * Il est rendu hors de tout `data-pole` sur le site : sa couleur est celle de la maison,
 * le cuivre, quelle que soit la page. Basculer le contrôle « Pôle » le teinte quand
 * même ici, ce qui n'arrive jamais en production — l'écart est le prix à payer pour
 * qu'une seule enveloppe serve tout le catalogue.
 */
export const Defaut: Story = {}
