// seo-sea.ts — jeromemarichez2026
// Données éditoriales de l'offre « SEO / SEA ».
// Sources de vérité : README.md (périmètre éditorial) puis les CV de référence
// (/Users/nicolasb/Documents/CV/) pour les chiffres, dates et périmètres.
// Points de véracité tenus ici : côté mobile, Firebase Analytics et Crashlytics
// uniquement (ni AppsFlyer, ni Adjust, ni Amplitude) ; côté web, GTM, Measurement
// Protocol, GA, Matomo et CMP (ni Tealium, ni Adobe) ; régies limitées à Google Ads
// et Bing Ads (ni Meta Ads, ni LinkedIn Ads).
import type { IOffre } from '../../interfaces/offre'
import { offreSchema } from '../../schemas/offre.schema'

const donnees = {
  cle: 'seo-sea',
  titre: 'SEO / SEA',
  accroche:
    'L’acquisition tenue par un ingénieur des données : la mesure n’est pas déclarative, elle est construite dans le code du produit.',
  decisionPermise:
    'Vous décidez où remettre un euro de budget, sur la rentabilité client réelle plutôt que sur les métriques natives des régies.',
  axes: [
    {
      cle: 'mesure-taggage',
      titre: 'Mesure et taggage',
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
      cle: 'rentabilite-long-terme',
      titre: 'La rentabilité à long terme, pas le one-shot',
      description:
        'Agrégation des sources d’acquisition, réconciliation et dédoublonnage des identités, mesure de la rentabilité client à long terme (LTV).',
      preuve:
        'KPI branchés sur Google Ads et Bing Ads : les budgets sont arbitrés sur la rentabilité réelle, pas sur les métriques natives des régies.',
    },
    {
      cle: 'multi-source',
      titre: 'Solutions sur mesure multi-source',
      description:
        'Pas de connecteur générique : la donnée est agrégée depuis les régies (Google Ads, Bing Ads) et depuis le produit, puis réconciliée selon le modèle métier du client.',
      preuve: null,
    },
    {
      cle: 'tableaux-de-bord',
      titre: 'Tableaux de bord personnalisés',
      description:
        'Un tableau de bord par client et par produit, pas un gabarit. Data visualisation, clustering et profilage clients (KNN) : ce que le dirigeant doit trancher apparaît, le reste disparaît.',
      preuve: null,
    },
    {
      cle: 'sea-pilotage',
      titre: 'SEA et pilotage',
      description:
        'Google Ads, Bing Ads, SEO / SEA / SMA, A/B testing, optimisation du taux de conversion.',
      preuve:
        'Budget ADS / SEO de 100 000 € piloté chez Truffle Capital ; environ 25 000 € de prestataires SEA encadrés chez Verhoeven Joaillier.',
    },
    {
      cle: 'seo-technique',
      titre: 'SEO technique',
      description:
        'Stratégie de rendu Next.js par type de page, Core Web Vitals, Lighthouse, accessibilité : le référencement traité comme une propriété du produit, pas comme une couche ajoutée à la fin.',
      preuve: 'Lighthouse 98/100 sur la plateforme SaaS « Sms En Masse ».',
    },
  ],
} satisfies IOffre

/** Validée au chargement : une donnée non conforme échoue au build, pas en production. */
export const offreSeoSea: IOffre = offreSchema.parse(donnees)
