// contact-page.ts — jeromemarichez2026
// Entité éditoriale : les libellés propres à la page « /contact ».
//
// CETTE PAGE N'A PAS DE FORMULAIRE — arbitrage de Jérôme MARICHEZ du 2026-08-08. Le
// service d'acheminement des messages n'est pas choisi ; un formulaire qui afficherait
// « message envoyé » sans rien envoyer serait pire que pas de formulaire. Il n'y a donc
// ici ni champ, ni schéma d'envoi, ni route back — et le modèle ci-dessous n'en prévoit
// aucun : un type qui décrirait un formulaire absent inviterait à le rendre.
//
// Les COORDONNÉES ne sont pas dans ce fichier : elles viennent de `content/identite.ts`,
// point unique du site. Ce fichier ne porte que la façon de les présenter.
import type { IReferenceProfil } from './profil-public'

/** Bloc d'ouverture : le seul `h1` de la page et son chapô. */
interface IEnteteContact {
  readonly titre: string
  readonly lead: string
}

/** Les coordonnées directes et la façon de les nommer. */
interface ISectionCoordonnees {
  readonly titre: string
  /** Étiquette de l'adresse e-mail dans la liste de définitions. */
  readonly libelleEmail: string
  readonly libelleTelephone: string
  /**
   * Profils publics à afficher, par référence. Les URL restent dans `identite`, seul
   * endroit du site où une URL de profil est écrite.
   */
  readonly profils: readonly IReferenceProfil[]
}

/** L'absence de formulaire, expliquée plutôt que subie. */
interface ISectionSansFormulaire {
  readonly titre: string
  readonly texte: string
}

/**
 * Mention RGPD de la page.
 *
 * `mentions` est une liste et non un pavé : chaque point répond à une question
 * différente (ce qui est collecté, à qui appartiennent les coordonnées affichées, ce que
 * devient un message reçu). Un lecteur d'écran les énumère, et l'ajout d'un point le jour
 * où un formulaire existera ne demandera pas de réécrire une phrase.
 */
interface ISectionRgpd {
  readonly titre: string
  readonly mentions: readonly string[]
}

/** Libellés de la page de contact. */
export interface IContactPage {
  readonly meta: {
    readonly titre: string
    readonly description: string
  }
  readonly entete: IEnteteContact
  readonly coordonnees: ISectionCoordonnees
  readonly sansFormulaire: ISectionSansFormulaire
  readonly rgpd: ISectionRgpd
}
