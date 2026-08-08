/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26 ;
 * test proposé à l'origine dans la PR #8, consolidé ici contre le composant réel) :
 * `ActionLink` rend TOUJOURS un lien, jamais un bouton, parce que les appels à l'action
 * du site sont des navigations. Un lien externe s'ouvre dans un nouvel onglet, se protège
 * par `rel="noopener noreferrer"` et ANNONCE l'ouverture aux lecteurs d'écran : la
 * mention doit faire partie du NOM ACCESSIBLE, pas seulement du texte visible.
 *
 * Cas limites couverts : variante secondaire, lien interne (aucune cible d'ouverture,
 * aucun `rel`), classe additionnelle combinée à celles du module CSS, ancre interne.
 *
 * Le nom accessible est réellement comparé, accents compris : la proposition d'origine a
 * d'abord échoué parce qu'elle attendait « nouvelle fenetre » là où le composant rend
 * « nouvelle fenêtre ».
 *
 * Niveau : unitaire (React Testing Library, jsdom — couvre au passage `next/link`).
 * Jeu de données : aucun — composant pur, ses entrées sont ses props.
 */
import { render, screen } from '@testing-library/react'
import { ActionLink } from '@/@shared/components/ActionLink'

describe('ActionLink', () => {
  it('rend un lien interne, sans ouverture dans un nouvel onglet', () => {
    render(<ActionLink href="/contact">Me contacter</ActionLink>)

    const lien = screen.getByRole('link', { name: 'Me contacter' })
    expect(lien.tagName).toBe('A')
    expect(lien.getAttribute('href')).toBe('/contact')
    expect(lien.getAttribute('target')).toBeNull()
    expect(lien.getAttribute('rel')).toBeNull()
    expect(lien.getAttribute('data-variant')).toBe('primary')
  })

  it('n’est jamais un bouton, même en variante secondaire', () => {
    render(
      <ActionLink href="/parcours" variant="secondary">
        Voir le parcours
      </ActionLink>,
    )

    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.getByRole('link', { name: 'Voir le parcours' }).tagName).toBe('A')
  })

  it('annonce l’ouverture dans un nouvel onglet pour un lien externe', () => {
    render(
      <ActionLink external href="https://example.org/certificat">
        Voir la certification
      </ActionLink>,
    )

    const lien = screen.getByRole('link', { name: 'Voir la certification (nouvelle fenêtre)' })
    expect(lien.getAttribute('href')).toBe('https://example.org/certificat')
    expect(lien.getAttribute('target')).toBe('_blank')
    expect(lien.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('protège chaque lien externe contre l’accès à la fenêtre ouvrante', () => {
    render(
      <ActionLink external href="https://example.org/">
        Lien externe
      </ActionLink>,
    )

    const rel = screen.getByRole('link', { name: /Lien externe/ }).getAttribute('rel') ?? ''
    expect(rel.split(' ')).toEqual(expect.arrayContaining(['noopener', 'noreferrer']))
  })

  it('porte la variante demandée dans ses classes et dans son attribut de données', () => {
    render(
      <ActionLink href="/offres" variant="secondary">
        Voir les offres
      </ActionLink>,
    )

    const lien = screen.getByRole('link', { name: 'Voir les offres' })
    expect(lien.className).toBe('action secondary')
    expect(lien.getAttribute('data-variant')).toBe('secondary')
  })

  it('combine la classe additionnelle avec celles du module CSS', () => {
    render(
      <ActionLink className="pleine-largeur" href="/contact">
        Me contacter
      </ActionLink>,
    )

    expect(screen.getByRole('link', { name: 'Me contacter' }).className).toBe(
      'action primary pleine-largeur',
    )
  })

  it('conserve le chemin d’une ancre interne', () => {
    render(<ActionLink href="/#contenu">Aller au contenu</ActionLink>)

    expect(screen.getByRole('link', { name: 'Aller au contenu' }).getAttribute('href')).toBe(
      '/#contenu',
    )
  })
})
