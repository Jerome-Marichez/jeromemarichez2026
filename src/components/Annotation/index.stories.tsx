import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { accroches } from '@/contenu/accroches'
import { Annotation } from './index'

const meta = {
  title: 'Composants/Annotation',
  component: Annotation,
} satisfies Meta<typeof Annotation>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Le texte réel de l'accueil, repris de `accroches.heroAnnotation` : une phrase
 * courte, l'usage attendu de l'annotation manuscrite.
 */
export const Defaut: Story = {
  args: {
    children: accroches.heroAnnotation,
  },
}

/**
 * Cas limite : un texte long. L'annotation reste rare par construction (une par
 * page au plus), mais rien n'empêche qu'elle porte une phrase plus longue que
 * l'accroche de l'accueil. Le paragraphe de profil sert ici de texte long
 * plausible, sans en changer un mot.
 */
export const TexteLong: Story = {
  args: {
    children:
      "Ingénieur logiciel et chef de projet, dix ans d'expérience, toujours en petite équipe ou en " +
      "autonomie complète. Lead tech sur le produit que j'ai conçu, ingénieur fullstack sur ceux que " +
      "je n'ai pas créés, chef de projet quand il faut aller chercher la décision plutôt que l'attendre.",
  },
}
