/**
 * Un article de blog, porté tel quel depuis l'ancien site (voir CLAUDE.md,
 * « on le porte, on ne le réécrit pas »). Le corps est une chaîne HTML écrite à
 * la main : il n'y a ni CMS, ni source distante, ni rendu Markdown, cinq
 * articles ne justifiant aucun de ces mécanismes.
 *
 * `source` reste optionnel : un seul des cinq articles a d'abord paru ailleurs
 * (un post LinkedIn de Jérôme MARICHEZ), les quatre autres sont natifs à ce site.
 */
export interface IArticle {
  slug: string
  titre: string
  chapo: string
  /** Description courte (moins de 160 caractères) pour la balise meta de la page article. */
  metaDescription: string
  /** Date ISO (AAAA-MM-JJ) de publication sur ce site. */
  datePublication: string
  /**
   * Le corps de l'article, en HTML écrit à la main et injecté directement.
   *
   * Sans risque ici : ce contenu est écrit dans le dépôt et compilé au build,
   * jamais reçu d'un visiteur. Si une source externe (CMS, formulaire, API)
   * alimente un jour ce champ, cette hypothèse devient fausse et l'injection
   * directe doit être retirée avant tout le reste.
   */
  corpsHtml: string
  source?: {
    reseau: string
    url: string
  }
}
