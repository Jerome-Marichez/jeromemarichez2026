// data-sections.ts (jeromemarichez-fr)
// Les chapitres de la page Data : métier, gouvernance et droit, stratégie data, puis la
// problématique et son exploration.
//
// Le critère de rattachement est le CONTENU, jamais le titre. Vient ici ce qui parle de
// collecte, de plan de taggage, de gouvernance, de qualité ou de réconciliation
// d'identités ; ce qui parle de modèles, d'inférence, de fine-tuning, de RAG ou d'agents
// est dans `ia-sections.ts`, qui sert désormais un pôle distinct.
//
// L'ORDRE EST LE CONTENU, et c'est celui de Jérôme MARICHEZ (2026-08-23) :
// métier → gouvernance → stratégie data → problématique → exploration de données. On part
// de l'activité, pas d'un catalogue de technologies : la solution technique répond au
// problème posé au départ, elle n'en est jamais le point de départ.
//
// **Gouvernance avant stratégie data (issue #126).** Les deux sections étaient dans
// l'ordre inverse. Ce n'est pas un détail de mise en page : ce qui a le droit d'être
// collecté borne ce qu'on décide de mesurer, jamais l'inverse. Un plan de collecte
// arbitré avant la question du droit se refait.
//
// **Le test de déterminisme (issue #126).** La section `exploration` porte la question
// « ce problème a-t-il une réponse déterministe ? ». Elle vit ici, et non sur la page IA,
// parce que c'est la donnée qui y répond : la page IA ne fait qu'en recevoir la réponse.
// Le cas « oui » s'écrit comme un résultat, jamais comme un échec. Et le test ne gouverne
// que la suite IA : le SEA & UX ne l'attend pas, les deux suites restent parallèles.
//
// Faits sourcés dans cv-ai-engineer.md, cv-tracking-specialist.md et
// cv-ingenieur-fullstack.md. Règles de véracité du CLAUDE.md appliquées : méthode arXiv
// implémentée par Jérôme et non « en collaboration avec » l'Universitat de Barcelona,
// Llama 3 nommable mais corpus, données et chiffres du projet hors ligne.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

export const SECTIONS_DATA: IEditorialSection[] = [
  {
    id: 'metier',
    kind: 'chapitre',
    pole: 'data',
    kicker: 'Le point de départ',
    titre: 'Je commence par votre métier, pas par votre donnée',
    chapo:
      'Une activité qui tourne sait déjà beaucoup de choses, rarement écrites. Les mettre noir ' +
      'sur blanc se livre pour soi.',
    blocs: [
      {
        titre: 'Faire émerger les règles qui existent déjà',
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
          'Profilage par clustering (KNN) : les groupes sortent de l’analyse, pas d’un a ' +
          'priori.',
        decision:
          'Quel segment vous voulez servir mieux, et lequel vous coûte plus qu’il ne ' +
          'rapporte.',
      },
      {
        titre: 'Faire parler l’historique',
        texte:
          'Analyse exploratoire de l’historique sous Orange Data Mining, pondération et ' +
          'sélection des variables.',
        preuve:
          'Analyse de l’historique des inscriptions ayant abouti à des règles anti-fraude : ' +
          'fraude en baisse, conversion des inscriptions en hausse.',
      },
      {
        titre: 'Cette phase se livre pour elle-même',
        texte: 'Un document : règles formalisées, profils identifiés. Vous pouvez vous arrêter là.',
        decision: 'S’il y a un problème qui mérite d’être traité par la technique, et lequel.',
      },
    ],
  },
  {
    id: 'gouvernance',
    kind: 'chapitre',
    pole: 'data',
    kicker: 'Gouvernance et droit',
    titre: 'Qui possède quoi, et ce qui a le droit d’être traité',
    chapo:
      'La question du droit se pose avant la moindre ligne de code, et avant le premier ' +
      'indicateur : sa réponse écarte des solutions entières.',
    blocs: [
      {
        titre: 'Qui possède la donnée',
        decision: 'Quelle donnée reste chez vous, et ce que vous acceptez d’envoyer à un tiers.',
      },
      {
        titre: 'Ce qui a le droit d’être collecté et traité',
        preuve:
          'Conformité RGPD et DORA tenue en appels d’offres grands comptes (distribution, ' +
          'assurance, banque). Cadrage RGPD des données clients chez un e-commerçant de ' +
          'joaillerie.',
        decision:
          'Ce que vous collectez, ce que vous n’avez pas le droit de collecter, et pourquoi.',
      },
      {
        titre: 'La contrainte oriente la solution',
        texte:
          'Donnée qui ne peut pas sortir de chez vous : le service tiers est écarté, reste un ' +
          'modèle open-weight hébergé (Llama 3) ou une règle explicite.',
      },
    ],
  },
  {
    id: 'strategie-data',
    kind: 'chapitre',
    pole: 'data',
    kicker: 'La stratégie data',
    titre: 'Construire la stratégie data, ou s’appuyer sur celle qui existe',
    chapo:
      'Le périmètre légal est arbitré, on sait ce qui peut être collecté. Soit il faut ' +
      'décider quoi mesurer, soit la donnée existe et il faut en tirer quelque chose sans ' +
      'tout refaire.',
    blocs: [
      {
        titre: 'Quand rien n’est en place',
        decision: 'Ce que vous commencez à mesurer maintenant, et ce qui peut attendre six mois.',
      },
      {
        titre: 'Quand la donnée existe déjà',
        preuve:
          'Système d’analyse multi-sources conforme RGPD mesurant la rentabilité client à ' +
          'long terme, branché sur Google Ads et Bing Ads.',
        decision:
          'Sur quels indicateurs vous acceptez de décider, et lesquels sont encore du bruit.',
      },
      {
        titre: 'La qualité n’est pas un correctif',
        texte:
          'Un modèle entraîné sur une donnée sale produit une décision sale, plus vite et avec ' +
          'plus d’assurance.',
      },
    ],
  },
  {
    id: 'exploration',
    kind: 'chapitre',
    pole: 'data',
    kicker: 'La problématique',
    titre: 'Une question posée, des données explorées, et un test',
    chapo:
      'La stratégie data sert une question, pas l’inverse. J’explore vos données pour savoir ' +
      'si cette question a déjà sa réponse. Selon ce qui en sort, la suite est une règle, un ' +
      'modèle, ou un arbitrage d’acquisition.',
    blocs: [
      {
        titre: 'Poser la problématique',
        texte:
          'Une question à laquelle une donnée peut répondre, et dont la réponse change une ' +
          'décision. Un objectif large ne se traite pas : il se découpe en questions.',
        decision:
          'La question que vous voulez voir tranchée en premier, et ce que sa réponse ' +
          'changerait chez vous.',
      },
      {
        titre: 'Explorer les données',
        texte:
          'Cette fois la question est posée, et l’exploration ne cherche plus à comprendre ' +
          'votre activité : elle cherche si la réponse tient déjà dans un seuil, une règle ou ' +
          'une requête.',
        decision:
          'Les questions que vous poursuivez avec ce que vous avez déjà, et celles qui ' +
          'justifient d’aller collecter plus.',
      },
      {
        titre: 'Le test : ce problème a-t-il une réponse déterministe ?',
        texte:
          'Je pose ce test sur vos données, et je vous rends la réponse avant qu’un euro parte ' +
          'dans un modèle. Oui : la réponse s’écrit, se vérifie et s’explique, et je m’arrête ' +
          'là, sans IA. Non : elle dépend de régularités qu’aucune règle ne tient, et l’IA ' +
          'devient une option à examiner. Cette réponse tombe parfois dès le cadrage, quand ' +
          'votre métier la porte déjà ; sinon elle sort de l’exploration.',
        decision: 'Si ce problème appelle un modèle, ou s’il est déjà tranché.',
      },
      {
        titre: 'S’arrêter est un résultat',
        texte:
          'Le cas déterministe n’est pas un projet raté, c’est un projet répondu. Vous ' +
          'repartez avec la règle qui tranche, et sans le budget d’un modèle à entraîner puis ' +
          'à maintenir.',
        decision: 'Ce que vous n’avez pas besoin d’acheter, et sur quelle base.',
      },
    ],
  },
  // Cette charnière vient de `ia-sections.ts`, où elle passait la main « au pôle 3 ». Ce
  // rattachement était faux dès que l'IA a cessé d'être une étape avant le SEA & UX : la
  // charnière ne part pas de l'IA, elle part de la DONNÉE. Elle est donc rendue ici.
  //
  // **L'asymétrie signalée ici est soldée (issue #103).** Elle ne racontait qu'une des
  // deux suites, ce qui laissait la page dire en creux que l'IA vient ailleurs, ou après.
  // Elle les nomme désormais toutes les deux, dans une section qui refuse de les ordonner
  // : ce n'est pas une décoration, c'est le modèle de l'offre rendu au seul endroit où le
  // lecteur se demande ce qu'il fait de ce qu'il vient d'acheter.
  //
  // L'accueil portait la même charnière au même identifiant. C'était le doublon le plus
  // net du site : il n'existe plus qu'ici.
  {
    id: 'charniere-suites',
    kind: 'charniere',
    kicker: 'Charnière · vers les deux suites',
    titre: 'Un métier compris ouvre deux suites, et rien ne les ordonne',
    chapo:
      'Règles écrites, profils identifiés, donnée gouvernée : on tient la matière de l’IA ' +
      'comme celle de l’arbitrage. L’une, l’autre, ou les deux. Et vous pouvez aussi vous ' +
      'arrêter ici.',
    blocs: [
      {
        titre: 'Ce que l’IA en reçoit',
        texte:
          'des règles explicites, un périmètre de données arbitré, et la réponse à une ' +
          'question : une règle suffit-elle, ou faut-il un modèle ? Cette suite ne s’ouvre que ' +
          'dans le second cas.',
      },
      {
        titre: 'Ce que le SEA & UX en reçoit',
        texte:
          'la valeur client dans la durée à la place du coût par clic, et des identités ' +
          'réconciliées (agrégation multi-sources et dédoublonnage) avant toute lecture de ' +
          'performance.',
      },
      {
        titre: 'Et ensuite',
        texte:
          'chacune des deux tranche sur ces chiffres, puis implémente elle-même l’arbitrage. ' +
          'Rien n’oblige à prendre les deux.',
      },
    ],
  },
]
