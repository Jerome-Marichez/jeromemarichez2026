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
    'Cela arrive rarement, et quand cela arrive je préfère le dire plutôt que de tenir ' +
    'une promesse contre les faits. Sur un projet dont la taille le demande, je ' +
    'm’entoure de prestataires que je choisis, que je cadre et dont je réponds. Ce qui ' +
    'ne change pas : vous ne gérez personne d’autre que moi.',
  blocs: [
    {
      titre: 'C’est rare, et la rareté se dit',
      texte:
        'La très grande majorité des projets que je prends tient sur une personne du ' +
        'cadrage au run — c’est même toute la raison d’être de la chaîne décrite plus ' +
        'haut. Le renfort n’est pas le mode normal : il se déclenche quand le volume de ' +
        'travail dépasserait ce que je peux tenir sans faire attendre le projet. Le ' +
        'reconnaître coûte moins cher que de le découvrir en cours de route.',
      decision:
        'À quel moment vous préférez un renfort plutôt qu’un délai — l’arbitrage est le vôtre.',
    },
    {
      titre: 'Choisis, cadrés, et sous ma responsabilité',
      texte:
        'Un renfort travaille sur des spécifications que j’ai écrites, dans le dépôt que ' +
        'je tiens, avec les mêmes tests et la même chaîne d’intégration continue. C’est ' +
        'l’exercice de la section précédente pris dans l’autre sens : donner à quelqu’un ' +
        'de quoi travailler sans avoir à connaître le domaine. Je ne transmets pas votre ' +
        'dossier — je reste la personne qui répond de ce qui est livré, y compris de ce ' +
        'que je n’ai pas tapé moi-même.',
      preuve:
        'AMOA de la startup biotech Artedrone : spécifications écrites pour des tiers ' +
        'extérieurs au domaine, BPMN 2.0 et cartographie du système d’information.',
    },
    {
      titre: 'Vous ne gérez personne d’autre que moi',
      texte:
        'Pas de chef de projet intermédiaire, pas de comptes rendus à recouper, pas de ' +
        'second contrat à négocier. Vous parlez à la même personne qu’au premier jour, ' +
        'elle connaît le produit parce qu’elle l’a construit, et c’est elle qui porte le ' +
        'planning, le budget et la qualité du renfort. Encadrer des prestataires, c’est ' +
        'le travail que je faisais déjà avant de vendre ce site.',
      preuve:
        'Environ 25 000 € d’encadrement de prestataires SEA, SEO et SMA chez Verhoeven ' +
        'Joaillier : périmètre, budget et qualité sont restés de mon côté.',
      decision:
        'Qui intervient sur votre produit, sur quel périmètre et à quel coût — écrit, avant.',
    },
  ],
}
