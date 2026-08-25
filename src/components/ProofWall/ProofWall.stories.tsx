// ProofWall.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PREUVES } from '@/contenu/preuves'
import { ProofWall } from '.'

const meta = {
  title: 'Editorial/ProofWall',
  component: ProofWall,
  args: { preuves: PREUVES },
} satisfies Meta<typeof ProofWall>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Le mur de preuves au complet, tel qu'il paraît sur l'accueil.
 *
 * Les chiffres viennent de `src/contenu/preuves.ts` : aucun n'est écrit ici, et c'est la
 * règle. Un nombre recopié dans une story finirait par contredire la page.
 */
export const Defaut: Story = {}

/**
 * Une seule tuile, celle qui renvoie vers sa fiche.
 *
 * Toutes les preuves n'ont pas de fiche à déplier : le renvoi est optionnel, et la tuile
 * doit tenir sa hauteur avec comme sans.
 */
export const AvecRenvoi: Story = {
  args: { preuves: PREUVES.filter((preuve) => preuve.fiche !== undefined).slice(0, 1) },
}

/** Une tuile sans fiche : le cas le plus fréquent. */
export const SansRenvoi: Story = {
  args: { preuves: PREUVES.filter((preuve) => preuve.fiche === undefined).slice(0, 1) },
}
