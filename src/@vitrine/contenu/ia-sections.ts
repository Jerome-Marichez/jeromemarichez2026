// ia-sections.ts — jeromemarichez-fr
// Les chapitres IA de la page Data & IA : la réponse technique, puis sa mise en
// production. Le tableau se referme sur la charnière qui clôt la page.
//
// Scindé de l'ancien `data-ia-sections.ts`, qui atteignait 279 lignes pour un plafond dur
// à 300. Ce n'est qu'un découpage de FICHIERS : `PoleId` est inchangé, la page rend le
// même contenu dans le même ordre, et `data-ia.ts` recolle les deux tableaux.
//
// Le critère de rattachement est le CONTENU, jamais le titre. Vient ici ce qui parle de
// modèles, d'inférence, de fine-tuning, de RAG ou d'agents ; ce qui parle de collecte, de
// gouvernance, de qualité ou de réconciliation d'identités est dans `data-sections.ts`.
//
// `charniere-arbitrage` n'est ni de la data ni de l'IA : c'est la sortie de page vers le
// pôle suivant. Elle est posée en dernier ici pour que la concaténation
// `[...SECTIONS_DATA, ...SECTIONS_IA]` rende exactement l'ordre d'avant la scission. Son
// rattachement définitif est à trancher quand `PoleId` se scindera à son tour.
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
    pole: 'data-ia',
    kicker: 'La réponse technique',
    titre: 'La solution répond au problème — et ce n’est pas toujours de l’IA',
    chapo:
      'C’est seulement ici que la technique arrive, et elle est arbitrée contre les trois ' +
      'étapes précédentes : le problème métier posé au départ, la donnée réellement ' +
      'disponible, et ce que le droit autorise. Pas contre l’état de l’art.',
    blocs: [
      {
        titre: 'Souvent, une règle métier suffit',
        texte:
          'Une règle explicite est moins chère à faire tourner, plus facile à expliquer à ' +
          'un régulateur et plus simple à corriger qu’un modèle. Quand elle suffit, je le ' +
          'dis, et je l’intègre dans vos systèmes existants au lieu d’ajouter une brique ' +
          'de plus. C’est un livrable complet, pas un lot de consolation.',
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
          'Apprentissage supervisé — classification, réseaux de neurones — ou non ' +
          'supervisé, selon ce que la donnée permet. Exemple livré : un modèle supervisé ' +
          'anticipant les échecs de dépôt vocal, qui évite d’emprunter une route coûteuse ' +
          'quand l’échec est probable. La méthode d’extraction des caractéristiques du ' +
          'signal audio est publiée sur arXiv ; je l’ai implémentée moi-même, adaptée aux ' +
          'données réelles, validée, puis industrialisée. Entraînement TensorFlow, ' +
          'inférence en cloud functions.',
        preuve: 'Routes vocales coûteuses évitées.',
      },
      {
        titre: 'Un LLM, quand le problème est du langage',
        texte:
          'Claude sur Vertex AI et par l’API Anthropic, OpenAI, Gemini, Llama : comparés ' +
          'en continu et arbitrés cas d’usage par cas d’usage sur quatre axes — coût ' +
          'd’inférence, latence, qualité attendue, confidentialité. Fine-tuning de Llama 3 ' +
          'sur corpus métier pour l’application mobile Prézage, complété d’un procédé ' +
          'maison d’augmentation du contexte proche du RAG. RAG documentaire pour le ' +
          'support de niveau 1 : recherche vectorielle PostgreSQL et API OpenAI, réponses ' +
          'ancrées sur votre documentation interne et non sur la mémoire du modèle. Aucun ' +
          'framework tiers — la chaîne est écrite, donc lisible et corrigeable.',
        preuve: 'Charge de travail des prestataires réduite.',
        decision: 'Modèle hébergé ou service tiers, et ce que chacun vous coûte par mois.',
      },
    ],
  },
  {
    id: 'production',
    kind: 'chapitre',
    pole: 'data-ia',
    kicker: 'Et ensuite',
    titre: 'Ce qui est livré tourne, et reste explicable',
    chapo:
      'Une solution qui ne survit pas à six mois d’exploitation n’a pas résolu le ' +
      'problème, elle l’a déplacé. Le déploiement, la surveillance et la conformité font ' +
      'donc partie du même lot, tenus par la même personne.',
    blocs: [
      {
        titre: 'Déploiement et surveillance',
        texte:
          'Déploiement, versioning et monitoring des modèles, CI/CD Docker et GitHub ' +
          'Actions, Vertex AI, Pub/Sub, Cloud Run, cloud functions, VM Compute Engine ' +
          'auto-scalées. Pas de cluster Kubernetes administré en propre : je m’en tiens à ' +
          'ce que je sais exploiter seul, et je le dis avant le devis plutôt qu’après.',
      },
      {
        titre: 'Rendre votre produit appelable',
        texte:
          'Conception, développement et documentation de serveurs MCP et de plugins n8n, ' +
          'Make et Zapier : votre produit devient utilisable par un agent IA ou par un ' +
          'scénario no-code, chez vous comme chez vos propres clients.',
        decision: 'Ce que vous ouvrez à l’automatisation, et ce qui reste fermé.',
      },
    ],
  },
  {
    id: 'charniere-arbitrage',
    kind: 'charniere',
    kicker: 'Charnière vers le pôle 3',
    titre: 'Un métier compris devient un budget arbitrable',
    chapo:
      'Quand les règles sont écrites, les profils identifiés et la donnée gouvernée, on ne ' +
      'regarde plus un tableau de bord de plus : on tient la matière des décisions ' +
      'd’acquisition et de parcours. Quel canal financer, quelle étape supprimer, quelle ' +
      'page rendre autrement. Sans elle, le SEA achète du volume et l’expérience ' +
      'utilisateur devient une affaire de goût.',
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
