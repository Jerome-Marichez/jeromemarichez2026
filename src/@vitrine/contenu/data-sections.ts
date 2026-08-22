// data-sections.ts — jeromemarichez-fr
// Les chapitres de la page Data : métier, stratégie data, gouvernance et droit.
//
// Le critère de rattachement est le CONTENU, jamais le titre. Vient ici ce qui parle de
// collecte, de plan de taggage, de gouvernance, de qualité ou de réconciliation
// d'identités ; ce qui parle de modèles, d'inférence, de fine-tuning, de RAG ou d'agents
// est dans `ia-sections.ts`, qui sert désormais un pôle distinct.
//
// L'ORDRE EST LE CONTENU : métier → stratégie data → gouvernance et droit. On part de
// l'activité, pas d'un catalogue de technologies — la solution technique répond au
// problème posé au départ, elle n'en est jamais le point de départ.
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
      'Une activité qui tourne sait déjà beaucoup de choses, rarement écrites. Le mettre noir ' +
      'sur blanc est une prestation à part entière.',
    blocs: [
      {
        titre: 'Faire émerger les règles qui existent déjà',
        texte:
          'Je recueille les règles de décision auprès de ceux qui les appliquent, puis je les ' +
          'confronte à votre historique.',
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
        texte:
          'Un document : règles formalisées, profils identifiés, ce que votre donnée dit de ' +
          'votre activité. Vous pouvez vous arrêter là.',
        decision: 'S’il y a un problème qui mérite d’être traité par la technique — et lequel.',
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
      'Soit il faut décider quoi mesurer, soit la donnée existe et il s’agit d’en tirer ' +
      'quelque chose sans tout refaire.',
    blocs: [
      {
        titre: 'Quand rien n’est en place',
        texte:
          'Indicateurs, plan de collecte, pipelines d’ingestion, modélisation : PostgreSQL ' +
          'relationnel, séries temporelles ou vectoriel, MySQL, Firebase.',
        decision: 'Ce que vous commencez à mesurer maintenant, et ce qui peut attendre six mois.',
      },
      {
        titre: 'Quand la donnée existe déjà',
        texte:
          'Réconciliation multi-sources et dédoublonnage selon votre modèle métier, écarts ' +
          'corrigés dès l’ingestion.',
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
    id: 'gouvernance',
    kind: 'chapitre',
    pole: 'data',
    kicker: 'Gouvernance et droit',
    titre: 'Qui possède quoi, et ce qui a le droit d’être traité',
    chapo:
      'Elle se pose avant la moindre ligne de code : sa réponse écarte des solutions entières, ' +
      'et y répondre après coup coûte le double.',
    blocs: [
      {
        titre: 'Qui possède la donnée',
        texte:
          'Cartographie des sources et de leur propriété : à vous, à vos clients, ou à une ' +
          'régie.',
        decision: 'Quelle donnée reste chez vous, et ce que vous acceptez d’envoyer à un tiers.',
      },
      {
        titre: 'Ce qui a le droit d’être collecté et traité',
        texte: 'RGPD, base légale, consentement géré par une CMP, cadrage avec le juridique.',
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
          'Si une donnée ne peut pas quitter votre système, le service tiers est écarté : ' +
          'reste un modèle open-weight hébergé — Llama 3 — ou une règle explicite.',
      },
    ],
  },
  // Cette charnière vient de `ia-sections.ts`, où elle passait la main « au pôle 3 ». Ce
  // rattachement était faux dès que l'IA a cessé d'être une étape avant le SEA & UX : la
  // charnière ne part pas de l'IA, elle part de la DONNÉE. Elle est donc rendue ici.
  //
  // Elle n'a pas encore de symétrique vers l'IA : la donnée ouvre deux suites, et une
  // seule des deux est racontée en fin de page. C'est une asymétrie de narration, pas de
  // modèle — la page annonce bien les deux suites dès son ouverture (`PoleHero`), et le
  // lot de réécriture éditoriale doit écrire la charnière manquante.
  {
    id: 'charniere-arbitrage',
    kind: 'charniere',
    kicker: 'Charnière · vers le SEA & UX',
    titre: 'Un métier compris devient un budget arbitrable',
    chapo:
      'Règles écrites, profils identifiés, donnée gouvernée : on tient la matière des ' +
      'arbitrages. Sans elle, le SEA achète du volume.',
    blocs: [
      {
        titre: 'Rentabilité à long terme',
        texte: 'la valeur client dans la durée remplace le coût par clic.',
      },
      {
        titre: 'Et ensuite',
        texte: 'le pôle SEA & UX tranche sur ces chiffres, puis implémente l’arbitrage lui-même.',
      },
    ],
  },
]
