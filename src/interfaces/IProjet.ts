import type { IdMarque } from './types'

/**
 * Un projet détaillé au format Contexte / Enjeu / Mon rôle / Résultat, repris tel
 * quel du CV le plus complet (Ingénieur Fullstack & Chef de Projet).
 *
 * `marque` est optionnelle et ne s'invente pas : elle ne pointe que vers une entrée
 * du catalogue `src/contenu/marques.ts` dont le logo et l'URL ont été vérifiés
 * (CLAUDE.md, table des interdits).
 */
export interface IProjet {
  titre: string
  entreprise: string
  marque?: IdMarque
  sousTitre: string
  contexte: string
  enjeu: string
  monRole: string
  resultat: string
}
