// Configuration Cypress — jeromemarichez-fr (e2e navigateur)
// Specs : tests/e2e/**/*.cy.ts — contre l'export statique réellement servi.
// Le serveur est démarré, sondé puis arrêté par `scripts/e2e.mjs` (`make test-e2e`),
// qui sert `out/` sur E2E_PORT avec les règles de résolution de `docker/nginx.conf`.
import { defineConfig } from 'cypress'

const port = Number(process.env.E2E_PORT ?? 4173)

export default defineConfig({
  e2e: {
    baseUrl: `http://127.0.0.1:${port}`,
    specPattern: 'tests/e2e/**/*.cy.ts',
    supportFile: false,
    video: false,
  },
})
