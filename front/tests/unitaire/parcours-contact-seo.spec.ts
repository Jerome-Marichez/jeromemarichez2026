/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issues #23 et #24) :
 * les deux nouvelles pages tiennent la POLITIQUE SEO PERMANENTE du CLAUDE.md — métadonnées
 * construites par `buildPageMetadata`, canonique propre, entrée automatique au sitemap, et
 * un graphe JSON-LD de page qui ne redécrit pas ce que le layout déclare déjà.
 *
 * Ce que ce test protège : une page qui n'appelle pas `buildPageMetadata` hérite de la
 * canonique de l'ACCUEIL. Elle ne casse rien, ne lève rien, s'affiche parfaitement — et
 * disparaît des résultats de recherche. C'est exactement le genre de défaut qu'aucun autre
 * contrôle du dépôt n'attrape.
 *
 * Comportement attendu :
 * 1. chaque page déclare sa propre canonique, égale à son URL absolue ;
 * 2. son titre est suffixé par le gabarit du site (« Parcours — Jérôme Marichez ») :
 *    `absoluteTitle` reste réservé à l'accueil ;
 * 3. titre et description tiennent les bornes que Zod impose — un dépassement casse le
 *    build, ce test le fait échouer plus tôt et avec un meilleur message ;
 * 4. les deux routes figurent dans le sitemap, DÉRIVÉES de l'arborescence réelle ;
 * 5. le graphe de page se rattache au `Person` du layout par son `@id` au lieu de le
 *    redécrire, et n'invente ni coordonnée, ni note, ni horaire.
 *
 * Cas limites couverts : une canonique qui vaudrait celle de l'accueil ; un `@id` de
 * rattachement qui ne pointerait aucun nœud existant ; un `ContactPoint` réintroduit avec
 * des champs non établis.
 *
 * Niveau : unitaire (métadonnées et graphes réels, arborescence réelle du dépôt).
 * Jeu de données : le contenu du dépôt et les routes réellement présentes dans `src/app`.
 */

import {
  absoluteUrl,
  buildContactStructuredData,
  buildParcoursStructuredData,
  buildSiteStructuredData,
  titleTemplate,
} from '@/@shared/seo'
import { listSiteRoutes } from '@/@shared/seo/routes.server'
import { metadata as metaContact } from '@/app/contact/page'
import { metadata as metaParcours } from '@/app/parcours/page'
import sitemap from '@/app/sitemap'
import { contactPage, parcoursPage } from '@/content'
import { LONGUEUR_MAX_DESCRIPTION } from '@/schemas/page-seo.schema'

const PAGES = [
  { route: '/parcours', metadata: metaParcours, contenu: parcoursPage.meta },
  { route: '/contact', metadata: metaContact, contenu: contactPage.meta },
] as const

describe('métadonnées par page', () => {
  it.each(PAGES)('déclare sa propre canonique pour $route', ({ route, metadata }) => {
    expect(metadata.alternates?.canonical).toBe(absoluteUrl(route))
    expect(metadata.alternates?.canonical).not.toBe(absoluteUrl('/'))
  })

  it.each(PAGES)(
    'reprend le titre et la description du contenu typé pour $route',
    ({ metadata, contenu }) => {
      expect(metadata.title).toBe(contenu.titre)
      expect(metadata.description).toBe(contenu.description)
    },
  )

  it.each(PAGES)(
    'laisse le gabarit du site suffixer le titre partagé de $route',
    ({ metadata, contenu }) => {
      expect(metadata.openGraph?.title).toBe(titleTemplate.replace('%s', contenu.titre))
      expect(metadata.openGraph?.title).toContain('Jérôme Marichez')
    },
  )

  it.each(PAGES)('tient les bornes SEO sur $route', ({ contenu }) => {
    expect(contenu.titre.length).toBeLessThanOrEqual(60)
    expect(contenu.description.length).toBeGreaterThanOrEqual(50)
    expect(contenu.description.length).toBeLessThanOrEqual(LONGUEUR_MAX_DESCRIPTION)
  })

  it.each(PAGES)('déclare son URL Open Graph pour $route', ({ route, metadata }) => {
    expect(metadata.openGraph?.url).toBe(absoluteUrl(route))
  })
})

describe('entrée automatique au sitemap', () => {
  it.each(['/parcours', '/contact'])('découvre la route %s dans l’arborescence réelle', (route) => {
    expect(listSiteRoutes().map((decouverte) => decouverte.path)).toContain(route)
  })

  it.each(['/parcours', '/contact'])('publie %s dans le sitemap', (route) => {
    expect(sitemap().map((entree) => entree.url)).toContain(absoluteUrl(route))
  })

  it('ne publie aucune des deux routes deux fois', () => {
    const urls = sitemap().map((entree) => entree.url)

    expect(new Set(urls).size).toBe(urls.length)
  })
})

describe('graphes JSON-LD de page', () => {
  const identifiantsDuSite = buildSiteStructuredData()['@graph'].map((noeud) => noeud['@id'])
  const CAS = [
    { route: '/parcours', graphe: buildParcoursStructuredData(), type: 'ProfilePage' },
    { route: '/contact', graphe: buildContactStructuredData(), type: 'ContactPage' },
  ] as const

  it.each(CAS)('décrit $route par un unique nœud $type', ({ graphe, type, route }) => {
    expect(graphe['@graph']).toHaveLength(1)
    expect(graphe['@graph'][0]?.['@type']).toBe(type)
    expect(graphe['@graph'][0]?.url).toBe(absoluteUrl(route))
  })

  it.each(CAS)('rattache $route au Person du layout par son identifiant', ({ graphe }) => {
    const rattachement = graphe['@graph'][0]?.mainEntity as { '@id': string } | undefined

    expect(rattachement?.['@id']).toBeTruthy()
    expect(identifiantsDuSite).toContain(rattachement?.['@id'])
  })

  it.each(CAS)('ne redécrit ni la personne ni l’activité sur $route', ({ graphe }) => {
    const types = graphe['@graph'].map((noeud) => noeud['@type'])

    expect(types).not.toContain('Person')
    expect(types).not.toContain('ProfessionalService')
  })

  it.each(CAS)('n’invente aucune propriété non établie sur $route', ({ graphe }) => {
    const serialisation = JSON.stringify(graphe)

    for (const interdite of [
      'ContactPoint',
      'contactType',
      'hoursAvailable',
      'openingHours',
      'aggregateRating',
      'review',
      'streetAddress',
      'areaServed',
    ]) {
      expect(serialisation).not.toContain(interdite)
    }
  })

  it.each(CAS)('est sérialisable et relisible à l’identique pour $route', ({ graphe }) => {
    expect(JSON.parse(JSON.stringify(graphe))).toEqual(graphe)
  })
})
