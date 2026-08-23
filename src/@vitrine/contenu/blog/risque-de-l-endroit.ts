// risque-de-l-endroit.ts — jeromemarichez-fr
// Article — le contexte d'un agent sur un produit réparti, et la carte qui le rend visible.
//
// Confidentialité (CLAUDE.md) : ni le produit, ni les dépôts, ni le client ne sont nommés.
// Le post d'origine n'en nomme aucun non plus — il dit « app web, app mobile, vitrine,
// package partagé, backend », et l'article s'en tient là. Obsidian est nommé : c'est un
// outil du commerce, pas une information couverte.
//
// Véracité (CLAUDE.md) : la seule preuve avancée est celle que la carte a réellement
// produite — une dépendance déclarée que rien n'importait. Aucun gain de temps, aucun
// nombre d'incidents évités, aucun pourcentage n'est revendiqué : rien de tout cela n'a
// été mesuré, et l'article ne le laisse pas entendre.
//
// La `source` porte l'URL exacte fournie par Jérôme MARICHEZ. Le post est paru le
// 2026-08-10 ; `datePublication` est la date de publication **sur ce site**, et la note de
// republication dit au lecteur que le texte a d'abord paru ailleurs.

import type { IArticle } from '@/interfaces/IArticle'

export const ARTICLE_RISQUE_DE_L_ENDROIT: IArticle = {
  slug: 'le-premier-risque-n-est-pas-le-code-c-est-l-endroit',
  titre: 'Le premier risque n’est pas le code, c’est l’endroit',
  chapo:
    'Un produit découpé en plusieurs dépôts indépendants ne casse pas quand un comportement ' +
    'partagé est écrit au mauvais endroit : il diverge, en silence, et on l’apprend des mois ' +
    'plus tard. Les tests et la CI n’y voient rien — ils vérifient le code, pas son adresse.',
  meta: {
    title: 'Le premier risque n’est pas le code, c’est l’endroit',
    description:
      'Donner le bon contexte à un agent sur un produit réparti en plusieurs dépôts : des ' +
      'règles nées d’incidents, ce qu’elles ne protègent pas, et une carte de l’architecture ' +
      'faite des fichiers du code eux-mêmes.',
  },
  datePublication: '2026-08-23',
  source: {
    reseau: 'linkedin',
    url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7492203940789391360/',
  },
  // La figure « liaison » : des ensembles séparés, un lieu commun plus grand qu'eux, les
  // liens qui portent vraiment, et un lien tireté qui n'aboutit à rien — la dépendance
  // déclarée que rien n'importe. Aucune quantité n'y est dessinée, pas même un compte de
  // dépôts : les blocs sont là pour être reliés, pas pour être comptés.
  figure: 'liaison',
  sections: [
    {
      id: 'plusieurs-depots-un-seul-bon-endroit',
      titre: 'Plusieurs dépôts, un seul bon endroit',
      paragraphes: [
        'Le produit dont je parle n’est pas un monorepo : application web, application mobile, ' +
          'vitrine, package partagé et backend vivent chacun dans leur dépôt, avec leur cycle ' +
          'de vie, leur intégration continue et leurs versions. C’est un choix, il se défend, ' +
          'et il tient.',
        'Mais il déplace le risque. Un comportement partagé n’a qu’une seule bonne adresse — le ' +
          'package commun. Écrit dans une application, rien ne casse : les deux plateformes ' +
          'commencent simplement à diverger sans que personne le voie. C’est arrivé, et ce ' +
          'n’était pas un problème de qualité de code : le code était juste, il était au ' +
          'mauvais endroit.',
      ],
    },
    {
      id: 'des-regles-nees-d-incidents',
      titre: 'Des règles nées d’incidents',
      paragraphes: [
        'La réponse a été un fichier de règles à la racine, écrit comme une table ' +
          'd’aiguillage : cette demande, ce dépôt, ce piège. Un fichier par dépôt en dessous, et ' +
          'des hooks qui rappellent la règle au moment où elle s’applique et tiennent la ' +
          'documentation à jour au fil du travail. Chaque règle vient d’un incident réel, jamais ' +
          'd’une intention de bien faire : un guide de style écrit à l’avance décrit un projet ' +
          'imaginaire, une règle écrite après une erreur décrit celui qu’on a.',
        'Reste ce qu’aucun de ces fichiers ne couvre. Les tests, la CI et la procédure ' +
          'protègent la correction du code ; aucun des trois ne dit qui a touché quoi, ni si le ' +
          'contexte qu’un agent a lu était le bon fichier plutôt qu’un fichier voisin qui ne dit ' +
          'plus la vérité. Ce manque-là ne se voit pas dans une pipeline rouge — il se voit des ' +
          'mois plus tard, sous la forme d’un comportement écrit deux fois.',
      ],
    },
    {
      id: 'une-carte-faite-des-fichiers',
      titre: 'Une carte faite des fichiers eux-mêmes',
      paragraphes: [
        'J’ai donc ouvert ces mêmes fichiers Markdown — documentation, fichiers de règles, ' +
          'skills, agents — dans Obsidian, et je l’ai laissé tracer le graphe. La carte est ' +
          'synchronisée par construction, puisqu’elle est faite du dépôt lui-même : ce n’est pas ' +
          'un schéma dessiné à côté, déconnecté dès le lendemain. Chaque dépôt a sa couleur, les ' +
          'dossiers de documentation portent un pastel de la couleur de leur dépôt — ce qui ' +
          'montre d’un coup d’œil où la documentation est dense et où elle est maigre — et les ' +
          'liens ne sont posés qu’aux endroits d’usage réel, vérifiés avant d’être écrits.',
        'Le gain est visuel, et ce n’est pas un gain d’esthétique : un nœud isolé sans aucune ' +
          'arête, une couleur qui n’a rien à faire là. Une anomalie de structure se regarde, ' +
          'elle ne se lit pas — aucune lecture séquentielle ne la fait ressortir aussi vite. ' +
          'C’est ainsi que la carte a fait apparaître une dépendance déclarée que rien ' +
          'n’importait : une ligne juste dans un fichier de configuration, et pas une ligne de ' +
          'code derrière.',
      ],
    },
    {
      id: 'ce-que-vous-tranchez',
      titre: 'Ce que vous pouvez trancher',
      paragraphes: [
        'La question n’est pas « monorepo ou pas » : les deux se défendent, et le découpage ' +
          'décrit ici tient. Elle est de savoir ce qui, chez vous, signale qu’un comportement ' +
          'partagé a été écrit au mauvais endroit, et combien de temps il faut pour l’apprendre. ' +
          'Si la réponse est « une revue de code, à condition que le relecteur connaisse tout le ' +
          'produit », alors le dispositif repose sur la mémoire d’une personne.',
        'Le principe, lui, n’a pas changé : ne pas se répéter est une règle aussi vieille que ' +
          'le métier. Ce qui a changé, c’est la vitesse à laquelle on peut la violer sans s’en ' +
          'apercevoir. Et c’est cette vitesse-là, pas le principe, qui décide de l’outillage ' +
          'dont vous avez besoin.',
      ],
    },
  ],
}
