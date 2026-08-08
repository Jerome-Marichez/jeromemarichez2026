// routes.server.ts — jeromemarichez2026
// Découverte des routes RÉELLEMENT servies par le site, en lisant l'arborescence de
// `src/app/` au moment du build.
//
// POURQUOI PAS UNE LISTE ÉCRITE À LA MAIN : elle serait juste le jour où on l'écrit et
// fausse au premier ajout de page. Un sitemap faux est pire qu'absent — il envoie les
// moteurs sur des 404 et laisse les vraies pages hors index, sans qu'aucun test ni
// aucun lint ne s'en aperçoive. Ici, la seule façon d'entrer dans le sitemap est
// d'exister comme route Next.js ; la seule façon d'en sortir est de disparaître.
//
// MODULE SERVEUR UNIQUEMENT : il lit le système de fichiers. Il n'est volontairement
// PAS ré-exporté par `@shared/seo/index.ts`, pour qu'un composant client ne puisse pas
// l'importer par accident et faire échouer le bundle sur `node:fs`.
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import type { ISiteRoute } from '../interfaces/isite-route'

/** `process.cwd()` vaut `front/` pendant `next build` comme pendant `next dev`. */
const APP_DIRECTORY = join(process.cwd(), 'src', 'app')

/** Un dossier ne devient une route que s'il porte l'un de ces fichiers. */
const PAGE_FILE_NAMES = ['page.tsx', 'page.ts', 'page.jsx', 'page.js']

/** `(vitrine)` — groupe de routes : organise les fichiers, n'apparaît pas dans l'URL. */
const ROUTE_GROUP = /^\(.+\)$/

/** `(.)`, `(..)`, `(...)` — routes interceptées : jamais des URL à indexer. */
const INTERCEPTING_ROUTE = /^\(\.{1,3}\)/

/**
 * Segments qui ne produisent aucune URL indexable.
 *
 * Les segments dynamiques (`[slug]`) sont volontairement écartés : ils ne sont pas
 * énumérables sans les données qui les peuplent. Le jour où le site en aura, leurs URL
 * devront être ajoutées explicitement à partir du contenu — voir docs/seo.md.
 */
function isIgnoredSegment(segment: string): boolean {
  return (
    INTERCEPTING_ROUTE.test(segment) ||
    segment.startsWith('_') || // dossier privé, exclu du routage par Next.js
    segment.startsWith('@') || // emplacement parallèle
    segment.startsWith('[') // segment dynamique
  )
}

function collect(directory: string, segments: readonly string[], routes: ISiteRoute[]): void {
  const entries = readdirSync(directory, { withFileTypes: true })

  const pageFile = entries.find((entry) => entry.isFile() && PAGE_FILE_NAMES.includes(entry.name))
  if (pageFile) {
    routes.push({
      path: segments.length === 0 ? '/' : `/${segments.join('/')}`,
      // Date du fichier qui porte la page. En CI, la copie de travail est fraîchement
      // clonée : toutes les dates valent alors celle du build. C'est une approximation
      // assumée et documentée (docs/seo.md), pas une date inventée page par page.
      lastModified: statSync(join(directory, pageFile.name)).mtime,
    })
  }

  for (const entry of entries) {
    if (!entry.isDirectory() || isIgnoredSegment(entry.name)) continue
    // Un groupe de routes est traversé, mais n'ajoute pas de segment à l'URL.
    const nextSegments = ROUTE_GROUP.test(entry.name) ? segments : [...segments, entry.name]
    collect(join(directory, entry.name), nextSegments, routes)
  }
}

/** Les routes du site, triées — ordre stable d'un build à l'autre. */
export function listSiteRoutes(): readonly ISiteRoute[] {
  const routes: ISiteRoute[] = []
  collect(APP_DIRECTORY, [], routes)
  return routes.sort((a, b) => a.path.localeCompare(b.path))
}
