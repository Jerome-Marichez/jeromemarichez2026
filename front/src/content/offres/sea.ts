// sea.ts — jeromemarichez2026
// Données éditoriales de l'offre « SEA ».
// Sources de vérité : README.md (périmètre éditorial) puis les CV de référence
// (/Users/nicolasb/Documents/CV/) pour les chiffres, dates et périmètres.
//
// Repositionnement du 2026-08-08 (arbitrage de Jérôme MARICHEZ, issue #16) :
// l'offre s'appelait « SEO / SEA ». Le référencement naturel N'EST PAS une prestation
// vendue — ni rédaction, ni netlinking, ni suivi de positions. L'axe « SEO technique »
// qui vivait ici est devenu une propriété du livrable d'Ingénierie Web (« Livré
// SEO-ready »), et l'axe `perimetre` ci-dessous le dit en toutes lettres plutôt que de
// laisser le prospect le supposer.
//
// Points de véracité tenus ici : côté mobile, Firebase Analytics et Crashlytics
// uniquement (ni AppsFlyer, ni Adjust, ni Amplitude) ; côté web, GTM, Measurement
// Protocol, GA, Matomo et CMP (ni Tealium, ni Adobe) ; régies limitées à Google Ads
// et Bing Ads (ni Meta Ads, ni LinkedIn Ads). Les budgets cités (100 000 € chez Truffle
// Capital, environ 25 000 € chez Verhoeven Joaillier) sont des faits du PARCOURS : ils
// décrivent ce qui a été fait, pas ce qui est vendu. Aucun tarif n'est publié : la
// tarification fait l'objet d'un arbitrage distinct (HT ou TTC) non encore rendu.
import type { IOffre } from '../../interfaces/offre'
import { offreSchema } from '../../schemas/offre.schema'

const donnees = {
  cle: 'sea',
  titre: 'SEA',
  accroche:
    'L’acquisition payante tenue par un ingénieur des données : la mesure n’est pas déclarative, elle est construite dans le code du produit.',
  decisionPermise:
    'Vous décidez où remettre un euro de budget, sur la rentabilité client réelle plutôt que sur les métriques natives des régies : ce que vous devez trancher apparaît, le reste disparaît.',
  axes: [
    {
      cle: 'mesure-taggage',
      titre: 'Taggage et collecte',
      description:
        'Google Tag Manager en conteneur web et server-side, dataLayer, Measurement Protocol. Plan de taggage et nomenclature d’événements standardisée, documentée et opposable. Google Analytics, Matomo, Search Console ; côté mobile, Firebase Analytics et Crashlytics.',
      preuve: 'Plan de taggage tenu sur trois produits, web et application mobile.',
    },
    {
      cle: 'conformite-by-design',
      titre: 'Conformité by design',
      description:
        'RGPD, CMP et gestion du consentement : déclenchement conditionnel des tags par catégorie, traitements cadrés avec le juridique. La conformité conditionne l’architecture de collecte, elle ne s’ajoute pas après coup.',
      preuve: null,
    },
    {
      cle: 'multi-source',
      titre: 'Entrepôt data multi-source',
      description:
        'Google Analytics, Matomo, Google Ads et Bing Ads agrégés, réconciliés et dédoublonnés dans un même entrepôt, avec intégration big data. Pas de connecteur générique : la donnée est modélisée selon le métier du client. C’est ce même entrepôt qui alimente ensuite les projets data et IA.',
      preuve: null,
    },
    {
      cle: 'tableaux-de-bord',
      titre: 'Un seul tableau de bord',
      description:
        'Toutes vos sources sur un écran, sur mesure par client et par produit — plus de va-et-vient entre quatre interfaces qui ne comptent pas de la même façon. Selon vos besoins : data visualisation, clustering et profilage clients, segmentation marketing et sémantique.',
      preuve: null,
    },
    {
      cle: 'rentabilite-long-terme',
      titre: 'La rentabilité à long terme, pas le one-shot',
      description:
        'Agrégation des sources d’acquisition, réconciliation et dédoublonnage des identités, mesure de la rentabilité client à long terme (LTV).',
      preuve:
        'KPI branchés sur Google Ads et Bing Ads : les budgets sont arbitrés sur la rentabilité réelle, pas sur les métriques natives des régies.',
    },
    {
      cle: 'sea-pilotage',
      titre: 'Pilotage des campagnes',
      description:
        'Google Ads et Bing Ads : structuration des campagnes, A/B testing, optimisation du taux de conversion, arbitrages rendus sur la rentabilité client à long terme et non sur les métriques natives des régies.',
      preuve:
        'Budget ADS / SEO de 100 000 € piloté chez Truffle Capital ; environ 25 000 € de prestataires SEA encadrés chez Verhoeven Joaillier.',
    },
    {
      cle: 'perimetre',
      titre: 'Ce que cette offre ne couvre pas',
      description:
        'Ce n’est pas une prestation de référencement naturel : ni rédaction de contenu, ni netlinking, ni suivi de positions. Le socle technique du référencement est livré avec le site par l’offre Ingénierie Web — « Livré SEO-ready » — et s’arrête là. Je le dis plutôt que de le laisser supposer.',
      preuve: null,
    },
  ],
} satisfies IOffre

/** Validée au chargement : une donnée non conforme échoue au build, pas en production. */
export const offreSea: IOffre = offreSchema.parse(donnees)
