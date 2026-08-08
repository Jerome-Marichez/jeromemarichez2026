// axe-offre.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IAxeOffre. Le type est dérivé du schéma (z.infer), jamais
// écrit à la main. Convention : docs/architecture.md.
import { z } from 'zod'

export const axeOffreSchema = z.strictObject({
  cle: z.string().regex(/^[a-z0-9-]+$/, 'La clé d’un axe est en minuscules, chiffres et tirets.'),
  titre: z.string().min(1),
  description: z.string().min(1),
  // `null` explicite : un axe sans preuve publiable l'affiche comme tel plutôt que
  // d'en inventer une (ligne éditoriale du CLAUDE.md).
  preuve: z.string().min(1).nullable(),
  // Optionnel : seules les offres qui distinguent des volets le renseignent. Absent,
  // l'axe appartient au socle commun de son offre.
  volet: z.string().min(1).optional(),
})

export type AxeOffreValide = z.infer<typeof axeOffreSchema>
