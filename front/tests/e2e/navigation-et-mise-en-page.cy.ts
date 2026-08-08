/**
 * navigation-et-mise-en-page.cy.ts — jeromemarichez2026
 *
 * Intention : vérifier, dans un vrai navigateur, les trois propriétés que jsdom ne peut
 * pas calculer et qu'aucun test unitaire ne couvre.
 *
 * 1. AUCUN LIEN MORT. Chaque destination annoncée par l'en-tête et le pied de page
 *    répond réellement. Le site a vécu plusieurs livraisons avec trois liens vers des
 *    routes inexistantes : la navigation les annonçait, elles renvoyaient 404. Ce test
 *    est la garde qui empêche que cela se reproduise au prochain ajout d'entrée.
 * 2. LE LIEN D'ÉVITEMENT DÉPLACE LE FOCUS. Il doit être le premier élément focusable,
 *    revenir dans le viewport une fois focalisé, et déplacer réellement le focus sur le
 *    contenu principal — pas seulement faire défiler la page. Le focus est un état du
 *    navigateur : jsdom ne le simule pas fidèlement.
 * 3. AUCUN DÉBORDEMENT HORIZONTAL, de 320 à 1920 px. C'est une propriété de mise en
 *    page réelle, mesurable seulement une fois le CSS appliqué par un moteur de rendu.
 *
 * Cas limites : les deux extrémités de la plage de largeurs (320 et 1920 px) ; une
 * destination de navigation ajoutée sans page correspondante.
 *
 * Niveau : e2e (Cypress), contre le serveur de production réellement livré.
 * Jeu de données : le site lui-même, tel qu'il est construit.
 */

const LARGEURS = [320, 768, 1440, 1920] as const

describe('Navigation et mise en page', () => {
  it('ne propose aucun lien mort dans l’en-tête et le pied de page', () => {
    cy.visit('/')

    cy.get('header a[href^="/"], footer a[href^="/"]').then(($liens) => {
      const destinations = [
        ...new Set([...$liens].map((lien) => lien.getAttribute('href') ?? '')),
      ].filter(Boolean)

      // Une navigation vide passerait ce test sans rien vérifier.
      expect(destinations.length, 'destinations internes trouvées').to.be.greaterThan(0)

      for (const destination of destinations) {
        cy.request({ url: destination, failOnStatusCode: false }).then((reponse) => {
          expect(reponse.status, `GET ${destination}`).to.eq(200)
        })
      }
    })
  })

  it('place le lien d’évitement en premier élément focusable et l’affiche au focus', () => {
    cy.visit('/')

    cy.get('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
      .first()
      .should('have.attr', 'href', '#contenu')
      .focus()

    // `should` et non `then` : le lien revient par une transition CSS sur `transform`.
    // Une mesure unique tomberait au milieu de l'animation — ici l'assertion est
    // réessayée jusqu'à la position finale, ce qui teste bien l'état d'arrivée.
    cy.get('a[href="#contenu"]').should(($lien) => {
      const rect = $lien[0].getBoundingClientRect()
      expect(rect.top, 'le lien revient dans le viewport une fois focalisé').to.be.at.least(0)
      expect(rect.left).to.be.at.least(0)
    })
  })

  it('déplace le focus sur le contenu principal quand on active le lien d’évitement', () => {
    cy.visit('/')

    cy.get('a[href="#contenu"]').focus().click()
    cy.focused().should('have.id', 'contenu')
  })

  it('ne produit aucun défilement horizontal de 320 à 1920 px', () => {
    for (const largeur of LARGEURS) {
      cy.viewport(largeur, 900)
      cy.visit('/')
      cy.document().should((doc) => {
        const racine = doc.documentElement
        expect(racine.scrollWidth, `largeur ${largeur} px`).to.be.at.most(racine.clientWidth)
      })
    }
  })

  it('expose une structure de régions unique sur les pages d’offre', () => {
    cy.visit('/services/sea')

    cy.get('body > header').should('have.length', 1)
    cy.get('body > main#contenu').should('have.length', 1)
    cy.get('body > footer').should('have.length', 1)
    cy.get('h1').should('have.length', 1)
  })
})
