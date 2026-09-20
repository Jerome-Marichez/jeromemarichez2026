import type { IFormation } from '../interfaces/IFormation'

// L'ordre de cette liste EST le classement affiche : du plus recent au plus
// ancien. Aucune annee n'est portee, voir `IFormation`.
export const formation: IFormation[] = [
  {
    diplome: "Bac +5, Expert en informatique et systèmes d'information",
    ville: 'Lille',
  },
  {
    diplome: 'Bac +3, Développeur',
    ville: 'Dunkerque',
  },
]
