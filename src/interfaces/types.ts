// types.ts — jeromemarichez-fr
// UNIQUEMENT des alias de types (unions, utilitaires, primitives nommées).
// Les entités métier sont des interfaces (IXxx) dans des fichiers dédiés de ce dossier.
// Convention : docs/architecture.md.

/** Les trois pôles vendus par le site, dans l'ordre de la chaîne. */
export type PoleId = 'ingenierie-web' | 'data-ia' | 'sea-ux'

/** Rang du pôle dans la chaîne : construire, exploiter et mesurer, arbitrer. */
export type PoleRank = 1 | 2 | 3

/**
 * Nature d'une section éditoriale — elle commande le rendu.
 *
 * `pole` et `chapitre` ne sont pas la même chose, et les confondre coûte cher :
 * - `pole` est une section de l'**accueil** qui porte un pôle entier. Il y en a autant
 *   que de pôles vendus, et leur nombre bouge quand l'offre bouge.
 * - `chapitre` est une subdivision **interne** à une page de pôle. Son nombre n'a aucun
 *   rapport avec le nombre de pôles : c'est le découpage du récit d'une seule page.
 *
 * `charniere` désigne les sections qui passent la main d'un pôle au suivant : elles
 * portent le récit de continuité et se rendent différemment des autres.
 * `fil` désigne un axe transverse — une méthode qui traverse les pôles au lieu de
 * s'intercaler entre deux. Un `fil` ne reçoit jamais le verre : le vitrer en ferait une
 * offre de plus, alors qu'il décrit la façon de tenir les autres.
 */
export type SectionKind = 'pole' | 'chapitre' | 'charniere' | 'fil' | 'preuves'
