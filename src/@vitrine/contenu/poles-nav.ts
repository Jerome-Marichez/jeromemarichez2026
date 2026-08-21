// poles-nav.ts — jeromemarichez-fr
// Les trois pôles vus depuis la navigation : le strict nécessaire pour se repérer.
//
// Le contenu long de chaque pôle vit dans son propre fichier (`ingenierie-web.ts`,
// `data-ia.ts`, `sea-ux.ts`). Cette liste-ci ne porte que l'identité et l'ordre — elle
// est chargée par l'en-tête et le pied de page, donc sur toutes les pages du site.

import { ROUTES } from '@/@shared/routes'
import type { IPole } from '@/interfaces/IPole'

export const POLES_NAV: IPole[] = [
  {
    id: 'ingenierie-web',
    rang: 1,
    nom: 'Ingénierie web',
    route: ROUTES['ingenierie-web'],
    promesse: 'Je construis le produit, et je le fais tourner.',
    accroche:
      'Site, produit SaaS, application mobile : conception, développement, mise en production ' +
      'et exploitation. Une seule personne du cadrage au run, avec une qualité outillée et ' +
      'certifiée plutôt que promise.',
    remise:
      "Un produit en production ne se fige pas : il tourne, il est mesuré, et c'est de là que " +
      'vient la donnée.',
  },
  {
    id: 'data-ia',
    rang: 2,
    nom: 'Data & IA',
    route: ROUTES['data-ia'],
    promesse: "Je rends votre donnée exploitable, puis j'y branche l'IA.",
    accroche:
      'Qualité de la donnée traitée comme un prérequis, pipelines et réconciliation ' +
      'multi-sources, apprentissage supervisé, LLM et agents en production — avec le coût ' +
      "d'inférence, la latence et le RGPD tenus.",
    remise:
      'Une donnée clarifiée cesse d’être un tableau de bord de plus : elle devient la matière ' +
      'des arbitrages.',
  },
  {
    id: 'sea-ux',
    rang: 3,
    nom: 'SEA & UX',
    route: ROUTES['sea-ux'],
    promesse: 'Je ne dessine pas vos maquettes, je tranche vos parcours.',
    accroche:
      'Mesure construite dans le code, conformité du consentement, rentabilité à long terme ' +
      'plutôt que coût par clic, et des arbitrages de parcours décidés sur la donnée — puis ' +
      'implémentés par la même personne.',
  },
]
