// poles-nav.ts — jeromemarichez-fr
// Les quatre pôles vus depuis la navigation : le strict nécessaire pour se repérer.
//
// Le contenu long de chaque pôle vit dans son propre fichier (`ingenierie-web.ts`,
// `data.ts`, `ia.ts`, `sea-ux.ts`). Cette liste-ci ne porte que l'identité et la place —
// elle est chargée par l'en-tête et le pied de page, donc sur toutes les pages du site.
//
// L'ordre du tableau est celui de la lecture, pas celui d'un achat. `ia` et `sea-ux` s'y
// suivent parce qu'il faut bien écrire un tableau dans un sens : elles partagent le même
// `temps`, et rien dans le rendu ne doit les présenter l'une après l'autre. Ce que la
// donnée remet à chacune est décrit par les arêtes, dans `jointures.ts`.

import type { IPole } from '@/interfaces/IPole'
import { ROUTES } from '@/routes'

export const POLES_NAV: IPole[] = [
  {
    id: 'ingenierie-web',
    place: 'socle',
    temps: 1,
    nom: 'Ingénierie web',
    route: ROUTES['ingenierie-web'],
    promesse: 'Je construis le produit, et je le fais tourner.',
    accroche:
      'Site, produit SaaS, application mobile : de la conception au run, avec une qualité ' +
      'outillée et certifiée plutôt que promise.',
  },
  {
    id: 'data',
    place: 'passage',
    temps: 2,
    nom: 'Data',
    route: ROUTES.data,
    promesse: 'Je pars de votre métier ; la technique vient en dernier.',
    accroche:
      'Faire émerger ce que votre activité sait déjà sans l’avoir formalisé, puis la ' +
      'gouvernance et le droit. Elle se livre seule : vous pouvez vous arrêter là.',
  },
  {
    id: 'ia',
    place: 'suite',
    temps: 3,
    nom: 'IA',
    route: ROUTES.ia,
    promesse: 'La réponse n’est pas toujours un modèle, et je le dis avant d’en construire un.',
    accroche:
      'Je teste si votre problème a une réponse déterministe : si oui, une règle suffit ; ' +
      'sinon un modèle, ou un LLM arbitré sur le coût et la confidentialité.',
  },
  {
    id: 'sea-ux',
    place: 'suite',
    temps: 3,
    nom: 'SEA & UX',
    route: ROUTES['sea-ux'],
    promesse: 'Je ne dessine pas vos maquettes, je tranche vos parcours.',
    accroche:
      'Mesure construite dans le code, consentement conforme, rentabilité à long terme plutôt ' +
      'que coût par clic — puis les arbitrages implémentés.',
  },
]
