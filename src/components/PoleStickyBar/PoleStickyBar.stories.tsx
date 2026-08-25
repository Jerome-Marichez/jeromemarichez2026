// PoleStickyBar.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { findPole } from '@/services/find-pole'
import { PoleStickyBar } from '.'

const meta = {
  title: 'Poles/PoleStickyBar',
  component: PoleStickyBar,
  args: { pole: findPole('data').pole },
} satisfies Meta<typeof PoleStickyBar>

export default meta
type Story = StoryObj<typeof meta>

/** La barre du pôle data, teinte comprise. */
export const Data: Story = { globals: { pole: 'data' } }

/**
 * Les deux suites côte à côte, chacune sous sa teinte.
 *
 * Elles affichent le **même** temps, et c'est voulu : le site ne compte pas ses pôles,
 * il dit à quel moment de la chaîne ils interviennent. Deux barres portant « 3 » est le
 * seul endroit où l'on peut vérifier que ce parti pris tient visuellement.
 */
export const LesDeuxSuites: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div data-pole="ia">
        <PoleStickyBar pole={findPole('ia').pole} />
      </div>
      <div data-pole="sea-ux">
        <PoleStickyBar pole={findPole('sea-ux').pole} />
      </div>
    </div>
  ),
}
