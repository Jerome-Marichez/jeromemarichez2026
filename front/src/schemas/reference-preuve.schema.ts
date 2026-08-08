// reference-preuve.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IReferencePreuve. Le type est dérivé du schéma (z.infer),
// jamais écrit à la main. Convention : docs/architecture.md.
//
// Note de reprise : `accueil.schema.ts` porte une définition locale identique, écrite
// avant ce fichier. Elle a vocation à être remplacée par cet import — le faire ici
// sortirait du périmètre de l'issue #17, la page d'accueil étant en cours de réécriture
// en parallèle. Aucune valeur n'est dupliquée entre les deux, seulement la forme.
import { z } from 'zod'

/**
 * Une preuve DÉSIGNÉE, jamais recopiée : l'offre et la clé de l'axe qui la porte.
 *
 * La validité de la référence (offre connue, axe connu, preuve non nulle) ne se vérifie
 * pas ici mais à la résolution — `services/preuves.service.ts` échoue bruyamment au
 * build plutôt que d'afficher une affirmation sans preuve.
 */
export const referencePreuveSchema = z.strictObject({
  offre: z.literal(['ingenierie-web', 'data-ia', 'sea']),
  axe: z.string().min(1),
})

export type ReferencePreuveValide = z.infer<typeof referencePreuveSchema>
