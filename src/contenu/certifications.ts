import type { ICertification } from '../interfaces/ICertification'

export const certifications: ICertification[] = [
  {
    nom: 'ISTQB Foundation',
    organisme: 'ISTQB',
    annee: 2026,
    justificatif: null,
  },
  {
    nom: "Claude (Anthropic) with Google Cloud's Vertex AI",
    organisme: 'Anthropic / Google Cloud',
    annee: 2026,
    justificatif: null,
  },
  {
    nom: 'WeLoveDev, Top 5 % React',
    organisme: 'WeLoveDev',
    annee: 2023,
    justificatif: null,
  },
  {
    nom: 'Google Ads',
    organisme: 'Google',
    // À confirmer par Jérôme MARICHEZ : 2021 ou 2022 (issue ouverte). Les six CV
    // affichent 2022, mais un arbitrage antérieur (2026-08-20) retenait 2021 : la
    // consigne de ce brief est de ne pas trancher tant que Jérôme ne l'a pas fait,
    // donc le champ reste `null` plutôt que de choisir l'une des deux sources.
    annee: null,
    justificatif: null,
  },
  {
    nom: 'Google Analytics Individual Qualification',
    organisme: 'Google',
    annee: 2021,
    justificatif: null,
  },
]
