// carte-de-l-architecture.ts (jeromemarichez-fr)
// Article porte tel quel depuis l'ancien site : de la doc qui pilote un agent a une
// carte vivante de l'architecture. Titre, ordre des idees et formulations restent
// ceux du post LinkedIn source (CLAUDE.md, « on le porte, on ne le reecrit pas »).
// Aucun tiret cadratin dans le texte source : rien a reformuler de ce cote.
//
// Le titre du post d'origine porte deux parenthèses techniques (Claude Code,
// Obsidian / View Graph) : elles restent dans le chapo, qui nomme les memes outils,
// et n'alourdissent pas le titre. Confidentialite (CLAUDE.md) : ni produit, ni depot,
// ni client ne sont nommes, comme dans le post d'origine. `source` porte l'URL fournie
// par Jerome MARICHEZ ; `datePublication` est la date de publication sur ce site, la
// republication etant signalee par le champ `source` lui-meme.

import type { IArticle } from '@/interfaces/IArticle'

export const ARTICLE_CARTE_DE_L_ARCHITECTURE: IArticle = {
  slug: 'de-la-doc-qui-pilote-une-ia-a-une-carte-de-l-architecture',
  titre: 'De la doc qui pilote une IA à une carte vivante de l’architecture',
  chapo:
    'On code de plus en plus avec une IA en autonomie (Claude Code, ici) sur des ' +
    'bases de code entières. Ça pose un problème d’ingénierie précis : donner à ' +
    'l’agent le bon contexte et les bonnes règles, sans dupliquer ni l’un ni ' +
    'l’autre, sans faire exploser la charge cognitive de qui supervise. Voici ' +
    'comment j’ai détourné un outil de prise de notes (Obsidian et sa vue en ' +
    'graphe) pour le tenir.',
  metaDescription:
    'Donner le bon contexte à un agent sur un produit réparti en plusieurs dépôts : ' +
    'des règles nées d’incidents, et une carte faite des fichiers eux-mêmes.',
  datePublication: '2026-08-23',
  source: {
    reseau: 'LinkedIn',
    url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7492203940789391360/',
  },
  corpsHtml: `
    <h2>Plusieurs dépôts indépendants, pas un monorepo</h2>
    <p>Je développe un produit découpé en plusieurs dépôts git indépendants : application web, application mobile, vitrine, package partagé, générateur de données, backend. Pas un monorepo.</p>
    <h2>Le premier risque n’est pas la qualité du code, c’est l’endroit</h2>
    <p>Dupliquer un comportement partagé dans une application au lieu du package commun, et deux plateformes divergent silencieusement. Ça m’est arrivé.</p>
    <h2>La réponse : une table d’aiguillage, et des hooks</h2>
    <p>Un fichier de règles à la racine, écrit comme une table d’aiguillage (« cette demande, ce dépôt, ce piège »), plus un fichier par dépôt, et des hooks qui rappellent la règle et modifient la documentation.</p>
    <p>Chaque règle vient d’un incident réel : ça évite de reperdre du temps sur la même erreur.</p>
    <h2>Ce que ça ne résout pas</h2>
    <p>Les tests, la CI et la procédure par changement protègent la correction du code. Rien ne protège la charge cognitive de savoir qui a touché quoi, ni ne garantit que l’agent a eu le bon contexte plutôt qu’un fichier voisin qui ne dit plus la vérité.</p>
    <h2>La carte, faite des fichiers eux-mêmes</h2>
    <p>Pour ça, j’ouvre ces mêmes fichiers Markdown dans Obsidian, un outil pensé pour relier des notes personnelles, pas de la documentation technique.</p>
    <p>La carte est synchronisée avec les fichiers de documentation du code, les CLAUDE.md, les skills, les agents et le code lui-même. Pas un schéma dessiné à part, déconnecté dès le lendemain.</p>
    <p>Cliquer un nœud pour corriger une incohérence sur place est possible, mais accessoire.</p>
    <h2>Le vrai gain est visuel</h2>
    <p>Un texte lu ligne par ligne ne montre pas ce qu’un œil capte en une fraction de seconde : un nœud isolé sans arête, une couleur qui ne devrait pas être là. Une anomalie structurelle qu’aucune lecture séquentielle ne fait ressortir aussi vite.</p>
    <p>Ce que ça donne, concrètement :</p>
    <ul>
      <li>Chaque dépôt a sa couleur, façon étiquettes macOS.</li>
      <li>Les dossiers de documentation sont en pastel de la couleur de leur dépôt : on voit où la documentation est dense et où elle est maigre.</li>
      <li>Les liens ne sont posés qu’aux endroits d’usage réel, vérifiés avant d’être écrits, ce qui a révélé une dépendance déclarée jamais importée.</li>
      <li>Ça montre ce qu’un agent a sous les yeux sur une tâche : ni noyé sous une documentation entière, ni privé de la règle critique.</li>
    </ul>
    <h2>Le principe n’a pas changé, la vitesse si</h2>
    <p>Ne pas se répéter (DRY) existe depuis toujours en programmation. Ce qui a changé, c’est la vitesse à laquelle on peut le violer sans s’en apercevoir.</p>
    <p>Et rien qu’en construisant cette visualisation, la carte m’a déjà donné une liste de choses à reprendre. Visiblement, j’ai du boulot devant moi…</p>
  `.trim(),
}
