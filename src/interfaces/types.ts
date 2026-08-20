// types.ts — jeromemarichez-fr
// UNIQUEMENT des alias de types (unions, utilitaires, primitives nommées).
// Les entités métier sont des interfaces (IXxx) dans des fichiers dédiés de ce dossier.
// Convention : docs/architecture.md.

/** Les trois pôles vendus par le site, dans l'ordre de la chaîne. */
export type PoleId = 'ingenierie-web' | 'data-ia' | 'sea-ux'

/** Rang du pôle dans la chaîne : construire, exploiter et mesurer, arbitrer. */
export type PoleRank = 1 | 2 | 3

/**
 * Nature d'une section éditoriale.
 * `charniere` désigne les deux sections qui passent la main d'un pôle au suivant :
 * elles portent le récit de continuité et se rendent différemment des autres.
 */
export type SectionKind = 'accroche' | 'pole' | 'charniere' | 'preuves' | 'contact'
