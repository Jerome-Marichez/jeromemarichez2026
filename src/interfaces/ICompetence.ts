/**
 * L'ancrage de preuve d'une famille : le projet réel de `src/contenu/projets/`
 * où elle a servi. Le titre est repris tel quel du projet, jamais reformulé,
 * pour qu'un rapprochement faux ne puisse pas naître d'une paraphrase.
 */
export interface IAncrageCompetence {
  titreProjet: string
}

/** Une famille de compétences (« Front & design system », « Data & IA », ...) et ses items courts. */
export interface ICompetence {
  famille: string
  items: string[]
  /**
   * Absent quand aucun projet de `src/contenu/projets/` ne traite explicitement
   * la famille : une famille sans ancrage est acceptable, un rapprochement
   * approximatif ne l'est pas (CLAUDE.md, table des interdits).
   */
  ancrage?: IAncrageCompetence
}
