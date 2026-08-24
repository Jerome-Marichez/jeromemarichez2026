// objections.ts (jeromemarichez-fr)
// Les deux objections que soulève la promesse du site, traitées ensemble.
//
// Ce fichier remplace `renforts.ts` et la section `un-seul-interlocuteur` de
// `accueil-sections.ts` (issue #103). Les deux disaient les deux faces d'un même risque :
// au-dessus, l'interlocuteur unique qui pourrait manquer ; en dessous, le projet qui
// devient trop gros pour lui. Sur un accueil devenu vitrine, deux sections de six blocs
// pour une seule question coûtaient plus de mille pixels ; le fond, lui, ne se
// négocie pas et il est intégralement conservé.
//
// **Règle de véracité, bloquante (CLAUDE.md, issue #40).** La promesse porte sur
// l'interlocuteur unique et sur la responsabilité, JAMAIS sur l'absence totale de tiers.
// Le second bloc doit donc rester lisible sur l'accueil : « c'est rare » se dit, le
// renfort se dit, et le fait que Jérôme le choisisse, le cadre et en réponde se dit. Le
// supprimer ou l'euphémiser ferait dire au site plus que ce qui est vrai.
//
// Les preuves qui ne tiennent pas dans deux blocs n'ont pas disparu de l'accueil pour
// disparaître du site : l'outillage de test est sur `/services/ingenierie-web/`
// (chapitre « qualité »), la coordination d'équipes et de prestataires sur le même
// chapitre « cadrage », les serveurs MCP documentés sur `/services/ia/`, et le BPMN 2.0
// d'Artedrone sur `/services/data/`.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

export const SECTION_OBJECTIONS: IEditorialSection = {
  id: 'objections',
  kind: 'preuves',
  kicker: 'Les deux objections',
  titre: 'Et si je disparais ? Et si le projet me dépasse ?',
  chapo:
    'Vendre un interlocuteur unique concentre un risque des deux côtés : celui de l’absence, ' +
    'et celui de la charge. Autant dire tout de suite comment chacun est traité.',
  blocs: [
    {
      titre: 'Si je disparais, le produit se reprend',
      texte:
        'Il n’est pas dans ma tête : tests écrits avant le code, non-régression, CI/CD et tests ' +
        'de mutation à chaque livraison, spécifications écrites pour quelqu’un d’autre que moi. ' +
        'Le relais, je l’ai déjà passé.',
      preuve:
        'Certification ISTQB Foundation. AMOA de la startup biotech Artedrone, exploitable par ' +
        'des prestataires non spécialistes du domaine.',
      decision:
        'Ce que vous exigez de moi contractuellement (documentation, accès, revue de ' +
        'reprise) et quand vous voulez pouvoir le vérifier.',
    },
    {
      titre: 'Si le projet me dépasse, je m’entoure, et j’en réponds',
      texte:
        'Cela arrive rarement : la très grande majorité des projets tient sur une personne, du ' +
        'cadrage au run. Quand la taille le demande, je m’entoure de prestataires que je ' +
        'choisis, que je cadre et dont je réponds : mes spécifications, mon dépôt, les mêmes ' +
        'tests. Vous ne gérez personne d’autre que moi.',
      preuve:
        'Environ 25 000 € d’encadrement de prestataires SEA, SEO et SMA chez Verhoeven ' +
        'Joaillier : périmètre, budget et qualité sont restés de mon côté.',
      decision:
        'À quel moment vous préférez un renfort plutôt qu’un délai, et qui intervient alors : ' +
        'périmètre et coût écrits, avant.',
    },
  ],
}
