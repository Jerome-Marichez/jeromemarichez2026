// experience.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IExperience. Le type est dérivé du schéma (z.infer), jamais
// écrit à la main. Convention : docs/architecture.md.
import { z } from 'zod'

const anneeSchema = z.number().int().min(2000).max(2100)

export const experienceSchema = z
  .strictObject({
    cle: z
      .string()
      .regex(/^[a-z0-9-]+$/, 'La clé d’une expérience est en minuscules, chiffres et tirets.'),
    // Repris à l'identique des CV de référence : aucune reformulation.
    intitule: z.string().min(1),
    employeur: z.string().min(1),
    secteur: z.string().min(1),
    anneeDebut: anneeSchema,
    anneeFin: anneeSchema,
    contexte: z.string().min(1),
    faits: z.array(z.string().min(1)).min(1),
    offresLiees: z.array(z.literal(['ingenierie-web', 'data-ia', 'sea'])).min(1),
  })
  .refine((experience) => experience.anneeFin >= experience.anneeDebut, {
    message: 'L’année de fin ne peut pas précéder l’année de début.',
    path: ['anneeFin'],
  })

export type ExperienceValide = z.infer<typeof experienceSchema>
