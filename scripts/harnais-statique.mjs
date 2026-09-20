// harnais-statique.mjs — jeromemarichez-fr
//
// Socle commun à tout contrôle qui a besoin du site **réellement servi** : tests e2e
// (`scripts/e2e.mjs`) et budgets de performance / accessibilité (`scripts/budgets.mjs`).
//
// Le site étant en export statique (`output: 'export'`), la « stack » se réduit à servir
// `out/`. Le harnais :
//
//   1. construit l'export statique s'il manque (`npm run build`) ;
//   2. sert `out/` avec les règles de résolution de `docker/nginx.conf` (serve-out.mjs) ;
//   3. attend que le port RÉPONDE vraiment (sonde HTTP, jamais un `sleep`) ;
//   4. exécute le travail demandé ;
//   5. arrête le serveur quoi qu'il arrive — succès, échec ou signal — et laisse
//      remonter le code de sortie du travail, jamais un autre.
//
// Un seul endroit sait démarrer et arrêter le site : deux harnais concurrents finiraient
// par diverger sur le port, la sonde ou le nettoyage, et c'est toujours le second qui
// laisse un serveur orphelin en CI.

import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { demarrerServeurStatique, PORT_PAR_DEFAUT } from './serve-out.mjs'

export const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..')
export const DOSSIER_EXPORT = join(RACINE, 'out')

const DELAI_SONDE_MS = 30_000

const existe = (chemin) =>
  access(chemin).then(
    () => true,
    () => false,
  )

/** Exécute une commande en héritant des flux, et résout son code de sortie. */
export function executer(commande, arguments_, env = {}) {
  return new Promise((ok, ko) => {
    const enfant = spawn(commande, arguments_, {
      cwd: RACINE,
      stdio: 'inherit',
      env: { ...process.env, ...env },
      shell: process.platform === 'win32',
    })
    enfant.once('error', ko)
    enfant.once('close', (code, signal) => ok(signal ? 1 : (code ?? 1)))
  })
}

/**
 * Attend que le serveur réponde réellement sur `/`. Un port en écoute ne suffit pas :
 * on veut une réponse HTTP, sinon le contrôle démarre sur un serveur qui n'est pas prêt
 * et échoue pour la mauvaise raison.
 */
async function attendreReponse(url) {
  const limite = Date.now() + DELAI_SONDE_MS
  let derniereErreur
  while (Date.now() < limite) {
    try {
      const reponse = await fetch(url, { redirect: 'manual' })
      if (reponse.status < 500) return reponse.status
    } catch (erreur) {
      derniereErreur = erreur
    }
    await new Promise((ok) => setTimeout(ok, 200))
  }
  throw new Error(
    `Le serveur statique n'a pas répondu sur ${url} en ${DELAI_SONDE_MS} ms` +
      (derniereErreur ? ` (${derniereErreur.message})` : ''),
  )
}

/** Construit l'export statique s'il manque. Lève si le build échoue. */
export async function construireSiNecessaire() {
  if (await existe(join(DOSSIER_EXPORT, 'index.html'))) return
  console.log('Export statique absent : construction (`npm run build`)…')
  const code = await executer('npm', ['run', 'build'])
  if (code !== 0) throw new Error(`Le build a échoué (code ${code})`)
}

/**
 * Construit si besoin, sert `out/`, attend une vraie réponse HTTP, puis exécute
 * `travail({ url, port })`. Le serveur est arrêté dans tous les cas.
 *
 * @param {(contexte: { url: string, port: number }) => Promise<number>} travail
 * @param {{ port?: number }} options
 * @returns {Promise<number>} le code de sortie rendu par `travail`
 */
export async function avecSiteServi(
  travail,
  { port = Number(process.env.E2E_PORT ?? PORT_PAR_DEFAUT) } = {},
) {
  await construireSiNecessaire()

  const {
    serveur,
    url,
    port: attribue,
  } = await demarrerServeurStatique({
    racine: DOSSIER_EXPORT,
    port,
  })
  const arreter = () => {
    serveur.closeAllConnections?.()
    return new Promise((ok) => serveur.close(ok))
  }
  // Interruption clavier ou signal CI : on ne laisse jamais le serveur orphelin.
  const surSignal = () => {
    arreter().then(() => process.exit(130))
  }
  process.once('SIGINT', surSignal)
  process.once('SIGTERM', surSignal)

  try {
    const statut = await attendreReponse(`${url}/`)
    console.log(`Export statique servi sur ${url} (GET / → ${statut}).`)
    return await travail({ url, port: attribue })
  } finally {
    await arreter()
    console.log('Serveur statique arrêté.')
  }
}

/**
 * Point d'entrée commun d'un script de contrôle : exécute `main`, sort avec son code,
 * et transforme toute exception en code 1 avec un message préfixé.
 */
export function lancer(nom, main) {
  main().then(
    (code) => process.exit(code),
    (erreur) => {
      console.error(`Harnais ${nom} : ${erreur instanceof Error ? erreur.message : erreur}`)
      process.exit(1)
    },
  )
}
