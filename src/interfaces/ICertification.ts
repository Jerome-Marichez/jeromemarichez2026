/**
 * Une certification. `annee` est `null` quand la date n'est pas tranchée (voir le
 * commentaire sur Google Ads dans `src/contenu/certifications.ts`), `justificatif`
 * est `null` tant qu'aucune URL réelle n'a été fournie par Jérôme MARICHEZ : jamais
 * une URL inventée ni un lien mort.
 */
export interface ICertification {
  nom: string
  organisme: string
  annee: number | null
  justificatif: string | null
}
