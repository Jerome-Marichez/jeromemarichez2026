// e2e.mjs — jeromemarichez-fr
//
// Harnais des tests e2e (cible `make test-e2e`), en local comme dans `ci-main-e2e`.
// Toute la mécanique — construire l'export si besoin, servir `out/`, sonder le port,
// arrêter proprement sur signal — vit dans `scripts/harnais-statique.mjs`, partagé avec
// les budgets de performance et d'accessibilité (`scripts/budgets.mjs`).
//
// Ici, il ne reste que ce qui est propre à Cypress.
//
//   node scripts/e2e.mjs      (ou : make test-e2e)
//   node scripts/e2e.mjs --spec tests/e2e/fumee.cy.ts

import { avecSiteServi, executer, lancer } from './harnais-statique.mjs'

// Le code de sortie du harnais est celui de Cypress : aucun échec n'est absorbé.
lancer('e2e', () =>
  avecSiteServi(({ url, port }) => {
    console.log(`Lancement de Cypress contre ${url}.`)
    // Les arguments supplémentaires sont transmis tels quels à Cypress
    // (ex. `node scripts/e2e.mjs --spec tests/e2e/fumee.cy.ts`).
    return executer('npx', ['cypress', 'run', ...process.argv.slice(2)], {
      E2E_PORT: String(port),
    })
  }),
)
