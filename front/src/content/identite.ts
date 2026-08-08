// identite.ts — jeromemarichez2026
// Identité professionnelle publique. Sources : README.md (positionnement, promesse
// centrale) et CLAUDE.md (présentation).
//
// Véracité — points tenus ici :
// - « Ingénieur logiciel » et « Lille » sont repris du README.md, sans extension. Aucun
//   titre plus vendeur (« expert », « consultant senior ») n'est introduit ici.
// - Les COORDONNÉES (e-mail, téléphone) ont été arbitrées et validées explicitement par
//   Jérôme MARICHEZ le 2026-08-08, après recoupement de ses trois CV de référence. Elles
//   sont les siennes et déjà publiques. En revanche, toujours AUCUNE adresse postale :
//   la ville reste la seule granularité géographique établie, et une rue ne s'invente pas
//   (règles de véracité du CLAUDE.md, contrainte RGPD du README.md). Pas davantage
//   d'horaires, de délai de réponse ni de fourchette tarifaire : rien de tout cela n'est
//   établi.
// - `profilsPublics` ne contient que des URL VÉRIFIÉES. github.com/Jerome-Marichez est
//   le compte propriétaire du dépôt de ce site (Jerome-Marichez/jeromemarichez2026,
//   public, intitulé « Jérôme MARICHEZ ») ; l'URL LinkedIn a été fournie par Jérôme
//   MARICHEZ le 2026-08-08. Malt, Twitter et les autres profils restent absents tant
//   qu'ils n'ont pas été fournis — un `sameAs` erroné rattache l'identité du site à un
//   tiers, ce qui est pire que l'absence de `sameAs`.
// - `langues` reprend la rubrique « Langues » des trois CV : « Anglais, B2 (EF SET,
//   CECRL) ». EF SET y est le TEST qui a évalué le niveau, pas une certification
//   professionnelle — il ne figure donc plus dans `certifications.ts`. Aucune autre
//   langue n'est déclarée : le français maternel n'est écrit sur aucune des sources
//   retenues, et il ne s'ajoute pas par déduction.
import type { IIdentite } from '../interfaces/identite'
import { identiteSchema } from '../schemas/identite.schema'

const donnees = {
  nom: 'Jérôme Marichez',
  titreProfessionnel: 'Ingénieur logiciel',
  ville: 'Lille',
  codePays: 'FR',
  promesse:
    'Un seul interlocuteur humain pour vos projets digitaux, aucune sous-traitance : celui qui cadre est celui qui code, mesure et exploite.',
  descriptionSite:
    'Ingénierie web, data & IA, SEA. Un seul interlocuteur pour vos projets digitaux, sans sous-traitance.',
  contact: {
    email: 'jeromemarichez@ik.me',
    // Format national ; l'E.164 (`+33771651588`) en est dérivé par `utils/telephone.ts`.
    telephone: '07 71 65 15 88',
  },
  langues: [
    {
      cle: 'anglais',
      nom: 'Anglais',
      code: 'en',
      niveau: 'B2',
      referentiel: 'CECRL',
      evaluePar: 'EF SET',
    },
  ],
  profilsPublics: [
    'https://github.com/Jerome-Marichez',
    'https://www.linkedin.com/in/jerome-marichez-31948712b',
  ],
} satisfies IIdentite

/** Validée au chargement : une donnée non conforme échoue au build, pas en production. */
export const identite: IIdentite = identiteSchema.parse(donnees)
