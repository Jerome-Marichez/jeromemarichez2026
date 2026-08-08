// routes.ts — jeromemarichez2026
// Forme des URL internes construites à partir du contenu éditorial.
// Un seul module connaît le gabarit d'une route d'offre : la navigation et les cartes
// de la page d'accueil le demandent au lieu de le réécrire chacune de leur côté.
import type { CleOffre } from '@/interfaces/types'

/**
 * Page d'une offre de service.
 *
 * Le segment d'URL est la clé de l'offre elle-même — `CleOffre` est justement décrite
 * comme « clé stable, identifiant et segment d'URL » (`src/interfaces/types.ts`). Le
 * libellé, lui, n'entre jamais dans une URL : il est éditorial et peut être réécrit,
 * la clé non.
 */
export function cheminOffre(cle: CleOffre): string {
  return `/services/${cle}`
}
