// truffle.ts (jeromemarichez-fr)
// Truffle Capital, 2017-2019 : capital-risque, sites du fonds et de ses participations.
//
// Trois précautions valent pour tout ce fichier :
//
// - **Artedrone est une participation du fonds**, jamais un second client. Le client est
//   Truffle Capital, et l'AMOA a été menée au bénéfice d'Artedrone **dans le cadre de la
//   mission Truffle**. La fiche le dit, et le rôle tenu y est l'AMOA : rien n'est affirmé
//   sur le dispositif médical. (Arbitré par Jérôme MARICHEZ le 2026-08-23, issue #107.)
// - Le **100 000 €** est un budget **piloté**, jamais un résultat. Aucun retour sur
//   investissement, aucun coût d'acquisition, aucun volume de trafic n'existe en source.
// - L'équipe coordonnée est **marketing**, et Google Tag Manager n'appartient pas à cette
//   période (`CLAUDE.md`).

import type { IRealisation } from '@/interfaces/IRealisation'
import type { IRealisationChiffree } from '@/interfaces/IRealisationChiffree'
import { CADRE_TRUFFLE } from './cadres'

/** Fiche chiffrée : le 100 000 € de budget piloté du mur de preuves se déplie ici. */
export const REALISATION_BUDGET_ADS: IRealisationChiffree = {
  slug: 'truffle-budget-ads-seo',
  titre: 'Piloter un budget d’acquisition et le justifier devant des dirigeants',
  chapo:
    'Un budget d’acquisition se pilote dans les interfaces des régies, et se justifie devant ' +
    'des gens qui ne les ouvrent jamais. Les deux moitiés du travail tenaient dans la même mission.',
  meta: {
    title: 'Piloter un budget ADS / SEO de 100 000 €',
    description:
      'Budget ADS / SEO de 100 000 € piloté, mesuré et justifié auprès des dirigeants chez ' +
      'Truffle Capital, avec une équipe marketing et trois prestataires.',
  },
  cadre: CADRE_TRUFFLE,
  poles: ['data', 'sea-ux'],
  probleme:
    'Le budget d’acquisition du fonds et de ses participations devait être arbitré chaque ' +
    'mois, puis expliqué à des dirigeants qui n’ouvrent pas les interfaces des régies.',
  etapes: [
    {
      titre: 'Un budget mesuré',
      texte:
        'Google Ads, Bing Ads, SEO, SEA et SMA. Taux de conversion et A/B testing, sur les ' +
        'sites que j’exploitais moi-même.',
    },
    {
      titre: 'Un budget justifié',
      texte:
        'Chaque arbitrage a été présenté aux dirigeants avec le chiffre qui le fonde, et non ' +
        'avec la capture d’écran d’un tableau de bord.',
    },
    {
      titre: 'Une équipe et des prestataires coordonnés',
      texte:
        'Une équipe marketing et SEO/SEA de 5 à 10 personnes et trois prestataires externes, ' +
        'sur le périmètre, le planning et la qualité.',
    },
  ],
  resultat:
    'Le budget a été piloté de bout en bout, mesuré et justifié. Cette fiche ne publie aucun ' +
    'résultat de campagne (ni retour sur investissement, ni coût d’acquisition, ni trafic) : ' +
    'je n’en publie pas de mesure.',
  chiffre: {
    chiffre: '100 000 €',
    libelle: 'de budget ADS / SEO piloté',
    portee:
      'C’est un budget piloté, pas un résultat : il dit ce qui a été confié, jamais ce que ' +
      'ça a rapporté. La durée sur laquelle il court n’est pas publiée.',
  },
  decision:
    'Ce que vous présentez à votre conseil pour tenir une ligne budgétaire, et sur quel ' +
    'chiffre, quand la régie et la comptabilité ne disent pas la même chose.',
}

export const REALISATION_TRUFFLE_SITES: IRealisation = {
  slug: 'truffle-sites',
  titre: 'Refondre puis exploiter les sites d’un fonds et de ses participations',
  chapo:
    'Trois sites, trois publics qui n’ont rien en commun, une seule personne de la conception ' +
    'à l’exploitation.',
  meta: {
    title: 'Refonte des sites d’un fonds de capital-risque',
    description:
      'Refonte full stack de truffle.com, truffle100.fr et artedrone.fr, de la conception à ' +
      'l’exploitation, une équipe marketing et trois prestataires.',
  },
  cadre: CADRE_TRUFFLE,
  poles: ['ingenierie-web'],
  probleme:
    'Le fonds, son classement annuel et une participation avaient chacun leur site, leur ' +
    'public et leur calendrier. Les trois étaient à refondre, puis à faire tourner.',
  etapes: [
    {
      titre: 'Refonte full stack',
      texte: 'truffle.com, truffle100.fr et artedrone.fr, de la conception à l’exploitation.',
    },
    {
      titre: 'Un seul interlocuteur sur les trois',
      texte:
        'Conception, développement, mise en production et exploitation tenus par la même ' +
        'personne, ce qui évitait d’arbitrer trois fois les mêmes questions.',
    },
    {
      titre: 'La coordination',
      texte:
        'Une équipe marketing et SEO/SEA de 5 à 10 personnes et trois prestataires externes, ' +
        'sur des calendriers qui ne se recouvraient pas.',
    },
  ],
  resultat:
    'Les trois sites ont été refondus, mis en production et exploités. Ils ont pu être refaits ' +
    'depuis 2019 : cette fiche ne renvoie donc vers aucun d’eux, ce qui s’y trouve aujourd’hui ' +
    'ne m’appartient plus.',
  decision: 'Ce qui se mutualise entre plusieurs sites, et ce qui doit rester propre à chacun.',
}

export const REALISATION_ARTEDRONE_AMOA: IRealisation = {
  slug: 'artedrone-amoa',
  titre: 'Traduire le besoin d’une startup biotech en spécifications exécutables',
  chapo:
    'Le besoin était porté par des équipes scientifiques et dirigeantes. Il devait devenir ' +
    'lisible par des prestataires qui ne connaissaient pas le domaine. C’est tout le travail.',
  meta: {
    title: 'AMOA d’une startup biotech : du besoin aux spécifications',
    description:
      'AMOA de la startup biotech Artedrone : besoin recueilli auprès des équipes ' +
      'scientifiques et dirigeantes, BPMN 2.0 et cartographie du système d’information.',
  },
  cadre: CADRE_TRUFFLE,
  // Un seul pôle, et c'est la démonstration : la donnée se livre pour elle-même. Aucun
  // développement n'a suivi de mon côté, et la fiche ne prétend pas le contraire.
  poles: ['data'],
  probleme:
    'Artedrone, startup biotech et participation du fonds, portait un besoin dans les termes ' +
    'de ses équipes scientifiques et dirigeantes. Des prestataires extérieurs au domaine ' +
    'devaient pouvoir l’exécuter.',
  etapes: [
    {
      titre: 'Recueillir auprès de ceux qui savent',
      texte:
        'Besoin recueilli auprès des équipes scientifiques et dirigeantes, dans leurs termes ' +
        'avant d’être traduit dans les miens.',
    },
    {
      titre: 'Mettre par écrit',
      texte: 'BPMN 2.0 et cartographie du système d’information.',
    },
    {
      titre: 'Écrire pour quelqu’un d’autre que soi',
      texte:
        'Les spécifications devaient être lues et exécutées par des prestataires non ' +
        'spécialistes. C’est cette contrainte qui a commandé leur forme, pas une norme ' +
        'documentaire.',
    },
  ],
  resultat:
    'Les spécifications ont été livrées et se sont révélées exploitables par des prestataires ' +
    'extérieurs au domaine. Rien n’est affirmé ici sur le dispositif médical lui-même : le ' +
    'périmètre tenu était l’AMOA.',
  decision: 'Ce qui entre dans la version 1, et ce qui attend sans bloquer le reste.',
}
