// renforts.ts — jeromemarichez-fr
// La suite immédiate de l'objection « et si je disparais ? » : et si, à l'inverse, le
// projet devient trop gros pour une personne ?
//
// Les deux sections se répondent sans se recouvrir. Celle qui précède traite la
// reprise — pouvoir travailler *sans* moi. Celle-ci traite la charge — faire travailler
// quelqu'un *avec* moi, sans que le client ait un interlocuteur de plus. La promesse du
// site porte sur l'interlocuteur unique et la responsabilité unique, jamais sur
// l'absence totale de tiers : la nuance se dit ici, elle ne se cache pas.
//
// Extraite dans son propre fichier pour ne pas pousser `accueil-sections.ts` contre la
// limite de 300 lignes (docs/tooling.md).

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

export const SECTION_RENFORTS: IEditorialSection = {
  id: 'renforts',
  kind: 'preuves',
  kicker: 'L’objection inverse',
  titre: 'Et si le projet dépasse une personne ?',
  chapo:
    'Cela arrive rarement, et je préfère le dire. Sur un projet dont la taille le demande, je ' +
    'm’entoure de prestataires que je choisis, que je cadre et dont je réponds — vous ne gérez ' +
    'personne d’autre que moi.',
  blocs: [
    {
      titre: 'C’est rare, et la rareté se dit',
      texte:
        'La très grande majorité des projets tient sur une personne du cadrage au run. Le ' +
        'renfort se déclenche quand le volume dépasse ce que je peux tenir.',
      decision:
        'À quel moment vous préférez un renfort plutôt qu’un délai — l’arbitrage est le vôtre.',
    },
    {
      titre: 'Choisis, cadrés, et sous ma responsabilité',
      texte:
        'Un renfort travaille sur mes spécifications, dans mon dépôt, avec les mêmes tests. Je ' +
        'réponds de ce qui est livré, y compris de ce que je n’ai pas tapé.',
      preuve:
        'AMOA de la startup biotech Artedrone : spécifications écrites pour des tiers ' +
        'extérieurs au domaine, BPMN 2.0 et cartographie du système d’information.',
    },
    {
      titre: 'Vous ne gérez personne d’autre que moi',
      texte: 'Je porte le planning, le budget et la qualité du renfort.',
      preuve:
        'Environ 25 000 € d’encadrement de prestataires SEA, SEO et SMA chez Verhoeven ' +
        'Joaillier : périmètre, budget et qualité sont restés de mon côté.',
      decision:
        'Qui intervient sur votre produit, sur quel périmètre et à quel coût — écrit, avant.',
    },
  ],
}
