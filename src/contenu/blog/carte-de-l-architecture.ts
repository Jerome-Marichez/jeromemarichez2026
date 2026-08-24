// carte-de-l-architecture.ts — jeromemarichez-fr
// Article — de la doc qui pilote un agent à une carte vivante de l'architecture.
//
// FIDÉLITÉ AU TEXTE D'ORIGINE (issue #121). Cet article **porte** un post écrit par
// Jérôme MARICHEZ, il ne le réécrit pas. Une première version avait refait le titre et le
// plan à partir du matériau ; elle a été rejetée (« tu as pris trop de liberté sur le
// texte »). Le titre, l'ordre des idées et les formulations sont ceux du post. Ce qui a
// été fait, et rien d'autre : orthographe et syntaxe corrigées (« la carte est
// synchroniser », « les hooks qui rappellent/modifie »), phrases tronquées reformées,
// abréviations écrites en toutes lettres (« app » → « application », « doc » →
// « documentation »), et mise à la forme d'un article web — un chapô, des sections
// titrées. Les titres de section n'existent pas dans le post : ils sont dérivés des
// phrases de Jérôme MARICHEZ, jamais d'un plan neuf.
//
// TITRE. Celui du post est « De la doc qui pilote une IA (Claude Code) à une carte vivante
// de l'architecture. (Obsidian / View Graph) ». Les deux parenthèses techniques sont
// descendues dans le chapô — elles y nomment les mêmes outils — et l'accroche reste le
// titre. La balise `<title>`, bornée à 60 caractères, perd en plus l'adjectif « vivante ».
//
// SLUG. Il a changé une fois, le 2026-08-23, et c'était la DERNIÈRE OCCASION : l'article
// avait été fusionné dans `dev` mais n'était jamais allé en production (`git ls-tree
// origin/main` ne le contenait pas), donc aucun lien entrant et aucun classement acquis
// n'ont été cassés. Dès la première mise en production, la règle d'immuabilité de
// `IArticle.slug` redevient absolue : un titre se corrige, un slug ne se corrige pas.
//
// Confidentialité (CLAUDE.md) : ni le produit, ni les dépôts, ni le client ne sont nommés.
// Le post d'origine n'en nomme aucun non plus. Obsidian et Claude Code sont des outils du
// commerce, pas une information couverte.
//
// Véracité (CLAUDE.md) : la seule preuve avancée est celle que la carte a réellement
// produite — une dépendance déclarée jamais importée. Aucun gain de temps, aucun nombre
// d'incidents évités, aucun pourcentage : rien de tout cela n'a été mesuré.
//
// La `source` porte l'URL exacte fournie par Jérôme MARICHEZ. `datePublication` est la
// date de publication **sur ce site** ; la note de republication dit au lecteur que le
// texte a d'abord paru ailleurs.

import type { IArticle } from '@/interfaces/IArticle'

export const ARTICLE_CARTE_DE_L_ARCHITECTURE: IArticle = {
  slug: 'de-la-doc-qui-pilote-une-ia-a-une-carte-de-l-architecture',
  titre: 'De la doc qui pilote une IA à une carte vivante de l’architecture',
  chapo:
    'On code de plus en plus avec une IA en autonomie — Claude Code, ici — sur des bases de ' +
    'code entières. Ça pose un problème d’ingénierie précis : donner à l’agent le bon ' +
    'contexte et les bonnes règles, sans dupliquer ni l’un ni l’autre, sans faire exploser ' +
    'la charge cognitive de qui supervise. Voici comment j’ai détourné un outil de prise de ' +
    'notes — Obsidian et sa vue en graphe — pour le tenir.',
  meta: {
    title: 'De la doc qui pilote une IA à une carte de l’architecture',
    description:
      'Donner le bon contexte à un agent sur un produit réparti en plusieurs dépôts : des ' +
      'règles nées d’incidents, et une carte faite des fichiers eux-mêmes.',
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
      id: 'plusieurs-depots-pas-un-monorepo',
      titre: 'Plusieurs dépôts indépendants, pas un monorepo',
      paragraphes: [
        'Je développe un produit découpé en plusieurs dépôts git indépendants : application ' +
          'web, application mobile, vitrine, package partagé, générateur de données, backend. ' +
          'Pas un monorepo.',
      ],
    },
    {
      id: 'le-premier-risque-c-est-l-endroit',
      titre: 'Le premier risque n’est pas la qualité du code, c’est l’endroit',
      paragraphes: [
        'Dupliquer un comportement partagé dans une application au lieu du package commun, et ' +
          'deux plateformes divergent silencieusement. Ça m’est arrivé.',
      ],
    },
    {
      id: 'la-reponse-une-table-d-aiguillage',
      titre: 'La réponse : une table d’aiguillage, et des hooks',
      paragraphes: [
        'Un fichier de règles à la racine, écrit comme une table d’aiguillage — « cette ' +
          'demande, ce dépôt, ce piège » —, plus un fichier par dépôt, et des hooks qui ' +
          'rappellent la règle et modifient la documentation.',
        'Chaque règle vient d’un incident réel : ça évite de reperdre du temps sur la même ' +
          'erreur.',
      ],
    },
    {
      id: 'ce-que-ca-ne-resout-pas',
      titre: 'Ce que ça ne résout pas',
      paragraphes: [
        'Les tests, la CI et la procédure par changement protègent la correction du code. ' +
          'Rien ne protège la charge cognitive de savoir qui a touché quoi, ni ne garantit que ' +
          'l’agent a eu le bon contexte plutôt qu’un fichier voisin qui ne dit plus la vérité.',
      ],
    },
    {
      id: 'la-carte-faite-des-fichiers-eux-memes',
      titre: 'La carte, faite des fichiers eux-mêmes',
      paragraphes: [
        'Pour ça, j’ouvre ces mêmes fichiers Markdown dans Obsidian — un outil pensé pour ' +
          'relier des notes personnelles, pas de la documentation technique.',
        'La carte est synchronisée avec les fichiers de documentation du code, les CLAUDE.md, ' +
          'les skills, les agents et le code lui-même. Pas un schéma dessiné à part, ' +
          'déconnecté dès le lendemain.',
        'Cliquer un nœud pour corriger une incohérence sur place est possible — mais ' +
          'accessoire.',
      ],
    },
    {
      id: 'le-vrai-gain-est-visuel',
      titre: 'Le vrai gain est visuel',
      paragraphes: [
        'Un texte lu ligne par ligne ne montre pas ce qu’un œil capte en une fraction de ' +
          'seconde : un nœud isolé sans arête, une couleur qui ne devrait pas être là. Une ' +
          'anomalie structurelle qu’aucune lecture séquentielle ne fait ressortir aussi vite.',
        'Ce que ça donne, concrètement :',
      ],
      liste: [
        'Chaque dépôt a sa couleur, façon étiquettes macOS.',
        'Les dossiers de documentation sont en pastel de la couleur de leur dépôt : on voit ' +
          'où la documentation est dense et où elle est maigre.',
        'Les liens ne sont posés qu’aux endroits d’usage réel, vérifiés avant d’être écrits — ' +
          'ce qui a révélé une dépendance déclarée jamais importée.',
        'Ça montre ce qu’un agent a sous les yeux sur une tâche : ni noyé sous une ' +
          'documentation entière, ni privé de la règle critique.',
      ],
    },
    {
      id: 'le-principe-n-a-pas-change',
      titre: 'Le principe n’a pas changé, la vitesse si',
      paragraphes: [
        'Ne pas se répéter — DRY — existe depuis toujours en programmation. Ce qui a changé, ' +
          'c’est la vitesse à laquelle on peut le violer sans s’en apercevoir.',
        'Et rien qu’en construisant cette visualisation, la carte m’a déjà donné une liste de ' +
          'choses à reprendre. Visiblement, j’ai du boulot devant moi…',
      ],
    },
  ],
}
