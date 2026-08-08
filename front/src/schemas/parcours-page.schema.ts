// parcours-page.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IParcoursPage. Validé au chargement : un libellé vide échoue au
// BUILD, jamais en production. Convention : docs/architecture.md.
import { z } from 'zod'
import { imageIllustrationSchema } from './image-illustration.schema'
import { LONGUEUR_MAX_DESCRIPTION } from './page-seo.schema'

const appelActionSchema = z.strictObject({
  href: z.string().min(1),
  // Un libellé vide rendrait un lien sans nom accessible : interdit par le typage.
  libelle: z.string().min(1),
})

export const parcoursPageSchema = z.strictObject({
  // Bornes reprises de `pageSeoSchema` : la page les lui passera telles quelles, autant
  // que le contenu échoue à la saisie plutôt qu'à la construction des métadonnées.
  meta: z.strictObject({
    titre: z.string().min(3).max(60),
    description: z.string().min(50).max(LONGUEUR_MAX_DESCRIPTION),
  }),
  entete: z.strictObject({
    titre: z.string().min(1),
    lead: z.string().min(1),
    illustration: imageIllustrationSchema,
  }),
  titreExperiences: z.string().min(1),
  titreFormations: z.string().min(1),
  titreCertifications: z.string().min(1),
  libelleJustificatif: z.string().min(1),
  contact: z.strictObject({
    titre: z.string().min(1),
    lead: z.string().min(1),
    action: appelActionSchema,
  }),
})

export type ParcoursPageValide = z.infer<typeof parcoursPageSchema>
