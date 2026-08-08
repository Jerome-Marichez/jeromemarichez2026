// accueil.ts — jeromemarichez2026
// Entité éditoriale : le contenu propre à la page d'accueil.
//
// Tout le texte affiché par la page d'accueil est décrit ici et renseigné dans
// content/accueil.ts. Aucune vue n'écrit de texte éditorial : ajouter, corriger ou
// faire relire une formulation ne demande jamais de toucher au rendu
// (docs/architecture.md — « le contenu éditorial est de la donnée, pas du JSX »).
import type { IAppelAction } from './appel-action'
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

/** Contenu éditorial complet de la page d'accueil. */
export interface IAccueil {
  readonly meta: IMetaAccueil
  readonly accroche: IAccrocheAccueil
  readonly offres: ISectionOffres
  readonly preuves: ISectionPreuves
  readonly contact: ISectionContact
}
