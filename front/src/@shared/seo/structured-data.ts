// structured-data.ts — jeromemarichez2026
// Données structurées schema.org du site : `Person` (Jérôme Marichez) et
// `ProfessionalService` (l'activité), reliés dans un seul graphe.
//
// RÈGLE TENUE ICI : chaque valeur provient du contenu typé et validé de `src/content/`.
// Aucun texte en dur, et surtout aucune donnée que le site ne peut pas prouver — les
// règles de véracité du CLAUDE.md s'appliquent au JSON-LD exactement comme au texte
// visible, alors même qu'il n'est lu que par des machines. Ne sont donc PAS émis :
// note ou avis (`aggregateRating`, `review`), fourchette de prix (`priceRange`),
// coordonnées (`telephone`, `email`), rue (`streetAddress`), zone desservie
// (`areaServed`) — rien de tout cela n'est établi.
import { certifications, formations, identite, offres } from '@/content'
import type { JsonLdGraph, JsonLdNode } from '../interfaces/types'
import { absoluteUrl, siteUrl } from './site'

/** Identifiants stables du graphe : ils relient les nœuds au lieu de les dupliquer. */
const PERSON_ID = `${siteUrl}/#person`
const SERVICE_ID = `${siteUrl}/#service`

/**
 * Localisation publique : la ville et le pays, rien de plus.
 * Une `streetAddress` inventée serait une donnée fausse dans une donnée structurée,
 * c'est-à-dire la pire des deux.
 */
const adressePublique: JsonLdNode = {
  '@type': 'PostalAddress',
  addressLocality: identite.ville,
  addressCountry: identite.codePays,
}

/** Les domaines réellement couverts, tirés des trois offres du site. */
function domainesCouverts(): readonly string[] {
  return offres.map((offre) => offre.titre)
}

/** Diplômes : intitulé et niveau, tels qu'inscrits dans le contenu. */
function diplomes(): readonly JsonLdNode[] {
  return formations.map((formation) => ({
    '@type': 'EducationalOccupationalCredential',
    name: formation.intitule,
    credentialCategory: formation.niveau,
  }))
}

/**
 * Certifications : l'organisme émetteur est connu, l'URL du justificatif ne l'est pas
 * toujours. L'union discriminée `Justificatif` rend l'oubli impossible — lire `url`
 * sans avoir narrowé sur `disponible` ne compile pas. Tant qu'aucune URL n'a été fournie
 * par Jérôme MARICHEZ, le nœud est émis SANS lien plutôt qu'avec un lien mort.
 */
function certificationsObtenues(): readonly JsonLdNode[] {
  return certifications.map((certification) => ({
    '@type': 'EducationalOccupationalCredential',
    name: certification.intitule,
    credentialCategory: 'Certification professionnelle',
    recognizedBy: { '@type': 'Organization', name: certification.organisme },
    ...(certification.justificatif.statut === 'disponible'
      ? { url: certification.justificatif.url }
      : {}),
  }))
}

/** Le catalogue des trois offres, décrites par leur accroche éditoriale. */
function catalogueOffres(): JsonLdNode {
  return {
    '@type': 'OfferCatalog',
    name: 'Offres de service',
    itemListElement: offres.map((offre) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: offre.titre,
        description: offre.accroche,
        serviceType: offre.titre,
        provider: { '@id': SERVICE_ID },
        // Pas d'`url` : les pages `/services/<cle>` n'existent pas encore. Déclarer
        // l'URL d'une page absente enverrait les moteurs sur une 404. À ajouter le jour
        // où ces routes sont livrées — voir docs/seo.md.
      },
    })),
  }
}

/** Jérôme Marichez : la personne derrière l'activité. */
function personne(): JsonLdNode {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: identite.nom,
    jobTitle: identite.titreProfessionnel,
    description: identite.promesse,
    url: absoluteUrl('/'),
    address: adressePublique,
    knowsAbout: domainesCouverts(),
    hasCredential: [...diplomes(), ...certificationsObtenues()],
    // `sameAs` n'est émis que si au moins un profil public a été vérifié.
    ...(identite.profilsPublics.length > 0 ? { sameAs: identite.profilsPublics } : {}),
    worksFor: { '@id': SERVICE_ID },
  }
}

/** L'activité de prestation, exercée en nom propre. */
function activite(): JsonLdNode {
  return {
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: identite.nom,
    description: identite.promesse,
    url: absoluteUrl('/'),
    address: adressePublique,
    // Activité exercée seule et en nom propre : la promesse du site est précisément
    // qu'il n'y a personne d'autre derrière.
    founder: { '@id': PERSON_ID },
    knowsAbout: domainesCouverts(),
    hasOfferCatalog: catalogueOffres(),
  }
}

/**
 * Le graphe complet, injecté une seule fois par le layout racine : ces deux entités
 * décrivent le site entier, pas une page en particulier.
 */
export function buildSiteStructuredData(): JsonLdGraph {
  return {
    '@context': 'https://schema.org',
    '@graph': [personne(), activite()],
  }
}
