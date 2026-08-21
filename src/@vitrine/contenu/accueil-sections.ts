// accueil-sections.ts — jeromemarichez-fr
// Les sections qui déroulent la chaîne : fil transverse, puis pôle, charnière, pôle,
// charnière, pôle.
//
// L'ordre est le contenu. Retirer une charnière ne raccourcirait pas la page : cela
// transformerait l'offre en catalogue.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'
import { SECTION_FIL_IA } from './fil-ia'

export const SECTIONS_ACCUEIL: IEditorialSection[] = [
  // Le fil ouvre la chaîne : la méthode se lit avant les pôles, sinon le lecteur
  // découvre l'IA au pôle 2 et la range comme une offre parmi trois.
  SECTION_FIL_IA,
  {
    id: 'ingenierie-web',
    kind: 'pole',
    pole: 'ingenierie-web',
    kicker: 'Pôle 1 · Construire',
    titre: 'Site internet, produit SaaS, application mobile',
    chapo:
      "Concevoir, développer et mettre en production, puis rester pour l'exploiter. " +
      "L'architecture, le front, le back, la donnée, la qualité et le run sont tenus par " +
      'la même personne — ce qui supprime la moitié des allers-retours de spécification.',
    blocs: [
      {
        titre: 'Front et stratégie de rendu',
        texte:
          'React et Next.js, avec une stratégie de rendu différenciée par type de page — ' +
          'CSR, SSR, SSG ou ISR. Le choix arbitre trois choses en même temps : performance ' +
          'perçue, coût serveur et référencement. Angular et Ionic pour le mobile iOS et ' +
          'Android.',
        preuve:
          'Lighthouse 98/100 sur la plateforme SaaS « Sms En Masse », conformité RGAA / WCAG.',
        decision: 'Quelle page se rend au build, laquelle à la requête, et ce que chacune coûte.',
      },
      {
        titre: 'Back, données et architecture',
        texte:
          'Node.js et Express, API REST, webhooks, cloud functions et traitements ' +
          'asynchrones distribués via Google Cloud Pub/Sub. PostgreSQL en relationnel, en ' +
          'séries temporelles et en vectoriel, MySQL, Firebase, validation des entrées par ' +
          'schéma Zod. Arbitrage monolithe ou microservices posé explicitement, pas subi.',
        decision: "Ce qu'on découpe maintenant, ce qu'on garde monolithique, et jusqu'à quand.",
      },
      {
        titre: 'Qualité certifiée et outillée',
        texte:
          'Développement piloté par les tests, et développement en IA augmentée — Claude ' +
          'Code et Gemini au quotidien avec agents, hooks, skills, loop et serveurs MCP ' +
          'internes — le test faisant foi avant, pendant et après la génération. Jest, ' +
          'Cypress, Playwright, tests de mutation Stryker, Postman, Lighthouse, ' +
          'accessibilité RGAA / WCAG / W3C.',
        preuve: 'Certification ISTQB Foundation. Non-régression rejouée à chaque livraison.',
        decision: 'Quel niveau de test vous vous autorisez à ne pas payer, et sur quoi.',
      },
      {
        titre: 'Migrations sans coupure',
        texte:
          "Sortir d'un socle en fin de vie sans arrêter le service ni geler la feuille de " +
          'route. PHP 5 vers 7 puis réécriture Node.js et front jQuery vers React chez un ' +
          "joaillier dont le site marchand ne pouvait pas s'arrêter ; Ionic 6 vers 8 et " +
          "Angular 15 vers 19 sur l'application mobile Prézage.",
        preuve:
          'Trois migrations majeures, aucune interruption de service, chiffre d’affaires maintenu.',
        decision: "Ce qu'on migre ce trimestre, ce qu'on gèle, et le coût réel de l'attente.",
      },
    ],
  },
  {
    id: 'charniere-run',
    kind: 'charniere',
    // Numérotée dans la même série que les pôles : sans numéro, un titre de charnière
    // se lit comme un intertitre d'ambiance et le lecteur ne voit plus la chaîne.
    kicker: 'Charnière 1 → 2',
    titre: 'On ne livre pas, on exploite',
    chapo:
      "La mise en production n'est pas la fin du projet : c'est le moment où le produit " +
      "commence à produire des données. Exploiter, c'est mesurer — et c'est le run qui " +
      "fait naître le besoin de data et d'IA, pas l'inverse, et pas avant.",
    blocs: [
      {
        titre: 'SLI / SLO / SLA',
        texte: 'définis, suivis, et opposables — pas des intentions écrites après l’incident.',
      },
      {
        titre: 'PCA et PRA',
        texte: 'testés par exercices de bascule, pas simplement documentés.',
      },
      {
        titre: 'Pics d’affluence',
        texte:
          'absorbés sans incident, contrôles post-déploiement exécutés en production, ' +
          'conformité RGPD et DORA tenue en appels d’offres grands comptes.',
      },
      {
        titre: 'La preuve que le lien existe',
        texte:
          'les règles anti-fraude n’ont pas été imaginées avant la mise en production : ' +
          'elles sont issues de la reprise de l’historique que l’exploitation a produit. ' +
          'Sans run, pas de matière — et donc pas de pôle 2.',
      },
    ],
  },
  {
    id: 'data-ia',
    kind: 'pole',
    pole: 'data-ia',
    kicker: 'Pôle 2 · Mettre en production',
    titre: "La donnée d'abord, l'IA ensuite — dans le produit qui tourne",
    chapo:
      "L'IA que je livre tourne dans des produits vendus, avec les contraintes qui vont " +
      "avec : coût d'inférence, latence, RGPD, disponibilité. Pas dans des notebooks. Et " +
      'elle ne vaut rien tant que la donnée qui l’alimente n’a pas été mise au propre.',
    blocs: [
      {
        titre: 'Qualité de la donnée, traitée comme un prérequis',
        texte:
          "Contrôles d'intégrité et de véracité dès l'ingestion, dédoublonnage, détection " +
          "d'anomalies. Les écarts sont corrigés avant de contaminer les tableaux de bord, " +
          'pas après. Pipelines d’ingestion, nettoyage, agrégation et réconciliation ' +
          'multi-sources.',
        decision: 'Sur quels chiffres vous acceptez de décider, et lesquels sont encore du bruit.',
      },
      {
        titre: 'Règles métier tirées de la donnée',
        texte:
          'Analyse exploratoire sous Orange Data Mining, pondération et sélection des ' +
          'variables, élimination des corrélations fortes et des variables porteuses de ' +
          'bruit, puis règles implémentées dans le produit.',
        preuve: 'Fraude en baisse, conversion des inscriptions en hausse, latence réduite.',
        decision: 'Ce qui se règle par une règle métier, et ce qui mérite vraiment un modèle.',
      },
      {
        titre: 'Machine learning en production',
        texte:
          'Modèle supervisé anticipant les échecs de dépôt vocal, en production : extraction ' +
          'des caractéristiques du signal audio selon une méthode publiée sur arXiv par ' +
          "l'Universitat de Barcelona, que j'ai implémentée, adaptée aux données réelles " +
          'puis industrialisée. Entraînement TensorFlow, inférence en cloud functions, ' +
          'versioning et monitoring.',
        preuve: 'Routes vocales coûteuses évitées.',
      },
      {
        titre: 'LLM, agents et interopérabilité',
        texte:
          'Claude sur Vertex AI, OpenAI, Gemini, Llama : comparaison continue et arbitrage ' +
          'coût, latence, qualité et confidentialité par cas d’usage. Fine-tuning de Llama 3 ' +
          "sur corpus métier pour l'application mobile Prézage, complété d'un procédé maison " +
          "d'augmentation du contexte proche du RAG. RAG documentaire fait maison pour le " +
          'support de niveau 1 : recherche vectorielle PostgreSQL et API OpenAI, réponses ' +
          'ancrées sur votre documentation. Serveurs MCP et plugins n8n, Make et Zapier : ' +
          'votre produit devient appelable par un agent ou un scénario no-code.',
        decision: 'Quelle donnée reste chez vous, et ce que vous acceptez d’envoyer à un tiers.',
      },
    ],
  },
  {
    id: 'charniere-arbitrage',
    kind: 'charniere',
    kicker: 'Charnière 2 → 3',
    titre: 'Sans donnée claire, le budget brûle',
    chapo:
      'La donnée mise au propre devient la matière première des arbitrages : quel canal ' +
      "financer, quelle étape du parcours supprimer, quelle page rendre en SSR plutôt qu'en " +
      "CSR. Sans elle, le SEA achète du volume et l'UX devient une affaire de goût.",
    blocs: [
      {
        titre: 'LTV plutôt que coût par clic',
        texte:
          'les budgets s’arbitrent sur la rentabilité client réelle, pas sur les métriques ' +
          'natives des régies.',
      },
      {
        titre: 'Réconciliation des identités',
        texte: 'agrégation multi-sources et dédoublonnage avant toute lecture de performance.',
      },
      {
        titre: 'La preuve que le lien existe',
        texte:
          'le système d’analyse multi-sources mesure la rentabilité client dans la durée. ' +
          'C’est sur ce chiffre-là que les budgets sont arbitrés — pas sur les métriques ' +
          'que chaque régie produit sur elle-même.',
      },
    ],
  },
  {
    id: 'sea-ux',
    kind: 'pole',
    pole: 'sea-ux',
    kicker: 'Pôle 3 · Arbitrer',
    titre: 'Je ne dessine pas vos maquettes, je tranche vos parcours',
    chapo:
      'Disons-le tout de suite : je ne vends pas de création graphique. Ce que je vends, ' +
      'ce sont des arbitrages pris sur la donnée — quel parcours, quelle étape supprimée, ' +
      'quel formulaire raccourci, quel test A/B tranché — et je les implémente moi-même ' +
      'dans le produit, au lieu de les transmettre à quelqu’un d’autre.',
    blocs: [
      {
        titre: 'La mesure est construite dans le code',
        texte:
          'Google Tag Manager en conteneur web et server-side, dataLayer, Measurement ' +
          "Protocol, plan de taggage et nomenclature d'événements documentée et opposable. " +
          'Google Analytics, Matomo, Search Console ; côté mobile, Firebase Analytics et ' +
          "Crashlytics. Je lis le code à l'endroit où l'événement doit être posé, au lieu de " +
          'le deviner depuis une interface.',
        decision: 'Quels événements existent, ce qu’ils portent, et qui répond de leur exactitude.',
      },
      {
        titre: 'Conformité par construction',
        texte:
          'RGPD, CMP et déclenchement conditionnel des tags par catégorie de consentement, ' +
          'cadrage des traitements avec le juridique. La conformité n’est pas une case ' +
          'cochée après coup : elle conditionne l’architecture de collecte.',
        decision:
          'Ce que vous collectez, ce que vous n’avez pas le droit de collecter, et pourquoi.',
      },
      {
        titre: 'Arbitrages de parcours, pris sur la mesure',
        texte:
          'Refonte des parcours pilotée par la donnée : A/B testing des pages et des ' +
          'designs, heatmaps, taux de rebond, part de trafic mobile. Une étape disparaît ' +
          'parce que les chiffres le disent, pas parce qu’elle déplaît.',
        preuve: 'Panier moyen en hausse de 50 % sur un e-commerce de joaillerie de luxe.',
        decision: 'Quelle étape du tunnel disparaît, et ce que vous gagnez à la supprimer.',
      },
      {
        titre: 'Pilotage de l’acquisition',
        texte:
          'Google Ads, Bing Ads, SEO, SEA et SMA. Tableaux de bord construits pour votre ' +
          'produit et non repris d’un gabarit, profilage clients par clustering KNN, ' +
          'référencement technique traité comme une propriété du produit — stratégie de ' +
          'rendu, Core Web Vitals, accessibilité.',
        preuve:
          '100 000 € de budget ADS / SEO pilotés chez Truffle Capital, environ 25 000 € ' +
          'd’encadrement de prestataires SEA chez Verhoeven Joaillier.',
        decision: 'Quelle source d’acquisition vous coupez le mois prochain, et sur quel chiffre.',
      },
    ],
    transition:
      'Ce que la mesure révèle repart en construction. Et comme c’est toujours la même ' +
      'personne, l’arbitrage décidé le lundi est implémenté dans la semaine — il n’attend ' +
      'pas le devis d’un tiers.',
  },
  {
    id: 'un-seul-interlocuteur',
    kind: 'preuves',
    kicker: 'L’objection',
    titre: 'Un seul interlocuteur — et si je disparais ?',
    chapo:
      'C’est la question à poser, et elle mérite mieux qu’un haussement d’épaules. Vendre ' +
      'un interlocuteur unique, c’est concentrer un risque : autant dire tout de suite ' +
      'comment il est traité, plutôt que d’attendre que vous le souleviez en réunion.',
    blocs: [
      {
        titre: 'Le produit n’est pas dans ma tête',
        texte:
          'Développement piloté par les tests, non-régression rejouée à chaque livraison, ' +
          'tests de mutation pour vérifier que les tests eux-mêmes valent quelque chose, ' +
          'pipelines CI/CD exécutés à chaque livraison. Une base couverte et déployable ' +
          'automatiquement se reprend ; une base sans filet ne se reprend pas.',
        preuve:
          'Jest, Cypress, Playwright, mutation Stryker, Postman. Certification ISTQB Foundation.',
      },
      {
        titre: 'Les spécifications sont écrites pour quelqu’un d’autre que moi',
        texte:
          'C’est le métier que j’ai exercé avant : recueillir un besoin auprès d’équipes ' +
          'scientifiques et dirigeantes, puis le traduire en spécifications exploitables ' +
          'par des prestataires qui ne connaissent pas le domaine. BPMN 2.0, cartographie ' +
          'du système d’information, nomenclature d’événements documentée et opposable.',
        preuve:
          'AMOA de la startup biotech Artedrone. Serveurs MCP et plugins n8n, Make et Zapier documentés.',
      },
      {
        titre: 'Le relais, je l’ai déjà passé',
        texte:
          'Encadrer des prestataires externes, c’est exactement l’exercice : leur donner ' +
          'de quoi travailler sans moi. Une équipe marketing de 5 à 10 personnes et trois ' +
          'prestataires coordonnés chez Truffle Capital, les prestataires SEA, SEO et SMA ' +
          'encadrés chez Verhoeven Joaillier.',
        decision:
          'Ce que vous exigez de moi contractuellement — documentation, accès, revue de ' +
          'reprise — et à quel moment vous voulez pouvoir le vérifier.',
      },
    ],
  },
]
