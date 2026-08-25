// PoleHero.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { PoleId } from '@/interfaces/types'
import { findPole } from '@/services/find-pole'
import { PoleHero } from '.'

/** Chaque story part du contenu réel du pôle, jointures comprises. */
function ouverture(id: PoleId) {
  const { pole, suites } = findPole(id)
  return { pole, suites }
}

const meta = {
  title: 'Poles/PoleHero',
  component: PoleHero,
  args: ouverture('data'),
} satisfies Meta<typeof PoleHero>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Le socle : aucune arête entrante, donc pas de bloc de jointure sous l'accroche.
 *
 * C'est le seul des quatre dans ce cas, et le rendu doit tenir sans ce paragraphe.
 */
export const Socle: Story = {
  args: ouverture('ingenierie-web'),
  globals: { pole: 'ingenierie-web' },
}

/**
 * Le passage obligé, et le seul qui ouvre sur **deux** suites.
 *
 * C'est l'état qui compte : les deux sorties doivent se lire comme parallèles, sans
 * qu'aucun ordre, numéro ou position ne laisse croire que l'une précède l'autre.
 */
export const Passage: Story = { args: ouverture('data'), globals: { pole: 'data' } }

/** Une suite : arête entrante présente, aucune sortie. */
export const SuiteIA: Story = { args: ouverture('ia'), globals: { pole: 'ia' } }

/** L'autre suite, à la même place dans la chaîne et au même temps. */
export const SuiteSeaUx: Story = { args: ouverture('sea-ux'), globals: { pole: 'sea-ux' } }
