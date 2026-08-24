// IRealisationCadre.ts — jeromemarichez-fr
// Le cadre d'une réalisation : sous quel statut, pour qui, quand, et avec qui.

/**
 * Le cadre réel dans lequel une réalisation a été menée.
 *
 * **Aucun champ n'est optionnel, et c'est tout l'objet de cette entité.** Un espace de
 * réalisations dérive de lui-même vers « mon client X » : il faut donc dire de chaque
 * fiche sous quel statut elle a été menée — deux postes salariés et une mission en
 * indépendant — plutôt que de laisser le lecteur le supposer dans un sens ou dans l'autre.
 * Le `CLAUDE.md` impose par ailleurs de reprendre les intitulés de poste à l'identique des
 * CV de référence, sans réécriture pour coller à une offre de service.
 *
 * Rendre ce cadre facultatif reviendrait à autoriser une fiche à paraître sans dire d'où
 * elle vient — et une fiche sans provenance se lit comme une prestation vendue. Le
 * compilateur ferme cette porte : c'est le seul garde-fou qui ne s'oublie pas en
 * relecture.
 */
export interface IRealisationCadre {
  /**
   * Statut sous lequel le travail a été mené : « Poste salarié », « Mission en
   * indépendant ».
   *
   * Obligatoire au même titre que les trois autres, et pour la même raison : un cadre sans
   * statut redevient ambigu. C'est le champ qui manquait, et son absence a laissé publier
   * « trois postes salariés » alors que Truffle Capital (2017-2019) était une mission
   * menée en indépendant.
   */
  statut: string
  /** L'organisation, nommée telle quelle. C'est le statut qui dit à quel titre. */
  organisation: string
  /** Intitulé de poste, repris à l'identique du CV de référence. Jamais réécrit. */
  poste: string
  /** Période, au format `AAAA-AAAA`. */
  periode: string
  /**
   * Taille et nature de l'équipe, et ce qui y était encadré.
   *
   * Le champ existe pour empêcher la dérive la plus coûteuse du genre : « j'ai managé N
   * développeurs ». Ce qui est encadré, ce sont des équipes marketing et SEO/SEA, des
   * prestataires, des alternants et des stagiaires — le titre technique, lui, est Lead
   * Tech dans une équipe de deux développeurs et un product owner.
   */
  equipe: string
}
