// structured-data.ts — jeromemarichez2026
// Données structurées schema.org du site : `Person` (Jérôme Marichez) et
// `ProfessionalService` (l'activité), reliés dans un seul graphe.
//
// RÈGLE TENUE ICI : chaque valeur provient du contenu typé et validé de `src/content/`.
// Aucun texte en dur, et surtout aucune donnée que le site ne peut pas prouver — les
// règles de véracité du CLAUDE.md s'appliquent au JSON-LD exactement comme au texte
// visible, alors même qu'il n'est lu que par des machines. Ne sont donc PAS émis :
// note ou avis (`aggregateRating`, `review`), fourchette de prix (`priceRange`), rue
// (`streetAddress`), zone desservie (`areaServed`), horaires (`openingHours`) — rien de
// tout cela n'est établi.
//
// `email` et `telephone` SONT émis depuis le 2026-08-08 : ce sont les coordonnées de
// Jérôme MARICHEZ, déjà publiques sur ses CV, dont il a explicitement demandé la
// publication. Elles proviennent du contenu typé, jamais d'une chaîne écrite ici.
import { certifications, formations, identite, offres } from '@/content'
import type { IOffre } from '@/interfaces/offre'
import { telephoneVersE164 } from '@/utils/telephone'
import { cheminOffre } from '../config/routes'
import type { JsonLdGraph, JsonLdNode } from '../interfaces/types'
import { absoluteUrl, siteUrl } from './site'

/**
 * Identifiants stables du graphe : ils relient les nœuds au lieu de les dupliquer.
 *
 * Exportés parce que les graphes DE PAGE (`structured-data-pages.ts`) s'y rattachent :
 * une page qui redécrirait la personne ou l'activité publierait une seconde version de
 * la même entité, que les moteurs auraient à réconcilier — ou ne réconcilieraient pas.
 */
export const PERSON_ID = `${siteUrl}/#person`
export const SERVICE_ID = `${siteUrl}/#service`

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

/**
 * Langues pratiquées.
 *
 * `knowsLanguage` est la propriété prévue par schema.org — et la bonne place pour EF SET,
 * qui évalue un niveau d'anglais et n'est pas un titre professionnel : le mettre dans
 * `hasCredential` reviendrait à annoncer une certification de plus.
 *
 * Le niveau CECRL (« B2 ») n'est pas émis : schema.org ne définit aucune propriété pour
 * l'exprimer sur un nœud `Language`, et l'inventer produirait une clé qu'aucun
 * consommateur ne lit. Il reste porté par le contenu typé, pour le texte visible.
 */
function languesPratiquees(): readonly JsonLdNode[] {
  return identite.langues.map((langue) => ({
    '@type': 'Language',
    name: langue.nom,
    alternateName: langue.code,
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
    email: identite.contact.email,
    // schema.org attend un numéro composable tel quel, donc en E.164 : la forme lisible
    // « 07 71 65 15 88 » n'est pas interprétable hors de France. La conversion est
    // dérivée du contenu typé, aucun numéro n'est réécrit ici.
    telephone: telephoneVersE164(identite.contact.telephone),
    knowsAbout: domainesCouverts(),
    knowsLanguage: languesPratiquees(),
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

/**
 * Les axes de l'offre, décrits un à un.
 *
 * Chaque axe est bien un service rendu dans le cadre de l'offre : le catalogue reprend
 * son titre et sa description tels qu'écrits dans `content/offres/`, sans les reformuler.
 * Aucun prix n'y figure — voir `serviceDeLOffre` ci-dessous.
 */
function catalogueAxes(offre: IOffre): JsonLdNode {
  return {
    '@type': 'OfferCatalog',
    name: offre.titre,
    itemListElement: offre.axes.map((axe) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: axe.titre,
        description: axe.description,
      },
    })),
  }
}

/**
 * Le `Service` décrivant UNE offre — l'entité propre à sa page.
 *
 * `provider` pointe l'`@id` du `ProfessionalService` du layout racine au lieu de le
 * redécrire : les moteurs recomposent un seul graphe pour le document, et l'activité
 * n'y est déclarée qu'une fois (règle du CLAUDE.md — `Person` et `ProfessionalService`
 * décrivent le site entier, une page ne décrit que ce qui lui est propre).
 *
 * Ce qui n'est PAS émis, et pourquoi :
 *
 * - aucun prix, aucune `offers`, aucun `priceSpecification` — y compris pour SEA, seule
 *   offre à publier une grille. Un prix en JSON-LD engage une devise, une validité et
 *   des conditions de livraison qu'aucun arbitrage n'a fixées ; la grille dit « incluse
 *   si j'ai conçu le site » et « sur devis », qui ne se traduisent pas en `price`. Le
 *   texte visible reste la seule publication des montants, et `utils/tarif.ts` la seule
 *   façon de les mettre en forme ;
 * - ni `areaServed`, ni `aggregateRating`, ni `review` : rien de tout cela n'est établi,
 *   et une donnée structurée fausse est une affirmation fausse (docs/seo.md).
 */
function serviceDeLOffre(offre: IOffre): JsonLdNode {
  const url = absoluteUrl(cheminOffre(offre.cle))
  return {
    '@type': 'Service',
    '@id': `${url}#offre`,
    name: offre.titre,
    description: offre.accroche,
    serviceType: offre.titre,
    url,
    provider: { '@id': SERVICE_ID },
    hasOfferCatalog: catalogueAxes(offre),
  }
}

/**
 * Graphe d'une page d'offre. Injecté par la vue, en plus de celui du layout.
 *
 * Construit intégralement à partir de l'offre typée reçue en argument : ajouter une
 * quatrième offre au contenu lui donne son `Service` sans qu'une ligne d'ici change.
 */
export function buildOffreStructuredData(offre: IOffre): JsonLdGraph {
  return {
    '@context': 'https://schema.org',
    '@graph': [serviceDeLOffre(offre)],
  }
}
