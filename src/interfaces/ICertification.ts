/**
 * Une certification.
 *
 * **Aucune année.** Décision de Jérôme MARICHEZ le 2026-09-20 : les
 * certifications ne portent pas de date, et c'est **l'ordre de déclaration** dans
 * `src/contenu/certifications.ts` qui fait le classement. Le champ a donc été
 * retiré plutôt que laissé inutilisé : une donnée qu'on ne rend plus finit par
 * dériver sans que personne s'en aperçoive. Cette décision clôt au passage la
 * question de l'année de Google Ads, que les CV et un arbitrage antérieur
 * contredisaient.
 *
 * `justificatif` reste `null` tant qu'aucune URL réelle n'a été fournie. Une URL
 * de certification ne s'invente ni ne s'approxime, et un lien mort est pire que
 * pas de lien.
 */
export interface ICertification {
  nom: string
  organisme: string
  justificatif: string | null
}
