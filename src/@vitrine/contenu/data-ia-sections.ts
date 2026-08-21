// data-ia-sections.ts — jeromemarichez-fr
// Pôle 2 — Le métier d'abord, la technique en dernier.
//
// L'ORDRE EST LE CONTENU : métier → stratégie data → gouvernance et droit → solution.
// L'inverser reviendrait à vendre un catalogue de technologies à quelqu'un qui cherche
// une réponse à un problème d'activité. La solution technique répond au problème posé
// au départ ; elle n'est jamais le point de départ, et elle n'est pas toujours de l'IA.
//
// Faits sourcés dans cv-ai-engineer.md, cv-tracking-specialist.md et
// cv-ingenieur-fullstack.md. Règles de véracité du CLAUDE.md appliquées : RAG **maison**
// (aucun framework tiers), méthode arXiv implémentée par Jérôme et non « en
// collaboration avec » l'Universitat de Barcelona, Prézage et Llama 3 nommables mais
// corpus, données et chiffres du projet hors ligne, aucun cluster Kubernetes en propre.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

export const SECTIONS_DATA_IA: IEditorialSection[] = [
  {
    id: 'metier',
    kind: 'pole',
    pole: 'data-ia',
    kicker: 'Le point de départ',
    titre: 'Je commence par votre métier, pas par votre donnée',
    chapo:
      'Une activité qui tourne depuis des années sait déjà beaucoup de choses : qui sont ' +
      'ses bons clients, quand une commande sent mauvais, ce qu’on accepte et ce qu’on ' +
      'refuse. Ce savoir est rarement écrit quelque part. Le faire émerger et le mettre ' +
      'noir sur blanc est une prestation à part entière — pas une étape préparatoire.',
    blocs: [
      {
        titre: 'Faire émerger les règles qui existent déjà',
        texte:
          'Vos équipes appliquent des règles de décision qu’elles n’ont jamais formalisées. ' +
          'Je les recueille auprès de ceux qui les appliquent, je les écris, puis je les ' +
          'confronte à votre historique pour voir lesquelles tiennent encore. C’est le ' +
          'métier que j’exerçais avant de le faire pour de la donnée : recueillir un ' +
          'besoin, puis le traduire en quelque chose d’implémentable.',
        preuve:
          'AMOA de la startup biotech Artedrone : besoin recueilli auprès des équipes ' +
          'scientifiques et dirigeantes, traduit en spécifications exploitables par des ' +
          'prestataires non spécialistes du domaine. BPMN 2.0, cartographie du système ' +
          'd’information.',
        decision:
          'Lesquelles de vos règles actuelles méritent d’être écrites, et lesquelles ne ' +
          'correspondent plus à ce que dit votre activité.',
      },
      {
        titre: 'Découvrir vos profils de clients',
        texte:
          'Profilage par clustering (KNN) sur vos données réelles : les groupes ne sont ' +
          'pas décidés à l’avance, ils sortent de l’analyse. La restitution est visuelle ' +
          'et pensée pour la décision — ce que vous devez trancher apparaît, le reste ' +
          'disparaît.',
        decision:
          'Quel segment vous voulez servir mieux, et lequel vous coûte plus qu’il ne ' +
          'rapporte.',
      },
      {
        titre: 'Faire parler l’historique',
        texte:
          'Reprise de l’historique, analyse exploratoire sous Orange Data Mining, ' +
          'pondération et sélection des variables, élimination des corrélations fortes et ' +
          'des variables porteuses de bruit. On cherche ce que votre activité fait déjà ' +
          'sans le savoir, pas une performance de modèle.',
        preuve:
          'Analyse de l’historique des inscriptions ayant abouti à des règles anti-fraude : ' +
          'fraude en baisse, conversion des inscriptions en hausse.',
      },
      {
        titre: 'Cette phase se livre pour elle-même',
        texte:
          'Elle produit un document : ce que votre donnée dit de votre activité, les ' +
          'règles formalisées, les profils identifiés, et les questions auxquelles ' +
          'personne ne peut répondre aujourd’hui. Vous pouvez vous arrêter là. Si rien ne ' +
          'justifie d’aller plus loin, je le dis.',
        decision: 'S’il y a un problème qui mérite d’être traité par la technique — et lequel.',
      },
    ],
  },
  {
    id: 'strategie-data',
    kind: 'pole',
    pole: 'data-ia',
    kicker: 'La stratégie data',
    titre: 'Construire la stratégie data, ou s’appuyer sur celle qui existe',
    chapo:
      'Deux situations, et elles ne demandent pas le même travail. Soit vous n’avez pas ' +
      'de donnée exploitable et il faut décider quoi mesurer — en partant des questions ' +
      'de l’étape précédente, pas d’un gabarit. Soit vous en avez déjà, et il s’agit d’en ' +
      'tirer quelque chose sans tout refaire.',
    blocs: [
      {
        titre: 'Quand rien n’est en place',
        texte:
          'Ce qu’on mesure découle des questions posées au métier. Définition des ' +
          'indicateurs, plan de collecte, pipelines d’ingestion, puis modélisation : ' +
          'PostgreSQL en relationnel, en séries temporelles ou en vectoriel, MySQL, ' +
          'Firebase. Le choix du stockage suit la question qu’on veut poser à la donnée, ' +
          'pas l’inverse.',
        decision: 'Ce que vous commencez à mesurer maintenant, et ce qui peut attendre six mois.',
      },
      {
        titre: 'Quand la donnée existe déjà',
        texte:
          'Reprise de l’existant, agrégation et réconciliation multi-sources, ' +
          'dédoublonnage des identités selon votre modèle métier et non selon un ' +
          'connecteur générique. Contrôles d’intégrité et de véracité dès l’ingestion, ' +
          'détection d’anomalies : les écarts sont corrigés avant de contaminer les ' +
          'tableaux de bord, pas une fois que quelqu’un s’est étonné d’un chiffre.',
        preuve:
          'Système d’analyse multi-sources conforme RGPD mesurant la rentabilité client à ' +
          'long terme, branché sur Google Ads et Bing Ads.',
        decision:
          'Sur quels indicateurs vous acceptez de décider, et lesquels sont encore du bruit.',
      },
      {
        titre: 'La qualité n’est pas un correctif',
        texte:
          'Un modèle entraîné sur une donnée sale produit une décision sale, plus vite et ' +
          'avec plus d’assurance. C’est pour cette raison que cette étape passe avant la ' +
          'technique, et non parce que la propreté serait une vertu en soi.',
      },
    ],
  },
  {
    id: 'gouvernance',
    kind: 'pole',
    pole: 'data-ia',
    kicker: 'Gouvernance et droit',
    titre: 'Qui possède quoi, et ce qui a le droit d’être traité',
    chapo:
      'Cette question se pose avant d’écrire la moindre ligne, parce que sa réponse écarte ' +
      'des solutions entières. Y répondre après coup coûte le double : il faut alors ' +
      'défaire ce qui a été construit sur la mauvaise hypothèse.',
    blocs: [
      {
        titre: 'Qui possède la donnée',
        texte:
          'Cartographie des sources et de leur propriété : ce qui est à vous, ce qui ' +
          'appartient à vos clients, ce qui reste la propriété d’une régie ou d’un ' +
          'prestataire. On en déduit ce qui peut sortir de chez vous et ce qui doit y ' +
          'rester.',
        decision: 'Quelle donnée reste chez vous, et ce que vous acceptez d’envoyer à un tiers.',
      },
      {
        titre: 'Ce qui a le droit d’être collecté et traité',
        texte:
          'RGPD, base légale du traitement, consentement géré par une CMP avec ' +
          'déclenchement conditionnel des tags par catégorie, cadrage des traitements avec ' +
          'le juridique. La conformité n’est pas une case cochée après coup : elle ' +
          'conditionne l’architecture de collecte.',
        preuve:
          'Conformité RGPD et DORA tenue en appels d’offres grands comptes — distribution, ' +
          'assurance, banque. Cadrage RGPD des données clients chez un e-commerçant de ' +
          'joaillerie.',
        decision:
          'Ce que vous collectez, ce que vous n’avez pas le droit de collecter, et pourquoi.',
      },
      {
        titre: 'La contrainte oriente la solution',
        texte:
          'Si une donnée ne peut pas quitter votre système, un service tiers est écarté ' +
          'd’office et la comparaison se joue entre un modèle open-weight que l’on héberge ' +
          '— Llama 3 par exemple — et une règle explicite. C’est une contrainte de départ, ' +
          'pas une déception à annoncer en fin de projet.',
      },
    ],
  },
  {
    id: 'solution',
    kind: 'pole',
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
    kind: 'pole',
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
