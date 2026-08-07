// experiences.ts — jeromemarichez2026
// Parcours professionnel. Sources : CV de référence (/Users/nicolasb/Documents/CV/).
//
// Véracité — points tenus ici :
// - Les intitulés Verhoeven Joaillier et Truffle Capital sont repris À L'IDENTIQUE des
//   trois CV, sans réécriture. Ne pas les reformuler pour coller à une offre.
// - Aucun management, lead ni mentorat de développeurs : l'encadrement porte sur des
//   équipes marketing, des prestataires externes, des alternants et des stagiaires.
// - GTM appartient à la période Acetelecom / MailingVox. Chez Verhoeven : Google
//   Analytics, A/B testing et heatmaps — jamais GTM.
import type { IExperience } from '../interfaces/experience'
import { experienceSchema } from '../schemas/experience.schema'

const donnees = [
  {
    cle: 'acetelecom-mailingvox',
    // Intitulé réel retenu (CLAUDE.md). Les trois CV en portent des déclinaisons
    // ciblées ; l'arbitrage de la déclinaison publiée revient à Jérôme MARICHEZ.
    intitule: 'Lead Tech',
    employeur: 'Acetelecom / MailingVox',
    secteur: 'Éditeur SaaS BtoB multicanal',
    anneeDebut: 2023,
    anneeFin: 2026,
    contexte:
      'Équipe de 3 (2 développeurs et 1 PO), sans QA ni équipe data. Trois produits : plateforme SaaS, application mobile, offre vocale grands comptes.',
    faits: [
      'Conception et réalisation de bout en bout de la plateforme SaaS BtoB « Sms En Masse », en remplacement d’une solution tierce exploitée en marque blanche : architecture, choix technologiques, arbitrage monolithe / microservices, développement, déploiement et run.',
      'Front React / Next.js avec stratégie de rendu différenciée par type de page (ISR, SSG, SSR, CSR) pour arbitrer performance perçue, coût serveur et référencement. Lighthouse 98/100, conformité RGAA / WCAG.',
      'Back Node.js / Express : API REST, webhooks, cloud functions et traitements asynchrones distribués via Google Cloud Pub/Sub. Modélisation PostgreSQL en relationnel, séries temporelles et vectoriel, et NoSQL.',
      'Application mobile Prézage (iOS / Android) : migration Ionic 6 vers 8 et Angular 15 vers 19 menée de bout en bout sans interruption ni gel de la roadmap. Dette technique résorbée, chiffre d’affaires maintenu.',
      'IA en production : modèle supervisé anticipant les échecs de dépôt vocal (TensorFlow, inférence en cloud functions, versioning, monitoring), Llama 3 fine-tuné sur corpus métier pour Prézage, réponse automatisée aux tickets de support de niveau 1 par recherche vectorielle PostgreSQL et API OpenAI, LLM Claude sur Vertex AI, agents et serveurs MCP.',
      'Collecte de données de bout en bout : plan de taggage et nomenclature d’événements standardisée sur le web et l’application mobile, Google Tag Manager en conteneur web et server-side, Measurement Protocol, Firebase Analytics et Crashlytics côté mobile, déclenchement des tags conditionné au consentement recueilli.',
      'Système d’analyse multi-sources des campagnes (SEO, SEA, IA) conforme RGPD : agrégation des sources d’acquisition, réconciliation et dédoublonnage des identités, mesure de la rentabilité client à long terme. KPI branchés sur Google Ads et Bing Ads.',
      'Qualité industrialisée faute de QA dédiée : recette des parcours critiques, tests d’acceptation avec le PO et les clients, non-régression à chaque livraison, performance et charge sur les pics d’envoi, accessibilité RGAA / WCAG / W3C. Jest, Cypress, Playwright, mutation Stryker, Postman.',
      'Mise en production maîtrisée : pipelines CI/CD Docker et GitHub Actions exécutés à chaque livraison, déploiements sans interruption de service sur Google Cloud et Vercel, contrôles post-déploiement. SLI / SLO / SLA suivis, PCA et PRA testés par exercices de bascule, conformité RGPD et DORA exigée en appels d’offres grands comptes (distribution, assurance, banque).',
      'Analyse des schémas de fraude sous Orange Data Mining et règles métier mises en production : fraude en baisse, conversion des inscriptions en hausse, latence réduite.',
      'Développement full stack TypeScript et Python en IA augmentée (Claude Code, Gemini — agents, hooks, skills, loop, serveurs MCP internes), piloté par les tests : vélocité augmentée à effectif constant.',
    ],
    offresLiees: ['ingenierie-web', 'data-ia', 'seo-sea'],
  },
  {
    cle: 'verhoeven-joaillier',
    // Repris à l'identique des CV — ne pas reformuler.
    intitule: 'Développeur Full Stack · E-commerce de luxe',
    employeur: 'Verhoeven Joaillier',
    secteur: 'Joaillerie de luxe, e-commerce haut de gamme',
    anneeDebut: 2019,
    anneeFin: 2022,
    contexte:
      'Poste unique, autonomie complète : architecture, développement, serveurs, support interne et prestataires.',
    faits: [
      'Sortie d’un socle en fin de vie sans couper le site marchand : back PHP 5 vers 7 puis réécriture Node.js en programmation orientée objet, front jQuery vers React.',
      'Intégration de l’ERP M3 Soft et synchronisation boutique physique / e-commerce : flux commande, stock et facturation modélisés en BPMN, spécifiés, développés et recettés. Stocks fiabilisés, survente évitée sur des pièces uniques.',
      'Refonte des parcours d’achat pilotée par la mesure : A/B testing des pages et des designs, analyse comportementale (heatmaps, taux de rebond), conversions suivies dans Google Analytics. Panier moyen en hausse de 50 %.',
      'Administration des serveurs Apache / Linux on-premise et IaaS, optimisation applicative et indicateurs de service (SLI / SLO) : pics saisonniers absorbés sans incident.',
      'Cadrage RGPD des données clients, documentation et support aux utilisateurs internes.',
      'Encadrement des prestataires SEA (budget d’environ 25 000 €), SEO et SMA.',
    ],
    offresLiees: ['ingenierie-web', 'seo-sea'],
  },
  {
    cle: 'truffle-capital',
    // Repris à l'identique des CV — ne pas reformuler.
    intitule: 'Développeur web & Chef de projet digital',
    employeur: 'Truffle Capital',
    secteur: 'Capital-risque : fintech, medtech, biotech',
    anneeDebut: 2017,
    anneeFin: 2019,
    contexte:
      'Double casquette technique et pilotage, vitrines lues par des investisseurs et par la presse spécialisée.',
    faits: [
      'Refonte et développement full stack des sites du fonds et de ses participations (truffle.com, truffle100.fr, artedrone.fr) : conception, choix techniques, développement, recette, déploiement et exploitation (Apache / Nginx).',
      'AMOA de la startup biotech Artedrone : besoin recueilli auprès des équipes scientifiques et dirigeantes, traduit en spécifications exploitables par des prestataires non spécialistes du domaine.',
      'Coordination d’une équipe marketing de 5 à 10 personnes et de 3 prestataires. Budget ADS / SEO de 100 000 € piloté, mesuré et justifié auprès des dirigeants.',
    ],
    offresLiees: ['ingenierie-web', 'seo-sea'],
  },
] satisfies readonly IExperience[]

/**
 * Validées au chargement : une donnée non conforme échoue au build, pas en production.
 * Ordre éditorial : de la plus récente à la plus ancienne.
 */
export const experiences: readonly IExperience[] = donnees.map((experience) =>
  experienceSchema.parse(experience),
)
