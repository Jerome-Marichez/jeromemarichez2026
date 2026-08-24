// ingenierie-web-sections.ts — jeromemarichez-fr
// Le pôle Ingénierie web — le socle. Site internet, produit SaaS, application mobile.
//
// Faits sourcés dans cv-ingenieur-fullstack.md et cv-ai-engineer.md. Règles de
// véracité du CLAUDE.md appliquées : ISTQB **Foundation** seulement, aucun management
// de développeurs revendiqué, pas de Kubernetes administré en propre.
//
// **Ce que cette page a accueilli en descendant de l'accueil (issue #103)** : le chapitre
// « migrations », qui n'existait nulle part en propre ; l'outillage de test nommé, qui
// n'était écrit que sur l'accueil ; l'arbitrage monolithe / microservices ; les nuances de
// la charnière — SLI / SLO / SLA opposables, PCA et PRA testés et pas seulement
// documentés, et l'exemple qui prouve que le run fabrique la donnée. Le **fil IA** y est
// aussi descendu : la note de placement est en tête de `fil-ia.ts`.
//
// Une exception, et elle est délibérée : la mention « chiffre d'affaires maintenu » qui
// accompagnait les migrations sur l'accueil n'est PAS descendue. Le périmètre de
// confidentialité écrit en tête de `realisations/mailingvox-produits.ts` pose que les
// chiffres de ce projet ne sont publiés nulle part sur le site — l'accueil le
// contredisait. La contrainte tenue, elle, est sourcée : aucune interruption de service,
// aucun gel de la roadmap. Elle suffit.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'
import { SECTION_FIL_IA } from './fil-ia'

export const SECTIONS_INGENIERIE_WEB: IEditorialSection[] = [
  {
    id: 'natures',
    kind: 'chapitre',
    pole: 'ingenierie-web',
    kicker: 'Ce que je construis',
    titre: 'Trois natures de produit, une seule façon de les tenir',
    chapo:
      'Trois natures de produit, trois jeux de contraintes. Je les ai menés tous les trois, de ' +
      'la conception au run.',
    blocs: [
      {
        titre: 'Site internet',
        preuve:
          'Sites du fonds Truffle Capital et de ses participations (truffle.com, ' +
          'truffle100.fr, artedrone.fr), de la conception à l’exploitation.',
        decision: 'Ce qui se prérend et ce qui se rend à la requête, page par page.',
      },
      {
        titre: 'Produit SaaS',
        preuve: 'Conformité RGPD et DORA tenue en appels d’offres distribution, assurance, banque.',
        decision: 'Ce que vous internalisez, et ce que vous continuez de louer à un tiers.',
      },
      {
        titre: 'Application mobile',
        texte:
          'iOS et Android sous Ionic et Angular. Parcours et échecs suivis via Firebase ' +
          'Analytics et Crashlytics.',
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
      'Neuf ans dont deux en double casquette technique et pilotage : je chiffre ce que chaque ' +
      'ligne de spécification coûtera.',
    blocs: [
      {
        titre: 'Recueil du besoin et spécifications',
        preuve:
          'AMOA de la startup biotech Artedrone ; intégration de l’ERP M3 Soft et ' +
          'synchronisation boutique physique / e-commerce, survente évitée sur des pièces uniques.',
        decision: 'Ce qui entre dans la version 1, et ce qui attend sans bloquer le reste.',
      },
      {
        titre: 'Interfaces et parcours',
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
      'Rendu, modèle de données et déploiement décidés par la même personne : les trois ' +
      'conséquences sont connues ensemble.',
    blocs: [
      {
        titre: 'Front-end',
        preuve:
          'Lighthouse 98/100 sur la plateforme SaaS « Sms En Masse », conformité RGAA / WCAG ' +
          'tenue en parallèle.',
        decision: 'Quelle page se rend au build, laquelle à la requête, et ce que chacune coûte.',
      },
      {
        titre: 'Back-end et données',
        texte:
          'Node.js et Express, API REST, webhooks, cloud functions, Pub/Sub. PostgreSQL, ' +
          'MySQL, Firebase ; toute entrée externe est validée par un schéma Zod.',
        decision: 'Ce qui reste synchrone, et ce qui part en file — avec le coût de chaque choix.',
      },
      {
        titre: 'Architecture et exploitation',
        texte:
          'Docker, CI/CD GitHub Actions, Cloud Run, VM Compute Engine auto-scalées, Pub/Sub, ' +
          'Vercel, Apache, Nginx et Linux. Pas de cluster Kubernetes administré en propre.',
        preuve:
          'SLI / SLO / SLA définis, suivis et opposables — pas écrits après l’incident. PCA et ' +
          'PRA testés par exercices de bascule, pas seulement documentés. Déploiements sans ' +
          'interruption de service.',
        decision:
          'Ce qu’on découpe maintenant, ce qu’on garde monolithique et jusqu’à quand — et où ' +
          'tourne votre produit, avec le coût réel de chaque option.',
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
      'Chez MailingVox, ni QA ni équipe data : la qualité a été industrialisée parce qu’elle ' +
      'ne pouvait venir de personne d’autre.',
    blocs: [
      {
        titre: 'ISTQB Foundation',
        texte:
          'Critères d’entrée et d’arrêt écrits avant la livraison. C’est le seul niveau que je ' +
          'détiens, et c’est donc le seul que j’affiche.',
        decision: 'À partir de quand une version est livrable — et qui le dit.',
      },
      {
        titre: 'Développement piloté par les tests, en IA augmentée',
        preuve: 'Vélocité augmentée à effectif constant.',
      },
      {
        titre: 'Outillage réellement en place',
        texte:
          'Jest, Cypress, Playwright, tests de mutation Stryker, Postman. Non-régression ' +
          'rejouée à chaque livraison, pas seulement avant les grandes.',
        decision: 'Quel niveau de test vous vous autorisez à ne pas payer, et sur quel périmètre.',
      },
    ],
  },
  // Les migrations avaient un bloc sur l'accueil et pas de chapitre ici : c'était la seule
  // compétence du socle que la page de détail disait moins bien que la vitrine. Elle est
  // remontée en chapitre parce que c'est une prestation qu'on achète pour elle-même, pas
  // un attribut d'une autre.
  {
    id: 'migrations',
    kind: 'chapitre',
    pole: 'ingenierie-web',
    kicker: 'Sans coupure',
    titre: 'Migrer un produit qui continue de sortir des versions',
    chapo:
      'Une migration menée à l’arrêt est facile et personne ne peut se l’offrir. Les trois ' +
      'miennes ont été menées pendant que le produit vivait.',
    blocs: [
      {
        titre: 'Trois migrations majeures',
        texte:
          'PHP 5 vers 7 puis réécriture en Node.js, jQuery vers React, Ionic 6 vers 8 et ' +
          'Angular 15 vers 19.',
        preuve: 'Aucune interruption de service, aucun gel de la roadmap produit sur les trois.',
      },
      {
        titre: 'Par paliers livrables',
        texte:
          'Chaque palier laisse une version déployable : la migration peut s’arrêter à ' +
          'n’importe quel moment sans laisser le produit à mi-chemin.',
        decision: 'Ce qu’on migre ce trimestre, ce qu’on gèle, et le coût réel de l’attente.',
      },
      {
        titre: 'La dette résorbée dans le mouvement',
        texte:
          'Le rattrapage technique se fait pendant la migration plutôt que dans un chantier à ' +
          'part, qui ne serait jamais priorisé.',
      },
    ],
  },
  // Le fil IA descend de l'accueil (issue #103) et se pose ici, sur le socle : c'est la
  // page où le site dit comment le code est produit. Il garde ses quatre étapes, donc son
  // caractère transverse — livrer et piloter nomment les deux autres suites.
  SECTION_FIL_IA,
  {
    id: 'charniere-run',
    kind: 'charniere',
    kicker: 'Charnière · vers la donnée',
    titre: 'La livraison n’est pas la fin, c’est le début du run',
    chapo:
      'Ce qui tourne produit de la donnée : c’est ce moment-là qui fait naître le besoin de ' +
      'data et d’IA.',
    blocs: [
      {
        titre: 'Contrôles post-déploiement',
        texte: 'exécutés en production, pas seulement en recette.',
      },
      {
        titre: 'Pics d’affluence',
        texte:
          'absorbés sans incident, y compris saisonniers sur un site marchand. Conformité ' +
          'RGPD et DORA tenue en appels d’offres grands comptes.',
      },
      {
        titre: 'La preuve que le lien existe',
        texte:
          'les règles anti-fraude viennent de l’historique produit par l’exploitation, pas ' +
          'd’un atelier. Sans run, pas de pôle Data.',
      },
      {
        titre: 'Et ensuite',
        texte: 'la donnée produite par le run devient la matière du pôle Data.',
      },
    ],
  },
]
