// e2e.mjs — jeromemarichez-fr
//
// Harnais des tests e2e (cible `make test-e2e`), en local comme dans `ci-main-e2e`.
// Le site étant en export statique (`output: 'export'`), la « stack » se réduit à
// servir `out/` : ni back, ni route API, ni serveur applicatif.
//
//   1. construit l'export statique s'il manque (`npm run build`) ;
//   2. sert `out/` sur E2E_PORT (4173 par défaut), avec les règles de `docker/nginx.conf` ;
//   3. attend que le port RÉPONDE vraiment (sonde HTTP, pas un `sleep`) ;
//   4. lance `cypress run` ;
//   5. arrête le serveur quoi qu'il arrive — succès, échec ou interruption — et sort
//      avec le code de Cypress, jamais un autre.
//
//   node scripts/e2e.mjs      (ou : make test-e2e)

import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { demarrerServeurStatique, PORT_PAR_DEFAUT } from './serve-out.mjs'

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..')
const DOSSIER_EXPORT = join(RACINE, 'out')
const PORT = Number(process.env.E2E_PORT ?? PORT_PAR_DEFAUT)
const DELAI_SONDE_MS = 30_000

const existe = (chemin) =>
  access(chemin).then(
    () => true,
    () => false,
  )

/** Exécute une commande en héritant des flux, et résout son code de sortie. */
function executer(commande, arguments_, env = {}) {
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
 * on veut une réponse HTTP, sinon Cypress démarre sur un serveur qui n'est pas prêt.
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

async function main() {
  if (!(await existe(join(DOSSIER_EXPORT, 'index.html')))) {
    console.log('Export statique absent : construction (`npm run build`)…')
    const code = await executer('npm', ['run', 'build'])
    if (code !== 0) throw new Error(`Le build a échoué (code ${code})`)
  }

  const { serveur, url } = await demarrerServeurStatique({ racine: DOSSIER_EXPORT, port: PORT })
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
    console.log(`Export statique servi sur ${url} (GET / → ${statut}) — lancement de Cypress.`)
    // Les arguments supplémentaires sont transmis tels quels à Cypress
    // (ex. `node scripts/e2e.mjs --spec tests/e2e/fumee.cy.ts`).
    return await executer('npx', ['cypress', 'run', ...process.argv.slice(2)], {
      E2E_PORT: String(PORT),
    })
  } finally {
    await arreter()
    console.log('Serveur statique arrêté.')
  }
}

// Le code de sortie du harnais est celui de Cypress : aucun échec n'est absorbé.
main().then(
  (code) => process.exit(code),
  (erreur) => {
    console.error(`Harnais e2e : ${erreur instanceof Error ? erreur.message : erreur}`)
    process.exit(1)
  },
)
