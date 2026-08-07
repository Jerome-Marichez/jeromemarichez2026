// certifications.ts — jeromemarichez2026
// Certifications obtenues. Sources : README.md (tableau des certifications) et les CV
// de référence (/Users/nicolasb/Documents/CV/).
//
// Véracité — points tenus ici :
// - ISTQB : seul le niveau FOUNDATION est détenu. Le niveau Avancé (Automatisation de
//   Test) n'est PAS obtenu et ne doit jamais être réintroduit.
// - AUCUNE URL de justificatif n'est connue à ce jour : toutes les certifications sont
//   en `a-fournir`. Une URL ne s'invente ni ne s'approxime — elle doit être transmise
//   par Jérôme MARICHEZ. Le typage empêche tout rendu de lien tant que c'est le cas.
// - `annee: null` = année non établie. Google Ads est daté 2021 sur deux CV et 2022 sur
//   le CV Tracking Specialist : la contradiction n'est pas tranchée ici. EF SET n'est
//   daté sur aucune source.
// - « Microsoft Ads » figure au README avec la mention « à confirmer » et n'apparaît sur
//   aucun CV : il n'est donc PAS saisi. À ajouter seulement après confirmation.
import type { ICertification } from '../interfaces/certification'
import { certificationSchema } from '../schemas/certification.schema'

const donnees = [
  {
    cle: 'claude-vertex-ai',
    intitule: 'Claude with Google Cloud’s Vertex AI',
    organisme: 'Google Cloud',
    annee: 2026,
    justificatif: { statut: 'a-fournir' },
  },
  {
    cle: 'istqb-foundation',
    intitule: 'ISTQB Foundation',
    organisme: 'ISTQB',
    annee: 2026,
    justificatif: { statut: 'a-fournir' },
  },
  {
    cle: 'welovedev-react',
    intitule: 'WeLoveDev — Top 5 % React',
    organisme: 'WeLoveDev',
    annee: 2023,
    justificatif: { statut: 'a-fournir' },
  },
  {
    cle: 'google-analytics-individual-qualification',
    intitule: 'Google Analytics Individual Qualification (GAIQ)',
    organisme: 'Google',
    annee: 2021,
    justificatif: { statut: 'a-fournir' },
  },
  {
    cle: 'google-ads',
    intitule: 'Google Ads',
    organisme: 'Google',
    // 2021 sur les CV Ingénieur Full Stack et AI Engineer, 2022 sur le CV Tracking
    // Specialist. Non tranché : à confirmer par Jérôme MARICHEZ.
    annee: null,
    justificatif: { statut: 'a-fournir' },
  },
  {
    cle: 'ef-set-anglais-b2',
    intitule: 'EF SET — Anglais B2 (CECRL)',
    organisme: 'EF SET',
    // Aucune année sur les CV ni au README.
    annee: null,
    justificatif: { statut: 'a-fournir' },
  },
] satisfies readonly ICertification[]

/** Validées au chargement : une donnée non conforme échoue au build, pas en production. */
export const certifications: readonly ICertification[] = donnees.map((certification) =>
  certificationSchema.parse(certification),
)
