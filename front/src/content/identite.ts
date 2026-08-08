// identite.ts — jeromemarichez2026
// Identité professionnelle publique. Sources : README.md (positionnement, promesse
// centrale) et CLAUDE.md (présentation).
//
// Véracité — points tenus ici :
// - « Ingénieur logiciel » et « Lille » sont repris du README.md, sans extension. Aucun
//   titre plus vendeur (« expert », « consultant senior ») n'est introduit ici.
// - AUCUNE coordonnée : ni adresse postale, ni téléphone, ni e-mail. La ville est la
//   seule granularité géographique établie et publique ; une adresse ne s'invente pas
//   (règles de véracité du CLAUDE.md, contrainte RGPD du README.md).
// - `profilsPublics` ne contient que des URL VÉRIFIÉES. github.com/Jerome-Marichez est
//   le compte propriétaire du dépôt de ce site (Jerome-Marichez/jeromemarichez2026,
//   public, intitulé « Jérôme MARICHEZ ») : l'identité est donc établie, pas supposée.
//   LinkedIn, Malt et les autres profils restent absents tant que Jérôme MARICHEZ ne les
//   a pas fournis — un `sameAs` erroné rattache l'identité du site à un tiers.
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
    'Ingénierie web, data & IA, SEO/SEA. Un seul interlocuteur pour vos projets digitaux, sans sous-traitance.',
  profilsPublics: ['https://github.com/Jerome-Marichez'],
} satisfies IIdentite

/** Validée au chargement : une donnée non conforme échoue au build, pas en production. */
export const identite: IIdentite = identiteSchema.parse(donnees)
