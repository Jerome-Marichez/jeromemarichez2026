import type { ICertification } from '../interfaces/ICertification'

// L'ordre de cette liste EST le classement affiche : du plus recent au plus
// ancien. Aucune annee n'est portee, voir `ICertification`.
export const certifications: ICertification[] = [
  {
    nom: 'ISTQB Foundation',
    organisme: 'ISTQB',
    justificatif: null,
  },
  {
    nom: "Claude (Anthropic) with Google Cloud's Vertex AI",
    organisme: 'Anthropic / Google Cloud',
    justificatif: null,
  },
  {
    nom: 'WeLoveDev, Top 5 % React',
    organisme: 'WeLoveDev',
    justificatif: null,
  },
  {
    nom: 'Google Ads',
    organisme: 'Google',
    justificatif: null,
  },
  {
    nom: 'Google Analytics Individual Qualification',
    organisme: 'Google',
    justificatif: null,
  },
]
