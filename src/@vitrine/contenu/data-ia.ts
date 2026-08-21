// data-ia.ts — jeromemarichez-fr
// Pôle 2 — Data & IA. Métadonnées ; les sections vivent dans le fichier voisin.
//
// Le pôle part du métier et finit sur la technique : le titre et la description le
// disent dès la SERP, sinon la page est ouverte avec la mauvaise attente.

import type { IEditorialPage } from '@/interfaces/IEditorialPage'
import { SECTIONS_DATA_IA } from './data-ia-sections'

export const PAGE_DATA_IA: IEditorialPage = {
  route: '/services/data-ia',
  meta: {
    title: 'Data & IA : le métier d’abord — Lille',
    description:
      'Insights métier, profils clients et règles existantes formalisés, stratégie data, ' +
      'gouvernance et RGPD — puis la solution : règle métier, modèle ou LLM.',
  },
  sections: SECTIONS_DATA_IA,
}
