// types.ts — jeromemarichez2026
// UNIQUEMENT des alias de types (unions, utilitaires, primitives nommées).
// Les entités métier sont des interfaces (IXxx) dans des fichiers dédiés de ce dossier.
// Convention : docs/architecture.md.

/** Clé stable d'une offre de service. Sert d'identifiant et de segment d'URL. */
export type CleOffre = 'ingenierie-web' | 'data-ia' | 'seo-sea'

/** Niveau de diplôme, tel qu'inscrit sur les CV de référence. */
export type NiveauFormation = 'Bac +3' | 'Bac +5'

/**
 * Justificatif officiel d'une certification.
 *
 * Union discriminée volontaire : la variante `a-fournir` ne porte **aucune** propriété
 * `url`. Lire `justificatif.url` sans avoir narrowé sur `statut === 'disponible'` est
 * donc une erreur de compilation, et il devient impossible d'afficher un lien mort ou
 * inventé. Tant qu'une URL n'a pas été fournie par Jérôme MARICHEZ, la certification
 * reste en `a-fournir`. Règle : CLAUDE.md, « Règles de véracité du contenu ».
 */
export type Justificatif =
  | { readonly statut: 'disponible'; readonly url: string }
  | { readonly statut: 'a-fournir' }
