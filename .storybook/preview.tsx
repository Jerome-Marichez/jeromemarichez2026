// .storybook/preview.tsx — jeromemarichez-fr
//
// L'enveloppe commune à toutes les stories. Elle a un seul travail, mais il commande
// tout le reste : rendre un composant dans les mêmes conditions que le site.
//
// Les composants du dépôt ne portent aucune couleur en dur, par règle (docs/design.md) :
// ils consomment des jetons (`--fond`, `--encre`, `--accent`) déclarés dans les quatre
// feuilles globales. Une story qui ne les charge pas n'affiche pas un composant sobre,
// elle affiche un composant faux.

import type { Decorator, Preview } from '@storybook/nextjs-vite'
import { useEffect } from 'react'
import { GlassRefraction } from '../src/components/GlassRefraction'
import { FONT_VARIABLES } from '../src/typography/fonts'
import { appliquerTheme, type Theme } from './theme-media'

// L'ordre est celui de `src/app/layout.tsx`, et il n'est pas indifférent : `poles.css`,
// `verre.css` et `lavis.css` s'appuient sur les jetons de `globals.css`, et `lavis.css`
// dérive les siens de `--accent`, que `poles.css` mappe sur le pôle courant.
import '../src/app/globals.css'
import '../src/app/poles.css'
import '../src/app/verre.css'
import '../src/app/lavis.css'

/** Les valeurs du contrôle de pôle. `aucun` est le cuivre du socle, hors `data-pole`. */
const POLES = ['aucun', 'ingenierie-web', 'data', 'ia', 'sea-ux'] as const

/**
 * Pose les jetons, les fontes et la teinte de pôle autour de chaque story.
 *
 * `data-pole` est posé sur l'enveloppe, exactement comme une section de pôle le fait sur
 * le site : `poles.css` fait tout le reste, et aucun composant n'a besoin de savoir de
 * quelle couleur il est. C'est la même mécanique qu'en production, pas une imitation.
 */
const enveloppe: Decorator = (Story, contexte) => {
  const theme = contexte.globals.theme as Theme
  const pole = contexte.globals.pole as (typeof POLES)[number]

  // Après la peinture : les feuilles injectées par Vite doivent être dans le document
  // avant qu'on en réécrive les règles média. Le `color-scheme` va sur la racine et non
  // sur l'enveloppe, parce que c'est lui qui commande le fond du canevas et l'apparence
  // native des contrôles de formulaire.
  useEffect(() => {
    document.documentElement.style.colorScheme = appliquerTheme(theme)
  }, [theme])

  return (
    // `position: relative` et **aucun fond** : c'est exactement ce que `globals.css` fait
    // au `<body>`. Le fond de la page vient de la feuille du site et se propage au
    // canevas ; peindre un fond ici passerait par-dessus `.fond-atelier`, dont le
    // `z-index: -1` le place derrière le contenu mais devant le canevas. Le verre
    // n'aurait alors plus aucune trame à laisser voir.
    <div
      className={FONT_VARIABLES}
      data-pole={pole === 'aucun' ? undefined : pole}
      style={{ minHeight: '100vh', padding: '2rem', position: 'relative' }}
    >
      {/* Le fond d'atelier et le filtre de réfraction sont déclarés une fois par page sur
          le site. Sans eux, les panneaux de verre perdent la trame qu'ils sont censés
          laisser voir, et l'effet ne se juge plus. */}
      <div aria-hidden="true" className="fond-atelier" />
      <GlassRefraction />
      <Story />
    </div>
  )
}

const preview: Preview = {
  decorators: [enveloppe],

  globalTypes: {
    theme: {
      description: 'Thème clair ou sombre. « auto » suit le système, comme le site.',
      toolbar: {
        title: 'Thème',
        icon: 'contrast',
        items: [
          { value: 'auto', title: 'Auto (système)' },
          { value: 'clair', title: 'Clair' },
          { value: 'sombre', title: 'Sombre' },
        ],
        dynamicTitle: true,
      },
    },
    pole: {
      description: 'Teinte de pôle appliquée par `data-pole`, comme sur le site.',
      toolbar: {
        title: 'Pôle',
        icon: 'paintbrush',
        items: POLES.map((valeur) => ({ value: valeur, title: valeur })),
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: { theme: 'auto', pole: 'aucun' },

  parameters: {
    // Le fond vient des jetons du site, pas d'une palette de Storybook : deux sources de
    // couleur donneraient deux vérités, et celle qui compte est celle du site.
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: 'fullscreen',
  },
}

export default preview
