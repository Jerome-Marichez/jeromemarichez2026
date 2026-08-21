// data-ia.ts — jeromemarichez-fr
// Pôle 2 — Data & IA. Métadonnées ; les sections vivent dans le fichier voisin.

import type { IEditorialPage } from '@/interfaces/IEditorialPage'
import { SECTIONS_DATA_IA } from './data-ia-sections'

export const PAGE_DATA_IA: IEditorialPage = {
  route: '/services/data-ia',
  meta: {
    title: 'Data & IA en production — Lille',
    description:
      'Qualité de la donnée, règles métier, machine learning, LLM, RAG maison et serveurs ' +
      'MCP en production — coût d’inférence, latence et RGPD tenus.',
  },
  sections: SECTIONS_DATA_IA,
}
