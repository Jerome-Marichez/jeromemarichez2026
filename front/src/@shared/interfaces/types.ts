// types.ts — domaine @shared
// UNIQUEMENT des alias de types (unions, utilitaires). Les entités du domaine sont des
// interfaces `IXxx` dans des fichiers dédiés de ce dossier. Convention : CLAUDE.md.

/**
 * Un nœud de données structurées schema.org.
 *
 * Volontairement ouvert : le vocabulaire schema.org est trop large pour être typé
 * exhaustivement, et un typage partiel donnerait une fausse garantie. La véracité des
 * nœuds est assurée en amont — ils sont construits à partir du contenu typé et validé
 * par Zod de `src/content/`, jamais à partir de texte en dur.
 */
export type JsonLdNode = Readonly<Record<string, unknown>>

/**
 * Un graphe JSON-LD complet, prêt à être injecté dans un `<script type="application/ld+json">`.
 * Un seul graphe par page : les nœuds y sont reliés par leurs `@id` plutôt que dupliqués.
 */
export type JsonLdGraph = Readonly<{
  '@context': string
  '@graph': readonly JsonLdNode[]
}>
