// Breadcrumb.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Breadcrumb } from '.'

const meta = {
  title: 'Socle/Breadcrumb',
  component: Breadcrumb,
  args: { fil: [{ nom: 'Data', route: '/services/data/' }] },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/** Un seul niveau sous l'accueil : le cas des pages de pôle. */
export const UnNiveau: Story = {}

/**
 * Deux niveaux : une fiche à l'intérieur d'un espace éditorial.
 *
 * Le dernier niveau n'est jamais un lien et porte `aria-current="page"`. C'est ce qui
 * distingue « où je suis » de « où je peux aller », et cela ne se voit qu'ici.
 */
export const DeuxNiveaux: Story = {
  args: {
    fil: [
      { nom: 'Réalisations', route: '/realisations/' },
      { nom: 'SMS en masse, la plateforme', route: '/realisations/sms-en-masse-plateforme/' },
    ],
  },
}

/**
 * Un libellé long, dans un fil déjà à deux niveaux.
 *
 * Le cas limite du composant : la ligne doit se replier sans casser les séparateurs ni
 * pousser la page en défilement horizontal.
 */
export const LibelleLong: Story = {
  args: {
    fil: [
      { nom: 'Blog', route: '/blog/' },
      {
        nom: 'De la documentation qui pilote une IA à une carte de l’architecture',
        route: '/blog/de-la-doc-qui-pilote-une-ia-a-une-carte-de-l-architecture/',
      },
    ],
  },
}
