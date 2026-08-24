// sea-ux.ts — jeromemarichez-fr
// Le pôle SEA & UX — l'une des deux suites de la donnée. Métadonnées ; les sections
// vivent dans le fichier voisin.
//
// La description suit ce que la page dit vraiment depuis l'issue #128 : le pilotage
// nomme désormais ce SUR QUOI il arbitre, les segments et la valeur client dans la durée.
// « GTM web et server-side » lui a cédé la place : c'est un outil, et la règle du projet
// est de vendre une décision. Plafond tenu : 155 caractères (docs/data-model.md).

import type { IEditorialPage } from '@/interfaces/IEditorialPage'
import { SECTIONS_SEA_UX } from './sea-ux-sections'

export const PAGE_SEA_UX: IEditorialPage = {
  route: '/services/sea-ux',
  meta: {
    title: 'SEA & arbitrages UX sur la donnée — Lille',
    description:
      'Mesure construite dans le code, consentement conforme, campagnes arbitrées sur vos ' +
      'segments et sur la valeur client à long terme, parcours implémentés.',
  },
  sections: SECTIONS_SEA_UX,
}
