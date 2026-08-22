// structured-data.ts — jeromemarichez-fr
// Données structurées schema.org.
//
// Même règle de véracité que le contenu visible : le JSON-LD n'affirme rien que le
// site n'affirme pas déjà. Il est lu par des moteurs, pas par des prospects, ce qui
// le rend d'autant plus tentant à gonfler — et d'autant plus grave à gonfler.

import type { IBreadcrumbItem } from '@/interfaces/IBreadcrumbItem'
import { SITE_IDENTITY, SITE_URL, SITE_ZONE } from './site'
import { toAbsoluteUrl } from './urls'

/** Le professionnel indépendant derrière le site. */
export function buildPersonSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#personne`,
    name: SITE_IDENTITY.nom,
    jobTitle: SITE_IDENTITY.titre,
    url: toAbsoluteUrl('/'),
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
    url: toAbsoluteUrl('/'),
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
    '@id': `${toAbsoluteUrl(params.route)}#service`,
    name: params.nom,
    description: params.description,
    url: toAbsoluteUrl(params.route),
    serviceType: params.nom,
    provider: { '@id': `${SITE_URL}/#activite` },
    areaServed: SITE_ZONE.map((nom) => ({ '@type': 'Place', name: nom })),
  }
}

/**
 * Fil d'Ariane d'une page, de deux niveaux ou plus.
 *
 * `fil` ne porte que les niveaux **qui suivent** l'accueil : celui-ci n'est pas un choix
 * éditorial mais un invariant du site, et le rendre facultatif ouvrirait la porte à un
 * fil amputé de sa racine — que Google refuse d'afficher. Le premier niveau est donc
 * posé ici, et il ne peut pas être oublié par un appelant.
 *
 * La même liste alimente le fil visible (`@shared/components/Breadcrumb`), pour que
 * l'affiché et le déclaré ne puissent pas diverger.
 */
export function buildBreadcrumbSchema(fil: IBreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: toAbsoluteUrl('/') },
      ...fil.map((niveau, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: niveau.nom,
        item: toAbsoluteUrl(niveau.route),
      })),
    ],
  }
}

/**
 * Un article du blog.
 *
 * `BlogPosting` plutôt qu'`Article` : c'est le sous-type exact, et l'annoncer permet à
 * un moteur de rattacher l'article au blog qui le contient. Pas de champ `image` — le
 * site ne sert aucune illustration d'article, et déclarer une image absente serait
 * précisément le genre de JSON-LD gonflé que ce fichier s'interdit.
 *
 * `author` et `publisher` pointent les nœuds déjà publiés par le layout : la personne et
 * l'activité sont décrites une fois pour tout le site, jamais redéclarées par page.
 */
export function buildArticleSchema(params: {
  titre: string
  chapo: string
  route: string
  datePublished: string
  dateModified: string
}): Record<string, unknown> {
  const url = toAbsoluteUrl(params.route)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: params.titre,
    description: params.chapo,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'fr-FR',
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    author: { '@id': `${SITE_URL}/#personne` },
    publisher: { '@id': `${SITE_URL}/#activite` },
  }
}

/**
 * La liste des réalisations, avec l'inventaire de ses fiches.
 *
 * `CollectionPage` et non `Blog` : ces pages ne sont pas datées et ne forment pas une
 * publication périodique. Surtout, **ni `Service` ni `CreativeWork`** — le premier
 * affirmerait une prestation vendue, le second une œuvre dont on détiendrait les droits.
 * Ce sont des travaux menés sous contrat de travail : la seule chose que le JSON-LD a le
 * droit de dire, c'est qu'il existe une page qui en fait la liste.
 *
 * L'`ItemList` est en `mainEntity` : elle est le sujet de la page, pas un à-côté. Chaque
 * élément n'y porte que son nom et son URL, le détail étant déclaré par la fiche
 * elle-même — recopier ici le contenu des fiches donnerait deux descriptions du même
 * objet, qui divergeraient à la première correction.
 */
export function buildCollectionPageSchema(params: {
  nom: string
  description: string
  route: string
  elements: readonly { titre: string; route: string }[]
}): Record<string, unknown> {
  const url = toAbsoluteUrl(params.route)

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    name: params.nom,
    description: params.description,
    url,
    inLanguage: 'fr-FR',
    author: { '@id': `${SITE_URL}/#personne` },
    publisher: { '@id': `${SITE_URL}/#activite` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: params.elements.length,
      itemListElement: params.elements.map((element, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: element.titre,
        url: toAbsoluteUrl(element.route),
      })),
    },
  }
}

/**
 * Une fiche de réalisation, rattachée à la collection qui la contient.
 *
 * `WebPage`, le type le plus pauvre qui soit — et c'est exactement ce qu'on veut. Toute
 * montée en spécificité affirmerait quelque chose de plus : `Service` une prestation
 * vendue, `CreativeWork` une œuvre, `Project` une entreprise autonome. Aucune de ces trois
 * affirmations n'est vraie d'un travail mené sous contrat de travail.
 *
 * `isPartOf` pointe la collection par son `@id`, ce qui suffit à un moteur pour rattacher
 * la fiche à la liste sans que celle-ci ait à redéclarer quoi que ce soit.
 */
export function buildRealisationSchema(params: {
  titre: string
  chapo: string
  route: string
  collectionRoute: string
}): Record<string, unknown> {
  const url = toAbsoluteUrl(params.route)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#realisation`,
    name: params.titre,
    description: params.chapo,
    url,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': `${toAbsoluteUrl(params.collectionRoute)}#collection` },
    author: { '@id': `${SITE_URL}/#personne` },
  }
}

/**
 * Le blog lui-même, avec la liste de ses articles.
 *
 * Les articles n'y sont référencés que par leur `@id` et leur titre : le détail est
 * déclaré par chaque page d'article. Recopier ici tout le contenu du billet donnerait
 * deux descriptions du même objet, qui divergeraient à la première correction.
 */
export function buildBlogSchema(params: {
  nom: string
  description: string
  route: string
  articles: readonly { titre: string; route: string }[]
}): Record<string, unknown> {
  const url = toAbsoluteUrl(params.route)

  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${url}#blog`,
    name: params.nom,
    description: params.description,
    url,
    inLanguage: 'fr-FR',
    author: { '@id': `${SITE_URL}/#personne` },
    publisher: { '@id': `${SITE_URL}/#activite` },
    blogPost: params.articles.map((article) => ({
      '@type': 'BlogPosting',
      '@id': `${toAbsoluteUrl(article.route)}#article`,
      headline: article.titre,
      url: toAbsoluteUrl(article.route),
    })),
  }
}
