// offre-page.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IOffrePage. Validé au chargement du module : un libellé vide
// échoue au BUILD, jamais en production. Convention : docs/architecture.md.
import { z } from 'zod'

const appelActionSchema = z.strictObject({
  href: z.string().min(1),
  // Un libellé vide rendrait un lien sans nom accessible : interdit par le typage.
  libelle: z.string().min(1),
})

export const offrePageSchema = z.strictObject({
  titreAxes: z.string().min(1),
  libellePreuve: z.string().min(1),
  titreDecision: z.string().min(1),
  titreTarifs: z.string().min(1),
  libellePreuveTarifs: z.string().min(1),
  contact: z.strictObject({
    titre: z.string().min(1),
    lead: z.string().min(1),
    action: appelActionSchema,
  }),
})

export type OffrePageValide = z.infer<typeof offrePageSchema>
