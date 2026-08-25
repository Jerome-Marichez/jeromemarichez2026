// EditorialSection.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  SECTION_CHAPITRE,
  SECTION_CHARNIERE,
  SECTION_FIL,
  SECTION_PREUVES,
} from '../../../.storybook/jeux-de-donnees'
import { EditorialSection } from '.'

const meta = {
  title: 'Editorial/EditorialSection',
  component: EditorialSection,
  args: { section: SECTION_CHAPITRE },
} satisfies Meta<typeof EditorialSection>

export default meta
type Story = StoryObj<typeof meta>

/** Un chapitre de page de pôle : entête, chapô, puis les points d'expertise. */
export const Chapitre: Story = {}

/**
 * Le même chapitre posé sur du verre réfractant.
 *
 * Le verre est plafonné sur le site — une section sur l'accueil, trois sur une page de
 * pôle — donc la plupart des sections ne le portent jamais. C'est ici, et nulle part
 * ailleurs, qu'on peut comparer les deux rendus du même contenu.
 */
export const SurVerre: Story = { args: { glass: true } }

/**
 * Une charnière : le composant délègue entièrement à `HingeSection`.
 *
 * L'aiguillage se fait sur `kind`, pas sur une prop d'appel. Le vérifier ici évite
 * qu'une charnière se retrouve un jour rendue comme un chapitre ordinaire.
 */
export const Charniere: Story = { args: { section: SECTION_CHARNIERE } }

/** Un fil transverse : délégué à `ThreadSection`, et jamais vitré. */
export const Fil: Story = { args: { section: SECTION_FIL } }

/** La section de preuves de l'accueil, celle qui répond aux objections par des chiffres. */
export const Preuves: Story = { args: { section: SECTION_PREUVES } }
