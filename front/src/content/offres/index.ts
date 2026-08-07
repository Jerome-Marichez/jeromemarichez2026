// index.ts — jeromemarichez2026
// Les trois offres de service, dans leur ordre de présentation sur le site.
// Chaque offre est déjà validée par son module : importer d'ici ou du module direct
// donne toujours une donnée conforme au schéma.
import type { IOffre } from '../../interfaces/offre'
import { offreDataIa } from './data-ia'
import { offreIngenierieWeb } from './ingenierie-web'
import { offreSeoSea } from './seo-sea'

export { offreDataIa, offreIngenierieWeb, offreSeoSea }

/** Ordre éditorial : l'offre socle d'abord, puis les deux spécialisations. */
export const offres: readonly IOffre[] = [offreIngenierieWeb, offreDataIa, offreSeoSea]
