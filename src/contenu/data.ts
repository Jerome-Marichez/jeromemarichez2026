// data.ts — jeromemarichez-fr
// Le pôle Data — le passage obligé. Métadonnées et chapitres.
//
// Le pôle part du métier et finit sur le test de déterminisme : le titre et la description
// le disent dès la SERP, sinon la page est ouverte avec la mauvaise attente.
//
// L'ordre des chapitres est celui de Jérôme MARICHEZ (issue #126) : métier, gouvernance,
// stratégie data, puis problématique et exploration. La description suit ce même ordre,
// c'est lui qui se lit en SERP.
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
      'Métier, gouvernance et RGPD, stratégie data, exploration : le test qui dit si votre ' +
      'problème demande un modèle. Rien n’oblige à prendre l’IA.',
  },
  sections: SECTIONS_DATA,
}
