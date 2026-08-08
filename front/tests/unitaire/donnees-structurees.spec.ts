/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * `buildSiteStructuredData` produit un graphe SÉRIALISABLE dont les deux nœuds — la
 * personne et l'activité — sont RELIÉS par leurs `@id` au lieu d'être dupliqués, et qui
 * n'émet AUCUNE propriété non établie. Les règles de véracité du CLAUDE.md valent pour
 * le JSON-LD exactement comme pour le texte visible, alors même qu'il n'est lu que par
 * des machines : c'est justement là qu'une donnée inventée passerait inaperçue.
 *
 * Cas limites couverts : EF SET est une compétence linguistique et doit se trouver dans
 * `knowsLanguage`, JAMAIS dans `hasCredential` ; une certification sans justificatif est
 * émise SANS `url` plutôt qu'avec un lien mort ; aucune note, avis, fourchette de prix,
 * rue, zone desservie ni horaire n'apparaît nulle part dans le graphe, à quelque
 * profondeur que ce soit ; le niveau CECRL « B2 » n'est pas émis, faute de propriété
 * schema.org pour l'exprimer ; « Microsoft Ads » et l'ISTQB « Avancé » sont absents.
 *
 * Niveau : unitaire (fonction pure construite sur le contenu réel).
 * Jeu de données : le contenu typé du dépôt (`identite`, `offres`, `certifications`,
 * `formations`) — les valeurs attendues sont DÉRIVÉES de lui, jamais recopiées.
 */
import type { JsonLdNode } from '@/@shared/interfaces/types'
import { buildSiteStructuredData, siteUrl } from '@/@shared/seo'
import { certifications, formations, identite, offres } from '@/content'
import { telephoneVersE164 } from '@/utils/telephone'

const graphe = buildSiteStructuredData()

/** Propriétés qu'aucun nœud ne doit porter : rien de tout cela n'est établi. */
const PROPRIETES_INTERDITES = [
  'aggregateRating',
  'review',
  'ratingValue',
  'priceRange',
  'streetAddress',
  'postalCode',
  'areaServed',
  'openingHours',
  'openingHoursSpecification',
  'numberOfEmployees',
] as const

function noeudDeType(type: string): JsonLdNode {
  const trouve = graphe['@graph'].find((noeud) => noeud['@type'] === type)
  if (trouve === undefined) throw new Error(`Nœud « ${type} » absent du graphe.`)
  return trouve
}

function chaine(noeud: JsonLdNode, cle: string): string {
  const valeur = noeud[cle]
  if (typeof valeur !== 'string') throw new Error(`« ${cle} » n’est pas une chaîne.`)
  return valeur
}

function objet(noeud: JsonLdNode, cle: string): JsonLdNode {
  const valeur = noeud[cle]
  if (typeof valeur !== 'object' || valeur === null) {
    throw new Error(`« ${cle} » n’est pas un objet.`)
  }
  return valeur as JsonLdNode
}

function liste(noeud: JsonLdNode, cle: string): readonly unknown[] {
  const valeur = noeud[cle]
  if (!Array.isArray(valeur)) throw new Error(`« ${cle} » n’est pas un tableau.`)
  return valeur
}

/** Toutes les clés du graphe, à toute profondeur — pour vérifier une ABSENCE. */
function toutesLesCles(valeur: unknown, accumulateur: Set<string> = new Set()): Set<string> {
  if (Array.isArray(valeur)) {
    for (const element of valeur) toutesLesCles(element, accumulateur)
    return accumulateur
  }
  if (typeof valeur === 'object' && valeur !== null) {
    for (const [cle, sousValeur] of Object.entries(valeur)) {
      accumulateur.add(cle)
      toutesLesCles(sousValeur, accumulateur)
    }
  }
  return accumulateur
}

const personne = noeudDeType('Person')
const activite = noeudDeType('ProfessionalService')
const serialisation = JSON.stringify(graphe)

describe('graphe de données structurées', () => {
  it('est sérialisable et relisible à l’identique', () => {
    expect(JSON.parse(serialisation)).toEqual(graphe)
  })

  it('déclare le contexte schema.org', () => {
    expect(graphe['@context']).toBe('https://schema.org')
  })

  it('porte exactement deux nœuds : la personne et l’activité', () => {
    expect(graphe['@graph']).toHaveLength(2)
    expect(graphe['@graph'].map((noeud) => noeud['@type'])).toEqual([
      'Person',
      'ProfessionalService',
    ])
  })

  it('relie les deux nœuds par leurs identifiants au lieu de les dupliquer', () => {
    const identifiantPersonne = chaine(personne, '@id')
    const identifiantActivite = chaine(activite, '@id')

    expect(identifiantPersonne).toBe(`${siteUrl}/#person`)
    expect(identifiantActivite).toBe(`${siteUrl}/#service`)
    expect(objet(personne, 'worksFor')['@id']).toBe(identifiantActivite)
    expect(objet(activite, 'founder')['@id']).toBe(identifiantPersonne)
  })

  it('n’émet aucune propriété non établie, à aucune profondeur', () => {
    const cles = toutesLesCles(graphe)

    for (const interdite of PROPRIETES_INTERDITES) {
      expect(cles.has(interdite)).toBe(false)
    }
  })
})

describe('nœud Person', () => {
  it('reprend l’identité du contenu typé', () => {
    expect(chaine(personne, 'name')).toBe(identite.nom)
    expect(chaine(personne, 'jobTitle')).toBe(identite.titreProfessionnel)
    expect(chaine(personne, 'description')).toBe(identite.promesse)
    expect(chaine(personne, 'url')).toBe(siteUrl)
  })

  it('publie les coordonnées du contenu, le téléphone converti en E.164', () => {
    expect(chaine(personne, 'email')).toBe(identite.contact.email)
    expect(chaine(personne, 'telephone')).toBe(telephoneVersE164(identite.contact.telephone))
    expect(chaine(personne, 'telephone')).toMatch(/^\+33\d{9}$/)
  })

  it('ne localise que la ville et le pays, jamais une rue', () => {
    const adresse = objet(personne, 'address')

    expect(adresse['@type']).toBe('PostalAddress')
    expect(adresse.addressLocality).toBe(identite.ville)
    expect(adresse.addressCountry).toBe(identite.codePays)
    expect(Object.keys(adresse).sort()).toEqual(['@type', 'addressCountry', 'addressLocality'])
  })

  it('n’expose que des profils publics vérifiés, tous en HTTPS', () => {
    const profils = liste(personne, 'sameAs')

    expect(profils).toEqual([...identite.profilsPublics])
    for (const profil of profils) {
      expect(String(profil).startsWith('https://')).toBe(true)
    }
    expect(profils).toContain('https://github.com/Jerome-Marichez')
  })

  it('dérive les domaines couverts des offres du site', () => {
    expect(liste(personne, 'knowsAbout')).toEqual(offres.map((offre) => offre.titre))
  })
})

describe('langues et certifications', () => {
  it('émet chaque langue du contenu dans knowsLanguage', () => {
    expect(liste(personne, 'knowsLanguage')).toEqual(
      identite.langues.map((langue) => ({
        '@type': 'Language',
        name: langue.nom,
        alternateName: langue.code,
      })),
    )
  })

  it('n’émet pas le niveau CECRL, faute de propriété schema.org pour l’exprimer', () => {
    for (const langue of identite.langues) {
      expect(serialisation).not.toContain(`"${langue.niveau}"`)
    }
  })

  it('ne classe EF SET ni en certification ni en titre professionnel', () => {
    expect(serialisation).not.toContain('EF SET')
    for (const langue of identite.langues) {
      if (langue.evaluePar !== null) expect(serialisation).not.toContain(langue.evaluePar)
    }
  })

  it('émet les diplômes et les certifications du contenu, et rien de plus', () => {
    const titres = liste(personne, 'hasCredential').map((credential) =>
      chaine(credential as JsonLdNode, 'name'),
    )

    expect(titres).toEqual([
      ...formations.map((formation) => formation.intitule),
      ...certifications.map((certification) => certification.intitule),
    ])
  })

  it('n’émet aucun lien de justificatif tant qu’aucune URL n’a été fournie', () => {
    const credentials = liste(personne, 'hasCredential').map((valeur) => valeur as JsonLdNode)
    const certifiees = credentials.filter(
      (credential) => credential.credentialCategory === 'Certification professionnelle',
    )

    expect(certifiees).toHaveLength(certifications.length)
    for (const [index, credential] of certifiees.entries()) {
      const source = certifications[index]
      const attenduAvecUrl = source?.justificatif.statut === 'disponible'
      expect('url' in credential).toBe(attenduAvecUrl)
    }
  })

  it('n’annonce ni Microsoft Ads ni un ISTQB de niveau avancé', () => {
    expect(serialisation).not.toContain('Microsoft Ads')
    expect(serialisation).not.toMatch(/ISTQB[^"]*Avanc/i)
    expect(serialisation).not.toMatch(/Automatisation de [Tt]est/)
  })
})

describe('nœud ProfessionalService', () => {
  it('décrit l’activité avec la promesse du contenu', () => {
    expect(chaine(activite, 'name')).toBe(identite.nom)
    expect(chaine(activite, 'description')).toBe(identite.promesse)
    expect(chaine(activite, 'url')).toBe(siteUrl)
  })

  it('publie un catalogue dérivé des offres, dans leur ordre éditorial', () => {
    const catalogue = objet(activite, 'hasOfferCatalog')

    expect(catalogue['@type']).toBe('OfferCatalog')
    expect(
      liste(catalogue, 'itemListElement').map((offre) =>
        chaine(objet(offre as JsonLdNode, 'itemOffered'), 'name'),
      ),
    ).toEqual(offres.map((offre) => offre.titre))
  })

  it('décrit chaque service par son accroche éditoriale et le rattache au fournisseur', () => {
    const elements = liste(objet(activite, 'hasOfferCatalog'), 'itemListElement')

    for (const [index, element] of elements.entries()) {
      const service = objet(element as JsonLdNode, 'itemOffered')
      expect(service.description).toBe(offres[index]?.accroche)
      expect(objet(service, 'provider')['@id']).toBe(chaine(activite, '@id'))
    }
  })

  it('n’annonce l’URL d’aucune page d’offre tant qu’elle n’existe pas', () => {
    const elements = liste(objet(activite, 'hasOfferCatalog'), 'itemListElement')

    for (const element of elements) {
      expect('url' in objet(element as JsonLdNode, 'itemOffered')).toBe(false)
    }
  })
})
