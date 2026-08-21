// data-ia.ts — jeromemarichez-fr
// Pôle 2 — Data & IA. Métadonnées, et recollement des chapitres.
//
// Le pôle part du métier et finit sur la technique : le titre et la description le
// disent dès la SERP, sinon la page est ouverte avec la mauvaise attente.
//
// Les chapitres vivent dans deux fichiers voisins, `data-sections.ts` et
// `ia-sections.ts`. La séparation est celle du CONTENU — la donnée d'un côté, les
// modèles de l'autre — et non celle des pôles : `PoleId` compte toujours `data-ia` comme
// un seul pôle. L'ordre de concaténation est l'ordre de lecture de la page, et il est le
// même qu'avant la scission.

import type { IEditorialPage } from '@/interfaces/IEditorialPage'
import { SECTIONS_DATA } from './data-sections'
import { SECTIONS_IA } from './ia-sections'

export const PAGE_DATA_IA: IEditorialPage = {
  route: '/services/data-ia',
  meta: {
    title: 'Data & IA : le métier d’abord — Lille',
    description:
      'Insights métier, profils clients et règles existantes formalisés, stratégie data, ' +
      'gouvernance et RGPD — puis la solution : règle métier, modèle ou LLM.',
  },
  sections: [...SECTIONS_DATA, ...SECTIONS_IA],
}
