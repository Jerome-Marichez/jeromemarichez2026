// ingenierie-web-sections.ts — jeromemarichez-fr
// Pôle 1 — Construire. Site internet, produit SaaS, application mobile.
//
// Faits sourcés dans cv-ingenieur-fullstack.md et cv-ai-engineer.md. Règles de
// véracité du CLAUDE.md appliquées : ISTQB **Foundation** seulement, aucun management
// de développeurs revendiqué, pas de Kubernetes administré en propre.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

export const SECTIONS_INGENIERIE_WEB: IEditorialSection[] = [
  {
    id: 'natures',
    kind: 'chapitre',
    pole: 'ingenierie-web',
    kicker: 'Ce que je construis',
    titre: 'Trois natures de produit, une seule façon de les tenir',
    chapo:
      'Un site, un produit SaaS et une application mobile ne se pilotent pas pareil : ils ' +
      "n'ont ni le même cycle de vie, ni les mêmes contraintes de mise en production, ni " +
      'les mêmes utilisateurs. Je les ai menés tous les trois, de la conception au run.',
    blocs: [
      {
        titre: 'Site internet',
        texte:
          'Vitrine, e-commerce ou site institutionnel lu par des investisseurs et par la ' +
          "presse. Le référencement et la performance n'y sont pas des options à ajouter " +
          'ensuite : ils se décident au moment de choisir la stratégie de rendu.',
        preuve:
          'Sites du fonds Truffle Capital et de ses participations (truffle.com, ' +
          'truffle100.fr, artedrone.fr), de la conception à l’exploitation.',
        decision: 'Ce qui se prérend et ce qui se rend à la requête, page par page.',
      },
      {
        titre: 'Produit SaaS',
        texte:
          'Un produit vendu à des grands comptes, avec ce que cela implique : montée en ' +
          'charge, disponibilité contractuelle, conformité exigée en appel d’offres. ' +
          'Conception et réalisation de bout en bout de la plateforme BtoB « Sms En Masse », ' +
          'en remplacement d’une solution tierce exploitée en marque blanche.',
        preuve: 'Conformité RGPD et DORA tenue en appels d’offres distribution, assurance, banque.',
        decision: 'Ce que vous internalisez, et ce que vous continuez de louer à un tiers.',
      },
      {
        titre: 'Application mobile',
        texte:
          'iOS et Android sous Ionic et Angular, jusqu’aux magasins d’applications. Suivi ' +
          'des parcours et des échecs via Firebase Analytics et Crashlytics, du signal ' +
          'jusqu’au correctif livré.',
        preuve:
          'Application « Prézage » : migration Ionic 6 vers 8 et Angular 15 vers 19 menée ' +
          'sans interruption ni gel de la roadmap.',
      },
    ],
  },
  {
    id: 'cadrage',
    kind: 'chapitre',
    pole: 'ingenierie-web',
    kicker: 'Avant la première ligne',
    titre: 'Le cadrage, tenu par celui qui devra le coder',
    chapo:
      'Neuf ans dont deux en double casquette technique et pilotage. Je recueille le ' +
      'besoin, je le traduis en spécifications, et je sais ce que chaque ligne coûtera à ' +
      'implémenter — parce que c’est moi qui l’implémenterai.',
    blocs: [
      {
        titre: 'Recueil du besoin et spécifications',
        texte:
          'Modélisation des flux en BPMN 2.0, cartographie du système d’information, ' +
          'matrice de risques, recette et tests d’acceptation. Le besoin d’équipes ' +
          'scientifiques ou dirigeantes est traduit en spécifications exploitables par des ' +
          'prestataires qui ne connaissent pas leur domaine.',
        preuve:
          'AMOA de la startup biotech Artedrone ; intégration de l’ERP M3 Soft et ' +
          'synchronisation boutique physique / e-commerce, survente évitée sur des pièces uniques.',
        decision: 'Ce qui entre dans la version 1, et ce qui attend sans bloquer le reste.',
      },
      {
        titre: 'Interfaces et parcours',
        texte:
          'Maquettage, catalogue de composants sous Storybook, accessibilité RGAA, WCAG et ' +
          'W3C traitée pendant la conception et non en rattrapage. Les parcours sont ' +
          'refondus sur la mesure — c’est le pôle 3 qui fournit les chiffres.',
        preuve: 'Panier moyen en hausse de 50 % après refonte des tunnels d’achat.',
      },
      {
        titre: 'Coordination',
        texte:
          'Encadrement d’équipes marketing et SEO/SEA de 5 à 10 personnes, de prestataires ' +
          'externes, d’alternants et de stagiaires. Côté technique, le titre est Lead Tech ' +
          'dans une équipe de deux développeurs et un product owner.',
      },
    ],
  },
  {
    id: 'technique',
    kind: 'chapitre',
    pole: 'ingenierie-web',
    kicker: 'La construction',
    titre: 'Front, back, architecture et exploitation',
    chapo:
      'La même personne décide de la stratégie de rendu, du modèle de données et de la ' +
      'façon dont le tout est déployé. Les arbitrages sont donc pris en connaissant leurs ' +
      'trois conséquences en même temps, pas les unes après les autres.',
    blocs: [
      {
        titre: 'Front-end',
        texte:
          'React et Next.js avec stratégie de rendu différenciée par type de page — CSR, ' +
          'SSR, SSG, ISR — pour arbitrer performance perçue, coût serveur et ' +
          'référencement. Angular, Ionic, Redux, Zustand, React Query, Tailwind, Material UI, ' +
          'SCSS et CSS-in-JS.',
        preuve: 'Lighthouse 98/100, conformité RGAA / WCAG tenue en parallèle.',
      },
      {
        titre: 'Back-end et données',
        texte:
          'Node.js et Express, API REST, webhooks, cloud functions, traitements ' +
          'asynchrones distribués via Google Cloud Pub/Sub. PostgreSQL en relationnel, en ' +
          'séries temporelles et en vectoriel, MySQL, Firebase. Toute entrée externe est ' +
          'validée par un schéma Zod à la frontière.',
        decision: 'Ce qui reste synchrone, et ce qui part en file — avec le coût de chaque choix.',
      },
      {
        titre: 'Architecture et exploitation',
        texte:
          'Arbitrage monolithe ou microservices posé explicitement. Docker, CI/CD GitHub ' +
          'Actions, Google Cloud — Cloud Run, VM Compute Engine auto-scalées, cloud ' +
          'functions, Pub/Sub —, Vercel, serveurs on-premise et IaaS sous Apache, Nginx et ' +
          'Linux. Pas de cluster Kubernetes administré en propre : c’est écrit ici parce ' +
          'que vous méritez de le savoir avant de signer.',
        preuve:
          'SLI / SLO / SLA définis et suivis, PCA et PRA testés par exercices de bascule, ' +
          'déploiements sans interruption de service.',
        decision: 'Où tourne votre produit, et ce que coûte réellement chaque option.',
      },
    ],
  },
  {
    id: 'qualite',
    kind: 'chapitre',
    pole: 'ingenierie-web',
    kicker: 'La qualité',
    titre: 'Certifiée et outillée, pas promise',
    chapo:
      'Chez MailingVox, il n’y avait ni QA ni équipe data : la qualité a été industrialisée ' +
      'parce qu’elle ne pouvait venir de personne d’autre. C’est cette méthode-là que vous ' +
      'achetez, pas une intention.',
    blocs: [
      {
        titre: 'ISTQB Foundation',
        texte:
          'La certification apporte un vocabulaire de recette commun et opposable : niveaux ' +
          'de test, critères d’entrée et surtout critères d’arrêt sont écrits avant la ' +
          'livraison, pas négociés pendant. C’est le seul niveau que je détiens, et c’est ' +
          'donc le seul que j’affiche.',
        decision: 'À partir de quand une version est livrable — et qui le dit.',
      },
      {
        titre: 'Développement piloté par les tests, en IA augmentée',
        texte:
          'Claude Code et Gemini au quotidien : agents, hooks, skills, loop et serveurs MCP ' +
          'internes. Le test fait foi avant, pendant et après la génération — c’est ce qui ' +
          'rend la vélocité gagnée réellement exploitable plutôt que dangereuse.',
        preuve: 'Vélocité augmentée à effectif constant.',
      },
      {
        titre: 'Outillage réellement en place',
        texte:
          'Jest, Cypress, Playwright, tests de mutation Stryker, Postman, Lighthouse. Tests ' +
          'fonctionnels et recette des parcours critiques, tests d’acceptation avec le ' +
          'product owner et les clients. Non fonctionnels : non-régression à chaque ' +
          'livraison, performance et charge sur les pics d’envoi, accessibilité.',
        decision: 'Quel niveau de test vous vous autorisez à ne pas payer, et sur quel périmètre.',
      },
    ],
  },
  {
    id: 'charniere-run',
    kind: 'charniere',
    kicker: 'Charnière vers le pôle 2',
    titre: 'La livraison n’est pas la fin, c’est le début du run',
    chapo:
      'Un produit mis en production se met à tourner, et ce qui tourne produit de la ' +
      'donnée : volumes, échecs, parcours abandonnés, coûts d’infrastructure. Exploiter, ' +
      'c’est mesurer. C’est ce moment précis qui fait naître le besoin de data et d’IA — ' +
      'pas une mode, et pas avant que le produit existe.',
    blocs: [
      {
        titre: 'Contrôles post-déploiement',
        texte: 'exécutés en production, pas seulement en recette.',
      },
      {
        titre: 'Pics d’affluence',
        texte: 'absorbés sans incident, y compris saisonniers sur un site marchand.',
      },
      {
        titre: 'Et ensuite',
        texte:
          'la donnée produite par le run devient la matière du pôle 2 — qualité, règles ' +
          'métier, modèles et IA en production.',
      },
    ],
  },
]
