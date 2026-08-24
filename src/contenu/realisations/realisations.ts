// realisations.ts — jeromemarichez-fr
// La liste des réalisations publiées. Source unique de l'espace `/realisations/`.
//
// Tout part d'ici : la liste, les fiches générées au build, le sitemap et les données
// structurées. Une fiche retirée de ce tableau disparaît partout — il n'y a pas de second
// endroit à mettre à jour.
//
// L'ORDRE DE CE TABLEAU EST L'ORDRE D'AFFICHAGE, à l'intérieur de chaque cadre d'emploi.
// Le regroupement, lui, est une règle métier : il vit dans
// `src/services/find-realisation` et suit l'ordre de `CADRES`.
//
// Une convention tenue à la main : chaque cadre s'ouvre sur sa fiche chiffrée quand il en
// a une, puis déroule du produit vers la donnée. Le type ne peut pas l'imposer — trois
// fiches chiffrées sur treize ne font pas une règle exprimable.

import type { IRealisation } from '@/interfaces/IRealisation'
import {
  REALISATION_DEPOT_VOCAL,
  REALISATION_LTV_MULTI_SOURCES,
  REALISATION_PREZAGE_LLAMA,
  REALISATION_RAG_SUPPORT,
} from './mailingvox-donnee'
import {
  REALISATION_ANTI_FRAUDE,
  REALISATION_PREZAGE_MIGRATION,
  REALISATION_SMS_EN_MASSE,
} from './mailingvox-produits'
import {
  REALISATION_ARTEDRONE_AMOA,
  REALISATION_BUDGET_ADS,
  REALISATION_TRUFFLE_SITES,
} from './truffle'
import {
  REALISATION_PARCOURS_ACHAT,
  REALISATION_VERHOEVEN_ERP,
  REALISATION_VERHOEVEN_MIGRATIONS,
} from './verhoeven'

export const REALISATIONS: IRealisation[] = [
  // Acetelecom / MailingVox, 2023-2026
  REALISATION_SMS_EN_MASSE,
  REALISATION_PREZAGE_MIGRATION,
  REALISATION_ANTI_FRAUDE,
  REALISATION_DEPOT_VOCAL,
  REALISATION_PREZAGE_LLAMA,
  REALISATION_RAG_SUPPORT,
  REALISATION_LTV_MULTI_SOURCES,
  // Verhoeven Joaillier, 2019-2022
  REALISATION_PARCOURS_ACHAT,
  REALISATION_VERHOEVEN_MIGRATIONS,
  REALISATION_VERHOEVEN_ERP,
  // Truffle Capital, 2017-2019
  REALISATION_BUDGET_ADS,
  REALISATION_TRUFFLE_SITES,
  REALISATION_ARTEDRONE_AMOA,
]
