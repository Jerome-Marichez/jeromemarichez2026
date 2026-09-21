import styles from './glyphes-competences.module.css'
import { glyphesPremierGroupe } from './glyphes-premier-groupe'
import { glyphesSecondGroupe } from './glyphes-second-groupe'

interface IGlypheCompetenceProps {
  readonly famille: string
}

const glyphes = {
  ...glyphesPremierGroupe,
  ...glyphesSecondGroupe,
}

/**
 * Le glyphe qui identifie une famille de compétences au premier coup d'œil,
 * là où les neuf familles portaient jusqu'ici exactement le même poids
 * visuel (issue #173).
 *
 * Purement décoratif : la famille est déjà nommée en toutes lettres juste à
 * côté dans le `<dt>`, un `title` ferait doublon à la synthèse vocale.
 * `focusable="false"` neutralise le focus historique d'Internet Explorer et
 * d'Edge Legacy sur les éléments `<svg>`.
 */
export function GlypheCompetence({ famille }: IGlypheCompetenceProps) {
  const Forme = glyphes[famille as keyof typeof glyphes]

  if (Forme === undefined) {
    return null
  }

  return (
    <svg
      className={styles.glyphe}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Forme />
    </svg>
  )
}
