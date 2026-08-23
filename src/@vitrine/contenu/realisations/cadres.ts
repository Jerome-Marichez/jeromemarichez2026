// cadres.ts — jeromemarichez-fr
// Les trois cadres sous lesquels toutes les réalisations du site ont été menées.
//
// **Deux postes salariés et une mission en indépendant.** Acetelecom / MailingVox et
// Verhoeven Joaillier sont des employeurs ; Truffle Capital est un client, pour qui le
// travail a été mené en auto-entrepreneur entre 2017 et 2019. Chaque cadre porte donc son
// `statut`, au même rang que le poste, la période et l'équipe : c'est ce qui manquait, et
// c'est ce qui a laissé publier « trois postes salariés » (issue #107).
//
// L'espace continue de s'appeler « réalisations » et non « cas clients » : sur treize
// fiches, dix ont été menées en poste salarié, et le nom de l'espace doit décrire
// l'ensemble. Les intitulés de poste sont repris à l'identique des CV de référence
// (`CLAUDE.md`), sans réécriture pour coller à une offre de service.
//
// L'ORDRE DE CE TABLEAU EST L'ORDRE D'AFFICHAGE de la liste : du plus récent au plus
// ancien. C'est le seul classement qui ne raconte rien d'autre que la chronologie.

import type { IRealisationCadre } from '@/interfaces/IRealisationCadre'

/** 2023-2026. Ni QA ni équipe data dédiées : la qualité et la donnée ont été outillées. */
export const CADRE_MAILINGVOX: IRealisationCadre = {
  statut: 'Poste salarié',
  organisation: 'Acetelecom / MailingVox',
  poste: 'Lead Tech · Ingénieur full stack, mobile & IA',
  periode: '2023-2026',
  equipe:
    'Équipe technique de trois — deux développeurs et un product owner. Ni QA ni équipe ' +
    'data dédiées. Encadrement d’alternants et de stagiaires.',
}

/** 2019-2022. Poste unique : aucun développeur à encadrer, et rien qui le laisse croire. */
export const CADRE_VERHOEVEN: IRealisationCadre = {
  statut: 'Poste salarié',
  organisation: 'Verhoeven Joaillier',
  poste: 'Développeur Full Stack · E-commerce de luxe',
  periode: '2019-2022',
  equipe:
    'Poste unique, en autonomie complète sur le site marchand. Encadrement de prestataires ' +
    'SEA, SEO et SMA.',
}

/**
 * 2017-2019. **Le seul cadre qui ne soit pas un poste salarié** : mission menée en
 * auto-entrepreneur, Truffle Capital était donc un client. L'équipe coordonnée est
 * marketing, jamais technique.
 */
export const CADRE_TRUFFLE: IRealisationCadre = {
  statut: 'Mission en indépendant',
  organisation: 'Truffle Capital',
  poste: 'Développeur web & Chef de projet digital',
  periode: '2017-2019',
  equipe:
    'Coordination d’une équipe marketing et SEO/SEA de 5 à 10 personnes et de trois ' +
    'prestataires externes.',
}

/** Les trois cadres, du plus récent au plus ancien. Source unique du regroupement. */
export const CADRES: IRealisationCadre[] = [CADRE_MAILINGVOX, CADRE_VERHOEVEN, CADRE_TRUFFLE]
