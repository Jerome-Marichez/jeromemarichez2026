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

const cleOffreSchema = z.literal(['ingenierie-web', 'data-ia', 'sea'])

const referencePreuveSchema = z.strictObject({
  offre: cleOffreSchema,
  axe: z.string().min(1),
})

const maillonChaineSchema = z.strictObject({
  cle: z.string().min(1),
  titre: z.string().min(1),
  role: z.string().min(1),
  illustration: z.string().min(1),
  libelleSortie: z.string().min(1),
  sortie: z.string().min(1),
  // Un maillon rattaché à aucune offre serait une étape que personne ne couvre.
  offres: z.array(cleOffreSchema).min(1),
})

const pointEntreeSchema = z.strictObject({
  cle: z.string().min(1),
  situation: z.string().min(1),
  description: z.string().min(1),
  // Un point d'entrée sans étapes ne situerait rien : c'est le chemin qui informe.
  etapes: z.array(z.string().min(1)).min(1),
  // Un point d'entrée qui ne mène nulle part laisserait le visiteur sur place.
  liens: z.array(z.strictObject({ offre: cleOffreSchema, libelle: z.string().min(1) })).min(1),
})

const colonneConstatSchema = z.strictObject({
  cle: z.string().min(1),
  titre: z.string().min(1),
  elements: z.array(z.string().min(1)).min(1),
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
  chaine: z.strictObject({
    titre: z.string().min(1),
    lead: z.string().min(1),
    libelleAvertissement: z.string().min(1),
    // Le caractère illustratif du scénario e-commerce doit apparaître dans le texte
    // visible : un avertissement vide ferait échouer le build (CLAUDE.md, véracité).
    avertissement: z.string().min(1),
    libelleEtape: z.string().min(1),
    libelleIllustration: z.string().min(1),
    libelleRattachement: z.string().min(1),
    // Les quatre maillons du fil rouge : le site, la donnée structurée et l'entrepôt,
    // le taggage, le SEA. Moins de deux maillons ne feraient plus une chaîne.
    maillons: z.array(maillonChaineSchema).min(2),
  }),
  pointsEntree: z.strictObject({
    titre: z.string().min(1),
    lead: z.string().min(1),
    libelleChemin: z.string().min(1),
    // Deux points d'entrée au minimum : c'est le choix offert qui situe le visiteur.
    points: z.array(pointEntreeSchema).min(2),
  }),
  pourquoi: z.strictObject({
    titre: z.string().min(1),
    lead: z.string().min(1),
    // Le constat est une opposition : une seule colonne ne l'énoncerait pas.
    colonnes: z.array(colonneConstatSchema).min(2),
    conclusion: z.string().min(1),
    // L'argument s'adosse au parcours : au moins une preuve établie le soutient.
    references: z.array(referencePreuveSchema).min(1),
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
