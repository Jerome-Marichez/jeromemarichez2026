// preuves.ts — jeromemarichez-fr
// Le mur de preuves. Aucun chiffre ici n'est estimé, arrondi ni reconstitué.
//
// Source unique : les CV de référence de /Users/nicolasb/Documents/CV. Un chiffre qui
// ne s'y trouve pas mot pour mot n'a rien à faire sur cette page.

import type { IProof } from '@/interfaces/IProof'

export const PREUVES: IProof[] = [
  {
    chiffre: '+50 %',
    libelle: 'de panier moyen',
    contexte:
      'Verhoeven Joaillier, 2019-2022. Refonte des parcours d’achat pilotée par la mesure : ' +
      'A/B testing des pages et des designs, heatmaps, taux de rebond.',
  },
  {
    chiffre: '98/100',
    libelle: 'au score Lighthouse',
    contexte:
      'Plateforme SaaS « Sms En Masse », front React / Next.js avec stratégie de rendu ' +
      'différenciée par type de page. Conformité RGAA / WCAG tenue en parallèle.',
  },
  {
    chiffre: '100 000 €',
    libelle: 'de budget ADS / SEO piloté',
    contexte:
      'Truffle Capital, 2017-2019. Budget mesuré et justifié auprès des dirigeants, ' +
      'coordination d’une équipe marketing de 5 à 10 personnes et de 3 prestataires.',
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
  {
    chiffre: '0',
    libelle: 'sous-traitant',
    contexte:
      'Celui qui cadre est celui qui code, qui mesure et qui exploite. C’est la seule ' +
      'raison pour laquelle les trois pôles tiennent ensemble.',
  },
]
