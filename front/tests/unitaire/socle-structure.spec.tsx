/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * les composants de structure du socle rendent la sémantique qu'ils promettent —
 * celle dont dépendent les technologies d'assistance, et qu'aucune relecture visuelle
 * ne permet de vérifier.
 *
 * Comportement attendu : `SkipLink` rend une ancre vers le contenu principal (WCAG
 * 2.4.1) ; `Section` rend une région NOMMÉE PAR SON PROPRE TITRE via `aria-labelledby`,
 * sans libellé maintenu en double ; `Container` borne la largeur de lecture ;
 * `SiteFooter` rend la navigation DÉRIVÉE du contenu, la même liste que celle de
 * l'en-tête — les deux ne peuvent donc pas diverger.
 *
 * Cas limites couverts : niveau de titre non par défaut d'une section, section sans
 * phrase d'introduction, largeur de conteneur non par défaut, libellé personnalisé du
 * lien d'évitement, et le fait que le pied de page ne recopie aucun libellé d'offre.
 *
 * NON COUVERT ICI, ET DIT FRANCHEMENT : `SiteHeader` rend `NavLink`, un composant
 * client qui lit la route courante (`usePathname`) pour poser `aria-current="page"`.
 * Hors contexte de routeur, ce comportement ne s'observe pas sans doublure de module —
 * interdite ici. Il relève du niveau e2e (Cypress), qui ne tourne que sur les PR vers
 * `main`.
 *
 * Niveau : unitaire (React Testing Library, jsdom).
 * Jeu de données : le contenu réel des offres, via `siteNavigation`.
 */
import { render, screen } from '@testing-library/react'
import { Container } from '@/@shared/components/Container'
import { Section } from '@/@shared/components/Section'
import { SiteFooter } from '@/@shared/components/SiteFooter'
import { SkipLink } from '@/@shared/components/SkipLink'
import { MAIN_CONTENT_ID, siteNavigation } from '@/@shared/config/navigation'

describe('SkipLink', () => {
  it('pointe vers le conteneur de contenu principal', () => {
    render(<SkipLink targetId={MAIN_CONTENT_ID} />)

    const lien = screen.getByRole('link', { name: 'Aller au contenu principal' })
    expect(lien.getAttribute('href')).toBe(`#${MAIN_CONTENT_ID}`)
  })

  it('accepte un libellé explicite', () => {
    render(<SkipLink targetId="contenu">Aller au contenu</SkipLink>)

    expect(screen.getByRole('link', { name: 'Aller au contenu' })).not.toBeNull()
  })

  it('reste une ancre, donc focusable et dans le flux', () => {
    render(<SkipLink targetId="contenu" />)

    const lien = screen.getByRole('link')
    expect(lien.tagName).toBe('A')
    expect(lien.getAttribute('tabindex')).toBeNull()
  })
})

describe('Container', () => {
  it('applique la largeur par défaut', () => {
    const { container } = render(<Container>Contenu</Container>)

    expect(container.firstElementChild?.className).toBe('container default')
  })

  it.each(['narrow', 'default', 'wide'] as const)('applique la largeur « %s »', (largeur) => {
    const { container } = render(<Container width={largeur}>Contenu</Container>)

    expect(container.firstElementChild?.className).toBe(`container ${largeur}`)
  })

  it('combine une classe additionnelle sans écraser les siennes', () => {
    const { container } = render(<Container className="inner">Contenu</Container>)

    expect(container.firstElementChild?.className).toBe('container default inner')
  })
})

describe('Section', () => {
  it('nomme la région par son propre titre', () => {
    render(
      <Section id="offres" title="Mes offres">
        Contenu
      </Section>,
    )

    const region = screen.getByRole('region', { name: 'Mes offres' })
    const titre = screen.getByRole('heading', { name: 'Mes offres' })

    expect(region.getAttribute('id')).toBe('offres')
    expect(region.getAttribute('aria-labelledby')).toBe(titre.getAttribute('id'))
    expect(titre.getAttribute('id')).toBe('offres-titre')
  })

  it('titre en h2 par défaut, et suit le niveau demandé', () => {
    const { unmount } = render(
      <Section id="a" title="Titre A">
        Contenu
      </Section>,
    )
    expect(screen.getByRole('heading', { name: 'Titre A' }).tagName).toBe('H2')
    unmount()

    render(
      <Section headingLevel={3} id="b" title="Titre B">
        Contenu
      </Section>,
    )
    expect(screen.getByRole('heading', { name: 'Titre B' }).tagName).toBe('H3')
  })

  it('n’affiche une phrase d’introduction que si elle est fournie', () => {
    const { unmount } = render(
      <Section id="a" lead="Une phrase." title="Titre">
        Contenu
      </Section>,
    )
    expect(screen.getByText('Une phrase.')).not.toBeNull()
    unmount()

    render(
      <Section id="b" title="Titre">
        Contenu
      </Section>,
    )
    expect(screen.queryByText('Une phrase.')).toBeNull()
  })

  it('sert d’ancre aux liens internes de la page', () => {
    render(
      <Section id="contact" title="Me contacter">
        Contenu
      </Section>,
    )

    expect(screen.getByRole('region', { name: 'Me contacter' }).getAttribute('id')).toBe('contact')
  })
})

describe('SiteFooter', () => {
  it('rend la navigation dérivée du contenu, dans son ordre', () => {
    render(<SiteFooter />)

    const navigation = screen.getByRole('navigation', { name: 'Navigation de pied de page' })
    const liens = [...navigation.querySelectorAll('a')]

    expect(liens.map((lien) => lien.textContent)).toEqual(
      siteNavigation.map((entree) => entree.label),
    )
    expect(liens.map((lien) => lien.getAttribute('href'))).toEqual(
      siteNavigation.map((entree) => entree.href),
    )
  })

  it('ne recopie aucun libellé : la liste vient de la même source que l’en-tête', () => {
    render(<SiteFooter />)

    const navigation = screen.getByRole('navigation', { name: 'Navigation de pied de page' })
    expect(navigation.querySelectorAll('a')).toHaveLength(siteNavigation.length)
  })

  it('nomme sa navigation, pour la distinguer de celle de l’en-tête', () => {
    render(<SiteFooter />)

    expect(screen.getByRole('navigation').getAttribute('aria-label')).toBe(
      'Navigation de pied de page',
    )
  })

  it('propose un appel à l’action vers le contact', () => {
    render(<SiteFooter />)

    expect(screen.getByRole('link', { name: 'Me contacter' }).getAttribute('href')).toBe('/contact')
  })

  it('n’affiche aucune année qui se périmerait', () => {
    const { container } = render(<SiteFooter />)

    expect(container.textContent).toContain('© Jérôme Marichez')
    expect(container.textContent).not.toMatch(/©\s*\d{4}/)
  })
})
