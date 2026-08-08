// index.ts — jeromemarichez2026
// Les trois offres de service, dans leur ordre de présentation sur le site.
// Chaque offre est déjà validée par son module : importer d'ici ou du module direct
// donne toujours une donnée conforme au schéma.
import type { IOffre } from '../../interfaces/offre'
import { offreDataIa } from './data-ia'
import { offreIngenierieWeb } from './ingenierie-web'
import { offreSea } from './sea'

export { offreDataIa, offreIngenierieWeb, offreSea }

/**
 * Ordre éditorial : la chaîne, dans l'ordre où elle se déroule. Je cadre et je
 * développe (Ingénierie Web), je câble la donnée, puis cette donnée alimente les
 * projets data et IA (Data & IA) et pilote l'acquisition (SEA).
 */
export const offres: readonly IOffre[] = [offreIngenierieWeb, offreDataIa, offreSea]
