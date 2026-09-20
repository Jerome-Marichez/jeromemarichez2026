import type { IAxe } from "../interfaces/IAxe";

// Les quatre axes n'ont aucun ordre hiérarchique entre eux (CLAUDE.md, section
// « Positionnement »). L'ordre de déclaration suit l'intitulé LinkedIn, rien de plus.
export const axes: IAxe[] = [
  {
    nom: "Full Stack",
    phrase:
      "Front et back au même niveau d'exigence : React et Next.js avec un rendu arbitré page par page, " +
      "Node.js et Express derrière une API REST spécifiée en OpenAPI.",
    preuves: [
      {
        chiffre: "Lighthouse 98/100",
        contexte: "Sms En Masse, plateforme SaaS conçue et livrée de bout en bout",
      },
      {
        chiffre: "3 migrations majeures sans coupure de service",
        contexte:
          "PHP 5 vers 7 puis Node.js, jQuery vers React, Ionic 6 vers 8 et Angular 15 vers 19",
      },
    ],
  },
  {
    nom: "IA",
    phrase:
      "Le développement en IA augmentée piloté par les tests : critères d'acceptation écrits d'abord, " +
      "Claude Code et Gemini pour l'implémentation, tests et tests de mutation comme juge.",
    preuves: [
      {
        chiffre: "Plus de 200 000 installations iOS et Android",
        contexte: "Prézage, application mobile migrée sans interruption ni gel de la feuille de route",
      },
      {
        chiffre: "Méthode transmise à l'équipe, pas une pratique personnelle",
        contexte: "Développement en IA augmentée piloté par les tests, repris par les alternants",
      },
    ],
  },
  {
    nom: "QA",
    phrase:
      "Certifié ISTQB Foundation, développeur autant que testeur : démarche QA et non-régression " +
      "définies puis rendues bloquantes avant chaque mise en production.",
    preuves: [
      {
        chiffre: "Non-régression sur trois niveaux, bloquante avant production",
        contexte: "Sms En Masse, démarche QA construite de zéro pour une équipe qui n'en avait pas",
      },
    ],
  },
  {
    nom: "Data-Driven",
    phrase:
      "Des décisions prises sur la donnée plutôt que sur l'opinion, avec des sujets choisis sur le " +
      "problème plutôt que sur la mode : règles métier contre la fraude, clustering pour la segmentation.",
    preuves: [
      {
        chiffre: "Fraude en baisse, conversion préservée",
        contexte: "Sms En Masse, canal sous la pression du régulateur et des amendes de l'ARCOM",
      },
      {
        chiffre: "Panier moyen en hausse de 50 %",
        contexte: "Verhoeven Joaillier, parcours d'achat refondus sur la donnée comportementale",
      },
    ],
  },
];
