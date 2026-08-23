// preuves.ts — jeromemarichez-fr
// Le mur de preuves. Aucun chiffre ici n'est estimé, arrondi ni reconstitué.
//
// Source unique : les CV de référence de /Users/nicolasb/Documents/CV. Un chiffre qui
// ne s'y trouve pas mot pour mot n'a rien à faire sur cette page.
//
// **Les trois premières tuiles ne portent plus leur chiffre en propre** : elles le lisent
// sur la fiche de réalisation qui le déplie. C'est la seule façon de garantir que
// l'accueil et `/realisations/` ne peuvent pas afficher deux valeurs différentes — le
// nombre n'est écrit qu'une fois dans le dépôt. Le `contexte`, lui, reste écrit ici :
// c'est la version courte, calibrée pour une tuile, pas le résumé de la fiche.

import type { IProof } from '@/interfaces/IProof'
import { REALISATION_SMS_EN_MASSE } from './realisations/mailingvox-produits'
import { REALISATION_BUDGET_ADS } from './realisations/truffle'
import { REALISATION_PARCOURS_ACHAT } from './realisations/verhoeven'

export const PREUVES: IProof[] = [
  {
    chiffre: REALISATION_PARCOURS_ACHAT.chiffre.chiffre,
    libelle: REALISATION_PARCOURS_ACHAT.chiffre.libelle,
    contexte:
      'Verhoeven Joaillier, 2019-2022. Refonte des parcours d’achat pilotée par la mesure : ' +
      'A/B testing des pages et des designs, heatmaps, taux de rebond.',
    fiche: REALISATION_PARCOURS_ACHAT,
  },
  {
    chiffre: REALISATION_SMS_EN_MASSE.chiffre.chiffre,
    libelle: REALISATION_SMS_EN_MASSE.chiffre.libelle,
    contexte:
      'Plateforme SaaS « Sms En Masse », front React / Next.js avec stratégie de rendu ' +
      'différenciée par type de page. Conformité RGAA / WCAG tenue en parallèle.',
    fiche: REALISATION_SMS_EN_MASSE,
  },
  {
    chiffre: REALISATION_BUDGET_ADS.chiffre.chiffre,
    libelle: REALISATION_BUDGET_ADS.chiffre.libelle,
    contexte:
      'Truffle Capital, 2017-2019. Budget mesuré et justifié auprès des dirigeants, ' +
      'coordination d’une équipe marketing de 5 à 10 personnes et de 3 prestataires.',
    fiche: REALISATION_BUDGET_ADS,
  },
  {
    chiffre: '3',
    libelle: 'migrations sans interruption de service',
    contexte:
      'PHP 5 vers 7 puis réécriture Node.js, jQuery vers React, Ionic 6 vers 8 et Angular ' +
      '15 vers 19 — aucune coupure, aucun gel de la roadmap.',
  },
  {
    chiffre: '9 ans',
    libelle: 'en petite équipe ou en autonomie complète',
    contexte:
      'Les décisions techniques sont les miennes et je les assume en production. Chez ' +
      'MailingVox : équipe de 3, sans QA ni équipe data dédiées.',
  },
  // Seule tuile dont le chiffre n'est pas repris d'un CV : c'est la promesse elle-même,
  // et elle porte sur l'interlocuteur, pas sur l'absence de tiers (voir la section
  // « Les deux objections » de l'accueil, `contenu/objections.ts`).
  {
    chiffre: '1',
    libelle: 'interlocuteur, du cadrage au run',
    contexte:
      'Celui qui cadre est celui qui code, qui mesure et qui exploite. Aucune couche ' +
      'commerciale, aucun transfert de dossier — et si un renfort devient nécessaire, ' +
      'c’est moi qui le choisis et qui en réponds.',
  },
]
