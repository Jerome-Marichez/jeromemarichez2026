import type { IProfil } from '../interfaces/IProfil'

// Paragraphe adapté du bloc PROFIL du CV « Ingénieur Fullstack & Chef de Projet »,
// le plus complet des six, en restant fidèle à ses formulations (CLAUDE.md, section
// « Fidélité à la source »).
export const profil: IProfil = {
  nom: 'Jérôme Marichez',
  titre: 'Ingénieur Full Stack | IA | QA | Data-Driven',
  localisation: 'Lille (59)',
  // Les six CV disent « neuf ans », mais Jérôme MARICHEZ a corrigé oralement à dix
  // ans : sa parole fait foi sur son propre parcours. Voir le compte rendu final.
  anneesExperience: 10,
  paragraphe:
    "Ingénieur logiciel et chef de projet, dix ans d'expérience, toujours en petite équipe ou en " +
    "autonomie complète. Lead tech sur le produit que j'ai conçu, ingénieur fullstack sur ceux que " +
    "je n'ai pas créés, chef de projet quand il faut aller chercher la décision plutôt que " +
    "l'attendre. " +
    'Je commence par dialoguer pour comprendre les enjeux business, puis je propose la solution ' +
    "technique qui y répond. Je conçois, je livre, je recette puis j'exploite, donc je paie moi-même " +
    "le prix de mes choix d'architecture. La qualité et les chaînes d'intégration continue, je les ai " +
    "définies puis améliorées dans des équipes qui n'en avaient pas. Certifié ISTQB Foundation, et " +
    'développeur autant que testeur. Côté data, des sujets ouverts à ma propre initiative et choisis ' +
    'sur le problème plutôt que sur la mode : règles métier contre la fraude, clustering pour la ' +
    'segmentation, LLM quand il faut du langage.',
  differenciationIaAugmentee:
    'Ma marque de fabrique, le développement en IA augmentée piloté par les tests. Claude Code et ' +
    'Gemini au quotidien, outillés par des agents, des hooks, des skills et des serveurs MCP internes, ' +
    'et le test qui fait foi avant, pendant et après la génération.',
}
