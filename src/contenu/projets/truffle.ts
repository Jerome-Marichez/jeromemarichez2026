import type { IProjet } from '../../interfaces/IProjet'

// Truffle Capital était un client, en mission indépendante, pas un employeur
// (CLAUDE.md, table des interdits).
export const truffle: IProjet = {
  titre: "Truffle Capital, reprise du travail d'une agence et équipe montée à mes frais",
  entreprise: 'Truffle Capital',
  sousTitre: 'chef de projet, de la proposition commerciale à la livraison, en indépendant',
  contexte:
    'Les sites du fonds et de ses participations étaient produits par une agence digitale ' +
    "parisienne. Vitrines lues par des investisseurs et par la presse spécialisée. J'intervenais " +
    'seul, sans antériorité chez le client.',
  enjeu:
    "L'engagement venait de moi, donc le risque commercial et financier aussi. Il fallait reprendre " +
    "un existant produit par d'autres sans interrompre les sites, et une erreur en ligne se voyait " +
    'immédiatement.',
  monRole:
    'Rédiger la proposition et la défendre devant le comité de direction. Recruter les prestataires, ' +
    "poser les critères d'acceptation avant de commander, puis recetter chaque livrable contre ces " +
    'critères. Recette manuelle avant chaque mise en ligne, sur navigateurs et sur mobile. AMOA de ' +
    'la startup biotech Artedrone, besoin traduit en spécifications testables. Budget ADS et SEO ' +
    'justifié en comité, équipe de 5 à 10 personnes coordonnée.',
  resultat:
    "Production de l'agence reprise puis refondue, trois sites livrés, mission reconduite sur deux ans.",
}
