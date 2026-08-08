// index.ts — jeromemarichez2026
// Les trois offres de service, dans leur ordre de présentation sur le site.
// Chaque offre est déjà validée par son module : importer d'ici ou du module direct
// donne toujours une donnée conforme au schéma.
import type { IGrilleTarifaire } from '../../interfaces/grille-tarifaire'
import type { IOffre } from '../../interfaces/offre'
import { offreDataIa } from './data-ia'
import { offreIngenierieWeb } from './ingenierie-web'
import { offreSea } from './sea'
import { grilleTarifaireSea } from './sea-tarifs'

export { grilleTarifaireSea, offreDataIa, offreIngenierieWeb, offreSea }

/**
 * Ordre éditorial : la chaîne, dans l'ordre où elle se déroule. Je cadre et je
 * développe (Ingénierie Web), je câble la donnée, puis cette donnée alimente les
 * projets data et IA (Data & IA) et pilote l'acquisition (SEA).
 */
export const offres: readonly IOffre[] = [offreIngenierieWeb, offreDataIa, offreSea]

/**
 * Grilles tarifaires publiées, par offre. Une seule à ce jour : SEA.
 *
 * Ingénierie Web n'a pas encore d'arbitrage rendu, et Data & IA est **entièrement sur
 * devis** — un projet data se chiffre au périmètre. Leur absence ici est donc une
 * information, pas un oubli : c'est aussi ce qui interdit d'y faire apparaître un montant
 * par inadvertance.
 */
export const grillesTarifaires: readonly IGrilleTarifaire[] = [grilleTarifaireSea]
