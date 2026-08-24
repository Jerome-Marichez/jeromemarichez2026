// plugin-claude-code.ts (jeromemarichez-fr)
// Article : le plugin Claude Code qui initialise mes projets TypeScript, ouvert au public.
//
// FIDÉLITÉ AU TEXTE D'ORIGINE (issue #121). Cet article **porte** un post écrit par
// Jérôme MARICHEZ. Une première version en avait refait le titre et le plan ; le défaut
// signalé sur l'autre article de la même livraison valait mot pour mot pour celui-ci. Le
// titre, l'ordre des idées, la liste des cinq points et les formulations sont ceux du
// post. Ce qui a été fait : orthographe et syntaxe, abréviations écrites en toutes
// lettres, et mise à la forme d'un article web (un chapô, des sections titrées, dont les
// titres sont dérivés des phrases de Jérôme MARICHEZ).
//
// TROIS ÉCARTS AU POST, ET LEUR RAISON. Ce sont des corrections de véracité et de registre
// (CLAUDE.md), pas des libertés de rédaction. Elles avaient été établies par la PR #116
// et elles survivent au retour vers le texte d'origine :
//
// 1. La CI. Le post dit « GitHub Actions ou GitLab CI au choix ». Le README du dépôt dit
//    autre chose : les workflows GitHub Actions sont testés et fonctionnels, le fichier
//    GitLab généré n'est validé que par le test de fumée. C'est le README qui fait foi, et
//    la nuance est portée par le quatrième point de la liste.
// 2. « C'est pensé pour être réutilisé » est faux : le README écrit en tête que le plugin
//    est avant tout personnel. L'article le dit comme le README.
// 3. « Retours et contributions bienvenus » est un appel à l'action de réseau social : il
//    ne rentre pas dans le contenu publié, pas plus qu'une invitation à mettre une étoile.
//    Aucune revendication d'adoption non plus : le dépôt est à zéro étoile au 2026-08-23.
//    L'URL du dépôt qui fermait le post disparaît pour la même raison de registre, et
//    parce qu'un paragraphe d'article ne porte pas de lien : le dépôt est nommé, il se
//    trouve sous son nom.
//
// Une phrase n'est pas dans le post : « Le générateur pose ses questions au démarrage… ».
// Elle décrit le comportement réel du skill (voir le README du dépôt) et remplace la
// matière perdue par les retraits ci-dessus.
//
// SLUG. Il a changé une fois, le 2026-08-23, et c'était la DERNIÈRE OCCASION : l'article
// avait été fusionné dans `dev` mais n'était jamais allé en production (`git ls-tree
// origin/main` ne le contenait pas), donc aucun lien entrant ni classement acquis n'ont
// été cassés. Dès la première mise en production, la règle d'immuabilité de
// `IArticle.slug` redevient absolue.
//
// Pas de champ `source` : l'URL du post d'origine n'a pas été fournie par Jérôme MARICHEZ,
// et une URL ne s'invente ni ne s'approxime (voir `IArticleSource`).

import type { IArticle } from '@/interfaces/IArticle'

export const ARTICLE_PLUGIN_CLAUDE_CODE: IArticle = {
  slug: 'j-ai-open-source-mon-plugin-claude-code',
  titre: 'J’ai open-sourcé mon plugin Claude Code : bootstrap-claudecode-typescript',
  chapo:
    'À chaque nouveau projet TypeScript, je refaisais les mêmes gestes : structure de ' +
    'dossiers, configuration du lint, mise en place des tests, pipeline CI, conventions ' +
    'd’équipe. J’ai fini par tout encoder dans un plugin Claude Code.',
  meta: {
    title: 'J’ai open-sourcé mon plugin Claude Code',
    description:
      'Une commande, et le projet TypeScript/React existe : documentation, règles, lint, ' +
      'tests, CI. Public sous licence MIT, et avant tout personnel.',
  },
  datePublication: '2026-08-23',
  // La figure « gabarit » : une forme ouverte du côté de la sortie, et ce qui en sort déjà
  // complet, jusqu'à son aboutissement. Elle dit qu'un point de départ se produit, jamais
  // combien de projets en sont sortis : aucun compte n'est affiché nulle part.
  figure: 'gabarit',
  sections: [
    {
      id: 'une-seule-commande',
      titre: 'Une seule commande',
      paragraphes: [
        'Une seule commande (/bootstrap-project), et vous obtenez un projet ' +
          'TypeScript/React prêt pour la production :',
      ],
      liste: [
        'Architecture standardisée : README, CLAUDE.md et documentation technique complète.',
        'Qualité par défaut : lint Biome, validation Zod, fichiers limités à 300 lignes.',
        'Stratégie de tests complète : Jest (unitaires), Stryker (mutation), Cypress (e2e).',
        'CI/CD prête à l’emploi : les workflows GitHub Actions sont testés et fonctionnels, ' +
          'le fichier GitLab CI généré n’est validé que par le test de fumée.',
        'Hooks et skills Claude Code qui font respecter les conventions automatiquement : ' +
          '/create-feat, /merge-prod.',
      ],
    },
    {
      id: 'next-js-ou-vite-monorepo-ou-separe',
      titre: 'Next.js ou Vite, monorepo ou séparé',
      paragraphes: [
        'Compatible Next.js et Vite, monorepo ou front et back séparés. Le générateur pose ' +
          'ses questions au démarrage (type de projet, framework, niveaux de tests, ' +
          'intégration continue) puis écrit l’ensemble.',
      ],
    },
    {
      id: 'personnel-et-public',
      titre: 'Personnel, et public',
      paragraphes: [
        'C’est né de mes propres habitudes de développement, et ça reste avant tout ' +
          'personnel : le plugin encode mes conventions, pas celles de tout le monde. Le dépôt ' +
          'est public sous licence MIT, utilisable par d’autres, à condition de savoir que la ' +
          'structure, les hooks et les règles reflètent ma façon de faire.',
        'C’est écrit en tête du dépôt, plutôt que laissé à découvrir à la troisième question ' +
          'du générateur. L’état de la CI produite se dit de la même façon : ce qui est testé ' +
          'l’est, ce qui ne l’est pas se signale. C’est exactement ce que j’attends qu’un ' +
          'prestataire me dise avant que je m’engage sur son travail.',
      ],
    },
  ],
}
