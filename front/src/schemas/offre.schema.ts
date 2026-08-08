// offre.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IOffre. Le type est dérivé du schéma (z.infer), jamais écrit
// à la main. Convention : docs/architecture.md.
import { z } from 'zod'
import { axeOffreSchema } from './axe-offre.schema'

export const offreSchema = z.strictObject({
  cle: z.literal(['ingenierie-web', 'data-ia', 'sea']),
  titre: z.string().min(1),
  accroche: z.string().min(1),
  decisionPermise: z.string().min(1),
  // Une offre sans axe ne dit rien : le tableau ne peut pas être vide.
  axes: z.array(axeOffreSchema).min(1),
})

export type OffreValide = z.infer<typeof offreSchema>
