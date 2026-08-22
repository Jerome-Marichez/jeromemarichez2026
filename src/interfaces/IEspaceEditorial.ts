// IEspaceEditorial.ts — jeromemarichez-fr
// Un espace éditorial du site : `/realisations/` ou `/blog/`.
//
// Ce n'est ni un pôle ni une section. Un pôle se vend et porte une place dans la chaîne ;
// un espace éditorial ne se vend pas — il déplie. C'est pour ça qu'il a son propre type
// plutôt qu'un `IPole` amputé : les deux ne se rendent pas dans le même registre, et
// aucun code ne doit pouvoir les mélanger.

/** Identifiant d'un espace éditorial. Sert de clé de marque dessinée. */
export type EspaceId = 'realisations' | 'blog'

export interface IEspaceEditorial {
  id: EspaceId
  /** Le libellé exact repris de la navigation et du fil d'Ariane. */
  titre: string
  route: string
  /** Une ligne, pas un chapô : la carte est une entrée, pas une section. */
  accroche: string
  /**
   * Ce que l'espace contient, en clair. **Dérivé des listes sources**, jamais écrit à la
   * main : l'accueil ne peut donc pas annoncer un nombre que l'espace ne tient pas.
   */
  volume: string
}
