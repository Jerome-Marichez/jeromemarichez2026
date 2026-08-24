// mailingvox-produits.ts (jeromemarichez-fr)
// Acetelecom / MailingVox, 2023-2026 : ce qui a été construit et exploité.
//
// Le cadre d'emploi est partagé par toutes les fiches d'ici (`cadres.ts`). Le fichier est
// séparé de `mailingvox-donnee.ts` pour la seule raison qui vaille dans ce dépôt : la
// limite de 300 lignes par fichier (docs/tooling.md).
//
// Périmètre de confidentialité appliqué : Prézage et Llama 3 sont nommables (autorisation
// explicite de Jérôme MARICHEZ, 2026-08-07) ; le contenu du corpus, les données et les
// chiffres du projet restent hors ligne. « Chiffre d'affaires maintenu » n'est donc pas
// publié ici, et ne l'est nulle part sur le site.

import type { IRealisation } from '@/interfaces/IRealisation'
import type { IRealisationChiffree } from '@/interfaces/IRealisationChiffree'
import { CADRE_MAILINGVOX } from './cadres'

/** Fiche chiffrée : le 98/100 Lighthouse du mur de preuves se déplie ici. */
export const REALISATION_SMS_EN_MASSE: IRealisationChiffree = {
  slug: 'sms-en-masse-plateforme',
  titre: 'Internaliser une plateforme SaaS exploitée en marque blanche',
  chapo:
    'Le produit vendu aux clients de MailingVox était une solution tierce exploitée en marque ' +
    'blanche. Il a été remplacé par une plateforme développée en interne, dont le ' +
    'référencement technique est une propriété du code et non d’un fournisseur.',
  meta: {
    title: 'Plateforme SaaS « Sms En Masse » : 98/100 Lighthouse',
    description:
      'Une solution tierce en marque blanche remplacée par une plateforme SaaS développée en ' +
      'interne : rendu arbitré page par page, 98/100 au score Lighthouse.',
  },
  cadre: CADRE_MAILINGVOX,
  poles: ['ingenierie-web', 'sea-ux'],
  probleme:
    'La plateforme « Sms En Masse » était une solution tierce revendue en marque blanche. ' +
    'Tout ce qui touchait au produit (sa vitesse, ses pages, son référencement) se ' +
    'décidait ailleurs.',
  etapes: [
    {
      titre: 'Un produit développé en propre',
      texte:
        'La solution tierce a été remplacée par une plateforme SaaS écrite en interne, front ' +
        'React et Next.js.',
    },
    {
      titre: 'Une stratégie de rendu par type de page',
      texte:
        'CSR, SSR, SSG ou ISR selon ce que la page doit servir. Performance perçue, coût ' +
        'serveur et référencement s’arbitrent page par page, pas une fois pour tout le site.',
    },
    {
      titre: 'L’accessibilité tenue en parallèle',
      texte:
        'Conformité RGAA / WCAG traitée pendant la construction. Reprise après coup, elle ' +
        'aurait demandé de rouvrir les mêmes pages une seconde fois.',
    },
  ],
  resultat:
    'Le produit est développé, mesuré et exploité en interne, et son référencement technique ' +
    'est traité comme une propriété du code.',
  chiffre: {
    chiffre: '98/100',
    libelle: 'au score Lighthouse',
    portee:
      'Le score porte sur la plateforme livrée, mesuré par Lighthouse. C’est une mesure de la ' +
      'page, pas une mesure d’audience, pas un chiffre d’affaires.',
  },
  decision:
    'Quelle page se rend au build, laquelle à la requête, et ce que chacune coûte en serveur ' +
    'comme en référencement.',
}

export const REALISATION_PREZAGE_MIGRATION: IRealisation = {
  slug: 'prezage-migration-mobile',
  titre: 'Migrer une application mobile sans geler la roadmap',
  chapo:
    'L’application Prézage tournait sur Ionic 6 et Angular 15. Les deux migrations ont été ' +
    'menées pendant que le produit continuait d’évoluer, sans interruption de service.',
  meta: {
    title: 'Prézage : migrer Ionic et Angular sans coupure',
    description:
      'Migration Ionic 6 vers 8 et Angular 15 vers 19 de l’application mobile Prézage, sans ' +
      'interruption de service ni gel de la roadmap produit.',
  },
  cadre: CADRE_MAILINGVOX,
  poles: ['ingenierie-web'],
  probleme:
    'L’application mobile Prézage accumulait de la dette sur deux socles vieillissants. ' +
    'L’arrêter le temps d’une migration n’était pas une option : la roadmap produit ' +
    'continuait, et une application figée est une application qu’on désinstalle.',
  etapes: [
    {
      titre: 'Ionic 6 vers 8, Angular 15 vers 19',
      texte:
        'Deux migrations menées par paliers sur iOS et Android, en gardant à chaque palier ' +
        'une version livrable.',
    },
    {
      titre: 'La dette résorbée en cours de route',
      texte:
        'Le rattrapage technique s’est fait dans le même mouvement, plutôt que dans un chantier ' +
        'à part qui n’aurait jamais été priorisé.',
    },
    {
      titre: 'Parcours et échecs suivis',
      texte:
        'Firebase Analytics et Crashlytics, jusqu’au correctif. Pas d’autre outillage de mesure ' +
        'mobile.',
    },
  ],
  resultat:
    'Les deux migrations ont été menées sans interruption de service et sans gel de la ' +
    'roadmap. Les chiffres du projet ne sont pas publiés : ils sont couverts par un accord de ' +
    'confidentialité.',
  decision:
    'Ce qu’on migre ce trimestre, ce qu’on gèle, et le coût réel de l’attente sur un produit ' +
    'qui continue de sortir des versions.',
}

export const REALISATION_ANTI_FRAUDE: IRealisation = {
  slug: 'regles-anti-fraude',
  titre: 'Tirer des règles anti-fraude de l’historique des inscriptions',
  chapo:
    'La question n’était pas de savoir s’il fallait un modèle, mais ce que l’historique disait ' +
    'déjà. Il disait assez pour écrire des règles explicites, moins chères à faire tourner et ' +
    'plus simples à corriger.',
  meta: {
    title: 'Règles anti-fraude tirées de l’historique',
    description:
      'Analyse exploratoire de l’historique des inscriptions sous Orange Data Mining, puis ' +
      'règles anti-fraude explicites implémentées dans le produit.',
  },
  cadre: CADRE_MAILINGVOX,
  poles: ['ingenierie-web', 'data'],
  probleme:
    'Des inscriptions frauduleuses passaient. Le réflexe aurait été d’entraîner un modèle ; ' +
    'l’historique n’avait pas encore été lu.',
  etapes: [
    {
      titre: 'Faire parler l’historique',
      texte:
        'Analyse exploratoire des inscriptions sous Orange Data Mining : pondération et ' +
        'sélection des variables, élimination des corrélations fortes et du bruit.',
    },
    {
      titre: 'Des règles plutôt qu’un modèle',
      texte:
        'Les caractéristiques discriminantes sortent de l’analyse, et une règle explicite les ' +
        'applique. Moins chère à faire tourner, plus simple à corriger, et explicable à ' +
        'quelqu’un qui demande pourquoi une inscription a été refusée.',
    },
    {
      titre: 'Implémentées dans le produit',
      texte:
        'Les règles ont été intégrées au produit par la même personne que celle qui les a ' +
        'définies : aucun aller-retour de spécification entre l’analyse et le code.',
    },
  ],
  resultat:
    'Fraude en baisse, conversion des inscriptions en hausse, latence réduite. Aucun de ces ' +
    'trois résultats n’est chiffré ici : je n’en publie pas de mesure.',
  decision:
    'Ce qui se règle par une règle intégrée à l’existant, et ce qui mérite vraiment un modèle.',
}
