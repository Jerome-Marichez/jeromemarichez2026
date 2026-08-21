// certifications.ts — jeromemarichez-fr
// Les certifications affichées, et ce que chacune change dans la prestation.
//
// Règles de véracité (CLAUDE.md), toutes bloquantes :
//   — ISTQB : seul le niveau **Foundation** est détenu. Le niveau Avancé
//     (Automatisation de Test) n'est PAS obtenu et ne doit jamais réapparaître ici.
//   — Aucune URL de justificatif n'a été fournie à ce jour : `justificatif` reste
//     absent partout. Une URL de certification ne s'invente ni ne s'approxime.
//   — Millésimes arbitrés par Jérôme MARICHEZ le 2026-08-20 : Google Ads en 2021
//     (le CV Tracking Specialist indiquait 2022), et Microsoft Ads confirmée mais
//     sans année connue — elle s'affiche donc sans millésime.

import type { ICertification } from '@/interfaces/ICertification'

export const CERTIFICATIONS: ICertification[] = [
  {
    intitule: 'ISTQB Foundation',
    organisme: 'International Software Testing Qualifications Board',
    annee: 2026,
    pole: 'ingenierie-web',
    apport:
      'Un vocabulaire de recette commun et opposable. Les niveaux de test, les critères ' +
      "d'entrée et surtout les critères d'arrêt sont écrits avant la livraison, pas " +
      'négociés pendant.',
  },
  {
    intitule: "Claude with Google Cloud's Vertex AI",
    organisme: 'Google Cloud',
    annee: 2026,
    pole: 'data-ia',
    apport:
      "L'inférence d'un grand modèle de langage servie depuis votre propre projet Google " +
      'Cloud plutôt que depuis une API tierce, quand la confidentialité des données le ' +
      'commande.',
  },
  {
    intitule: 'WeLoveDev — Top 5 % React',
    organisme: 'WeLoveDev',
    annee: 2023,
    pole: 'ingenierie-web',
    apport: 'Un niveau React évalué en conditions de test, pas déclaré sur un CV.',
  },
  {
    intitule: 'Google Analytics Individual Qualification',
    organisme: 'Google',
    annee: 2021,
    pole: 'sea-ux',
    apport:
      "Une lecture des rapports d'audience qui distingue ce que l'outil a réellement " +
      "mesuré de ce qu'il a modélisé — la différence sur laquelle se prennent les " +
      'mauvaises décisions budgétaires.',
  },
  {
    intitule: 'Google Ads',
    organisme: 'Google',
    annee: 2021,
    pole: 'sea-ux',
    apport:
      'Des campagnes arbitrées sur la donnée du produit et la rentabilité réelle, pas sur ' +
      'les métriques natives de la régie.',
  },
  {
    intitule: 'Microsoft Ads',
    organisme: 'Microsoft',
    pole: 'sea-ux',
    apport:
      "La couverture de Bing traitée sérieusement quand votre audience s'y trouve, au lieu " +
      "d'être abandonnée par défaut.",
  },
  {
    intitule: 'EF SET — Anglais B2 (CECRL)',
    organisme: 'EF Standard English Test',
    pole: 'transverse',
    apport:
      'La documentation technique, les publications et les échanges avec vos partenaires ' +
      'tenus en anglais sans intermédiaire.',
  },
]
