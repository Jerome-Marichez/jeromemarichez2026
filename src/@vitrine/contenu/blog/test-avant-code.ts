// test-avant-code.ts — jeromemarichez-fr
// Article — le test avant le code, même avec un agent.
//
// Véracité (CLAUDE.md) : le développement en IA augmentée piloté par les tests est un
// différenciateur assumé du site, et l'outillage cité (Jest, Cypress, Stryker, hooks,
// agents, serveurs MCP) est celui de ce dépôt. La certification citée est ISTQB
// Foundation — le niveau Avancé n'est pas obtenu et n'est pas mentionné.

import type { IArticle } from '@/interfaces/IArticle'

export const ARTICLE_TEST_AVANT_CODE: IArticle = {
  slug: 'le-test-avant-le-code-meme-avec-un-agent',
  titre: 'Le test avant le code, même avec un agent',
  chapo:
    'Faire écrire du code par une IA ne change pas la question : qu’est-ce qui prouve que ' +
    'ce code fait ce qu’on attend ? Ça la rend plus pressante, parce que le volume produit ' +
    'ne laisse plus le temps de relire ligne à ligne.',
  meta: {
    title: 'Le test avant le code, même avec un agent',
    description:
      'Développement en IA augmentée piloté par les tests : pourquoi le test s’écrit ' +
      'avant, ce que les tests de mutation vérifient, et ce que ça change côté client.',
  },
  datePublication: '2026-08-18',
  // La figure « antériorité » : deux temps sur un axe, et le sens inverse fermé d'une croix.
  // Elle dit l'ordre, jamais un résultat — aucune mesure de qualité n'y est affichée.
  figure: 'anteriorite',
  sections: [
    {
      id: 'le-volume-est-le-probleme',
      titre: 'Le volume est le problème',
      paragraphes: [
        'Un agent produit en quelques minutes ce qui prenait une journée. La revue humaine, ' +
          'elle, n’a pas accéléré. Si rien ne change dans la méthode, on relit de moins en ' +
          'moins bien un code de plus en plus abondant, et on finit par valider sur ' +
          'l’apparence : ça compile, ça ressemble à du code correct, donc on passe.',
        'Le piège n’est pas que l’IA se trompe — un développeur aussi. Le piège est qu’elle se ' +
          'trompe vite, de façon plausible, et à grande échelle.',
      ],
    },
    {
      id: 'le-test-en-premier',
      titre: 'Le test en premier, et il n’est pas écrit par l’agent',
      paragraphes: [
        'Le comportement attendu s’écrit avant l’implémentation, avec ses cas limites et son ' +
          'jeu de données. L’agent code ensuite pour le satisfaire. L’ordre n’est pas un rituel : ' +
          'un test écrit après coup décrit ce que le code fait, pas ce qu’on voulait qu’il fasse, ' +
          'et il valide donc aussi les erreurs.',
        'Sur ce dépôt, la règle est outillée : des hooks refusent qu’un fichier de test soit ' +
          'posé par l’assistant, refusent qu’une doublure de module remplace un vrai service, et ' +
          'demandent confirmation dès qu’un fichier source apparaît sans test qui le couvre. ' +
          'Une règle qu’aucun outil ne fait respecter n’est qu’une intention.',
      ],
    },
    {
      id: 'ce-qui-verifie-les-tests',
      titre: 'Et ce qui vérifie les tests',
      paragraphes: [
        'Reste une question que la couverture ne répond pas : est-ce que ces tests détectent ' +
          'quelque chose ? Les tests de mutation modifient volontairement le code — inverser une ' +
          'condition, supprimer un appel — et regardent si la suite passe encore. Quand elle ' +
          'passe, le test traversait la ligne sans rien vérifier.',
        'C’est l’outil qui manque le plus souvent sur une base largement générée : elle est ' +
          'couverte au sens du pourcentage, et démunie au sens de la détection. Jest et Cypress ' +
          'disent que le code tourne ; Stryker dit si les tests valent quelque chose.',
      ],
    },
    {
      id: 'ce-que-vous-tranchez',
      titre: 'Ce que ça change côté client',
      paragraphes: [
        'La bonne question à poser à un prestataire n’est plus « utilisez-vous l’IA ? » — la ' +
          'réponse est oui presque partout, et elle n’engage à rien. Elle est : qu’est-ce qui ' +
          'rattrape une erreur produite par cette IA avant qu’elle arrive en production, et qui ' +
          'en répond ?',
        'La décision qui vous revient est celle du filet : ce que vous acceptez de faire ' +
          'produire par une machine, et le niveau de preuve exigé en dessous. Elle se prend ' +
          'avant le premier fichier, pas au premier incident.',
      ],
    },
  ],
}
