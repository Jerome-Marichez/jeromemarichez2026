/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26 ;
 * test proposé à l'origine dans la PR #8, consolidé ici contre le composant réel) :
 * `Card` rend une surface autonome dont le titre respecte le NIVEAU demandé, et dont
 * les zones optionnelles n'apparaissent que si elles sont fournies. Le niveau de titre
 * est un choix d'accessibilité, pas un détail de style : une carte posée dans une
 * section titrée en `h2` doit pouvoir descendre en `h3` sans casser la hiérarchie.
 *
 * Cas limites couverts : niveau de titre non par défaut (2 et 4), carte sans titre
 * (aucun heading ne doit apparaître), carte sans eyebrow ni footer, classe additionnelle
 * ajoutée à celle du module CSS, ordre des zones dans le DOM.
 *
 * Ce test prouve aussi l'outillage : le module CSS est résolu par `next/jest` en proxy
 * d'objet (`styles.card` vaut `'card'`), donc la classe appliquée reste assertable sans
 * aucune doublure écrite à la main.
 *
 * Niveau : unitaire (React Testing Library, jsdom).
 * Jeu de données : aucun — composant pur, ses entrées sont ses props.
 */
import { render, screen } from '@testing-library/react'
import { Card } from '@/@shared/components/Card'

describe('Card', () => {
  it('titre en h3 par défaut, à l’intérieur d’une surface « article »', () => {
    render(<Card title="Ingénierie Web">Un seul interlocuteur.</Card>)

    const titre = screen.getByRole('heading', { level: 3, name: 'Ingénierie Web' })
    expect(screen.getByRole('article').contains(titre)).toBe(true)
    expect(screen.getByText('Un seul interlocuteur.')).not.toBeNull()
  })

  it.each([
    [2, 'H2'],
    [3, 'H3'],
    [4, 'H4'],
  ] as const)('suit le niveau de titre demandé — %i', (niveau, balise) => {
    render(
      <Card headingLevel={niveau} title="Mes offres">
        Corps
      </Card>,
    )

    expect(screen.getByRole('heading', { name: 'Mes offres' }).tagName).toBe(balise)
  })

  it('rend une carte sans titre quand aucun titre n’est fourni', () => {
    render(<Card>Corps seul</Card>)

    expect(screen.queryByRole('heading')).toBeNull()
    expect(screen.getByText('Corps seul')).not.toBeNull()
  })

  it('n’affiche ni eyebrow ni footer quand ils ne sont pas fournis', () => {
    render(<Card title="Sans extras">Corps</Card>)

    expect(screen.queryByText('Offre')).toBeNull()
    // Seul le corps est un « div » : ni la zone d'eyebrow ni celle du footer n'existent.
    expect(screen.getByRole('article').querySelectorAll('div').length).toBe(1)
  })

  it('affiche l’eyebrow au-dessus du titre quand il est fourni', () => {
    render(
      <Card eyebrow="Offre" title="Data & IA">
        Corps
      </Card>,
    )

    const article = screen.getByRole('article')
    const eyebrow = screen.getByText('Offre')
    const titre = screen.getByRole('heading', { name: 'Data & IA' })

    expect(eyebrow.tagName).toBe('P')
    expect(article.contains(eyebrow)).toBe(true)
    // `compareDocumentPosition` : l'eyebrow précède bien le titre dans l'ordre du DOM.
    expect(eyebrow.compareDocumentPosition(titre) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('rend la zone d’actions après le corps quand un footer est fourni', () => {
    render(
      <Card footer={<span>Action</span>} title="Avec footer">
        Corps
      </Card>,
    )

    const corps = screen.getByText('Corps')
    const action = screen.getByText('Action')

    expect(screen.getByRole('article').querySelectorAll('div').length).toBe(2)
    expect(corps.compareDocumentPosition(action) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('applique la classe du module CSS et la classe additionnelle', () => {
    render(
      <Card className="pleine-largeur" title="Titre">
        Corps
      </Card>,
    )

    expect(screen.getByRole('article').className).toBe('card pleine-largeur')
  })

  it('n’ajoute aucune classe parasite quand aucune classe additionnelle n’est passée', () => {
    render(<Card title="Titre">Corps</Card>)

    expect(screen.getByRole('article').className).toBe('card')
  })

  it('n’est pas cliquable dans son ensemble : la carte ne porte aucun lien implicite', () => {
    render(<Card title="Titre">Corps</Card>)

    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.queryByRole('button')).toBeNull()
  })
})
