// ExpertiseBlock.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { exiger, SECTION_DATA } from '../../../.storybook/jeux-de-donnees'
import { ExpertiseBlock } from '.'

const BLOC = exiger(SECTION_DATA.blocs, 'bloc du chapitre data')

const meta = {
  title: 'Editorial/ExpertiseBlock',
  component: ExpertiseBlock,
  args: { bloc: BLOC },
  argTypes: { headingLevel: { control: 'inline-radio', options: ['h3', 'h4'] } },
} satisfies Meta<typeof ExpertiseBlock>

export default meta
type Story = StoryObj<typeof meta>

/** Le bloc tel qu'il paraît dans un chapitre, avec ce que le contenu réel lui donne. */
export const Defaut: Story = {}

/**
 * Le bloc complet : texte, preuve chiffrée, et la décision que le client peut trancher.
 *
 * C'est la forme visée par la ligne éditoriale — chaque affirmation porte sa preuve, et
 * chaque bloc se termine sur une décision — mais tous les contenus ne l'atteignent pas.
 * La story fixe la référence.
 */
export const Complet: Story = {
  args: {
    bloc: {
      titre: 'Mesure de l’acquisition',
      texte:
        'Le plan de marquage est écrit avant la première balise, et chaque événement ' +
        'porte le nom de la décision qu’il sert.',
      preuve: 'Budgets de 100 000 € pilotés sur cette base, sans reprise de marquage.',
      decision: 'Quel canal vous coûte plus qu’il ne rapporte, et à partir de quel volume.',
    },
  },
}

/** Un bloc réduit à son titre : rien ne doit rester en suspens sous l'intitulé. */
export const TitreSeul: Story = { args: { bloc: { titre: 'Cadrage' } } }

/** Le niveau de titre abaissé, quand le bloc vit sous un `h3` déjà existant. */
export const NiveauAbaisse: Story = { args: { headingLevel: 'h4' } }
