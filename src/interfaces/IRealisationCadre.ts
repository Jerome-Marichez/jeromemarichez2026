// IRealisationCadre.ts — jeromemarichez-fr
// Le cadre d'emploi d'une réalisation : sous quel statut, quand, et avec qui.

/**
 * Le cadre réel dans lequel une réalisation a été menée.
 *
 * **Aucun champ n'est optionnel, et c'est tout l'objet de cette entité.** Un espace de
 * réalisations dérive de lui-même vers « mon client X » : les entreprises citées ici sont
 * des **employeurs**, jamais des clients, et le `CLAUDE.md` impose de reprendre les
 * intitulés de poste à l'identique des CV de référence, sans réécriture pour coller à une
 * offre de service.
 *
 * Rendre ce cadre facultatif reviendrait à autoriser une fiche à paraître sans dire d'où
 * elle vient — et une fiche sans provenance se lit comme une prestation vendue. Le
 * compilateur ferme cette porte : c'est le seul garde-fou qui ne s'oublie pas en
 * relecture.
 */
export interface IRealisationCadre {
  /** Employeur, nommé tel quel. Jamais présenté comme un client. */
  employeur: string
  /** Intitulé de poste, repris à l'identique du CV de référence. Jamais réécrit. */
  poste: string
  /** Période d'occupation du poste, au format `AAAA-AAAA`. */
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
