// accueil.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IAccueil. Le contenu de la page d'accueil est validé au
// chargement du module : une donnée manquante ou vide échoue au BUILD, jamais en
// production. Convention : docs/architecture.md.
import { z } from 'zod'

const appelActionSchema = z.strictObject({
  href: z.string().min(1),
  // Un libellé vide rendrait un lien sans nom accessible : interdit par le typage.
  libelle: z.string().min(1),
})

const referencePreuveSchema = z.strictObject({
  offre: z.literal(['ingenierie-web', 'data-ia', 'sea']),
  axe: z.string().min(1),
})

export const accueilSchema = z.strictObject({
  meta: z.strictObject({
    titre: z.string().min(1),
    description: z.string().min(1),
  }),
  accroche: z.strictObject({
    titre: z.string().min(1),
    lead: z.string().min(1),
    actionPrincipale: appelActionSchema,
    actionSecondaire: appelActionSchema,
  }),
  offres: z.strictObject({
    titre: z.string().min(1),
    lead: z.string().min(1),
    libelleDecision: z.string().min(1),
    libelleLien: z.string().min(1),
  }),
  preuves: z.strictObject({
    titre: z.string().min(1),
    lead: z.string().min(1),
    // Une section « preuves » vide contredirait la ligne éditoriale : au moins une.
    references: z.array(referencePreuveSchema).min(1),
  }),
  contact: z.strictObject({
    titre: z.string().min(1),
    lead: z.string().min(1),
    action: appelActionSchema,
  }),
})

export type AccueilValide = z.infer<typeof accueilSchema>
