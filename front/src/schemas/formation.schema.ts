// formation.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IFormation. Le type est dérivé du schéma (z.infer), jamais
// écrit à la main. Convention : docs/architecture.md.
import { z } from 'zod'

export const formationSchema = z.strictObject({
  cle: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'La clé d’une formation est en minuscules, chiffres et tirets.'),
  intitule: z.string().min(1),
  niveau: z.literal(['Bac +3', 'Bac +5']),
  ville: z.string().min(1),
  annee: z.number().int().min(2000).max(2100),
})

export type FormationValide = z.infer<typeof formationSchema>
