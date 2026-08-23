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

/**
 * La figure qui illustre un article — un tracé nommé, jamais un fichier.
 *
 * Le site ne sert aucune image matricielle, et une illustration d'article n'allait pas
 * en introduire la première : chaque valeur de cette union désigne un tracé SVG rendu au
 * serveur par `@vitrine/components/ArticleFigure`. L'union est close, donc un article ne
 * peut pas réclamer une figure qui n'existe pas — le compilateur le dit avant le build.
 *
 * Les noms disent la STRUCTURE dessinée, pas le sujet de l'article : c'est la même règle
 * que les marques de pôle, dont aucune ne simule une donnée chiffrée.
 * `borne`        : ce qui est produit s'arrête à une ligne, et au-delà rien ne tourne.
 * `anteriorite`  : deux temps sur un axe, et le sens inverse écarté.
 * `appui`        : une décision en équilibre, portée par une assise mesurée.
 * `gabarit`      : une forme ouverte du côté de la sortie, et ce qui en sort déjà complet.
 * `liaison`      : des ensembles séparés, et un lien annoncé qui ne relie rien.
 */
export type ArticleFigureId = 'borne' | 'anteriorite' | 'appui' | 'gabarit' | 'liaison'

/**
 * Le réseau où un article a d'abord paru.
 *
 * Union close plutôt que texte libre : le libellé affiché (« LinkedIn », capitale et
 * casse comprises) se déduit de cette valeur au lieu d'être recopié dans chaque article,
 * où il finirait par varier. Un autre réseau s'ajoute ici, avec son libellé, jamais dans
 * un contenu.
 */
export type ArticleSourceReseau = 'linkedin'
