// fumee.cy.ts — jeromemarichez-fr
//
// AUTEUR : ecrite par l'assistant sur delegation EXPLICITE et repetee de
// Jerome MARICHEZ le 2026-08-22 (« balek de la spec ou fait le », « ou bypass la »,
// « regle les soucis et fix »).
//
// La regle du projet est que les tests sont ecrits par Jerome MARICHEZ, et le hook
// `require-test-first.sh` l'applique. Le CLAUDE.md prevoit une delegation ponctuelle par
// `TESTS_WRITABLE_BY_ASSISTANT=1` : cette variable n'a pas pu etre posee dans la session,
// l'autorisation a donc ete donnee de vive voix. **L'entorse est ecrite ici plutot que
// tue** : c'est le seul fichier de test du depot qui n'est pas de la main de Jerome, et il
// doit etre relu par lui comme tel.
//
// Alternative ecartee : rendre le job `ci-main-e2e` tolerant a l'absence de spec. Elle
// aurait fait passer la production au vert en supprimant la couverture au lieu de
// l'ajouter — l'inverse de ce que ce depot vend.
//
// Intention : verifier que l'export statique reellement produit par `next build` est
// servi et navigable, avec la resolution de routes que `docker/nginx.conf` promet.
//
// Comportements couverts :
//   1. l'accueil repond, porte le titre du site et un h1 visible ;
//   2. une navigation aboutit : le lien vers un pole mene a la page du pole ;
//   3. les quatre poles et les deux espaces editoriaux sont atteignables depuis l'accueil.
//
// Cas limites, et ce sont eux qui justifient un e2e plutot qu'un test unitaire :
//   4. `trailingSlash` — une route SANS barre finale doit repondre 200, le serveur
//      resolvant le dossier vers son `index.html` comme le fait nginx. C'est le contrat
//      de `scripts/serve-out.mjs`, et une regression y serait invisible en `next dev` ;
//   5. 404 — une URL inconnue doit repondre un vrai statut 404 et non un 200 trompeur,
//      qui serait indexe par un moteur et scorerait parfaitement en performance.
//
// Jeu de donnees : aucun. Le contenu servi est l'export reel, pas une fixture — c'est
// precisement ce qui fait la valeur de ce niveau de test.

describe("fumee — l'export statique est servi et navigable", () => {
  it("sert la page d'accueil avec son titre et son h1", () => {
    cy.visit('/')
    cy.title().should('contain', 'Jérôme Marichez')
    cy.get('h1').should('be.visible')
  })

  it("mene de l'accueil a une page de pole par le lien de navigation", () => {
    cy.visit('/')
    cy.get('a[href="/services/ingenierie-web/"]').first().click()
    cy.location('pathname').should('eq', '/services/ingenierie-web/')
    cy.contains('h1', 'Ingénierie web').should('be.visible')
  })

  it("expose les quatre poles et les deux espaces depuis l'accueil", () => {
    cy.visit('/')
    for (const route of [
      '/services/ingenierie-web/',
      '/services/data/',
      '/services/ia/',
      '/services/sea-ux/',
      '/realisations/',
      '/blog/',
    ]) {
      cy.get(`a[href="${route}"]`).should('exist')
    }
  })

  it("resout une route sans barre finale vers son index.html", () => {
    cy.request('/services/data').its('status').should('eq', 200)
    cy.visit('/services/data/')
    cy.get('h1').should('be.visible')
  })

  it("renvoie un vrai 404 sur une URL inconnue", () => {
    cy.request({ url: '/page-inexistante/', failOnStatusCode: false })
      .its('status')
      .should('eq', 404)
  })
})
