import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { EnTete } from './index'

/**
 * `EnTete` lit la route active via `usePathname`. `@storybook/nextjs-vite`
 * mocke `next/navigation` et lit `parameters.nextjs.navigation.pathname` pour
 * répondre à ce hook (le champ vient de `NextRouter`, la même forme que
 * `router`) : chaque story fixe donc le chemin qui doit apparaître actif dans
 * la barre d'onglets, exactement comme une vraie route le ferait.
 */
const meta = {
  title: 'Composants/EnTete',
  component: EnTete,
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
} satisfies Meta<typeof EnTete>

export default meta

type Story = StoryObj<typeof meta>

/** L'onglet « accueil.tsx » actif, route par défaut. */
export const Defaut: Story = {}

/** Un onglet interne actif, pour vérifier le filet et le fond relevé. */
export const OngletParcoursActif: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/parcours/',
      },
    },
  },
}
