/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * la découverte de routes ne connaît QUE l'arborescence réelle de `src/app/`, et le
 * sitemap n'est que sa projection. Un sitemap faux est pire qu'absent : il envoie les
 * moteurs sur des 404 et laisse les vraies pages hors index, sans qu'aucun test visible
 * ne s'en aperçoive.
 *
 * Table de vérité attendue : un dossier ne devient une route que s'il porte un fichier
 * `page.*` ; un groupe de routes `(vitrine)` est traversé SANS ajouter de segment ; un
 * dossier privé `_prive`, un emplacement parallèle `@modal`, une route interceptée
 * `(.)apercu` et un segment dynamique `[slug]` ne produisent AUCUNE URL indexable ; un
 * dossier qui ne porte qu'un `route.ts` n'est pas une page.
 *
 * Cas limites couverts : extensions `page.ts`/`page.js` acceptées au même titre que
 * `page.tsx` ; ordre de sortie stable (tri) ; racine rendue « / » et non « » ; chaque
 * URL du sitemap est absolue et sans barre finale ; ni `priority` ni `changeFrequency`
 * ne sont inventés.
 *
 * Niveau : unitaire. Aucune doublure de module : c'est le VRAI `routes.server.ts` qui
 * tourne, sur une VRAIE arborescence de fichiers créée pour le test dans un dossier
 * temporaire — le système de fichiers est une frontière, pas un module métier.
 *
 * Jeu de données : l'arborescence temporaire décrite ci-dessous, et l'arborescence
 * réelle du dépôt pour le cas nominal.
 */
import { mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { absoluteUrl, siteUrl } from '@/@shared/seo'
import { listSiteRoutes } from '@/@shared/seo/routes.server'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'

/** Arborescence de test : à gauche le fichier créé, à droite la route attendue (ou aucune). */
const FICHIERS_PAGES = [
  'src/app/page.tsx',
  'src/app/parcours/page.tsx',
  'src/app/(vitrine)/contact/page.tsx',
  'src/app/services/sea/page.js',
  'src/app/mentions-legales/page.ts',
  'src/app/_prive/page.tsx',
  'src/app/@modal/page.tsx',
  'src/app/(.)apercu/page.tsx',
  'src/app/[slug]/page.tsx',
  'src/app/api/contact/route.ts',
] as const

const ROUTES_ATTENDUES = [
  '/',
  '/contact',
  '/mentions-legales',
  '/parcours',
  '/services/sea',
] as const

describe('listSiteRoutes — table de vérité sur une arborescence réelle', () => {
  const repertoireInitial = process.cwd()
  let racineTemporaire = ''
  let routes: readonly { path: string; lastModified: Date }[] = []

  beforeAll(async () => {
    racineTemporaire = mkdtempSync(join(tmpdir(), 'routes-site-'))
    for (const fichier of FICHIERS_PAGES) {
      const chemin = join(racineTemporaire, fichier)
      mkdirSync(dirname(chemin), { recursive: true })
      writeFileSync(chemin, 'export default function Page() { return null }\n')
    }

    // Le module calcule son répertoire d'app à partir de `process.cwd()` au chargement :
    // on déplace le répertoire de travail, puis on charge le VRAI module.
    process.chdir(racineTemporaire)
    jest.resetModules()
    const module = await import('@/@shared/seo/routes.server')
    routes = module.listSiteRoutes()
  })

  afterAll(() => {
    process.chdir(repertoireInitial)
    if (racineTemporaire !== '') rmSync(racineTemporaire, { recursive: true, force: true })
  })

  it('découvre exactement les routes indexables, triées', () => {
    expect(routes.map((route) => route.path)).toEqual([...ROUTES_ATTENDUES])
  })

  it('traverse un groupe de routes sans ajouter son nom à l’URL', () => {
    const chemins = routes.map((route) => route.path)

    expect(chemins).toContain('/contact')
    expect(chemins.some((chemin) => chemin.includes('vitrine'))).toBe(false)
  })

  it.each([
    ['dossier privé', '_prive'],
    ['emplacement parallèle', '@modal'],
    ['route interceptée', 'apercu'],
    ['segment dynamique', 'slug'],
    ['gestionnaire de route sans page', 'api'],
  ])('n’indexe pas un %s', (_cas, fragment) => {
    expect(routes.some((route) => route.path.includes(fragment))).toBe(false)
  })

  it('rend la racine « / » et non une chaîne vide', () => {
    expect(routes.map((route) => route.path)).toContain('/')
  })

  it('date chaque route du fichier de page qui la porte', () => {
    const parcours = routes.find((route) => route.path === '/parcours')
    const attendue = statSync(join(racineTemporaire, 'src/app/parcours/page.tsx')).mtime

    expect(parcours?.lastModified.getTime()).toBe(attendue.getTime())
  })
})

describe('listSiteRoutes — arborescence réelle du dépôt', () => {
  const routes = listSiteRoutes()

  it('découvre au moins la page d’accueil', () => {
    expect(routes.map((route) => route.path)).toContain('/')
  })

  it('ne produit que des chemins absolus, sans barre finale', () => {
    for (const route of routes) {
      expect(route.path.startsWith('/')).toBe(true)
      expect(route.path === '/' || !route.path.endsWith('/')).toBe(true)
    }
  })

  it('ne découvre jamais deux fois la même route', () => {
    const chemins = routes.map((route) => route.path)

    expect(new Set(chemins).size).toBe(chemins.length)
  })

  it('rend un ordre stable d’un appel à l’autre', () => {
    expect(listSiteRoutes().map((route) => route.path)).toEqual(routes.map((route) => route.path))
  })
})

describe('sitemap.xml', () => {
  const entrees = sitemap()
  const routes = listSiteRoutes()

  it('publie une entrée par route réellement servie', () => {
    expect(entrees.map((entree) => entree.url)).toEqual(
      routes.map((route) => absoluteUrl(route.path)),
    )
  })

  it('n’écrit que des URL absolues sur l’origine du site', () => {
    for (const entree of entrees) {
      expect(entree.url.startsWith(`${siteUrl}`)).toBe(true)
      expect(entree.url.endsWith('/')).toBe(false)
    }
  })

  it('reprend la date de dernière modification de chaque route', () => {
    expect(entrees.map((entree) => entree.lastModified)).toEqual(
      routes.map((route) => route.lastModified),
    )
  })

  it('n’invente ni priorité ni fréquence de changement', () => {
    for (const entree of entrees) {
      expect(entree.priority).toBeUndefined()
      expect(entree.changeFrequency).toBeUndefined()
    }
  })

  it('est déclaré statique : la lecture du système de fichiers a lieu au build', async () => {
    const module = await import('@/app/sitemap')

    expect(module.dynamic).toBe('force-static')
  })
})

describe('robots.txt', () => {
  const regles = robots()

  it('autorise l’indexation de tout le site', () => {
    expect(regles.rules).toEqual([{ userAgent: '*', allow: '/' }])
  })

  it('déclare le sitemap en URL absolue, comme l’exige la spécification', () => {
    expect(regles.sitemap).toBe(`${siteUrl}/sitemap.xml`)
  })

  it('déclare l’hôte du site', () => {
    expect(regles.host).toBe(siteUrl)
  })
})
