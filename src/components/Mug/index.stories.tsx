import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Mug } from './index'

/**
 * La tasse de café, signature du site.
 *
 * **Ce que ce catalogue ne peut pas montrer, et il faut le savoir en le lisant :**
 * l'interaction principale de la tasse est son **orientation vers le curseur**,
 * et elle se déclenche sur les mouvements de souris de la page entière. Dans un
 * panneau de story, elle répond donc aussi, mais autour d'un centre qui n'est pas
 * celui qu'elle a sur le site. Pour juger l'effet, il faut ouvrir l'accueil.
 *
 * Ce que le catalogue montre utilement : les deux traitements d'accessibilité,
 * décoratif contre porteur de sens, qu'on ne peut pas comparer côte à côte sur
 * le site puisque seul le premier y est utilisé.
 *
 * Le café tourne en boucle `linear`. Il n'y a **aucun effet au survol** : depuis
 * l'issue #168, l'orientation vers le curseur est la seule interaction. Le
 * mouvement respecte `prefers-reduced-motion` et le contrôle « Mouvement » de la
 * barre d'outils, ici comme sur le site.
 */
const meta = {
  title: 'Composants/Mug',
  component: Mug,
} satisfies Meta<typeof Mug>

export default meta

type Story = StoryObj<typeof meta>

/** Décoratif : `description` absente, donc `aria-hidden` et tu par la synthèse vocale. */
export const Decoratif: Story = {}

/** Porteur de sens : une `description` le rend en `role="img"` avec son `aria-label`. */
export const AvecDescription: Story = {
  args: {
    description: 'Mug de café fumant, illustration du poste de travail',
  },
}
