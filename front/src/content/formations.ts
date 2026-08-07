// formations.ts — jeromemarichez2026
// Parcours de formation, repris à l'identique des CV de référence
// (/Users/nicolasb/Documents/CV/ — section « Formation », identique sur les trois CV).
import type { IFormation } from '../interfaces/formation'
import { formationSchema } from '../schemas/formation.schema'

const donnees = [
  {
    cle: 'expert-informatique-systemes-information',
    intitule: 'Expert en informatique et systèmes d’information',
    niveau: 'Bac +5',
    ville: 'Lille',
    annee: 2025,
  },
  {
    cle: 'developpeur',
    intitule: 'Développeur',
    niveau: 'Bac +3',
    ville: 'Dunkerque',
    annee: 2022,
  },
] satisfies readonly IFormation[]

/** Validées au chargement : une donnée non conforme échoue au build, pas en production. */
export const formations: readonly IFormation[] = donnees.map((formation) =>
  formationSchema.parse(formation),
)
