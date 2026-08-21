// limites.ts — jeromemarichez-fr
// Ce que je ne fais pas — et ce que je fais à la place.
//
// Ce fichier est la traduction publique de la table des règles de véracité du
// `CLAUDE.md`. Chaque ligne y correspond à une formulation interdite : au lieu de
// simplement l'éviter, le site la retourne en argument de lucidité. Ne rien ajouter
// ici qui ne soit pas adossé à cette table ou aux CV de référence.

import type { IBoundary } from '@/interfaces/IBoundary'

export const LIMITES: IBoundary[] = [
  {
    hors: 'Aucune couche commerciale, aucun transfert de dossier',
    alaPlace:
      "Vous parlez à la personne qui écrit le code. C'est la même du cadrage au run, " +
      'sur les trois pôles. Si la taille du projet demande un renfort — c’est rare — je ' +
      'choisis le prestataire, je le cadre et j’en réponds : votre interlocuteur, lui, ' +
      'ne change pas.',
  },
  {
    hors: 'Pas de cluster Kubernetes administré en propre',
    alaPlace:
      'Cloud Run, VM Compute Engine auto-scalées, cloud functions et Pub/Sub. Le run ' +
      'tourne, il est mesuré, et il ne repose pas sur une compétence que je ne tiens pas.',
  },
  {
    hors: 'Pas de framework RAG tiers',
    alaPlace:
      'Le RAG est fait maison : recherche vectorielle PostgreSQL et API OpenAI, réponses ' +
      'ancrées sur votre documentation interne, pas sur la mémoire du modèle.',
  },
  {
    hors: 'Pas de création graphique ni de design d’interface',
    alaPlace:
      'Des arbitrages de parcours pris sur la donnée : quelle étape disparaît, quel ' +
      'formulaire raccourcit, quelle page se rend en SSR plutôt qu’en CSR.',
  },
  {
    hors: 'Deux régies publicitaires, pas douze',
    alaPlace:
      'Google Ads et Bing Ads, en SEO, SEA et SMA. Ce que je pilote, je l’ai déjà piloté — ' +
      'je ne me forme pas à un canal sur votre budget.',
  },
  {
    hors: 'Une équipe technique de trois, pas un service',
    alaPlace:
      'Ce que j’encadre : des équipes marketing et SEO/SEA de 5 à 10 personnes, des ' +
      'prestataires externes, des alternants et des stagiaires. Côté technique, mon titre ' +
      'est Lead Tech dans une équipe de deux développeurs et un product owner.',
  },
  {
    hors: 'Un seul outillage de mesure mobile',
    alaPlace:
      'Firebase Analytics et Crashlytics, et rien d’autre — je ne cite pas d’outil que je ' +
      'n’ai pas exploité. Côté web : Google Tag Manager en conteneur web et server-side, ' +
      'Measurement Protocol, Google Analytics, Matomo, gestion du consentement.',
  },
  {
    hors: 'ISTQB Foundation, et rien au-delà',
    alaPlace:
      'C’est le seul niveau que je détiens, c’est donc le seul qui est affiché. Ce qui est ' +
      'outillé l’est réellement : développement piloté par les tests, Jest, Cypress, ' +
      'Playwright, tests de mutation Stryker, Postman, Lighthouse.',
  },
]
