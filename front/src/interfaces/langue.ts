// langue.ts — jeromemarichez2026
// Entité éditoriale : une compétence linguistique, avec son niveau et son référentiel.
//
// Pourquoi cette entité existe : les trois CV de référence classent « Anglais, B2
// (EF SET, CECRL) » sous la rubrique **Langues**, jamais parmi les certifications. EF SET
// est le test qui a évalué le niveau, pas un titre professionnel obtenu — le laisser dans
// la liste des certifications gonflait celle-ci d'une ligne qui n'y a pas sa place.

/**
 * Une langue pratiquée et le niveau qui lui est reconnu.
 *
 * `niveau` et `referentiel` sont indissociables : « B2 » ne veut rien dire sans le
 * référentiel qui le définit, et un niveau annoncé sans son cadre d'évaluation est
 * exactement le genre d'affirmation invérifiable que les règles de véracité écartent.
 */
export interface ILangue {
  readonly cle: string
  /** Nom de la langue, en français : « Anglais ». */
  readonly nom: string
  /** Étiquette BCP 47 de la langue (`en`, `fr`) — destinée au JSON-LD. */
  readonly code: string
  /** Niveau atteint, tel qu'exprimé dans le référentiel : « B2 ». */
  readonly niveau: string
  /** Référentiel qui définit le niveau : « CECRL ». */
  readonly referentiel: string
  /**
   * Organisme ou test ayant évalué le niveau (« EF SET »), ou `null` si l'évaluation
   * n'est pas établie. Ce n'est **pas** une certification professionnelle : la
   * distinction est portée par le modèle, pas par la vigilance du rédacteur.
   */
  readonly evaluePar: string | null
}
