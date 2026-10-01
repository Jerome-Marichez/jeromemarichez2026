// mesurer-avant-arbitrer.ts (jeromemarichez-fr)
// Article porte tel quel depuis l'ancien site : mesurer avant d'arbitrer. Titre, plan
// et formulations restent ceux de Jerome MARICHEZ (CLAUDE.md, « on le porte, on ne le
// reecrit pas »). Aucun tiret cadratin dans le texte source : rien a reformuler de ce
// cote.
//
// Veracite (CLAUDE.md) : regies citees limitees a Google Ads et Bing Ads ; outillage
// de mesure limite a GTM (web et server-side), Measurement Protocol, GA, Matomo et
// CMP. Les deux chiffres cites sont repris des preuves du site, avec leur contexte
// exact : +50 % de panier moyen (Verhoeven Joaillier, A/B testing et heatmaps, pas de
// GTM sur cette periode) et 100 000 euros de budget pilote (Truffle Capital, 2017-2019).

import type { IArticle } from '@/interfaces/IArticle'

export const ARTICLE_MESURER_AVANT_ARBITRER: IArticle = {
  slug: 'mesurer-avant-d-arbitrer',
  titre: 'Mesurer avant d’arbitrer',
  chapo:
    'Couper un budget d’acquisition ou supprimer une étape de tunnel, c’est une ' +
    'décision de dirigeant. Elle ne vaut que ce que vaut le chiffre sur lequel elle ' +
    's’appuie, et ce chiffre se construit dans le code, bien avant le tableau de bord.',
  metaDescription:
    'Une donnée d’acquisition ne vaut que ce que vaut sa collecte : mesure construite ' +
    'dans le code, consentement conforme, et décisions prises sur un chiffre tenable.',
  datePublication: '2026-08-14',
  corpsHtml: `
    <h2>La collecte avant le tableau de bord</h2>
    <p>Un rapport bien présenté ne dit rien de la qualité de ce qu’il agrège. Avant de regarder une courbe, il faut savoir ce qui est envoyé, depuis où, avec quelle clé d’identification, et ce qui se perd en route : bloqueurs, navigations abandonnées, événements dupliqués.</p>
    <p>C’est la raison pour laquelle je pose la mesure dans le code plutôt qu’à côté : balisage serveur quand la fiabilité l’exige, envoi direct côté serveur pour les événements qui comptent vraiment, et un plan de marquage écrit avant la première implémentation. Une mesure ajoutée après coup mesure ce qu’elle peut, pas ce qu’on voulait savoir.</p>
    <h2>Le consentement n’est pas une formalité de fin de projet</h2>
    <p>Le consentement change ce que la donnée contient, donc ce qu’on a le droit d’en conclure. Un dispositif conforme se conçoit avec la mesure, pas après : quels événements partent sans consentement, ce qui reste anonyme, ce qui est reconstitué et ce qui est simplement perdu, et assumé comme tel.</p>
    <p>Traiter le sujet à la fin donne toujours le même résultat : une bannière posée sur un dispositif qui n’a pas été pensé pour elle, des rapports qui bougent sans qu’on sache pourquoi, et une conformité qui tient sur une capture d’écran.</p>
    <h2>Décider : couper, garder, réallouer</h2>
    <p>Quand la collecte est saine, l’arbitrage devient possible : quelle source d’acquisition s’arrête le mois prochain, quelle étape de parcours disparaît, quel segment de clients justifie qu’on dépense davantage pour l’atteindre. Le coût par clic n’est pas la question ; ce que rapporte un client dans la durée, si.</p>
    <p>Deux repères de mon parcours : un budget publicitaire et de référencement de 100 000 €, piloté et justifié devant des dirigeants ; et une refonte de parcours d’achat menée à la mesure (tests A/B, cartes de chaleur, taux de rebond) qui a fait progresser le panier moyen de 50 %. Dans les deux cas, la décision a suivi le chiffre, et c’est la même personne qui l’a ensuite implémentée.</p>
  `.trim(),
}
