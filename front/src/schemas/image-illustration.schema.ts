// image-illustration.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IImageIllustration. Validé au chargement du module : une image
// mal déclarée échoue au BUILD, jamais en production. Convention : docs/architecture.md.
import { z } from 'zod'

/**
 * Longueur minimale d'un texte alternatif.
 *
 * Un `alt` court n'est pas forcément mauvais, mais sur ce site les images sont des
 * illustrations : « photo », « illustration » ou « café » y coûteraient un temps de
 * restitution sans rien apprendre à qui ne voit pas l'image. La borne force une
 * DESCRIPTION. Elle ne remplace pas la relecture — aucune longueur ne rend un texte
 * pertinent — mais elle attrape l'intitulé creux, qui est le défaut réellement fréquent.
 */
const LONGUEUR_MIN_ALT = 40

const declinaisonSchema = z.strictObject({
  largeur: z.number().int().positive(),
  hauteur: z.number().int().positive(),
})

export const imageIllustrationSchema = z
  .strictObject({
    cle: z.string().min(1),
    alt: z.string().min(LONGUEUR_MIN_ALT),
    // Chemin public absolu, sans extension : c'est le rendu qui compose
    // `<base>-<largeur>.<format>`.
    base: z
      .string()
      .regex(/^\/[a-z0-9/-]+$/, 'Chemin public en minuscules attendu (« /images/x »).'),
    formats: z.array(z.enum(['webp', 'jpg'])).min(1),
    declinaisons: z.array(declinaisonSchema).min(1),
    tailles: z.string().min(1),
    placeholder: z.boolean(),
    licence: z.string().min(1),
    provenance: z.string().min(1),
  })
  .refine(
    (image) =>
      image.declinaisons.every(
        (declinaison, index) =>
          index === 0 || declinaison.largeur > (image.declinaisons[index - 1]?.largeur ?? 0),
      ),
    {
      // Le rendu compose le `srcset` dans l'ordre de déclaration et lit la DERNIÈRE
      // déclinaison pour les attributs `width`/`height` du repli. Un ordre quelconque
      // déclarerait donc des dimensions qui ne sont pas celles du fichier servi en
      // `src` : la réservation de place serait fausse, et la page sauterait au
      // chargement — précisément ce que les dimensions déclarées doivent empêcher.
      message: 'Déclinaisons attendues de la plus étroite à la plus large, sans doublon.',
      path: ['declinaisons'],
    },
  )

export type ImageIllustrationValide = z.infer<typeof imageIllustrationSchema>
