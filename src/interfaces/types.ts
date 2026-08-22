// types.ts — jeromemarichez-fr
// UNIQUEMENT des alias de types (unions, utilitaires, primitives nommées).
// Les entités métier sont des interfaces (IXxx) dans des fichiers dédiés de ce dossier.
// Convention : docs/architecture.md.

/** Les quatre pôles. `data` est le préalable de `ia` et de `sea-ux`. */
export type PoleId = 'ingenierie-web' | 'data' | 'ia' | 'sea-ux'

/**
 * Place dans la chaîne — PAS un ordinal.
 * `socle`   : on commence là quand le produit est à construire.
 * `passage` : tout ce qui suit y passe, et il se livre pour lui-même.
 * `suite`   : ce qui s'ouvre après la donnée. Il y en a DEUX, sans ordre entre elles.
 */
export type PolePlace = 'socle' | 'passage' | 'suite'

/**
 * Le temps de la chaîne où le pôle intervient.
 *
 * Ce n'est pas non plus un ordinal : **les deux suites partagent le temps 3**, et c'est
 * ce partage qui porte tout le sens. Numéroter les quatre pôles de 1 à 4 dirait « il les
 * faut tous les quatre, dans cet ordre » — l'inverse exact du modèle, où l'IA et le SEA
 * & UX s'ouvrent en parallèle et se prennent séparément ou ensemble.
 */
export type PoleTemps = 1 | 2 | 3

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
