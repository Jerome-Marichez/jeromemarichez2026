// serve-out.mjs — jeromemarichez-fr
//
// Sert l'export statique (`out/`) produit par `next build`, avec exactement les mêmes
// règles de résolution que `docker/nginx.conf` en production :
//
//   try_files $uri $uri/ =404 ; index index.html ; error_page 404 /404.html
//   gzip on ; gzip_comp_level 6 ; gzip_min_length 1024 ; gzip_vary on ; gzip_types …
//
// C'est indispensable : `trailingSlash: true` fait sortir chaque route en
// `<route>/index.html`. Un serveur qui ne résout pas un dossier vers son `index.html`
// renverrait une 404 trompeuse et ferait échouer les specs pour la mauvaise raison.
//
// La compression relève de la même exigence, en plus sensible : ce serveur est ce que
// `make budgets` mesure. S'il compressait sans que nginx compresse, la mesure
// annoncerait une performance que le visiteur ne reçoit pas ; s'il ne compresse pas
// alors que nginx compresse, elle condamne un site qui va bien. Le sens de la
// dépendance est fixe et ne s'inverse jamais : **`docker/nginx.conf` décide, ce
// fichier le reflète.** Toute évolution des réglages commence là-bas.
//
// Zéro dépendance : `node:http` et `node:zlib` suffisent, l'export n'a ni back, ni
// route API.
//
//   node scripts/serve-out.mjs [port]      (par défaut : E2E_PORT ou 4173)
//
// Utilisé par `scripts/e2e.mjs` (cible `make test-e2e`).

import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { dirname, extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGzip } from 'node:zlib'

export const PORT_PAR_DEFAUT = Number(process.env.E2E_PORT ?? 4173)

const RACINE_PROJET = join(dirname(fileURLToPath(import.meta.url)), '..')

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
}

const typeDe = (chemin) => TYPES[extname(chemin).toLowerCase()] ?? 'application/octet-stream'

/**
 * Types compressés à la volée. Miroir de `gzip_types` dans `docker/nginx.conf`, plus
 * `text/html` que nginx compresse d'office sans qu'on ait à le déclarer.
 *
 * Les `woff2` et les images en sont absents des deux côtés : déjà compressés à la
 * source, les repasser au gzip coûte du CPU pour ~0 % de gain.
 */
const TYPES_COMPRESSIBLES = new Set([
  'text/html',
  'text/css',
  'text/plain',
  'text/xml',
  'text/javascript',
  'application/javascript',
  'application/json',
  'application/manifest+json',
  'application/xml',
  'application/rss+xml',
  'application/atom+xml',
  'image/svg+xml',
])

/** `gzip_comp_level 6` — voir la justification mesurée dans `docker/nginx.conf`. */
const NIVEAU_GZIP = 6

/** `gzip_min_length 1024` — en deçà, l'en-tête gzip mange le gain. */
const TAILLE_MINIMALE_GZIP = 1024

/** Le type sans ses paramètres : `text/html; charset=utf-8` → `text/html`. */
const typeNu = (type) => type.split(';')[0].trim().toLowerCase()

/**
 * Le client accepte-t-il gzip ? Lecture volontairement stricte de `Accept-Encoding` :
 * un `gzip;q=0` est un refus explicite, et le prendre pour un accord servirait un
 * corps illisible à un client qui avait pris la peine de le dire.
 */
function accepteGzip(enTeteAcceptEncoding) {
  if (!enTeteAcceptEncoding) return false
  return enTeteAcceptEncoding
    .split(',')
    .map((piece) => piece.trim().toLowerCase())
    .some((piece) => {
      const [codage, ...parametres] = piece.split(';').map((p) => p.trim())
      if (codage !== 'gzip' && codage !== '*') return false
      const q = parametres.find((p) => p.startsWith('q='))
      return !q || Number(q.slice(2)) > 0
    })
}

/** Chemin d'un fichier existant, ou `null`. */
async function fichierExistant(chemin) {
  try {
    const info = await stat(chemin)
    return info.isFile() ? chemin : null
  } catch {
    return null
  }
}

/**
 * Résout une URL comme nginx : le fichier lui-même, sinon `<dossier>/index.html`,
 * sinon rien (la 404 est décidée par l'appelant).
 */
async function resoudre(racine, cheminUrl) {
  const brut = decodeURIComponent(cheminUrl.split('?')[0].split('#')[0])
  const cible = resolve(racine, `.${brut}`)
  // Garde-fou traversée de répertoire : on ne sert jamais hors de `out/`.
  if (cible !== racine && !cible.startsWith(racine + sep)) return null
  return (await fichierExistant(cible)) ?? (await fichierExistant(join(cible, 'index.html')))
}

/**
 * Décide de la compression exactement comme nginx : le client doit l'accepter, le type
 * doit figurer dans la liste, et la réponse doit peser au moins `gzip_min_length`.
 */
async function doitCompresser(requete, fichier, type) {
  if (!accepteGzip(requete.headers['accept-encoding'])) return false
  if (!TYPES_COMPRESSIBLES.has(typeNu(type))) return false
  const { size } = await stat(fichier)
  return size >= TAILLE_MINIMALE_GZIP
}

async function envoyer(requete, reponse, statut, fichier, enTetes = {}) {
  const type = typeDe(fichier)
  const flux = createReadStream(fichier)

  if (await doitCompresser(requete, fichier, type)) {
    // Pas de `Content-Length` : le corps est compressé au fil de l'eau, sa taille
    // finale n'est pas connue au moment d'écrire les en-têtes. `Vary` accompagne la
    // réponse compressée, comme le fait `gzip_vary on` — sans lui, un cache
    // intermédiaire servirait du gzip à un client qui ne l'a pas demandé.
    reponse.writeHead(statut, {
      'Content-Type': type,
      'Content-Encoding': 'gzip',
      Vary: 'Accept-Encoding',
      ...enTetes,
    })
    flux.pipe(createGzip({ level: NIVEAU_GZIP })).pipe(reponse)
    return
  }

  reponse.writeHead(statut, { 'Content-Type': type, ...enTetes })
  flux.pipe(reponse)
}

/**
 * Démarre le serveur statique et résout une fois le port en écoute.
 * @param {{ racine?: string, port?: number }} options
 * @returns {Promise<{ serveur: import('node:http').Server, port: number, url: string }>}
 */
export async function demarrerServeurStatique({ racine, port = PORT_PAR_DEFAUT } = {}) {
  const dossier = resolve(racine ?? join(RACINE_PROJET, 'out'))

  const serveur = createServer(async (requete, reponse) => {
    try {
      const fichier = await resoudre(dossier, requete.url ?? '/')
      if (fichier) {
        await envoyer(requete, reponse, 200, fichier, { 'Cache-Control': 'no-store' })
        return
      }
      const page404 = await fichierExistant(join(dossier, '404.html'))
      if (page404) {
        await envoyer(requete, reponse, 404, page404, { 'Cache-Control': 'no-store' })
        return
      }
      reponse.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      reponse.end('404')
    } catch (erreur) {
      reponse.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      reponse.end(`500 ${erreur instanceof Error ? erreur.message : ''}`)
    }
  })

  await new Promise((ok, ko) => {
    serveur.once('error', ko)
    serveur.listen(port, '127.0.0.1', ok)
  })

  const attribue = serveur.address().port
  return { serveur, port: attribue, url: `http://127.0.0.1:${attribue}` }
}

// Exécution directe : `node scripts/serve-out.mjs [port]`.
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const port = Number(process.argv[2] ?? PORT_PAR_DEFAUT)
  const { url } = await demarrerServeurStatique({ port })
  console.log(`Export statique servi sur ${url} (Ctrl+C pour arrêter)`)
}
