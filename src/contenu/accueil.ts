// accueil.ts (jeromemarichez-fr)
// Contenu de la page d'accueil : seuil, thèse, et le renvoi vers les quatre pôles.
//
// Tous les faits cités ici sont sourcés dans les CV de référence
// (/Users/nicolasb/Documents/CV/cv-ingenieur-fullstack.md, cv-ai-engineer.md,
// cv-tracking-specialist.md) et dans le README. Les règles de véracité du CLAUDE.md
// s'appliquent mot pour mot : rien n'est élargi pour mieux vendre.
//
// **L'accueil est une vitrine, pas un catalogue déplié (issue #103).** Il portait seize
// sections et douze mille pixels, dont trois pôles racontés en court juste au-dessus des
// pages qui les racontent en long, et deux charnières dupliquées à l'identifiant près.
// Tout ce détail est descendu sur `/services/<pole>/`. Il ne reste ici qu'une section
// éditoriale (les deux objections), parce qu'elle ne relève d'aucun pôle : elle porte
// sur la façon de travailler, et son second bloc est tenu par les règles de véracité
// (voir `objections.ts`). Le reste de la page est composé par `HomeView` : seuil, thèse
// et chaîne, les quatre portes, le mur de preuves, les limites, les certifications, les
// espaces, le contact.

import type { IEditorialPage } from '@/interfaces/IEditorialPage'
import { SECTION_OBJECTIONS } from './objections'

/** Le seuil : promesse, et trois chiffres pour qu'elle ne reste pas un slogan. */
export const HERO_ACCUEIL = {
  titre: "Je construis, j'exploite, je mesure. Le même interlocuteur, du cadrage au run.",
  chapo:
    'Ingénieur-conseil indépendant à Lille, 9 ans. Celui qui cadre est celui qui code, qui mesure ' +
    'et qui exploite. C’est lui qui répond de tout.',
  // Le fil IA se dit dès le seuil, sinon il se découvre au pôle Data et se lit comme une
  // offre. Formulation tenue par les règles de véracité : l'IA instruit et produit, le
  // test décide, jamais l'inverse.
  methode:
    'Je conçois, je développe et je pilote avec l’IA : Claude Code et Gemini au ' +
    'quotidien, le test tranchant à chaque étape.',
  jetons: [
    { chiffre: '3', libelle: 'migrations sans interruption de service' },
    { chiffre: '98/100', libelle: 'Lighthouse sur la plateforme SaaS livrée' },
    // Le troisième jeton dit la promesse, pas l'absence de tiers : ce qui est garanti,
    // c'est un interlocuteur unique et une responsabilité unique, du cadrage au run.
    { chiffre: '1', libelle: 'interlocuteur, du cadrage au run' },
  ],
} as const

/**
 * La thèse : quatre pôles, une seule chaîne, une seule personne.
 *
 * Le texte a perdu ses comptes d'étapes en même temps que le modèle a gagné son
 * embranchement. Il ne peut plus dire « chaque étape passe la main à la suivante » : la
 * donnée en a deux, et on peut n'en prendre qu'une.
 *
 * C'est désormais la thèse **et** le sommaire : les trois sections de pôle qui la
 * suivaient sont descendues sur leur page (issue #103), et ce sont les quatre portes,
 * juste dessous, qui prennent le relais. Le schéma dit le modèle, les portes disent ce
 * qu'on y achète.
 */
export const THESE_CHAINE = {
  titre: 'Quatre pôles, une seule chaîne',
  chapo:
    'Pas quatre offres au catalogue : ce qui est construit tourne, ce qui tourne produit de la ' +
    'donnée, et cette donnée ouvre l’IA et l’arbitrage. L’une, l’autre, ou les deux.',
  appui:
    'La chaîne ne tient que parce que c’est la même personne à chaque poste : découpée, elle ' +
    'casse à chaque jointure.',
} as const

export const PAGE_ACCUEIL: IEditorialPage = {
  route: '/',
  meta: {
    title: 'Jérôme Marichez, ingénieur-conseil indépendant à Lille',
    description:
      'Ingénierie web, data, IA, SEA & UX : un seul interlocuteur du cadrage au run, ' +
      'qui répond de tout. Conception, développement et pilotage avec l’IA. Lille et ' +
      'Hauts-de-France.',
  },
  sections: [SECTION_OBJECTIONS],
}
