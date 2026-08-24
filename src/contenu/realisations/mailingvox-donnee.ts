// mailingvox-donnee.ts (jeromemarichez-fr)
// Acetelecom / MailingVox, 2023-2026 : ce qui a été construit sur la donnée.
//
// Séparé de `mailingvox-produits.ts` pour la limite de 300 lignes par fichier, et
// regroupé par ce sur quoi le travail s'appuie : la donnée et les modèles.
//
// Deux fiches d'ici n'ont **aucun résultat**, ni chiffré ni directionnel, et le disent.
// C'est la même doctrine que les certifications, publiées sans lien plutôt qu'avec un
// lien mort : une fiche qui décrit ce qui a été construit vaut mieux qu'une fiche qui
// invente ce que ça a rapporté.
//
// Périmètre de confidentialité : Prézage et Llama 3 sont nommables ; le contenu du
// corpus, les données et les chiffres du projet restent hors ligne.

import type { IRealisation } from '@/interfaces/IRealisation'
import { CADRE_MAILINGVOX } from './cadres'

export const REALISATION_PREZAGE_LLAMA: IRealisation = {
  slug: 'prezage-llama-3',
  titre: 'Spécialiser un Llama 3 sur un métier, pour une application mobile',
  chapo:
    'Le problème posé était du langage, sur un métier précis : un modèle généraliste répondait ' +
    'à côté. Llama 3 a été spécialisé sur un corpus métier, complété par un procédé maison ' +
    'd’augmentation du contexte.',
  meta: {
    title: 'Prézage : un Llama 3 spécialisé sur un métier',
    description:
      'Fine-tuning de Llama 3 sur corpus métier pour l’application Prézage, complété par un ' +
      'procédé maison d’augmentation du contexte. Aucun framework tiers.',
  },
  cadre: CADRE_MAILINGVOX,
  poles: ['data', 'ia'],
  probleme:
    'L’application mobile Prézage avait besoin de réponses justes sur un métier précis. Un ' +
    'modèle généraliste répond bien en général, et à côté en particulier.',
  etapes: [
    {
      titre: 'Fine-tuning de Llama 3',
      texte:
        'Le modèle a été spécialisé sur un corpus métier. Ce que contient ce corpus, d’où il ' +
        'vient et ce qu’il pèse ne sont pas publiés : ils sont couverts par un accord de ' +
        'confidentialité.',
    },
    {
      titre: 'Une augmentation de contexte faite maison',
      texte:
        'Un procédé maison, proche du RAG, complète le fine-tuning. Écrit à la main, sans ' +
        'framework tiers.',
    },
    {
      titre: 'L’arbitrage, refait à chaque cas d’usage',
      texte:
        'Coût, latence, qualité et confidentialité comparés en continu entre un modèle ' +
        'open-weight hébergé et un service tiers. La réponse change selon le cas, pas selon ' +
        'la mode.',
    },
  ],
  resultat:
    'Charge de travail des prestataires réduite. Le résultat n’est pas chiffré : les chiffres ' +
    'du projet sont couverts par l’accord de confidentialité.',
  decision:
    'Modèle hébergé chez vous ou service tiers, et ce que chacun vous coûte par mois, une ' +
    'fois la confidentialité mise dans la balance.',
}

export const REALISATION_DEPOT_VOCAL: IRealisation = {
  slug: 'echecs-depot-vocal',
  titre: 'Anticiper les échecs de dépôt vocal avec un modèle supervisé',
  chapo:
    'L’échec d’un dépôt vocal ne se constatait qu’après coup, une fois la route déjà empruntée. ' +
    'Un modèle supervisé, entraîné sur les caractéristiques du signal audio, le voit venir.',
  meta: {
    title: 'Anticiper les échecs de dépôt vocal : modèle supervisé',
    description:
      'Modèle supervisé en production (TensorFlow, inférence en cloud functions) ' +
      'anticipant les échecs de dépôt vocal. Extraction du signal publiée sur arXiv.',
  },
  cadre: CADRE_MAILINGVOX,
  poles: ['data', 'ia'],
  probleme:
    'Certaines routes vocales échouaient au dépôt du message. L’échec ne se constatait qu’après ' +
    'coup, une fois la route déjà empruntée, et facturée.',
  etapes: [
    {
      titre: 'Extraire les caractéristiques du signal',
      texte:
        'La méthode d’extraction des caractéristiques du signal audio est publiée sur arXiv. ' +
        'Je l’ai implémentée moi-même, puis adaptée aux données réelles.',
    },
    {
      titre: 'Un modèle supervisé, mis en production',
      texte:
        'TensorFlow, inférence en cloud functions. Versioning et monitoring du modèle, comme ' +
        'pour n’importe quel composant qui tourne.',
    },
    {
      titre: 'Industrialisé, pas prototypé',
      texte:
        'CI/CD Docker et GitHub Actions, Vertex AI, Pub/Sub, Cloud Run, VM Compute Engine ' +
        'auto-scalées. Pas de cluster Kubernetes administré en propre.',
    },
  ],
  resultat:
    'Routes vocales coûteuses évitées. Le gain n’est pas chiffré ici : je n’en publie pas de ' +
    'mesure.',
  decision:
    'À partir de quel taux d’échec un modèle coûte moins cher que les routes qu’il évite, et ' +
    'jusqu’où il faut le surveiller ensuite.',
}

export const REALISATION_RAG_SUPPORT: IRealisation = {
  slug: 'rag-support-niveau-1',
  titre: 'Répondre aux tickets de niveau 1 depuis la documentation interne',
  chapo:
    'Les questions du support de niveau 1 ont déjà leur réponse écrite quelque part. Un RAG ' +
    'documentaire fait maison va la chercher, au lieu de laisser un modèle répondre de mémoire.',
  meta: {
    title: 'RAG documentaire fait maison pour le support',
    description:
      'Réponse automatisée aux tickets de support de niveau 1 : recherche vectorielle ' +
      'PostgreSQL et API OpenAI, réponses ancrées sur la documentation interne.',
  },
  cadre: CADRE_MAILINGVOX,
  poles: ['data', 'ia'],
  probleme:
    'Les tickets de support de niveau 1 posent des questions dont la réponse est déjà dans la ' +
    'documentation interne. Un modèle qui répond de mémoire invente une réponse plausible : ' +
    'c’est le pire des deux mondes pour un support.',
  etapes: [
    {
      titre: 'La recherche vectorielle dans PostgreSQL',
      texte:
        'La base documentaire est indexée là où vivent déjà les données : pas de base ' +
        'vectorielle supplémentaire à exploiter, à sauvegarder et à surveiller.',
    },
    {
      titre: 'Des réponses ancrées sur les documents',
      texte:
        'API OpenAI, réponse construite sur les passages retrouvés et non sur la mémoire du ' +
        'modèle.',
    },
    {
      titre: 'Aucun framework tiers',
      texte:
        'Le RAG est écrit à la main. Ce qui tourne en production est ce que je peux corriger ' +
        'sans attendre la version suivante d’une bibliothèque.',
    },
  ],
  resultat:
    'Aucun résultat n’est publié ici : je n’en ai pas de mesuré. Cette fiche décrit ce qui a ' +
    'été construit, pas ce que ça a rapporté.',
  decision: 'Ce que vous laissez répondre automatiquement, et ce qui doit rester devant un humain.',
}

export const REALISATION_LTV_MULTI_SOURCES: IRealisation = {
  slug: 'mesure-ltv-multi-sources',
  titre: 'Mesurer la rentabilité client à long terme, sources réconciliées',
  chapo:
    'Une régie mesure ce qu’elle a servi, et ne sait pas qu’elle parle du même client qu’une ' +
    'autre. Le système agrège les sources, réconcilie les identités et mesure la valeur dans ' +
    'la durée.',
  meta: {
    title: 'Mesurer la rentabilité client à long terme',
    description:
      'Système d’analyse multi-sources conforme RGPD mesurant la rentabilité client à long ' +
      'terme : agrégation et réconciliation des identités.',
  },
  cadre: CADRE_MAILINGVOX,
  poles: ['data', 'sea-ux'],
  probleme:
    'Chaque régie mesure ce qu’elle a servi. Aucune ne dit ce qu’un client rapporte sur deux ' +
    'ans, et aucune ne sait qu’elle parle du même client qu’une autre.',
  etapes: [
    {
      titre: 'Agréger, sur le modèle métier',
      texte:
        'Régies (Google Ads, Bing Ads), produit et CRM agrégés dans un même modèle, construit ' +
        'sur l’activité plutôt que sur un connecteur générique.',
    },
    {
      titre: 'Réconcilier les identités',
      texte:
        'Dédoublonnage, contrôles d’intégrité et de véracité dès l’ingestion, détection ' +
        'd’anomalies. La qualité est un prérequis, pas un correctif.',
    },
    {
      titre: 'La conformité conditionne la collecte',
      texte:
        'RGPD, consentement et déclenchement conditionnel des tags par catégorie. RGPD et DORA ' +
        'tels qu’ils sont exigés en appel d’offres par la distribution, l’assurance et la ' +
        'banque.',
    },
  ],
  resultat:
    'Aucun résultat n’est publié ici : je n’en ai pas de mesuré. Le système existe et il ' +
    'tourne : c’est tout ce que cette fiche affirme.',
  decision:
    'Quelle source d’acquisition vous coupez le mois prochain, et sur quel chiffre : la ' +
    'rentabilité réelle, pas celle que la régie déclare.',
}
