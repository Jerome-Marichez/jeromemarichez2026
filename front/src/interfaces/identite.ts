// identite.ts — jeromemarichez2026
// Entité éditoriale : l'identité professionnelle publique de Jérôme Marichez.
//
// Cette entité existe pour une raison précise : les métadonnées SEO et les DONNÉES
// STRUCTURÉES (JSON-LD) doivent être alimentées par de la donnée typée et validée, et
// non par du texte en dur semé dans le layout et les composants. Le nom, l'intitulé et
// la ville se disent au même endroit que le reste du contenu éditorial.
//
// Elle ne porte QUE des informations professionnelles publiques : aucune coordonnée
// personnelle, aucune adresse postale, aucun numéro. Contraintes RGPD du `README.md` et
// règles de véracité du `CLAUDE.md`.
export interface IIdentite {
  readonly nom: string
  /** Intitulé professionnel, tel qu'il est revendiqué dans le `README.md`. */
  readonly titreProfessionnel: string
  /** Ville d'exercice. Seule granularité géographique publique : jamais de rue. */
  readonly ville: string
  /** Code pays ISO 3166-1 alpha-2. */
  readonly codePays: string
  /** Promesse centrale du site, reprise du `README.md`. */
  readonly promesse: string
  /**
   * Meta description du site. Bornée à 160 caractères par le schéma : au-delà, les
   * moteurs tronquent — la contrainte est donc tenue au build, pas à la relecture.
   */
  readonly descriptionSite: string
  /**
   * Profils publics vérifiables, destinés au `sameAs` des données structurées.
   *
   * Même garde-fou que les justificatifs de certification : une URL de profil ne
   * s'invente ni ne s'approxime. Tant qu'une URL n'a pas été fournie par Jérôme
   * MARICHEZ, elle n'entre pas ici — un `sameAs` erroné associe l'identité du site à
   * un tiers, ce qui est pire que l'absence de `sameAs`.
   */
  readonly profilsPublics: readonly string[]
}
