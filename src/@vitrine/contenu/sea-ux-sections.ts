// sea-ux-sections.ts — jeromemarichez-fr
// Pôle 3 — Arbitrer. SEA et arbitrages d'expérience.
//
// Point de vigilance éditorial numéro un : rien ici ne doit laisser croire à de la
// création graphique ou à du design d'interface. Ce qui est vendu, ce sont des
// arbitrages pris sur la donnée, puis implémentés.
//
// Règles de véracité du CLAUDE.md appliquées : GTM appartient à la période
// Acetelecom / MailingVox (chez Verhoeven : Google Analytics, A/B testing, heatmaps) ;
// mobile = Firebase Analytics et Crashlytics uniquement ; régies = Google Ads et
// Bing Ads, jamais Meta ni LinkedIn.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

export const SECTIONS_SEA_UX: IEditorialSection[] = [
  {
    id: 'cadrage-ux',
    kind: 'pole',
    pole: 'sea-ux',
    kicker: 'Disons-le tout de suite',
    titre: 'Je ne dessine pas vos maquettes',
    chapo:
      'Ce pôle ne vend pas de création graphique ni de design d’interface. Il vend des ' +
      'arbitrages : quel parcours, quelle étape supprimée, quel formulaire raccourci, quel ' +
      'test A/B tranché, quelle page rendue en SSR plutôt qu’en CSR. Des décisions, prises ' +
      'sur des chiffres, puis implémentées dans le produit.',
    blocs: [
      {
        titre: 'Ce que je fais',
        texte:
          'Je regarde ce que la donnée dit du parcours réel, je propose la modification, ' +
          'je la teste, et j’écris le code qui l’applique. La boucle complète, sans ' +
          'intermédiaire ni transfert de dossier.',
        decision: 'Quelle étape du tunnel disparaît, et ce que vous gagnez à la supprimer.',
      },
      {
        titre: 'Ce que je ne fais pas',
        texte:
          'Je ne produis pas d’identité visuelle, pas de direction artistique, pas de ' +
          'maquette esthétique livrée en fichier. Si c’est ce dont vous avez besoin, il ' +
          'vous faut un designer — et je travaille volontiers avec le vôtre.',
      },
      {
        titre: 'Pourquoi ça marche',
        texte:
          'Parce que les chiffres viennent du pôle 2 et que le code vient du pôle 1. Un ' +
          'arbitrage n’est utile que s’il repose sur une mesure fiable et qu’il finit ' +
          'réellement implémenté ; ici, les trois maillons sont tenus par la même personne.',
      },
    ],
  },
  {
    id: 'mesure',
    kind: 'pole',
    pole: 'sea-ux',
    kicker: 'La mesure',
    titre: 'Construite dans le code, pas déclarée dans une interface',
    chapo:
      'C’est ce qui distingue cette prestation de celle d’une agence : je lis le code à ' +
      'l’endroit exact où l’événement doit être posé, au lieu de le deviner depuis un ' +
      'tableau de bord. La donnée qui en sort n’est pas approximative.',
    blocs: [
      {
        titre: 'Plan de taggage opposable',
        texte:
          'Conventions de nommage, propriétés attendues, cycle de vie de chaque événement, ' +
          'documentation tenue à jour et opposable aux équipes. Sans ce document, chaque ' +
          'nouvelle fonctionnalité ajoute un dialecte de plus.',
        decision: 'Quels événements existent, ce qu’ils portent, et qui répond de leur exactitude.',
      },
      {
        titre: 'Collecte web et server-side',
        texte:
          'Google Tag Manager en conteneur web et server-side, dataLayer, Measurement ' +
          'Protocol : les événements partent de serveur à serveur, moins exposés aux ' +
          'bloqueurs et à la perte de signal côté navigateur. Google Analytics, Matomo, ' +
          'Search Console.',
      },
      {
        titre: 'Mobile',
        texte:
          'Firebase Analytics et Crashlytics : événements in-app, parcours et échecs suivis ' +
          'jusqu’au correctif livré. Pas d’autre outillage mobile revendiqué — ce serait ' +
          'inventé.',
      },
      {
        titre: 'Recette de la donnée',
        texte:
          'Les implémentations de tracking sont recettées événement par événement, avec la ' +
          'même méthode que le reste du produit. Contrôles d’intégrité dès l’ingestion, ' +
          'dédoublonnage, correction des anomalies avant qu’elles n’atteignent un rapport.',
        preuve: 'Méthode de recette adossée à la certification ISTQB Foundation.',
      },
    ],
  },
  {
    id: 'conformite',
    kind: 'pole',
    pole: 'sea-ux',
    kicker: 'La conformité',
    titre: 'Par construction, pas en rattrapage',
    chapo:
      'Le consentement ne se rajoute pas sur une collecte existante : il conditionne son ' +
      'architecture. Une collecte conçue sans lui devra être refaite, pas corrigée.',
    blocs: [
      {
        titre: 'RGPD et gestion du consentement',
        texte:
          'Plateforme de gestion du consentement, déclenchement conditionnel des tags par ' +
          'catégorie, cadrage des traitements avec le juridique. Finalité et durée de ' +
          'conservation décidées avant la première ligne de collecte.',
        decision:
          'Ce que vous collectez, ce que vous n’avez pas le droit de collecter, et pourquoi.',
      },
      {
        titre: 'Exigences grands comptes',
        texte:
          'RGPD et DORA, tels qu’ils sont réellement demandés en appel d’offres par la ' +
          'distribution, l’assurance et la banque. Ce sont des questionnaires auxquels il ' +
          'faut savoir répondre avec des preuves, pas avec des intentions.',
      },
    ],
  },
  {
    id: 'pilotage',
    kind: 'pole',
    pole: 'sea-ux',
    kicker: 'Le pilotage',
    titre: 'Arbitrer sur la rentabilité réelle, pas sur les métriques des régies',
    chapo:
      'Une régie publicitaire mesure ce qu’elle a servi. Elle ne mesure pas ce que le ' +
      'client vous rapportera sur deux ans. Tant que l’arbitrage se fait sur ses chiffres ' +
      'à elle, le budget suit son intérêt, pas le vôtre.',
    blocs: [
      {
        titre: 'Valeur client à long terme',
        texte:
          'Agrégation des sources d’acquisition, réconciliation et dédoublonnage des ' +
          'identités, mesure de la rentabilité dans la durée. Les budgets sont ensuite ' +
          'arbitrés là-dessus.',
        decision: 'Quelle source d’acquisition vous coupez le mois prochain, et sur quel chiffre.',
      },
      {
        titre: 'Campagnes et référencement',
        texte:
          'Google Ads, Bing Ads, SEO, SEA et SMA. Optimisation du taux de conversion, ' +
          'A/B testing des pages et des designs, analyse comportementale — heatmaps, taux ' +
          'de rebond, part de trafic mobile.',
        preuve:
          '100 000 € de budget ADS / SEO pilotés, mesurés et justifiés auprès des ' +
          'dirigeants chez Truffle Capital ; environ 25 000 € d’encadrement de prestataires ' +
          'SEA chez Verhoeven Joaillier.',
      },
      {
        titre: 'Tableaux de bord sur mesure',
        texte:
          'Un tableau de bord par client et par produit, construit sur son modèle métier — ' +
          'pas un gabarit rempli par un connecteur générique. Profilage clients par ' +
          'clustering pour rendre la décision lisible.',
      },
      {
        titre: 'Référencement technique',
        texte:
          'Le SEO traité comme une propriété du produit : stratégie de rendu Next.js par ' +
          'type de page, Core Web Vitals, Lighthouse, accessibilité. Ce n’est pas une ' +
          'prestation à part, c’est une conséquence des choix du pôle 1.',
        preuve: 'Lighthouse 98/100 sur la plateforme SaaS livrée.',
      },
    ],
  },
  {
    id: 'boucle',
    kind: 'charniere',
    kicker: 'La boucle',
    titre: 'Ce que la mesure révèle repart en construction',
    chapo:
      'Le dernier maillon renvoie au premier. Un arbitrage décidé le lundi est implémenté ' +
      'dans la semaine, parce qu’il n’attend ni le devis d’une agence ni la disponibilité ' +
      'd’un intégrateur. C’est là que l’interlocuteur unique cesse d’être un argument de ' +
      'confort et devient un gain de délai mesurable.',
    blocs: [
      {
        titre: 'Aucun transfert de dossier',
        texte:
          'la personne qui a lu le chiffre est celle qui modifie le code — rien ne se perd ' +
          'à la jointure.',
      },
      {
        titre: 'Retour au pôle 1',
        texte:
          'la modification suit le même cycle que le reste : test d’abord, non-régression, ' +
          'mise en production sans coupure.',
      },
    ],
  },
]
