// certification.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité ICertification. Le type est dérivé du schéma (z.infer),
// jamais écrit à la main. Convention : docs/architecture.md.
import { z } from 'zod'

/**
 * Justificatif officiel d'une certification.
 *
 * Union discriminée en `strictObject` : la variante `a-fournir` REFUSE toute clé
 * supplémentaire, une `url` glissée dans une certification non justifiée fait donc
 * échouer la validation au chargement. La variante `disponible` exige une URL absolue
 * en HTTPS. Aucune URL n'est connue à ce jour : toutes les certifications sont en
 * `a-fournir` tant que Jérôme MARICHEZ n'a pas transmis les liens officiels.
 */
export const justificatifSchema = z.discriminatedUnion('statut', [
  z.strictObject({
    statut: z.literal('disponible'),
    url: z.url().startsWith('https://', 'Le justificatif doit être une URL HTTPS absolue.'),
  }),
  z.strictObject({ statut: z.literal('a-fournir') }),
])

export const certificationSchema = z.strictObject({
  cle: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'La clé d’une certification est en minuscules, chiffres et tirets.'),
  intitule: z.string().min(1),
  organisme: z.string().min(1),
  // `null` quand l'année n'est pas établie de façon certaine : jamais approchée.
  annee: z.number().int().min(2000).max(2100).nullable(),
  justificatif: justificatifSchema,
})

export type CertificationValide = z.infer<typeof certificationSchema>
