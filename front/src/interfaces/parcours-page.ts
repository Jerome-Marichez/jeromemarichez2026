// parcours-page.ts — jeromemarichez2026
// Entité éditoriale : les libellés propres à la page « /parcours ».
//
// PÉRIMÈTRE STRICT, comme `offre-page.ts` : ce fichier ne porte que la CHARPENTE de la
// page — titre, chapô, intitulés de section, étiquettes. Il ne dit rien du parcours
// lui-même. Les expériences, les formations et les certifications viennent de
// `content/experiences.ts`, `content/formations.ts` et `content/certifications.ts`, qui
// font foi et ne sont pas touchés : la page les affiche, elle ne les réécrit pas.
import type { IAppelAction } from './appel-action'
import type { IImageIllustration } from './image-illustration'

/** Bloc d'ouverture : le seul `h1` de la page, son chapô et son illustration. */
interface IEnteteParcours {
  readonly titre: string
  readonly lead: string
  readonly illustration: IImageIllustration
}

/** Appel à contact fermant la page. Même rôle que celui des pages d'offre. */
interface ISectionContactParcours {
  readonly titre: string
  readonly lead: string
  readonly action: IAppelAction
}

/**
 * Libellés de la page parcours.
 *
 * Aucun champ ne porte d'affirmation vérifiable : ce sont des intitulés de section. Les
 * faits — durées, budgets, résultats — vivent tous dans `content/experiences.ts`, seul
 * corpus relu contre les règles de véracité du CLAUDE.md.
 */
export interface IParcoursPage {
  /** Titre et description SEO, consommés par `buildPageMetadata`. */
  readonly meta: {
    readonly titre: string
    readonly description: string
  }
  readonly entete: IEnteteParcours
  /** Titre de la section qui énumère les expériences, de la plus récente à la plus ancienne. */
  readonly titreExperiences: string
  readonly titreFormations: string
  readonly titreCertifications: string
  /**
   * Amorce du libellé menant au justificatif d'une certification.
   *
   * Amorce et non libellé complet : trois liens voisins portant le même texte seraient
   * indiscernables une fois restitués hors contexte (WCAG 2.4.4). Le rendu la complète
   * par l'intitulé de la certification.
   *
   * Aucune certification ne porte de justificatif à ce jour — ce libellé n'est donc
   * affiché nulle part aujourd'hui. Il existe pour le jour où une URL sera fournie :
   * l'alternative aurait été de l'écrire dans le rendu à ce moment-là, c'est-à-dire
   * d'écrire du texte éditorial dans du JSX.
   */
  readonly libelleJustificatif: string
  readonly contact: ISectionContactParcours
}
