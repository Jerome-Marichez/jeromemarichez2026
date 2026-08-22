// sea-ux.ts — jeromemarichez-fr
// Le pôle SEA & UX — l'une des deux suites de la donnée. Métadonnées ; les sections
// vivent dans le fichier voisin.

import type { IEditorialPage } from '@/interfaces/IEditorialPage'
import { SECTIONS_SEA_UX } from './sea-ux-sections'

export const PAGE_SEA_UX: IEditorialPage = {
  route: '/services/sea-ux',
  meta: {
    title: 'SEA & arbitrages UX sur la donnée — Lille',
    description:
      'Mesure construite dans le code (GTM web et server-side), consentement conforme, ' +
      'rentabilité à long terme, arbitrages de parcours décidés puis implémentés.',
  },
  sections: SECTIONS_SEA_UX,
}
