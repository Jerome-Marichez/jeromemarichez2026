// contact-page.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité IContactPage. Validé au chargement : un libellé vide échoue au
// BUILD, jamais en production. Convention : docs/architecture.md.
//
// Ce schéma ne valide AUCUNE entrée externe : la page de contact n'a pas de formulaire
// (arbitrage de Jérôme MARICHEZ, 2026-08-08) et ne reçoit donc rien du visiteur. Il
// valide du contenu éditorial, exactement comme les autres schémas de `content/`.
import { z } from 'zod'
import { LONGUEUR_MAX_DESCRIPTION } from './page-seo.schema'

const referenceProfilSchema = z.strictObject({
  cle: z.string().min(1),
  nom: z.string().min(1),
  // Un hôte, jamais une URL : c'est ce qui interdit d'écrire ici une seconde fois
  // l'adresse d'un profil déjà déclarée dans `identite.profilsPublics`.
  hote: z.string().regex(/^[a-z0-9.-]+$/, 'Nom d’hôte attendu (« www.linkedin.com »).'),
})

export const contactPageSchema = z.strictObject({
  meta: z.strictObject({
    titre: z.string().min(3).max(60),
    description: z.string().min(50).max(LONGUEUR_MAX_DESCRIPTION),
  }),
  entete: z.strictObject({
    titre: z.string().min(1),
    lead: z.string().min(1),
  }),
  coordonnees: z.strictObject({
    titre: z.string().min(1),
    libelleEmail: z.string().min(1),
    libelleTelephone: z.string().min(1),
    profils: z.array(referenceProfilSchema).min(1),
  }),
  sansFormulaire: z.strictObject({
    titre: z.string().min(1),
    texte: z.string().min(1),
  }),
  rgpd: z.strictObject({
    titre: z.string().min(1),
    // Au moins une mention : une section RGPD vide laisserait planer le doute qu'elle
    // est censée lever, ce qui est pire que son absence.
    mentions: z.array(z.string().min(1)).min(1),
  }),
})

export type ContactPageValide = z.infer<typeof contactPageSchema>
