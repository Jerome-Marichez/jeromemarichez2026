// mesurer-avant-arbitrer.ts (jeromemarichez-fr)
// Article : mesurer avant d'arbitrer.
//
// Véracité (CLAUDE.md) : régies citées limitées à Google Ads et Bing Ads ; outillage de
// mesure limité à GTM (web et server-side), Measurement Protocol, GA, Matomo et CMP.
// Les deux chiffres cités sont repris des preuves du site, avec leur contexte exact :
// +50 % de panier moyen (Verhoeven Joaillier, A/B testing et heatmaps, pas de GTM sur
// cette période) et 100 000 € de budget piloté (Truffle Capital, 2017-2019).

import type { IArticle } from '@/interfaces/IArticle'

export const ARTICLE_MESURER_AVANT_ARBITRER: IArticle = {
  slug: 'mesurer-avant-d-arbitrer',
  titre: 'Mesurer avant d’arbitrer',
  chapo:
    'Couper un budget d’acquisition ou supprimer une étape de tunnel, c’est une décision ' +
    'de dirigeant. Elle ne vaut que ce que vaut le chiffre sur lequel elle s’appuie, et ' +
    'ce chiffre se construit dans le code, bien avant le tableau de bord.',
  meta: {
    title: 'Mesurer avant d’arbitrer',
    description:
      'Une donnée d’acquisition ne vaut que ce que vaut sa collecte : mesure construite ' +
      'dans le code, consentement conforme, et décisions prises sur un chiffre tenable.',
  },
  datePublication: '2026-08-14',
  // La figure « appui » : un arbitrage en équilibre, porté par une assise de mesure. Le fléau
  // est strictement horizontal : une balance qui penche afficherait un verdict, donc un chiffre.
  figure: 'appui',
  sections: [
    {
      id: 'la-collecte-avant-le-tableau-de-bord',
      titre: 'La collecte avant le tableau de bord',
      paragraphes: [
        'Un rapport bien présenté ne dit rien de la qualité de ce qu’il agrège. Avant de ' +
          'regarder une courbe, il faut savoir ce qui est envoyé, depuis où, avec quelle clé ' +
          'd’identification, et ce qui se perd en route : bloqueurs, navigations abandonnées, ' +
          'événements dupliqués.',
        'C’est la raison pour laquelle je pose la mesure dans le code plutôt qu’à côté : ' +
          'balisage serveur quand la fiabilité l’exige, envoi direct côté serveur pour les ' +
          'événements qui comptent vraiment, et un plan de marquage écrit avant la première ' +
          'implémentation. Une mesure ajoutée après coup mesure ce qu’elle peut, pas ce qu’on ' +
          'voulait savoir.',
      ],
    },
    {
      id: 'le-consentement',
      titre: 'Le consentement n’est pas une formalité de fin de projet',
      paragraphes: [
        'Le consentement change ce que la donnée contient, donc ce qu’on a le droit d’en ' +
          'conclure. Un dispositif conforme se conçoit avec la mesure, pas après : quels ' +
          'événements partent sans consentement, ce qui reste anonyme, ce qui est reconstitué ' +
          'et ce qui est simplement perdu, et assumé comme tel.',
        'Traiter le sujet à la fin donne toujours le même résultat : une bannière posée sur ' +
          'un dispositif qui n’a pas été pensé pour elle, des rapports qui bougent sans qu’on ' +
          'sache pourquoi, et une conformité qui tient sur une capture d’écran.',
      ],
    },
    {
      id: 'decider',
      titre: 'Décider : couper, garder, réallouer',
      paragraphes: [
        'Quand la collecte est saine, l’arbitrage devient possible : quelle source ' +
          'd’acquisition s’arrête le mois prochain, quelle étape de parcours disparaît, quel ' +
          'segment de clients justifie qu’on dépense davantage pour l’atteindre. Le coût par ' +
          'clic n’est pas la question ; ce que rapporte un client dans la durée, si.',
        'Deux repères de mon parcours : un budget publicitaire et de référencement de ' +
          '100 000 €, piloté et justifié devant des dirigeants ; et une refonte de parcours ' +
          'd’achat menée à la mesure (tests A/B, cartes de chaleur, taux de rebond) qui a ' +
          'fait progresser le panier moyen de 50 %. Dans les deux cas, la décision a suivi le ' +
          'chiffre, et c’est la même personne qui l’a ensuite implémentée.',
      ],
    },
  ],
}
