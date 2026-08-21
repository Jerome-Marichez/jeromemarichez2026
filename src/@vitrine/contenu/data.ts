// data.ts — jeromemarichez-fr
// Le pôle Data — le passage obligé. Métadonnées et chapitres.
//
// Le pôle part du métier et finit sur la gouvernance : le titre et la description le
// disent dès la SERP, sinon la page est ouverte avec la mauvaise attente.
//
// Cette page ne porte plus que `data-sections.ts`. Les chapitres de modèles ont rejoint
// `ia.ts`, qui est désormais un pôle à part entière : la donnée se livre pour elle-même,
// et l'IA est l'une de ses deux suites — pas sa conclusion.

import type { IEditorialPage } from '@/interfaces/IEditorialPage'
import { SECTIONS_DATA } from './data-sections'

export const PAGE_DATA: IEditorialPage = {
  route: '/services/data',
  meta: {
    title: 'Data : le métier d’abord — Lille',
    description:
      'Insights métier, profils clients et règles existantes formalisés, stratégie data, ' +
      'gouvernance et RGPD. La donnée se livre pour elle-même.',
  },
  sections: SECTIONS_DATA,
}
