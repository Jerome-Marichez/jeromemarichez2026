// verhoeven.ts — jeromemarichez-fr
// Verhoeven Joaillier, 2019-2022 : e-commerce de joaillerie de luxe, poste unique.
//
// **Interdiction nominative appliquée ici** : Google Tag Manager n'appartient pas à cette
// période (`CLAUDE.md`). Ce qui est revendiqué chez Verhoeven, c'est Google Analytics, de
// l'A/B testing et des heatmaps — rien de plus.
//
// Deuxième garde-fou : le poste était unique. Aucune de ces fiches ne doit laisser croire
// à l'encadrement de développeurs ; ce qui a été encadré, ce sont des prestataires SEA,
// SEO et SMA, et c'est écrit dans le cadre d'emploi.
//
// Troisième : le +50 % porte sur le **panier moyen**. Ni chiffre d'affaires, ni taux de
// conversion, ni revenus — trois affirmations différentes, dont deux ne sont pas sourcées.

import type { IRealisation } from '@/interfaces/IRealisation'
import type { IRealisationChiffree } from '@/interfaces/IRealisationChiffree'
import { CADRE_VERHOEVEN } from './cadres'

/** Fiche chiffrée : le +50 % de panier moyen du mur de preuves se déplie ici. */
export const REALISATION_PARCOURS_ACHAT: IRealisationChiffree = {
  slug: 'verhoeven-parcours-achat',
  titre: 'Refondre les parcours d’achat d’un e-commerce de joaillerie',
  chapo:
    'Les tunnels d’achat se discutaient au goût. Ils ont été refondus sur ce que la mesure ' +
    'disait du visiteur réel — et l’arbitrage décidé était implémenté par la même personne.',
  meta: {
    title: 'Refonte des parcours d’achat — panier moyen +50 %',
    description:
      'Refonte des tunnels d’achat d’un e-commerce de joaillerie de luxe pilotée par la ' +
      'mesure : A/B testing des pages et des designs, heatmaps, taux de rebond.',
  },
  cadre: CADRE_VERHOEVEN,
  // Les trois pôles de la chaîne SANS l'IA : construire, mesurer, arbitrer. C'est la
  // démonstration la plus directe que rien n'oblige à acheter de l'IA pour tirer parti de
  // sa donnée — et elle est vraie, ce travail n'en a jamais employé.
  poles: ['ingenierie-web', 'data', 'sea-ux'],
  probleme:
    'Les tunnels d’achat se discutaient au goût, page par page. Sur un catalogue de pièces ' +
    'uniques, une étape de trop coûte une commande — encore fallait-il savoir laquelle.',
  etapes: [
    {
      titre: 'Mesurer avant de trancher',
      texte:
        'Google Analytics, heatmaps, taux de rebond, part de trafic mobile : ce que fait le ' +
        'visiteur réel, pas ce qu’on suppose qu’il fait.',
    },
    {
      titre: 'Tester, page par page',
      texte:
        'A/B testing des pages et des designs. Une étape disparaît parce que les chiffres le ' +
        'disent, pas parce qu’elle déplaît.',
    },
    {
      titre: 'Implémenter soi-même',
      texte:
        'Aucun devis et aucun transfert de dossier entre la lecture du chiffre et la ' +
        'modification du code : c’était le même poste.',
    },
  ],
  resultat:
    'Les parcours d’achat ont été refondus sur la mesure, et le panier moyen a suivi. Aucune ' +
    'création graphique dans ce travail : des arbitrages de parcours, puis leur implémentation.',
  chiffre: {
    chiffre: '+50 %',
    libelle: 'de panier moyen',
    portee:
      'Le chiffre porte sur le panier moyen et sur rien d’autre : ce n’est ni du chiffre ' +
      'd’affaires, ni un taux de conversion. La période de mesure et la base de comparaison ne ' +
      'sont pas publiées.',
  },
  decision: 'Quelle étape du tunnel disparaît, et ce que vous gagnez à la supprimer.',
}

export const REALISATION_VERHOEVEN_MIGRATIONS: IRealisation = {
  slug: 'verhoeven-migrations',
  titre: 'Deux migrations sans jamais couper le site marchand',
  chapo:
    'PHP 5 vers 7 puis réécriture en Node.js, jQuery vers React. Un site marchand ne se met ' +
    'pas en maintenance le temps d’une réécriture — et celui-ci a aussi fallu l’exploiter.',
  meta: {
    title: 'Deux migrations sans couper un site marchand',
    description:
      'PHP 5 vers 7 puis réécriture Node.js, jQuery vers React, sans interruption du site ' +
      'marchand. Serveurs administrés, pics saisonniers absorbés.',
  },
  cadre: CADRE_VERHOEVEN,
  poles: ['ingenierie-web'],
  probleme:
    'Le site marchand tournait sur PHP 5 et jQuery. Sur un e-commerce, chaque heure ' +
    'd’indisponibilité est une heure de vente perdue : la migration devait se faire sous le ' +
    'trafic.',
  etapes: [
    {
      titre: 'PHP 5 vers 7, puis la réécriture en Node.js',
      texte:
        'Migration du socle d’abord, réécriture ensuite. Deux mouvements séparés, pour que ' +
        'l’échec de l’un ne fasse pas tomber l’autre.',
    },
    {
      titre: 'jQuery vers React',
      texte:
        'Le front est passé à React par pages, en gardant à chaque étape un site marchand ' +
        'complet et vendable.',
    },
    {
      titre: 'Le run, tenu en même temps',
      texte:
        'Serveurs Apache et Linux, on-premise et IaaS. Les pics saisonniers d’un site de ' +
        'joaillerie ont été absorbés sans incident, SLI et SLO définis et suivis.',
    },
  ],
  resultat:
    'Les deux migrations ont été menées sans interruption du site marchand, sur un poste ' +
    'unique.',
  decision:
    'Ce qui se migre par étapes et ce qui se réécrit — et ce que chaque option coûte en ' +
    'risque d’arrêt.',
}

export const REALISATION_VERHOEVEN_ERP: IRealisation = {
  slug: 'verhoeven-erp-m3',
  titre: 'Brancher un ERP sur un site marchand de pièces uniques',
  chapo:
    'La boutique physique et le site vendaient le même stock sans se parler. Les flux ont ' +
    'été modélisés en BPMN avec ceux qui les appliquent, puis l’ERP a été intégré.',
  meta: {
    title: 'Intégrer un ERP à un site marchand de pièces uniques',
    description:
      'Modélisation BPMN 2.0 des flux commande, stock et facturation, puis intégration de ' +
      'l’ERP M3 Soft et synchronisation boutique physique / e-commerce.',
  },
  cadre: CADRE_VERHOEVEN,
  poles: ['ingenierie-web', 'data'],
  probleme:
    'La boutique physique et le site vendaient le même stock sans se parler. Sur des pièces ' +
    'uniques, deux ventes simultanées de la même pièce ne se rattrapent pas : il faut ' +
    'rappeler un client.',
  etapes: [
    {
      titre: 'Modéliser avant d’intégrer',
      texte:
        'Flux commande, stock et facturation modélisés en BPMN 2.0, avec les équipes qui les ' +
        'appliquent au quotidien. Plusieurs règles n’avaient jamais été écrites.',
    },
    {
      titre: 'Intégrer l’ERP M3 Soft',
      texte: 'Synchronisation de la boutique physique et du e-commerce sur un même état de stock.',
    },
    {
      titre: 'Cadrer les données clients',
      texte:
        'Les données clients traitées par les deux canaux ont été cadrées avec ce que le RGPD ' +
        'autorise, avant l’intégration et non après.',
    },
  ],
  resultat: 'Survente évitée sur des pièces uniques.',
  decision: 'Ce qui reste synchrone entre vos canaux, et ce qui peut attendre la nuit.',
}
