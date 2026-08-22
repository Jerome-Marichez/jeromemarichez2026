// ia.ts — jeromemarichez-fr
// Le pôle IA — l'une des deux suites de la donnée. Métadonnées et chapitres.
//
// Le titre et la description disent la thèse du pôle dès la SERP : la solution répond au
// problème posé au départ, et ce n'est pas toujours un modèle. Un visiteur qui ouvre
// cette page en croyant acheter de l'IA à tout prix doit être détrompé avant le clic.
//
// Règles de véracité (CLAUDE.md) : RAG **maison**, aucun framework tiers ; Llama 3
// nommable, corpus et chiffres du projet hors ligne.

import type { IEditorialPage } from '@/interfaces/IEditorialPage'
import { SECTIONS_IA } from './ia-sections'

export const PAGE_IA: IEditorialPage = {
  route: '/services/ia',
  meta: {
    title: 'IA : règle métier, modèle ou LLM — Lille',
    description:
      'La solution répond au problème posé, pas à l’état de l’art : règle métier ' +
      'intégrée à l’existant, modèle supervisé, ou LLM arbitré sur le coût et la ' +
      'confidentialité.',
  },
  sections: SECTIONS_IA,
}
