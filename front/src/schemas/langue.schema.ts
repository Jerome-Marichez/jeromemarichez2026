// langue.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité ILangue. Le type est dérivé du schéma (z.infer), jamais
// écrit à la main. Convention : docs/architecture.md.
import { z } from 'zod'

export const langueSchema = z.strictObject({
  cle: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'La clé d’une langue est en minuscules, chiffres et tirets.'),
  nom: z.string().min(1),
  // Étiquette BCP 47 : `en`, `fr`, éventuellement `en-GB`. Elle part telle quelle dans le
  // JSON-LD, où une valeur fantaisiste ne serait rattachée à aucune langue connue.
  code: z
    .string()
    .regex(/^[a-z]{2}(-[A-Z]{2})?$/, 'Étiquette BCP 47 attendue (« en », « en-GB »).'),
  niveau: z.string().min(1),
  referentiel: z.string().min(1),
  // `null` = niveau non évalué par un test identifié. Jamais un organisme approché.
  evaluePar: z.string().min(1).nullable(),
})

export type LangueValide = z.infer<typeof langueSchema>
