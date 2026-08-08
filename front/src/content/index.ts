// index.ts — jeromemarichez2026
// Point d'entrée unique du contenu éditorial du site.
//
// Le contenu éditorial est de la DONNÉE, pas du JSX (docs/architecture.md) : ajouter
// une offre ou une certification ne demande pas de toucher au rendu. Chaque jeu de
// données est validé par son schéma Zod au chargement du module — une donnée non
// conforme fait donc échouer le build, jamais la production.
export { accueil } from './accueil'
export { certifications } from './certifications'
export { experiences } from './experiences'
export { formations } from './formations'
export { identite } from './identite'
export { offrePage } from './offre-page'
export {
  grillesTarifaires,
  grilleTarifaireSea,
  offreDataIa,
  offreIngenierieWeb,
  offreSea,
  offres,
} from './offres'
