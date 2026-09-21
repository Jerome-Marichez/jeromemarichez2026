// plugin-claude-code.ts (jeromemarichez-fr)
// Article porte tel quel depuis l'ancien site : le plugin Claude Code qui initialise
// les projets TypeScript de Jerome MARICHEZ, ouvert au public. Titre, ordre des idees,
// liste des cinq points et formulations restent ceux du post source (CLAUDE.md,
// « on le porte, on ne le reecrit pas »). Aucun tiret cadratin dans le texte source :
// rien a reformuler de ce cote.
//
// Trois ecarts au post d'origine, herites de l'ancien site (PR #116) et conserves
// ici : la CI est decrite conformement au README du depot (GitHub Actions testes et
// fonctionnels, fichier GitLab genere valide par le seul test de fumee) plutot que
// « au choix » ; le plugin est dit avant tout personnel, pas pense pour la reutilisation
// large ; l'appel a contribution et le lien du depot sont retires, hors ligne editoriale
// du site (pas d'appel a l'action de reseau social, pas de lien dans un paragraphe).

import type { IArticle } from '@/interfaces/IArticle'

export const ARTICLE_PLUGIN_CLAUDE_CODE: IArticle = {
  slug: 'j-ai-open-source-mon-plugin-claude-code',
  titre: 'J’ai open-sourcé mon plugin Claude Code : bootstrap-claudecode-typescript',
  chapo:
    'À chaque nouveau projet TypeScript, je refaisais les mêmes gestes : structure de ' +
    'dossiers, configuration du lint, mise en place des tests, pipeline CI, ' +
    'conventions d’équipe. J’ai fini par tout encoder dans un plugin Claude Code.',
  metaDescription:
    'Une commande, et le projet TypeScript/React existe : documentation, règles, ' +
    'lint, tests, CI. Public sous licence MIT, et avant tout personnel.',
  datePublication: '2026-08-23',
  corpsHtml: `
    <h2>Une seule commande</h2>
    <p>Une seule commande (/bootstrap-project), et vous obtenez un projet TypeScript/React prêt pour la production :</p>
    <ul>
      <li>Architecture standardisée : README, CLAUDE.md et documentation technique complète.</li>
      <li>Qualité par défaut : lint Biome, validation Zod, fichiers limités à 300 lignes.</li>
      <li>Stratégie de tests complète : Jest (unitaires), Stryker (mutation), Cypress (e2e).</li>
      <li>CI/CD prête à l’emploi : les workflows GitHub Actions sont testés et fonctionnels, le fichier GitLab CI généré n’est validé que par le test de fumée.</li>
      <li>Hooks et skills Claude Code qui font respecter les conventions automatiquement : /create-feat, /merge-prod.</li>
    </ul>
    <h2>Next.js ou Vite, monorepo ou séparé</h2>
    <p>Compatible Next.js et Vite, monorepo ou front et back séparés. Le générateur pose ses questions au démarrage (type de projet, framework, niveaux de tests, intégration continue) puis écrit l’ensemble.</p>
    <h2>Personnel, et public</h2>
    <p>C’est né de mes propres habitudes de développement, et ça reste avant tout personnel : le plugin encode mes conventions, pas celles de tout le monde. Le dépôt est public sous licence MIT, utilisable par d’autres, à condition de savoir que la structure, les hooks et les règles reflètent ma façon de faire.</p>
    <p>C’est écrit en tête du dépôt, plutôt que laissé à découvrir à la troisième question du générateur. L’état de la CI produite se dit de la même façon : ce qui est testé l’est, ce qui ne l’est pas se signale. C’est exactement ce que j’attends qu’un prestataire me dise avant que je m’engage sur son travail.</p>
  `.trim(),
}
