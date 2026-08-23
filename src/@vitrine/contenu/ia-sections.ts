// ia-sections.ts — jeromemarichez-fr
// Les chapitres de la page IA : la réponse technique, le langage, la mise en production,
// puis le retour au produit.
//
// Le critère de rattachement est le CONTENU, jamais le titre. Vient ici ce qui parle de
// modèles, d'inférence, de fine-tuning, de RAG ou d'agents ; ce qui parle de collecte, de
// gouvernance, de qualité ou de réconciliation d'identités est dans `data-sections.ts`.
//
// `charniere-arbitrage` a quitté ce fichier pour `data-sections.ts`. Elle y disait « et
// ensuite, le pôle 3 » : posée sur la page IA, elle affirmait que le SEA & UX vient après
// l'IA. C'est faux — ce sont les deux suites parallèles de la donnée, et la charnière
// part de la donnée.
//
// **Cette page était la plus maigre des quatre (issue #103)** : deux chapitres contre
// quatre à cinq ailleurs. Une suite visiblement plus pauvre que sa sœur contredit en page
// ce que le modèle affirme — deux suites de rang égal. Deux sections ont donc été
// écrites, à partir de matière déjà sourcée dans le README et les CV, jamais inventée :
// le chapitre « langage », où le LLM cesse d'être une ligne pour devenir un arbitrage, et
// la charnière de retour au produit, symétrique de celle du pôle SEA & UX. L'IA ne passe
// la main à aucun autre pôle — elle est un bout de chaîne, comme le SEA & UX — mais ce
// qu'elle produit retourne dans le produit, et ça, c'est vrai des deux.
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
        texte:
          'Moins chère à faire tourner, plus facile à expliquer à un régulateur, plus simple ' +
          'à corriger qu’un modèle. Intégrée aux systèmes existants, c’est un livrable complet.',
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
          'Supervisé — classification, réseaux de neurones — ou non supervisé, selon ce que la ' +
          'donnée permet. La méthode d’extraction des caractéristiques du signal audio est ' +
          'publiée sur arXiv ; je l’ai implémentée moi-même, adaptée aux données réelles, puis ' +
          'industrialisée. TensorFlow, inférence en cloud functions.',
        preuve: 'Routes vocales coûteuses évitées.',
      },
    ],
  },
  {
    id: 'langage',
    kind: 'chapitre',
    pole: 'ia',
    kicker: 'Quand le problème est du langage',
    titre: 'Un LLM se choisit sur quatre critères, pas sur un classement',
    chapo:
      'Claude sur Vertex AI, l’API Anthropic, OpenAI, Gemini, Llama. Le modèle n’est pas la ' +
      'décision : la décision, c’est ce que vous acceptez de payer et de laisser sortir.',
    blocs: [
      {
        titre: 'Coût, latence, qualité, confidentialité',
        texte:
          'Context engineering et comparaison continue, cas d’usage par cas d’usage. Une donnée ' +
          'qui ne peut pas sortir de chez vous écarte d’office un service tiers, et ramène ' +
          'l’arbitrage entre modèle open-weight hébergé et règle explicite.',
        decision: 'Modèle hébergé ou service tiers, et ce que chacun vous coûte par mois.',
      },
      {
        titre: 'Un modèle spécialisé sur votre métier',
        texte:
          'Fine-tuning de Llama 3 sur corpus métier pour l’application mobile Prézage, complété ' +
          'par un procédé maison d’augmentation du contexte, proche du RAG.',
        preuve: 'Charge de travail des prestataires réduite.',
      },
      {
        titre: 'RAG documentaire, fait maison',
        texte:
          'Réponse automatisée aux tickets de support de niveau 1 : recherche vectorielle ' +
          'PostgreSQL et API OpenAI, réponses ancrées sur votre documentation interne et non ' +
          'sur la mémoire du modèle. Aucun framework tiers.',
        decision: 'Ce que votre support automatise, et ce qui doit rester répondu par quelqu’un.',
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
          'Versioning et monitoring des modèles, CI/CD Docker et GitHub Actions, Vertex AI, ' +
          'Pub/Sub, Cloud Run, VM auto-scalées. Pas de cluster Kubernetes administré en propre.',
      },
      {
        titre: 'Rendre votre produit appelable',
        texte:
          'Serveurs MCP et plugins n8n, Make et Zapier — conçus, développés et documentés : ' +
          'votre produit devient appelable par un agent ou un scénario no-code.',
        decision: 'Ce que vous ouvrez à l’automatisation, et ce qui reste fermé.',
      },
    ],
  },
  // Symétrique de la charnière `boucle` du pôle SEA & UX. Les deux suites sont des bouts
  // de chaîne : elles ne passent la main à aucun pôle, mais ce qu'elles décident retourne
  // dans le produit. Écrire cette boucle d'un seul côté laissait l'IA se terminer en
  // impasse, là où sa sœur bouclait.
  {
    id: 'boucle',
    kind: 'charniere',
    kicker: 'La boucle',
    titre: 'Un modèle n’est pas un livrable à part, il est appelé par le produit',
    chapo:
      'Le dernier maillon renvoie au premier : ce qui est entraîné ici est intégré là-bas, et ' +
      'c’est la même personne qui branche les deux.',
    blocs: [
      {
        titre: 'Aucun transfert de dossier',
        texte: 'la personne qui a choisi la solution est celle qui l’intègre au produit.',
      },
      {
        titre: 'Retour à l’ingénierie web',
        texte:
          'l’intégration suit le même cycle : test d’abord, non-régression, mise en production ' +
          'sans coupure.',
      },
    ],
  },
]
