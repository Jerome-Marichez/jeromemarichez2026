import type { IExperience } from "../../interfaces/IExperience";

export const verhoeven: IExperience = {
  periode: "2019 à 2022",
  entreprise: "Verhoeven Joaillier",
  secteur: "Joaillerie de luxe, vente physique et en ligne",
  statut: "salarie",
  posteIntitule: "Développeur fullstack & Chef de projet digital · E-commerce de luxe",
  contexte:
    "Maison de joaillerie vendant en boutique et en ligne des pièces souvent uniques, où un stock " +
    "faux se paie en survente. Site marchand développé sur mesure. Poste unique sur le périmètre " +
    "digital, en lien direct avec la direction et la boutique.",
  realisations: [
    "ERP propriétaire M3 Soft synchronisé avec le site marchand. Flux commande, stock et " +
      "facturation modélisés en BPMN, développés puis recettés avec la boutique. Survente supprimée " +
      "sur les pièces uniques.",
    "Socle en fin de vie remplacé sans couper le site, PHP 5 vers 7 puis réécriture Node.js orientée " +
      "objet, jQuery vers React. Monolithe découpé en front et back avec un contrat d'interface " +
      "explicite, migration défendue devant la direction sur ses effets métier.",
    "Non-régression Cypress et Jest écrite sur l'ancien socle puis rejouée sur le nouveau, recette " +
      "manuelle des tunnels de commande avec la boutique.",
    "Parcours d'achat et pages produit refondus sur la donnée comportementale, A/B testing, " +
      "configurateur de bracelet rendu en temps réel. Panier moyen en hausse de 50 %.",
    "Chef de projet digital sur l'acquisition. SEO mené en direct, SEA et SMA confiés à un alternant " +
      "et à des prestataires briefés et contrôlés sur la performance. Donnée client segmentée par " +
      "clustering k-means.",
    "Serveurs Apache et Linux administrés, astreinte, pics saisonniers absorbés sans incident. " +
      "Cadrage RGPD des données clients.",
  ],
  stackTechnique: [
    "PHP",
    "Node.js",
    "React",
    "Vite",
    "SCSS",
    "MySQL",
    "ERP M3 Soft",
    "BPMN 2.0",
    "Apache",
    "Linux",
    "Cypress",
    "Jest",
    "Stryker",
    "SonarQube",
    "Google Ads",
    "Google Analytics",
    "Search Console",
    "Orange Data Mining",
  ],
  encadrement:
    "SEA et SMA confiés à un alternant et à des prestataires, briefés et contrôlés sur la performance.",
};
