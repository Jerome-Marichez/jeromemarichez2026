// IRealisationChiffre.ts — jeromemarichez-fr
// Le chiffre d'une réalisation — la seule porte par laquelle un nombre entre dans une fiche.

/**
 * Un résultat chiffré, et ce qu'il ne dit pas.
 *
 * **Trois chiffres seulement sont publiables sur ce site** : le panier moyen de Verhoeven
 * Joaillier, le score Lighthouse de la plateforme SaaS livrée, le budget ADS / SEO piloté
 * chez Truffle Capital. Ce sont ceux du mur de preuves de l'accueil, et il n'en existe
 * pas d'autre qui soit sourcé mot pour mot.
 *
 * Toutes les autres fiches sont **sans chiffre** et portent au mieux un résultat
 * directionnel — « fraude en baisse », « routes vocales coûteuses évitées ». Concentrer
 * le nombre dans une entité dédiée le rend visible en revue : une quatrième fiche
 * chiffrée ne peut pas apparaître par inadvertance au détour d'un paragraphe.
 */
export interface IRealisationChiffre {
  /** Le chiffre, tel qu'il s'affiche. Identique au mur de preuves, au caractère près. */
  chiffre: string
  /** Ce que le chiffre mesure. Jamais élargi : « panier moyen » n'est pas « chiffre d'affaires ». */
  libelle: string
  /**
   * Ce que le chiffre **ne** dit **pas** : périmètre, base de comparaison, nature.
   *
   * Obligatoire, parce qu'un chiffre publié sans sa portée se fait élargir tout seul par
   * celui qui le lit. C'est ici qu'on écrit qu'un budget piloté n'est pas un résultat, et
   * qu'une hausse de panier moyen n'est ni du chiffre d'affaires ni un taux de conversion.
   */
  portee: string
}
