// sea-ux-sections.ts — jeromemarichez-fr
// Le pôle SEA & UX — l'une des deux suites de la donnée. SEA et arbitrages d'expérience.
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
    kind: 'chapitre',
    pole: 'sea-ux',
    kicker: 'Disons-le tout de suite',
    titre: 'Je ne dessine pas vos maquettes',
    chapo: 'Pas de création graphique : des arbitrages pris sur des chiffres, puis implémentés.',
    blocs: [
      {
        titre: 'Ce que je fais',
        texte:
          'Je lis ce que la donnée dit du parcours réel, je propose, je teste, et j’écris le ' +
          'code.',
        decision: 'Quelle étape du tunnel disparaît, et ce que vous gagnez à la supprimer.',
      },
      {
        titre: 'Ce que je ne fais pas',
        texte:
          'Pas d’identité visuelle, pas de direction artistique. S’il vous faut un designer, ' +
          'je travaille volontiers avec le vôtre.',
      },
      {
        titre: 'Pourquoi ça marche',
        texte:
          'Les chiffres viennent de la data, le code de l’ingénierie web : la chaîne entière ' +
          'tient sur la même personne.',
      },
    ],
  },
  {
    id: 'mesure',
    kind: 'chapitre',
    pole: 'sea-ux',
    kicker: 'La mesure',
    titre: 'Construite dans le code, pas déclarée dans une interface',
    chapo:
      'Je lis le code là où l’événement doit être posé, au lieu de le deviner depuis un ' +
      'tableau de bord.',
    blocs: [
      {
        titre: 'Plan de taggage opposable',
        decision: 'Quels événements existent, ce qu’ils portent, et qui répond de leur exactitude.',
      },
      {
        titre: 'Collecte web et server-side',
        texte:
          'GTM en conteneur web et server-side, dataLayer, Measurement Protocol. Google ' +
          'Analytics, Matomo, Search Console.',
      },
      {
        titre: 'Mobile',
        texte:
          'Firebase Analytics et Crashlytics : événements in-app, parcours et échecs suivis ' +
          'jusqu’au correctif. Pas d’autre outillage mobile revendiqué.',
      },
      {
        titre: 'Recette de la donnée',
        preuve: 'Méthode de recette adossée à la certification ISTQB Foundation.',
      },
    ],
  },
  {
    id: 'conformite',
    kind: 'chapitre',
    pole: 'sea-ux',
    kicker: 'La conformité',
    titre: 'Par construction, pas en rattrapage',
    chapo:
      'Le consentement ne se rajoute pas sur une collecte existante : il conditionne son ' +
      'architecture.',
    blocs: [
      {
        titre: 'RGPD et gestion du consentement',
        decision:
          'Ce que vous collectez, ce que vous n’avez pas le droit de collecter, et pourquoi.',
      },
      {
        titre: 'Exigences grands comptes',
        texte:
          'RGPD et DORA, tels qu’ils sont demandés en appel d’offres par la distribution, ' +
          'l’assurance et la banque.',
      },
    ],
  },
  {
    id: 'pilotage',
    kind: 'chapitre',
    pole: 'sea-ux',
    kicker: 'Le pilotage',
    titre: 'Arbitrer sur la rentabilité réelle, pas sur les métriques des régies',
    chapo:
      'Une régie mesure ce qu’elle a servi, pas ce que le client vous rapportera sur deux ans.',
    blocs: [
      {
        titre: 'Valeur client à long terme',
        decision: 'Quelle source d’acquisition vous coupez le mois prochain, et sur quel chiffre.',
      },
      {
        titre: 'Campagnes et référencement',
        texte:
          'Google Ads, Bing Ads, SEO, SEA et SMA. Taux de conversion, A/B testing, heatmaps, ' +
          'taux de rebond.',
        preuve:
          '100 000 € de budget ADS / SEO pilotés, mesurés et justifiés auprès des ' +
          'dirigeants chez Truffle Capital ; environ 25 000 € d’encadrement de prestataires ' +
          'SEA chez Verhoeven Joaillier.',
      },
      {
        titre: 'Tableaux de bord sur mesure',
        texte: 'Un tableau de bord par client et par produit, construit sur son modèle métier.',
      },
      {
        titre: 'Référencement technique',
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
      'Le dernier maillon renvoie au premier : l’arbitrage décidé le lundi est implémenté dans ' +
      'la semaine.',
    blocs: [
      {
        titre: 'Aucun transfert de dossier',
        texte: 'la personne qui a lu le chiffre est celle qui modifie le code.',
      },
      {
        titre: 'Retour à l’ingénierie web',
        texte:
          'la modification suit le même cycle : test d’abord, non-régression, mise en ' +
          'production sans coupure.',
      },
    ],
  },
]
