// accueil.ts — jeromemarichez2026
// Contenu éditorial de la page d'accueil.
//
// Sources de vérité, dans cet ordre : README.md (positionnement, promesse centrale,
// arborescence) puis CLAUDE.md (ligne éditoriale et règles de véracité).
//
// Véracité — points tenus ici :
// - La promesse est reprise dans les termes du README : « un seul interlocuteur […]
//   aucune sous-traitance — celui qui cadre est celui qui code, mesure et exploite ».
// - « neuf ans », « en petite équipe ou en autonomie complète » et « décisions
//   techniques assumées en production » viennent du tableau de positionnement du
//   README. Aucun chiffre n'est arrondi ni extrapolé.
// - AUCUNE preuve n'est réécrite ici : la section « preuves » ne contient que des
//   RÉFÉRENCES vers des preuves déjà rédigées et relues dans content/offres/.
//   Une preuve recopiée pourrait diverger de sa page d'offre ; une preuve saisie
//   directement échapperait à la relecture de véracité.
// - Aucun délai de réponse n'est annoncé : aucun engagement de ce type n'est établi.
// - Aucun emoji, aucun superlatif (CLAUDE.md, « Ligne éditoriale »).
import type { IAccueil } from '../interfaces/accueil'
import { accueilSchema } from '../schemas/accueil.schema'

const donnees = {
  meta: {
    // Titre appliqué en `absolute` par app/page.tsx : la page d'accueil porte
    // l'identité complète et ne doit pas être suffixée une seconde fois.
    titre: 'Jérôme Marichez — Ingénieur logiciel à Lille',
    description:
      'Ingénierie web, data et IA, SEA à Lille. Un seul interlocuteur pour vos projets digitaux : celui qui cadre est celui qui code, mesure et exploite.',
  },

  accroche: {
    // Unique h1 du document. Porte l'identité et le lieu (référencement) ET la
    // promesse centrale du site (README.md).
    titre: 'Ingénieur logiciel à Lille : un seul interlocuteur pour vos projets digitaux',
    lead: 'Pas de chaîne de prestataires : celui qui cadre est celui qui code, mesure et exploite. En neuf ans, j’ai travaillé en petite équipe ou en autonomie complète, avec des décisions techniques assumées en production.',
    actionPrincipale: { href: '/contact', libelle: 'Discuter de votre projet' },
    actionSecondaire: { href: '/parcours', libelle: 'Voir mon parcours' },
  },

  offres: {
    titre: 'Trois offres, un seul interlocuteur',
    lead: 'Chaque offre se termine sur ce que vous pouvez décider, pas sur une liste d’outils.',
    libelleDecision: 'Ce que vous décidez',
    // Complété par le titre de l'offre : « Voir l'offre Ingénierie Web ». Les trois
    // liens restent distincts et compréhensibles hors contexte (WCAG 2.4.4).
    libelleLien: 'Voir l’offre',
  },

  preuves: {
    titre: 'Ce qui rend ces offres crédibles',
    lead: 'Chaque affirmation de ce site porte sa preuve : un chiffre, une durée ou une contrainte tenue. Voici celles qui sont publiables.',
    // Les cinq preuves listées au README, plus le développement en IA augmentée
    // piloté par les tests — différenciateur que le CLAUDE.md impose de faire
    // apparaître partout où le site parle de programmation.
    // Ordre : les trois offres sont représentées dès les trois premières lignes.
    references: [
      { offre: 'ingenierie-web', axe: 'ui-ux' },
      { offre: 'sea', axe: 'sea-pilotage' },
      { offre: 'data-ia', axe: 'data-mining' },
      { offre: 'ingenierie-web', axe: 'migrations' },
      { offre: 'ingenierie-web', axe: 'front-end' },
      { offre: 'ingenierie-web', axe: 'ia-augmentee' },
    ],
  },

  contact: {
    titre: 'Parlons de votre projet',
    lead: 'Décrivez votre besoin en quelques lignes : cadrage, développement, mise en production, mesure. C’est moi qui lis et qui réponds.',
    action: { href: '/contact', libelle: 'Me contacter' },
  },
} satisfies IAccueil

/** Validé au chargement : une donnée non conforme échoue au build, pas en production. */
export const accueil: IAccueil = accueilSchema.parse(donnees)
