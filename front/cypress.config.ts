// Configuration Cypress — jeromemarichez2026 (e2e navigateur)
// Specs : tests/e2e/**/*.cy.ts — contre la stack réellement lancée.
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // Port du serveur de production démarré par `make test-e2e`, qui attend que
    // cette URL réponde avant de lancer Cypress.
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/e2e/**/*.cy.ts',
    supportFile: false,
    video: false,
  },
})
