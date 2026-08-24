// IArticleSection.ts — jeromemarichez-fr
// Une section d'article : un titre, ses paragraphes, et — quand la forme l'exige — une liste.

/**
 * Section du corps d'un article.
 *
 * Volontairement pauvre : un titre, des paragraphes, éventuellement une liste. Un article
 * du site n'est pas un gabarit de page — lui donner des blocs, des encarts et des niveaux
 * de titre libres reviendrait à réinventer un éditeur, et à ouvrir la porte à des articles
 * qui ne se ressemblent plus. Le jour où un article demande davantage, c'est le modèle
 * qu'on élargit, pas le rendu qu'on contourne : `liste` est cet élargissement-là
 * (issue #121), et il s'est arrêté à un champ.
 */
export interface IArticleSection {
  /** Identifiant kebab-case, sert d'ancre (`#id`) et de cible aux liens profonds. */
  id: string
  /** Titre de la section, rendu en `<h2>`. */
  titre: string
  /** Paragraphes de la section. Texte fini, publiable tel quel. */
  paragraphes: string[]
  /**
   * Points listés, rendus en `<ul>` **après** les paragraphes, à la fin de la section.
   *
   * Le champ existe parce que deux articles repris de posts portent une énumération dont
   * la valeur tient à la forme : chaque point est une observation distincte, et l'un
   * d'eux porte la seule preuve vérifiable de son article. Fondue en prose,
   * l'énumération se dilue — et un lecteur d'écran cesse d'annoncer « liste de quatre
   * éléments », ce qui est précisément l'information qu'un texte suivi ne donne pas.
   *
   * Trois limites tiennent la pauvreté du modèle, et elles sont le prix du champ :
   *
   * - **la liste ferme la section.** Aucun paragraphe ne la suit ; un texte qui doit
   *   reprendre après une liste ouvre une nouvelle section. C'est ce qui interdit à
   *   `IArticleSection` de devenir une suite de blocs libres : l'ordre du rendu est
   *   porté par le type, jamais par l'ordre de saisie de la donnée ;
   * - **un point est une phrase finie**, ponctuée comme un paragraphe. Pas de titre de
   *   point, pas de sous-liste, pas de lien ;
   * - **une seule liste par section.** Deux énumérations dans une même section sont deux
   *   sections.
   *
   * Une liste vide ne se déclare pas : le champ s'omet. Le rendu n'écrit alors aucun
   * `<ul>`, comme il n'écrit pas de paragraphe vide.
   */
  liste?: string[]
}
