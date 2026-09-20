import type { IExperience } from "../../interfaces/IExperience";

// Truffle Capital était un client, en mission indépendante, pas un employeur
// (CLAUDE.md, table des interdits). `statut: "independant"` le porte dans le type.
export const truffle: IExperience = {
  periode: "2017 à 2019",
  entreprise: "Truffle Capital",
  secteur: "Capital-risque, fintech, medtech et biotech",
  statut: "independant",
  posteIntitule: "Chef de projet digital & Développeur, en indépendant",
  contexte:
    "Fonds de capital-risque parisien, vitrines lues par des investisseurs et par la presse " +
    "spécialisée. Mission menée en indépendant, de la vente à la livraison, avec l'existant d'une " +
    "agence digitale parisienne d'environ 70 personnes à reprendre.",
  realisations: [
    "Proposition commerciale de reprise rédigée, défendue devant le comité de direction et " +
      "remportée.",
    "Prestataires recrutés et rémunérés à mes frais pour tenir l'engagement, briefés sur des " +
      "critères d'acceptation posés à l'avance. Le risque commercial et financier était le mien.",
    "Trois sites créés et refondus de bout en bout, truffle.com, truffle100.fr et artedrone.fr, du " +
      "cadrage à l'exploitation, avec une recette manuelle avant chaque mise en ligne.",
    "AMOA de la startup biotech Artedrone, besoin recueilli auprès des équipes scientifiques et " +
      "traduit en spécifications exploitables par des prestataires.",
    "Budget ADS et SEO piloté, mesuré et justifié auprès des dirigeants. Équipe de 5 à 10 personnes " +
      "coordonnée. Mission reconduite sur deux ans.",
  ],
  stackTechnique: [
    "WordPress",
    "PHP",
    "MySQL",
    "Apache",
    "Nginx",
    "Linux",
    "Google Ads",
    "Google Analytics",
    "Search Console",
    "Trello",
  ],
  encadrement:
    "Prestataires recrutés, rémunérés et coordonnés à mes frais, équipe de 5 à 10 personnes, briefés " +
    "sur des critères d'acceptation posés à l'avance.",
};
