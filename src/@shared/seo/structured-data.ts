// structured-data.ts — jeromemarichez-fr
// Données structurées schema.org.
//
// Même règle de véracité que le contenu visible : le JSON-LD n'affirme rien que le
// site n'affirme pas déjà. Il est lu par des moteurs, pas par des prospects, ce qui
// le rend d'autant plus tentant à gonfler — et d'autant plus grave à gonfler.

import { SITE_IDENTITY, SITE_URL, SITE_ZONE } from './site'

/** Le professionnel indépendant derrière le site. */
export function buildPersonSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#personne`,
    name: SITE_IDENTITY.nom,
    jobTitle: SITE_IDENTITY.titre,
    url: SITE_URL,
    email: `mailto:${SITE_IDENTITY.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_IDENTITY.ville,
      addressRegion: SITE_IDENTITY.region,
      addressCountry: SITE_IDENTITY.pays,
    },
    sameAs: [SITE_IDENTITY.github, SITE_IDENTITY.linkedin],
  }
}

/** L'activité de conseil, rattachée à la même personne. */
export function buildProfessionalServiceSchema(description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#activite`,
    name: SITE_IDENTITY.nom,
    description,
    url: SITE_URL,
    founder: { '@id': `${SITE_URL}/#personne` },
    areaServed: SITE_ZONE.map((nom) => ({ '@type': 'Place', name: nom })),
  }
}

/** Un pôle, décrit comme un service rendu par cette activité. */
export function buildServiceSchema(params: {
  nom: string
  description: string
  route: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${params.route}#service`,
    name: params.nom,
    description: params.description,
    url: `${SITE_URL}${params.route}`,
    serviceType: params.nom,
    provider: { '@id': `${SITE_URL}/#activite` },
    areaServed: SITE_ZONE.map((nom) => ({ '@type': 'Place', name: nom })),
  }
}

/** Fil d'Ariane d'une page de pôle. */
export function buildBreadcrumbSchema(params: {
  nom: string
  route: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: params.nom, item: `${SITE_URL}${params.route}` },
    ],
  }
}
