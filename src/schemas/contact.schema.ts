// contact.schema.ts — jeromemarichez-fr
// La saisie du formulaire de contact. Seule entrée externe du site : il n'y a pas de
// serveur, donc pas d'API à valider — mais une saisie reste une donnée non maîtrisée,
// et c'est elle qui part composer une URL `mailto:`.
//
// Le type est dérivé du schéma (z.infer), jamais écrit à la main. Aucun cast direct.

import { z } from 'zod'
import { formatNumberFr } from '@/utils/format-number-fr'

/** Bornes de saisie. Exportées : le compteur du formulaire et les tests s'y adossent. */
export const LONGUEUR_MIN_NOM = 2
export const LONGUEUR_MAX_NOM = 80
export const LONGUEUR_MIN_SUJET = 3
export const LONGUEUR_MAX_SUJET = 120
export const LONGUEUR_MIN_MESSAGE = 20
export const LONGUEUR_MAX_MESSAGE = 1500

/**
 * Trois champs, et pas un de plus.
 *
 * Pas de champ « adresse de réponse » : le message part de la boîte du visiteur, donc son
 * adresse voyage déjà dans l'en-tête. La redemander produirait deux adresses susceptibles
 * de diverger, et une donnée collectée pour rien.
 *
 * `.trim()` s'applique avant les bornes : un champ rempli d'espaces est un champ vide, et
 * il doit être refusé comme tel plutôt que compté comme rempli.
 */
export const contactSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(LONGUEUR_MIN_NOM, 'Indiquez le nom sous lequel je vous réponds.')
    .max(
      LONGUEUR_MAX_NOM,
      `Ce nom dépasse ${formatNumberFr(LONGUEUR_MAX_NOM)} caractères, il faut le raccourcir.`,
    ),
  sujet: z
    .string()
    .trim()
    .min(LONGUEUR_MIN_SUJET, 'Donnez un sujet, même court : il devient l’objet du mail.')
    .max(
      LONGUEUR_MAX_SUJET,
      `Ce sujet dépasse ${formatNumberFr(LONGUEUR_MAX_SUJET)} caractères. Gardez une seule ligne, le détail va dans le message.`,
    ),
  message: z
    .string()
    .trim()
    .min(
      LONGUEUR_MIN_MESSAGE,
      'Le message est encore court. Quelques phrases sur votre situation suffisent.',
    )
    .max(
      LONGUEUR_MAX_MESSAGE,
      `Le message dépasse ${formatNumberFr(LONGUEUR_MAX_MESSAGE)} caractères. Résumez ici, vous complèterez dans votre client mail.`,
    ),
})

export type ContactInput = z.infer<typeof contactSchema>

/** Les champs du formulaire, dérivés du schéma : ajouter un champ met les deux à jour. */
export type ContactField = keyof ContactInput

/** L'ordre d'affichage et de parcours au clavier. Il fixe aussi l'ordre du résumé d'erreurs. */
export const CHAMPS_CONTACT: readonly ContactField[] = ['nom', 'sujet', 'message']
