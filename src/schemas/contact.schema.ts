// contact.schema.ts — jeromemarichez-fr
// La saisie du formulaire de contact. Seule entrée externe du site : il n'y a pas de
// serveur, donc pas d'API à valider — mais une saisie reste une donnée non maîtrisée,
// et c'est elle qui part composer une URL `mailto:`.
//
// Le type est dérivé du schéma (z.infer), jamais écrit à la main. Aucun cast direct.
//
// ## Pourquoi `zod/mini` plutôt que `zod`
//
// Ce schéma est le seul du site à être évalué dans le navigateur : sans serveur, la
// validation part avec la page. Or `import { z } from 'zod'` importe un objet de portée,
// dont chaque constructeur reste atteignable par une propriété : rien ne s'élague au
// groupage, et le site servait donc la totalité de Zod pour trois chaînes et six bornes.
// Mesuré sur l'accueil (issue #145) : 294 ko bruts, 68 ko transférés, dont Lighthouse
// relevait 82 % jamais exécutés. Ces octets arrivaient avant la peinture du titre, et
// c'est le titre qui porte le LCP.
//
// `zod/mini` est le même Zod : même noyau (`zod/v4/core`), même `safeParse`, mêmes
// `issues`, même `z.infer`. Seule l'écriture change — les contrôles sont des fonctions
// passées à `check()` au lieu de méthodes chaînées — et cette écriture-là s'élague : ne
// part que ce qui est nommé ici. La règle du `CLAUDE.md` est tenue à la lettre, la
// validation reste un schéma Zod dont le type est dérivé.
//
// L'ordre des contrôles est significatif, et il reproduit exactement l'ancien
// `.trim().min().max()` : `trim()` d'abord, les bornes ensuite, sur la valeur nettoyée.
// C'est aussi la valeur nettoyée qui ressort dans `data`, donc celle qui compose le
// `mailto:`.

import * as z from 'zod/mini'
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
 * `trim()` s'applique avant les bornes : un champ rempli d'espaces est un champ vide, et
 * il doit être refusé comme tel plutôt que compté comme rempli.
 */
export const contactSchema = z.object({
  nom: z
    .string()
    .check(
      z.trim(),
      z.minLength(LONGUEUR_MIN_NOM, 'Indiquez le nom sous lequel je vous réponds.'),
      z.maxLength(
        LONGUEUR_MAX_NOM,
        `Ce nom dépasse ${formatNumberFr(LONGUEUR_MAX_NOM)} caractères, il faut le raccourcir.`,
      ),
    ),
  sujet: z
    .string()
    .check(
      z.trim(),
      z.minLength(LONGUEUR_MIN_SUJET, 'Donnez un sujet, même court : il devient l’objet du mail.'),
      z.maxLength(
        LONGUEUR_MAX_SUJET,
        `Ce sujet dépasse ${formatNumberFr(LONGUEUR_MAX_SUJET)} caractères. Gardez une seule ligne, le détail va dans le message.`,
      ),
    ),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(
        LONGUEUR_MIN_MESSAGE,
        'Le message est encore court. Quelques phrases sur votre situation suffisent.',
      ),
      z.maxLength(
        LONGUEUR_MAX_MESSAGE,
        `Le message dépasse ${formatNumberFr(LONGUEUR_MAX_MESSAGE)} caractères. Résumez ici, vous complèterez dans votre client mail.`,
      ),
    ),
})

export type ContactInput = z.infer<typeof contactSchema>

/** Les champs du formulaire, dérivés du schéma : ajouter un champ met les deux à jour. */
export type ContactField = keyof ContactInput

/** L'ordre d'affichage et de parcours au clavier. Il fixe aussi l'ordre du résumé d'erreurs. */
export const CHAMPS_CONTACT: readonly ContactField[] = ['nom', 'sujet', 'message']
