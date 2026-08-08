// ingenierie-web.ts — jeromemarichez2026
// Données éditoriales de l'offre « Ingénierie Web ».
// Sources de vérité : README.md (périmètre éditorial) puis les CV de référence
// (/Users/nicolasb/Documents/CV/) pour les chiffres, dates et périmètres.
// Relu ligne à ligne contre les règles de véracité du CLAUDE.md.
//
// Repositionnement du 2026-08-08 (arbitrage de Jérôme MARICHEZ, issue #16) : l'axe
// « Livré SEO-ready » descend de l'ancienne offre « SEO / SEA », où il s'appelait
// « SEO technique ». Le référencement n'est plus vendu comme une prestation : il est
// une PROPRIÉTÉ DU LIVRABLE de cette offre-ci. L'ordre des axes suit la chaîne — je
// cadre, je développe, je câble la donnée.
import type { IOffre } from '../../interfaces/offre'
import { offreSchema } from '../../schemas/offre.schema'

const donnees = {
  cle: 'ingenierie-web',
  titre: 'Ingénierie Web',
  accroche:
    'Concevoir, développer et exploiter un produit web ou mobile de bout en bout : je cadre, je développe, puis je câble la donnée qui pilotera l’acquisition et alimentera les projets IA.',
  decisionPermise:
    'Vous décidez quoi construire et quand livrer, face à un seul interlocuteur responsable du cadrage jusqu’au run — pas à une chaîne de prestataires.',
  axes: [
    {
      cle: 'cadrage',
      titre: 'Cadrage',
      description:
        'Recueil du besoin, spécifications, BPMN 2.0, cartographie SI, matrice de risques, recette et tests d’acceptation. Coordination d’équipes et de prestataires. Je traduis un besoin métier en spécifications exploitables par des intervenants non spécialistes du domaine.',
      preuve:
        'Coordination d’une équipe marketing de 5 à 10 personnes et de 3 prestataires chez Truffle Capital.',
    },
    {
      cle: 'ui-ux',
      titre: 'UI / UX',
      description:
        'Maquettage, design system et catalogue de composants (Storybook), accessibilité RGAA / WCAG / W3C, refonte de parcours pilotée par la mesure : A/B testing des pages et des designs, heatmaps, taux de rebond.',
      preuve: 'Panier moyen en hausse de 50 % sur un e-commerce de joaillerie de luxe.',
    },
    {
      cle: 'front-end',
      titre: 'Front-end',
      description:
        'React et Next.js, avec une stratégie de rendu différenciée par type de page (CSR, SSR, SSG, ISR) pour arbitrer performance perçue, coût serveur et référencement. Angular, Ionic (iOS / Android), Redux, Zustand, React Query, Material UI.',
      preuve: 'Lighthouse 98/100 sur la plateforme SaaS « Sms En Masse ».',
    },
    {
      cle: 'back-end',
      titre: 'Back-end',
      description:
        'Node.js et Express : API REST, webhooks, cloud functions, traitements asynchrones distribués via Google Cloud Pub/Sub. PostgreSQL en relationnel, séries temporelles et vectoriel, MySQL, Firebase, validation des entrées par schéma (Zod).',
      preuve: null,
    },
    {
      cle: 'seo-ready',
      titre: 'Livré SEO-ready',
      description:
        'Métadonnées et données structurées par page, URL canoniques, sitemap et robots générés, rendu statique, Core Web Vitals, sémantique HTML et accessibilité. Ce n’est pas une prestation de référencement : le site est prêt à être référencé, le travail éditorial et le netlinking ne font partie d’aucune offre.',
      preuve:
        'Le site que vous lisez en est la démonstration : son propre socle de référencement est construit exactement ainsi.',
    },
    {
      cle: 'architecture-exploitation',
      titre: 'Architecture et exploitation',
      description:
        'Arbitrage monolithe / microservices, Docker, CI/CD GitHub Actions, Google Cloud (Cloud Run, VM Compute Engine auto-scalées, cloud functions, Pub/Sub), Vercel, serveurs on-premise et IaaS. Pas de cluster Kubernetes administré en propre : je le dis plutôt que de le laisser supposer.',
      preuve:
        'SLI / SLO / SLA suivis, PCA et PRA testés par exercices de bascule, déploiements sans interruption de service.',
    },
    {
      cle: 'qualite',
      titre: 'Qualité',
      description:
        'Développement piloté par les tests (TDD) : tests fonctionnels, recette et tests d’acceptation (UAT), non-régression à chaque livraison, performance et charge, accessibilité. Jest, Cypress, Playwright, tests de mutation (Stryker), Postman, Lighthouse.',
      preuve:
        'Certification ISTQB Foundation, et qualité industrialisée dans une équipe de 3 sans QA dédiée.',
    },
    {
      cle: 'migrations',
      titre: 'Migrations sans coupure',
      description:
        'PHP 5 vers 7 puis réécriture Node.js, jQuery vers React, Ionic 6 vers 8 et Angular 15 vers 19.',
      preuve: 'Trois migrations majeures menées sans interruption de service ni gel de la roadmap.',
    },
    {
      cle: 'ia-augmentee',
      titre: 'Développement en IA augmentée',
      description:
        'Claude Code et Gemini au quotidien — agents, hooks, skills, loop, serveurs MCP internes — piloté par les tests : le test fait foi avant, pendant et après la génération.',
      preuve: 'Vélocité augmentée à effectif constant, dans une équipe de 3.',
    },
  ],
} satisfies IOffre

/** Validée au chargement : une donnée non conforme échoue au build, pas en production. */
export const offreIngenierieWeb: IOffre = offreSchema.parse(donnees)
