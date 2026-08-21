// accueil.ts — jeromemarichez-fr
// Contenu de la page d'accueil : seuil, thèse, et la chaîne complète.
//
// Tous les faits cités ici sont sourcés dans les CV de référence
// (/Users/nicolasb/Documents/CV/cv-ingenieur-fullstack.md, cv-ai-engineer.md,
// cv-tracking-specialist.md) et dans le README. Les règles de véracité du CLAUDE.md
// s'appliquent mot pour mot : rien n'est élargi pour mieux vendre.
//
// Les sections longues vivent dans `accueil-sections.ts` — limite de 300 lignes par
// fichier (docs/tooling.md).

import type { IEditorialPage } from '@/interfaces/IEditorialPage'
import { SECTIONS_ACCUEIL } from './accueil-sections'

/** Le seuil : promesse, et trois chiffres pour qu'elle ne reste pas un slogan. */
export const HERO_ACCUEIL = {
  titre: "Je construis, j'exploite, je mesure. Le même interlocuteur, du cadrage au run.",
  chapo:
    'Ingénieur logiciel à Lille, 9 ans. Un seul interlocuteur pour votre produit ' +
    'digital, du cadrage au run : celui qui cadre est celui qui code, qui mesure et ' +
    'qui exploite. Vous parlez à la personne qui fait le travail, et c’est elle qui ' +
    'répond de tout.',
  // Le fil IA se dit dès le seuil, sinon il se découvre au pôle 2 et se lit comme une
  // offre. Formulation tenue par les règles de véracité : l'IA instruit et produit, le
  // test décide — jamais l'inverse.
  methode:
    'Je conçois, je développe et je pilote avec l’IA — Claude Code et Gemini au ' +
    'quotidien, le test tranchant à chaque étape.',
  jetons: [
    { chiffre: '3', libelle: 'migrations sans interruption de service' },
    { chiffre: '98/100', libelle: 'Lighthouse sur la plateforme SaaS livrée' },
    // Le troisième jeton dit la promesse, pas l'absence de tiers : ce qui est garanti,
    // c'est un interlocuteur unique et une responsabilité unique, du cadrage au run.
    { chiffre: '1', libelle: 'interlocuteur, du cadrage au run' },
  ],
} as const

/** La thèse : trois pôles, une seule chaîne, une seule personne. */
export const THESE_CHAINE = {
  titre: 'Trois pôles, une seule chaîne',
  chapo:
    "Ce ne sont pas trois offres qu'on achète séparément. C'est une prise en charge " +
    'continue, où chaque étape passe explicitement la main à la suivante : on construit, ' +
    'ce qui est construit se met à tourner, ce qui tourne produit de la donnée, et cette ' +
    "donnée décide de ce qu'on modifie ensuite.",
  appui:
    "Cette chaîne ne tient que parce que c'est la même personne aux trois postes. " +
    "Découpée entre trois prestataires, elle se casse à chaque jointure — et c'est " +
    'toujours au client de recoller les morceaux.',
} as const

export const PAGE_ACCUEIL: IEditorialPage = {
  route: '/',
  meta: {
    title: 'Jérôme Marichez — Ingénieur logiciel à Lille',
    description:
      'Ingénierie web, data & IA, SEA & UX : un seul interlocuteur du cadrage au run, ' +
      'qui répond de tout. Conception, développement et pilotage avec l’IA. Lille et ' +
      'Hauts-de-France.',
  },
  sections: SECTIONS_ACCUEIL,
}
