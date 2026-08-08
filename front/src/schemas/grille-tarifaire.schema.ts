// grille-tarifaire.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IGrilleTarifaire. Le type est dérivé du schéma (z.infer),
// jamais écrit à la main. Convention : docs/architecture.md.
import { z } from 'zod'
import { referencePreuveSchema } from './reference-preuve.schema'
import { tarifSchema } from './tarif.schema'

export const grilleTarifaireSchema = z.strictObject({
  offre: z.literal(['ingenierie-web', 'data-ia', 'sea']),
  // Une grille vide n'est pas une grille : publier « Tarifs » sans ligne serait pire que
  // ne rien publier.
  lignes: z.array(tarifSchema).min(1),
  // L'argument qui rend la gratuité de la mise en place cohérente. À la première
  // personne du singulier, comme tout le contenu publié.
  argument: z.string().min(1),
  preuve: referencePreuveSchema,
})

export type GrilleTarifaireValide = z.infer<typeof grilleTarifaireSchema>
