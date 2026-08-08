/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * le composant qui injecte les données structurées émet du JSON STRICTEMENT VALIDE et
 * refermable par aucun contenu. `dangerouslySetInnerHTML` est ici obligatoire — React
 * échapperait les enfants textuels en entités HTML (`&quot;`), produisant un JSON que
 * les moteurs ne relisent pas — donc l'échappement doit être vérifié, pas supposé.
 *
 * Comportement attendu : un `<script type="application/ld+json">` unique, dont le
 * contenu se relit par `JSON.parse` à l'identique du graphe fourni.
 *
 * Cas limites couverts : le seul caractère capable de refermer prématurément la balise
 * est `<` (dans `</script>`) — une chaîne du contenu qui en contiendrait un ne doit pas
 * pouvoir sortir du script ; les guillemets ne sont pas transformés en entités HTML ;
 * le graphe réel du site passe le même contrôle.
 *
 * Niveau : unitaire (React Testing Library, jsdom).
 * Jeu de données : un graphe minimal portant la charge hostile, et le graphe réel du site.
 */
import { render } from '@testing-library/react'
import { JsonLd } from '@/@shared/components/JsonLd'
import type { JsonLdGraph } from '@/@shared/interfaces/types'
import { buildSiteStructuredData } from '@/@shared/seo'

/** Graphe portant une chaîne capable de refermer la balise si rien ne l'échappe. */
const GRAPHE_HOSTILE: JsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [{ '@type': 'Person', name: 'Jérôme </script><script>alert(1)</script>' }],
}

function contenuDuScript(conteneur: HTMLElement): string {
  const script = conteneur.querySelector('script[type="application/ld+json"]')
  if (script === null) throw new Error('Aucun script de données structurées rendu.')
  return script.innerHTML
}

describe('JsonLd', () => {
  it('rend un unique script de type application/ld+json', () => {
    const { container } = render(<JsonLd data={buildSiteStructuredData()} />)

    expect(container.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1)
  })

  it('émet le graphe réel du site, relisible par JSON.parse à l’identique', () => {
    const graphe = buildSiteStructuredData()
    const { container } = render(<JsonLd data={graphe} />)

    expect(JSON.parse(contenuDuScript(container))).toEqual(graphe)
  })

  it('n’échappe pas les guillemets en entités HTML', () => {
    const { container } = render(<JsonLd data={buildSiteStructuredData()} />)

    expect(contenuDuScript(container)).not.toContain('&quot;')
  })

  it('empêche une chaîne du contenu de refermer la balise script', () => {
    const { container } = render(<JsonLd data={GRAPHE_HOSTILE} />)
    const contenu = contenuDuScript(container)

    expect(contenu).not.toContain('</script>')
    expect(contenu).toContain('\\u003c')
  })

  it('conserve la valeur exacte malgré l’échappement', () => {
    const { container } = render(<JsonLd data={GRAPHE_HOSTILE} />)

    expect(JSON.parse(contenuDuScript(container))).toEqual(GRAPHE_HOSTILE)
  })

  it('n’injecte aucun script exécutable dans le document', () => {
    const { container } = render(<JsonLd data={GRAPHE_HOSTILE} />)

    // Le seul script rendu est celui des données structurées, jamais un second
    // qu'une chaîne du contenu aurait ouvert.
    expect(container.querySelectorAll('script')).toHaveLength(1)
  })
})
