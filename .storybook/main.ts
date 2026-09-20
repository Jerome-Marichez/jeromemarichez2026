// .storybook/main.ts — jeromemarichez-fr
//
// Catalogue des composants. Le framework est `@storybook/nextjs-vite` : c'est celui qui
// sait résoudre `next/font`, `next/image` et `next/link` hors d'un serveur Next, ce dont
// la moitié des composants du site a besoin. Vite n'est présent que pour lui, et
// uniquement en `devDependencies` : rien de tout ceci n'entre dans `next build`, qui
// reste seul responsable de ce qui part au navigateur.

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/nextjs-vite'

const racine = join(dirname(fileURLToPath(import.meta.url)), '..')

const config: StorybookConfig = {
  // Les stories sont colocalisées avec leur composant (docs/storybook.md), jamais
  // regroupées dans un dossier à part : une story qui vit loin de son composant cesse
  // d'être mise à jour avec lui.
  stories: ['../src/**/*.stories.@(ts|tsx)'],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },

  // `output: 'export'` du site n'a pas d'équivalent ici, et n'en a pas besoin : le
  // catalogue est un outil de développement, pas une page publiée.
  staticDirs: ['../public'],

  // Le site mesure son audience avec consentement (docs/rgpd.md). L'outil qui sert à le
  // construire n'a aucune raison d'être moins regardant que lui.
  core: { disableTelemetry: true },

  viteFinal: async (viteConfig) => {
    // `@/` est l'alias du dépôt (tsconfig.json). Vite ne lit pas `paths`, il faut le
    // lui redire, sinon aucun composant ne résout ses imports.
    viteConfig.resolve = viteConfig.resolve ?? {}
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@': join(racine, 'src'),
    }
    return viteConfig
  },
}

export default config
