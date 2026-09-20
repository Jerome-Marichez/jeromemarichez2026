import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Bouton } from './index'

const meta = {
  title: 'Composants/Bouton',
  component: Bouton,
} satisfies Meta<typeof Bouton>

export default meta

type Story = StoryObj<typeof meta>

/** Le ton par défaut : `secondaire`, un simple filet. */
export const Secondaire: Story = {
  args: {
    href: '/parcours/',
    children: 'Voir le parcours',
    ton: 'secondaire',
  },
}

/** L'action principale, en aplat. Un seul primaire par écran. */
export const Primaire: Story = {
  args: {
    href: '/contact/',
    children: 'Me contacter',
    ton: 'primaire',
  },
}

/**
 * Un lien de téléchargement : il sort du routeur Next.js pour porter l'attribut
 * `download`, sinon le fichier s'ouvrirait dans l'onglet au lieu d'arriver dans
 * les téléchargements du visiteur.
 */
export const Telechargement: Story = {
  args: {
    href: '/cv-jerome-marichez.pdf',
    children: 'Télécharger le CV',
    ton: 'primaire',
    telechargement: 'cv-jerome-marichez.pdf',
  },
}
