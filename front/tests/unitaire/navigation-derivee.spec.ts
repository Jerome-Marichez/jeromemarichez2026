/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26 ;
 * consolidation des trois propositions de test de navigation, dont une seule subsiste) :
 * les libellés de la navigation sont DÉRIVÉS du contenu éditorial, jamais recopiés, et
 * l'URL d'une offre est construite sur sa CLÉ, jamais sur son titre.
 *
 * Le test compare `siteNavigation` à `offres` plutôt qu'à des chaînes attendues : écrire
 * « Ingénierie Web », « Data & IA » et « SEA » ici ferait de ce test une troisième copie
 * des libellés — exactement le défaut qu'il doit interdire (issue #11 : l'en-tête
 * annonçait « Data et IA » quand la carte annonçait « Data & IA »).
 *
 * Cas limites couverts : ajouter une offre au contenu doit l'ajouter à la navigation
 * sans toucher au fichier de navigation (vérifié par la relation, pas par une liste) ;
 * « Parcours » et « Contact » ne dérivent d'aucune offre et restent les SEULES entrées
 * littérales ; les offres passent avant elles ; un titre qui contient une esperluette ou
 * un accent ne doit jamais se retrouver dans une URL.
 *
 * Niveau : unitaire (données pures).
 * Jeu de données : le contenu réel des offres du dépôt.
 */
import { MAIN_CONTENT_ID, siteNavigation } from '@/@shared/config/navigation'
import { cheminOffre } from '@/@shared/config/routes'
import { offres } from '@/content'

/** Les entrées qui n'ont aucune source éditoriale : elles seules sont écrites à la main. */
const ENTREES_HORS_OFFRES = [
  { href: '/parcours', label: 'Parcours' },
  { href: '/contact', label: 'Contact' },
] as const

describe('cheminOffre', () => {
  it('construit le chemin d’une offre sur sa clé', () => {
    for (const offre of offres) {
      expect(cheminOffre(offre.cle)).toBe(`/services/${offre.cle}`)
    }
  })

  it('ne produit que des chemins absolus utilisables tels quels dans une URL', () => {
    for (const offre of offres) {
      const chemin = cheminOffre(offre.cle)

      expect(chemin.startsWith('/services/')).toBe(true)
      expect(chemin).toBe(encodeURI(chemin))
      expect(chemin).not.toMatch(/[\s&]/)
    }
  })
})

describe('navigation principale', () => {
  it('commence par les offres, dans l’ordre du contenu éditorial', () => {
    expect(siteNavigation.slice(0, offres.length)).toEqual(
      offres.map((offre) => ({ href: cheminOffre(offre.cle), label: offre.titre })),
    )
  })

  it('reprend le titre de chaque offre sans le réécrire', () => {
    for (const [index, offre] of offres.entries()) {
      expect(siteNavigation[index]?.label).toBe(offre.titre)
    }
  })

  it('construit chaque lien sur la clé de l’offre, jamais sur son titre', () => {
    for (const [index, offre] of offres.entries()) {
      const href = siteNavigation[index]?.href

      expect(href).toBe(`/services/${offre.cle}`)
      expect(href?.split('/').pop()).toBe(offre.cle)
    }
  })

  it('ne laisse aucun titre éditorial fuir dans une URL', () => {
    for (const lien of siteNavigation) {
      expect(lien.href).toMatch(/^\/[a-z0-9/-]*$/)
    }
  })

  it('termine par les deux entrées sans source éditoriale, dans cet ordre', () => {
    expect(siteNavigation.slice(offres.length)).toEqual([...ENTREES_HORS_OFFRES])
  })

  it('ne contient rien d’autre que les offres et ces deux entrées', () => {
    expect(siteNavigation).toHaveLength(offres.length + ENTREES_HORS_OFFRES.length)
  })

  it('donne à chaque entrée un libellé explicite hors contexte (WCAG 2.4.4)', () => {
    for (const lien of siteNavigation) {
      expect(lien.label.trim().length).toBeGreaterThan(1)
      expect(lien.label).not.toMatch(/^(ici|lire la suite|en savoir plus)$/i)
    }
  })

  it('ne déclare jamais deux fois la même destination', () => {
    const destinations = siteNavigation.map((lien) => lien.href)

    expect(new Set(destinations).size).toBe(destinations.length)
  })
})

describe('cible du lien d’évitement', () => {
  it('nomme le conteneur de contenu principal', () => {
    expect(MAIN_CONTENT_ID).toBe('contenu')
  })

  it('reste un identifiant HTML valide', () => {
    expect(MAIN_CONTENT_ID).toMatch(/^[a-z][a-z0-9-]*$/)
  })
})
