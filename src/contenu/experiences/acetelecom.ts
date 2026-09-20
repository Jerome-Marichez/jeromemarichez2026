import type { IExperience } from "../../interfaces/IExperience";

// Puces reprises telles quelles du CV « Ingénieur Fullstack & Chef de Projet »,
// section EXPÉRIENCE (CLAUDE.md, « on la porte, on ne la réécrit pas »).
export const acetelecom: IExperience = {
  periode: "2023 à 2026",
  entreprise: "Acetelecom",
  secteur: "Éditeur SaaS BtoB multicanal, SMS, voix et email",
  statut: "salarie",
  posteIntitule:
    "Lead tech sur Sms En Masse · Ingénieur fullstack sur Prézage et MailingVox",
  contexte:
    "Éditeur lillois de campagnes multicanales vendues à des grands comptes de la distribution, de " +
    "l'assurance et de la banque. Équipe de trois, deux développeurs et un PO, sans QA, sans équipe " +
    "data et sans ops. Lead tech sur Sms En Masse, la plateforme SaaS neuve dont j'ai porté " +
    "l'architecture et la démarche qualité. Ingénieur fullstack sur l'application mobile grand public " +
    "Prézage et sur MailingVox, la plateforme historique en production depuis 2008.",
  realisations: [
    "Plateforme SaaS BtoB Sms En Masse conçue et livrée de bout en bout, en remplacement d'une " +
      "solution tierce exploitée en marque blanche. Architecture, modélisation des données, front et " +
      "back, CI/CD, mise en production et run.",
    "Front React et Next.js, rendu arbitré page par page. Design system en atomic design, documenté " +
      "sous Storybook et construit avec l'UI designer. Lighthouse 98/100, RGAA et WCAG.",
    "Back Node.js et Express, API REST publique spécifiée en OpenAPI, webhooks, traitements " +
      "asynchrones sur Google Cloud Pub/Sub, PostgreSQL et Redis. Design patterns appliqués côté " +
      "front comme côté back, modules partagés entre produits, conventions écrites.",
    "Démarche QA définie de zéro puis améliorée, non-régression sur trois niveaux branchée sur la CI " +
      "et bloquante avant la production. Déploiements sans interruption sur Google Cloud et Vercel, " +
      "PCA et PRA testés, astreinte et post-mortems.",
    "Fraude sur le canal SMS, sous la pression du régulateur et des amendes de l'ARCOM dans le " +
      "secteur. Schémas rendus visibles par l'analyse des données, puis protection en plusieurs " +
      "étapes le long du parcours client, sans friction pour les clients légitimes.",
    "Prézage, application mobile grand public en Ionic et Angular, plus de 200 000 installations et " +
      "près de 1 000 avis. Migration Ionic 6 vers 8 et Angular 15 vers 19 par paliers, sans " +
      "interruption ni gel de la feuille de route, avec un plan de test manuel rédigé de zéro.",
    "MailingVox, cartographie applicative, SI et infrastructure d'une plateforme de 2008, pour fonder " +
      "la mise en conformité RGPD et DORA et la réduction des coûts.",
    "Data et IA ouvertes à ma propre initiative. Base clients segmentée par clustering k-means, LLM " +
      "Claude sur Vertex AI avec recherche vectorielle pour le support de niveau 1, Llama 3 affiné sur " +
      "corpus métier. Et un prototype de modèle supervisé pour anticiper les échecs de dépôt vocal, à " +
      "partir d'une méthode publiée sur arXiv.",
    "Mesure d'acquisition remise d'aplomb, plan de taggage repris sur tous les produits, valeur " +
      "client à long terme suivie en BtoB et budgets réalloués sur ce qui convertit vraiment.",
    "AMOA et avant-vente technique grands comptes, appels d'offres et questionnaires sécurité. " +
      "Support de niveaux 2 et 3, schéma d'escalade modélisé en BPMN 2.0.",
    "Encadrement d'alternants et de stagiaires développeurs, revues de code et le métier avant " +
      "l'outil. Développement en IA augmentée piloté par les tests transmis à l'équipe.",
  ],
  stackTechnique: [
    "TypeScript",
    "React",
    "Next.js",
    "Storybook",
    "Material UI",
    "Node.js",
    "Express",
    "Ionic",
    "Angular",
    "Python",
    "PostgreSQL",
    "Redis",
    "Firebase",
    "OpenAPI",
    "Google Cloud",
    "Pub/Sub",
    "Cloud Run",
    "Vertex AI",
    "Vercel",
    "Docker",
    "GitHub Actions",
    "Playwright",
    "Cypress",
    "Jest",
    "Vitest",
    "Stryker",
    "SonarQube",
    "Postman",
    "k6",
    "Jira",
    "Xray",
    "Claude Code",
    "Gemini",
    "TensorFlow",
    "Orange Data Mining",
    "n8n",
    "Make",
    "Zapier",
    "Strapi",
    "Looker Studio",
    "Tableau",
    "Google Analytics 4",
    "BPMN 2.0",
  ],
  encadrement:
    "Alternants et stagiaires développeurs encadrés, revues de code et le métier avant l'outil. " +
    "Développement en IA augmentée piloté par les tests transmis à l'équipe.",
};
