// accueil.ts — jeromemarichez2026
// Entité éditoriale : le contenu propre à la page d'accueil.
//
// Tout le texte affiché par la page d'accueil est décrit ici et renseigné dans
// content/accueil.ts. Aucune vue n'écrit de texte éditorial : ajouter, corriger ou
// faire relire une formulation ne demande jamais de toucher au rendu
// (docs/architecture.md — « le contenu éditorial est de la donnée, pas du JSX »).
import type { IAppelAction } from './appel-action'
import type { IColonneConstat } from './colonne-constat'
import type { IMaillonChaine } from './maillon-chaine'
import type { IPointEntree } from './point-entree'
import type { IReferencePreuve } from './reference-preuve'

/** Métadonnées de la route, consommées par l'export `metadata` de app/page.tsx. */
interface IMetaAccueil {
  readonly titre: string
  readonly description: string
}

/** Accroche de la page : le seul `h1` du document et la promesse qu'il porte. */
interface IAccrocheAccueil {
  /** Unique `h1` de la page. Porte la promesse d'interlocuteur unique. */
  readonly titre: string
  readonly lead: string
  readonly actionPrincipale: IAppelAction
  readonly actionSecondaire: IAppelAction
}

/**
 * Section de la chaîne : l'enchaînement des quatre maillons, illustré par un scénario
 * e-commerce.
 *
 * `avertissement` n'est pas optionnel. Le scénario est illustratif et doit être annoncé
 * comme tel DANS LE TEXTE VISIBLE : Jérôme n'a aucune référence client publiable, et il
 * n'a jamais mené cette chaîne complète chez un même e-commerçant — le taggage GTM
 * relève de la période Acetelecom / MailingVox, l'e-commerce de la période Verhoeven
 * Joaillier. Rendre le champ obligatoire met cette exigence dans le TYPE : une chaîne
 * sans avertissement ne compile pas (CLAUDE.md — « Règles de véracité du contenu »).
 */
interface ISectionChaine {
  readonly titre: string
  readonly lead: string
  /** Étiquette courte de l'avertissement, affichée comme une pastille. */
  readonly libelleAvertissement: string
  /** Mention visible du caractère illustratif du scénario. Jamais vide. */
  readonly avertissement: string
  /** Amorce du rang, complétée par le numéro du maillon : « Étape 1 ». */
  readonly libelleEtape: string
  /** Étiquette introduisant `IMaillonChaine.illustration`. */
  readonly libelleIllustration: string
  /** Étiquette introduisant les offres qui couvrent le maillon. */
  readonly libelleRattachement: string
  readonly maillons: readonly IMaillonChaine[]
}

/** Section des deux points d'entrée : elle permet au visiteur de se situer. */
interface ISectionPointsEntree {
  readonly titre: string
  readonly lead: string
  /** Étiquette introduisant le chemin d'étapes d'un point d'entrée. */
  readonly libelleChemin: string
  readonly points: readonly IPointEntree[]
}

/**
 * Section du « pourquoi » : d'où vient la promesse d'interlocuteur unique.
 *
 * Le texte s'énonce À LA PREMIÈRE PERSONNE, depuis l'expérience vécue — jamais comme
 * un jugement sur une profession. `references` désigne des preuves déjà écrites et
 * relues dans `content/offres/` : la section ne peut donc avancer aucun chiffre qui ne
 * soit pas déjà une preuve établie du parcours (issue #19, règle de formulation).
 */
interface ISectionPourquoi {
  readonly titre: string
  /** L'entrée en matière, à la première personne : « j'ai vu que… ». */
  readonly lead: string
  /** Les deux jeux de chiffres qui ne se rencontrent pas. */
  readonly colonnes: readonly IColonneConstat[]
  /** Ce que le constat implique. Porte sur un dispositif, jamais sur des personnes. */
  readonly conclusion: string
  readonly references: readonly IReferencePreuve[]
}

/** Section des trois offres. Les offres elles-mêmes viennent de `content/offres/`. */
interface ISectionOffres {
  readonly titre: string
  readonly lead: string
  /** Étiquette introduisant `IOffre.decisionPermise` sur chaque carte. */
  readonly libelleDecision: string
  /**
   * Amorce du libellé de lien, complétée par le titre de l'offre : les trois liens
   * restent ainsi distincts et explicites hors contexte (WCAG 2.4.4).
   */
  readonly libelleLien: string
}

/** Section des preuves. Les textes viennent des offres, par référence. */
interface ISectionPreuves {
  readonly titre: string
  readonly lead: string
  readonly references: readonly IReferencePreuve[]
}

/** Appel à contact fermant la page. */
interface ISectionContact {
  readonly titre: string
  readonly lead: string
  readonly action: IAppelAction
}

/**
 * Contenu éditorial complet de la page d'accueil.
 *
 * L'ordre des champs est l'ordre de lecture de la page : la promesse, la chaîne, où
 * l'on y entre, d'où vient la promesse, les trois pôles, les preuves, l'action
 * attendue.
 */
export interface IAccueil {
  readonly meta: IMetaAccueil
  readonly accroche: IAccrocheAccueil
  readonly chaine: ISectionChaine
  readonly pointsEntree: ISectionPointsEntree
  readonly pourquoi: ISectionPourquoi
  readonly offres: ISectionOffres
  readonly preuves: ISectionPreuves
  readonly contact: ISectionContact
}
