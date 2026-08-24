// ia-sections.ts (jeromemarichez-fr)
// Les chapitres de la page IA : la réponse technique, le coût et la propriété, le langage,
// la mise en production, puis le retour au produit.
//
// Le critère de rattachement est le CONTENU, jamais le titre. Vient ici ce qui parle de
// modèles, d'inférence, de fine-tuning, de RAG ou d'agents ; ce qui parle de collecte, de
// gouvernance, de qualité ou de réconciliation d'identités est dans `data-sections.ts`.
//
// `charniere-arbitrage` a quitté ce fichier pour `data-sections.ts`. Elle y disait « et
// ensuite, le pôle 3 » : posée sur la page IA, elle affirmait que le SEA & UX vient après
// l'IA. C'est faux : ce sont les deux suites parallèles de la donnée, et la charnière
// part de la donnée.
//
// **Cette page était la plus maigre des quatre (issue #103)** : deux chapitres contre
// quatre à cinq ailleurs. Une suite visiblement plus pauvre que sa sœur contredit en page
// ce que le modèle affirme : deux suites de rang égal. Deux sections ont donc été
// écrites, à partir de matière déjà sourcée dans le README et les CV, jamais inventée :
// le chapitre « langage », où le LLM cesse d'être une ligne pour devenir un arbitrage, et
// la charnière de retour au produit, symétrique de celle du pôle SEA & UX. L'IA ne passe
// la main à aucun autre pôle (elle est un bout de chaîne, comme le SEA & UX), mais ce
// qu'elle produit retourne dans le produit, et ça, c'est vrai des deux.
//
// **Le test de déterminisme et le prix de la donnée (issue #126).** Cette page disait
// « souvent, une règle métier suffit » : un jugement, sans méthode ni moment. Le test
// (« ce problème a-t-il une réponse déterministe ? ») est POSÉ sur la page Data, section
// `exploration`, parce que c'est la donnée qui y répond. Ici, il n'est pas reposé : le
// chapitre `solution` en reçoit la réponse et raconte les deux issues, chacune avec ses
// preuves déjà en place. Ne pas dupliquer le test des deux côtés.
//
// Le chapitre `propriete` porte l'argument économique dicté par Jérôme MARICHEZ le
// 2026-08-23, et il est nouveau : une stratégie data solide en amont permet une solution
// dont le CLIENT est propriétaire, à coûts réduits, via un workflow agentique de BAS
// niveau cognitif ; le LLM classique reste l'option quand ce n'est pas possible. Deux
// notions distinctes, à ne jamais fondre en une : la propriété (posséder au lieu de
// louer) et le niveau cognitif (la donnée structurée a déjà fait le travail que le modèle
// aurait facturé à chaque appel).
//
// Ce chapitre porte la page à quatre chapitres et une charnière : exactement la forme du
// pôle SEA & UX. Les deux suites restent de rang égal, c'est le modèle de l'offre.
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
    titre: 'La solution répond au problème, et ce n’est pas toujours de l’IA',
    chapo:
      'La technique n’arrive qu’ici, une fois établi sur vos données qu’aucune règle simple ne ' +
      'répond. Les deux issues de ce test ont leur livrable, une seule demande un modèle.',
    blocs: [
      {
        titre: 'Réponse déterministe : une règle métier suffit',
        texte:
          'Moins chère à faire tourner, plus facile à expliquer à un régulateur, plus simple ' +
          'à corriger qu’un modèle. Intégrée aux systèmes existants, c’est un livrable complet.',
        preuve:
          'Règles anti-fraude définies puis implémentées dans le produit par la même ' +
          'personne : fraude en baisse, conversion des inscriptions en hausse, latence ' +
          'réduite. Flux commande, stock et facturation modélisés en BPMN puis intégrés ' +
          'entre un ERP et un site marchand : survente évitée sur des pièces uniques.',
        decision: 'Ce qui part en production sans modèle, et ce qui reste vraiment à apprendre.',
      },
      {
        titre: 'Réponse non déterministe : le modèle apprend ce qu’aucune règle ne tient',
        texte:
          'Supervisé (classification, réseaux de neurones) ou non supervisé, selon ce que la ' +
          'donnée permet. La méthode d’extraction des caractéristiques du signal audio est ' +
          'publiée sur arXiv ; je l’ai implémentée moi-même, adaptée aux données réelles, puis ' +
          'industrialisée. TensorFlow, inférence en cloud functions.',
        preuve: 'Routes vocales coûteuses évitées.',
        decision:
          'Ce que vous acceptez de confier à une probabilité, et ce qui doit rester certain.',
      },
      {
        titre: 'Quatre familles, et rien qui les classe',
        texte:
          'Aucune de ces familles n’est un niveau au-dessus des autres : supervisé, non ' +
          'supervisé, LLM, agents. Le choix se fait sur la nature du problème et sur ce que la ' +
          'donnée permet, pas sur un ordre de sophistication.',
        decision: 'La famille que votre problème appelle, et ce qu’elle coûte à faire tourner.',
      },
    ],
  },
  {
    id: 'propriete',
    kind: 'chapitre',
    pole: 'ia',
    kicker: 'Coût et propriété',
    titre: 'Une donnée solide en amont, une IA moins chère et qui vous appartient',
    chapo:
      'C’est ici que le travail sur la donnée se rembourse. Plus la stratégie data est solide ' +
      'avant, moins la solution a besoin d’intelligence louée pour tenir.',
    blocs: [
      {
        titre: 'Ce que la donnée fait à la place du modèle',
        texte:
          'Un LLM sollicité pour tout paie, à chaque appel, le travail que la donnée aurait pu ' +
          'faire une fois : retrouver, recouper, mettre en forme, choisir le chemin. Quand ce ' +
          'travail est déjà fait en amont, il reste un workflow agentique de bas niveau ' +
          'cognitif, autrement dit un enchaînement d’étapes courtes où le modèle n’a qu’une ' +
          'petite tâche à faire à chaque fois. Or un LLM se paie au volume de texte qu’il ' +
          'traite : moins il en traite, moins la requête coûte, et cela vaut pour toutes les ' +
          'requêtes suivantes.',
        decision: 'Ce que vous préférez payer une fois en structurant, plutôt qu’à chaque requête.',
      },
      {
        titre: 'Une solution dont vous êtes propriétaire',
        texte:
          'La différence ne se lit pas sur le prix du mois, elle se lit sur ce qui reste si vous ' +
          'coupez. Le code, le paramétrage et la donnée restent chez vous : le workflow continue ' +
          'de tourner et se transmet. Une intelligence louée, elle, s’arrête avec l’abonnement.',
        decision: 'Ce que vous voulez posséder, et ce que vous acceptez de louer.',
      },
      {
        titre: 'Quand ce n’est pas possible, le LLM classique',
        texte:
          'Certains problèmes demandent vraiment la capacité d’un grand modèle. On y va alors ' +
          'sans détour, open source ou propriétaire : c’est un choix assumé, pas un défaut de ' +
          'conception.',
        decision: 'Le budget mensuel que vous acceptez pour cette part-là.',
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
          'Serveurs MCP et plugins n8n, Make et Zapier (conçus, développés et documentés) : ' +
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
