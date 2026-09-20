// fumee.cy.ts, jeromemarichez-fr
//
// Intention :
//   Verifier qu'aucune des six pages du site CV n'est cassee, et que les deux
//   actions qu'un recruteur vient chercher fonctionnent reellement.
//
//   Comportement attendu :
//     1. Chacune des six routes repond, et porte un `h1` visible. Une page sans
//        titre de premier niveau est cassee pour un lecteur d'ecran comme pour un
//        moteur, meme si elle s'affiche.
//     2. La barre d'onglets de l'en-tete mene effectivement a chaque page, et
//        l'onglet de la page courante se declare `aria-current="page"`.
//     3. Le CV se telecharge : c'est le livrable attendu, et un lien mort dessus
//        coute l'entretien.
//     4. Une adresse inexistante rend 404, et pas la page d'accueil deguisee.
//
//   Cas limites couverts :
//     - Les URL portent la barre finale (`trailingSlash` dans next.config.mjs).
//       Le test l'exige explicitement : un export servi sans elle casserait la
//       resolution des fichiers, et c'est arrive.
//     - Le PDF est verifie par son type de contenu, pas seulement par son code de
//       retour : un serveur mal configure rend un 200 avec du HTML d'erreur.
//
//   Niveau vise : e2e. Le comportement traverse le serveur de fichiers, les
//   regles de resolution de `docker/nginx.conf` et le navigateur, donc aucun
//   niveau inferieur ne le couvre.
//
//   Jeu de donnees : aucun. Le site est un export statique, ses donnees sont
//   compilees dans les pages.
//
// AUTEUR : ecrit par l'assistant sur delegation EXPLICITE de Jerome MARICHEZ le
// 2026-09-20, en reponse a la question « le test de fumee e2e verifie des routes
// supprimees » : reponse retenue, « Je te delegue, reecris-le ».
//
// La regle du projet est que les tests sont ecrits par Jerome MARICHEZ, et le hook
// `require-test-first.sh` l'applique. Le CLAUDE.md prevoit une delegation ponctuelle
// par `TESTS_WRITABLE_BY_ASSISTANT=1` ; la variable n'a pas ete posee dans la
// session, l'autorisation a donc ete donnee en session. **L'entorse est ecrite ici
// plutot que tue** : c'est le seul fichier de test du depot qui n'est pas de la main
// de Jerome, et il doit etre relu par lui comme tel.
//
// POURQUOI CE FICHIER A ETE REECRIT : sa version precedente sondait les routes du
// site vitrine a quatre poles (`/services/*`, `/realisations/`, `/blog/`), retire le
// 2026-09-20. Alternative ecartee : rendre le job `ci-main-e2e` tolerant a l'echec.
// Elle aurait fait passer la production au vert en supprimant la couverture au lieu
// de la deplacer, ce que la regle 8 du CLAUDE.md interdit sans condition.

const ROUTES = ['/', '/a-propos/', '/parcours/', '/projets/', '/competences/', '/contact/'] as const

describe('fumee : le site CV repond et ses deux actions fonctionnent', () => {
  it("l'accueil s'affiche et se nomme", () => {
    cy.visit('/')
    cy.title().should('contain', 'Jérôme Marichez')
    cy.get('h1').should('be.visible')
  })

  for (const route of ROUTES) {
    it(`${route} repond et porte un h1 visible`, () => {
      cy.request(route).its('status').should('eq', 200)
      cy.visit(route)
      cy.get('h1').should('be.visible').and('not.be.empty')
    })
  }

  it("la barre d'onglets mene a chaque page et marque la page courante", () => {
    for (const route of ROUTES) {
      cy.visit('/')
      cy.get(`header nav a[href="${route}"]`).first().click()
      cy.location('pathname').should('eq', route)
      cy.get(`header nav a[href="${route}"]`).first().should('have.attr', 'aria-current', 'page')
    }
  })

  it("le CV se telecharge, et c'est bien un PDF", () => {
    cy.visit('/')
    cy.get('a[href$=".pdf"]').first().should('have.attr', 'download')
    cy.request('/cv-jerome-marichez.pdf').then((reponse) => {
      expect(reponse.status).to.eq(200)
      expect(reponse.headers['content-type']).to.contain('application/pdf')
    })
  })

  it('une adresse inexistante rend 404', () => {
    cy.request({ url: '/page-inexistante/', failOnStatusCode: false })
      .its('status')
      .should('eq', 404)
  })
})
