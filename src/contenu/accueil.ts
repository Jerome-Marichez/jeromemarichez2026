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
import { SITE_IDENTITY } from '@/seo/site'
import { SECTION_OBJECTIONS } from './objections'

/**
 * L'ancrage régional (issue #136), rendu une seule fois, dans le bloc de contact.
 *
 * Ce que le texte dit, et pourquoi il ne peut pas dire plus. Les CV de référence
 * n'établissent que trois choses : l'exercice à Lille, le Bac +3 Développeur à Dunkerque
 * en 2022, le Bac +5 Expert en informatique et systèmes d'information à Lille en 2025.
 * Aucune source ne porte un lieu de naissance, une origine ni une enfance dans le Nord,
 * donc le site n'en affirme aucun : arbitrage de Jérôme MARICHEZ du 2026-08-24, ancrage
 * régional sans revendication d'origine. Un parcours de formation régional n'est pas une
 * origine, et il ne s'en déduit pas.
 *
 * Les intitulés de diplôme sont repris à l'identique des CV, comme les intitulés de
 * poste. La troisième phrase est là pour empêcher la lecture « CV » : ce site vend neuf
 * ans d'expérience et des preuves chiffrées, pas des diplômes. La formation n'est ici
 * qu'un signal de proximité.
 *
 * La ville et la région viennent de `SITE_IDENTITY`, qui reste la source unique de la
 * localisation. Dunkerque est écrite en clair : c'est un fait de parcours, pas la
 * localisation de l'activité, et elle n'a rien à faire dans les données structurées.
 */
export const ANCRAGE_REGIONAL =
  `Je travaille depuis ${SITE_IDENTITY.ville}, et c’est aussi en ${SITE_IDENTITY.region} que je me ` +
  'suis formé : Bac +3 Développeur à Dunkerque en 2022, puis Bac +5 Expert en informatique et ' +
  `systèmes d’information à ${SITE_IDENTITY.ville} en 2025. Ces diplômes ne sont pas l’argument ` +
  'de ce site, les neuf ans et les chiffres plus haut le sont. Ils situent, rien de plus : j’y ' +
  'suis installé, pas de passage.'

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
