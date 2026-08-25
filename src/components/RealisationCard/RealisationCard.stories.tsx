// RealisationCard.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { listRealisations } from '@/services/find-realisation'
import { exiger } from '../../../.storybook/jeux-de-donnees'
import { RealisationCard } from '.'

const AVEC_CHIFFRE = listRealisations().filter((r) => r.chiffre !== undefined)
const SANS_CHIFFRE = listRealisations().filter((r) => r.chiffre === undefined)

const meta = {
  title: 'Realisations/RealisationCard',
  component: RealisationCard,
  args: { realisation: exiger(listRealisations(), 'réalisation') },
} satisfies Meta<typeof RealisationCard>

export default meta
type Story = StoryObj<typeof meta>

/** La carte telle qu'elle paraît sur l'index des réalisations. */
export const Defaut: Story = {}

/**
 * Une fiche qui porte un chiffre.
 *
 * Trois fiches seulement sont dans ce cas, et l'accroche de l'accueil se garde bien de
 * laisser croire le contraire. La carte doit rendre le chiffre lisible sans le
 * transformer en promesse générale.
 */
export const AvecChiffre: Story = {
  args: { realisation: exiger(AVEC_CHIFFRE, 'réalisation chiffrée') },
}

/** Une fiche sans chiffre : le cas majoritaire, et il ne doit pas paraître amputé. */
export const SansChiffre: Story = {
  args: { realisation: exiger(SANS_CHIFFRE, 'réalisation sans chiffre') },
}
