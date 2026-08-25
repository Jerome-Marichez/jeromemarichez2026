// EmploymentFrame.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { groupRealisationsByCadre } from '@/services/find-realisation'
import { exiger } from '../../../.storybook/jeux-de-donnees'
import { EmploymentFrame } from '.'

const GROUPES = groupRealisationsByCadre()

const meta = {
  title: 'Realisations/EmploymentFrame',
  component: EmploymentFrame,
  args: { cadre: exiger(GROUPES, 'groupe de réalisations').cadre },
  argTypes: { niveau: { control: 'inline-radio', options: ['h2', 'p'] } },
} satisfies Meta<typeof EmploymentFrame>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Le cadre tel qu'il paraît sur une fiche : l'organisation en paragraphe.
 *
 * Le titre de niveau 2 appartient déjà aux sections du récit ; en donner un au cadre
 * ferait entrer un intitulé de poste dans le plan du document.
 */
export const SurUneFiche: Story = {}

/**
 * Le même cadre en tête de groupe, sur la liste : l'organisation devient un `h2`.
 *
 * C'est la seule différence entre les deux usages, et elle est invisible à l'écran. Le
 * `titreId` sert alors de nom accessible à la section qui englobe le groupe.
 */
export const EnTeteDeGroupe: Story = {
  args: { niveau: 'h2', titreId: 'cadre-titre' },
}

/**
 * Tous les cadres du parcours, les uns sous les autres.
 *
 * Les statuts et les intitulés de poste sont repris à l'identique des CV de référence,
 * jamais réécrits pour coller à une offre de service. Cette vue est le seul endroit où
 * on peut les relire tous d'un coup.
 */
export const TousLesCadres: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {GROUPES.map((groupe) => (
        <EmploymentFrame cadre={groupe.cadre} key={groupe.cadre.organisation} />
      ))}
    </div>
  ),
}
