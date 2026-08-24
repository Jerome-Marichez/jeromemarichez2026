// espaces.ts (jeromemarichez-fr)
// Les deux espaces éditoriaux, vus depuis l'accueil.
//
// L'accueil vendait ses quatre pôles et taisait ses deux espaces : on n'y arrivait que
// par le menu ou par un renvoi de tuile de preuve. C'est le point 3 de l'issue #84 :
// l'accueil doit pointer vers ses catégories par des entrées franches.
//
// **Les volumes sont DÉRIVÉS des listes sources**, jamais recopiés. C'est la même règle
// que pour les chiffres de `preuves.ts` : un nombre écrit deux fois dans un dépôt finit
// par valoir deux valeurs différentes, et une page d'accueil qui annonce quatorze fiches
// devant treize est un défaut de véracité, pas une coquille.
//
// Ce que ces accroches n'ont PAS le droit de faire : élargir. Elles reprennent ce que
// chaque espace dit déjà de lui-même dans son propre chapô : les réalisations portent
// chacune leur cadre, deux postes salariés et une mission en indépendant, et trois fiches
// seulement portent un chiffre. Une accroche d'accueil qui laisserait croire à treize
// références chiffrées vendrait ce qui n'existe pas.

import type { IEspaceEditorial } from '@/interfaces/IEspaceEditorial'
import { ROUTES } from '@/routes'
import { ARTICLES } from './blog/articles'
import { REALISATIONS } from './realisations/realisations'

const CHIFFREES = REALISATIONS.filter((realisation) => realisation.chiffre !== undefined).length

export const ESPACES_EDITORIAUX: IEspaceEditorial[] = [
  {
    id: 'realisations',
    titre: 'Réalisations',
    route: ROUTES.realisations,
    accroche:
      'Ce que j’ai construit, et dans quel cadre : statut, intitulé de poste exact, ' +
      'période, équipe.',
    volume: `${REALISATIONS.length} fiches, dont ${CHIFFREES} portent un chiffre`,
  },
  {
    id: 'blog',
    titre: 'Blog',
    route: ROUTES.blog,
    accroche:
      'Les arbitrages de ce site, écrits pendant qu’ils étaient pris : mesure, tests, rendu.',
    volume: `${ARTICLES.length} notes`,
  },
]
