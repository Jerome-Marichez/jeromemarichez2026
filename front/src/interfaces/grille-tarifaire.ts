// grille-tarifaire.ts — jeromemarichez2026
// Entité éditoriale : la grille tarifaire publiée pour une offre.
import type { IReferencePreuve } from './reference-preuve'
import type { ITarif } from './tarif'
import type { CleOffre } from './types'

/**
 * La grille tarifaire d'une offre : ses lignes, et l'argument qui les rend cohérentes.
 *
 * Toutes les offres n'en ont pas — Data & IA est entièrement sur devis, un projet data
 * se chiffrant au périmètre. Une grille est donc une entité à part, rattachée à son
 * offre par `offre`, et non un champ obligatoire d'`IOffre` : rendre le champ
 * obligatoire aurait forcé à inventer des montants là où il n'y en a pas.
 *
 * `argument` porte la raison d'être de la grille — pourquoi la mise en place est incluse
 * quand j'ai conçu le site. Il se dit à la **première personne, depuis l'expérience
 * vécue** : « en encadrant des prestataires, j'ai vu que… », jamais comme un jugement
 * sur une profession. Aucun nom d'agence, aucune généralisation : le dénigrement de
 * concurrents est juridiquement risqué, et un prospect déjà accompagné se sentirait pris
 * à partie.
 *
 * `preuve` est une **référence** vers une preuve déjà écrite dans une offre, jamais son
 * texte : les chiffres du parcours qui appuient l'argument (budgets pilotés, prestataires
 * encadrés) restent écrits à un seul endroit, relus une seule fois, et ne peuvent pas
 * diverger d'une page à l'autre.
 */
export interface IGrilleTarifaire {
  /** L'offre dont cette grille publie les prix. */
  readonly offre: CleOffre
  /** Les lignes, dans leur ordre de lecture : le cas inclus d'abord. */
  readonly lignes: readonly ITarif[]
  /** L'argument commercial, à la première personne du singulier. */
  readonly argument: string
  /** La preuve chiffrée qui appuie l'argument, désignée et non recopiée. */
  readonly preuve: IReferencePreuve
}
