// ingenierie-web.ts (jeromemarichez-fr)
// Le pôle Ingénierie web, le socle. Métadonnées ; les sections vivent dans le voisin
// (limite de 300 lignes par fichier, docs/tooling.md).

import type { IEditorialPage } from '@/interfaces/IEditorialPage'
import { SECTIONS_INGENIERIE_WEB } from './ingenierie-web-sections'

export const PAGE_INGENIERIE_WEB: IEditorialPage = {
  route: '/services/ingenierie-web',
  meta: {
    title: 'Ingénierie web : site, SaaS et mobile | Lille',
    description:
      'Site, SaaS et mobile conçus, développés et exploités par une seule personne. ' +
      'Qualité certifiée ISTQB Foundation, TDD, migrations sans coupure.',
  },
  sections: SECTIONS_INGENIERIE_WEB,
}
