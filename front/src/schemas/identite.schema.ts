// identite.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IIdentite. Convention : docs/architecture.md.
import { z } from 'zod'

export const identiteSchema = z.strictObject({
  nom: z.string().min(1),
  titreProfessionnel: z.string().min(1),
  ville: z.string().min(1),
  codePays: z
    .string()
    .regex(/^[A-Z]{2}$/, 'Code pays ISO 3166-1 alpha-2 attendu (deux majuscules).'),
  promesse: z.string().min(1),
  // Borne SEO tenue par le build : au-delà d'environ 160 caractères, la meta description
  // est tronquée dans les résultats de recherche. Une description trop courte, elle, ne
  // dit rien d'exploitable. Le site vend du référencement : la contrainte est vérifiée
  // par le schéma, pas laissée à la relecture.
  descriptionSite: z.string().min(50).max(160),
  // Seules des URL https vérifiables entrent ici — voir le commentaire de l'interface.
  profilsPublics: z.array(z.url({ protocol: /^https$/ })),
})

export type IdentiteValide = z.infer<typeof identiteSchema>
