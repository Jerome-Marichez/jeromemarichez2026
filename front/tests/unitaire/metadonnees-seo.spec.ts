/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * `buildPageMetadata` est le seul endroit où une page décrit son référencement, et il
 * doit produire UNE SEULE écriture de son URL : la canonique, `og:url` et l'URL absolue
 * du chemin sont la même chaîne. Une canonique fausse ne casse aucun test « visible » —
 * elle fait juste disparaître la page des résultats de recherche. D'où ce test.
 *
 * Comportement attendu : le gabarit de titre (« %s — Jérôme Marichez ») est appliqué à
 * l'Open Graph et à la carte Twitter, que Next.js n'atteint pas, mais pas au champ
 * `title` que Next.js compose lui-même ; `absoluteTitle` remplace le gabarit au lieu de
 * le suffixer ; `absoluteUrl` ne laisse jamais de barre finale.
 *
 * Cas limites couverts (refus attendus, validés par Zod AU BUILD) : description trop
 * courte (< 50) ou trop longue (> 160), titre trop long (> 60) ou trop court (< 3),
 * chemin sans barre initiale, avec barre finale, en majuscules, avec double barre, avec
 * paramètre de requête, et clé inconnue rejetée par `z.strictObject`.
 *
 * Niveau : unitaire (fonctions pures).
 * Jeu de données : le contenu réel du dépôt (`identite`) et l'origine réelle du site —
 * aucune URL n'est recopiée en dur, sans quoi le test ne vérifierait que sa propre copie.
 */

import {
  absoluteUrl,
  applyTitleTemplate,
  buildPageMetadata,
  buildRootMetadata,
  siteLocale,
  siteName,
  siteTitle,
  siteUrl,
  titleTemplate,
} from '@/@shared/seo'
import { identite } from '@/content'

/** Entrée valide de référence : chaque cas limite n'en fait varier qu'un champ. */
const PAGE_VALIDE = {
  title: 'SEA',
  description:
    'Acquisition payante pilotée par la donnée : taggage, entrepôt multi-source et arbitrage des budgets sur la rentabilité réelle.',
  path: '/services/sea',
} as const

describe('absoluteUrl', () => {
  it('résout un chemin contre l’origine du site', () => {
    expect(absoluteUrl('/services/sea')).toBe(`${siteUrl}/services/sea`)
  })

  it('ne laisse aucune barre finale sur la racine', () => {
    expect(absoluteUrl('/')).toBe(siteUrl)
    expect(absoluteUrl('/').endsWith('/')).toBe(false)
  })

  it('normalise un chemin sans barre initiale plutôt que de le résoudre en relatif', () => {
    expect(absoluteUrl('services/sea')).toBe(absoluteUrl('/services/sea'))
  })
})

describe('applyTitleTemplate', () => {
  it('applique le gabarit du site au titre de la page', () => {
    expect(applyTitleTemplate('SEA')).toBe(titleTemplate.replace('%s', 'SEA'))
  })

  it('nomme Jérôme Marichez dans le gabarit', () => {
    expect(applyTitleTemplate('SEA')).toContain(identite.nom)
  })
})

describe('buildRootMetadata', () => {
  const racine = buildRootMetadata()

  it('déclare l’origine de résolution des URL relatives', () => {
    expect(racine.metadataBase?.toString()).toBe(new URL(siteUrl).toString())
  })

  it('porte le titre par défaut et le gabarit hérité par les pages filles', () => {
    expect(racine.title).toEqual({ default: siteTitle, template: titleTemplate })
  })

  it('décrit le site avec la description du contenu typé', () => {
    expect(racine.description).toBe(identite.descriptionSite)
  })

  it('déclare la canonique de l’accueil, sans barre finale', () => {
    expect(racine.alternates?.canonical).toBe(absoluteUrl('/'))
  })

  it('publie un Open Graph cohérent avec la canonique', () => {
    expect(racine.openGraph?.url).toBe(absoluteUrl('/'))
    expect(racine.openGraph?.siteName).toBe(siteName)
    expect(racine.openGraph?.locale).toBe(siteLocale)
  })

  it('autorise l’indexation du site', () => {
    expect(racine.robots).toEqual({ index: true, follow: true })
  })

  it('empêche la transformation automatique des nombres en liens téléphoniques', () => {
    expect(racine.formatDetection).toEqual({ telephone: false, email: false, address: false })
  })
})

describe('buildPageMetadata — page valide', () => {
  const metadonnees = buildPageMetadata(PAGE_VALIDE)

  it('écrit la même URL dans la canonique et dans og:url', () => {
    const attendue = absoluteUrl(PAGE_VALIDE.path)

    expect(metadonnees.alternates?.canonical).toBe(attendue)
    expect(metadonnees.openGraph?.url).toBe(attendue)
  })

  it('laisse Next.js appliquer le gabarit au titre de l’onglet', () => {
    expect(metadonnees.title).toBe(PAGE_VALIDE.title)
  })

  it('applique le gabarit à la main pour l’Open Graph et la carte Twitter', () => {
    const titreComplet = applyTitleTemplate(PAGE_VALIDE.title)

    expect(metadonnees.openGraph?.title).toBe(titreComplet)
    expect(metadonnees.twitter?.title).toBe(titreComplet)
  })

  it('reprend la description de la page partout', () => {
    expect(metadonnees.description).toBe(PAGE_VALIDE.description)
    expect(metadonnees.openGraph?.description).toBe(PAGE_VALIDE.description)
    expect(metadonnees.twitter?.description).toBe(PAGE_VALIDE.description)
  })

  it('déclare une carte Twitter et une locale explicites', () => {
    // `toMatchObject` plutôt qu'un accès direct : `card` n'est porté que par certaines
    // variantes de l'union `Twitter` de Next.js, et l'assertion doit rester exacte.
    expect(metadonnees.twitter).toMatchObject({ card: 'summary_large_image' })
    expect(metadonnees.openGraph?.locale).toBe(siteLocale)
  })

  it('accepte la racine du site comme chemin', () => {
    const accueil = buildPageMetadata({ ...PAGE_VALIDE, path: '/' })

    expect(accueil.alternates?.canonical).toBe(siteUrl)
  })
})

describe('buildPageMetadata — titre absolu', () => {
  it('remplace le gabarit au lieu de le suffixer', () => {
    const metadonnees = buildPageMetadata({ ...PAGE_VALIDE, absoluteTitle: true, path: '/' })

    expect(metadonnees.title).toEqual({ absolute: PAGE_VALIDE.title })
    expect(metadonnees.openGraph?.title).toBe(PAGE_VALIDE.title)
    expect(metadonnees.twitter?.title).toBe(PAGE_VALIDE.title)
  })

  it('reste suffixé par défaut, sans déclaration explicite', () => {
    expect(buildPageMetadata(PAGE_VALIDE).openGraph?.title).toBe(
      applyTitleTemplate(PAGE_VALIDE.title),
    )
  })
})

describe('buildPageMetadata — entrées refusées au build', () => {
  it.each([
    ['description trop courte', { description: 'Trop court pour un extrait de résultat.' }],
    ['description trop longue', { description: `${'a'.repeat(161)}` }],
    ['titre trop long', { title: 'a'.repeat(61) }],
    ['titre trop court', { title: 'ab' }],
    ['chemin sans barre initiale', { path: 'services/sea' }],
    ['chemin avec barre finale', { path: '/services/sea/' }],
    ['chemin en majuscules', { path: '/Services/SEA' }],
    ['chemin à double barre', { path: '/services//sea' }],
    ['chemin avec paramètre de requête', { path: '/services/sea?utm_source=x' }],
    ['chemin avec espace', { path: '/services/sea et plus' }],
    ['URL absolue en guise de chemin', { path: 'https://example.org/services/sea' }],
  ])('refuse une %s', (_cas, surcharge) => {
    expect(() => buildPageMetadata({ ...PAGE_VALIDE, ...surcharge })).toThrow()
  })

  it('refuse une clé inconnue plutôt que de l’ignorer en silence', () => {
    expect(() =>
      buildPageMetadata({ ...PAGE_VALIDE, canonical: 'https://example.org' } as never),
    ).toThrow()
  })

  it('accepte exactement 160 caractères de description et 60 de titre', () => {
    expect(() =>
      buildPageMetadata({ ...PAGE_VALIDE, description: 'a'.repeat(160), title: 'a'.repeat(60) }),
    ).not.toThrow()
  })
})
