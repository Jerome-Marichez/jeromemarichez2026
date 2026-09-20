import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { acetelecom } from '@/contenu/experiences/acetelecom'
import { truffle } from '@/contenu/experiences/truffle'
import type { IExperience } from '@/interfaces/IExperience'
import { ExperienceBloc } from './index'

const meta = {
  title: 'Composants/ExperienceBloc',
  component: ExperienceBloc,
} satisfies Meta<typeof ExperienceBloc>

export default meta

type Story = StoryObj<typeof meta>

/** L'expérience Acetelecom réelle, avec son bloc d'encadrement. */
export const AvecEncadrement: Story = {
  args: {
    experience: acetelecom,
  },
}

/** La mission Truffle Capital réelle, avec la mention « en indépendant ». */
export const StatutIndependant: Story = {
  args: {
    experience: truffle,
  },
}

/**
 * Cas limite : `encadrement` vaut `null`. Les trois expériences réelles en
 * portent toutes un (voir `IExperience`, où le champ est nullable pour ce cas
 * précis) : cette variante reprend l'expérience Acetelecom réelle et retire son
 * bloc d'encadrement, pour vérifier que la section correspondante disparaît
 * proprement sans laisser de titre orphelin.
 */
const sansEncadrement: IExperience = {
  ...acetelecom,
  encadrement: null,
}

export const SansEncadrement: Story = {
  args: {
    experience: sansEncadrement,
  },
}
