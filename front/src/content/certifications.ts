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
//   le CV Tracking Specialist : arbitrage de Jérôme MARICHEZ du 2026-08-08, la
//   contradiction n'est pas tranchée et AUCUNE année n'est affichée.
// - « Microsoft Ads » n'est pas établi : absent des trois CV de référence. Il n'est pas
//   saisi ici, et sa mention « à confirmer » a été retirée du README.md le 2026-08-08.
// - « EF SET — Anglais B2 » n'est PAS une certification et ne figure plus ici : les trois
//   CV le classent sous « Langues » (« Anglais, B2 (EF SET, CECRL) »), EF SET étant le
//   test qui évalue le niveau et non un titre professionnel obtenu. La compétence est
//   portée par `identite.langues` et part dans `knowsLanguage` du JSON-LD, pas dans
//   `hasCredential`. Arbitrage de Jérôme MARICHEZ du 2026-08-08.
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
] satisfies readonly ICertification[]

/** Validées au chargement : une donnée non conforme échoue au build, pas en production. */
export const certifications: readonly ICertification[] = donnees.map((certification) =>
  certificationSchema.parse(certification),
)
