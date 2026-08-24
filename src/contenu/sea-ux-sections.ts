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
//
// Le chapitre `pilotage` dit désormais SUR QUOI il arbitre (issue #128) : les segments
// d'abord, la valeur client dans la durée ensuite. Deux points de véracité s'y attachent,
// et ils ne se rouvrent pas sans preuve nouvelle.
//
//  1. La FIDÉLISATION n'a aucune preuve, ni dans le dépôt ni dans aucun des trois CV de
//     référence (recherche du 2026-08-23 : segmentation, LTV, profilage, fidélisation,
//     rétention, churn). Elle n'apparaît donc jamais comme une prestation dont le
//     résultat serait tenu. Mesurer ce qu'un client rapporte sur deux ans, c'est par
//     construction mesurer ce qu'il vaut une fois acquis : c'est à ce titre, et à ce
//     titre seulement, qu'elle est nommée, comme un arbitrage que la mesure permet. Toute
//     reformulation qui laisserait entendre une campagne de rétention menée, un
//     programme de fidélité ou un churn réduit serait fausse.
//  2. Le PROFILAGE par clustering (KNN) reste écrit une seule fois, sur la page Data,
//     qui dit COMMENT il est produit. Ici on dit seulement ce qu'on en fait. Recopier la
//     méthode ferait perdre au site la seule chose qui distingue les deux pages.
//
// L'enrichissement tient DANS le chapitre existant, sans en créer un nouveau : le SEA &
// UX et l'IA sont deux branches parallèles de rang égal, et une page qui gagnerait deux
// chapitres quand l'autre en compte quatre dirait le contraire en pure mise en page.
//
// Le « sur deux ans » du chapô n'est pas un chiffre de performance et ne s'invente pas
// ici : il vient de la fiche `mesure-ltv-multi-sources`, il y désigne l'horizon qu'aucune
// régie ne couvre, et l'issue #128 le reprend tel quel. Il est resté au chapô, et une
// seule fois : le bloc dit « dans la durée », pour ne pas répéter la formule à cinq lignes
// d'intervalle.
//
// Le bloc « Valeur client à long terme » porte texte, preuve et décision à la fois, là où
// le commentaire d'`IEditorialBlock` invite d'ordinaire à omettre le texte. C'est
// délibéré : sans lui, la preuve du système multi-sources dit ce qui a été construit sans
// dire ce qu'on en tire, et ce bloc était le plus maigre de la page alors qu'il en porte
// l'argument central.

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
        // Cette preuve manquait à la page du pôle alors qu'elle était sur l'accueil : le
        // +50 % de panier moyen est la preuve phare de l'arbitrage UX, et la page qui le
        // vend ne la portait pas. Descendue par l'issue #103.
        preuve:
          'Panier moyen en hausse de 50 % sur un e-commerce de joaillerie de luxe, après ' +
          'refonte des parcours d’achat pilotée par la mesure.',
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
      'Une régie mesure ce qu’elle a servi, pas ce que le client vous rapportera sur deux ' +
      'ans, et elle ne sait pas à quel profil de client elle vient de parler. J’arbitre sur ' +
      'ce qui lui manque : les segments calculés sur votre historique client, ce qu’un client ' +
      'coûte à gagner et ce qu’il rapporte ensuite.',
    blocs: [
      {
        titre: 'Sur quels segments j’arbitre',
        texte:
          'Les segments viennent du profilage client mené sur le pôle Data, pas d’une cible ' +
          'choisie au départ. Je les reprends tels quels pour répartir le budget entre les ' +
          'campagnes, régler les enchères et décider quel message va à quel groupe.',
        decision:
          'Quels segments reçoivent le budget d’acquisition du trimestre, et lesquels n’en ' +
          'reçoivent plus.',
      },
      {
        titre: 'Valeur client à long terme',
        texte:
          'J’agrège les régies, le produit et le CRM dans un même modèle, puis je réconcilie ' +
          'les identités avant toute lecture de performance. Je lis alors ce que le client ' +
          'rapporte dans la durée, pas ce qu’un clic a coûté. Le même chiffre dit ce qu’il ' +
          'vaut une fois acquis : il éclaire donc l’acquisition comme la fidélisation.',
        preuve:
          'Un système d’analyse multi-sources conforme RGPD : Google Ads, Bing Ads, produit ' +
          'et CRM agrégés sur le modèle métier, identités réconciliées et dédoublonnées.',
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
