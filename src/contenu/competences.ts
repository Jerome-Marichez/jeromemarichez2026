import type { ICompetence } from '../interfaces/ICompetence'
import { mesure } from './projets/mesure'
import { smsEnMasseDemarcheQa } from './projets/sms-en-masse-demarche-qa'
import { smsEnMasseDesignSystem } from './projets/sms-en-masse-design-system'
import { smsEnMasseIaAugmentee } from './projets/sms-en-masse-ia-augmentee'
import { smsEnMassePlateforme } from './projets/sms-en-masse-plateforme'
import { truffle } from './projets/truffle'

// Familles reprises du CV « Ingénieur Fullstack & Chef de Projet », section
// COMPÉTENCES. Chaque item reste court : ce fichier alimente un mur dense.
//
// L'ancrage de chaque famille reprend le titre d'un projet réel de
// `src/contenu/projets/` par import, jamais recopié à la main : un renommage
// de projet se répercute ici plutôt que de créer un intitulé fantôme. Chaque
// rapprochement est justifié phrase à phrase dans la pull request qui l'a
// introduit (issue #173). Une famille sans import d'ancrage n'a reçu aucun
// rapprochement suffisamment explicite dans les fiches projet.
export const competences: ICompetence[] = [
  {
    famille: 'Front & design system',
    ancrage: { titreProjet: smsEnMasseDesignSystem.titre },
    items: [
      'TypeScript en typage strict',
      'React, Next.js, rendu arbitré page par page entre ISR, SSG, SSR et CSR',
      'Vite, Redux, Zustand, React Query',
      'Atomic design, bibliothèque de composants documentée sous Storybook',
      'SCSS, modules CSS, Material UI',
      'Angular et Ionic en production sur iOS et Android, React Native',
      'WordPress, Strapi',
      'RGAA et WCAG',
    ],
  },
  {
    famille: 'Back & architecture',
    ancrage: { titreProjet: smsEnMassePlateforme.titre },
    items: [
      'Node.js, Express',
      'API REST spécifiée en OpenAPI, webhooks',
      'Validation Zod, fonctions serverless, Google Cloud Pub/Sub',
      'Design patterns front et back, découpage modulaire',
      "Contrat d'interface entre front et back",
      'Arbitrage entre monolithe et microservices',
      "Intégration d'ERP, n8n, Make, Zapier, serveur MCP",
      "Python, PHP en reprise d'existant",
    ],
  },
  {
    famille: 'Qualité & tests',
    ancrage: { titreProjet: smsEnMasseDemarcheQa.titre },
    items: [
      'Stratégie et plans de test, analyse de risques',
      'Non-régression branchée sur la CI et bloquante',
      'Playwright, Cypress, Jest, Vitest, Stryker',
      'SonarQube, Postman, k6',
      'Recette manuelle et multi-plateformes',
      'Jira et Xray',
      'TDD',
    ],
  },
  {
    famille: 'IA augmentée',
    ancrage: { titreProjet: smsEnMasseIaAugmentee.titre },
    items: [
      'Claude Code et Gemini sur du TypeScript et du Python',
      'Agents, hooks, skills, boucles et serveurs MCP internes',
      "Critères d'acceptation écrits d'abord",
      'Tests et tests de mutation comme juge',
      'Intégration continue comme filet',
    ],
  },
  {
    famille: 'Data & IA',
    ancrage: { titreProjet: mesure.titre },
    items: [
      'PostgreSQL relationnel, séries temporelles et vectoriel',
      'MySQL, Redis, MongoDB, Supabase, Firebase',
      "SQL, contrôles d'intégrité, réconciliation d'identités multi-sources, RGPD",
      'Looker Studio, Tableau, tableaux de bord sur mesure',
      'Clustering k-means sous Orange Data Mining',
      'Réseaux de neurones sous TensorFlow',
      'LLM, Claude sur Vertex AI, OpenAI, Gemini, Llama 3 affiné sur corpus métier',
      'Recherche vectorielle',
    ],
  },
  {
    famille: 'Cloud & exploitation',
    ancrage: { titreProjet: smsEnMassePlateforme.titre },
    items: [
      'Google Cloud, Cloud Run, Pub/Sub, Vertex AI, cloud functions, Compute Engine',
      'Cloud Monitoring',
      'Vercel, serveurs on-premise et IaaS, Apache, Nginx',
      'Docker, Git, GitHub Actions, GitLab CI',
      'Déploiements sans interruption, astreinte, post-mortems',
      'SLI et SLO, PCA et PRA testés',
      'Linux, macOS, Windows, Bash',
    ],
  },
  {
    famille: 'Gestion de projet & AMOA',
    ancrage: { titreProjet: truffle.titre },
    items: [
      'Recueil et priorisation du besoin, spécifications fonctionnelles',
      'Chiffrage, planning, jalons, comités et reporting',
      'Scrum, Kanban, cycle en V',
      'Cartographie applicative et SI, BPMN 2.0, analyse de risques',
      "Avant-vente technique, appels d'offres, questionnaires sécurité",
      'RGPD et DORA',
      'Jira, Trello',
    ],
  },
  {
    famille: 'Encadrement & pilotage',
    ancrage: { titreProjet: truffle.titre },
    items: [
      'Alternants et stagiaires développeurs encadrés, revues de code',
      "Le métier avant l'outil",
      'Prestataires recrutés, briefés et mesurés',
      'Équipe de 5 à 10 personnes coordonnée',
      'Budgets justifiés en comité de direction',
      'Choix techniques défendus devant des équipes non encadrées',
    ],
  },
  {
    famille: 'Acquisition & mesure',
    ancrage: { titreProjet: mesure.titre },
    items: [
      'Plan de taggage',
      'Google Tag Manager web et server-side',
      'Google Analytics 4, Matomo, Search Console',
      'Google Ads, Bing Ads, SEO technique',
      'Valeur client à long terme, A/B testing',
    ],
  },
]
