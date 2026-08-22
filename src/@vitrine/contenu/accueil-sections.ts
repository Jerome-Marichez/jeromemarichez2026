// accueil-sections.ts — jeromemarichez-fr
// Les sections qui déroulent la chaîne : fil transverse, puis pôle, charnière, pôle,
// charnière, pôle.
//
// Les charnières ne sont plus numérotées : à quatre pôles dont deux parallèles, un
// « 2 → 3 » affirmerait une file d'étapes que le modèle n'a pas. Elles portent désormais
// le nom de ce vers quoi elles passent la main.
//
// L'ordre est le contenu. Retirer une charnière ne raccourcirait pas la page : cela
// transformerait l'offre en catalogue.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'
import { SECTION_ACCUEIL_DATA } from './accueil-data'
import { SECTION_FIL_IA } from './fil-ia'
import { SECTION_RENFORTS } from './renforts'

export const SECTIONS_ACCUEIL: IEditorialSection[] = [
  // Le fil ouvre la chaîne : la méthode se lit avant les pôles, sinon le lecteur
  // découvre l'IA au pôle Data et la range comme une offre parmi les autres.
  SECTION_FIL_IA,
  {
    id: 'ingenierie-web',
    kind: 'pole',
    pole: 'ingenierie-web',
    kicker: 'Le socle · Construire',
    titre: 'Site internet, produit SaaS, application mobile',
    chapo:
      "Concevoir, développer, mettre en production, puis rester pour l'exploiter. Front, back, " +
      'donnée, qualité et run tenus par la même personne.',
    blocs: [
      {
        titre: 'Front et stratégie de rendu',
        texte: 'React et Next.js côté web, Angular et Ionic pour le mobile iOS et Android.',
        preuve:
          'Lighthouse 98/100 sur la plateforme SaaS « Sms En Masse », conformité RGAA / WCAG.',
        decision: 'Quelle page se rend au build, laquelle à la requête, et ce que chacune coûte.',
      },
      {
        titre: 'Back, données et architecture',
        texte:
          'Node.js, API REST, cloud functions et Pub/Sub ; PostgreSQL, MySQL, Firebase, ' +
          'entrées validées par Zod.',
        decision: "Ce qu'on découpe maintenant, ce qu'on garde monolithique, et jusqu'à quand.",
      },
      {
        titre: 'Qualité certifiée et outillée',
        texte:
          'Développement piloté par les tests, en IA augmentée : Claude Code et Gemini, le ' +
          'test faisant foi.',
        preuve: 'Certification ISTQB Foundation. Non-régression rejouée à chaque livraison.',
        decision: 'Quel niveau de test vous vous autorisez à ne pas payer, et sur quoi.',
      },
      {
        titre: 'Migrations sans coupure',
        texte:
          "Sortir d'un socle en fin de vie sans arrêter le service ni geler la feuille de " +
          'route.',
        preuve:
          'Trois migrations majeures, aucune interruption de service, chiffre d’affaires maintenu.',
        decision: "Ce qu'on migre ce trimestre, ce qu'on gèle, et le coût réel de l'attente.",
      },
    ],
  },
  {
    id: 'charniere-run',
    kind: 'charniere',
    // Nommée par ses deux extrémités, et non numérotée : à quatre pôles dont deux
    // parallèles, « Charnière 1 → 2 » ferait croire à une file de quatre étapes.
    kicker: 'Charnière · vers la donnée',
    titre: 'On ne livre pas, on exploite',
    chapo:
      "La mise en production n'est pas la fin du projet : c'est le run qui fait naître le " +
      "besoin de data et d'IA.",
    blocs: [
      {
        titre: 'SLI / SLO / SLA',
        texte: 'définis, suivis et opposables, pas écrits après l’incident.',
      },
      {
        titre: 'PCA et PRA',
        texte: 'testés par exercices de bascule, pas simplement documentés.',
      },
      {
        titre: 'Pics d’affluence',
        texte:
          'absorbés sans incident, conformité RGPD et DORA tenue en appels d’offres ' +
          'grands comptes.',
      },
      {
        titre: 'La preuve que le lien existe',
        texte:
          'les règles anti-fraude sont issues de l’historique produit par l’exploitation. Sans ' +
          'run, pas de pôle Data.',
      },
    ],
  },
  // Version courte du pôle Data : même ordre que la page dédiée — métier, stratégie
  // data, gouvernance. Extraite dans son propre fichier pour que cet ordre ne soit
  // jamais rogné au profit de la limite de 300 lignes.
  SECTION_ACCUEIL_DATA,
  {
    id: 'charniere-arbitrage',
    kind: 'charniere',
    kicker: 'Charnière · vers l’arbitrage',
    titre: 'Sans donnée claire, le budget brûle',
    chapo:
      'La donnée mise au propre devient la matière des arbitrages. Sans elle, le SEA achète du ' +
      "volume et l'UX devient une affaire de goût.",
    blocs: [
      {
        titre: 'LTV plutôt que coût par clic',
        texte:
          'les budgets s’arbitrent sur la rentabilité client réelle, pas sur celles des régies.',
      },
      {
        titre: 'Réconciliation des identités',
        texte: 'agrégation multi-sources et dédoublonnage avant toute lecture de performance.',
      },
      {
        titre: 'La preuve que le lien existe',
        texte:
          'le système d’analyse multi-sources mesure la rentabilité client dans la durée. ' +
          'C’est sur ce chiffre-là que les budgets sont arbitrés.',
      },
    ],
  },
  {
    id: 'sea-ux',
    kind: 'pole',
    pole: 'sea-ux',
    kicker: 'Une suite · Arbitrer',
    titre: 'Je ne dessine pas vos maquettes, je tranche vos parcours',
    chapo:
      'Pas de création graphique : des arbitrages pris sur la donnée, que j’implémente ' +
      'moi-même.',
    blocs: [
      {
        titre: 'La mesure est construite dans le code',
        texte:
          'GTM en conteneur web et server-side, plan de taggage opposable ; Firebase Analytics ' +
          'et Crashlytics côté mobile.',
        decision: 'Quels événements existent, ce qu’ils portent, et qui répond de leur exactitude.',
      },
      {
        titre: 'Conformité par construction',
        texte: 'RGPD, CMP et déclenchement conditionnel des tags par catégorie de consentement.',
        decision:
          'Ce que vous collectez, ce que vous n’avez pas le droit de collecter, et pourquoi.',
      },
      {
        titre: 'Arbitrages de parcours, pris sur la mesure',
        texte:
          'A/B testing des pages, heatmaps, taux de rebond : une étape disparaît parce que les ' +
          'chiffres le disent.',
        preuve: 'Panier moyen en hausse de 50 % sur un e-commerce de joaillerie de luxe.',
        decision: 'Quelle étape du tunnel disparaît, et ce que vous gagnez à la supprimer.',
      },
      {
        titre: 'Pilotage de l’acquisition',
        texte:
          'Google Ads, Bing Ads, SEO, SEA et SMA ; référencement technique traité comme une ' +
          'propriété du produit.',
        preuve:
          '100 000 € de budget ADS / SEO pilotés chez Truffle Capital, environ 25 000 € ' +
          'd’encadrement de prestataires SEA chez Verhoeven Joaillier.',
        decision: 'Quelle source d’acquisition vous coupez le mois prochain, et sur quel chiffre.',
      },
    ],
    transition:
      'L’arbitrage décidé le lundi est implémenté dans la semaine, sans devis d’un tiers.',
  },
  {
    id: 'un-seul-interlocuteur',
    kind: 'preuves',
    kicker: 'L’objection',
    titre: 'Un seul interlocuteur — et si je disparais ?',
    chapo:
      'Vendre un interlocuteur unique, c’est concentrer un risque : autant dire tout de suite ' +
      'comment il est traité.',
    blocs: [
      {
        titre: 'Le produit n’est pas dans ma tête',
        texte:
          'Tests écrits avant le code, non-régression, CI/CD et mutation à chaque livraison. ' +
          'Une base couverte se reprend.',
        preuve:
          'Jest, Cypress, Playwright, mutation Stryker, Postman. Certification ISTQB Foundation.',
      },
      {
        titre: 'Les spécifications sont écrites pour quelqu’un d’autre que moi',
        texte:
          'Traduire un besoin en spécifications exploitables par des tiers extérieurs au ' +
          'domaine : c’est le métier que j’exerçais avant.',
        preuve:
          'AMOA de la startup biotech Artedrone. Serveurs MCP et plugins n8n, Make et Zapier documentés.',
      },
      {
        titre: 'Le relais, je l’ai déjà passé',
        texte:
          'Encadrer des prestataires externes, c’est exactement l’exercice : leur donner ' +
          'de quoi travailler sans moi.',
        preuve:
          'Une équipe marketing de 5 à 10 personnes et trois prestataires coordonnés chez ' +
          'Truffle Capital ; prestataires SEA, SEO et SMA encadrés chez Verhoeven Joaillier.',
        decision:
          'Ce que vous exigez de moi contractuellement — documentation, accès, revue de ' +
          'reprise — et à quel moment vous voulez pouvoir le vérifier.',
      },
    ],
  },
  // Les deux faces d'un même risque : au-dessus, l'interlocuteur unique qui pourrait
  // manquer ; ici, le projet qui devient trop gros pour lui. Dire la seconde après la
  // première évite que la promesse se lise comme « personne d'autre ne travaillera sur
  // votre projet », ce qu'elle n'a jamais eu le droit de promettre.
  SECTION_RENFORTS,
]
