// contact.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IContact. Le type est dérivé du schéma (z.infer), jamais
// écrit à la main. Convention : docs/architecture.md.
import { z } from 'zod'
import { TELEPHONE_NATIONAL_FR } from '@/utils/telephone'

export const contactSchema = z.strictObject({
  // `z.email()` et non `z.string()` : une adresse mal formée est une adresse à laquelle
  // aucun prospect n'écrira jamais, et le défaut serait invisible en relecture.
  email: z.email(),
  // Format national français vérifiable, décrit une seule fois dans `utils/telephone.ts`
  // — le même motif sert à valider la donnée et à la convertir en E.164. Une coquille
  // (chiffre en trop, paire manquante, écriture collée) casse le build au lieu de
  // publier un numéro injoignable sur toutes les pages du site.
  telephone: z
    .string()
    .regex(TELEPHONE_NATIONAL_FR, 'Téléphone français attendu au format « 0X XX XX XX XX ».'),
})

export type ContactValide = z.infer<typeof contactSchema>
