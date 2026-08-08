// structured-data-pages.ts — jeromemarichez2026
// Données structurées PROPRES À UNE PAGE, pour les pages qui décrivent une entité
// qu'elles sont seules à porter : le parcours et le contact.
//
// La règle du CLAUDE.md est tenue à la lettre : `Person` et `ProfessionalService`
// décrivent le site entier et restent injectés une seule fois par le layout racine. Les
// deux graphes ci-dessous n'ajoutent qu'un nœud de PAGE, rattaché à la personne par son
// `@id` — jamais une seconde description d'elle.
//
// Vit à côté de `structured-data.ts` plutôt que dedans : ce dernier porte le graphe du
// site et frôlerait la limite des 300 lignes du CLAUDE.md, alors que les graphes de page
// forment un sujet distinct qui grandira avec les pages.
//
// AUCUNE DONNÉE NOUVELLE N'EST INVENTÉE ICI. Ces nœuds ne font que qualifier des pages
// dont le contenu est déjà publié et déjà relu : ils n'avancent ni coordonnée, ni date,
// ni affirmation qui ne soit visible à l'écran.
import { contactPage, parcoursPage } from '@/content'
import type { JsonLdGraph } from '../interfaces/types'
import { absoluteUrl } from './site'
import { PERSON_ID } from './structured-data'

/**
 * Graphe de la page « /parcours ».
 *
 * `ProfilePage` est le type prévu par schema.org pour une page qui présente une personne,
 * et `mainEntity` désigne celle-ci PAR RÉFÉRENCE. Les diplômes et les certifications ne
 * sont pas réémis ici : ils sont déjà portés par `hasCredential` du nœud `Person`, et les
 * dupliquer sur la page en ferait deux jeux à maintenir — dont l'un finirait faux.
 */
export function buildParcoursStructuredData(): JsonLdGraph {
  const url = absoluteUrl('/parcours')
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#page`,
        url,
        name: parcoursPage.meta.titre,
        description: parcoursPage.meta.description,
        mainEntity: { '@id': PERSON_ID },
      },
    ],
  }
}

/**
 * Graphe de la page « /contact ».
 *
 * `ContactPage` qualifie la page, et rien d'autre. En particulier, AUCUN `ContactPoint`
 * n'est émis : schema.org attend d'un point de contact qu'il précise ce qu'il dessert et
 * quand — `contactType`, `availableLanguage`, `hoursAvailable` — dont rien n'est établi,
 * et l'adresse comme le téléphone sont déjà publiés sur le nœud `Person` du layout. Un
 * `ContactPoint` ici republierait les mêmes coordonnées entourées de champs inventés.
 */
export function buildContactStructuredData(): JsonLdGraph {
  const url = absoluteUrl('/contact')
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${url}#page`,
        url,
        name: contactPage.meta.titre,
        description: contactPage.meta.description,
        mainEntity: { '@id': PERSON_ID },
      },
    ],
  }
}
