// preview.tsx, jeromemarichez-fr
//
// L'enveloppe commune a toutes les stories. Elle a un seul travail : placer un
// composant dans les memes conditions que sur le site, sinon le catalogue montre
// un composant faux plutot qu'un composant sobre.
//
// Trois conditions, et elles suffisent :
//   1. les jetons, car aucun composant du site ne porte de couleur en dur ;
//   2. les deux polices, car la mise en page entiere s'aligne sur la cellule de
//      caractere de Fira Code : sans elle, toutes les largeurs en `ch` sont fausses ;
//   3. le fond sombre, pose par `globals.css` sur le `<body>`.

import type { Decorator, Preview } from '@storybook/nextjs-vite'
import { policeCode, policeMain } from '../src/app/polices'

// `globals.css` importe lui-meme `jetons.css` : une seule feuille a charger, et
// l'ordre ne peut donc pas se desynchroniser de celui du site.
import '../src/app/globals.css'

/**
 * L'enveloppe ne peint **aucun fond**. Celui de la page vient de `globals.css`,
 * pose sur le `<body>`, d'ou il se propage au canevas de Storybook. Le repeindre
 * ici masquerait une regression du fond reel sans que personne le voie.
 */
const enveloppe: Decorator = (Story, contexte) => {
  const mouvement = contexte.globals.mouvement as 'anime' | 'pause'

  // Le site pose `data-mouvement` sur la racine, pas sur un conteneur : le
  // catalogue fait donc pareil, sinon les regles globales de mise en pause ne
  // s'appliqueraient pas.
  if (typeof document !== 'undefined') {
    if (mouvement === 'pause') {
      document.documentElement.dataset.mouvement = 'pause'
    } else {
      delete document.documentElement.dataset.mouvement
    }
  }

  return (
    <div className={`${policeCode.variable} ${policeMain.variable}`}>
      <Story />
    </div>
  )
}

const preview: Preview = {
  decorators: [enveloppe],

  globalTypes: {
    /**
     * Le seul controle de la barre d'outils, et il correspond a un vrai bouton du
     * site : la mise en pause exigee par WCAG 2.2.2, qui vit dans le pied de page.
     *
     * Il n'y a **pas** de controle de theme : le site n'a qu'un theme, sombre, et
     * c'est un choix assume (voir docs/design.md). Un selecteur clair ou sombre
     * dans le catalogue laisserait croire a une variante qui n'existe pas.
     */
    mouvement: {
      name: 'Mouvement',
      description: 'Anime les composants ou met toute animation en pause',
      defaultValue: 'anime',
      toolbar: {
        icon: 'play',
        items: [
          { value: 'anime', title: 'Animé' },
          { value: 'pause', title: 'En pause' },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    // Le site est sombre : le canevas du catalogue doit l'etre aussi, sinon chaque
    // story s'ouvre sur un flash blanc.
    backgrounds: { disable: true },
    layout: 'padded',
  },
}

export default preview
