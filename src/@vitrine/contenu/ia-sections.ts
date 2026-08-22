// ia-sections.ts — jeromemarichez-fr
// Les chapitres de la page IA : la réponse technique, puis sa mise en production.
//
// Le critère de rattachement est le CONTENU, jamais le titre. Vient ici ce qui parle de
// modèles, d'inférence, de fine-tuning, de RAG ou d'agents ; ce qui parle de collecte, de
// gouvernance, de qualité ou de réconciliation d'identités est dans `data-sections.ts`.
//
// `charniere-arbitrage` a quitté ce fichier pour `data-sections.ts`. Elle y disait « et
// ensuite, le pôle 3 » : posée sur la page IA, elle affirmait que le SEA & UX vient après
// l'IA. C'est faux — ce sont les deux suites parallèles de la donnée, et la charnière
// part de la donnée. L'IA ne passe donc la main à personne : elle est un bout de chaîne,
// comme le SEA & UX.
//
// Faits sourcés dans cv-ai-engineer.md et cv-ingenieur-fullstack.md. Règles de véracité
// du CLAUDE.md appliquées : RAG **maison** (aucun framework tiers), méthode arXiv
// implémentée par Jérôme et non « en collaboration avec » l'Universitat de Barcelona,
// Prézage et Llama 3 nommables mais corpus, données et chiffres du projet hors ligne,
// aucun cluster Kubernetes en propre.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

export const SECTIONS_IA: IEditorialSection[] = [
  {
    id: 'solution',
    kind: 'chapitre',
    pole: 'ia',
    kicker: 'La réponse technique',
    titre: 'La solution répond au problème — et ce n’est pas toujours de l’IA',
    chapo:
      'La technique n’arrive qu’ici, arbitrée contre le problème métier et ce que le droit ' +
      'autorise. Pas contre l’état de l’art.',
    blocs: [
      {
        titre: 'Souvent, une règle métier suffit',
        preuve:
          'Règles anti-fraude définies puis implémentées dans le produit par la même ' +
          'personne : fraude en baisse, conversion des inscriptions en hausse, latence ' +
          'réduite. Flux commande, stock et facturation modélisés en BPMN puis intégrés ' +
          'entre un ERP et un site marchand : survente évitée sur des pièces uniques.',
        decision:
          'Ce qui se règle par une règle intégrée à l’existant, et ce qui mérite vraiment ' +
          'un modèle.',
      },
      {
        titre: 'Un modèle, quand la règle ne tient plus',
        texte:
          'La méthode d’extraction des caractéristiques du signal audio est publiée sur arXiv ' +
          '; je l’ai implémentée moi-même, puis industrialisée. TensorFlow, inférence en cloud ' +
          'functions.',
        preuve: 'Routes vocales coûteuses évitées.',
      },
      {
        titre: 'Un LLM, quand le problème est du langage',
        texte:
          'Claude sur Vertex AI, OpenAI, Gemini, Llama. Fine-tuning de Llama 3 pour ' +
          'l’application mobile Prézage, RAG documentaire fait maison, aucun framework tiers.',
        preuve: 'Charge de travail des prestataires réduite.',
        decision: 'Modèle hébergé ou service tiers, et ce que chacun vous coûte par mois.',
      },
    ],
  },
  {
    id: 'production',
    kind: 'chapitre',
    pole: 'ia',
    kicker: 'Et ensuite',
    titre: 'Ce qui est livré tourne, et reste explicable',
    chapo:
      'Une solution qui ne survit pas à six mois d’exploitation a déplacé le problème, pas ' +
      'résolu.',
    blocs: [
      {
        titre: 'Déploiement et surveillance',
        texte:
          'Versioning et monitoring des modèles, Vertex AI, Pub/Sub, Cloud Run, VM ' +
          'auto-scalées. Pas de cluster Kubernetes administré en propre.',
      },
      {
        titre: 'Rendre votre produit appelable',
        texte:
          'Serveurs MCP et plugins n8n, Make et Zapier : votre produit devient appelable par ' +
          'un agent ou un scénario no-code.',
        decision: 'Ce que vous ouvrez à l’automatisation, et ce qui reste fermé.',
      },
    ],
  },
]
