// routes.ts — jeromemarichez-fr
// Les routes du site, énumérées une seule fois.
//
// Navigation, sitemap, fils d'Ariane et données structurées lisent toutes cette
// liste : une page ajoutée ici apparaît partout, une page oubliée nulle part.

import type { PoleId } from '@/interfaces/types'

export const ROUTES = {
  accueil: '/',
  'ingenierie-web': '/services/ingenierie-web',
  'data-ia': '/services/data-ia',
  'sea-ux': '/services/sea-ux',
} as const satisfies Record<'accueil' | PoleId, string>

/** Ordre de la chaîne : construire, exploiter et mesurer, arbitrer. */
export const POLE_ORDER = [
  'ingenierie-web',
  'data-ia',
  'sea-ux',
] as const satisfies readonly PoleId[]

/** Toutes les routes indexables, dans l'ordre de priorité. */
export const INDEXABLE_ROUTES = [
  ROUTES.accueil,
  ROUTES['ingenierie-web'],
  ROUTES['data-ia'],
  ROUTES['sea-ux'],
] as const
