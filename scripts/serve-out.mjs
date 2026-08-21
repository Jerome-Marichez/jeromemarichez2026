// serve-out.mjs — jeromemarichez-fr
//
// Sert l'export statique (`out/`) produit par `next build`, avec exactement les mêmes
// règles de résolution que `docker/nginx.conf` en production :
//
//   try_files $uri $uri/ =404 ; index index.html ; error_page 404 /404.html
//
// C'est indispensable : `trailingSlash: true` fait sortir chaque route en
// `<route>/index.html`. Un serveur qui ne résout pas un dossier vers son `index.html`
// renverrait une 404 trompeuse et ferait échouer les specs pour la mauvaise raison.
//
// Zéro dépendance : `node:http` suffit, l'export n'a ni back, ni route API.
//
//   node scripts/serve-out.mjs [port]      (par défaut : E2E_PORT ou 4173)
//
// Utilisé par `scripts/e2e.mjs` (cible `make test-e2e`).

import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { dirname, extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

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

function envoyer(reponse, statut, fichier, enTetes = {}) {
  reponse.writeHead(statut, { 'Content-Type': typeDe(fichier), ...enTetes })
  createReadStream(fichier).pipe(reponse)
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
        envoyer(reponse, 200, fichier, { 'Cache-Control': 'no-store' })
        return
      }
      const page404 = await fichierExistant(join(dossier, '404.html'))
      if (page404) {
        envoyer(reponse, 404, page404, { 'Cache-Control': 'no-store' })
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
