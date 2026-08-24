// certifications.ts — jeromemarichez-fr
// Les certifications affichées : un logo, un intitulé, un millésime. Rien d'autre.
//
// Règles de véracité (CLAUDE.md), toutes bloquantes :
//   — ISTQB : seul le niveau **Foundation** est détenu. Le niveau Avancé
//     (Automatisation de Test) n'est PAS obtenu et ne doit jamais réapparaître ici.
//   — Aucune URL de justificatif n'a été fournie à ce jour : `justificatif` reste
//     absent partout. Une URL de certification ne s'invente ni ne s'approxime.
//   — Millésimes arbitrés par Jérôme MARICHEZ le 2026-08-20 : Google Ads en 2021
//     (le CV Tracking Specialist indiquait 2022), et Microsoft Ads confirmée mais
//     sans année connue — elle s'affiche donc sans millésime.
//
// `logo` suit exactement la même discipline que `justificatif` : il n'est renseigné
// que pour un fichier réellement déposé dans `public/certifications/`, dont la
// provenance et la licence sont consignées dans le LISEZMOI de ce dossier. Les quatre
// certifications qui n'ont pas encore de fichier s'affichent en toutes lettres — c'est
// le comportement voulu, jamais une image cassée.
//
// `largeur` et `hauteur` sont les dimensions intrinsèques du SVG (viewBox 24 × 24) :
// ce sont elles, et non le CSS, qui réservent la place et garantissent l'absence de CLS.

import type { ICertification } from '@/interfaces/ICertification'

export const CERTIFICATIONS: ICertification[] = [
  {
    intitule: 'ISTQB Foundation',
    organisme: 'International Software Testing Qualifications Board',
    annee: 2026,
    pole: 'ingenierie-web',
  },
  {
    intitule: "Claude with Google Cloud's Vertex AI",
    organisme: 'Google Cloud',
    annee: 2026,
    pole: 'ia',
    logo: {
      fichier: '/certifications/google-cloud.svg',
      largeur: 24,
      hauteur: 24,
    },
  },
  {
    intitule: 'WeLoveDev — Top 5 % React',
    organisme: 'WeLoveDev',
    annee: 2023,
    pole: 'ingenierie-web',
  },
  {
    intitule: 'Google Analytics Individual Qualification',
    organisme: 'Google',
    annee: 2021,
    pole: 'sea-ux',
    logo: {
      fichier: '/certifications/google-analytics.svg',
      largeur: 24,
      hauteur: 24,
    },
  },
  {
    intitule: 'Google Ads',
    organisme: 'Google',
    annee: 2021,
    pole: 'sea-ux',
    logo: {
      fichier: '/certifications/google-ads.svg',
      largeur: 24,
      hauteur: 24,
    },
  },
  {
    intitule: 'Microsoft Ads',
    organisme: 'Microsoft',
    pole: 'sea-ux',
  },
  {
    intitule: 'EF SET — Anglais B2 (CECRL)',
    organisme: 'EF Standard English Test',
    pole: 'transverse',
  },
]
