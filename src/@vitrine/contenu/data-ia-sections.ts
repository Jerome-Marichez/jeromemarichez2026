// data-ia-sections.ts — jeromemarichez-fr
// Pôle 2 — Mettre en production. La donnée d'abord, l'IA ensuite.
//
// Faits sourcés dans cv-ai-engineer.md et cv-tracking-specialist.md. Règles de véracité
// du CLAUDE.md appliquées : RAG **maison** (aucun framework tiers), méthode arXiv
// implémentée et non « en collaboration avec » l'Universitat de Barcelona, Prézage et
// Llama 3 nommables mais corpus, données et chiffres du projet hors ligne.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

export const SECTIONS_DATA_IA: IEditorialSection[] = [
  {
    id: 'prerequis',
    kind: 'pole',
    pole: 'data-ia',
    kicker: 'Le prérequis',
    titre: 'La qualité de la donnée n’est pas un correctif',
    chapo:
      'Un modèle entraîné sur une donnée sale produit une décision sale, plus vite et avec ' +
      'plus d’assurance. Tout commence donc par la matière première : ce qui entre, ce qui ' +
      'est dédoublonné, ce qui est écarté, et ce qu’on accepte de ne pas savoir.',
    blocs: [
      {
        titre: 'Contrôles dès l’ingestion',
        texte:
          'Intégrité et véracité vérifiées à l’entrée, dédoublonnage, détection d’anomalies. ' +
          'Les écarts sont corrigés avant de contaminer les tableaux de bord, pas une fois ' +
          'que quelqu’un s’est étonné d’un chiffre.',
        decision:
          'Sur quels indicateurs vous acceptez de décider, et lesquels sont encore du bruit.',
      },
      {
        titre: 'Data engineering et réconciliation',
        texte:
          'Pipelines d’ingestion, nettoyage, agrégation et réconciliation multi-sources. ' +
          'Les identités venues de canaux différents sont rapprochées selon votre modèle ' +
          'métier, pas selon un connecteur générique.',
        preuve:
          'Système d’analyse multi-sources conforme RGPD mesurant la rentabilité client à ' +
          'long terme, branché sur Google Ads et Bing Ads.',
      },
      {
        titre: 'Modélisation',
        texte:
          'PostgreSQL en relationnel, en séries temporelles et en vectoriel, MySQL, ' +
          'Firebase. Le choix du stockage suit la question qu’on veut poser à la donnée, ' +
          'pas l’inverse.',
      },
    ],
  },
  {
    id: 'regles',
    kind: 'pole',
    pole: 'data-ia',
    kicker: 'Avant le modèle',
    titre: 'Beaucoup de problèmes se règlent sans intelligence artificielle',
    chapo:
      'Une règle métier explicite est moins chère à faire tourner, plus facile à ' +
      'expliquer à un régulateur et plus simple à corriger qu’un modèle. Je commence par ' +
      'chercher si elle suffit — et je le dis quand c’est le cas.',
    blocs: [
      {
        titre: 'Analyse exploratoire',
        texte:
          'Reprise de l’historique, analyse sous Orange Data Mining, pondération et ' +
          'sélection des variables, élimination des corrélations fortes et des variables ' +
          'porteuses de bruit, mise en qualité du jeu de données.',
      },
      {
        titre: 'Règles anti-fraude implémentées dans le produit',
        texte:
          'Les règles issues de l’analyse ne restent pas dans un rapport : elles sont ' +
          'définies puis implémentées dans le produit, par la même personne.',
        preuve: 'Fraude en baisse, conversion des inscriptions en hausse, latence réduite.',
        decision: 'Ce qui se règle par une règle, et ce qui mérite vraiment un modèle.',
      },
      {
        titre: 'Profilage et lisibilité',
        texte:
          'Clustering et profilage clients (KNN), restitution visuelle pensée pour la ' +
          'décision : ce que le dirigeant doit trancher apparaît, le reste disparaît.',
      },
    ],
  },
  {
    id: 'machine-learning',
    kind: 'pole',
    pole: 'data-ia',
    kicker: 'Apprentissage supervisé',
    titre: 'Un modèle en production, pas dans un notebook',
    chapo:
      'Modèle supervisé anticipant les échecs de dépôt vocal, déployé, versionné et ' +
      'surveillé. Il évite d’emprunter des routes vocales coûteuses quand l’échec est ' +
      'probable — l’économie est directe et mesurable.',
    blocs: [
      {
        titre: 'De la littérature scientifique au service',
        texte:
          'La méthode d’extraction des caractéristiques du signal audio — niveau de bruit, ' +
          'probabilité de présence de voix, durée, puissance sonore dans le temps — est ' +
          'publiée sur arXiv par l’Universitat de Barcelona. Je l’ai implémentée moi-même, ' +
          'adaptée aux données réelles, validée, puis industrialisée.',
        preuve: 'Routes vocales coûteuses évitées.',
      },
      {
        titre: 'Chaîne complète',
        texte:
          'Caractéristiques stockées sous forme vectorielle, entraînement TensorFlow, ' +
          'inférence en cloud functions, versioning et monitoring du modèle. Aucun maillon ' +
          'de cette chaîne n’est sous-traité.',
      },
    ],
  },
  {
    id: 'llm',
    kind: 'pole',
    pole: 'data-ia',
    kicker: 'Modèles de langage',
    titre: 'Le bon modèle pour le bon cas d’usage, et la preuve du contraire',
    chapo:
      'Claude sur Vertex AI et par l’API Anthropic, OpenAI, Gemini, Llama. Les modèles ' +
      'sont comparés en continu et arbitrés cas d’usage par cas d’usage sur quatre axes : ' +
      'coût d’inférence, latence, qualité attendue, confidentialité des données.',
    blocs: [
      {
        titre: 'Adaptation de modèles',
        texte:
          'Fine-tuning de Llama 3 sur corpus métier pour l’application mobile Prézage, ' +
          'complété d’un procédé maison d’augmentation du contexte proche du RAG : ' +
          'constitution et nettoyage du jeu d’entraînement, évaluation face au modèle ' +
          'propriétaire, arbitrage coût, latence et confidentialité.',
        preuve: 'Charge de travail des prestataires réduite.',
        decision: 'Quelle donnée reste chez vous, et ce que vous acceptez d’envoyer à un tiers.',
      },
      {
        titre: 'RAG documentaire, fait maison',
        texte:
          'Réponse automatisée aux tickets de support de niveau 1 : recherche vectorielle ' +
          'PostgreSQL et API OpenAI, réponses ancrées sur votre documentation interne et ' +
          'non sur la mémoire du modèle. Aucun framework tiers — la chaîne est écrite, donc ' +
          'lisible et corrigeable.',
      },
      {
        titre: 'Agents et interopérabilité',
        texte:
          'Conception, développement et documentation de serveurs MCP et de plugins n8n, ' +
          'Make et Zapier : votre produit devient appelable par un agent IA ou par un ' +
          'scénario no-code chez vos propres clients.',
        decision: 'Ce que vous ouvrez à l’automatisation, et ce qui reste fermé.',
      },
      {
        titre: 'MLOps et conformité',
        texte:
          'Déploiement, versioning et monitoring des modèles, CI/CD Docker et GitHub ' +
          'Actions, Vertex AI, Pub/Sub, Cloud Run, VM auto-scalées. Conformité RGPD et ' +
          'DORA, exigée en appels d’offres grands comptes.',
      },
    ],
  },
  {
    id: 'charniere-arbitrage',
    kind: 'charniere',
    kicker: 'Charnière vers le pôle 3',
    titre: 'Une donnée propre devient un budget arbitrable',
    chapo:
      'Une fois la donnée clarifiée, elle cesse d’être un tableau de bord de plus : elle ' +
      'devient la matière des décisions d’acquisition et de parcours. Quel canal financer, ' +
      'quelle étape supprimer, quelle page rendre autrement. Sans elle, le SEA achète du ' +
      'volume et l’expérience utilisateur devient une affaire de goût.',
    blocs: [
      {
        titre: 'Rentabilité à long terme',
        texte:
          'la mesure de la valeur client dans la durée remplace le coût par clic comme ' +
          'critère d’arbitrage.',
      },
      {
        titre: 'Et ensuite',
        texte:
          'le pôle 3 tranche sur ces chiffres — puis implémente l’arbitrage dans le ' +
          'produit, sans passer par un tiers.',
      },
    ],
  },
]
